import { createContext, useContext } from 'react'

// Login has been removed from this app. Instead of subscribing to Firebase
// Auth, we provide a static "already signed-in" context so the app opens
// straight into its dashboard. The exported shape matches the original
// AuthProvider exactly, so every useAuth() consumer keeps working.
const AuthContext = createContext(null)

const MOCK_USER = {
  uid: 'local-user',
  email: 'demo@weehs.local',
  displayName: 'Demo User',
}

const MOCK_PROFILE = {
  uid: 'local-user',
  name: 'Demo User',
  email: 'demo@weehs.local',
  role: 'admin',
  status: 'approved',
  orgId: 'local-org',
  orgName: 'Demo Organization',
}

// Auth actions are no-ops now — kept so callers (e.g. the Layout sign-out
// button) don't crash.
const noop = async () => {}

const value = {
  user: MOCK_USER,
  profile: MOCK_PROFILE,
  loading: false,
  isAuthed: true,
  isApproved: true,
  isAdmin: true,
  isApprover: true,
  role: MOCK_PROFILE.role,
  orgId: MOCK_PROFILE.orgId,
  orgName: MOCK_PROFILE.orgName,
  registerOrganization: noop,
  signUpMember: noop,
  login: noop,
  resetPassword: noop,
  signOut: noop,
  refreshProfile: async () => MOCK_PROFILE,
}

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
