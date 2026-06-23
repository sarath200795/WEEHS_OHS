import { NavLink, Outlet } from 'react-router-dom'
import { LayoutGrid, Building2, Users as UsersIcon, ShieldCheck } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Apps', icon: LayoutGrid, end: true },
  { to: '/sites', label: 'Sites', icon: Building2 },
  { to: '/users', label: 'Users', icon: UsersIcon },
]

function NavItem({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
          isActive ? 'bg-white/10 text-white' : 'text-ink-300 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  )
}

export default function Layout() {
  return (
    <div className="aurora min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:px-6">
        {/* Sidebar */}
        <aside className="glass h-fit rounded-2xl p-4 md:sticky md:top-6 md:w-60 md:shrink-0">
          <div className="mb-5 flex items-center gap-2 px-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight text-white">WEEHS OHS</div>
              <div className="text-[11px] text-ink-400">Safety Hub</div>
            </div>
          </div>
          <nav className="flex flex-row gap-1 md:flex-col">
            {NAV.map((n) => (
              <NavItem key={n.to} {...n} />
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
