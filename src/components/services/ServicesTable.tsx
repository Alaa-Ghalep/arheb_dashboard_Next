'use client'

import { useServices } from '@/hooks/useServices'
import { HiOutlineSearch } from 'react-icons/hi'

export default function ServicesTable() {
  const { services, totalCount, searchQuery, setSearchQuery, loading, error } = useServices()

 
  if (error) {
    return (
      <div className="flex flex-col items-center py-12 gap-4">
        <p
          className="text-sm px-4 py-3 rounded-xl border"
          style={{
            color:           'var(--color-primary-600)',
            backgroundColor: 'var(--color-primary-50)',
            borderColor:     'var(--color-primary-200)',
          }}
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
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          قائمة الخدمات
        </h1>
        <span
          className="text-sm font-medium px-3 py-1 rounded-full"
          style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-600)' }}
        >
          {searchQuery ? `${services.length} من ${totalCount}` : `عدد الخدمات: ${totalCount}`}
        </span>
      </div>

      {/* Search Input */}
      <div className="relative mb-5 max-w-sm">
        <HiOutlineSearch
          size={18}
          className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
          style={{ color: 'var(--text-secondary)' }}
        />
        <input
          type="text"
          placeholder="ابحث باسم الخدمة..."
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

      {/* Loading */}
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
                  {['#', 'اسم الخدمة', 'الوصف', 'السعر ', ' التوفر'].map((th) => (
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

              {/* Body */}
              <tbody>
                {services.length === 0 ? (
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
                  services.map((service, index) => (
                    <tr
                      key={service.id}
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
                        {service.service_name || '-'}
                      </td>
                      <td className="px-5 py-3" style={{ color: 'var(--text-secondary)' }}>
                        {service.description || '-'}
                      </td>
                      <td className="px-5 py-3" style={{ color: 'var(--text-secondary)' }}>
                        {service.price || '-'}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-semibold"
                          style={
                            service.is_available
                              ? { backgroundColor: '#dcfce7', color: '#16a34a' }
                              : { backgroundColor: '#fee2e2', color: '#dc2626' }
                          }
                        >
                          {service.is_available ? 'متوفر' : 'غير متوفر'}
                        </span>
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
