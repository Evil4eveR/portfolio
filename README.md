# Portfolio

Personal portfolio built with Next.js, Tailwind CSS v4, shadcn/ui, Prisma, and Bun.

## Tech Stack

- **Framework** — Next.js 16 (App Router, standalone output)
- **Styling** — Tailwind CSS v4 + shadcn/ui
- **Database** — Prisma ORM (SQLite for dev, PostgreSQL for production)
- **Auth** — Auth.js v5 (next-auth)
- **Email** — Resend
- **Runtime** — Bun
- **Reverse proxy** — Caddy

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/Evil4eveR/portfolio.git
cd portfolio
bun install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in all required values (see comments in the file).

### 3. Set up the database

```bash
bun run db:generate   # generate Prisma client
bun run db:push       # push schema to DB (dev)
```

### 4. Run in development

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## Email / Contact Form

The contact form uses [Resend](https://resend.com) to send emails.

1. Create a free account at [resend.com](https://resend.com)
2. Add and verify your domain
3. Create an API key
4. Set `RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`, and `CONTACT_FROM_EMAIL` in `.env`

---

## Production Build

```bash
bun run build
bun run start
```

The project outputs a Next.js standalone build. Use the included `Caddyfile` to reverse-proxy port 81 → 3000.

```bash
caddy run --config Caddyfile
```

---

## Database Scripts

| Script | Description |
|---|---|
| `bun run db:generate` | Regenerate Prisma client |
| `bun run db:push` | Push schema changes (dev, no migration) |
| `bun run db:migrate` | Create and run a migration |
| `bun run db:reset` | Reset database (dev only — destroys data) |

---

## Project Structure

```
├── src/
│   ├── app/                  # Next.js App Router pages & API routes
│   │   └── api/contact/      # Contact form API endpoint
│   ├── components/           # Reusable UI components
│   │   └── ContactForm.tsx   # Contact form component
│   └── lib/
│       └── resend.ts         # Email utility
├── prisma/                   # Prisma schema & migrations
├── public/                   # Static assets
├── skills/                   # (internal reference — can be removed)
├── mini-services/            # Supporting microservices
├── examples/                 # Dev experiments
├── Caddyfile                 # Reverse proxy config
├── next.config.ts
└── .env.example              # Environment variable reference
```

---

## License

MIT
