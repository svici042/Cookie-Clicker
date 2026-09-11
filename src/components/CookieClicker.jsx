import { useState } from 'react'

function CookieClicker() {
  // score belongs to this component and starts at zero.
  const [score, setScore] = useState(0)

  function handleCookieClick() {
    // The function form safely uses the previous score value.
    setScore((currentScore) => currentScore + 1)
  }

  return (
    // card defines the shared card appearance, while cookie-card adds the cookie section's styles.
    <section className="card cookie-card" aria-labelledby="cookie-title">
      {/* The section heading and brief game instructions. */}
      <p className="eyebrow">En liten pause</p>
      <h1 id="cookie-title">Bare én kjeks til.</h1>
      <p className="section-description">Trykk på kjeksen. Hvert klikk gir ett poeng.</p>
      <div className="cookie-content">
        {/* The button works with a mouse or keyboard; onClick increases the score. */}
        <button
          type="button"
          className="cookie-button"
          onClick={handleCookieClick}
          aria-label="Klikk på kjeksen for å få ett poeng"
        >
          {/* BASE_URL adjusts the image path to the site's base address; alt describes the image as text. */}
          <img
            className="cookie-image"
            src={`${import.meta.env.BASE_URL}cookie-1.png`}
            alt="Bilde av en kjeks"
          />
        </button>
        {/* CSS distinguishes the score from its label; aria-live announces updates without interrupting speech. */}
        <p className="score" aria-live="polite" aria-atomic="true">
          <strong>{score}</strong><span>poeng</span>
        </p>
      </div>
    </section>
  )
}

export default CookieClicker
