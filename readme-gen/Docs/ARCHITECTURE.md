# 🏗️ System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                        │
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │           React Frontend (Next.js 15)              │     │
│  │                                                    │     │
│  │  • Dashboard Component                             │     │
│  │  • Repository List                                 │     │
│  │  • README Preview Modal                            │     │
│  │  • Authentication UI                               │     │
│  └────────────────────────────────────────────────────┘     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTPS
                        ▼
┌────────────────────────────────────────────────────────────┐
│                   NEXT.JS SERVER                           │
│                                                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │              API Routes Layer                      │    │
│  │                                                    │    │
│  │  ┌──────────────┐  ┌──────────────┐                │    │
│  │  │ /api/repos   │  │/api/generate │                │    │
│  │  │              │  │              │                │    │
│  │  │ Fetch repos  │  │Generate      │                │    │
│  │  │ from GitHub  │  │README with AI│                │    │
│  │  └──────────────┘  └──────────────┘                │    │
│  │                                                    │    │
│  │  ┌──────────────────────────────────┐              │    │
│  │  │   /api/auth/[...nextauth]        │              │    │
│  │  │   NextAuth.js Authentication     │              │    │ 
│  │  └──────────────────────────────────┘              │    │
│  └────────────────────────────────────────────────────┘    │
│                                                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Business Logic Layer                  │    │
│  │                                                    │    │
│  │  ┌──────────────┐  ┌──────────────┐                │    │
│  │  │ github.ts    │  │ai-generator  │                │    │
│  │  │              │  │.ts           │                │    │
│  │  │• Fetch repos │  │• Build prompt│                │    │
│  │  │• Read files  │  │• Call Gemini │                │    │
│  │  │• Detect tech │  │• Generate    │                │    │
│  │  └──────────────┘  └──────────────┘                │    │
│  │                                                    │    │
│  │  ┌──────────────┐  ┌──────────────┐                │    │
│  │  │ auth.ts      │  │ prisma.ts    │                │    │
│  │  │              │  │              │                │    │
│  │  │• OAuth setup │  │• DB client   │                │    │
│  │  │• JWT tokens  │  │• Queries     │                │    │
│  │  └──────────────┘  └──────────────┘                │    │
│  └────────────────────────────────────────────────────┘    │
└───────────┬──────────────────┬──────────────┬──────────────┘
            │                  │              │
            ▼                  ▼              ▼
    ┌───────────────┐  ┌──────────────┐  ┌─────────────┐
    │  GitHub API   │  │  Gemini AI   │  │   MySQL     │
    │               │  │              │  │  Database   │
    │• Repos        │  │• Generate    │  │             │
    │• Files        │  │  README      │  │• Users      │
    │• Content      │  │• Analysis    │  │• Sessions   │
    └───────────────┘  └──────────────┘  └─────────────┘
```

## Data Flow Diagram

### 1. Authentication Flow

```
User clicks "Sign in with GitHub"
    ↓
NextAuth redirects to GitHub OAuth
    ↓
User authorizes application
    ↓
GitHub returns authorization code
    ↓
NextAuth exchanges code for access token
    ↓
Access token stored in JWT session
    ↓
User redirected to dashboard
```

### 2. Repository Fetching Flow

```
Dashboard loads
    ↓
Frontend calls GET /api/repos
    ↓
API validates session & extracts access token
    ↓
API calls GitHub API with access token
    ↓
GitHub returns user's repositories
    ↓
API transforms and returns data
    ↓
Frontend displays repositories
```

### 3. README Generation Flow

```
User clicks "Generate README"
    ↓
Frontend calls POST /api/generate
    ↓
API validates session
    ↓
API calls GitHub API to get repo tree
    ↓
API filters important files (max 50)
    ↓
API fetches file contents in batches
    ↓
API detects technologies from files
    ↓
API builds comprehensive prompt
    ↓
API calls Google Gemini AI
    ↓
Gemini analyzes code & generates README
    ↓
API returns README to frontend
    ↓
Frontend displays in preview modal
    ↓
User downloads or copies README
```

## Component Architecture

### Frontend Components

```
App Layout
│
├── Landing Page
│   ├── Hero Section
│   ├── Features
│   └── CTA
│
├── Auth Pages
│   ├── Sign In
│   └── Sign Up
│
└── Dashboard Layout
    ├── Sidebar
    │   ├── Navigation
    │   └── User Profile
    │
    ├── Topbar
    │   ├── Search
    │   └── Notifications
    │
    └── Main Content
        ├── UpdatedProjectSection
        │   ├── Filter Buttons
        │   ├── Search Input
        │   ├── Repository Grid
        │   │   └── Repository Card
        │   │       ├── Repo Info
        │   │       ├── Stats
        │   │       └── Generate Button
        │   └── Statistics Sidebar
        │
        └── ReadmePreview Modal
            ├── Header
            ├── View Toggle
            ├── Content Area
            └── Action Buttons
```

## Database Schema

```
┌─────────────────────────────────────┐
│              User                   │
├─────────────────────────────────────┤
│ id: String (PK)                     │
│ name: String?                       │
│ email: String (unique)              │
│ emailVerified: DateTime?            │
│ image: String?                      │
│ password: String?                   │
│ createdAt: DateTime                 │
│ updatedAt: DateTime                 │
└─────────────────────────────────────┘
            │
            │ 1:N
            ▼
