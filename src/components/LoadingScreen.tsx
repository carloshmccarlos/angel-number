import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface LoadingScreenProps {
  name: string
  onComplete: () => void
}

const STEPS = [
  { text: 'Analyzing your name vibration…', duration: 1000 },
  { text: 'Connecting your birth path energy…', duration: 1000 },
  { text: 'Preparing your numerology insight…', duration: 1000 },
]

// Random particles data — generated once
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 2,
  opacity: Math.random() * 0.5 + 0.2,
}))

export default function LoadingScreen({ name, onComplete }: LoadingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let elapsed = 0
    const total = STEPS.reduce((s, p) => s + p.duration, 0)
    const tick = setInterval(() => {
      elapsed += 50
      setProgress(Math.min(elapsed / total, 1))
      if (elapsed >= total) {
        clearInterval(tick)
        setTimeout(onComplete, 200)
      }
    }, 50)

    const timers: ReturnType<typeof setTimeout>[] = []
    let acc = 0
    STEPS.forEach((step, i) => {
      acc += step.duration
      if (i < STEPS.length - 1) {
        timers.push(setTimeout(() => setStepIndex(i + 1), acc))
      }
    })

    return () => {
      clearInterval(tick)
      timers.forEach(clearTimeout)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-canvas)',
        gap: '48px',
      }}
    >
      {/* Background orb */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '9999px',
        background: 'radial-gradient(circle, oklch(40% 0.14 290 / 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            position: 'fixed',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
          animate={{
            y: [0, -16, 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Center content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', position: 'relative', zIndex: 1 }}>
        {/* Animated sigil ring */}
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            viewBox="0 0 120 120"
            fill="none"
          >
            {/* Outer track */}
            <circle cx="60" cy="60" r="54" stroke="oklch(100% 0 0 / 0.06)" strokeWidth="1" />
            {/* Progress arc */}
            <motion.circle
              cx="60" cy="60" r="54"
              stroke="oklch(68% 0.18 290)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              style={{ pathLength: progress, rotate: -90, transformOrigin: '60px 60px' }}
              animate={{ pathLength: progress }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
            {/* Inner ring */}
            <circle cx="60" cy="60" r="40" stroke="oklch(100% 0 0 / 0.04)" strokeWidth="1" />
            {/* Star polygon */}
            <polygon
              points="60,20 66,46 92,46 72,62 79,88 60,74 41,88 48,62 28,46 54,46"
              fill="none"
              stroke="oklch(68% 0.18 290 / 0.4)"
              strokeWidth="1"
            />
          </svg>
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Cinzel', serif",
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--accent-violet)',
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {name.split(' ')[0]?.charAt(0).toUpperCase() ?? '✦'}
          </motion.div>
        </div>

        {/* Step text */}
        <div style={{ textAlign: 'center', height: '28px' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE_EXPO }}
              style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', letterSpacing: '-0.01em' }}
            >
              {STEPS[stepIndex].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '200px',
          height: '2px',
          background: 'var(--border-subtle)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'var(--accent-violet)',
              borderRadius: '9999px',
              scaleX: progress,
              transformOrigin: 'left',
            }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
