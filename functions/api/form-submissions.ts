interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { DB } = context.env;

    if (!DB) {
      return Response.json({ error: 'Database not configured' }, { status: 500 });
    }

    const result = await DB
      .prepare(`
        SELECT
          id,
          email,
          form_type,
          ip_address,
          submission_count,
          last_submission_at,
          created_at,
          is_blocked
        FROM form_submissions
        ORDER BY last_submission_at DESC
      `)
      .all();

    return Response.json(result.results || []);
  } catch (error) {
    console.error('Error loading form submissions:', error);
    return Response.json(
      { error: 'Failed to load form submissions' },
      { status: 500 }
    );
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  try {
    const { DB } = context.env;

    if (!DB) {
      return Response.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { id, is_blocked } = await context.request.json();

    if (!id || typeof is_blocked !== 'boolean') {
      return Response.json(
        { error: 'Invalid request. id and is_blocked are required' },
        { status: 400 }
      );
    }

    await DB
      .prepare('UPDATE form_submissions SET is_blocked = ? WHERE id = ?')
      .bind(is_blocked ? 1 : 0, id)
      .run();

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating form submission:', error);
    return Response.json(
      { error: 'Failed to update form submission' },
      { status: 500 }
    );
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const { DB } = context.env;

    if (!DB) {
      return Response.json({ error: 'Database not configured' }, { status: 500 });
    }

    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'ID is required' }, { status: 400 });
    }

    await DB
      .prepare('DELETE FROM form_submissions WHERE id = ?')
      .bind(id)
      .run();

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting form submission:', error);
    return Response.json(
      { error: 'Failed to delete form submission' },
      { status: 500 }
    );
  }
};
