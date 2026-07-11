
'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type ChartData = { name: string; total: number }

 export default function StatsBarChart({ data, subtitle }: { data: ChartData[], subtitle?: string }) {
  
return (
    <div
      className="rounded-2xl p-6 shadow-sm border transition-colors mt-6"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
    >
        {subtitle && (
      <p
        className="text-lg font-larg mb-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        {subtitle}
      </p>)}

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 13 }} />
            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 13 }}  width={50} tickMargin={18} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
                borderRadius: 8,
              }}
              labelStyle={{ color: 'var(--text-primary)' }}
            />
            <Bar dataKey="total" fill="var(--color-primary-500)" radius={[8, 8, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}