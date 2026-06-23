import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { OrgDataProvider } from './context/OrgDataContext'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './components/AppLayout'
import ConfigNotice from './components/ConfigNotice'
import { FullPageSpinner } from './components/ui/Spinner'

// Login/signup routes have been removed; the app opens straight into the app.

// Legal
const Privacy = lazy(() => import('./pages/legal/Privacy'))
const Terms = lazy(() => import('./pages/legal/Terms'))
const DataRetention = lazy(() => import('./pages/legal/DataRetention'))
const Cookies = lazy(() => import('./pages/legal/Cookies'))

// App
const InternalAudit = lazy(() => import('./pages/app/InternalAudit'))
const FindingsRegister = lazy(() => import('./pages/app/FindingsRegister'))
const CapaRegister = lazy(() => import('./pages/app/CapaRegister'))
const Sites = lazy(() => import('./pages/app/Sites'))
const Admin = lazy(() => import('./pages/app/Admin'))
const Profile = lazy(() => import('./pages/app/Profile'))

export default function App() {
  const { isConfigured } = useAuth()

  if (!isConfigured) return <ConfigNotice />

  return (
    <Suspense fallback={<FullPageSpinner />}>
    <Routes>
      {/* Legal */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/data-retention" element={<DataRetention />} />
      <Route path="/cookies" element={<Cookies />} />

      {/* Protected app */}
      <Route
        element={
          <ProtectedRoute>
            <OrgDataProvider>
              <AppLayout />
            </OrgDataProvider>
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<InternalAudit />} />
        <Route path="/findings" element={<FindingsRegister />} />
        <Route path="/capa" element={<CapaRegister />} />
        <Route path="/sites" element={<Sites />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </Suspense>
  )
}
