import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { getAngelDetail } from '../../utils/numerology'

// Valid angel numbers (64 total popular search sequences)
const VALID_NUMBERS = [
  '000', '111', '222', '333', '444', '555', '666', '777', '888', '999',
  '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999',
  '1010', '1212', '123', '1234', '234',
  '1001', '1110', '1122', '1221', '1331', '1441', '1551', '2020', '2121', '2323',
  '1414', '1515', '1616', '1717', '1818', '1919', '2525', '3030', '3131', '3232',
  '4040', '4141', '4242', '4343', '4545', '5050', '5151', '5252', '5353', '5454',
  '6060', '6161', '6262', '6363', '6464', '7070', '7171', '7272', '7373', '7474'
]

const VIBRATION_BY_ANGEL: Record<string, number> = {
  '000': 0, '111': 1, '222': 2, '333': 3, '444': 4, '555': 5, '666': 6, '777': 7, '888': 8, '999': 9,
  '1111': 11, '2222': 22, '3333': 33, '4444': 4, '5555': 5, '6666': 6, '7777': 7, '8888': 8, '9999': 9,
  '1010': 2, '1212': 6, '123': 6, '1234': 1, '234': 9,
  '1001': 2, '1110': 3, '1122': 6, '1221': 6, '1331': 8, '1441': 1, '1551': 3, '2020': 4, '2121': 6, '2323': 1,
  '1414': 1, '1515': 3, '1616': 5, '1717': 7, '1818': 9, '1919': 2, '2525': 5, '3030': 6, '3131': 8, '3232': 1,
  '4040': 8, '4141': 1, '4242': 3, '4343': 5, '4545': 9, '5050': 1, '5151': 3, '5252': 5, '5353': 7, '5454': 9,
  '6060': 3, '6161': 5, '6262': 7, '6363': 9, '6464': 2, '7070': 5, '7171': 7, '7272': 9, '7373': 2, '7474': 22
}

export const Route = createFileRoute('/angel-number/$number')({
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.number} Angel Number Meaning — Symbolism & Numerology Interpretation`,
      },
      {
        name: 'description',
        content: `Discover the traditional numerology meaning of angel number ${params.number}. Learn about its symbolic themes, vibration, and personal reflection insights.`,
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
  }),
  component: AngelNumberDetailPage,
  loader: ({ params }) => {
    if (!VALID_NUMBERS.includes(params.number)) {
      throw notFound()
    }
    return params.number
  },
})

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_EXPO } },
}

const FOCUS_LABELS = ['General Meaning', 'Love & Relationships', 'Career & Path', 'Wealth & Prosperity', 'Personal Growth']
const FOCUS_KEYS = ['description', 'love', 'career', 'wealth', 'growth'] as const
const FOCUS_COLORS = [
  'oklch(68% 0.18 290)',
  'oklch(70% 0.18 10)',
  'oklch(72% 0.15 220)',
  'oklch(78% 0.15 75)',
  'oklch(72% 0.15 155)',
]

function AngelNumberDetailPage() {
  const number = Route.useLoaderData() ?? ''
  const vibration = number ? VIBRATION_BY_ANGEL[number] : undefined
  const mapping = number ? getAngelDetail(number) : undefined
  if (!mapping) return null

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 96px' }}
    >
      {/* Hero */}
      <motion.div variants={fadeUp} style={{ marginBottom: '64px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ display: 'inline-flex', marginBottom: '28px' }}>
          ✦ Angel Number Meaning
        </div>
        <h1 className="display-lg" style={{ marginBottom: '16px' }}>
          Angel Number <span style={{ color: 'var(--accent-violet)' }}>{number}</span>
        </h1>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          marginBottom: '12px',
        }}>
          {mapping.theme}
        </p>
        <p className="body-lg" style={{ margin: '0 auto' }}>
          {mapping.description}
        </p>
      </motion.div>

      {/* Vibration badge */}
      <motion.div variants={fadeUp} style={{ marginBottom: '48px' }}>
        <div className="bezel-outer">
          <div className="bezel-inner" style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="label-sm" style={{ marginBottom: '6px' }}>Pythagorean Vibration</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', fontWeight: 700, color: 'var(--accent-violet)' }}>
                  {vibration}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="label-sm" style={{ marginBottom: '6px' }}>Angel Number</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {number}
                </div>
              </div>
              <div style={{ textAlign: 'center', flex: 1, minWidth: '160px' }}>
                <div className="label-sm" style={{ marginBottom: '6px' }}>Core Theme</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {mapping.theme}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Readings for each focus area */}
      <motion.div variants={fadeUp} style={{ marginBottom: '16px' }}>
        <div className="label-sm" style={{ marginBottom: '20px' }}>Symbolic Interpretations</div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '64px' }}>
        {FOCUS_KEYS.map((key, i) => (
          <motion.div
            key={key}
            variants={fadeUp}
          >
            <div className="bezel-outer">
              <div className="bezel-inner" style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '9999px', background: FOCUS_COLORS[i] }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: FOCUS_COLORS[i],
                  }}>
                    {FOCUS_LABELS[i]}
                  </span>
                </div>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                  {mapping[key]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA to calculator */}
      <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>
          Discover which angel number is personal to you
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className="btn-primary">
            Calculate My Angel Number
            <span className="btn-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </button>
        </Link>
      </motion.div>

      {/* All angel numbers nav */}
      <motion.div variants={fadeUp} style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="label-sm" style={{ marginBottom: '16px', textAlign: 'center' }}>Explore Other Angel Numbers</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {VALID_NUMBERS.map(n => (
            <Link
              key={n}
              to="/angel-number/$number"
              params={{ number: n }}
              style={{ textDecoration: 'none' }}
            >
              <button
                className={`focus-pill ${n === number ? 'active' : ''}`}
                style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}
              >
                {n}
              </button>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
