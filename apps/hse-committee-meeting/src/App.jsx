import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import { FullScreenLoader } from './components/ui'
import { isFirebaseConfigured } from './firebase'
import SetupNeeded from './pages/SetupNeeded'

// Route-level code splitting — each page is fetched only when navigated to.
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Signup = lazy(() => import('./pages/Signup'))
const RegisterOrg = lazy(() => import('./pages/RegisterOrg'))
const PendingApproval = lazy(() => import('./pages/PendingApproval'))
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
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register-org" element={<RegisterOrg />} />
        <Route path="/pending" element={<PendingApproval />} />
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
