# 🧝 Elf on the Shelf - Sprinkles' Corner

A magical family web app for tracking Sprinkles the Elf's adventures during the Christmas season!

## Features

- **Countdown Gate**: Before reveal time, shows a festive countdown timer
- **Elf Posts Feed**: Daily updates about where Sprinkles was found
- **Nice Score Tracker**: Track the kids' nice scores
- **Intro Video**: Optional video introduction for the elf
- **Parent Admin Portal**: Manage posts, kids, and settings

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL on Neon
- **ORM**: Prisma
- **Deployment**: Vercel

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd elfontheshelf
npm install
```

### 2. Set Up Neon Database

1. Go to [Neon](https://neon.tech) and create a new project
2. Copy the connection string from the dashboard

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
DATABASE_URL="your-neon-connection-string"
DIRECT_URL="your-neon-connection-string"
NEXT_PUBLIC_REVEAL_AT="2025-11-30T15:00:00Z"
ADMIN_PASSWORD="YourSecurePassword"
```

### 4. Initialize Database

```bash
npm run db:push
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon Postgres connection string |
| `DIRECT_URL` | Yes | Direct connection URL (same as DATABASE_URL for Neon) |
| `NEXT_PUBLIC_REVEAL_AT` | Yes | ISO date when countdown ends (e.g., `2025-11-30T15:00:00Z`) |
| `ADMIN_PASSWORD` | Yes | Password for the admin portal |
| `NEXT_PUBLIC_ELF_INTRO_VIDEO_URL` | No | URL to elf intro video (MP4) |

## Admin Portal

Access the admin portal at `/admin`:

- **Dashboard**: Overview of posts and kids
- **Posts**: Create, edit, and delete elf posts
- **Kids**: Manage kids and their nice scores
- **Settings**: Configure elf name, welcome message, and video

Default password: `SantaIsComing` (change this in production!)

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables in the Vercel dashboard:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_REVEAL_AT`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_ELF_INTRO_VIDEO_URL` (optional)
4. Deploy!

### 3. Initialize Production Database

After first deployment, run:

```bash
npx prisma db push
npm run db:seed
```

Or use Vercel's build command which includes `prisma generate`.

## Project Structure

```
elfontheshelf/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data
├── src/
│   ├── app/
│   │   ├── admin/       # Admin portal pages
│   │   ├── api/         # API routes
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/      # React components
│   └── lib/             # Utilities (prisma, auth, etc.)
├── .env.example         # Example environment variables
└── README.md
```

## For the Family

- **Ellie & Aniyah**: Look for Sprinkles every morning!
- **Parents**: Use the admin portal to add daily posts about where you hid the elf

Happy Holidays! 🎄🧝❄️
