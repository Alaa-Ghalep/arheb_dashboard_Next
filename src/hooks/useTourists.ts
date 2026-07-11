'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Tourists = {
  id:           number
 full_name:     string
  city:         string
  phone:        string

}

export function useTourists() {
  const [tourists,        setTourists]       = useState<Tourists[]>([])
  const [searchQuery,   setSearchQuery]  = useState('')
  const [loading,       setLoading]      = useState(true)
  const [error,         setError]        = useState<string | null>(null)

  useEffect(() => {
    const fetchTourists = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('tourists')
          .select('*')
           .order('full_name')

        if (error) throw error
        setTourists(data || [])
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع')
      } finally {
        setLoading(false)
      }
    }

    fetchTourists()
  }, [])

 const filteredTourists = tourists.filter((tourist) =>
    tourist.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return { tourists: filteredTourists, totalCount: tourists.length, searchQuery, setSearchQuery, loading, error }
}
