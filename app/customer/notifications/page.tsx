import React from 'react'
import TopBar from '../../../components/common/TopBar'
import BottomNav from '../../../components/common/BottomNav'
import RequireRole from '../../../components/auth/RequireRole'
import { User } from 'lucide-react'

function NotificationsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-surface text-on-surface font-body-lg overflow-x-hidden">
      <TopBar title="Notifications" />
      <main className="max-w-[430px] mx-auto px-container-padding pt-6 pb-32 min-h-screen w-full">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          <button className="px-4 py-2 bg-primary text-on-primary rounded-full font-label-md text-label-md whitespace-nowrap shadow-sm">All</button>
          <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant text-secondary rounded-full font-label-md text-label-md whitespace-nowrap">Tickets</button>
          <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant text-secondary rounded-full font-label-md text-label-md whitespace-nowrap">Team</button>
          <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant text-secondary rounded-full font-label-md text-label-md whitespace-nowrap">Alerts</button>
        </div>

        <section className="mb-8">
          <h2 className="font-label-sm text-label-sm uppercase tracking-widest text-outline mb-4 px-1">Today</h2>
          <div className="space-y-card-gap">
            <div className="notification-card bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex gap-4 items-start shadow-sm">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-on-secondary-fixed" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-h3 text-body-lg text-primary leading-tight">Ticket #FC-8291 Assigned to John Doe</p>
                  <span className="font-label-sm text-label-sm text-outline">10m ago</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary">A new HVAC maintenance ticket has been delegated to your primary technician.</p>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm">View Ticket</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BottomNav active="notifications" />
    </div>
  )
}

export default function NotificationsRoute() {
  return (
    <RequireRole allowed={["customer"]}>
      <NotificationsPage />
    </RequireRole>
  )
}
