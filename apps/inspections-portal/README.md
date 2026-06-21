# Inspections Portal

A multi-organization portal for **creating inspection forms** and **assigning them to be completed**. Built with Vite + React + Firebase (Firestore) + Tailwind, sharing the same authentication flow and claymorphism design language as the Fire Marshal app — re-skinned in a **magenta** theme.

## Features

- **Login / Sign-up / Register organization** — identical to Fire Marshal: the first account in an org is the admin and approves teammates; members request access and wait for approval.
- **Inspection Forms (templates)** — a builder with custom questions (Pass/Fail, Text, Number), per-question photo requirements, and bulk question import from Excel.
- **Assignments** — schedule a form to a date as a one-off or a recurring series, with reschedule history, cancel/reopen.
- **Schedule** — a month calendar that explodes recurring forms and assignments into due dates; click a tile to run the inspection.
- **Execute** — fill out the checklist, attach photo evidence, auto-scored Pass/Fail.
- **Records** — searchable history with findings and full responses.
- **Admin** — user approvals & roles, append-only audit log.

## Getting started

```bash
npm install
npm run dev
```

The app runs on http://localhost:5174.

### Firebase

`.env` is preconfigured to reuse the same Firebase project as the Fire Marshal app, so existing organizations and logins work here too. To point at a different project, copy `.env.example` to `.env` and fill in your web config.

> **Important:** deploy `firestore.rules` to your Firebase project before using the app — it adds the `inspectionTemplates` and `inspectionRecords` collections (alongside the existing Fire Marshal rules). Without this, reads/writes to inspection data are denied.

```bash
firebase deploy --only firestore:rules
```

## Data model (Firestore, org-scoped)

- `organizations/{orgId}/inspectionTemplates/{id}` — form definition + `assignments[]`
- `organizations/{orgId}/inspectionRecords/{id}` — a completed inspection (score, responses)
- `organizations/{orgId}/auditLogs/{id}` — append-only trail
- `users/{uid}`, `orgIndex/{nameLower}`, `organizations/{orgId}` — shared auth/org data
