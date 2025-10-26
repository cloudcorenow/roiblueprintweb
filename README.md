# ROI Blueprint Web

## Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Hosting**: Cloudflare Pages
- **Database**: Cloudflare D1 (SQLite at the edge)
- **Email**: Resend API
- **Security**: Cloudflare Turnstile

## Database: Cloudflare D1

**Important**: This project uses Cloudflare D1, NOT Supabase or other database providers.

See [DATABASE.md](./DATABASE.md) for complete database architecture documentation.

## Project Structure

```
/functions/api/          # Cloudflare Pages Functions (API endpoints)
  auth/                  # Authentication endpoints
  blog.ts               # Blog CRUD operations
  form-submissions.ts   # Form tracking
  guide-access.ts       # Guide download tracking
  newsletter.ts         # Newsletter subscriptions
  send-email.ts         # Email sending via Resend

/migrations/            # D1 database migrations
/src/
  components/          # React components
  contexts/           # React contexts (Auth)
  pages/              # Page components
  types/              # TypeScript type definitions
  utils/              # Utilities (blogService, d1Client)
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Deployed on Cloudflare Pages with automatic deployments from main branch.

Database migrations are applied via:
```bash
npx wrangler d1 execute DB_NAME --file=./migrations/XXXX_migration.sql
```
