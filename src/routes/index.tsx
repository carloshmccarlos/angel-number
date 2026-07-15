import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { FocusArea } from '../utils/numerology'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Angel Number Calculator — Discover Your Personal Angel Number Free' },
      {
        name: 'description',
        content:
          'Free angel number calculator based on your name and birthday using Pythagorean numerology. Find your personal vibration number instantly.',
      },
    ],
  }),
  component: HomePage,
})

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 1939 }, (_, i) => CURRENT_YEAR - i)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

const FOCUS_OPTIONS: { value: FocusArea; label: string; emoji: string }[] = [
  { value: 'general', label: 'General Guide', emoji: '✨' },
  { value: 'love', label: 'Love & Relationships', emoji: '💖' },
  { value: 'career', label: 'Career & Path', emoji: '💼' },
  { value: 'wealth', label: 'Wealth & Prosperity', emoji: '💰' },
  { value: 'growth', label: 'Personal Growth', emoji: '🌱' },
]

const VALID_NUMBERS = [
  '000', '111', '222', '333', '444', '555', '666', '777', '888', '999',
  '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999',
  '1010', '1212', '123', '1234', '234',
  '1001', '1110', '1122', '1221', '1331', '1441', '1551', '2020', '2121', '2323',
  '1414', '1515', '1616', '1717', '1818', '1919', '2525', '3030', '3131', '3232',
  '4040', '4141', '4242', '4343', '4545', '5050', '5151', '5252', '5353', '5454',
  '6060', '6161', '6262', '6363', '6464', '7070', '7171', '7272', '7373', '7474'
]

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE_EXPO } },
}

