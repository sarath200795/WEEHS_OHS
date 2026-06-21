import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { LEGAL, LEGAL_PAGES } from '../lib/legal'
import Logo from '../components/Logo'

const { companyName, productName, contactEmail, jurisdiction, effectiveDate } = LEGAL

// A block is { h?: heading, p?: paragraph, list?: [items] }.
const SECTIONS = {
  privacy: {
    title: 'Privacy Policy',
    intro: `This Privacy Policy explains how ${companyName} ("we") collects, uses, and protects information in ${productName} (the "Service") — a platform for logging HSE committee meetings, consultations and corrective actions.`,
    blocks: [
      { h: 'Information we collect', list: [
        'Account information you provide: your name and email address.',
        'Organization information: organization name, address, and the notification email set by an admin.',
        'Facility sites you define (site code and name).',
        'Meeting records you enter: meeting type, date and time, subject/agenda, pre-requisites, discussion minutes, the list of attendees (internal members and any external participants you add), and CAPA action items (description, owner, due date and status).',
        'Member directory data for your organization: name, email, role (admin/member) and approval status.',
      ] },
      { h: 'How we use it', p: 'We use this information solely to provide the Service: logging committee/consultation meetings, tracking attendees and CAPA actions, generating dashboards and per-site compliance views, and approving organization members. We do not sell your data or use it for advertising.' },
      { h: 'Storage & processing', p: 'Data is stored in Google Firebase (Cloud Firestore and Firebase Authentication). Each organization’s records are logically isolated, and access is restricted by security rules so that only approved members of an organization can read its data.' },
      { h: 'Attendees & external participants', p: 'When you record attendees you may enter the names of internal members and external participants (e.g. contractors). Only add the minimum personal data needed for an accurate meeting record, and ensure you have a lawful basis to record external participants.' },
      { h: 'Retention & deletion', p: 'Records are retained while your organization uses the Service. Admins can delete meeting records, and deletion is permanent. See the Data Retention & Deletion page for details and how to request export or deletion.' },
      { h: 'Your rights & contact', p: `To request access, export, correction, or deletion of your data, contact us at ${contactEmail}.` },
    ],
  },
  terms: {
    title: 'Terms of Service',
    intro: `These Terms govern your use of ${productName}, provided by ${companyName}. By using the Service you agree to them.`,
    blocks: [
      { h: 'Acceptable use', p: 'You may use the Service only for lawful health-and-safety record-keeping (committee meetings, consultations, management reviews and corrective actions) for your own organization. You are responsible for the accuracy of the data you enter and for the actions of the users you approve.' },
      { h: 'Accounts & organizations', p: 'The first user of an organization is its administrator and approves additional members. Administrators manage access, roles, facility sites, and the organization’s data. Approved members can log and edit meetings.' },
      { h: 'Not a substitute for professional H&S compliance', p: `${productName} is a record-keeping and tracking aid ONLY. It does NOT perform, certify, or replace any legal or regulatory health-and-safety obligation, statutory consultation requirement, risk assessment, or professional advice. You remain solely responsible for meeting all applicable HSE duties under the law and standards that apply to you.` },
      { h: 'Disclaimer of warranties', p: 'The Service is provided "AS IS" and "AS AVAILABLE", without warranties of any kind, express or implied, including fitness for a particular purpose and the accuracy of compliance/“meeting due” calculations or reminders.' },
      { h: 'Limitation of liability', p: `To the maximum extent permitted by law, ${companyName} shall not be liable for any indirect, incidental, or consequential damages, or for any loss arising from reliance on the Service, including missed meetings, actions, or compliance deadlines.` },
      { h: 'Governing law', p: `These Terms are governed by the laws of ${jurisdiction}.` },
      { h: 'Contact', p: `Questions about these Terms: ${contactEmail}.` },
    ],
  },
  retention: {
    title: 'Data Retention & Deletion',
    intro: 'This describes how long data is kept and how to remove it.',
    blocks: [
      { h: 'Active records', p: 'Meeting records, CAPA actions, facility sites, member directory and organization data are retained for as long as your organization uses the Service.' },
      { h: 'Deletion', p: 'Administrators can delete a meeting record at any time. Deletion is immediate and permanent — deleted records are removed from the database and cannot be recovered, so export anything you need first.' },
      { h: 'Member access', p: 'Admins can revoke a member’s access (set them to rejected) or change their role at any time; revoked members can no longer read the organization’s data.' },
      { h: 'Export', p: 'You can export the meeting list to an Excel (.xlsx) spreadsheet from the dashboard at any time for your own backup and reporting.' },
      { h: 'Requesting deletion', p: `To request deletion of your account or your organization’s data, contact ${contactEmail}.` },
    ],
  },
  cookies: {
    title: 'Cookies & Storage',
    intro: `${productName} keeps browser storage to a minimum.`,
    blocks: [
      { h: 'What we store', p: 'We use Firebase Authentication, which stores a session token in your browser to keep you signed in. The session uses session-storage persistence, so closing the browser tab signs you out. We also store small UI preferences locally (for example, where you pinned the on-screen guide “Sam”). These are strictly necessary or convenience-only.' },
      { h: 'What we do NOT use', p: 'We do not use third-party advertising or cross-site tracking cookies, and we do not run analytics that profile you across other websites.' },
      { h: 'Managing it', p: 'Signing out clears your session. Clearing your browser’s site data for this app removes the stored token and preferences.' },
      { h: 'Contact', p: `Questions: ${contactEmail}.` },
    ],
  },
}

export default function Legal({ kind = 'privacy' }) {
  const section = SECTIONS[kind] || SECTIONS.privacy

  return (
    <div className="aurora min-h-screen px-4 py-10 text-white">
      <motion.div
        className="mx-auto w-full max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={26} className="text-white" />
            <span className="text-lg font-extrabold tracking-tight">{productName}</span>
          </div>
          <Link to="/login" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
            <ArrowLeft size={15} /> Back to login
          </Link>
        </div>

        <div className="rounded-3xl bg-clay-surface p-6 text-ink-800 shadow-clay sm:p-9">
          <div className="mb-1 flex items-center gap-2 text-brand-600">
            <ShieldCheck size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{section.title}</h1>
          <p className="mt-1 text-sm text-ink-400">Effective date: {effectiveDate}</p>
          {section.intro && <p className="mt-4 text-ink-600">{section.intro}</p>}

          <div className="mt-6 space-y-6">
            {section.blocks.map((b, i) => (
              <section key={i}>
                {b.h && <h2 className="text-base font-bold text-ink-900">{b.h}</h2>}
                {b.p && <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{b.p}</p>}
                {b.list && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-600">
                    {b.list.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Cross-links to the other legal pages */}
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-ink-100 pt-5 text-sm">
            {LEGAL_PAGES.map((p) => (
              <Link
                key={p.kind}
                to={p.path}
                className={`font-semibold ${p.kind === kind ? 'text-ink-400' : 'text-brand-600 hover:underline'}`}
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {productName}. This is a record-keeping aid, not a substitute for statutory health-and-safety compliance.
        </p>
      </motion.div>
    </div>
  )
}
