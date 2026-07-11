'use client'

import { useTourists } from '@/hooks/useTourists'
import { HiOutlineSearch } from 'react-icons/hi'

export default function TouristsTable() {
  const { tourists, totalCount, searchQuery, setSearchQuery, loading, error } = useTourists()

 
  if (error) {
    return (
      <div className="flex flex-col items-center py-12 gap-4">
        <p
          className="text-sm px-4 py-3 rounded-xl border text-[var(--color-primary-600)] bg-[var(--color-primary-50)] border-[var(--color-primary-200)]"
        >
          <strong>خطأ: </strong>{error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 rounded-xl text-sm font-medium transition-colors"
          style={{
            backgroundColor: 'var(--color-primary-500)',
            color:           '#fff',
          }}
        >
          إعادة المحاولة
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          قائمة السائحين
        </h1>
        <span
          className="text-sm font-medium px-3 py-1 rounded-full"
          style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-600)' }}
        >
          {searchQuery ? `${tourists.length} من ${totalCount}` : `عدد السائحين: ${totalCount}`}
        </span>
      </div>

      <div className="relative mb-5 max-w-sm">
        <HiOutlineSearch
          size={18}
          className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
          style={{ color: 'var(--text-secondary)' }}
        />
        <input
          type="text"
          placeholder="ابحث باسم السائح..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-10 pl-4 py-2 rounded-xl border text-sm outline-none transition-colors"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor:     'var(--border-color)',
            color:           'var(--text-primary)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-primary-400)')}
          onBlur={e  => (e.target.style.borderColor = 'var(--border-color)')}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-16 gap-3">
          <div
            className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--color-primary-300)', borderTopColor: 'transparent' }}
          />
          <p style={{ color: 'var(--text-secondary)' }}>جاري تحميل البيانات...</p>
        </div>
      ) : (
        <div
          className="rounded-2xl border overflow-hidden shadow-sm"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              {/* Head */}
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-subtle)' }}>
                  {['#', 'اسم السائح', 'المدينة', 'الجوال '].map((th) => (
                    <th
                      key={th}
                      className="px-5 py-3 font-semibold  text-lg tracking-wide"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tourists.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {searchQuery ? `لا توجد نتائج للبحث "${searchQuery}"` : 'لا توجد فنادق حالياً'}
                    </td>
                  </tr>
                ) : (
                  tourists.map((tourist, index) => (
                    <tr
                      key={tourist.id}
                      className="border-t transition-colors"
                      style={{
                        borderColor:     'var(--border-color)',
                        backgroundColor: 'var(--bg-surface)',
                      }}
                      onMouseEnter={e =>
                        (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')
                      }
                      onMouseLeave={e =>
                        (e.currentTarget.style.backgroundColor = 'var(--bg-surface)')
                      }
                    >
                      <td className="px-5 py-3" style={{ color: 'var(--text-secondary)' }}>
                        {index + 1}
                      </td>
                      <td className="px-5 py-3 font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {tourist.full_name || '-'}
                      </td>
                      <td className="px-5 py-3" style={{ color: 'var(--text-secondary)' }}>
                        {tourist.city || '-'}
                      </td>
                      <td className="px-5 py-3" style={{ color: 'var(--text-secondary)' }}>
                        {tourist.phone || '-'}
                      </td>
                     
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
