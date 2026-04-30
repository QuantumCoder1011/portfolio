import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { personalInfo } from '../../utils/data'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'DSA', href: '#dsa' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const isDetailPage = location.pathname.startsWith('/project/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isDetailPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -35% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [isDetailPage, location.pathname])

  const scrollTo = (href) => {
    setMobileOpen(false)
    if (isDetailPage) {
      navigate('/')
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 350)
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const goHome = (e) => {
    e.preventDefault()
    if (isDetailPage) navigate('/')
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-400"
        style={{ paddingTop: scrolled ? '0.6rem' : '1.25rem', paddingBottom: scrolled ? '0.6rem' : '1.25rem' }}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="section-container flex items-center justify-between transition-all duration-400"
          style={
            scrolled
              ? {
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '1rem',
                  padding: '0.6rem 1.25rem',
                }
              : {}
          }
        >
          <motion.a href="/" onClick={goHome} className="flex items-center gap-2.5 group" whileHover={{ scale: 1.02 }}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-base transition-all duration-300"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-accent)',
                color: 'var(--section-num)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {personalInfo.name.charAt(0)}
            </div>
            <span className="font-display font-semibold text-sm hidden sm:block tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              {personalInfo.name}
            </span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = !isDetailPage && activeSection === link.href.slice(1)
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                  style={{ color: isActive ? 'var(--section-num)' : 'var(--text-muted)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-200"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                backdropFilter: 'blur(8px)',
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -80, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 80, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="hidden md:block px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--section-num)',
                color: '#030508',
                boxShadow: '0 0 20px rgba(79,142,247,0.3)',
              }}
            >
              Hire Me
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col pt-20 px-6 pb-8 md:hidden"
            style={{
              background: theme === 'dark' ? 'rgba(3,5,8,0.97)' : 'rgba(244,246,251,0.97)',
              backdropFilter: 'blur(24px)',
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
          >
            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-5 py-4 text-2xl font-display font-bold rounded-xl transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ color: 'var(--section-num)', x: 4 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="mt-6 px-6 py-4 text-center text-base font-display font-bold rounded-xl"
              style={{ background: 'var(--section-num)', color: '#030508' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
