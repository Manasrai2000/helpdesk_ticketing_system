import RequireRole from '../../../components/auth/RequireRole'
import TopBar from '../../../components/common/TopBar'

export default function AdminProjectsPage() {
  return (
    <RequireRole allowed={["admin"]}>
      <div className="max-w-[430px] mx-auto min-h-screen bg-surface">
        <TopBar title="Projects" />
        <main className="px-container-padding py-6">
          <h2 className="text-h2 mb-4">Projects</h2>
          <p className="text-sm text-muted-foreground">Project management UI placeholder.</p>
        </main>
      </div>
    </RequireRole>
  )
}
