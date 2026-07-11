'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Guides = {
  id:           number
  guide_number: string
  full_name:     string
  city:         string
  date_of_joining :string
  num_of_requests: number
  status:string
  phone:        string
  location:string
  is_active:boolean
  hotel_id:        string | null  // UUID — مفتاح أجنبي

}

export function useGuides() {
  const [guides,        setGuides]       = useState<Guides[]>([])
  const [searchQuery,   setSearchQuery]  = useState('')
  const [loading,       setLoading]      = useState(true)
  const [error,         setError]        = useState<string | null>(null)

  useEffect(() => {
    const fetchTourists = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('guides')
          .select('*')
           .order('full_name')

        if (error) throw error
        setGuides(data || [])
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع')
      } finally {
        setLoading(false)
      }
    }

    fetchTourists()
  }, [])

 const filteredGuides = guides.filter((guide) =>
    guide.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return { guides: filteredGuides, totalCount: guides.length, searchQuery, setSearchQuery, loading, error }
}
