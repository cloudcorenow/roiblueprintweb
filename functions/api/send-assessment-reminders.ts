interface Env {
  RESEND_API_KEY: string;
  DB: D1Database;
}

interface IncompleteAssessment {
  id: string;
  email: string;
  created_at: string;
  reminder_count: number;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Send reminder emails to users who started but didn't complete the prequalification assessment
 *
 * Configuration:
 * - Only sends to users who started the assessment at least 1 hour ago
 * - Only sends if no reminder was sent yet (or it's been 24+ hours since last reminder)
 * - Limits to max 2 reminders per user
 * - Can be triggered manually from admin panel or scheduled via Cron Trigger
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { RESEND_API_KEY, DB } = context.env;

    if (!DB) {
      return Response.json({ error: 'Database not configured' }, { status: 500 });
    }

    if (!RESEND_API_KEY) {
      return Response.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Find incomplete prequalification assessments that need reminders
    const incompleteAssessments = await DB
      .prepare(`
        SELECT
          id,
          email,
          created_at,
          reminder_count
        FROM form_submissions
        WHERE form_type = 'prequalification'
          AND status = 'started'
          AND completed = 0
          AND reminder_count < 2
          AND (
            reminder_sent_at IS NULL
            OR datetime(reminder_sent_at) < datetime('now', '-24 hours')
          )
          AND datetime(created_at) < datetime('now', '-1 hour')
        ORDER BY created_at ASC
      `)
      .all();

    const assessments = incompleteAssessments.results as IncompleteAssessment[];

    if (assessments.length === 0) {
      return Response.json(
        {
          success: true,
          message: 'No assessments need reminders at this time',
          count: 0
        },
        { headers: corsHeaders }
      );
    }

    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Send reminder emails
    for (const assessment of assessments) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'ROI Blueprint <noreply@notifications.roiblueprint.com>',
            to: [assessment.email],
            subject: 'Complete Your R&D Tax Credit Assessment',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1e40af;">Complete Your R&D Tax Credit Assessment</h2>

                <p>Hi there,</p>

                <p>We noticed you started your R&D Tax Credit prequalification assessment but didn't finish. We'd love to help you determine if your business qualifies for significant tax savings!</p>

                <p><strong>Why complete the assessment?</strong></p>
                <ul>
                  <li>Takes less than 3 minutes</li>
                  <li>Get instant qualification results</li>
                  <li>Learn about potential tax credits worth thousands</li>
                  <li>No obligation or commitment required</li>
                </ul>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://roiblueprint.com/contact"
                     style="background-color: #1e40af; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                    Complete Assessment Now
                  </a>
                </div>

                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  If you have any questions or need assistance, feel free to reach out to us at
                  <a href="mailto:sales@roiblueprint.com">sales@roiblueprint.com</a>
                </p>

                <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
                  ROI Blueprint | Helping businesses maximize their R&D tax credits
                </p>
              </div>
            `,
          }),
        });

        if (response.ok) {
          // Update reminder tracking in database
          await DB
            .prepare(`
              UPDATE form_submissions
              SET reminder_sent_at = datetime('now'),
                  reminder_count = reminder_count + 1
              WHERE id = ?
            `)
            .bind(assessment.id)
            .run();

          results.sent++;
        } else {
          const errorText = await response.text();
          console.error(`Failed to send reminder to ${assessment.email}:`, errorText);
          results.failed++;
          results.errors.push(`${assessment.email}: ${errorText}`);
        }
      } catch (error) {
        console.error(`Error sending reminder to ${assessment.email}:`, error);
        results.failed++;
        results.errors.push(`${assessment.email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return Response.json(
      {
        success: true,
        message: `Sent ${results.sent} reminders, ${results.failed} failed`,
        details: {
          total: assessments.length,
          sent: results.sent,
          failed: results.failed,
          errors: results.errors.length > 0 ? results.errors : undefined,
        },
      },
      {
        status: 200,
        headers: corsHeaders
      }
    );
  } catch (error) {
    console.error('Error sending reminders:', error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send reminders',
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};
