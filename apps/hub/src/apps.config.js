// Single source of truth for the launcher tiles.
//
// Each entry's `url` resolves from a Vite env var (set per deployment in
// Vercel) and falls back to a *.vercel.app placeholder so the hub renders and
// links somewhere sensible out of the box. Metadata (name/tagline/accent/icon)
// mirrors each module's own branding (index.html theme-color + title).

import {
  Flame,
  ShieldAlert,
  AlertTriangle,
  ClipboardCheck,
  FileSearch,
  Lock,
  Users,
  FileCheck2,
} from 'lucide-react'

const env = import.meta.env

export const APPS = [
  {
    id: 'fire-marshal',
    name: 'Fire Marshal',
    tagline: 'Fire extinguisher & equipment management',
    accent: '#f73838',
    icon: Flame,
    url: env.VITE_FIRE_MARSHAL_URL || 'https://fire-marshal.vercel.app',
  },
  {
    id: 'hira',
    name: 'HIRA',
    tagline: 'Hazard Identification & Risk Assessment',
    accent: '#3b82f6',
    icon: ShieldAlert,
    url: env.VITE_HIRA_URL || 'https://hira-ruddy.vercel.app',
  },
  {
    id: 'incident-ira',
    name: 'Incident IRA',
    tagline: 'Incident reporting & analysis',
    accent: '#f59e0b',
    icon: AlertTriangle,
    url: env.VITE_INCIDENT_IRA_URL || 'https://incident-ira.vercel.app',
  },
  {
    id: 'inspections',
    name: 'Inspections',
    tagline: 'Inspection forms & assignments',
    accent: '#c026d3',
    icon: ClipboardCheck,
    url: env.VITE_INSPECTIONS_URL || 'https://inspections-portal.vercel.app',
  },
  {
    id: 'internal-audit',
    name: 'Internal Audit',
    tagline: 'ISO 45001 audits, findings & CAPA',
    accent: '#6366f1',
    icon: FileSearch,
    url: env.VITE_INTERNAL_AUDIT_URL || 'https://internal-audit-portal.vercel.app',
  },
  {
    id: 'hecp-loto',
    name: 'HECP · LOTO',
    tagline: 'Hazardous energy control & lockout-tagout',
    accent: '#14b8a6',
    icon: Lock,
    url: env.VITE_HECP_LOTO_URL || 'https://hecp-loto.vercel.app',
  },
  {
    id: 'hse-committee',
    name: 'HSE Committee',
    tagline: 'Committee & consultation meetings',
    accent: '#22c55e',
    icon: Users,
    url: env.VITE_HSE_COMMITTEE_URL || 'https://hse-committee-meeting.vercel.app',
  },
  {
    id: 'permit-to-work',
    name: 'Permit to Work',
    tagline: 'PTW safety permits & approvals',
    accent: '#f97316',
    icon: FileCheck2,
    url: env.VITE_PERMIT_TO_WORK_URL || 'https://permit-to-work-two.vercel.app',
  },
]