┌─────────────────────────────────────┐
│            Account                  │
├─────────────────────────────────────┤
│ id: String (PK)                     │
│ userId: String (FK)                 │
│ type: String                        │
│ provider: String                    │
│ providerAccountId: String           │
│ refresh_token: Text?                │
│ access_token: Text?                 │
│ expires_at: Int?                    │
│ token_type: String?                 │
│ scope: String?                      │
│ id_token: Text?                     │
│ session_state: String?              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│            Session                  │
├─────────────────────────────────────┤
│ id: String (PK)                     │
│ sessionToken: String (unique)       │
│ userId: String (FK)                 │
│ expires: DateTime                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       VerificationToken             │
├─────────────────────────────────────┤
│ id: String (PK)                     │
│ identifier: String                  │
│ token: String (unique)              │
│ expires: DateTime                   │
└─────────────────────────────────────┘
```

## API Endpoints

### Authentication

```
POST /api/auth/signin
POST /api/auth/signout
POST /api/auth/signup
GET  /api/auth/session
GET  /api/auth/callback/github
```

### Application

```
GET  /api/repos
     → Fetch user's GitHub repositories
     
POST /api/generate
     → Generate README for a repository
     Body: { owner, repo, repoData }
```

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  • React 19                             │
│  • TailwindCSS 4                        │
│  • React Icons                          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Application Layer               │
│  • Next.js 15 (App Router)              │
│  • TypeScript 5                         │
│  • NextAuth.js 4                        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│  • GitHub Integration                   │
│  • AI Generation Logic                  │
│  • Technology Detection                 │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Data Access Layer               │
│  • Prisma ORM 6                         │
│  • MySQL Database                       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         External Services               │
│  • GitHub REST API                      │
│  • Google Gemini AI API                 │
└─────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│         Security Layers                 │
├─────────────────────────────────────────┤
│                                         │
│  1. Authentication                      │
│     • GitHub OAuth 2.0                  │
│     • JWT Sessions                      │
│     • Secure token storage              │
│                                         │
│  2. Authorization                       │
│     • Session validation                │
│     • Access token verification         │
│     • Scope-based permissions           │
│                                         │
│  3. Data Protection                     │
│     • Environment variables             │
│     • No credential exposure            │
│     • Secure API calls                  │
│                                         │
│  4. Input Validation                    │
│     • Request validation                │
│     • Type checking (TypeScript)        │
│     • Sanitization                      │
│                                         │
│  5. Rate Limiting                       │
│     • API call batching                 │
│     • File count limits                 │
│     • Size restrictions                 │
│                                         │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│            Production Setup             │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────┐      │
│  │      Vercel / Cloud Host      │      │
│  │                               │      │
│  │  • Next.js Application        │      │
│  │  • Serverless Functions       │      │
│  │  • Static Assets (CDN)        │      │
│  └───────────────────────────────┘      │
│                 ↓                       │
│  ┌───────────────────────────────┐      │
│  │      Database (MySQL)         │      │
│  │                               │      │
│  │  • PlanetScale / Railway      │      │
│  │  • Automated backups          │      │
│  │  • Connection pooling         │      │
│  └───────────────────────────────┘      │
│                 ↓                       │
│  ┌───────────────────────────────┐      │
│  │      External APIs            │      │
│  │                               │      │
│  │  • GitHub API                 │      │
│  │  • Google Gemini AI           │      │
│  └───────────────────────────────┘      │
│                                         │
└─────────────────────────────────────────┘
```

## Performance Optimizations

```
┌─────────────────────────────────────────┐
│         Optimization Strategies         │
├─────────────────────────────────────────┤
│                                         │
│  1. Frontend                            │
│     • Code splitting                    │
│     • Lazy loading                      │
│     • Image optimization                │
│     • CSS purging                       │
│                                         │
│  2. Backend                             │
│     • API route caching                 │
│     • Batched requests                  │
│     • Connection pooling                │
│     • Query optimization                │
│                                         │
│  3. External APIs                       │
│     • Request batching (5 at a time)    │
│     • File size limits (100KB)          │
│     • File count limits (50)            │
│     • Excluded directories              │
│                                         │
│  4. Database                            │
│     • Indexed queries                   │
│     • Efficient schema                  │
│     • Connection reuse                  │
│                                         │
└─────────────────────────────────────────┘
```

## Error Handling Flow

```
Error Occurs
    ↓
    ├─→ Network Error
    │       ↓
    │   Retry logic (3 attempts)
    │       ↓
    │   Show user-friendly message
    │
    ├─→ Authentication Error
    │       ↓
    │   Clear session
    │       ↓
    │   Redirect to login
    │
    ├─→ API Error
    │       ↓
    │   Log error details
    │       ↓
    │   Return sanitized error
    │       ↓
    │   Show user message
    │
    └─→ AI Generation Error
            ↓
        Fallback to template
            ↓
        Generate basic README
            ↓
        Notify user of fallback
```

---

**This architecture provides:**
- ✅ Scalability
- ✅ Security
- ✅ Performance
- ✅ Maintainability
- ✅ Reliability
