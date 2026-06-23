import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { APPS } from '../apps.config'
import AppTile from '../components/AppTile'

export default function Apps() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return APPS
    return APPS.filter(
      (a) => a.name.toLowerCase().includes(q) || a.tagline.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Application Hub
          </h1>
          <p className="mt-1 text-sm text-ink-300">
            Launch any application in the OHS suite.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            className="input pl-9"
            placeholder="Search apps…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-ink-300">
          No apps match “{query}”.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((app, i) => (
            <AppTile key={app.id} app={app} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
