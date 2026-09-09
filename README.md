# React Hooks Oppgave

Et enkelt React-prosjekt som demonstrerer `useState` og `useEffect`.

Nettside: https://svici042.github.io/Cookie-Clicker/

Prosjektet inneholder tre komponenter:

- `CookieClicker` teller poeng når du klikker på en kjeks.
- `CatFacts` henter fem kattefakta fra catfact.ninja og viser én tilfeldig fakta om gangen.
- `Users` viser brukere og lar deg legge til nye brukere i React-state.

## Kom i gang

```bash
npm install
npm run dev
```

Cookie Clicker bruker det medfølgende bildet `public/cookie-1.png`.

## Publisering

GitHub Actions kjører lint og bygger prosjektet før `dist/` publiseres til GitHub
Pages ved hver push til `main`. Vite bruker `/Cookie-Clicker/` som basebane.

## Personvern

Brukerlisten inneholder eksempeldata fra oppgaven. Nye navn og e-postadresser finnes bare
i React-state i den åpne siden, sendes ikke til en server og forsvinner ved lasting
av siden på nytt.

Kattefakta hentes fra catfact.ninja uten informasjonskapsler eller Referer-header.
Tjenesten mottar fortsatt IP-adressen og vanlig nettverksinformasjon ved forespørselen.
