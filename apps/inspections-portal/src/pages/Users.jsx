import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { Users as UsersIcon, Check, X, ShieldCheck, UserMinus } from 'lucide-react'
import { PageHeader, EmptyState, StatusPill } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { setUserStatus, setUserRole } from '../lib/firestore'

export default function Users() {
  const { profile, orgId, user } = useAuth()
  const { users } = useData()

  const { pending, members } = useMemo(() => ({
    pending: users.filter((u) => u.status === 'pending'),
    members: users.filter((u) => u.status !== 'pending').sort((a, b) => (a.name || '').localeCompare(b.name || '')),
  }), [users])

  const act = async (fn, ok) => {
    try { await fn(); toast.success(ok) }
    catch (e) { toast.error(e.message) }
  }

  return (
    <div>
      <PageHeader icon={UsersIcon} title="Users" subtitle="Approve members and manage roles" />

      {pending.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold text-amber-600">Pending approval ({pending.length})</h3>
          <div className="space-y-2">
            {pending.map((u) => (
              <div key={u.uid} className="card flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-semibold text-ink-800">{u.name}</p>
                  <p className="text-xs text-ink-500">{u.email}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-primary text-xs" onClick={() => act(() => setUserStatus(u.uid, 'approved', orgId, profile, u.name), 'Member approved')}>
                    <Check size={14} /> Approve
                  </button>
                  <button className="btn-ghost text-xs" onClick={() => act(() => setUserStatus(u.uid, 'rejected', orgId, profile, u.name), 'Request rejected')}>
                    <X size={14} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="mb-3 text-sm font-bold text-ink-700">Members ({members.length})</h3>
      {members.length === 0 ? (
        <EmptyState icon={UsersIcon} title="No members yet" hint="Approved members of your organization appear here." />
      ) : (
        <div className="overflow-hidden card">
          <table className="w-full text-left text-sm">
            <thead className="bg-clay-surface text-[10px] uppercase tracking-widest text-ink-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {members.map((u) => {
                const isSelf = u.uid === user?.uid
                return (
                  <tr key={u.uid} className="border-t border-clay-200/60">
                    <td className="px-4 py-3 font-semibold text-ink-800">{u.name} {isSelf && <span className="text-xs font-normal text-ink-400">(you)</span>}</td>
                    <td className="px-4 py-3 text-ink-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold capitalize text-ink-600">
                        {u.role === 'admin' && <ShieldCheck size={13} className="text-brand-600" />}{u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3"><StatusPill status={u.status === 'approved' ? 'Active' : u.status === 'rejected' ? 'Cancelled' : 'Draft'} /></td>
                    <td className="px-4 py-3 text-right">
                      {!isSelf && (
                        <div className="flex justify-end gap-2">
                          {u.role === 'admin' ? (
                            <button className="btn-ghost text-xs" onClick={() => act(() => setUserRole(u.uid, 'member', orgId, profile, u.name), 'Role updated')}>
                              <UserMinus size={13} /> Make member
                            </button>
                          ) : (
                            <button className="btn-soft text-xs" onClick={() => act(() => setUserRole(u.uid, 'admin', orgId, profile, u.name), 'Role updated')}>
                              <ShieldCheck size={13} /> Make admin
                            </button>
                          )}
                          {u.status === 'approved' ? (
                            <button className="btn-ghost text-xs" onClick={() => act(() => setUserStatus(u.uid, 'rejected', orgId, profile, u.name), 'Access revoked')}>Revoke</button>
                          ) : (
                            <button className="btn-ghost text-xs" onClick={() => act(() => setUserStatus(u.uid, 'approved', orgId, profile, u.name), 'Access restored')}>Restore</button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
