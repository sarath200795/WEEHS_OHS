import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Power } from 'lucide-react'
import {
  getUsers,
  addUser,
  updateUser,
  removeUser,
  getSites,
  ROLES,
  STATUSES,
} from '../lib/store'

const EMPTY = { name: '', email: '', role: 'Viewer', site: '', status: 'active' }

export default function Users() {
  const [users, setUsers] = useState(getUsers)
  const [editing, setEditing] = useState(null)
  const sites = getSites()

  const refresh = (next) => setUsers([...next])

  const save = (form) => {
    if (form.id) refresh(updateUser(form.id, form))
    else refresh(addUser(form))
    setEditing(null)
  }

  const del = (id) => {
    if (confirm('Remove this user?')) refresh(removeUser(id))
  }

  const toggle = (u) => refresh(updateUser(u.id, { status: u.status === 'active' ? 'disabled' : 'active' }))

  return (
    <div>
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">Users</h1>
          <p className="mt-1 text-sm text-ink-300">Manage who can access the suite and their roles.</p>
        </div>
        <button className="btn-primary" onClick={() => setEditing({ ...EMPTY })}>
          <Plus size={16} /> Add user
        </button>
      </header>

      <div className="glass overflow-hidden rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Role</th>
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">Site</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} />
                    <div className="leading-tight">
                      <div className="font-semibold text-white">{u.name}</div>
                      <div className="text-xs text-ink-400">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <span className="chip bg-white/10 text-ink-200">{u.role}</span>
                </td>
                <td className="hidden px-4 py-3 text-ink-300 sm:table-cell">{u.site || '—'}</td>
                <td className="px-4 py-3">
                  <StatusChip status={u.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button className="btn-ghost px-2 py-1" onClick={() => toggle(u)} aria-label="Toggle status">
                      <Power size={15} />
                    </button>
                    <button className="btn-ghost px-2 py-1" onClick={() => setEditing(u)} aria-label="Edit">
                      <Pencil size={15} />
                    </button>
                    <button className="btn-danger px-2 py-1" onClick={() => del(u.id)} aria-label="Remove">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-300">
                  No users yet — add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editing && (
          <UserModal
            initial={editing}
            sites={sites}
            onClose={() => setEditing(null)}
            onSave={save}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-ink-100">
      {initials || '?'}
    </div>
  )
}

function StatusChip({ status }) {
  const active = status === 'active'
  return (
    <span
      className={`chip ${active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/10 text-ink-300'}`}
    >
      {active ? 'Active' : 'Disabled'}
    </span>
  )
}

function UserModal({ initial, sites, onClose, onSave }) {
  const [form, setForm] = useState(initial)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    onSave(form)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.form
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={submit}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="glass w-full max-w-md rounded-2xl p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{form.id ? 'Edit user' : 'Add user'}</h2>
          <button type="button" className="btn-ghost px-2 py-1" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <Field label="Full name">
            <input className="input" value={form.name} onChange={set('name')} autoFocus />
          </Field>
          <Field label="Email">
            <input className="input" type="email" value={form.email} onChange={set('email')} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Role">
              <select className="input" value={form.role} onChange={set('role')}>
                {ROLES.map((r) => (
                  <option key={r} value={r} className="bg-ink-900">
                    {r}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select className="input" value={form.status} onChange={set('status')}>
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-ink-900">
                    {s === 'active' ? 'Active' : 'Disabled'}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Site">
            <select className="input" value={form.site} onChange={set('site')}>
              <option value="" className="bg-ink-900">
                — None —
              </option>
              {sites.map((s) => (
                <option key={s.id} value={s.name} className="bg-ink-900">
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {form.id ? 'Save changes' : 'Add user'}
          </button>
        </div>
      </motion.form>
    </motion.div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-400">
        {label}
      </span>
      {children}
    </label>
  )
}
