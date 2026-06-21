import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// A single launcher tile. Renders as an anchor that opens the target app in a
// new tab — the hub never proxies or embeds the apps, it just links out.
export default function AppTile({ app, index = 0 }) {
  const { name, tagline, accent, icon: Icon, url } = app
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="glass group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-5 shadow-card"
    >
      {/* Accent glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
        style={{ background: accent }}
      />

      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: `${accent}22`, color: accent }}
        >
          <Icon size={24} />
        </div>
        <ArrowUpRight
          size={20}
          className="text-ink-400 transition-colors group-hover:text-white"
        />
      </div>

      <div className="relative">
        <h3 className="text-base font-bold tracking-tight text-white">{name}</h3>
        <p className="mt-1 text-sm text-ink-300">{tagline}</p>
      </div>

      <span
        aria-hidden
        className="mt-auto h-1 w-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
    </motion.a>
  )
}
