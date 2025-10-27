interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { searchParams } = new URL(context.request.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');

    if (slug) {
      const post = await context.env.DB
        .prepare('SELECT * FROM blog_posts WHERE slug = ? AND published = 1')
        .bind(slug)
        .first();

      return Response.json(post || null);
    }

    if (category) {
      const { results } = await context.env.DB
        .prepare('SELECT * FROM blog_posts WHERE published = 1 AND category = ? ORDER BY published_at DESC')
        .bind(category)
        .all();

      return Response.json(results || []);
    }

    const { results } = await context.env.DB
      .prepare('SELECT * FROM blog_posts WHERE published = 1 ORDER BY published_at DESC')
      .all();

    return Response.json(results || []);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return Response.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const post = await context.request.json();
    const id = crypto.randomUUID();

    await context.env.DB
      .prepare(`
        INSERT INTO blog_posts (
          id, title, slug, excerpt, content, category, author,
          author_title, image, read_time, published, featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        id,
        post.title,
        post.slug,
        post.excerpt,
        post.content,
        post.category,
        post.author,
        post.author_title || '',
        post.image,
        post.read_time,
        post.published ? 1 : 0,
        post.featured ? 1 : 0
      )
      .run();

    const newPost = await context.env.DB
      .prepare('SELECT * FROM blog_posts WHERE id = ?')
      .bind(id)
      .first();

    return Response.json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return Response.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    const { searchParams } = new URL(context.request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Post ID required' }, { status: 400 });
    }

    const post = await context.request.json();
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(post).forEach(([key, value]) => {
      updates.push(`${key} = ?`);
      if (key === 'published' || key === 'featured') {
        values.push(value ? 1 : 0);
      } else {
        values.push(value);
      }
    });

    updates.push('updated_at = strftime("%Y-%m-%dT%H:%M:%fZ", "now")');
    values.push(id);

    await context.env.DB
      .prepare(`UPDATE blog_posts SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    const updatedPost = await context.env.DB
      .prepare('SELECT * FROM blog_posts WHERE id = ?')
      .bind(id)
      .first();

    return Response.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return Response.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const { searchParams } = new URL(context.request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Post ID required' }, { status: 400 });
    }

    await context.env.DB
      .prepare('DELETE FROM blog_posts WHERE id = ?')
      .bind(id)
      .run();

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return Response.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
};
