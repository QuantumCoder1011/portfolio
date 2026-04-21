import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Flame, Trophy, Target, TrendingUp, Code2, Zap } from 'lucide-react'
import { dsaStats } from '../../utils/data'

/* ── Animated counter ────────────────────────────────────── */
function AnimatedCounter({ target, duration = 1.8, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const steps = 60
    const increment = target / steps
    const interval = (duration * 1000) / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

/* ── Donut chart (SVG) ───────────────────────────────────── */
function DonutChart({ easy, medium, hard, total }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 })
  const r = 52
  const circumference = 2 * Math.PI * r
  const easyPct = easy / total
  const medPct = medium / total
  const hardPct = hard / total

  const segments = [
    { value: easyPct, color: '#10b981', label: 'Easy', count: easy, offset: 0 },
    { value: medPct,  color: '#f59e0b', label: 'Medium', count: medium, offset: easyPct },
    { value: hardPct, color: '#ef4444', label: 'Hard', count: hard, offset: easyPct + medPct },
  ]
  const gap = 0.01
  const size = 130
  const cx = size / 2
  const cy = size / 2

  return (
    <div ref={ref} className="flex items-center gap-6 flex-wrap justify-center">
      {/* SVG ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          {/* Segments */}
          {segments.map((seg, i) => {
            const dashLen = (seg.value - gap) * circumference
            const dashOffset = -(seg.offset * circumference)
            return (
              <motion.circle
                key={i}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${inView ? dashLen : 0} ${circumference}`}
                strokeDashoffset={dashOffset}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={inView ? { strokeDasharray: `${dashLen} ${circumference}` } : {}}
                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            )
          })}
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
            <AnimatedCounter target={total} duration={1.4} />
          </span>
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>solved</span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2.5">
        {segments.map(seg => (
          <div key={seg.label} className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-xs font-mono w-12" style={{ color: 'var(--text-muted)' }}>{seg.label}</span>
            <motion.span
              className="font-display font-bold text-sm"
              style={{ color: seg.color }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              {seg.count}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Streak display ──────────────────────────────────────── */
function StreakBar({ streak }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 })
  const days = Array.from({ length: 35 }, (_, i) => ({
    active: Math.random() > (i < 28 ? 0.15 : 0.7),
    isStreak: i < 28,
  }))

  return (
    <div ref={ref}>
      <div className="flex flex-wrap gap-1">
        {days.map((d, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-sm"
            style={{
              background: d.active
                ? d.isStreak ? '#4f8ef7' : 'rgba(79,142,247,0.35)'
                : 'rgba(255,255,255,0.04)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.018, duration: 0.3, ease: 'backOut' }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          Past 35 days
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--section-num)' }}>
          {streak} day streak 🔥
        </span>
      </div>
    </div>
  )
}

/* ── Focus area tag ──────────────────────────────────────── */
function TopicTag({ label, index }) {
  return (
    <motion.span
      className="px-3 py-1.5 text-xs font-mono rounded-lg"
      style={{
        background: 'rgba(79,142,247,0.08)',
        border: '1px solid rgba(79,142,247,0.2)',
        color: 'var(--section-num)',
      }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ scale: 1.05, background: 'rgba(79,142,247,0.14)' }}
    >
      {label}
    </motion.span>
  )
}

/* ── Main section ────────────────────────────────────────── */
export default function DSASection() {
  return (
    <section id="dsa" className="relative py-28 overflow-hidden">
      {/* Bg */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(79,142,247,0.05)', filter: 'blur(100px)' }}
      />
      <div
        className="absolute top-1/3 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'rgba(245,158,11,0.04)', filter: 'blur(80px)' }}
      />

      <div className="section-container">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">
            {/* dynamic number based on section order */}
            04 — Coding
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}
            >
              Problem <span className="gradient-text">Solving</span>
            </h2>
            <a
              href={dsaStats.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105 group flex-shrink-0"
              style={{
                background: 'rgba(255,161,22,0.1)',
                border: '1px solid rgba(255,161,22,0.3)',
                color: '#FFA116',
              }}
            >
              <Code2 size={15} />
              @{dsaStats.username}
              <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column — donut + streak */}
          <div className="lg:col-span-1 space-y-5">
            {/* Donut chart card */}
            <motion.div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
                Problems solved
              </p>
              <DonutChart
                easy={dsaStats.easy}
                medium={dsaStats.medium}
                hard={dsaStats.hard}
                total={dsaStats.totalSolved}
              />
            </motion.div>

            {/* Streak card */}
            <motion.div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Flame size={15} style={{ color: '#f97316' }} />
                <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  Consistency
                </p>
              </div>
              <StreakBar streak={dsaStats.streak} />
              <div
                className="mt-4 p-3 rounded-xl text-sm font-medium text-center"
                style={{
                  background: 'rgba(249,115,22,0.08)',
                  border: '1px solid rgba(249,115,22,0.2)',
                  color: '#f97316',
                }}
              >
                {dsaStats.recentMilestone}
              </div>
            </motion.div>
          </div>

          {/* Right column — stats + topics */}
          <div className="lg:col-span-2 space-y-5">
            {/* Stat cards row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Trophy, label: 'Global Rank', value: dsaStats.ranking, color: '#f59e0b', suffix: '' },
                { icon: TrendingUp, label: 'Contest Rating', value: dsaStats.contestRating, color: '#4f8ef7', isCount: true },
                { icon: Zap, label: 'Contests', value: dsaStats.contests, color: '#8b5cf6', isCount: true },
                { icon: Flame, label: 'Day Streak', value: dsaStats.streak, color: '#f97316', isCount: true },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl p-4"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    backdropFilter: 'blur(16px)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ borderColor: `${stat.color}40`, y: -3, transition: { duration: 0.2 } }}
                >
                  <stat.icon size={16} className="mb-3" style={{ color: stat.color }} />
                  <div
                    className="font-display font-bold text-xl mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.isCount
                      ? <AnimatedCounter target={stat.value} duration={1.5} />
                      : stat.value
                    }
                  </div>
                  <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Focus topics */}
            <motion.div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                Focus Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {dsaStats.focusAreas.map((area, i) => (
                  <TopicTag key={area} label={area} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Breakdown bar chart */}
            <motion.div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
                Difficulty Breakdown
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Easy', count: dsaStats.easy, total: dsaStats.totalSolved, color: '#10b981' },
                  { label: 'Medium', count: dsaStats.medium, total: dsaStats.totalSolved, color: '#f59e0b' },
                  { label: 'Hard', count: dsaStats.hard, total: dsaStats.totalSolved, color: '#ef4444' },
                ].map((row, i) => (
                  <div key={row.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-mono" style={{ color: row.color }}>{row.label}</span>
                      <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                        {row.count} / {row.total}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: row.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(row.count / row.total) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
