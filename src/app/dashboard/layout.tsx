import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex bg-[var(--bg-base)]">
     
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main
          className="flex-1 p-4 md:p-8 bg-[var(--bg-base)]">             
          {children}
        </main>
      </div>
    </div>
  )
}
