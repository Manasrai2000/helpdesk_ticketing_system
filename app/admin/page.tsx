import RequireRole from '../../components/auth/RequireRole'
import TopBar from '../../components/common/TopBar'

export default function AdminPage() {
  return (
    <RequireRole allowed={["admin"]}>
      <div className="max-w-[430px] mx-auto min-h-screen bg-surface">
        <TopBar title="Admin" />
        <main className="px-container-padding py-6">
          <h2 className="text-h2 mb-4">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">Placeholder for admin project management and settings.</p>
        </main>
      </div>
    </RequireRole>
  )
}
