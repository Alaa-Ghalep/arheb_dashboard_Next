'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import {
  HiOutlineViewGrid,
  HiOutlineOfficeBuilding,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineShieldCheck
} from 'react-icons/hi'

const navItems = [
  { href: '/dashboard',          label: 'لوحة التحكم',  icon: HiOutlineViewGrid },
  { href: '/dashboard/managers',      label: 'ادارة المدراء',icon: HiOutlineShieldCheck },
  { href: '/dashboard/hotels',   label: 'الفنادق',      icon: HiOutlineOfficeBuilding },
  { href: '/dashboard/services', label: 'الخدمات',      icon: HiOutlineClipboardList },
  { href: '/dashboard/tourists', label: 'السائحون',     icon: HiOutlineUsers },
  { href: '/dashboard/guides',   label: 'المرشدون',     icon: HiOutlineUser },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-16 md:w-64 shrink-0 border-r transition-all duration-300 flex flex-col"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Logo */}
      <div
        className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b shrink-0"
        style={{ borderColor: 'var(--border-color)' }}
      >
    
        <span
          className="font-bold text-xl md:hidden"
          style={{ color: 'var(--color-primary-500)' }}
        >
          A
        </span>
       
        <span
          className=" hidden md:block"
       
        >
     

        <Link href="/dashboard" className="block">
         <div className="py-7 ms-8">
          <Image 
          src="/assets/logo.svg" 
          alt="arheb-image" 
          width={75} 
          height={75}
          priority 
        />
      </div>
    </Link>
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-2 md:p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className="flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-3 rounded-xl transition-all"
              style={
                isActive
                  ? {
                      backgroundColor: 'var(--color-primary-50)',
                      color: 'var(--color-primary-600)',
                      fontWeight: 600,
                    }
                  : { color: 'var(--text-secondary)' }
              }
              onMouseEnter={e => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = 'var(--bg-subtle)'
                  el.style.color = 'var(--text-primary)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = 'transparent'
                  el.style.color = 'var(--text-secondary)'
                }
              }}
            >
              <Icon size={22} className="shrink-0" />
              <span className="hidden md:block text-lg">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
