# 🚀 README Generator - Complete Setup Guide

## Overview

This application automatically generates professional README files for your GitHub repositories using AI. It reads all your project files, analyzes the code, and creates comprehensive documentation with badges, icons, and detailed instructions.

## Features

✨ **AI-Powered Generation** - Uses Google Gemini AI to create intelligent, context-aware README files
🔍 **Deep Code Analysis** - Reads and analyzes all project files to understand your codebase
🎨 **Professional Formatting** - Includes badges, icons, code snippets, and proper Markdown formatting
📊 **Technology Detection** - Automatically detects frameworks, languages, and tools used
🔐 **GitHub Integration** - Seamlessly connects with your GitHub account
💾 **Download & Copy** - Easy download or copy generated README to clipboard

## Prerequisites

Before starting, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** database
- **GitHub Account**
- **Google Gemini API Key**

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and fill in the following:

```env
# Database (MySQL)
DATABASE_URL="mysql://username:password@localhost:3306/readme_generator"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-a-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth App
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"

# Google Gemini API
GEMINI_API_KEY="your_gemini_api_key"
```

### 3. Get GitHub OAuth Credentials

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: README Generator
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the **Client ID** to `GITHUB_ID`
6. Generate a **Client Secret** and copy to `GITHUB_SECRET`

### 4. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key to `GEMINI_API_KEY` in your `.env` file

### 5. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### 6. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output to `NEXTAUTH_SECRET` in `.env`

### 7. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000`

## How It Works

### 1. **Authentication**
- Users sign in with GitHub OAuth
- The app requests `repo` scope to read repository contents

### 2. **Repository Fetching**
- Fetches all user repositories from GitHub API
- Displays them in an organized dashboard with filters

### 3. **README Generation Process**

When you click "Generate README" on a repository:

1. **File Reading**: The app reads up to 50 important files from the repository
   - Source code files (.js, .py, .java, etc.)
   - Configuration files (package.json, requirements.txt, etc.)
   - Documentation files (existing README, LICENSE, etc.)

2. **Technology Detection**: Analyzes files to detect:
   - Programming languages
   - Frameworks (React, Next.js, Django, etc.)
   - Databases (MongoDB, PostgreSQL, etc.)
   - DevOps tools (Docker, GitHub Actions, etc.)

3. **AI Generation**: Sends file contents and metadata to Google Gemini AI with a comprehensive prompt to generate:
   - Project title with emoji
   - Badges (language, framework, license, etc.)
   - Description and features
   - Installation instructions
   - Usage examples
   - API documentation
   - Contributing guidelines
   - And more...

4. **Preview & Download**: Shows the generated README in a modal with options to:
   - Download as README.md
   - Copy to clipboard

## API Routes

### `GET /api/repos`
Fetches user's GitHub repositories

**Response:**
```json
[
  {
    "id": 123,
    "name": "my-project",
    "fullName": "username/my-project",
    "description": "Project description",
    "private": false,
    "language": "JavaScript",
    "stars": 10,
    "forks": 2,
    "issues": 1
  }
]
```

### `POST /api/generate`
Generates README for a repository

**Request:**
```json
{
  "owner": "username",
  "repo": "my-project",
  "repoData": {
    "description": "Project description",
    "language": "JavaScript",
    "stars": 10,
    "forks": 2
  }
}
```

**Response:**
```json
{
  "success": true,
  "readme": "# My Project\n\n...",
  "metadata": {
    "filesAnalyzed": 25,
    "technologies": ["React", "Node.js", "TypeScript"],
    "generatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Project Structure

```
readme-gen/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/route.ts    # README generation endpoint
│   │   │   ├── repos/route.ts       # Repository fetching endpoint
│   │   │   └── auth/[...nextauth]/  # NextAuth configuration
│   │   ├── components/
│   │   │   ├── UpdatedProjectSection.tsx  # Main dashboard component
│   │   │   ├── DashboardSidebar.tsx
│   │   │   └── DashboardTopbar.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx             # Dashboard page
│   │   │   └── layout.tsx           # Dashboard layout
│   │   └── auth/                    # Authentication pages
│   └── lib/
│       ├── github.ts                # GitHub API integration
│       ├── ai-generator.ts          # AI README generation logic
│       ├── auth.ts                  # NextAuth configuration
│       └── prisma.ts                # Prisma client
├── prisma/
│   └── schema.prisma                # Database schema
├── .env                             # Environment variables
└── package.json                     # Dependencies
```

## Technologies Used

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js with GitHub OAuth
- **Database**: MySQL with Prisma ORM
- **AI**: Google Gemini API
- **Icons**: React Icons, Lucide React

## Troubleshooting

### "No GitHub access token found"
- Make sure you signed in with GitHub (not credentials)
- Try signing out and signing in again
- Check that GitHub OAuth app has correct callback URL

### "Failed to fetch repositories"
- Verify GitHub OAuth credentials in `.env`
- Check that the app has `repo` scope enabled
- Ensure you're authenticated

### "Gemini API error"
- Verify your `GEMINI_API_KEY` is correct
- Check your API quota at Google AI Studio
- The app will fall back to template-based generation if AI fails

### Database connection errors
- Verify MySQL is running
- Check `DATABASE_URL` format in `.env`
- Run `npx prisma db push` to sync schema

## Security Notes

⚠️ **Important Security Practices:**

1. Never commit `.env` file to version control
2. Keep your API keys secret
3. Use strong `NEXTAUTH_SECRET`
4. Enable 2FA on your GitHub account
5. Regularly rotate API keys

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Open a GitHub issue
- Check existing documentation
- Review the code comments

---

Built with ❤️ using Next.js, Google Gemini AI, and GitHub API
