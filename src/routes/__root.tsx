import { HeadContent, Scripts, createRootRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#FDFBF7' },
      { title: 'Angel Number Calculator — Discover Your Personal Vibration' },
      {
        name: 'description',
        content:
          'Calculate your personal angel number using traditional Pythagorean numerology. Enter your name and birthday to discover your symbolic vibration.',
      },
      // Open Graph Metadata
      { name: 'og:title', content: 'Angel Number Calculator — Discover Your Personal Vibration' },
      {
        name: 'og:description',
        content: 'Calculate your personal angel number using traditional Pythagorean numerology. Enter your name and birthday to discover your symbolic vibration.',
      },
      { name: 'og:image', content: 'https://angelnumbercalculator.com/og-image.jpg' },
      { name: 'og:url', content: 'https://angelnumbercalculator.com/' },
      { name: 'og:type', content: 'website' },
      // Twitter Card Metadata
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Angel Number Calculator — Discover Your Personal Vibration' },
      {
        name: 'twitter:description',
        content: 'Calculate your personal angel number using traditional Pythagorean numerology. Enter your name and birthday to discover your symbolic vibration.',
      },
      { name: 'twitter:image', content: 'https://angelnumbercalculator.com/og-image.jpg' },
      // GEO-SEO Location Metadata
      { name: 'geo.region', content: 'US' },
      { name: 'geo.position', content: '40.7128;-74.0060' },
      { name: 'ICBM', content: '40.7128, -74.0060' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Geist:wght@300;400;500;600&display=swap',
      },
      // Favicon & Icon references
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'shortcut icon', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/favicon.svg' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Load initial theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else {
      // Default is light per instructions, no system checks needed
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Angel Number Calculator",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Calculate your personal angel number using traditional Pythagorean numerology. Enter name and birthday to discover your symbolic vibration.",
              "url": "https://angelnumbercalculator.com/"
            })
          }}
        />
      </head>
      <body>
        {/* Floating nav pill */}
        <nav className="nav-pill">
          <img src="/favicon.svg" width="18" height="18" alt="Angel Number Logo" style={{ flexShrink: 0, borderRadius: '4px' }} />
          <Link
            to="/"
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            Angel Number
          </Link>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginRight: '4px' }}>Calculator</span>
          
          <div style={{ width: '1px', height: '16px', background: 'var(--border-subtle)' }} />

          {/* Theme switcher */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              // Moon icon for switching to dark mode
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              // Sun icon for switching to light mode
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
        </nav>

        <main style={{ paddingTop: '80px' }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '48px 24px',
          marginTop: '96px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            maxWidth: '56ch',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            This calculator is designed for entertainment, personal reflection, and self-exploration purposes.
            Results are based on traditional numerology practices and should not replace professional advice.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <Link to="/" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>·</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Angel Number Calculator
            </span>
          </div>
        </footer>

        <Scripts />
      </body>
    </html>
  )
}
