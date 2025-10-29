# 📦 Installation Instructions

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 19
- NextAuth.js (GitHub OAuth)
- Prisma (Database ORM)
- Google Generative AI SDK
- TailwindCSS
- React Icons

## Step 2: Configure Environment Variables

1. Copy the example file:
```bash
cp .env.example .env
```

2. Fill in your credentials in `.env`:

### Database Configuration
```env
DATABASE_URL="mysql://username:password@localhost:3306/readme_generator"
```

Replace:
- `username` - your MySQL username
- `password` - your MySQL password
- `localhost:3306` - your MySQL host and port
- `readme_generator` - your database name

### NextAuth Configuration
```env
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secret:
```bash
openssl rand -base64 32
```

### GitHub OAuth Setup

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: README Generator
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy credentials to `.env`:

```env
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
```

### Google Gemini API Setup

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy to `.env`:

```env
GEMINI_API_KEY="your_gemini_api_key"
```

## Step 3: Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push
```

## Step 4: Run the Application

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Step 5: Sign In

1. Click "Sign In with GitHub"
2. Authorize the application
3. You'll be redirected to the dashboard

## Step 6: Generate README

1. Your GitHub repositories will load automatically
2. Click "Generate README" on any repository
3. Wait for AI to analyze and generate
4. Preview, download, or copy the generated README

## Troubleshooting

### "Cannot connect to database"
- Ensure MySQL is running
- Check DATABASE_URL format
- Verify database exists

### "GitHub OAuth error"
- Verify GITHUB_ID and GITHUB_SECRET
- Check callback URL matches exactly
- Ensure app is not in development mode restrictions

### "Gemini API error"
- Verify GEMINI_API_KEY is correct
- Check API quota at Google AI Studio
- App will fallback to template if AI fails

### "No repositories showing"
- Ensure you signed in with GitHub (not credentials)
- Check GitHub OAuth has 'repo' scope
- Try signing out and back in

## Production Deployment

For production:

1. Update `.env`:
```env
NEXTAUTH_URL="https://yourdomain.com"
```

2. Build the application:
```bash
npm run build
npm start
```

3. Use a production database
4. Set up proper SSL/HTTPS
5. Secure your environment variables

## Need Help?

- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed explanations
- See [QUICKSTART.md](./QUICKSTART.md) for quick setup
- Open an issue on GitHub
