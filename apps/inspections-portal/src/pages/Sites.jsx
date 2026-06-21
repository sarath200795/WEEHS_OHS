import { useState } from 'react'
import toast from 'react-hot-toast'
import { Building2, Plus, Pencil, Trash2, MapPin, Hash } from 'lucide-react'
import { PageHeader, EmptyState, Modal, Spinner } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { addSite, updateSite, deleteSite } from '../lib/firestore'

const EMPTY = { name: '', code: '', address: '' }

export default function Sites() {
  const { profile, orgId } = useAuth()
  const { sites } = useData()
  const [editing, setEditing] = useState(null) // { id?, name, code, address } or null
  const [busy, setBusy] = useState(false)

  const openNew = () => setEditing({ ...EMPTY })
  const openEdit = (s) => setEditing({ id: s.id, name: s.name || '', code: s.code || '', address: s.address || '' })
  const close = () => setEditing(null)
  const set = (patch) => setEditing((p) => ({ ...p, ...patch }))

  const save = async () => {
    if (!editing.name.trim()) return toast.error('A site name is required.')
    const payload = { name: editing.name.trim(), code: editing.code.trim(), address: editing.address.trim() }
    setBusy(true)
    try {
      if (editing.id) {
        await updateSite(orgId, editing.id, payload, profile)
        toast.success('Site updated')
      } else {
        await addSite(orgId, payload, profile)
        toast.success('Site created')
      }
      close()
    } catch (e) {
      toast.error('Save failed: ' + e.message)
    } finally {
      setBusy(false)
    }
  }

  const remove = async (s) => {
    if (!window.confirm(`Delete site "${s.name}"? Inspections already assigned to it keep their saved site name.`)) return
    try { await deleteSite(orgId, s.id, s.name, profile); toast.success('Site deleted') }
    catch (e) { toast.error('Delete failed: ' + e.message) }
  }

  return (
    <div>
      <PageHeader icon={Building2} title="Sites" subtitle={`${sites.length} site${sites.length === 1 ? '' : 's'} — assign inspections to these locations`}>
        <button className="btn-primary" onClick={openNew}><Plus size={16} /> Add site</button>
      </PageHeader>

      {sites.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No sites yet"
          hint="Add your first site so inspections can be assigned to specific locations and filtered by site."
          action={<button className="btn-primary mt-2" onClick={openNew}><Plus size={16} /> Add site</button>}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sites.map((s) => (
            <div key={s.id} className="card flex flex-col p-5">
              <div className="mb-1 flex items-start justify-between gap-2">
                <h3 className="font-bold text-ink-900">{s.name}</h3>
                {s.code && <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand-700"><Hash size={10} />{s.code}</span>}
              </div>
              {s.address && <p className="mb-4 flex items-center gap-1 text-sm text-ink-500"><MapPin size={13} /> {s.address}</p>}
              <div className="mt-auto flex gap-2">
                <button className="btn-ghost flex-1 text-xs" onClick={() => openEdit(s)}><Pencil size={14} /> Edit</button>
                <button className="rounded-xl p-2 text-ink-400 transition hover:bg-red-50 hover:text-red-600" onClick={() => remove(s)} title="Delete"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={Boolean(editing)} onClose={close} title={editing?.id ? 'Edit site' : 'Add site'}>
        {editing && (
          <div className="space-y-4">
            <div>
              <label className="label">Site name *</label>
              <input className="input" value={editing.name} placeholder="Plant A — North Wing" onChange={(e) => set({ name: e.target.value })} autoFocus />
            </div>
            <div>
              <label className="label">Code (optional)</label>
              <input className="input" value={editing.code} placeholder="PLA" onChange={(e) => set({ code: e.target.value })} />
            </div>
            <div>
              <label className="label">Address (optional)</label>
              <input className="input" value={editing.address} placeholder="City, Country" onChange={(e) => set({ address: e.target.value })} />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button className="btn-ghost" onClick={close}>Cancel</button>
              <button className="btn-primary" onClick={save} disabled={busy}>
                {busy ? <Spinner size={16} /> : (editing.id ? 'Save changes' : 'Create site')}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
