import { createClient } from '@/lib/supabase/server'
import {
  HiOutlineOfficeBuilding,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineShieldCheck,
} from 'react-icons/hi'

import StatusBarCharts from './StatusBarCharts' ;
import { ROLE_OPTIONS } from '@/hooks/constants/roles'; 
export default async function StatusBar() {
  const supabase = await createClient()

  const [
    { count: managersCount },
    { count: hotelsCount },
    { count: servicesCount },
    { count: touristsCount },
    { count: guidesCount },
  ] = await Promise.all([
    supabase.from('admin_managers').select('*',   { count: 'exact', head: true }),
    supabase.from('hotels').select('*',   { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('tourists').select('*', { count: 'exact', head: true }),
    supabase.from('guides').select('*',   { count: 'exact', head: true }),
  ])



  const stats = [
    {
      label: 'إجمالي المدراء',
      value: managersCount  ?? 0,
      icon:  HiOutlineShieldCheck,
    },
    {
      label: 'إجمالي الفنادق',
      value: hotelsCount  ?? 0,
      icon:  HiOutlineOfficeBuilding,
    },
    {
      label: 'إجمالي الخدمات',
      value: servicesCount ?? 0,
      icon:  HiOutlineClipboardList,
    },
    {
      label: 'إجمالي السائحين',
      value: touristsCount ?? 0,
      icon:  HiOutlineUsers,
    },
    {
      label: 'إجمالي المرشدين',
      value: guidesCount  ?? 0,
      icon:  HiOutlineUser,
    },
  ]
 const chartData = stats.map(({ label, value }) => ({
    name: label.replace('إجمالي ', ''),
    total: value,
  }))



 const { data: managers } = await supabase
  .from('admin_managers')
  .select('role')

const roleCounts: Record<string, number> = {}

;(managers ?? []).forEach((manager) => {
  const role = manager.role as Record<string, boolean> | null
  if (!role) return

  Object.entries(role).forEach(([key, value]) => {
    if (value === true) {
      roleCounts[key] = (roleCounts[key] ?? 0) + 1
    }
  })
})




const roleLabels: Record<string, string> = Object.fromEntries(
  ROLE_OPTIONS.map(({ key, label }) => [key, label])
)

const RolesChartData = Object.entries(roleCounts).map(([key, total]) => ({
  name: roleLabels[key] ?? key,
  total,
}))


  return (
    <div>
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: 'var(--text-primary)' }}
      >
        الإحصائيات
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl p-6 shadow-sm border transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor:     'var(--border-color)',
            }}
          >
          
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-primary-50)' }}
              >
                <Icon size={22} style={{ color: 'var(--color-primary-500)' }} />
              </div>
              <p
                className="text-lg font-larg"
                style={{ color: 'var(--text-secondary)' }}
              >
                {label}
              </p>
            </div>

            
            <p
              className="text-3xl font-bold"
              style={{ color: 'var(--color-primary-500)' }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
        <StatusBarCharts data={chartData} subtitle={'الإحصائيات'}/>
        <StatusBarCharts data={RolesChartData} subtitle={' توزيع صلاحيات المدراء'}/>
    </div>
  )
}
