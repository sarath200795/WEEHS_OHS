import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import { FullScreenLoader } from './components/ui'
import { isFirebaseConfigured } from './firebase'
import SetupNeeded from './pages/SetupNeeded'

// Route-level code splitting — each page is fetched only when navigated to.
// Login/signup routes have been removed; the app opens straight into the app.
const Legal = lazy(() => import('./pages/Legal'))

const Consultation = lazy(() => import('./pages/Consultation'))
const Users = lazy(() => import('./pages/Users'))
const ManageSites = lazy(() => import('./pages/ManageSites'))

export default function App() {
  if (!isFirebaseConfigured) return <SetupNeeded />
  return (
    <Suspense fallback={<FullScreenLoader label="Loading…" />}>
      <Routes>
        <Route path="/" element={<Navigate to="/app/meetings" replace />} />
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="/data-retention" element={<Legal kind="retention" />} />
        <Route path="/cookies" element={<Legal kind="cookies" />} />

        <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/app/meetings" replace />} />
          <Route path="meetings" element={<Consultation />} />
          <Route path="users" element={<ProtectedRoute adminOnly><Users /></ProtectedRoute>} />
          <Route path="sites" element={<ProtectedRoute adminOnly><ManageSites /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/app/meetings" replace />} />
      </Routes>
    </Suspense>
  )
}
