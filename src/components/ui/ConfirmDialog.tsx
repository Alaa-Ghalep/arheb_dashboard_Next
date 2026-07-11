'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import '@/styles/alert.css'

type Props = {
  show:      boolean
  isExiting: boolean
  message:   string
  onConfirm: () => void
  onCancel:  () => void
}

export default function ConfirmDialog({ show, isExiting, message, onConfirm, onCancel }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!show || !mounted) return null

  return createPortal(
  <div
  className="fixed inset-0 z-[9999] bg-black/45 grid place-items-center"
  onClick={onCancel}
>
     <div
  className={`rounded-2xl shadow-xl p-6 flex flex-col gap-4 w-80 dir-rtl ${isExiting ? 'alert-exit' : 'alert-enter'}`}
  style={{
    backgroundColor: 'var(--bg-surface)',
  }}
  onClick={e => e.stopPropagation()}
>
       
        <div className="flex justify-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#fef2f2' }}
          >
            <span style={{ fontSize: '28px' }}>🗑️</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
            تأكيد الحذف
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl text-sm font-medium border transition-colors"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: '#ef4444' }}
          >
            حذف
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}