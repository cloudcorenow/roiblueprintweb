interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  RATE_LIMITER: RateLimit;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';

    const rateLimitKey = `newsletter:${ip}`;
    const { success } = await context.env.RATE_LIMITER.limit({ key: rateLimitKey });

    if (!success) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { email, source = 'website' } = await context.request.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const existing = await context.env.DB
      .prepare('SELECT * FROM newsletter_subscriptions WHERE email = ?')
      .bind(email)
      .first();

    if (existing) {
      return Response.json({ error: 'Email already subscribed' }, { status: 400 });
    }

    await context.env.DB
      .prepare('INSERT INTO newsletter_subscriptions (id, email, source) VALUES (?, ?, ?)')
      .bind(crypto.randomUUID(), email, source)
      .run();

    if (context.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'ROI Blueprint <notifications@roiblueprint.com>',
          to: ['sales@roiblueprint.com'],
          subject: `New Newsletter Subscription: ${email}`,
          html: `
            <h2>New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> ${source}</p>
          `,
        }),
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error saving newsletter subscription:', error);
    return Response.json({ error: 'Failed to save newsletter subscription' }, { status: 500 });
  }
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB
      .prepare('SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC')
      .all();

    return Response.json(results || []);
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return Response.json({ error: 'Failed to fetch newsletter subscriptions' }, { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'ID is required' }, { status: 400 });
    }

    await context.env.DB
      .prepare('DELETE FROM newsletter_subscriptions WHERE id = ?')
      .bind(id)
      .run();

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting newsletter subscription:', error);
    return Response.json({ error: 'Failed to delete newsletter subscription' }, { status: 500 });
  }
};
