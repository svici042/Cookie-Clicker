import { useEffect, useState } from 'react'
import './App.css'
import CatFacts from './components/CatFacts'
import CookieClicker from './components/CookieClicker'
import Users from './components/Users'
import { setStoredTheme } from './theme.js'

function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme)
  const isDark = theme === 'dark'
  const themeLabel = isDark ? 'Bytt til lys modus' : 'Bytt til mørk modus'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleTheme() {
    const nextTheme = isDark ? 'light' : 'dark'
    setTheme(nextTheme)
    setStoredTheme(nextTheme)
  }

  return (
    <main className="app">
      <header className="app-toolbar">
        <span className="app-wordmark">Kjekspause<span aria-hidden="true">.</span></span>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={themeLabel}
          title={themeLabel}
        >
          <span className="theme-toggle-icons" aria-hidden="true">
            <span className={`theme-icon${!isDark ? ' is-active' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
              </svg>
            </span>
            <span className={`theme-icon${isDark ? ' is-active' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.5 13.1A8.6 8.6 0 0 1 10.9 3.5a8.6 8.6 0 1 0 9.6 9.6Z" />
              </svg>
            </span>
          </span>
          <span className="theme-toggle-label" aria-hidden="true">{isDark ? 'Mørk' : 'Lys'}</span>
        </button>
      </header>
      <CookieClicker />
      <CatFacts />
      <Users />
    </main>
  )
}

export default App
