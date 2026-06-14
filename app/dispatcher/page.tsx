import RequireRole from '../../components/auth/RequireRole'
import TopBar from '../../components/common/TopBar'

export default function DispatcherPage() {
  return (
    <RequireRole allowed={["dispatcher"]}>
      <div className="max-w-[430px] mx-auto min-h-screen bg-surface">
        <TopBar title="Dispatcher" />
        <main className="px-container-padding py-6">
          <h2 className="text-h2 mb-4">Dispatcher Dashboard</h2>
          <p className="text-sm text-muted-foreground">Ticket queue and assignment tools.</p>
        </main>
      </div>
    </RequireRole>
  )
}
