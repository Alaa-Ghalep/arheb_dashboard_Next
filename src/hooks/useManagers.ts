'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ManagerRole } from '@/hooks/constants/roles'

export type Manager = {
  id: number
  full_name: string | null
  city: string | null
  role: ManagerRole | null
  phone: string | null
  email: string | null
}

export function useManagers() {
const [managers, setManagers] = useState<Manager[]>([])
const [searchQuery, setSearchQuery] = useState('')
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [deletingId, setDeletingId] = useState<number | null>(null)

const fetchManagers = async () => {
try {
setLoading(true)

  const supabase = createClient()
  const { data, error: fetchError } = await supabase
    .from('admin_managers')
    .select('*')
    .order('full_name')

  if (fetchError) throw fetchError

  setManagers((data || []) as Manager[])
  setError(null)
} catch (err: unknown) {
  setError(
    err instanceof Error ? err.message : 'حدث خطأ غير متوقع'
  )
} finally {
  setLoading(false)
}

}

const updateManagerLocally = (updated: Manager) => {
setManagers((prev) =>
prev.map((manager) =>
manager.id === updated.id ? updated : manager
)
)
}

useEffect(() => {
fetchManagers()
}, [])

const deleteManager = async (
id: number,
onSuccess?: () => void
) => {
try {
setDeletingId(id)

  const supabase = createClient()
  const { error: deleteError } = await supabase
    .from('admin_managers')
    .delete()
    .eq('id', id)

  if (deleteError) throw deleteError

  setManagers((prev) =>
    prev.filter((manager) => manager.id !== id)
  )

  onSuccess?.()
} catch (err: unknown) {
  alert(
    'خطأ في الحذف: ' +
      (err instanceof Error ? err.message : 'حدث خطأ غير متوقع')
  )
} finally {
  setDeletingId(null)
}

}

const filteredManagers = managers.filter((manager) =>
manager.full_name
?.toLowerCase()
.includes(searchQuery.toLowerCase())
)

return {
managers: filteredManagers,
totalCount: managers.length,
searchQuery,
setSearchQuery,
loading,
error,
deletingId,
deleteManager,
updateManagerLocally,
refetch: fetchManagers,
}
}