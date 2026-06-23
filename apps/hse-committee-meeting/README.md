# HSE Committee Meeting

Multi-organization HSE **committee & consultation meeting** management app — log meetings,
attendees, minutes, CAPA actions and statutory compliance across facility sites.

Built on the same **Log In / Sign Up / Create Organization** workflow as the Fire Marshal app
(Firebase Auth + Firestore + admin approval), recolored **green**, with the consultation meeting
module as the core feature. Cross-app integrations (e-mail notifications, other OHSMS modules) are
intentionally excluded.

## Stack
- React 18 + Vite + React Router 6
- Tailwind CSS (green claymorphism auth screens; dark slate + green meeting area)
- Firebase Authentication (Email/Password) + Cloud Firestore
- `xlsx` for Excel export; Font Awesome + Space Grotesk loaded via `index.html`

## Setup
1. **Create a Firebase project** (separate from any other app):
   - Firebase Console → add project.
   - **Authentication** → Sign-in method → enable **Email/Password**.
   - **Firestore Database** → create database (production mode).
2. **Add web config:** Project settings → Your apps → Web app → SDK config. Copy `.env.example`
   to `.env` and fill in the six `VITE_FIREBASE_*` values.
3. **Publish security rules:** set the project id in `.firebaserc`, then
   `firebase deploy --only firestore:rules` (or paste `firestore.rules` into the console).
4. Install & run:
   ```
   npm install
   npm run dev
   ```

## Usage
- **Register an organization** → you become the admin and land on the meetings dashboard.
- **Sites** (admin): add your facility sites — meetings are scoped/filtered by these.
- **New Meeting**: type, date/time, subject, attendees (internal + external), discussion minutes,
  and a CAPA action plan. Save, print formatted minutes, or export the list to Excel.
- **Calendar**: per-site statutory compliance tracking (monthly HSE committee, annual reviews…).
- **Sign-ups** join an existing org and wait for an admin to approve them in **Users**. Approved
  members get view-only access to meetings but can update the status of CAPA actions assigned to them.

## Data model (Firestore)
- `organizations/{orgId}` — org doc; subcollections `consultations/{id}` (meetings) and `sites/{id}`.
- `users/{uid}` — `{ name, email, orgId, orgName, role: admin|member, status: approved|pending|rejected }`.
- `orgIndex/{nameLower}` — public `{ orgId, name }` so the signup dropdown can list orgs.
