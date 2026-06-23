import { createContext, useContext } from 'react'
import { isFirebaseConfigured } from '../lib/firebase'

// Login has been removed from this app. Instead of subscribing to Firebase
// Auth, we provide a static "already signed-in" context so the app opens
// straight into its dashboard. The exported shape matches the original
// AuthProvider exactly, so every useAuth() consumer keeps working.
const AuthContext = createContext(null)

const MOCK_FIREBASE_USER = {
  uid: 'local-user',
  email: 'demo@weehs.local',
  displayName: 'Demo User',
}

const MOCK_PROFILE = {
  id: 'local-user',
  uid: 'local-user',
  name: 'Demo User',
  email: 'demo@weehs.local',
  role: 'admin',
  status: 'approved',
  orgId: 'local-org',
}

const MOCK_ORG = {
  id: 'local-org',
  name: 'Demo Organization',
  location: '',
}

const value = {
  firebaseUser: MOCK_FIREBASE_USER,
  profile: MOCK_PROFILE,
  org: MOCK_ORG,
  loading: false,
  isConfigured: isFirebaseConfigured,
  isAuthenticated: true,
  isApproved: true,
  isAdmin: true,
  // No-op so the Layout sign-out button doesn't crash.
  logout: async () => {},
}

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
