import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { LEGAL } from '../lib/legal'

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      `${LEGAL.companyName} operates the ${LEGAL.productName}. This policy explains what data we hold and why.`,
      'We store your name, email and organization membership to provide access control, plus the inspection forms, assignments and completed records your organization creates.',
      'Data is scoped to your organization and visible only to approved members. Photo evidence you attach to an inspection is stored alongside that record.',
      `For privacy requests, contact ${LEGAL.contactEmail}. This policy is governed by the laws of ${LEGAL.jurisdiction}.`,
    ],
  },
  terms: {
    title: 'Terms of Service',
    body: [
      `By using the ${LEGAL.productName} you agree to use it for legitimate workplace inspection and compliance activities only.`,
      'Organization administrators are responsible for approving members and for the accuracy of inspection data recorded in their workspace.',
      'The service is provided “as is”, without warranty. We are not liable for compliance decisions made on the basis of recorded data.',
      `Questions? Contact ${LEGAL.contactEmail}.`,
    ],
  },
}

export default function Legal({ kind }) {
  const page = CONTENT[kind] || CONTENT.privacy
  return (
    <div className="aurora min-h-screen px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <Link to="/login" className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft size={16} /> Back to sign in
        </Link>
        <div className="rounded-3xl glass p-8">
          <h1 className="text-3xl font-extrabold">{page.title}</h1>
          <p className="mt-1 text-sm text-white/50">Effective {LEGAL.effectiveDate}</p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">
            {page.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}
