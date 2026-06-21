// Lightweight client-side store for Sites and Users.
//
// Persisted to localStorage and seeded on first run. This keeps the hub free of
// any login/auth flow (per requirement) while still providing real, editable
// "list of sites" and "user management" views. The read/write helpers below are
// the only touch points, so a future swap to a shared Firestore backend is a
// localized change.

const KEYS = {
  sites: 'weehs.hub.sites',
  users: 'weehs.hub.users',
}

const SEED_SITES = [
  { id: 's1', name: 'Head Office', code: 'HO', location: 'Mumbai, IN', status: 'active' },
  { id: 's2', name: 'Plant A', code: 'PLA', location: 'Pune, IN', status: 'active' },
  { id: 's3', name: 'Warehouse North', code: 'WHN', location: 'Delhi, IN', status: 'active' },
]

const SEED_USERS = [
  { id: 'u1', name: 'Asha Rao', email: 'asha.rao@example.com', role: 'Admin', site: 'Head Office', status: 'active' },
  { id: 'u2', name: 'Vikram Shah', email: 'vikram.shah@example.com', role: 'Manager', site: 'Plant A', status: 'active' },
  { id: 'u3', name: 'Priya Nair', email: 'priya.nair@example.com', role: 'Inspector', site: 'Warehouse North', status: 'active' },
]

export const ROLES = ['Admin', 'Manager', 'Inspector', 'Viewer']
export const STATUSES = ['active', 'disabled']

function read(key, seed) {
  if (typeof localStorage === 'undefined') return seed
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed))
      return seed
    }
    return JSON.parse(raw)
  } catch {
    return seed
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore quota / private-mode errors */
  }
  return value
}

const uid = () => Math.random().toString(36).slice(2, 10)

// ── Sites ────────────────────────────────────────────────────────────────
export const getSites = () => read(KEYS.sites, SEED_SITES)
export const saveSites = (sites) => write(KEYS.sites, sites)
export const addSite = (site) => saveSites([...getSites(), { id: uid(), status: 'active', ...site }])
export const updateSite = (id, patch) =>
  saveSites(getSites().map((s) => (s.id === id ? { ...s, ...patch } : s)))
export const removeSite = (id) => saveSites(getSites().filter((s) => s.id !== id))

// ── Users ────────────────────────────────────────────────────────────────
export const getUsers = () => read(KEYS.users, SEED_USERS)
export const saveUsers = (users) => write(KEYS.users, users)
export const addUser = (user) => saveUsers([...getUsers(), { id: uid(), status: 'active', ...user }])
export const updateUser = (id, patch) =>
  saveUsers(getUsers().map((u) => (u.id === id ? { ...u, ...patch } : u)))
export const removeUser = (id) => saveUsers(getUsers().filter((u) => u.id !== id))
