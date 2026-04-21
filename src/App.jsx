import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/ui/Navbar'
import Cursor from './components/ui/Cursor'
import LoadingScreen from './components/ui/LoadingScreen'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import DSASection from './components/sections/DSASection'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import ProjectDetail from './components/sections/ProjectDetail'
import { experience } from './utils/data'

function MainPage({ theme }) {
  const hasExperience = experience && experience.length > 0
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      {hasExperience && <Experience />}
      <DSASection />
      <Contact />
    </main>
  )
}

function AppShell({ theme, toggleTheme }) {
  const location = useLocation()
  const isDetailPage = location.pathname.startsWith('/project/')

  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <Cursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<><MainPage theme={theme} /><Footer /></>} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AppShell theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  )
}
