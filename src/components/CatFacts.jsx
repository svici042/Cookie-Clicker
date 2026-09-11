import { useEffect, useState } from "react";

function CatFacts() {
  // State stores API data and the status shown in the interface.
  const [facts, setFacts] = useState([]);
  const [currentFact, setCurrentFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    // [] ties fetching to mounting; StrictMode also checks cleanup in development.
    async function getCatFacts() {
      try {
        setLoading(true);
        setError("");
        // Fetch public facts without cookies or a Referer header; no form data is sent.
        const response = await fetch("https://catfact.ninja/facts?limit=5", {
          signal: controller.signal,
          credentials: "omit",
          referrerPolicy: "no-referrer",
        });

        if (!response.ok) {
          throw new Error("Kunne ikke hente kattefakta.");
        }

        const data = await response.json();
        // Treat the external response as untrusted and verify its expected shape.
        if (!Array.isArray(data?.data)) {
          throw new Error("Ugyldig svar fra tjenesten.");
        }

        // Map the API objects to strings before choosing a single fact.
        const factStrings = data.data
          .map((item) =>
            typeof item?.fact === "string" ? item.fact.trim() : "",
          )
          .filter((fact) => fact.length > 0);

        if (factStrings.length === 0) {
          throw new Error("Ingen kattefakta tilgjengelig.");
        }

        if (!controller.signal.aborted) {
          setFacts(factStrings);
          setCurrentFact(
            factStrings[Math.floor(Math.random() * factStrings.length)],
          );
        }
      } catch {
        if (!controller.signal.aborted) {
          setError(
            "Beklager, vi kunne ikke hente kattefakta akkurat nå. Prøv å laste siden på nytt.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getCatFacts();
    // Cancel an unfinished request when unmounting so it cannot update stale state.
    return () => controller.abort();
  }, []);

  const hasAnotherFact = facts.some((fact) => fact !== currentFact);

  function showRandomFact() {
    // Exclude matching text so duplicate API entries cannot repeat the current fact.
    const otherFacts = facts.filter((fact) => fact !== currentFact);
    if (otherFacts.length > 0) {
      setCurrentFact(otherFacts[Math.floor(Math.random() * otherFacts.length)]);
    }
  }

  return (
    // CSS classes style the card, while aria-labelledby connects the section to its heading.
    <section className="card facts-card" aria-labelledby="facts-title">
      {/* Introductory text, a heading, and a section description. */}
      <p className="eyebrow">
        For nysgjerrige hoder <span aria-hidden="true"></span>
      </p>
      <h2 id="facts-title">Kattefakta</h2>
      <p className="section-description">Små fakta om store personligheter.</p>
      {/* A status message appears while the data is loading. */}
      {loading && (
        <p className="message" role="status">
          Henter en liten kattefakta …
        </p>
      )}
      {/* An error message appears if the request fails; alert announces it to screen readers. */}
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      {/* The fact and controls appear after loading without an error; the fragment adds no HTML element. */}
      {!loading && !error && (
        <>
          {/* The updated fact is announced in full; the large quotation mark is decorative. */}
          <div className="fact-display" aria-live="polite" aria-atomic="true">
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            {/* React renders the API value as text, without interpreting it as HTML. */}
            <p className="fact-text" key={currentFact} lang="en">
              {currentFact}
            </p>
          </div>
          {/* The footer contains the source and a button for choosing another fact. */}
          <div className="fact-footer">
            <p className="source-note">Fra catfact.ninja · Fakta på engelsk</p>
            {/* disabled turns off the button when no different fact is available. */}
            <button
              className="action-button"
              type="button"
              onClick={showRandomFact}
              disabled={!hasAnotherFact}
            >
              Vis nytt kattefakta <span aria-hidden="true">↗</span>
            </button>
            {/* An explanation appears when there is no other fact to choose. */}
            {!hasAnotherFact && (
              <p className="source-note">
                Dette er den eneste tilgjengelige faktaen.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default CatFacts;
