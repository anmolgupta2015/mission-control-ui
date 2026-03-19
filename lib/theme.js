export const applyTheme = (isDark) => {
  const html = document.documentElement
  if (isDark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

export const getTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  return 'dark'
}

export const setTheme = (theme) => {
  localStorage.setItem('theme', theme)
  applyTheme(theme === 'dark')
}
