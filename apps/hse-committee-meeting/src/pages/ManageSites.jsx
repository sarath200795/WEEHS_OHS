import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { PageHeader, EmptyState, Spinner } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { subscribeSites, addSite, updateSite, deleteSite } from '../lib/firestore'

export default function ManageSites() {
  const { orgId } = useAuth()
  const [sites, setSites] = useState([])
  const [form, setForm] = useState({ code: '', name: '' })
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!orgId) return undefined
    return subscribeSites(orgId, (list) =>
      setSites([...list].sort((a, b) => (a.code || '').localeCompare(b.code || ''))),
    )
  }, [orgId])

  const create = async (e) => {
    e.preventDefault()
    const code = form.code.trim()
    const name = form.name.trim() || code
    if (!code) return toast.error('Enter a site code.')
    if (sites.some((s) => (s.code || '').toLowerCase() === code.toLowerCase())) {
      return toast.error('A site with that code already exists.')
    }
    setBusy(true)
    try {
      await addSite(orgId, { code, name })
      setForm({ code: '', name: '' })
      toast.success('Site added')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  const rename = async (id, name, current) => {
    if (!name.trim() || name === current) return
    try {
      await updateSite(orgId, id, { name: name.trim() })
    } catch (err) {
      toast.error(err.message)
    }
  }

  const remove = async (id, code) => {
    if (!window.confirm(`Delete site "${code}"? Existing meetings keep their recorded site.`)) return
    try {
      await deleteSite(orgId, id)
      toast.success('Site removed')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div>
      <PageHeader
        title="Facility Sites"
        subtitle="Define the sites your committee meetings are scoped to — they drive the site filters and per-site compliance tracking."
        icon={MapPin}
      />

      {/* Add site */}
      <form onSubmit={create} className="card mb-6 grid grid-cols-1 gap-4 p-5 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
        <div>
          <label className="label">Site code</label>
          <input
            className="input"
            placeholder="e.g. PLANT-1"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Site name</label>
          <input
            className="input"
            placeholder="e.g. Riyadh Manufacturing Plant"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? <Spinner size={18} /> : (<><Plus size={16} /> Add site</>)}
        </button>
      </form>

      {/* Sites list */}
      {sites.length === 0 ? (
        <EmptyState icon={MapPin} title="No sites yet" hint="Add your first facility above to start scheduling meetings against it." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-clay-100/70 text-left text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3 w-48">Code</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3 text-right w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clay-200/60">
              {sites.map((s, i) => (
                <motion.tr
                  key={s.id}
                  className="hover:bg-clay-100/50"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <td className="px-4 py-3 font-mono font-bold text-brand-700">{s.code}</td>
                  <td className="px-2 py-2">
                    <input
                      defaultValue={s.name}
                      onBlur={(e) => rename(s.id, e.target.value, s.name)}
                      className="w-full rounded-xl bg-transparent px-2.5 py-1.5 text-ink-900 outline-none transition hover:bg-clay-100 focus:bg-clay-surface focus:shadow-clay-inset"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => remove(s.id, s.code)}
                      className="btn-ghost px-2.5 py-1.5 text-red-600 hover:bg-red-50"
                      title="Delete site"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
