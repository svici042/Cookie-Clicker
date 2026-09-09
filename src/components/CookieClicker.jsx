import { useState } from 'react'

function CookieClicker() {
  // score belongs to this component and starts at zero.
  const [score, setScore] = useState(0)

  function handleCookieClick() {
    // The function form safely uses the previous score value.
    setScore((currentScore) => currentScore + 1)
  }

  return (
    <section className="card cookie-card" aria-labelledby="cookie-title">
      <p className="eyebrow">En liten pause</p>
      <h1 id="cookie-title">Bare én kjeks til.</h1>
      <p className="section-description">Trykk på kjeksen. Hvert klikk gir ett poeng.</p>
      <div className="cookie-content">
        <button
          type="button"
          className="cookie-button"
          onClick={handleCookieClick}
          aria-label="Klikk på kjeksen for å få ett poeng"
        >
          <img
            className="cookie-image"
            src="/cookie-1.png"
            alt="Bilde av en kjeks"
          />
        </button>
        <p className="score" aria-live="polite" aria-atomic="true">
          <strong>{score}</strong><span>poeng</span>
        </p>
      </div>
    </section>
  )
}

export default CookieClicker
