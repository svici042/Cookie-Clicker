// Import React hooks, page styles, feature components, and the theme storage helper.
import { useEffect, useState } from 'react'
import './App.css'
import CatFacts from './components/CatFacts'
import CookieClicker from './components/CookieClicker'
import Users from './components/Users'
import { setStoredTheme } from './theme.js'

function App() {
  // Read the theme already applied to the HTML element by initializeTheme in main.jsx.
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme)
  // Use the current theme to choose the active icon and describe the next toggle action.
  const isDark = theme === 'dark'
  const themeLabel = isDark ? 'Bytt til lys modus' : 'Bytt til mørk modus'

  // Keep the HTML data-theme attribute in sync so CSS can select the matching colors.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleTheme() {
    // Switch themes, update the interface, and save the choice for future visits.
    const nextTheme = isDark ? 'light' : 'dark'
    setTheme(nextTheme)
    setStoredTheme(nextTheme)
  }

  return (
    // The main landmark contains the toolbar and the three feature cards.
    <main className="app">
      <header className="app-toolbar">
        {/* The decorative dot is hidden from screen readers. */}
        <span className="app-wordmark">Kjekspause<span aria-hidden="true">.</span></span>
        {/* Clicking switches themes; aria-label and title describe the action. */}
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={themeLabel}
          title={themeLabel}
        >
          {/* Icons are decorative because the button already has an accessible label. */}
          <span className="theme-toggle-icons" aria-hidden="true">
            {/* Add is-active in light mode; the SVG circle and rays draw a sun. */}
            <span className={`theme-icon${!isDark ? ' is-active' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
              </svg>
            </span>
            {/* Add is-active in dark mode; the SVG path draws a crescent moon. */}
            <span className={`theme-icon${isDark ? ' is-active' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.5 13.1A8.6 8.6 0 0 1 10.9 3.5a8.6 8.6 0 1 0 9.6 9.6Z" />
              </svg>
            </span>
          </span>
          {/* The visible label names the current theme; the accessible label describes the action. */}
          <span className="theme-toggle-label" aria-hidden="true">{isDark ? 'Mørk' : 'Lys'}</span>
        </button>
      </header>
      {/* Each component manages its own feature; App.css arranges the cards in a grid. */}
      <CookieClicker />
      <CatFacts />
      <Users />
    </main>
  )
}

// Export the page component so main.jsx can render it.
export default App
