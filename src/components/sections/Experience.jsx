import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Briefcase } from 'lucide-react'
import { experience } from '../../utils/data'

function ExperienceCard({ job, index, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={onClick}
        className="w-full text-left rounded-2xl p-5 transition-all duration-300 relative overflow-hidden"
        style={{
          background: isActive ? 'var(--bg-card)' : 'transparent',
          border: isActive ? '1px solid var(--border-accent)' : '1px solid transparent',
          boxShadow: isActive ? `0 0 30px ${job.color}15` : 'none',
        }}
        data-hover
      >
        {isActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top left, ${job.color}10 0%, transparent 60%)` }}
          />
        )}

        <div className="flex items-start gap-4 relative z-10">
          {/* Logo */}
          <div
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-base"
            style={{
              background: `${job.color}18`,
              border: `1px solid ${job.color}30`,
              color: job.color,
            }}
          >
            {job.logo}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                  {job.role}
                </h3>
                <p className="text-sm font-medium mt-0.5" style={{ color: job.color }}>{job.company}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className="font-mono text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: 'var(--border-subtle)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {job.period}
                </span>
                <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={15} style={{ color: 'var(--text-muted)' }} />
                </motion.div>
              </div>
            </div>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {job.description}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 ml-[60px] space-y-2">
                {job.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: job.color }} />
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{h}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      <div
        className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(0,212,255,0.04)', filter: 'blur(90px)' }}
      />

      <div className="section-container">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">03 — Experience</span>
          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}
          >
            Where I've <span className="gradient-text">Worked</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Timeline */}
          <div className="lg:col-span-3 space-y-3">
            {experience.map((job, i) => (
              <ExperienceCard
                key={job.company}
                job={job}
                index={i}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
              />
            ))}

            {/* Education */}
            <motion.div
              className="rounded-2xl p-5 mt-2"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.2)' }}
                >
                  🎓
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>
                    B.S. Computer Science
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--section-num)' }}>
                    UC Berkeley — Expected May 2025
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <motion.div
              className="sticky top-28 space-y-4"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Current card */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-accent)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Most Recent
                  </span>
                </div>
                <p className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                  {experience[0]?.role}
                </p>
                <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--section-num)' }}>
                  @ {experience[0]?.company}
                </p>
                <p className="font-mono text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                  {experience[0]?.period}
                </p>
              </div>

              {/* Quick stats */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <h4
                  className="font-display font-semibold text-xs uppercase tracking-wider mb-4"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Highlights
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: experience.length, label: 'Roles' },
                    { val: '4', label: 'Features shipped' },
                    { val: '22%', label: 'Perf. improved' },
                    { val: '72%', label: 'Test coverage' },
                  ].map(s => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3"
                      style={{ background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)' }}
                    >
                      <div className="font-display font-bold text-lg gradient-text">{s.val}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
