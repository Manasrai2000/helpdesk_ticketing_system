import React from 'react'
import TopBar from '../../../components/common/TopBar'
import BottomNav from '../../../components/common/BottomNav'
import RequireRole from '../../../components/auth/RequireRole'
import { MapPin, Ticket, CheckCircle, Bolt, Wrench, Wind, Snowflake, Droplet, Brush, MoreHorizontal, QrCode } from 'lucide-react'

function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center overflow-x-hidden">
      <TopBar title="FacilityConnect" />
      <main className="w-full max-w-[430px] px-container-padding pt-6 pb-32 flex flex-col gap-6">
        <section className="flex flex-col gap-1">
          <p className="text-label-md font-label-md text-secondary">Monday, Oct 24</p>
          <h2 className="text-h1 font-h1 text-primary">Welcome, Alex!</h2>
        </section>

        <div className="shadcn-card p-5 relative overflow-hidden group rounded-xl border border-surface-2 bg-white">
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={20} className="text-primary" />
              <span className="text-label-sm font-label-sm uppercase tracking-wider text-secondary">Current Location</span>
            </div>
            <h3 className="text-h2 font-h2 text-primary">Room 402, Building B</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">Status: Occupied • High Priority Access</p>
          </div>
        </div>

        <section className="grid grid-cols-2 gap-card-gap">
          <div className="shadcn-card p-4 flex flex-col gap-2 rounded-xl bg-white border border-surface-2">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
              <Ticket size={18} className="text-on-primary-container" />
            </div>
            <div>
              <p className="text-label-sm text-secondary">Active Tickets</p>
              <p className="text-h1 font-h1 text-primary">3</p>
            </div>
          </div>
          <div className="shadcn-card p-4 flex flex-col gap-2 rounded-xl bg-white border border-surface-2">
            <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center">
              <CheckCircle size={18} className="text-on-secondary-container" />
            </div>
            <div>
              <p className="text-label-sm text-secondary">Closed Tickets</p>
              <p className="text-h1 font-h1 text-primary">12</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h3 font-h3 text-primary">Quick Actions</h3>
            <button className="text-label-sm font-label-md text-primary hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <button className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-white border border-surface-2">
                <Bolt size={20} />
              </div>
              <span className="text-label-sm text-center text-on-surface-variant">Electrical</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-white border border-surface-2">
                <Wrench size={20} />
              </div>
              <span className="text-label-sm text-center text-on-surface-variant">Plumbing</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-white border border-surface-2">
                <Wind size={20} />
              </div>
              <span className="text-label-sm text-center text-on-surface-variant">Fan Issue</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-white border border-surface-2">
                <Snowflake size={20} />
              </div>
              <span className="text-label-sm text-center text-on-surface-variant">AC Issue</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-white border border-surface-2">
                <Droplet size={20} />
              </div>
              <span className="text-label-sm text-center text-on-surface-variant">Leakage</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-white border border-surface-2">
                <Brush size={20} />
              </div>
              <span className="text-label-sm text-center text-on-surface-variant">Cleaning</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-white border border-surface-2">
                <MoreHorizontal size={20} />
              </div>
              <span className="text-label-sm text-center text-on-surface-variant">Other</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-black text-white">
                <QrCode size={20} />
              </div>
              <span className="text-label-sm text-center text-primary font-semibold">Scan QR</span>
            </button>
          </div>

          <h3 className="text-h3 font-h3 text-primary mt-6 mb-4">Recent Status</h3>
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-white shadcn-card p-4 flex items-center justify-between" style={{ borderLeft: '4px solid #ef4444' }}>
              <div>
                <p className="text-body-md font-medium">AC Repair Requested</p>
                <p className="text-body-sm text-on-surface-variant mt-1">Room 402 • Just now</p>
              </div>
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">PENDING</span>
              </div>
            </div>

            <div className="rounded-xl bg-white shadcn-card p-4 flex items-center justify-between">
              <div>
                <p className="text-body-md font-medium">Light bulb replaced</p>
                <p className="text-body-sm text-on-surface-variant mt-1">Lobby • 2h ago</p>
              </div>
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">DONE</span>
              </div>
            </div>
          </div>
        </section>

      </main>
      <BottomNav active="home" />
    </div>
  )
}

// wrap page export with RequireRole by rendering inside it
export default function DashboardRoute() {
  return (
    <RequireRole allowed={["customer"]}>
      <DashboardPage />
    </RequireRole>
  )
}
