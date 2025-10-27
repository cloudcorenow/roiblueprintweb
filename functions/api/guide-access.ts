interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    const country = context.request.headers.get('CF-IPCountry') || 'XX';

    if (country !== 'US') {
      console.log(`Blocked guide access from country: ${country}, IP: ${ip}`);
      return Response.json(
        { error: 'We currently only accept requests from the United States.' },
        { status: 403 }
      );
    }

    const { email, guide_name = 'rd-tax-credit' } = await context.request.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const existing = await context.env.DB
      .prepare('SELECT * FROM guide_access_emails WHERE email = ? AND guide_name = ?')
      .bind(email, guide_name)
      .first();

    const isoNow = new Date().toISOString();

    if (existing) {
      await context.env.DB
        .prepare(
          'UPDATE guide_access_emails SET access_count = access_count + 1, last_accessed_at = ? WHERE email = ? AND guide_name = ?'
        )
        .bind(isoNow, email, guide_name)
        .run();
    } else {
      await context.env.DB
        .prepare(
          'INSERT INTO guide_access_emails (id, email, guide_name, created_at, last_accessed_at) VALUES (?, ?, ?, ?, ?)'
        )
        .bind(crypto.randomUUID(), email, guide_name, isoNow, isoNow)
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

    const normalizeDateTime = (value: unknown): string => {
      if (typeof value !== 'string') {
        return typeof value === 'number' ? new Date(value).toISOString() : '';
      }

      const trimmed = value.trim();

      if (!trimmed) {
        return trimmed;
      }

      if (trimmed.endsWith('Z') || trimmed.includes('+')) {
        return trimmed;
      }

      const candidate = trimmed.includes('T') ? trimmed : trimmed.replace(' ', 'T');
      const withUtcSuffix = candidate.endsWith('Z') || candidate.includes('+') ? candidate : `${candidate}Z`;
      const timestamp = Date.parse(withUtcSuffix);

      if (Number.isNaN(timestamp)) {
        return trimmed;
      }

      return new Date(timestamp).toISOString();
    };

    const normalizedResults = (results || []).map((record) => {
      const row = record as Record<string, unknown>;

      return {
        ...row,
        created_at: normalizeDateTime(row.created_at),
        last_accessed_at: normalizeDateTime(row.last_accessed_at),
      };
    });

    return Response.json(normalizedResults);
  } catch (error) {
    console.error('Error fetching guide access emails:', error);
    return Response.json({ error: 'Failed to fetch guide access emails' }, { status: 500 });
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
      .prepare('DELETE FROM guide_access_emails WHERE id = ?')
      .bind(id)
      .run();

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting guide access email:', error);
    return Response.json({ error: 'Failed to delete guide access email' }, { status: 500 });
  }
};
