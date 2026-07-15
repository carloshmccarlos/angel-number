import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateResult, ANGEL_DETAILS } from '../utils/numerology'
import type { FocusArea } from '../utils/numerology'
import LoadingScreen from '../components/LoadingScreen'
import { z } from 'zod/v4'
import { createServerFn } from '@tanstack/react-start'

// Define the server function to call SiliconFlow
export const generateAIReading = createServerFn({ method: 'POST' })
  .validator(
    (d: {
      name: string
      birthday: string
      focus: string
      vibration: number
      theme: string
      angelNumber: string
    }) => d
  )
  .handler(async ({ data }) => {
    const apiKey =
      process.env.SILICONFLOW_API_KEY ||
      import.meta.env.SILICONFLOW_API_KEY ||
      ''
    if (!apiKey) {
      // Return null or empty if no API key configured; client will fall back to static text
      return { text: '', fallback: true }
    }

    const focusLabels: Record<string, string> = {
      general: 'General Life Guide',
      love: 'Love & Relationships',
      career: 'Career & Path',
      wealth: 'Wealth & Prosperity',
      growth: 'Personal Growth',
    }

    const prompt = `You are a professional Pythagorean Numerologist.
Generate a personalized, reflective, and symbolic interpretation for the following user profile:
- Name: "${data.name}"
- Birthdate: ${data.birthday}
- Core Pythagorean Vibration: ${data.vibration} (Angel Number: ${data.angelNumber}, Core Theme: ${data.theme})
- Chosen Focus Area: ${focusLabels[data.focus] || data.focus}

Write a detailed interpretation in English. Keep the tone encouraging, reflective, and deeply symbolic.
CRITICAL COMPLIANCE RULES:
1. Do NOT use absolute fortune-telling statements.
2. Do NOT promise or guarantee success, financial wealth, specific dates, or specific outcomes. Avoid phrases like "the universe guarantees success", "you will become rich", or "your angel predicts your future".
3. Frame all advice as symbolic guides, opportunities for self-exploration, and mindfulness themes for reflection.

Structure your response into 3 short paragraphs (no headings, no markdown lists):
- Paragraph 1: The Core Meaning of the Angel Number ${data.angelNumber} in relation to the name "${data.name}".
- Paragraph 2: How this vibration relates to their specific focus area: ${focusLabels[data.focus] || data.focus}.
- Paragraph 3: A practical question or theme for self-reflection based on this number's energy.
Keep paragraphs cohesive and under 80 words each.`

    try {
      const response = await fetch(
        'https://api.siliconflow.cn/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'deepseek-ai/DeepSeek-V4-Flash',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 600,
          }),
        }
      )

      if (!response.ok) {
        console.error('SiliconFlow API error:', response.statusText)
        return { text: '', fallback: true }
      }

      const resData = await response.json()
      const text = resData?.choices?.[0]?.message?.content || ''
      return { text, fallback: false }
    } catch (err) {
      console.error('Failed to query SiliconFlow API:', err)
      return { text: '', fallback: true }
    }
  })

const searchSchema = z.object({
  name: z.string().min(1),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  year: z.number().int().min(1940).max(new Date().getFullYear()),
  focus: z
    .enum(['general', 'love', 'career', 'wealth', 'growth'])
    .optional()
    .default('general'),
})

export const Route = createFileRoute('/result')({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { name: 'robots', content: 'noindex, nofollow' },
      { title: 'Your Angel Number Result' },
    ],
  }),
  component: ResultPage,
})

const FOCUS_LABELS: Record<FocusArea, string> = {
  general: 'General Guide',
  love: 'Love & Relationships',
  career: 'Career & Path',
  wealth: 'Wealth & Prosperity',
  growth: 'Personal Growth',
}

const FOCUS_COLORS: Record<FocusArea, string> = {
  general: 'oklch(68% 0.18 290)',
  love: 'oklch(70% 0.18 10)',
  career: 'oklch(72% 0.15 220)',
  wealth: 'oklch(78% 0.15 75)',
  growth: 'oklch(72% 0.15 155)',
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
}

