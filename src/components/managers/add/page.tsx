'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAddManager from '@/hooks/useAddManager'
import { HiArrowRight } from 'react-icons/hi'

export default function AddManagerPage() {
  const router = useRouter()
  const {
    formData,
    permissions,
    loading,
    error,
    success,
    setSuccess,
    handleChange,
    handleCheck,
    handleSubmit,
  } = useAddManager()

  
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success, setSuccess])

  return (
    <div style={{ color: 'var(--text-primary)' }}>

      {success && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg border"
          style={{
            backgroundColor: '#f0fdf4',
            borderColor:     '#86efac',
            minWidth:        '300px',
            animation:       'fadeInDown 0.3s ease',
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#dcfce7' }}
          >
            <span style={{ color: '#16a34a', fontSize: '18px' }}>✓</span>
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: '#15803d' }}>
              تمت العملية بنجاح
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#16a34a' }}>
              تم إضافة المدير بنجاح
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors cursor-pointer"
        style={{ color: 'var(--color-primary-600)' }}
      >
        <HiArrowRight size={18} />
        رجوع
      </button>

      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        إدارة المدراء / إضافة مدير
      </h1>

      {error && (
        <div
          className="mb-5 px-4 py-3 rounded-xl text-sm border"
          style={{
            backgroundColor: '#fee2e2',
            color:           '#dc2626',
            borderColor:     '#fecaca',
          }}
        >
          خطأ: {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                الاسم الكامل
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none transition-colors"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary-400)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                المدينة
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none transition-colors"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary-400)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

        
            <div>
              <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                الصلاحيات
              </h2>
              <div
                className="rounded-xl border p-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
                style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-color)' }}
              >
                {permissions.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheck(item.id)}
                      style={{ accentColor: 'var(--color-primary-500)' }}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

         
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                رقم الجوال
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none transition-colors"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary-400)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none transition-colors"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary-400)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none transition-colors"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary-400)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-12 py-3 rounded-xl text-white font-bold text-sm transition-opacity"
            style={{
              backgroundColor: loading ? 'var(--color-primary-300)' : 'var(--color-primary-500)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'جاري الاضافة...' : 'اضافة'}
          </button>
        </div>
      </form>
    </div>
  )
}