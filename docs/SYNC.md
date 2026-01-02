# Data Sync Documentation

This document explains how to sync jobs from SwissDevJobs and enrich company logos.

## Prerequisites

Both endpoints require authentication via Bearer token. Use the `PAYLOAD_SECRET` or `SYNC_SECRET` environment variable.

```bash
AUTH_TOKEN="your-payload-secret-here"
BASE_URL="https://your-domain.com"
```

---

## 1. Sync Jobs from SwissDevJobs

Fetches all jobs from the SwissDevJobs API and syncs them to the database.

### Endpoint

```
POST /api/sync
```

### What it does

1. Fetches all jobs from `https://swissdevjobs.ch/api/jobsLight`
2. For each job, fetches details from `https://swissdevjobs.ch/api/job/{id}`
3. Creates or updates companies based on job data
4. Creates or updates jobs with full details including:
   - Job title, description, requirements, responsibilities
   - Location with coordinates (latitude/longitude)
   - Salary information
   - Skills/technologies
   - Benefits (translated to German)

### Usage

```bash
curl -X POST "${BASE_URL}/api/sync" \
  -H "Authorization: Bearer ${AUTH_TOKEN}" \
  -H "Content-Type: application/json"
```

### Response

```json
{
  "success": true,
  "companies": 150,
  "jobs": {
    "created": 45,
    "updated": 200,
    "skipped": 5,
    "total": 250
  }
}
```

---

## 2. Enrich Company Logos

Fetches company logos from the CompanyEnrich API for companies without logos.

### Endpoint

```
POST /api/enrich-logos
```

### What it does

1. Finds all companies where `logoUrl` is null or empty
2. For each company:
   - Uses the company's `website` field to extract the domain (preferred)
   - Falls back to guessing domain from company name
3. Calls the CompanyEnrich API to fetch the logo
4. Updates the company with the logo URL

### Usage

```bash
curl -X POST "${BASE_URL}/api/enrich-logos" \
  -H "Authorization: Bearer ${AUTH_TOKEN}" \
  -H "Content-Type: application/json"
```

### Check companies without logos (GET)

```bash
curl "${BASE_URL}/api/enrich-logos" \
  -H "Authorization: Bearer ${AUTH_TOKEN}"
```

Returns:
```json
{
  "companiesWithoutLogos": 5,
  "companies": ["Company A", "Company B", ...]
}
```

### Response (POST)

```json
{
  "success": true,
  "total": 5,
  "enriched": 5,
  "failed": 0,
  "results": [
    {
      "name": "Example AG",
      "status": "enriched",
      "domain": "example.ch",
      "logoUrl": "https://api.companyenrich.com/companies/logo/..."
    }
  ]
}
```

### Improving logo matching

If a company logo isn't found:

1. Go to the Payload CMS admin panel
2. Edit the company
3. Add the correct website URL (e.g., `https://zkb.ch`)
4. Run the enrich-logos endpoint again

The API will use the website field to extract the exact domain instead of guessing.

---

## 3. Environment Variables

| Variable | Description |
|----------|-------------|
| `PAYLOAD_SECRET` | Authentication token for API endpoints |
| `SYNC_SECRET` | Alternative auth token (optional) |
| `COMPANYENRICH_API_KEY` | API key for CompanyEnrich service |

---

## 4. Recommended Sync Schedule

1. **Daily**: Run `/api/sync` to fetch new jobs and update existing ones
2. **After sync**: Run `/api/enrich-logos` to fetch logos for new companies

### Example cron job (via external service)

```bash
# Sync jobs daily at 6 AM
0 6 * * * curl -X POST "https://your-domain.com/api/sync" -H "Authorization: Bearer $TOKEN"

# Enrich logos daily at 7 AM
0 7 * * * curl -X POST "https://your-domain.com/api/enrich-logos" -H "Authorization: Bearer $TOKEN"
```
