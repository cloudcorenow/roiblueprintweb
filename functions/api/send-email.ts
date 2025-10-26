interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  RATE_LIMITER: RateLimit;
  DB: D1Database;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  message: string;
  formType: 'contact' | 'guide' | 'newsletter';
  turnstileToken?: string;
  honeypot?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    const country = context.request.headers.get('CF-IPCountry') || 'XX';

    if (country !== 'US') {
      console.log(`Blocked submission from country: ${country}, IP: ${ip}`);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'We currently only accept submissions from the United States.',
        }),
        {
          status: 403,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const rateLimitKey = `contact_form:${ip}`;
    const { success } = await context.env.RATE_LIMITER.limit({ key: rateLimitKey });

    if (!success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const data: ContactFormData = await context.request.json();
    const { RESEND_API_KEY, TURNSTILE_SECRET_KEY, DB } = context.env;

    if (data.honeypot) {
      console.log('Honeypot triggered - bot detected');
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (DB) {
      const existing = await DB
        .prepare('SELECT * FROM form_submissions WHERE email = ? AND form_type = ?')
        .bind(data.email.toLowerCase(), data.formType)
        .first() as any;

      if (existing) {
        if (existing.is_blocked) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'This email has been blocked due to suspicious activity.',
            }),
            {
              status: 403,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
              },
            }
          );
        }

        const lastSubmission = new Date(existing.last_submission_at);
        const now = new Date();
        const hoursSinceLastSubmission = (now.getTime() - lastSubmission.getTime()) / (1000 * 60 * 60);

        if (hoursSinceLastSubmission < 24 && existing.submission_count >= 3) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'You have reached the maximum number of submissions for today. Please try again later.',
            }),
            {
              status: 429,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
              },
            }
          );
        }

        await DB
          .prepare('UPDATE form_submissions SET submission_count = submission_count + 1, last_submission_at = datetime("now"), ip_address = ? WHERE email = ? AND form_type = ?')
          .bind(ip, data.email.toLowerCase(), data.formType)
          .run();
      } else {
        await DB
          .prepare('INSERT INTO form_submissions (id, email, form_type, ip_address) VALUES (?, ?, ?, ?)')
          .bind(crypto.randomUUID(), data.email.toLowerCase(), data.formType, ip)
          .run();
      }
    }

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    if (data.formType === 'contact' && data.turnstileToken && TURNSTILE_SECRET_KEY) {
      const bypassTokens = [
        'non-interactive-bypass',
        'no-key-bypass',
        'timeout-bypass-token',
        'config-bypass-token',
        'invalid-config-bypass-token'
      ];

      if (bypassTokens.includes(data.turnstileToken)) {
        console.log('Turnstile: Bypass token detected, skipping verification');
      } else {
        const ip = context.request.headers.get('CF-Connecting-IP') || '';

        console.log('Turnstile verification starting:', {
          hasToken: !!data.turnstileToken,
          tokenPrefix: data.turnstileToken?.substring(0, 20),
          ip,
          secretKeyConfigured: !!TURNSTILE_SECRET_KEY
        });

        const turnstileResponse = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              secret: TURNSTILE_SECRET_KEY,
              response: data.turnstileToken,
              remoteip: ip,
            }),
          }
        );

        const turnstileResult = await turnstileResponse.json() as {
          success: boolean;
          'error-codes'?: string[];
          challenge_ts?: string;
          hostname?: string;
        };

        console.log('Turnstile verification result:', turnstileResult);

        if (!turnstileResult.success) {
          console.error('Turnstile verification failed:', {
            errorCodes: turnstileResult['error-codes'],
            hostname: turnstileResult.hostname
          });

          return new Response(
            JSON.stringify({
              success: false,
              error: 'Captcha verification failed. Please try again.',
              details: turnstileResult['error-codes'],
            }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
              },
            }
          );
        }

        console.log('Turnstile verification successful');
      }
    }

    let subject = '';
    let htmlContent = '';

    switch (data.formType) {
      case 'contact':
        subject = `New Contact Form Submission from ${data.name}`;
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>Practice Name:</strong> ${data.company}</p>` : ''}
          ${data.industry ? `<p><strong>Practice Type:</strong> ${data.industry}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `;
        break;

      case 'guide':
        subject = `R&D Tax Credit Guide Request from ${data.name}`;
        htmlContent = `
          <h2>R&D Tax Credit Guide Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p>Please send the R&D Tax Credit Guide to this email address.</p>
        `;
        break;

      case 'newsletter':
        subject = `New Newsletter Subscription: ${data.email}`;
        htmlContent = `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${data.email}</p>
        `;
        break;

      default:
        throw new Error('Invalid form type');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ROI Blueprint <noreply@notifications.roiblueprint.com>',
        to: ['lamado@roiblueprint.com'],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', errorData);
      throw new Error(`Failed to send email: ${response.status}`);
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
