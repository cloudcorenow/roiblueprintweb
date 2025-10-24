# Cloudflare Deployment Guide

This project is configured to deploy on Cloudflare Pages with D1 database.

## Prerequisites

1. A Cloudflare account
2. Wrangler CLI installed globally: `npm install -g wrangler`
3. Authenticated with Cloudflare: `wrangler login`

## Setup Steps

### 1. Create D1 Database

```bash
# Create the database
wrangler d1 create roi-blueprint-db

# This will output a database ID like:
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 2. Update wrangler.toml

Replace `your-database-id` in `wrangler.toml` with your actual database ID:

```toml
[[d1_databases]]
binding = "DB"
database_name = "roi-blueprint-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # Replace this
```

### 3. Run Migrations

Apply the database migrations to your D1 database:

```bash
# Apply first migration (blog_posts table)
wrangler d1 execute roi-blueprint-db --file=./migrations/0001_create_blog_posts.sql

# Apply second migration (guide_access_emails table)
wrangler d1 execute roi-blueprint-db --file=./migrations/0002_create_guide_access_emails.sql
```

### 4. Deploy to Cloudflare Pages

#### Option A: Connect GitHub Repository (Recommended)

1. Push your code to a GitHub repository
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
3. Click "Create a project"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `22`
6. Add D1 database binding:
   - Go to Settings → Functions
   - Add D1 database binding: `DB` → `roi-blueprint-db`
7. Deploy

#### Option B: Direct Deploy with Wrangler

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=roi-blueprint
```

### 5. Configure Production Environment

In Cloudflare Dashboard → Pages → Your Project → Settings:

1. **Functions**:
   - Ensure D1 binding is set: `DB` → `roi-blueprint-db`

2. **Build settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `22`

## Local Development

### With D1 Local Database

```bash
# Start local development with D1
wrangler pages dev dist --d1 DB=roi-blueprint-db

# In another terminal, run the dev server
npm run dev
```

### Test API Endpoints Locally

After running `wrangler pages dev`:

- Blog API: `http://localhost:8788/api/blog`
- Guide Access API: `http://localhost:8788/api/guide-access`

## Database Management

### View Database Contents

```bash
# Open D1 console
wrangler d1 execute roi-blueprint-db --command="SELECT * FROM blog_posts"

# Or use interactive shell
wrangler d1 execute roi-blueprint-db --local
```

### Backup Database

```bash
# Export production database
wrangler d1 export roi-blueprint-db --output=backup.sql

# Import to another database
wrangler d1 execute roi-blueprint-db-new --file=backup.sql
```

## API Endpoints

### Blog Posts

- **GET** `/api/blog` - Get all published posts
- **GET** `/api/blog?slug=post-slug` - Get post by slug
- **GET** `/api/blog?category=category-name` - Get posts by category
- **POST** `/api/blog` - Create new post
- **PUT** `/api/blog?id=post-id` - Update post
- **DELETE** `/api/blog?id=post-id` - Delete post

### Guide Access

- **POST** `/api/guide-access` - Record guide access
- **GET** `/api/guide-access` - Get all guide access records

## Troubleshooting

### Database Not Found

If you get "Database not found" errors:
1. Ensure D1 binding is configured in Cloudflare Dashboard
2. Check that migrations have been applied
3. Verify database ID in `wrangler.toml`

### Build Failures

If build fails:
1. Run `npm install` to ensure all dependencies are installed
2. Check that Node version is 22 or higher
3. Run `npm run build` locally to test

### API Errors

If API endpoints return errors:
1. Check Cloudflare Functions logs in Dashboard
2. Verify D1 binding is correctly configured
3. Ensure migrations have been applied

## Migration from Supabase

This project was migrated from Supabase to Cloudflare. Key changes:

1. **Database**: PostgreSQL → D1 (SQLite)
2. **Hosting**: Netlify → Cloudflare Pages
3. **API**: Supabase Edge Functions → Cloudflare Pages Functions
4. **Auth**: Removed Supabase Auth (can implement Cloudflare Access if needed)

### Data Migration

To migrate existing data from Supabase:

1. Export data from Supabase:
   ```sql
   COPY blog_posts TO '/path/to/blog_posts.csv' WITH CSV HEADER;
   ```

2. Convert to SQLite-compatible format and import to D1

## Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Pages Functions Docs](https://developers.cloudflare.com/pages/functions/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
