'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
HiOutlineSearch,
HiOutlinePencil,
HiOutlineTrash,
} from 'react-icons/hi'
import { useManagers } from '@/hooks/useManagers'
import { ROLE_OPTIONS } from '@/hooks/constants/roles'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import EditManagerDialog from '@/components/ui/EditManagerDialog'
import SuccessAlert from '@/components/ui/SuccessAlert'
import useSuccessAlert from '@/hooks/useSuccessAlert'

export default function ManagersTable() {
const {
managers,
totalCount,
searchQuery,
setSearchQuery,
loading,
error,
deletingId,
deleteManager,
updateManagerLocally,
} = useManagers()

const [confirmId, setConfirmId] = useState<number | null>(null)
const [isExitingDl, setIsExitingDl] = useState(false)
const [selectedManagerId, setSelectedManagerId] = useState<number | null>(null)
const [showEdit, setShowEdit] = useState(false)
const [isExitingED] = useState(false)

const { show, isExiting, showAlert, hideAlert } = useSuccessAlert()

const openConfirm = (id: number) => {
setConfirmId(id)
setIsExitingDl(false)
}

const closeConfirm = () => {
setIsExitingDl(true)

setTimeout(() => {
  setConfirmId(null)
  setIsExitingDl(false)
}, 400)

}

const handleDelete = () => {
if (!confirmId) return

deleteManager(confirmId, () => {
  showAlert()
})

closeConfirm()

}

const handleEditClick = (id: number) => {
setSelectedManagerId(id)
setShowEdit(true)
}

const handleCloseEdit = () => {
setShowEdit(false)
setSelectedManagerId(null)
}

const getRoleLabel = (key: string) => {
return ROLE_OPTIONS.find((role) => role.key === key)?.label || key
}

if (error) {
return (
<div className="flex flex-col items-center py-12 gap-4">
<p
className="text-sm px-4 py-3 rounded-xl border"
style={{
color: 'var(--color-primary-600)',
backgroundColor: 'var(--color-primary-50)',
borderColor: 'var(--color-primary-200)',
}}
>
<strong>خطأ: </strong>
{error}
</p>

    <button
      onClick={() => window.location.reload()}
      className="px-5 py-2 rounded-xl text-sm font-medium transition-colors"
      style={{
        backgroundColor: 'var(--color-primary-500)',
        color: '#fff',
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
<h1
className="text-2xl font-bold"
style={{ color: 'var(--text-primary)' }}
>
ادارة مدير التطبيق
</h1>

    <div className="flex items-center gap-3">
      <span
        className="text-sm font-medium px-3 py-1 rounded-full"
        style={{
          backgroundColor: 'var(--color-primary-50)',
          color: 'var(--color-primary-600)',
        }}
      >
        {searchQuery
          ? `${managers.length} من ${totalCount}`
          : `عدد المدراء: ${totalCount}`}
      </span>

      <Link
        href="/dashboard/managers/add"
        className="px-5 py-2 rounded-xl text-sm font-medium transition-colors"
        style={{
          backgroundColor: 'var(--color-primary-500)',
          color: '#fff',
        }}
      >
        اضافة مدير
      </Link>
    </div>
  </div>

  <div className="relative mb-5 max-w-sm">
    <HiOutlineSearch
      size={18}
      className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
      style={{ color: 'var(--text-secondary)' }}
    />

    <input
      type="text"
      placeholder="ابحث باسم المدير..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pr-10 pl-4 py-2 rounded-xl border text-sm outline-none transition-colors"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = 'var(--color-primary-400)'
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'var(--border-color)'
      }}
    />
  </div>

  {loading ? (
    <div className="flex flex-col items-center py-16 gap-3">
      <div
        className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
        style={{
          borderColor: 'var(--color-primary-300)',
          borderTopColor: 'transparent',
        }}
      />
      <p style={{ color: 'var(--text-secondary)' }}>
        جاري تحميل البيانات...
      </p>
    </div>
  ) : (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-subtle)' }}>
              {[
                'اسم المستخدم',
                'المدينة',
                'الصلاحيات',
                'رقم الجوال',
                'البريد الالكتروني',
                'تعديل',
                'حذف',
              ].map((title) => (
                <th
                  key={title}
                  className="px-5 py-3 font-semibold text-lg tracking-wide"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {managers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {searchQuery
                    ? `لا توجد نتائج للبحث "${searchQuery}"`
                    : 'لا يوجد مدراء حالياً'}
                </td>
              </tr>
            ) : (
              managers.map((manager) => {
                const activeRoles = Object.entries(manager.role || {})
                  .filter(([, value]) => value === true)
                  .map(([key]) => key)

                return (
                  <tr
                    key={manager.id}
                    className="border-t transition-colors"
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--bg-surface)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        'var(--bg-subtle)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        'var(--bg-surface)'
                    }}
                  >
                    <td
                      className="px-5 py-3 font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {manager.full_name || '-'}
                    </td>

                    <td
                      className="px-5 py-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {manager.city || '-'}
                    </td>

                    <td className="px-5 py-3">
                      {activeRoles.length > 0 ? (
                        activeRoles.map((roleKey) => (
                          <span
                            key={roleKey}
                            className="inline-block px-2 py-1 rounded-full text-xs font-semibold me-1 mb-1"
                            style={{
                              backgroundColor: 'var(--color-primary-50)',
                              color: 'var(--color-primary-600)',
                            }}
                          >
                            {getRoleLabel(roleKey)}
                          </span>
                        ))
                      ) : (
                        <span
                          className="inline-block px-2 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: 'var(--bg-subtle)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          لا توجد صلاحيات
                        </span>
                      )}
                    </td>

                    <td
                      className="px-5 py-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {manager.phone || '-'}
                    </td>

                    <td
                      className="px-5 py-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {manager.email || '-'}
                    </td>

                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleEditClick(manager.id)}
                        aria-label="تعديل المدير"
                      >
                        <HiOutlinePencil
                          size={20}
                          style={{
                            color: 'var(--color-primary-500)',
                            cursor: 'pointer',
                          }}
                        />
                      </button>
                    </td>

                    <td className="px-5 py-3">
                      <button
                        onClick={() => openConfirm(manager.id)}
                        disabled={deletingId === manager.id}
                        className="disabled:opacity-50"
                        aria-label="حذف المدير"
                      >
                        <HiOutlineTrash
                          size={20}
                          style={{
                            color: 'var(--color-primary-500)',
                            cursor: 'pointer',
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )}

  <EditManagerDialog
    show={showEdit}
    isExiting={isExitingED}
    managerId={selectedManagerId}
    onClose={handleCloseEdit}
    onSaved={updateManagerLocally}
  />

  <ConfirmDialog
    show={!!confirmId}
    isExiting={isExitingDl}
    message="هل أنت متأكد من حذف هذا المدير؟ لا يمكن التراجع عن هذا الإجراء."
    onConfirm={handleDelete}
    onCancel={closeConfirm}
  />

  <SuccessAlert
    show={show}
    isExiting={isExiting}
    message="تمت العملية بنجاح"
    subMessage="تم حذف المدير بنجاح"
    onClose={hideAlert}
  />
</div>

)
}