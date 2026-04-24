import { useState } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  )

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return { isDark, toggle }
}
