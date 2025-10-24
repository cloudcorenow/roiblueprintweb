interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
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
