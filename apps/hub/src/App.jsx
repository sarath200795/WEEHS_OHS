import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Apps from './pages/Apps'
import Sites from './pages/Sites'
import Users from './pages/Users'

// No auth/login routes by design — access to the hub is assumed to be handled
// upstream (network / SSO). The hub is a launcher plus site & user management.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Apps />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