function HomePage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [focus, setFocus] = useState<FocusArea>('general')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim() || name.trim().replace(/[^a-zA-Z]/g, '').length < 2) e.name = 'Please enter your full name (using English/Latin letters)'
    if (!month) e.month = 'Select month'
    if (!day) e.day = 'Select day'
    if (!year) e.year = 'Select year'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    navigate({
      to: '/result',
      search: { name: name.trim(), month: Number(month), day: Number(day), year: Number(year), focus },
    })
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
      
      {/* Hero Section & Form Split */}
      <div style={{
        minHeight: '85dvh',
        display: 'flex',
        alignItems: 'center',
        padding: '48px 0 96px',
      }}>
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}>

          {/* Left Column — Copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            <motion.div variants={fadeUp}>
              <div className="eyebrow">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Traditional Pythagorean Numerology
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} className="display-xl">
              Discover<br />
              <span style={{ color: 'var(--accent-violet)' }}>Your Angel</span><br />
              Number
            </motion.h1>

            <motion.p variants={fadeUp} className="body-lg">
              Explore your personal vibration and life path numbers. Enter your name and birthday below for a customized symbolic reflection.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '◎', text: 'Pythagorean name letter reduction' },
                { icon: '◎', text: 'Life path number based on birthday' },
                { icon: '◎', text: 'Refined mapping including master numbers 11, 22, 33' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--accent-violet)', fontSize: '0.75rem' }}>{item.icon}</span>
                  <span className="label-sm" style={{ textTransform: 'none', letterSpacing: '0.02em', fontSize: '0.8125rem' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_EXPO }}
          >
            <div className="bezel-outer">
              <div className="bezel-inner" style={{ padding: '32px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                  {/* Name */}
                  <div>
                    <label className="label-sm" style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
                    <div className="input-bezel-outer">
                      <div className="input-bezel-inner">
                        <input
                          id="name-input"
                          className="form-input"
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                          autoComplete="name"
                        />
                      </div>
                    </div>
                    {errors.name && (
                      <p style={{ color: 'oklch(65% 0.18 25)', fontSize: '0.75rem', marginTop: '6px', paddingLeft: '4px' }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Birthday */}
                  <div>
                    <label className="label-sm" style={{ display: 'block', marginBottom: '8px' }}>Birthday</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: '8px' }}>
                      {[
                        {
                          id: 'month-select', key: 'month', value: month, placeholder: 'Month',
                          onChange: (v: string) => { setMonth(v); setErrors(p => ({ ...p, month: '' })) },
                          options: MONTHS.map((m, i) => ({ value: String(i + 1), label: m })),
                        },
                        {
                          id: 'day-select', key: 'day', value: day, placeholder: 'Day',
                          onChange: (v: string) => { setDay(v); setErrors(p => ({ ...p, day: '' })) },
                          options: DAYS.map(d => ({ value: String(d), label: String(d) })),
                        },
                        {
                          id: 'year-select', key: 'year', value: year, placeholder: 'Year',
                          onChange: (v: string) => { setYear(v); setErrors(p => ({ ...p, year: '' })) },
                          options: YEARS.map(y => ({ value: String(y), label: String(y) })),
                        },
                      ].map(field => (
                        <div key={field.key} className="input-bezel-outer" style={{ position: 'relative' }}>
                          <div className="input-bezel-inner" style={{ position: 'relative' }}>
                            <select
                              id={field.id}
                              className="form-select"
                              value={field.value}
                              onChange={e => field.onChange(e.target.value)}
                            >
                              <option value="">{field.placeholder}</option>
                              {field.options.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                              ))}
                            </select>
                            <div style={{
                              position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                              pointerEvents: 'none', color: 'var(--text-muted)',
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(errors.month || errors.day || errors.year) && (
                      <p style={{ color: 'oklch(65% 0.18 25)', fontSize: '0.75rem', marginTop: '6px', paddingLeft: '4px' }}>
                        Please complete your birthday.
                      </p>
                    )}
                  </div>

                  {/* Focus Area */}
                  <div>
                    <label className="label-sm" style={{ display: 'block', marginBottom: '8px' }}>Focus Area</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {FOCUS_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          className={`focus-pill ${focus === opt.value ? 'active' : ''}`}
                          onClick={() => setFocus(opt.value)}
                          aria-pressed={focus === opt.value}
                        >
                          {opt.emoji} {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="divider" />

                  {/* CTA */}
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Calculate My Angel Number
                    <span className="btn-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SEO Section A — What are Angel Numbers? */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '16px' }}>✦ Universal Numerology</div>
            <h2 className="display-lg" style={{ marginBottom: '24px' }}>What are Angel Numbers?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '16px' }}>
              Angel numbers are repeating sequences of digits (like 111, 222, 444) that carry specific symbolic interpretations within ancient and traditional numerology systems.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Many people observe these sequences on clocks, receipts, or page numbers. In traditional numerology, they are viewed as focal points for personal reflection, meditation, and self-exploration.
            </p>
          </div>
          <div className="bezel-outer">
            <div className="bezel-inner" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '6px' }}>Pythagorean Roots</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Based on the mathematical principles of ancient Greece, every name and date reduces to a core frequency.
                  </p>
                </div>
                <div className="divider" />
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '6px' }}>Vibrational Matching</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    By mapping the numerical values of your name and birthdate, this calculator identifies your corresponding repeating sequence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section B — Calculation Example */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="eyebrow" style={{ marginBottom: '16px' }}>✦ Calculation Process</div>
          <h2 className="display-lg">How is it Calculated?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            {
              step: '01',
              title: 'Name Reduction',
              desc: 'Convert full name letters to numbers using Pythagorean mapping (A=1, B=2, etc.) and reduce to a single digit.'
            },
            {
              step: '02',
              title: 'Life Path Sum',
              desc: 'Add month, day, and year of birth separately. Reduce to single digits or preserve master numbers (11, 22, 33).'
            },
            {
              step: '03',
              title: 'Vibrational Merge',
              desc: 'Add your Name Number and Life Path Number. Reduce the sum to calculate your personal core vibration.'
            }
          ].map(item => (
            <div key={item.step} className="bezel-outer">
              <div className="bezel-inner" style={{ padding: '28px', minHeight: '220px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: "'Cinzel', serif", color: 'var(--accent-violet)', opacity: 0.8 }}>
                  {item.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Lookup Grid */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="eyebrow" style={{ marginBottom: '16px' }}>✦ Directory</div>
          <h2 className="display-lg">Angel Number Meanings</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {VALID_NUMBERS.map(num => (
            <Link
              key={num}
              to="/angel-number/$number"
              params={{ number: num }}
              style={{ textDecoration: 'none' }}
            >
              <button className="focus-pill" style={{ fontFamily: "'Cinzel', serif", fontWeight: 600, fontSize: '0.95rem', minWidth: '80px' }}>
                {num}
              </button>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="eyebrow" style={{ marginBottom: '16px' }}>✦ Questions</div>
          <h2 className="display-lg">Frequently Asked Questions</h2>
        </div>
        <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              q: 'What is the Pythagorean Numerology system?',
              a: 'The Pythagorean system maps letters to numbers from 1 to 9 in sequence (A=1, B=2, ... I=9, J=1, etc.). It is the most common system used for calculating Western numerology profiles.'
            },
            {
              q: 'What are Master Numbers?',
              a: 'In traditional numerology, the numbers 11, 22, and 33 are considered Master Numbers. They represent amplified frequencies and are not reduced to single digits during the intermediate steps of the calculations.'
            },
            {
              q: 'Does my focus area selection change the algorithm?',
              a: 'No. The focus area (Love, Career, Wealth, etc.) only reorders and highlights specific sections of your final reading. The underlying mathematical vibration remains identical.'
            },
            {
              q: 'Are angel numbers fortune-telling tools?',
              a: 'No. Traditional numerology calculations are tools designed for personal reflection, meditation, and self-exploration. They provide symbolic interpretations and do not guarantee or predict future events.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="bezel-outer">
              <div className="bezel-inner" style={{ overflow: 'hidden' }}>
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {faq.q}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 300ms var(--ease-quart)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 24px 20px', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
