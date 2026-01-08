interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  DB: D1Database;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  message: string;
  formType: 'contact' | 'guide' | 'newsletter' | 'prequalification';
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
      return Response.json(
        {
          success: false,
          error: 'We currently only accept submissions from the United States.',
        },
        {
          status: 403,
          headers: corsHeaders,
        }
      );
    }

    const data: ContactFormData = await context.request.json();
    const { RESEND_API_KEY, TURNSTILE_SECRET_KEY, DB } = context.env;

    if (data.honeypot) {
      console.log('Honeypot triggered - bot detected');
      return Response.json(
        { success: true },
        {
          status: 200,
          headers: corsHeaders,
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
          return Response.json(
            {
              success: false,
              error: 'This email has been blocked due to suspicious activity.',
            },
            {
              status: 403,
              headers: corsHeaders,
            }
          );
        }

        const lastSubmission = new Date(existing.last_submission_at);
        const now = new Date();
        const hoursSinceLastSubmission = (now.getTime() - lastSubmission.getTime()) / (1000 * 60 * 60);

        if (hoursSinceLastSubmission < 24 && existing.submission_count >= 3) {
          return Response.json(
            {
              success: false,
              error: 'You have reached the maximum number of submissions for today. Please try again later.',
            },
            {
              status: 429,
              headers: corsHeaders,
            }
          );
        }

        await DB
  .prepare('UPDATE form_submissions SET submission_count = submission_count + 1, last_submission_at = strftime("%Y-%m-%dT%H:%M:%fZ", "now"), ip_address = ? WHERE email = ? AND form_type = ?')
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

          return Response.json(
            {
              success: false,
              error: 'Captcha verification failed. Please try again.',
              details: turnstileResult['error-codes'],
            },
            {
              status: 400,
              headers: corsHeaders,
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
        subject = `New Contact Form Submission from ${data.firstName} ${data.lastName}`;
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>Practice Name:</strong> ${data.company}</p>` : ''}
          ${data.industry ? `<p><strong>Practice Type:</strong> ${data.industry}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `;
        break;

      case 'guide':
        subject = `R&D Tax Credit Guide Request from ${data.firstName} ${data.lastName}`;
        htmlContent = `
          <h2>R&D Tax Credit Guide Request</h2>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p>Please send the R&D Tax Credit Guide to this email address.</p>
        `;
        break;

      case 'prequalification':
        subject = `Prequalification Assessment Started - ${data.firstName} ${data.lastName}`;
        htmlContent = `
          <h2>Prequalification Assessment Started</h2>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p>This lead has started the prequalification assessment and is interested in learning more.</p>
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
        to: ['sales@roiblueprint.com'],
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

    if (data.formType === 'contact') {
      const confirmationHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
              }
              .header {
                background: #ffffff;
                padding: 40px 20px;
                text-align: center;
                border-bottom: 1px solid #e5e7eb;
              }
              .header img {
                max-width: 350px;
                height: auto;
              }
              .content {
                padding: 40px 30px;
              }
              .content h2 {
                color: #333333;
                font-size: 24px;
                margin-top: 0;
                margin-bottom: 20px;
              }
              .content p {
                color: #555555;
                font-size: 16px;
                margin-bottom: 20px;
              }
              .download-section {
                background-color: #f8f9fa;
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                margin: 30px 0;
              }
              .download-section h3 {
                color: #333333;
                font-size: 20px;
                margin-top: 0;
                margin-bottom: 15px;
              }
              .download-button {
                display: inline-block;
                background: #22c55e;
                color: #ffffff !important;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                margin-top: 15px;
                transition: all 0.2s;
              }
              .download-button:hover {
                background: #16a34a;
                transform: translateY(-2px);
              }
              .footer {
                background-color: #f8f9fa;
                padding: 30px;
                text-align: center;
                color: #666666;
                font-size: 14px;
              }
              .footer a {
                color: #667eea;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://imagedelivery.net/s0JEtwqnLquT1GUYjPcg5Q/a77feddf-b703-4338-b92a-eaf7ce7f7a00/public" alt="ROI Blueprint Logo">
              </div>
              <div class="content">
                <h2>Thank You for Reaching Out!</h2>
                <p>Hi ${data.firstName},</p>
                <p>Thank you for contacting ROI Blueprint. We've received your message and our team will reach out to you shortly to discuss how we can help maximize your R&D tax credits.</p>

                <div class="download-section">
                  <h3>Your Free R&D Tax Credit Guide</h3>
                  <p style="margin-bottom: 20px;">In the meantime, we've prepared a comprehensive guide to help you understand R&D tax credits and how they can benefit your practice.</p>
                  <a href="https://pub-d6d31077bf1c45ddbede359b95106359.r2.dev/PDF/ROI-Blueprint-Healthcare-RandD-Consultants.pdf" class="download-button" download>Download Your Guide</a>
                </div>

                <p>If you have any immediate questions, feel free to reply to this email or call us directly.</p>
                <p>Best regards,<br><strong>The ROI Blueprint Team</strong></p>
              </div>
              <div class="footer">
                <p>ROI Blueprint | R&D Tax Credit Specialists</p>
                <p><a href="https://roiblueprint.com">Visit our website</a></p>
              </div>
            </div>
          </body>
        </html>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'ROI Blueprint <noreply@notifications.roiblueprint.com>',
          to: [data.email],
          subject: 'ROI Blueprint inquiry received',
          html: confirmationHtml,
        }),
      });
    }

    return Response.json(
      { success: true, messageId: result.id },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};
