const themeStorageKey = 'kjekspause-theme'

export function initializeTheme() {
  let savedTheme
  try {
    savedTheme = localStorage.getItem(themeStorageKey)
  } catch {
    // Use the system preference when browser storage is unavailable.
  }

  const theme = savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  document.documentElement.dataset.theme = theme
}

export function setStoredTheme(theme) {
  // Only explicit choices are saved; first visits follow the system preference.
  try {
    localStorage.setItem(themeStorageKey, theme)
  } catch {
    // Keep the toggle usable even if browser storage is blocked.
  }
}
