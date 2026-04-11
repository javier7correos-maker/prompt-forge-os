import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, plan')
    .eq('id', user.id)
    .single()

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main
        className="app-shell-main"
        style={{
          flex: 1,
          background: 'var(--bg)',
          minHeight: '100vh',
        }}
      >
        <Header
          userName={profile?.name || user.email?.split('@')[0] || 'Usuario'}
          userPlan={profile?.plan || 'free'}
        />
        <div style={{ padding: '28px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
