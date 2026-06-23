# WEEHS OHS

Monorepo for the WEEHS Occupational Health & Safety (OHS) application suite.

It contains a central **Hub** (a launcher with tiles for every app, plus site
and user management) and the **front ends of every OHS module**, consolidated
into one repository as npm workspaces. Each module remains independently
buildable and deployable.

## Layout

```
apps/
  hub/                    # Launcher hub — tiles + Sites + Users (no login)
  fire-marshal/           # Fire extinguisher & equipment management
  hira/                   # Hazard Identification & Risk Assessment
  incident-ira/           # Incident reporting & analysis
  inspections-portal/     # Inspection forms & assignments
  internal-audit-portal/  # ISO 45001 audits, findings & CAPA
  hecp-loto/              # Hazardous energy control & lockout-tagout
  hse-committee-meeting/  # HSE committee & consultation meetings
  permit-to-work/         # Permit to Work (PTW) safety permits
```

Each app is a Vite + React 18 + Tailwind app. The modules use Firebase; the hub
does not (it is a pure front end that links out to the deployed apps).

## Getting started

```bash
npm install          # installs all workspaces from the single root lockfile

npm run dev:hub      # run the hub locally (http://localhost:5180)
npm run build:hub    # build the hub
npm run build:all    # build every app in the monorepo
```

To run an individual module:

```bash
npm run dev --workspace apps/hira
```

## The Hub

`apps/hub` is a launcher. It shows a tile for each app that opens that app's
deployed URL in a new tab, and provides **Sites** and **User management**
views. There are **no login pages** — access is assumed to be handled upstream
(network / SSO). Sites and users are stored client-side (localStorage) and are
ready to be wired to a shared backend later (see `apps/hub/src/lib/store.js`).

### Configuring tile destinations

Each tile's URL comes from an environment variable, with a `*.vercel.app`
placeholder default (see `apps/hub/src/apps.config.js`). Set the real URLs in
the hub's deployment (e.g. Vercel → Project → Settings → Environment
Variables). See `apps/hub/.env.example`:

| App | Env var |
| --- | --- |
| Fire Marshal | `VITE_FIRE_MARSHAL_URL` |
| HIRA | `VITE_HIRA_URL` |
| Incident IRA | `VITE_INCIDENT_IRA_URL` |
| Inspections | `VITE_INSPECTIONS_URL` |
| Internal Audit | `VITE_INTERNAL_AUDIT_URL` |
| HECP · LOTO | `VITE_HECP_LOTO_URL` |
| HSE Committee | `VITE_HSE_COMMITTEE_URL` |
| Permit to Work | `VITE_PERMIT_TO_WORK_URL` |

## Deployment

Each app deploys as its own project. On Vercel, set the **Root Directory** to
the app's folder, e.g. `apps/hub`, `apps/fire-marshal`, etc. The module apps
keep their existing `vercel.json`, Firebase config and environment variables.
