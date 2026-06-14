"use client"
import React, { useState } from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import TopBar from '../../../components/common/TopBar'
import { Search, ClipboardList, Clock, Wrench, Grid, RotateCw, Home, AlertTriangle, Plus, ArrowRight, Pause } from 'lucide-react'
import BottomNav from '../../../components/common/BottomNav'

export default function TechnicianTasksPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeTask, setActiveTask] = useState<{ id: string; title: string; location: string; status: string } | null>(null)

  return (
    <RequireRole allowed={["technician"]}>
      <div className="max-w-[430px] mx-auto min-h-screen bg-surface">
        <TopBar title="Tasks" />

        <main className="px-container-padding py-6">
          <h2 className="font-h1 text-h1 mb-4">My Tasks</h2>

          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-3 text-on-surface-variant" />
            <input
              className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-body-sm"
              placeholder="Search task ID or location..."
              type="text"
            />
          </div>

          <div className="mb-6">
            <div className="bg-surface-container flex p-1 rounded-xl relative overflow-hidden">
              <button onClick={() => setActiveTab(0)} className={`relative z-10 flex-1 py-2 text-label-md ${activeTab===0? 'text-primary font-semibold':'text-on-surface-variant font-medium'} transition-colors`}>Assigned</button>
              <button onClick={() => setActiveTab(1)} className={`relative z-10 flex-1 py-2 text-label-md ${activeTab===1? 'text-primary font-semibold':'text-on-surface-variant font-medium'} transition-colors`}>In Progress</button>
              <button onClick={() => setActiveTab(2)} className={`relative z-10 flex-1 py-2 text-label-md ${activeTab===2? 'text-primary font-semibold':'text-on-surface-variant font-medium'} transition-colors`}>Completed</button>
              <div id="tab-highlight" className="absolute top-1 bottom-1 left-1 w-[32.5%] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-out" style={{ transform: `translateX(${activeTab * 100}%)` }} />
            </div>
          </div>

          <div className="flex flex-col gap-card-gap">
            <article className="task-card bg-white border border-outline-variant rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono-sm text-mono-sm text-on-surface-variant">#FC-8291</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-error-container text-on-error-container">High</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mb-1">Clogged Main Drain</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">Building B, Room 402 • John Smith</p>
              <div className="flex items-center justify-between border-t border-outline-variant pt-3">
                <div className="flex items-center gap-2">
                  <Wrench size={18} className="text-primary" />
                  <span className="text-label-sm font-medium text-on-surface-variant">Plumbing</span>
                </div>
                <div className="flex items-center gap-1 text-error">
                  <Clock size={16} />
                  <span className="text-label-sm font-semibold">Due in 45m</span>
                </div>
              </div>
            </article>

            <article className="task-card bg-white border border-outline-variant rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono-sm text-mono-sm text-on-surface-variant">#FC-8304</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-secondary-container text-on-secondary-container">Medium</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mb-1">HVAC Maintenance</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">Lobby East Wing • Facilities Manager</p>
              <div className="flex items-center justify-between border-t border-outline-variant pt-3">
                <div className="flex items-center gap-2">
                  <Grid size={18} className="text-primary" />
                  <span className="text-label-sm font-medium text-on-surface-variant">HVAC</span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <Clock size={16} />
                  <span className="text-label-sm">Due Today</span>
                </div>
              </div>
            </article>

            <article className="task-card bg-white border border-primary/20 rounded-xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              <div className="flex justify-between items-start mb-3 pl-2">
                <span className="font-mono-sm text-mono-sm text-on-surface-variant">#FC-7992</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-surface-container-highest text-on-surface">Low</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mb-1 pl-2">Replace LED Ballasts</h3>
              <p className="text-body-sm text-on-surface-variant mb-4 pl-2">Floor 12, Suite 1205 • Sarah Connor</p>
              <div className="flex items-center justify-between border-t border-outline-variant pt-3 pl-2">
                <div className="flex items-center gap-2">
                  <Grid size={18} className="text-primary" />
                  <span className="text-label-sm font-medium text-on-surface-variant">Electrical</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <RotateCw size={16} />
                  <span className="text-label-sm font-bold">1h 12m active</span>
                </div>
              </div>
            </article>

            <article className="task-card bg-white border border-outline-variant rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono-sm text-mono-sm text-on-surface-variant">#FC-8441</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-error-container text-on-error-container">High</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mb-1">Server Room Leak</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">Building A, IT Hub • Mark Davis</p>
              <div className="flex items-center justify-between border-t border-outline-variant pt-3">
                <div className="flex items-center gap-2">
                  <Home size={18} className="text-primary" />
                  <span className="text-label-sm font-medium text-on-surface-variant">Emergency</span>
                </div>
                <div className="flex items-center gap-1 text-error">
                  <AlertTriangle size={16} />
                  <span className="text-label-sm font-bold">Immediate</span>
                </div>
              </div>
            </article>
          </div>
        </main>

        {activeTask && (
          <div className="fixed left-4 right-24 bottom-32 z-40 max-w-[430px] mx-auto">
            <div className="bg-primary-container border border-primary/20 rounded-lg p-3 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-start gap-3">
                <div className="flex flex-col">
                  <span className="text-label-sm text-on-surface-variant">{activeTask.id}</span>
                  <span className="font-medium text-on-primary">{activeTask.title}</span>
                  <span className="text-[11px] text-on-primary/80">{activeTask.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTask(null)} className="px-3 py-2 rounded-md bg-transparent border border-outline-variant text-on-primary">End</button>
                <button className="p-2 rounded-md bg-white/10 text-on-primary">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <BottomNav active="tasks" />

        {/* FAB (kept) */}
        <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-95 duration-150 transition-all z-40">
          <Plus size={28} />
        </button>
      </div>
    </RequireRole>
  )
}
