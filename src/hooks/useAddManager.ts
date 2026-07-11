'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ROLE_OPTIONS, type RoleKey, type ManagerRole } from'@/hooks/constants/roles'

export type AddManagerForm = {
  full_name: string
  city: string
  phone: string
  email: string
  password: string
}

const EMPTY_FORM: AddManagerForm = {
  full_name: '',
  city: '',
  phone: '',
  email: '',
  password: '',
}

type PermissionItem = {
  id: RoleKey
  name: string
  checked: boolean
}

const createEmptyPermissions = (): PermissionItem[] =>
  ROLE_OPTIONS.map((option: (typeof ROLE_OPTIONS)[number]) => ({
    id: option.key,
    name: option.label,
    checked: false,
  }))

export default function useAddManager() {
  const [formData, setFormData] = useState<AddManagerForm>(EMPTY_FORM)
  const [permissions, setPermissions] = useState<PermissionItem[]>(createEmptyPermissions)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheck = (key: RoleKey) => {
    setPermissions((prev) =>
      prev.map((item) =>
        item.id === key ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const resetForm = () => {
    setFormData(EMPTY_FORM)
    setPermissions(createEmptyPermissions())
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()

      const roleObject: ManagerRole = permissions.reduce((acc, item) => {
        acc[item.id] = item.checked
        return acc
      }, {} as ManagerRole)

      const { error: insertError } = await supabase
        .from('admin_managers')
        .insert([
          {
            ...formData,
            role: roleObject,
          },
        ])

if (insertError) {
  console.error('RAW ERROR:', JSON.stringify(insertError, null, 2))
  console.error('ERROR OBJECT DIRECTLY:', insertError)
  throw insertError
}
      setSuccess(true)
      resetForm()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع')
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    permissions,
    loading,
    error,
    success,
    setSuccess,
    handleChange,
    handleCheck,
    handleSubmit,
  }
}