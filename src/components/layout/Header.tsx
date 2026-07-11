'use client'

import { FiBell, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@/context/ThemeContextProvider'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between border-b transition-colors shrink-0 flex-row-reverse bg-[var(--bg-surface)] border-[var(--border-color)]">
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
 
        <button
          onClick={toggleTheme}
          className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-colors"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-secondary)',
          }}
          aria-label="تبديل الثيم"
        >
          {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>

       
        <button
          className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-colors bg-[var(--bg-subtle)] text-[var(--text-secondary)]"       
          aria-label="الإشعارات">
          <FiBell size={17} />
        </button>        
      </div>
    </header>
  )
}
