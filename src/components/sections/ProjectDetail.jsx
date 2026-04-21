import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Lightbulb, Wrench, BookOpen, Tag } from 'lucide-react'
import { projects } from '../../utils/data'
import { useEffect } from 'react'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = projects.find(p => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="font-display font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>
          Project not found
        </h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-accent)',
            color: 'var(--section-num)',
          }}
        >
          <ArrowLeft size={15} /> Back home
        </button>
      </div>
    )
  }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  const otherProjects = projects.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <motion.div
      className="min-h-screen pt-24 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" style={{ opacity: 0.3 }} />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${project.accent}12 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      <div className="section-container max-w-3xl">
        {/* Back button */}
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-10 text-sm font-medium transition-all group"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -3 }}
        >
          <ArrowLeft size={15} className="group-hover:text-azure transition-colors" style={{ color: 'inherit' }} />
          Back to projects
        </motion.button>

        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Hero header */}
          <motion.div variants={fadeUp} className="mb-10">
            {/* Visual banner */}
            <div
              className="relative rounded-2xl h-52 mb-8 overflow-hidden flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${project.accent}20 0%, ${project.accent}08 100%)`,
                border: `1px solid ${project.accent}25`,
              }}
            >
              <div className="absolute inset-0 grid-bg" style={{ opacity: 0.5 }} />
              <motion.div
                className="w-24 h-24 rounded-2xl flex items-center justify-center font-display font-bold text-4xl relative z-10"
                style={{
                  background: `${project.accent}18`,
                  border: `1px solid ${project.accent}35`,
                  color: project.accent,
                }}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                {project.title[0]}
              </motion.div>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1
                  className="font-display font-extrabold mb-2"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h1>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {project.description}
                </p>
              </div>
            </div>

            {/* Link buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Github size={15} />
                View Source Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: `${project.accent}18`,
                  border: `1px solid ${project.accent}35`,
                  color: project.accent,
                }}
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div variants={fadeUp} className="mb-8">
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Tag size={16} style={{ color: 'var(--section-num)' }} />
                <h2 className="font-display font-semibold text-base" style={{ color: 'var(--text-secondary)' }}>
                  Tech Stack
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-mono rounded-lg transition-all"
                    style={{
                      background: `${project.accent}12`,
                      border: `1px solid ${project.accent}30`,
                      color: project.accent,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Problem */}
          <motion.div variants={fadeUp} className="mb-6">
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Lightbulb size={16} style={{ color: '#f59e0b' }} />
                <h2 className="font-display font-semibold text-base" style={{ color: 'var(--text-secondary)' }}>
                  The Problem
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {project.problem}
              </p>
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div variants={fadeUp} className="mb-6">
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Wrench size={16} style={{ color: '#10b981' }} />
                <h2 className="font-display font-semibold text-base" style={{ color: 'var(--text-secondary)' }}>
                  My Approach
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {project.solution}
              </p>
            </div>
          </motion.div>

          {/* Full description */}
          <motion.div variants={fadeUp} className="mb-6">
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <BookOpen size={16} style={{ color: 'var(--section-num)' }} />
                <h2 className="font-display font-semibold text-base" style={{ color: 'var(--text-secondary)' }}>
                  Deep Dive
                </h2>
              </div>
              {project.longDescription.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0" style={{ color: 'var(--text-muted)' }}>
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Learnings */}
          {project.learnings && (
            <motion.div variants={fadeUp} className="mb-12">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: `${project.accent}08`,
                  border: `1px solid ${project.accent}25`,
                  backdropFilter: 'blur(16px)',
                }}
              >
                <h2 className="font-display font-semibold text-base mb-3" style={{ color: project.accent }}>
                  💡 Key Learnings
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {project.learnings}
                </p>
              </div>
            </motion.div>
          )}

          {/* Other projects */}
          <motion.div variants={fadeUp}>
            <div
              className="h-px mb-10"
              style={{ background: 'linear-gradient(90deg, transparent, var(--border-accent), transparent)' }}
            />
            <h2 className="font-display font-bold text-xl mb-6" style={{ color: 'var(--text-primary)' }}>
              Other Projects
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherProjects.map((p) => (
                <motion.button
                  key={p.slug}
                  onClick={() => navigate(`/project/${p.slug}`)}
                  className="text-left rounded-xl p-4 transition-all"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                  }}
                  whileHover={{
                    borderColor: `${p.accent}45`,
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm mb-3"
                    style={{ background: `${p.accent}18`, color: p.accent }}
                  >
                    {p.title[0]}
                  </div>
                  <p className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                    {p.title}
                  </p>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                    {p.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