function ResultPage() {
  const { name, month, day, year, focus } = Route.useSearch()
  const [loading, setLoading] = useState(true)
  const [aiReading, setAiReading] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)

  const result = calculateResult(name, month, day, year, focus)
  const mapping = ANGEL_DETAILS[result.angelNumber] || ANGEL_DETAILS['111']

  // Handle AI reading generation & caching
  useEffect(() => {
    if (loading) return

    const cacheKey = `ai_reading_${name.trim().toLowerCase()}_${month}_${day}_${year}_${focus}`
    const cached = localStorage.getItem(cacheKey)

    if (cached) {
      setAiReading(cached)
      return
    }

    // Trigger AI compilation
    setAiLoading(true)
    generateAIReading({
      data: {
        name: name.trim(),
        birthday: `${month}/${day}/${year}`,
        focus,
        vibration: result.personalVibration,
        theme: result.theme,
        angelNumber: result.angelNumber,
      }
    })
      .then(res => {
        if (res && res.text) {
          setAiReading(res.text)
          localStorage.setItem(cacheKey, res.text)
        } else {
          setUsingFallback(true)
        }
      })
      .catch(err => {
        console.error('Failed to get AI reading, falling back:', err)
        setUsingFallback(true)
      })
      .finally(() => {
        setAiLoading(false)
      })
  }, [loading, name, month, day, year, focus, result.personalVibration, result.theme, result.angelNumber])

  if (loading) {
    return (
      <AnimatePresence>
        <LoadingScreen name={name} onComplete={() => setLoading(false)} />
      </AnimatePresence>
    )
  }

  const focusColor = FOCUS_COLORS[focus]

  return (
    <AnimatePresence>
      <motion.div
        key="result"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_EXPO }}
        style={{ padding: '0 24px 96px', maxWidth: '1100px', margin: '0 auto' }}
      >
        {/* Hero — Angel Number Display */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ textAlign: 'center', padding: '64px 0 80px' }}
        >
          <motion.div variants={fadeUp}>
            <div
              className="eyebrow"
              style={{ display: 'inline-flex', marginBottom: '32px' }}
            >
              ✦ Your Personal Angel Number
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            {/* Glow effect behind number */}
            <div
              style={{
                position: 'absolute',
                inset: '-20px',
                background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${focusColor.replace(')', ' / 0.15)')} 0%, transparent 70%)`,
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }}
            />
            <h1
              className="display-number"
              style={{ position: 'relative', color: 'var(--text-primary)' }}
            >
              {result.angelNumber}
            </h1>
          </motion.div>

          <motion.div variants={fadeUp} style={{ marginTop: '20px' }}>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1.25rem',
                color: 'var(--text-secondary)',
                letterSpacing: '-0.01em',
              }}
            >
              {result.theme}
            </p>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                marginTop: '8px',
              }}
            >
              {name} · {FOCUS_LABELS[focus]}
            </p>
          </motion.div>
        </motion.div>

        {/* Asymmetric Bento Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto',
            gap: '16px',
          }}
        >
          {/* Card A — Main interpretation (AI dynamic / Static Fallback) */}
          <motion.div variants={fadeUp} style={{ gridColumn: 'span 8' }}>
            <div className="bezel-outer" style={{ height: '100%' }}>
              <div
                className="bezel-inner"
                style={{ padding: '36px', height: '100%' }}
              >
                <div
                  className="label-sm"
                  style={{
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '9999px',
                        background: focusColor,
                      }}
                    />
                    {FOCUS_LABELS[focus]} Reading
                  </div>
                  {aiLoading && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-violet)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Consulting DeepSeek AI…
                    </span>
                  )}
                  {aiReading && !aiLoading && !usingFallback && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Dynamic AI Reading
                    </span>
                  )}
                </div>

                {aiLoading ? (
                  // Shimmer loading state
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ height: '16px', background: 'var(--bg-elevated)', borderRadius: '4px', width: '100%', opacity: 0.6 }} className="animate-pulse" />
                    <div style={{ height: '16px', background: 'var(--bg-elevated)', borderRadius: '4px', width: '92%', opacity: 0.6 }} className="animate-pulse" />
                    <div style={{ height: '16px', background: 'var(--bg-elevated)', borderRadius: '4px', width: '78%', opacity: 0.6 }} className="animate-pulse" />
                  </div>
                ) : aiReading ? (
                  // Renders the AI reading output, breaking into paragraphs
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {aiReading.split('\n\n').map((para, i) => (
                      <p
                        key={i}
                        style={{
                          fontSize: '1.0625rem',
                          lineHeight: 1.75,
                          color: 'var(--text-secondary)',
                          maxWidth: '65ch',
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  // Static Fallback Reading
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <p
                      style={{
                        fontSize: '1.0625rem',
                        lineHeight: 1.75,
                        color: 'var(--text-secondary)',
                        maxWidth: '60ch',
                      }}
                    >
                      {result.focusReading}
                    </p>
                    {usingFallback && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                        * Note: A standard general template is loaded. Configure the SiliconFlow API key to enable personalized AI readings.
                      </p>
                    )}
                  </div>
                )}

                {focus !== 'general' && (
                  <div
                    style={{
                      marginTop: '28px',
                      paddingTop: '28px',
                      borderTop: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div className="label-sm" style={{ marginBottom: '12px' }}>
                      Symbolic Overview
                    </div>
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: 1.7,
                        color: 'var(--text-muted)',
                      }}
                    >
                      {result.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Card B — Vibration number summary */}
          <motion.div variants={fadeUp} style={{ gridColumn: 'span 4' }}>
            <div className="bezel-outer" style={{ height: '100%' }}>
              <div
                className="bezel-inner"
                style={{
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div className="label-sm">Your Vibration</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Name Number', value: result.nameNumber },
                    { label: 'Life Path', value: result.lifePathNumber },
                  ].map(item => (
                    <div
                      key={item.label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        background: 'var(--bg-elevated)',
                        borderRadius: '12px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    textAlign: 'center',
                    padding: '16px',
                    background: `${focusColor.replace(')', ' / 0.08)')}`,
                    borderRadius: '16px',
                    border: `1px solid ${focusColor.replace(')', ' / 0.2)')}`,
                  }}
                >
                  <div className="label-sm" style={{ color: focusColor, marginBottom: '6px' }}>
                    Personal Vibration
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      color: focusColor,
                    }}
                  >
                    {result.personalVibration}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginTop: '4px',
                    }}
                  >
                    {result.nameNumber} + {result.lifePathNumber} →{' '}
                    {result.angelNumber}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card C — Name breakdown */}
          <motion.div variants={fadeUp} style={{ gridColumn: 'span 5' }}>
            <div className="bezel-outer" style={{ height: '100%' }}>
              <div
                className="bezel-inner"
                style={{ padding: '28px', height: '100%' }}
              >
                <div className="label-sm" style={{ marginBottom: '20px' }}>
                  Name Reduction
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '20px',
                  }}
                >
                  {result.nameSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.05 * i,
                        duration: 0.3,
                        ease: EASE_EXPO,
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '8px 10px',
                        background: 'var(--bg-elevated)',
                        borderRadius: '10px',
                        border: '1px solid var(--border-subtle)',
                        minWidth: '36px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {step.letter}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--accent-violet)',
                          marginTop: '2px',
                        }}
                      >
                        {step.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      Reduced to
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {result.nameNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card D — Life path steps */}
          <motion.div variants={fadeUp} style={{ gridColumn: 'span 7' }}>
            <div className="bezel-outer" style={{ height: '100%' }}>
              <div
                className="bezel-inner"
                style={{ padding: '28px', height: '100%' }}
              >
                <div className="label-sm" style={{ marginBottom: '20px' }}>
                  Life Path Calculation
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {result.lifePathSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 * i,
                        duration: 0.5,
                        ease: EASE_EXPO,
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="step-badge">{i + 1}</div>
                        <span
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {step.label}
                          {step.label === 'Year' && (
                            <span
                              style={{
                                color: 'var(--text-muted)',
                                marginLeft: '4px',
                              }}
                            >
                              ({year})
                            </span>
                          )}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {step.value !== step.reduced && (
                          <span
                            style={{
                              fontSize: '0.8125rem',
                              color: 'var(--text-muted)',
                            }}
                          >
                            {step.value} →
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {step.reduced}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Life Path Number
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {result.lifePathNumber}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* All focus readings */}
          <motion.div variants={fadeUp} style={{ gridColumn: 'span 12' }}>
            <div className="bezel-outer">
              <div className="bezel-inner" style={{ padding: '36px' }}>
                <div className="label-sm" style={{ marginBottom: '28px' }}>
                  Complete Reading — All Areas
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {(
                    ['general', 'love', 'career', 'wealth', 'growth'] as FocusArea[]
                  ).map(f => {
                    const color = FOCUS_COLORS[f]
                    const isActive = f === focus
                    const readingMap: Record<FocusArea, string> = {
                      general: mapping.description,
                      love: mapping.love,
                      career: mapping.career,
                      wealth: mapping.wealth,
                      growth: mapping.growth,
                    }
                    return (
                      <div
                        key={f}
                        style={{
                          padding: '20px',
                          borderRadius: '16px',
                          background: isActive
                            ? `${color.replace(')', ' / 0.06)')}`
                            : 'var(--bg-elevated)',
                          border: `1px solid ${isActive ? color.replace(')', ' / 0.25)') : 'var(--border-subtle)'}`,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '12px',
                          }}
                        >
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '9999px',
                              background: color,
                            }}
                          />
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color,
                            }}
                          >
                            {FOCUS_LABELS[f]}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: '0.875rem',
                            lineHeight: 1.7,
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {readingMap[f]}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recalculate CTA */}
          <motion.div
            variants={fadeUp}
            style={{ gridColumn: 'span 12', textAlign: 'center', paddingTop: '24px' }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button className="btn-primary">
                Calculate Again
                <span className="btn-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M1 4v6h6M23 20v-6h-6" />
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                  </svg>
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
