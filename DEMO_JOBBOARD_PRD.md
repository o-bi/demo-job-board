# StellenMarkt.ch - Demo Job Board PRD

## Overview

StellenMarkt.ch is a demo job board application that simulates a typical Swiss job portal. Its purpose is to showcase how TalentMatch AI integrates into an existing job board, demonstrating the value proposition to potential B2B customers.

**Goal:** Show prospects a realistic "before and after" - a functional job board enhanced with TalentMatch's AI-powered matching, CV parsing, and talent pool features.

---

## Target Audience

| Audience | Purpose |
|----------|---------|
| Potential Partners | Sales demos showing TalentMatch integration |
| Job Board Operators | See how their platform could work with TalentMatch |
| Internal Team | Testing and showcasing new features |

---

## Core Concept

StellenMarkt.ch represents a **mid-sized Swiss job board** that has integrated TalentMatch as their AI layer. The demo should feel like a real, established job portal - not a tech demo.

**Branding:**
- Name: StellenMarkt.ch
- Tagline: "Jobs in der Schweiz"
- Style: Clean, professional, Swiss - blue/white color scheme
- Language: German (Swiss German style - no ß)

---

## Features

### Public Pages (No Auth)

#### 1. Homepage `/`
- Hero with search bar (job title, location)
- Featured/recent jobs (6-12 jobs)
- Quick category links (IT, Finance, Healthcare, etc.)
- "Für Arbeitgeber" CTA
- Stats: "2'500+ Jobs, 150+ Unternehmen"

#### 2. Job Listings `/jobs`
- Search with filters:
  - Keyword search
  - Location (Canton/City)
  - Category/Industry
  - Employment type
  - Workload (%)
  - Work model (Remote/Hybrid/Onsite)
- List view with job cards
- Pagination
- **TalentMatch Integration:** Toggle "KI-Suche" to show semantic search vs keyword search

#### 3. Job Detail `/jobs/:slug`
- Full job description
- Company sidebar with logo
- Apply button → application form or external URL
- Similar jobs (basic: same category)
- **TalentMatch Integration:** "Ähnliche Jobs für dich" - personalized if logged in

#### 4. Company Pages `/unternehmen/:slug`
- Company profile (logo, description, website)
- List of active jobs
- Basic stats (location, size, industry)

#### 5. Company Directory `/unternehmen`
- Grid/list of companies with jobs
- Filter by industry, location

---

### Candidate Features (Auth Required)

#### 6. Registration `/registrieren`
- Email/password registration
- Optional: CV upload during signup
- **TalentMatch Integration:** CV upload triggers parsing, auto-fills profile

#### 7. Login `/login`
- Email/password
- "Passwort vergessen" flow

#### 8. Candidate Dashboard `/dashboard`
- Overview: saved jobs, applications, profile completeness
- **TalentMatch Integration:** "Deine Top-Matches" - AI-matched jobs based on profile

#### 9. Candidate Profile `/dashboard/profil`
- Personal info (name, location, contact)
- Work experience (manual entry or CV import)
- Skills
- Education
- Job preferences (desired role, salary, location, workload)
- CV upload/management
- **TalentMatch Integration:**
  - "CV importieren" → parses and fills profile
  - Skills are auto-suggested
  - Match score shown for preferences

#### 10. Saved Jobs `/dashboard/gespeichert`
- List of bookmarked jobs
- Quick apply

#### 11. Applications `/dashboard/bewerbungen`
- Track application status
- Application history

#### 12. Job Recommendations `/dashboard/empfehlungen`
- **TalentMatch Integration:** Full page of AI-matched jobs
- Show match % and reasons
- Filter by match score, location, etc.

---

### Employer Features (Auth Required)

#### 13. Employer Registration `/arbeitgeber/registrieren`
- Company info
- Contact person
- Creates company + employer account

#### 14. Employer Dashboard `/arbeitgeber/dashboard`
- Overview: active jobs, total views, applications
- Quick stats
- **TalentMatch Integration:** "Passende Kandidaten" teaser

#### 15. Post Job `/arbeitgeber/stellen/neu`
- Job creation form:
  - Title, description (rich text)
  - Location, work model
  - Employment type, workload
  - Salary (optional)
  - Requirements, benefits
  - Application method (email/URL/form)
- Preview before publish
- **TalentMatch Integration:** After posting, show "X passende Kandidaten gefunden"

#### 16. Manage Jobs `/arbeitgeber/stellen`
- List of posted jobs (draft, active, expired)
- Edit, duplicate, deactivate
- View applications per job
- **TalentMatch Integration:** "Matches" column showing candidate count

#### 17. Job Detail (Employer) `/arbeitgeber/stellen/:id`
- Job performance (views, applications)
- List of applicants
- **TalentMatch Integration:** Tab "KI-Matches" showing matched candidates from talent pool with scores

#### 18. Candidate Search `/arbeitgeber/talentpool`
- **TalentMatch Integration (Premium Feature):**
  - Search talent pool by skills, experience
  - See candidate profiles (anonymized or full based on settings)
  - Invite to apply
  - Match score for each candidate

#### 19. Company Profile Edit `/arbeitgeber/profil`
- Edit company info, logo, description
- Manage team members (optional)

---

## TalentMatch Integration Points

| Feature | Without TalentMatch | With TalentMatch |
|---------|---------------------|------------------|
| Job Search | Keyword only | Semantic AI search |
| CV Upload | Manual profile entry | Auto-parsed, skills extracted |
| Job Recommendations | Same category | Personalized AI matches |
| Candidate for Jobs | Manual search | AI-matched candidates with scores |
| Talent Pool | Not available | Searchable, matched candidates |

