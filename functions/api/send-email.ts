interface Env {
  RESEND_API_KEY: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  message: string;
  formType: 'contact' | 'guide' | 'newsletter';
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
    const data: ContactFormData = await context.request.json();
    const { RESEND_API_KEY } = context.env;

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
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
        from: 'ROI Blueprint <contact@notifications.roiblueprint.com>',
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
