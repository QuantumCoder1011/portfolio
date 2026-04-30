import { motion } from 'framer-motion'
import { useScrollAnimation, slideInLeftVariants, slideInRightVariants } from '../../hooks/useScrollAnimation'
import { personalInfo, skills, proficiencies } from '../../utils/data'
import { MapPin, Mail, Download } from 'lucide-react'

function SkillTag({ label, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.035, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      className="px-3 py-1.5 text-xs font-mono rounded-lg cursor-default transition-all duration-200"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-secondary)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {label}
    </motion.span>
  )
}

function ProgressBar({ label, level }) {
  const { ref, controls } = useScrollAnimation(0.3)
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </span>
        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #4f8ef7, #00d4ff)' }}
          initial={{ width: 0 }}
          animate={controls}
          variants={{
            visible: {
              width: `${level}%`,
              transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
            },
          }}
        />
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(var(--bg-secondary-rgb,8,13,20),0.4), transparent)' }}
      />
      <div
        className="absolute right-0 top-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'var(--glow-violet)', filter: 'blur(100px)', opacity: 0.5 }}
      />

      <div className="section-container">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label">01 - About</span>
          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}
          >
            A bit about <span className="gradient-text">me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={slideInLeftVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div
              className="rounded-2xl p-6 mb-7 relative overflow-hidden"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none"
                style={{ background: 'var(--glow-azure)', filter: 'blur(50px)', opacity: 0.6 }}
              />

              <div className="flex items-start gap-5 mb-5">
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center font-display font-bold text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #4f8ef7 0%, #8b5cf6 100%)',
                    color: '#030508',
                  }}
                >
                  {personalInfo.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                    {personalInfo.name}
                  </h3>
                  <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--section-num)' }}>
                    {personalInfo.title}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2.5">
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <MapPin size={11} />
                      {personalInfo.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <Mail size={11} />
                      {personalInfo.email}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg"
                style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">{personalInfo.availability}</span>
              </div>
            </div>

            {personalInfo.bio.split('\n\n').map((para, i) => (
              <motion.p
                key={i}
                className="leading-relaxed mb-4 text-sm"
                style={{ color: 'var(--text-muted)' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                {para}
              </motion.p>
            ))}

            <motion.a
              href={personalInfo.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-accent)',
                color: 'var(--section-num)',
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Download size={14} />
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div variants={slideInRightVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div
              className="rounded-2xl p-6 mb-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <h3 className="font-display font-semibold text-base mb-5" style={{ color: 'var(--text-secondary)' }}>
                Core Skills
              </h3>
              <div className="space-y-4">
                {proficiencies.map((p) => (
                  <ProgressBar key={p.label} label={p.label} level={p.level} />
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {skills.map((group, gi) => (
                <div key={group.category}>
                  <p className="font-mono text-xs tracking-widest uppercase mb-2.5" style={{ color: 'var(--section-num)' }}>
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, si) => (
                      <SkillTag key={skill} label={skill} index={gi * 6 + si} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