### API Calls to TalentMatch

```
POST /api/cv/parse              # Parse uploaded CV
POST /api/search                # Semantic job search
GET  /api/matches/jobs          # Get matched jobs for candidate
GET  /api/matches/candidates    # Get matched candidates for job
POST /api/profiles/sync         # Sync candidate profile
POST /api/jobs/sync             # Sync job posting
```

---

## Data Model

### Core Entities

```
User
  - id
  - email
  - password (hashed)
  - role: 'candidate' | 'employer'
  - createdAt

CandidateProfile
  - userId
  - firstName, lastName
  - location
  - phone
  - summary
  - experiences[]
  - education[]
  - skills[]
  - preferences (role, salary, location, workload)
  - cvFile
  - talentMatchProfileId (linked TalentMatch profile)

Company
  - id
  - name
  - slug
  - website
  - logo
  - description
  - industry
  - size
  - location
  - talentMatchCompanyId

Job
  - id
  - companyId
  - title
  - slug
  - description
  - location
  - employmentType
  - workload { min, max }
  - workModel
  - salary { min, max, public }
  - requirements
  - benefits
  - applicationUrl
  - status: 'draft' | 'active' | 'expired'
  - publishedAt
  - expiresAt
  - talentMatchJobId (linked TalentMatch job)

Application
  - id
  - jobId
  - candidateId
  - status: 'new' | 'reviewed' | 'interview' | 'rejected' | 'hired'
  - message
  - cvFile
  - createdAt

SavedJob
  - candidateId
  - jobId
  - createdAt
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Database | SQLite (simple) or PostgreSQL |
| ORM | Drizzle or Prisma |
| Auth | NextAuth.js or Clerk |
| File Upload | Local or S3-compatible |
| Deployment | Vercel |

**Keep it simple** - this is a demo, not production. SQLite + local file storage is fine.

---

## Pages Summary

| Route | Auth | Role | Description |
|-------|------|------|-------------|
| `/` | - | - | Homepage |
| `/jobs` | - | - | Job listings |
| `/jobs/:slug` | - | - | Job detail |
| `/unternehmen` | - | - | Company directory |
| `/unternehmen/:slug` | - | - | Company profile |
| `/login` | - | - | Login |
| `/registrieren` | - | - | Candidate registration |
| `/dashboard` | Yes | Candidate | Candidate dashboard |
| `/dashboard/profil` | Yes | Candidate | Edit profile |
| `/dashboard/gespeichert` | Yes | Candidate | Saved jobs |
| `/dashboard/bewerbungen` | Yes | Candidate | Applications |
| `/dashboard/empfehlungen` | Yes | Candidate | AI job matches |
| `/arbeitgeber/registrieren` | - | - | Employer registration |
| `/arbeitgeber/dashboard` | Yes | Employer | Employer dashboard |
| `/arbeitgeber/stellen` | Yes | Employer | Manage jobs |
| `/arbeitgeber/stellen/neu` | Yes | Employer | Post job |
| `/arbeitgeber/stellen/:id` | Yes | Employer | Job detail + matches |
| `/arbeitgeber/talentpool` | Yes | Employer | Search candidates |
| `/arbeitgeber/profil` | Yes | Employer | Company profile |

---

## Design Guidelines

- **Colors:** Blue primary (#0066CC), white background, gray text
- **Typography:** System fonts, clean and readable
- **Layout:** Max-width container (1200px), generous whitespace
- **Components:** Use shadcn/ui for consistency
- **Tone:** Professional, trustworthy, Swiss
- **Language:** German, formal "Sie", no ß (Swiss German)

---

## Demo Scenarios

### Scenario 1: Candidate Experience
1. Visit homepage, search for "Software Entwickler Zürich"
2. Show keyword results vs toggle "KI-Suche" for semantic results
3. Register, upload CV
4. Show auto-parsed profile with extracted skills
5. View personalized job recommendations with match scores
6. Apply to a job

### Scenario 2: Employer Experience
1. Login as employer
2. View dashboard with active jobs
3. Post a new job
4. See "15 passende Kandidaten gefunden" after posting
5. Browse AI-matched candidates with scores
6. Invite top candidate to apply

### Scenario 3: Integration Demo
1. Show job board working standalone (basic search)
2. Enable TalentMatch features one by one
3. Demonstrate the uplift in UX and conversion

---

## Success Metrics (Demo)

- Prospect understands the value proposition within 5 minutes
- Clear before/after comparison
- Realistic enough to feel like their own platform
- Easy to customize branding for specific prospects

---

## Development Phases

### Phase 1: Core Job Board (MVP)
- Homepage, job listings, job detail
- Company pages
- Basic candidate registration/login
- Profile creation (manual)
- Job posting for employers

### Phase 2: TalentMatch Integration
- CV parsing integration
- Semantic search
- Job recommendations for candidates
- Candidate matching for employers

### Phase 3: Polish
- Saved jobs, applications tracking
- Employer analytics
- Email notifications
- Mobile responsiveness

---

## Open Questions

1. Should we use real job data or synthetic demo data?
2. Auth: Simple email/password or integrate with Clerk?
3. Hosting: Separate domain (stellenmarkt.demo.ch) or subdomain?
4. Should candidates see each other's (anonymized) profiles?

---

## Next Steps

1. Set up Next.js project with Tailwind + shadcn/ui
2. Create basic page structure
3. Implement auth
4. Build job listings and detail pages
5. Add employer job posting
6. Integrate TalentMatch API for AI features
