# ⚡ Quick Start Guide

Get your README Generator running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DATABASE_URL="mysql://user:password@localhost:3306/readme_gen"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID="get from github.com/settings/developers"
GITHUB_SECRET="get from github.com/settings/developers"
GEMINI_API_KEY="get from makersuite.google.com/app/apikey"
```

## 3. Set Up Database

```bash
npx prisma generate
npx prisma db push
```

## 4. Run the App

```bash
npm run dev
```

Open `http://localhost:3000` and sign in with GitHub!

## Need Help?

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.

## Quick Links

- **GitHub OAuth**: https://github.com/settings/developers
- **Gemini API**: https://makersuite.google.com/app/apikey
- **Prisma Docs**: https://www.prisma.io/docs
