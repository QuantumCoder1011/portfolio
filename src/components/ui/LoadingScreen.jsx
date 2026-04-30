import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { personalInfo } from '../../utils/data'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 250)
          return 100
        }
        return Math.min(p + Math.random() * 14, 100)
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      animate={done ? { opacity: 0, scale: 1.04 } : {}}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      onAnimationComplete={() => done && onComplete?.()}
    >
      <div className="absolute inset-0 grid-bg" style={{ opacity: 0.35 }} />

      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 mb-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center pulse-glow"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid rgba(79,142,247,0.3)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <span className="font-display font-bold text-2xl gradient-text">
            {personalInfo.name.charAt(0)}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 mb-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        <motion.p
          className="font-display font-semibold text-base tracking-[0.3em] uppercase"
          style={{ color: 'var(--text-muted)' }}
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.45, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {personalInfo.name}
        </motion.p>
      </motion.div>

      <motion.div
        className="relative z-10 w-56"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        <div className="h-px rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #4f8ef7, #00d4ff)',
              width: `${Math.min(progress, 100)}%`,
            }}
          />
        </div>
        <div className="mt-2.5 flex justify-between items-center">
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Loading
          </span>
          <span className="font-mono text-[10px]" style={{ color: 'var(--section-num)' }}>
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>
      </motion.div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `${15 + i * 17}%`,
            top: `${25 + (i % 3) * 20}%`,
            background: 'rgba(79,142,247,0.4)',
          }}
          animate={{ y: [0, -16, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </motion.div>
  )
}
