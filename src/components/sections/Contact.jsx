import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Github, Linkedin, Code2, CheckCircle, AlertCircle, Mail, ArrowUpRight } from 'lucide-react'
import { personalInfo } from '../../utils/data'

/* ── Fully fixed input with proper text visibility ───────── */
function InputField({ label, name, type = 'text', value, onChange, onBlur, error, placeholder, rows }) {
  const [focused, setFocused] = useState(false)
  const isTextarea = type === 'textarea'
  const Tag = isTextarea ? 'textarea' : 'input'

  return (
    <div className="space-y-1.5">
      <label
        className="block text-xs uppercase tracking-wider font-mono"
        htmlFor={name}
        style={{ color: focused ? 'var(--section-num)' : 'var(--text-muted)' }}
      >
        {label}
      </label>
      <div className="relative">
        <Tag
          id={name}
          name={name}
          type={isTextarea ? undefined : type}
          value={value}
          onChange={onChange}
          onBlur={(e) => { setFocused(false); onBlur?.(e) }}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          rows={rows}
          className={`form-input ${error ? 'error' : ''}`}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs flex items-center gap-1.5 text-red-400"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SocialLink({ href, icon: Icon, label, username, accentColor }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3.5 p-4 rounded-xl transition-all duration-200"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(12px)',
      }}
      whileHover={{
        x: 3,
        borderColor: accentColor ? `${accentColor}45` : 'var(--border-accent)',
        boxShadow: accentColor ? `0 4px 20px ${accentColor}15` : undefined,
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: accentColor ? `${accentColor}15` : 'rgba(79,142,247,0.1)',
          border: `1px solid ${accentColor ? `${accentColor}30` : 'rgba(79,142,247,0.2)'}`,
          color: accentColor || 'var(--section-num)',
        }}
      >
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-secondary)' }}>{username}</p>
      </div>
      <ArrowUpRight size={14} style={{ color: 'var(--text-muted)' }} />
    </motion.a>
  )
}

const validate = (fields) => {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Name is required'
  else if (fields.name.trim().length < 2) errors.name = 'At least 2 characters'

  if (!fields.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Invalid email address'

  if (!fields.message.trim()) errors.message = 'Message is required'
  else if (fields.message.trim().length < 10) errors.message = 'At least 10 characters'

  return errors
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value })
      setErrors(prev => ({ ...prev, [name]: errs[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    const errs = validate(fields)
    setErrors(prev => ({ ...prev, [name]: errs[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1600))
    setStatus('success')
    setFields({ name: '', email: '', message: '' })
    setTouched({})
  }

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg" style={{ opacity: 0.2 }} />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'var(--glow-azure)', filter: 'blur(100px)', opacity: 0.5 }}
      />

      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">
            05 — Contact
          </span>
          <h2
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}
          >
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            Looking for internships, collaborations, or just want to chat about tech? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div
              className="rounded-2xl p-7 relative overflow-hidden"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'var(--glow-azure)', filter: 'blur(60px)', opacity: 0.4 }}
              />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 280, delay: 0.1 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}
                    >
                      <CheckCircle size={26} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
                      Message Sent!
                    </h3>
                    <p className="text-sm mb-7" style={{ color: 'var(--text-muted)' }}>
                      Thanks for reaching out — I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-5 py-2 rounded-xl text-sm transition-all"
                      style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="font-display font-semibold text-lg mb-5" style={{ color: 'var(--text-secondary)' }}>
                      Send a message
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField
                        label="Your Name"
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name}
                        placeholder="Jane Doe"
                      />
                      <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={fields.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                        placeholder="jane@example.com"
                      />
                    </div>

                    <InputField
                      label="Message"
                      name="message"
                      type="textarea"
                      value={fields.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.message}
                      placeholder="Hi Alex! I wanted to reach out about..."
                      rows={5}
                    />

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-3.5 rounded-xl font-semibold relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #4f8ef7, #00d4ff)',
                        color: '#030508',
                      }}
                      whileHover={status !== 'sending' ? { scale: 1.01 } : {}}
                      whileTap={status !== 'sending' ? { scale: 0.99 } : {}}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                        {status === 'sending' ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            Send Message
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            {/* Direct email */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3.5 p-4 rounded-xl transition-all duration-200 group"
              style={{
                background: 'rgba(79,142,247,0.08)',
                border: '1px solid rgba(79,142,247,0.2)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(79,142,247,0.18)', color: 'var(--section-num)' }}
              >
                <Mail size={17} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Direct email
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--section-num)' }}>
                  {personalInfo.email}
                </p>
              </div>
            </a>

            {/* Social links — no Twitter, added LeetCode */}
            <SocialLink
              href={personalInfo.social.github}
              icon={Github}
              label="GitHub"
              username="@alexchen"
            />
            <SocialLink
              href={personalInfo.social.linkedin}
              icon={Linkedin}
              label="LinkedIn"
              username="Alex Chen"
              accentColor="#0A66C2"
            />
            <SocialLink
              href={personalInfo.social.leetcode}
              icon={Code2}
              label="LeetCode"
              username="alexchen · 320 solved"
              accentColor="#FFA116"
            />

            {/* Availability */}
            <div
              className="rounded-xl p-4"
              style={{
                background: 'rgba(52,211,153,0.06)',
                border: '1px solid rgba(52,211,153,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider">Available</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Looking for <span className="font-medium text-emerald-400">internships</span> and{' '}
                <span className="font-medium text-emerald-400">entry-level roles</span>. Fast response guaranteed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
