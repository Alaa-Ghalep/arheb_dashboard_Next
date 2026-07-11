'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createClient } from '@/lib/supabase/client'
import {
  ROLE_OPTIONS,
  type ManagerRole,
  type RoleKey,
} from '@/hooks/constants/roles'
import type { Manager } from '@/hooks/useManagers'
import '@/styles/alert.css'

type Props = {
  show: boolean
  isExiting: boolean
  managerId: number | null
  onClose: () => void
  onSaved: (updated: Manager) => void
}

const EMPTY_ROLE: ManagerRole = {
  manage_managers: false,
  manage_services: false,
  manage_guides: false,
  manage_tourists: false,
  manage_cars: false,
  manage_bookings: false,
  view_reports: false,
  system_settings: false,
}

const EMPTY_MANAGER: Manager = {
  id: 0,
  full_name: '',
  city: '',
  role: EMPTY_ROLE,
  phone: '',
  email: '',
}

export default function EditManagerDialog({
  show,
  isExiting,
  managerId,
  onClose,
  onSaved,
}: Props) {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<Manager>(EMPTY_MANAGER)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!show || !managerId) return

    const fetchManager = async () => {
      setLoading(true)
      setError(null)

      const supabase = createClient()
      const { data, error: fetchError } = await supabase
        .from('admin_managers')
        .select('*')
        .eq('id', managerId)
        .single()

      if (fetchError) {
        setError('فشل جلب بيانات المدير')
        console.error(fetchError)
      } else if (data) {
        setForm({
          id: data.id,
          full_name: data.full_name ?? '',
          city: data.city ?? '',
          phone: data.phone ?? '',
          email: data.email ?? '',
          role: {
            ...EMPTY_ROLE,
            ...(data.role || {}),
          },
        })
      }

      setLoading(false)
    }

    fetchManager()
  }, [show, managerId])

  if (!show || !mounted) return null

  const handleChange = (
    field: 'full_name' | 'city' | 'phone' | 'email',
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRoleToggle = (key: RoleKey) => {
    setForm((prev) => ({
      ...prev,
      role: {
        ...prev.role,
        [key]: !prev.role?.[key],
      },
    }))
  }

  const handleSubmit = async () => {
    if (!managerId) return

    setSaving(true)
    setError(null)

    const supabase = createClient()
    const { data, error: updateError } = await supabase
      .from('admin_managers')
      .update({
        full_name: form.full_name,
        city: form.city,
        phone: form.phone,
        email: form.email,
        role: form.role,
      })
      .eq('id', managerId)
      .select()
      .single()

    if (updateError) {
      setError('فشل حفظ التعديلات')
      console.error(updateError)
      setSaving(false)
      return
    }

    onSaved(data as Manager)
    setSaving(false)
    onClose()
  }

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'grid',
        placeItems: 'center',
      }}
      onClick={onClose}
    >
      <div
        className={`custom-dialog-scroll rounded-2xl shadow-xl p-5 flex flex-col gap-3 w-[92vw] sm:w-[460px] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto ${
          isExiting ? 'alert-exit' : 'alert-enter'
        }`}
        style={{
          backgroundColor: 'var(--bg-surface)',
          direction: 'rtl',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <p
            className="font-bold text-base"
            style={{ color: 'var(--text-primary)' }}
          >
            تعديل بيانات المدير
          </p>
        </div>

        {loading && (
          <p
            className="text-sm text-center"
            style={{ color: 'var(--text-secondary)' }}
          >
            جاري تحميل البيانات...
          </p>
        )}

        {error && (
          <p
            className="text-sm text-center"
            style={{ color: '#ef4444' }}
          >
            {error}
          </p>
        )}

        {!loading && (
          <div className="flex flex-col gap-3">
            <div>
              <label
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                الاسم الكامل
              </label>
              <input
                type="text"
                value={form.full_name || ''} 
                onChange={(e) => handleChange('full_name', e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm outline-none"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                المدينة
              </label>
              <input
                type="text"
                value={form.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm outline-none"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={form.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm outline-none"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={form.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm outline-none"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                الصلاحيات
              </label>

              <div className="flex flex-col gap-2 mt-1">
                {ROLE_OPTIONS.map((option) => (
                  <div
                    key={option.key}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id={`edit-role-${option.key}`}
                      checked={!!form.role?.[option.key]}
                      onChange={() => handleRoleToggle(option.key)}
                    />
                    <label
                      htmlFor={`edit-role-${option.key}`}
                      className="text-sm"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-1">
          <button
            onClick={onClose}
            disabled={saving}
            className="cursor-pointer flex-1 py-2 rounded-xl text-sm font-medium border transition-colors"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            إلغاء
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || saving}
            className="cursor-pointer flex-1 py-2 rounded-xl text-sm font-medium text-white transition-colors disabled:opacity-60"
            style={{
              backgroundColor: 'var(--color-primary-900)',
            }}
          >
            {saving ? 'جاري الحفظ...' : 'حفظ'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}