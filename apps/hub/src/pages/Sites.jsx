import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Plus, Pencil, Trash2, X } from 'lucide-react'
import { getSites, addSite, updateSite, removeSite, STATUSES } from '../lib/store'

const EMPTY = { name: '', code: '', location: '', status: 'active' }

export default function Sites() {
  const [sites, setSites] = useState(getSites)
  const [editing, setEditing] = useState(null) // null | {} (new) | site (edit)

  const refresh = (next) => setSites([...next])

  const save = (form) => {
    if (form.id) refresh(updateSite(form.id, form))
    else refresh(addSite(form))
    setEditing(null)
  }

  const del = (id) => {
    if (confirm('Remove this site?')) refresh(removeSite(id))
  }

  return (
    <div>
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">Sites</h1>
          <p className="mt-1 text-sm text-ink-300">Manage the sites &amp; organizations in the suite.</p>
        </div>
        <button className="btn-primary" onClick={() => setEditing({ ...EMPTY })}>
          <Plus size={16} /> Add site
        </button>
      </header>

      <div className="glass overflow-hidden rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Site</th>
              <th className="px-4 py-3 font-semibold">Code</th>
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">Location</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((s) => (
              <tr key={s.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-ink-200">
                      <Building2 size={16} />
                    </div>
                    <span className="font-semibold text-white">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-300">{s.code || '—'}</td>
                <td className="hidden px-4 py-3 text-ink-300 sm:table-cell">{s.location || '—'}</td>
                <td className="px-4 py-3">
                  <StatusChip status={s.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button className="btn-ghost px-2 py-1" onClick={() => setEditing(s)} aria-label="Edit">
                      <Pencil size={15} />
                    </button>
                    <button className="btn-danger px-2 py-1" onClick={() => del(s.id)} aria-label="Remove">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {sites.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-300">
                  No sites yet — add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editing && (
          <SiteModal initial={editing} onClose={() => setEditing(null)} onSave={save} />
        )}
      </AnimatePresence>
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

function SiteModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
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
          <h2 className="text-lg font-bold text-white">{form.id ? 'Edit site' : 'Add site'}</h2>
          <button type="button" className="btn-ghost px-2 py-1" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <Field label="Name">
            <input className="input" value={form.name} onChange={set('name')} autoFocus />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Code">
              <input className="input" value={form.code} onChange={set('code')} />
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
          <Field label="Location">
            <input className="input" value={form.location} onChange={set('location')} />
          </Field>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {form.id ? 'Save changes' : 'Add site'}
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
