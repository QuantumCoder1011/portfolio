import { motion } from 'framer-motion'
import { Github, Linkedin, Code2, ArrowUp } from 'lucide-react'
import { personalInfo } from '../../utils/data'

const navLinks = ['About', 'Projects', 'DSA', 'Contact']

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo = (section) => {
    document.querySelector(`#${section.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border-accent), transparent)' }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--bg-secondary)', opacity: 0.5 }} />

      <div className="section-container py-14 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-accent)',
                  color: 'var(--section-num)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {personalInfo.name.charAt(0)}
              </div>
              <span className="font-display font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {personalInfo.title}
            </p>
          </motion.div>

          <motion.nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-xs transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--section-num)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
              >
                {link}
              </button>
            ))}
          </motion.nav>

          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
              { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
              { icon: Code2, href: personalInfo.social.leetcode, label: 'LeetCode', accent: '#FFA116' },
            ].map(({ icon: Icon, href, label, accent }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent || 'rgba(79,142,247,0.4)'
                  e.currentTarget.style.color = accent || 'var(--section-num)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </motion.div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {personalInfo.name} - Built with React, Three.js & Framer Motion
          </p>

          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs transition-all group"
            style={{ color: 'var(--text-muted)' }}
            whileHover={{ y: -2, color: 'var(--section-num)' }}
          >
            Back to top
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <ArrowUp size={11} />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
