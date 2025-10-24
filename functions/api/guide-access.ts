interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { email, guide_name = 'rd-tax-credit' } = await context.request.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const existing = await context.env.DB
      .prepare('SELECT * FROM guide_access_emails WHERE email = ? AND guide_name = ?')
      .bind(email, guide_name)
      .first();

    if (existing) {
      await context.env.DB
        .prepare('UPDATE guide_access_emails SET access_count = access_count + 1, last_accessed_at = datetime("now") WHERE email = ? AND guide_name = ?')
        .bind(email, guide_name)
        .run();
    } else {
      await context.env.DB
        .prepare('INSERT INTO guide_access_emails (id, email, guide_name) VALUES (?, ?, ?)')
        .bind(crypto.randomUUID(), email, guide_name)
        .run();
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error saving guide access:', error);
    return Response.json({ error: 'Failed to save guide access' }, { status: 500 });
  }
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB
      .prepare('SELECT * FROM guide_access_emails ORDER BY created_at DESC')
      .all();

    return Response.json(results || []);
  } catch (error) {
    console.error('Error fetching guide access emails:', error);
    return Response.json({ error: 'Failed to fetch guide access emails' }, { status: 500 });
  }
};
