import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FullScreenLoader } from './ui'

/**
 * Wraps the auth pages. If already signed in, redirect into the app:
 *  - approved member → /app/dashboard
 *  - signed in but not approved → /pending
 */
export default function PublicOnlyRoute({ children }) {
  const { loading, isAuthed, profile, isApproved } = useAuth()

  if (loading) return <FullScreenLoader label="Loading…" />
  if (isAuthed && profile && isApproved) return <Navigate to="/app/dashboard" replace />
  if (isAuthed && profile && !isApproved) return <Navigate to="/pending" replace />
  return children
}
