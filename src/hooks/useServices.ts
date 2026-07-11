'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Services = {
  id:              number
 service_name:      string
  description:         string
  price:           number
  is_available: boolean
  hotel_id: number
}

export function useServices() {
  const [services,        setServices]       = useState<Services[]>([])
  const [searchQuery,   setSearchQuery]  = useState('')
  const [loading,       setLoading]      = useState(true)
  const [error,         setError]        = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('services')
          .select('*')
           .order('service_name')

        if (error) throw error
        setServices(data || [])
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

 const filteredServices = services.filter((service) =>
    service.service_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return { services: filteredServices, totalCount: services.length, searchQuery, setSearchQuery, loading, error }
}
