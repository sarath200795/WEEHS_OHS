import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import Layout from './components/Layout'
import { DataProvider } from './context/DataContext'
import { FullScreenLoader } from './components/ui'
import { isFirebaseConfigured } from './firebase'
import SetupNeeded from './pages/SetupNeeded'

const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const RegisterOrg = lazy(() => import('./pages/RegisterOrg'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const PendingApproval = lazy(() => import('./pages/PendingApproval'))
const Legal = lazy(() => import('./pages/Legal'))

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Forms = lazy(() => import('./pages/Forms'))
const FormBuilder = lazy(() => import('./pages/FormBuilder'))
const Schedule = lazy(() => import('./pages/Schedule'))
const Overdue = lazy(() => import('./pages/Overdue'))
const Execute = lazy(() => import('./pages/Execute'))
const Records = lazy(() => import('./pages/Records'))
const Sites = lazy(() => import('./pages/Sites'))
const Users = lazy(() => import('./pages/Users'))
const AuditLog = lazy(() => import('./pages/AuditLog'))

function AppShell() {
  return (
    <ProtectedRoute>
      <DataProvider>
        <Layout />
      </DataProvider>
    </ProtectedRoute>
  )
}

export default function App() {
  if (!isFirebaseConfigured) return <SetupNeeded />
  return (
    <Suspense fallback={<FullScreenLoader label="Loading…" />}>
      <Routes>
        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
        <Route path="/register-org" element={<PublicOnlyRoute><RegisterOrg /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
        <Route path="/pending" element={<PendingApproval />} />
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="/terms" element={<Legal kind="terms" />} />

        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="overdue" element={<Overdue />} />
          <Route path="forms" element={<Forms />} />
          <Route path="forms/new" element={<FormBuilder />} />
          <Route path="forms/:id/edit" element={<FormBuilder />} />
          <Route path="execute" element={<Execute />} />
          <Route path="records" element={<Records />} />
          <Route path="sites" element={<ProtectedRoute adminOnly><Sites /></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute adminOnly><Users /></ProtectedRoute>} />
          <Route path="audit" element={<ProtectedRoute adminOnly><AuditLog /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}
