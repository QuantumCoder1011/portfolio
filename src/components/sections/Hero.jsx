import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ExternalLink, Github, Code2 } from 'lucide-react'
import { dsaStats, personalInfo, projects } from '../../utils/data'

const LazyHeroScene = () => {
  const [Scene, setScene] = useState(null)
  useEffect(() => {
    import('../three/HeroScene').then((m) => setScene(() => m.default))
  }, [])
  return Scene ? <Scene /> : null
}

const TypewriterText = ({ words }) => {
  const [currentWord, setCurrentWord] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [pausing, setPausing] = useState(false)

  useEffect(() => {
    if (pausing) return
    const word = words[currentWord]
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(word.slice(0, displayed.length + 1))
        if (displayed.length === word.length - 1) {
          setPausing(true)
          setTimeout(() => {
            setPausing(false)
            setDeleting(true)
          }, 2200)
        }
      } else {
        setDisplayed(word.slice(0, displayed.length - 1))
        if (displayed.length === 0) {
          setDeleting(false)
          setCurrentWord((c) => (c + 1) % words.length)
        }
      }
    }, deleting ? 55 : 95)
    return () => clearTimeout(timer)
  }, [displayed, deleting, pausing, currentWord, words])

  return (
    <span className="gradient-text">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.85, repeat: Infinity }}
        className="inline-block w-0.5 h-[0.85em] bg-azure ml-1 align-middle"
        style={{ backgroundColor: 'var(--section-num)' }}
      />
    </span>
  )
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" style={{ opacity: 0.5 }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(79,142,247,0.07) 0%, transparent 70%)' }}
      />

      <div className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'rgba(79,142,247,0.06)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'rgba(139,92,246,0.06)', filter: 'blur(90px)' }} />

      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[58%] pointer-events-none">
        <Suspense fallback={null}>
          <LazyHeroScene />
        </Suspense>
      </div>

      <div className="section-container relative z-10 w-full py-32 pt-40">
        <motion.div className="max-w-xl" variants={container} initial="hidden" animate="visible">
          <motion.div variants={item} className="mb-7">
            <span
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-mono border"
              style={{
                background: 'var(--glass-bg)',
                borderColor: 'var(--border-accent)',
                color: 'var(--text-muted)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              {personalInfo.availability}
            </span>
          </motion.div>

          <motion.div variants={item} className="mb-4">
            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
              Hello, I'm
            </p>
            <h1
              className="font-display font-extrabold leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: 'var(--text-primary)' }}
            >
              {personalInfo.name.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'gradient-text' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
          </motion.div>

          <motion.div variants={item} className="mb-7">
            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', color: 'var(--text-muted)' }}
            >
              <TypewriterText words={['MCA Student', 'Full-Stack Developer', 'Problem Solver', 'Backend-Focused Builder']} />
            </h2>
          </motion.div>

          <motion.p variants={item} className="text-base leading-relaxed mb-10 max-w-md" style={{ color: 'var(--text-muted)' }}>
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3 mb-14">
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-7 py-3.5 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #4f8ef7, #00d4ff)',
                color: '#030508',
                boxShadow: '0 0 30px rgba(79,142,247,0.35)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <ExternalLink size={15} />
                View My Projects
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Github size={16} className="group-hover:rotate-12 transition-transform" />
              GitHub
            </a>

            <a
              href={personalInfo.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid rgba(255,161,22,0.25)',
                color: 'var(--text-secondary)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Code2 size={16} style={{ color: '#FFA116' }} className="group-hover:scale-110 transition-transform" />
              LeetCode
            </a>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-7">
            {[
              { value: `${projects.length}+`, label: 'Projects Built' },
              { value: `${dsaStats.totalSolved}+`, label: 'LeetCode Solved' },
              { value: `${dsaStats.streak}`, label: 'Day Streak' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl gradient-text">{stat.value}</div>
                <div className="text-xs mt-0.5 font-mono" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-colors"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        whileHover={{ color: 'var(--section-num)' }}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  )
}
