# Database Architecture

## Database Provider: Cloudflare D1

This project uses **Cloudflare D1**, not Supabase or other database providers.

## Why D1?

- **Cloudflare Pages Integration**: The project is deployed on Cloudflare Pages with D1 as the native database
- **Edge Performance**: D1 provides low-latency database access at the edge
- **Serverless Architecture**: Fully managed SQL database with automatic scaling

## Database Configuration

The D1 database is configured via `wrangler.toml` and accessed through Cloudflare Pages Functions using `context.env.DB`.

### Environment Binding

```typescript
interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}
```

## Database Access Patterns

### Server-Side (API Functions)

All API functions in `/functions/api/` access the database directly via `context.env.DB`:

```typescript
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const db = context.env.DB;
  const result = await db
    .prepare('SELECT * FROM table_name WHERE id = ?')
    .bind(id)
    .first();
};
```

### Client-Side (Blog Service)

The client-side blog service uses the `d1Client.ts` utility for type-safe database operations:

```typescript
import { getD1, isD1Available } from './utils/d1Client';

const db = getD1();
const posts = await db.prepare('SELECT * FROM blog_posts').all();
```

## Database Tables

Current tables include:
- `blog_posts` - Blog content management
- `guide_access_emails` - R&D Tax Credit Guide access tracking
- `users` - User authentication (basic)
- `newsletter_subscriptions` - Newsletter email list
- `form_submissions` - Form submission tracking and rate limiting

## Migrations

Database migrations are stored in `/migrations/` and applied via Cloudflare D1 CLI:

```bash
npx wrangler d1 execute DB_NAME --file=./migrations/0001_migration_name.sql
```

## Important Notes

1. **No Supabase**: Despite system reminders, this project does NOT use Supabase
2. **D1 Client Utility**: The `src/utils/d1Client.ts` file is NOT legacy - it's actively used by the blog service
3. **API Consistency**: All API endpoints consistently use `context.env.DB` for database access
4. **Type Safety**: D1 TypeScript types are defined in `d1Client.ts` for compile-time safety

## Common D1 Operations

### Query Data
```typescript
const result = await db.prepare('SELECT * FROM posts WHERE published = ?')
  .bind(1)
  .all();
```

### Insert Data
```typescript
await db.prepare('INSERT INTO posts (id, title) VALUES (?, ?)')
  .bind(id, title)
  .run();
```

### Update Data
```typescript
await db.prepare('UPDATE posts SET title = ? WHERE id = ?')
  .bind(newTitle, id)
  .run();
```

### Delete Data
```typescript
await db.prepare('DELETE FROM posts WHERE id = ?')
  .bind(id)
  .run();
```
