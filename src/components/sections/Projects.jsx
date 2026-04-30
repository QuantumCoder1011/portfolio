import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Github, ExternalLink, ArrowUpRight, ArrowRight } from 'lucide-react'
import { projects } from '../../utils/data'

function ProjectCard({ project, index, featured }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/project/${project.slug}`)
  }

  const handleLinkClick = (e, url) => {
    e.stopPropagation()
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.article
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(16px)',
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        y: -5,
        borderColor: `${project.accent}45`,
        boxShadow: `0 12px 40px ${project.accent}18`,
        transition: { duration: 0.25 },
      }}
      onClick={handleCardClick}
    >
      <div
        className={`relative overflow-hidden ${featured ? 'h-44' : 'h-36'}`}
        style={{ background: `linear-gradient(135deg, ${project.accent}18 0%, ${project.accent}08 100%)` }}
      >
        <div className="absolute inset-0 grid-bg" style={{ opacity: 0.4 }} />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `radial-gradient(ellipse at center, ${project.accent}22 0%, transparent 70%)` }}
        />

        <span className="absolute top-3 left-4 font-mono text-xs" style={{ color: `${project.accent}60` }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {featured && (
          <span
            className="absolute top-3 right-4 px-2.5 py-0.5 rounded-full text-xs font-mono"
            style={{
              background: `${project.accent}20`,
              border: `1px solid ${project.accent}40`,
              color: project.accent,
            }}
          >
            featured
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-xl flex items-center justify-center font-display font-bold text-2xl"
            style={{
              background: `${project.accent}15`,
              border: `1px solid ${project.accent}30`,
              color: project.accent,
            }}
            animate={hovered ? { rotate: 8, scale: 1.08 } : { rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {project.title[0]}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-3 right-4 flex items-center gap-1 text-xs font-mono"
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          style={{ color: project.accent }}
        >
          View details <ArrowUpRight size={11} />
        </motion.div>
      </div>

      <div className="p-5">
        <h3
          className="font-display font-bold mb-2 flex items-center gap-1.5"
          style={{
            fontSize: featured ? '1.15rem' : '1rem',
            color: 'var(--text-primary)',
          }}
        >
          {project.title}
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
            transition={{ duration: 0.2 }}
            style={{ color: project.accent }}
          >
            <ArrowUpRight size={15} />
          </motion.span>
        </h3>

        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, featured ? 6 : 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono rounded"
              style={{
                background: 'var(--border-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > (featured ? 6 : 4) && (
            <span className="px-2 py-0.5 text-xs font-mono rounded" style={{ color: 'var(--text-muted)' }}>
              +{project.tags.length - (featured ? 6 : 4)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {project.github && (
            <button
              onClick={(e) => handleLinkClick(e, project.github)}
              className="flex items-center gap-1.5 text-xs transition-colors hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              <Github size={13} />
              Source
            </button>
          )}
          {project.live && (
            <button
              onClick={(e) => handleLinkClick(e, project.live)}
              className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80 ml-auto"
              style={{ color: project.accent }}
            >
              Live Demo
              <ExternalLink size={12} />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div
        className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'var(--glow-azure)', filter: 'blur(100px)', opacity: 0.4 }}
      />

      <div className="section-container">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">02 - Work</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}
            >
              Things I've <span className="gradient-text">Built</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Projects I&apos;ve built to learn new technologies, solve real problems, and push my limits.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mb-8 flex items-center gap-2 px-4 py-2.5 rounded-xl w-fit"
          style={{
            background: 'rgba(79,142,247,0.06)',
            border: '1px solid rgba(79,142,247,0.15)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <ArrowRight size={13} style={{ color: 'var(--section-num)' }} />
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            Click any card to read the full case study
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} featured />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + featured.length} featured={false} />
          ))}
        </div>

        <motion.div className="text-center mt-14" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <a
            href="https://github.com/QuantumCoder1011"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium transition-all duration-200 group"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Github size={15} className="group-hover:rotate-12 transition-transform" />
            More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
