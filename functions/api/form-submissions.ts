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

    const body = await context.request.json();
    const { id, is_blocked, status, result, metadata } = body;

    if (!id) {
      return Response.json(
        { error: 'Invalid request. id is required' },
        { status: 400 }
      );
    }

    const updates: string[] = [];
    const values: any[] = [];

    if (typeof is_blocked === 'boolean') {
      updates.push('is_blocked = ?');
      values.push(is_blocked ? 1 : 0);
    }

    if (status) {
      updates.push('status = ?');
      values.push(status);
    }

    if (result !== undefined) {
      updates.push('result = ?');
      values.push(result);
    }

    if (status === 'completed') {
      updates.push('completed_at = datetime("now")');
    }

    if (metadata) {
      updates.push('metadata = ?');
      values.push(typeof metadata === 'string' ? metadata : JSON.stringify(metadata));
    }

    if (updates.length === 0) {
      return Response.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    values.push(id);

    await DB
      .prepare(`UPDATE form_submissions SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
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
