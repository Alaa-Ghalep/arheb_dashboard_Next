'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Hotel = {
  id:              number
  hotel_name:      string
  address:         string
  phone:           string
  num_of_requests: number
  date_of_joining: string
}

export function useHotels() {
  const [hotels,        setHotels]       = useState<Hotel[]>([])
  const [searchQuery,   setSearchQuery]  = useState('')
  const [loading,       setLoading]      = useState(true)
  const [error,         setError]        = useState<string | null>(null)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .order('hotel_name')

        if (error) throw error
        setHotels(data || [])
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع')
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  const filteredHotels = hotels.filter((hotel) =>
    hotel.hotel_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return { hotels: filteredHotels, totalCount: hotels.length, searchQuery, setSearchQuery, loading, error }
}
