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

    const stripTimezoneArtifacts = (input: string): string => {
      let sanitized = input.trim();

      if (!sanitized) {
        return sanitized;
      }

      sanitized = sanitized.replace(/\s*\([^)]*\)\s*$/, "");

      const offsetMatch = sanitized.match(/([+-]\d{2}:?\d{2})$/);
      if (offsetMatch) {
        sanitized = sanitized.slice(0, -offsetMatch[1].length).trim();
      }

      const trailingToken = sanitized.match(/\b([A-Z]{3,5})$/)?.[1];
      if (trailingToken && !["AM", "PM"].includes(trailingToken)) {
        sanitized = sanitized.slice(0, -trailingToken.length).trim();
      }

      return sanitized.replace(/\s{2,}/g, " ");
    };

    const normalizeDateTime = (value: unknown): string => {
      if (value instanceof Date) {
        return value.toISOString();
      }

      if (typeof value === "number") {
        return new Date(value).toISOString();
      }

      if (typeof value !== "string") {
        return "";
      }

      const trimmed = value.trim();

      if (!trimmed) {
        return trimmed;
      }

      if (trimmed.endsWith("Z")) {
        return trimmed;
      }

      const sanitized = stripTimezoneArtifacts(trimmed);

      const direct = Date.parse(sanitized);
      if (!Number.isNaN(direct)) {
        return new Date(direct).toISOString();
      }

      const candidate = sanitized.includes("T") ? sanitized : sanitized.replace(" ", "T");
      const withUtcSuffix = candidate.endsWith("Z") || /[+-]\d{2}:?\d{2}$/.test(candidate)
        ? candidate
        : `${candidate}Z`;

      const parsed = Date.parse(withUtcSuffix);
      if (!Number.isNaN(parsed)) {
        return new Date(parsed).toISOString();
      }

      const fallback = Date.parse(trimmed);
      if (!Number.isNaN(fallback)) {
        return new Date(fallback).toISOString();
      }

      return sanitized;
    };

    const normalizedResults = (result.results || []).map((row) => {
      const record = row as Record<string, unknown>;

      return {
        ...record,
        created_at: normalizeDateTime(record.created_at),
        last_submission_at: normalizeDateTime(record.last_submission_at),
      };
    });

    return Response.json(normalizedResults);
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
