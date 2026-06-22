"use client"
import React, { useState } from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import BottomNav from '../../../components/common/BottomNav'
import { 
  PlayCircle, 
  AlertCircle, 
  ArrowLeftRight, 
  CheckCircle2, 
  Image as ImageIcon, 
  Search 
} from 'lucide-react'

const ACTIVITIES_TODAY = [
  {
    id: 1,
    type: "start",
    actor: "Alex Rivera",
    action: "started work on",
    ticketId: "#FC-8291",
    time: "2m ago",
    details: "HVAC Maintenance • West Wing Floor 2",
    icon: PlayCircle,
    iconColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/30"
  },
  {
    id: 2,
    type: "new",
    action: "New ticket",
    ticketId: "#FC-9012",
    raisedBy: "Room 402",
    time: "14m ago",
    details: "Water leak reported near main panel.",
    priority: "Urgent",
    icon: AlertCircle,
    iconColor: "text-red-600 bg-red-50 dark:bg-red-950/30"
  },
  {
    id: 3,
    type: "reassign",
    action: "Assignment changed for",
    ticketId: "#FC-8304",
    time: "45m ago",
    details: "Reassigned from Marcus to Sarah (Shift Overlap)",
    icon: ArrowLeftRight,
    iconColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/30"
  }
]

const ACTIVITIES_YESTERDAY = [
  {
    id: 4,
    type: "close",
    actor: "Sarah Chen",
    action: "closed",
    ticketId: "#FC-8100",
    time: "18h ago",
    details: "Lighting fixture replacement completed in Lobby B.",
    icon: CheckCircle2,
    iconColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
  },
  {
    id: 5,
    type: "photo",
    action: "Photo update added to",
    ticketId: "#FC-8222",
    time: "20h ago",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5Im18RtFT4kz-K6QfpUWp9ADA9RZakGARXddrPiZiFKx-53qC7jFg3uSEs5yv8XkHuNbnm7j0MUIFhgjv0a2IymLdE-cYU9JyRuTwFLXh2TAMZR10eWtFMWe6iQBwSAfwAck-2H2NRkrU_JY0Z9Xy8r1yxM0XXiVUJv8osGvS_tV06G-4OdVVJN7xmH2SoQzm8og4iPvwcRtGfPJxPXipJ_smid6RirKGM9CDZ5CCteGwfYLRDGhUcF410271AYroDI_yro_QhsM",
    icon: ImageIcon,
    iconColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/30"
  }
]

export default function DispatcherActivityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filterActivities = (list: Array<{
    actor?: string
    ticketId?: string
    details?: string
    raisedBy?: string
    [key: string]: any
  }>) => {
    return list.filter(act => {
      const search = searchQuery.toLowerCase()
      return (
        (act.actor && act.actor.toLowerCase().includes(search)) ||
        (act.ticketId && act.ticketId.toLowerCase().includes(search)) ||
        (act.details && act.details.toLowerCase().includes(search)) ||
        (act.raisedBy && act.raisedBy.toLowerCase().includes(search))
      )
    })
  }

  const todayFiltered = filterActivities(ACTIVITIES_TODAY)
  const yesterdayFiltered = filterActivities(ACTIVITIES_YESTERDAY)

  return (
    <RequireRole allowed={["dispatcher"]}>
      <div className="bg-background text-on-background min-h-screen pb-24 max-w-[430px] mx-auto flex flex-col relative">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full max-w-[430px] z-50 bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center px-container-padding h-16">
          <div className="flex items-center gap-2 transition-transform duration-200 active:scale-95">
            <h1 className="font-h1 text-h1 text-primary tracking-tight">FacilityFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
              <img 
                alt="Dispatcher Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChftp49ANdanTj87ixe0ktgK5nISerIFKdtnlX-0UGBbYgBJbzKPwLeKWUswiWBI2YAOWACo9gJti-TMRu2NTiIMGVnL_IMLGLrFDV34h7yCB0hrl8-dsI3nz4UaYPXrS-pF5b3TDBw2NBP5rWrRXgK6uHysfl3Rn_qltTHVurCbC2SOFhj4FSbGCet0LYxgj3lShJ9frQCPLRLXkNq2Q0E7_dywb0kldctEI4ndaaRtQ7VEaFCBnRuqj1dxW1938oolpQEFLxsz8"
              />
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 pt-20 px-container-padding flex flex-col">
          {/* Date Header & Search bar toggle */}
          <div className="flex justify-between items-center mb-4 mt-2">
            <h2 className="font-h2 text-h2 text-on-surface">Activity Feed</h2>
            <span className="font-label-sm text-xs bg-surface-container-highest px-2 py-1 rounded-full text-on-surface-variant font-semibold">Today</span>
          </div>

          {/* Search Box */}
          <div className="mb-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={16} />
              <input 
                className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none font-body-sm text-on-surface text-xs transition-all" 
                placeholder="Search active tasks, techs, or rooms..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Feed Container */}
          <div className="flex flex-col gap-3">
            {todayFiltered.length > 0 && (
              todayFiltered.map((act) => {
                const Icon = act.icon
                return (
                  <div key={act.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex gap-3 transition-transform duration-200 active:scale-[0.98]">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${act.iconColor}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xs text-on-surface leading-normal">
                          {act.actor && <span className="font-bold">{act.actor} </span>}
                          {act.action}{" "}
                          <span className="text-primary font-mono text-[11px] font-semibold">{act.ticketId}</span>
                          {act.raisedBy && <> raised by <span className="font-bold">{act.raisedBy}</span></>}
                        </p>
                        <span className="text-[10px] text-outline font-mono flex-shrink-0">{act.time}</span>
                      </div>
                      
                      {act.priority === "Urgent" && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container text-[8px] font-bold text-error uppercase tracking-wider">Urgent</span>
                          <p className="text-xs text-on-surface-variant font-medium">{act.details}</p>
                        </div>
                      )}
                      {!act.priority && (
                        <p className={`text-xs mt-1 text-on-surface-variant ${act.type === 'reassign' ? 'italic' : 'font-medium'}`}>{act.details}</p>
                      )}
                    </div>
                  </div>
                )
              })
            )}

            {/* Section Divider */}
            {(todayFiltered.length > 0 || yesterdayFiltered.length > 0) && (
              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] bg-outline-variant flex-1"></div>
                <span className="text-[9px] font-bold text-outline uppercase tracking-widest">Yesterday</span>
                <div className="h-[1px] bg-outline-variant flex-1"></div>
              </div>
            )}

            {yesterdayFiltered.length > 0 && (
              yesterdayFiltered.map((act) => {
                const Icon = act.icon
                return (
                  <div key={act.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col gap-3 transition-transform duration-200 active:scale-[0.98]">
                    <div className="flex gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${act.iconColor}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-xs text-on-surface leading-normal">
                            {act.actor && <span className="font-bold">{act.actor} </span>}
                            {act.action}{" "}
                            <span className="text-primary font-mono text-[11px] font-semibold">{act.ticketId}</span>
                          </p>
                          <span className="text-[10px] text-outline font-mono flex-shrink-0">{act.time}</span>
                        </div>
                        {act.details && <p className="text-xs mt-1 text-on-surface-variant font-medium">{act.details}</p>}
                      </div>
                    </div>
                    {act.image && (
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-surface-container mt-1">
                        <img alt="Site Inspection" className="w-full h-full object-cover grayscale contrast-125" src={act.image} />
                      </div>
                    )}
                  </div>
                )
              })
            )}

            {todayFiltered.length === 0 && yesterdayFiltered.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant text-sm italic">
                No activity logs found matching search.
              </div>
            )}
          </div>
          <div className="h-8"></div>
        </main>

        {/* BottomNavBar */}
        <BottomNav active="activity" />
      </div>
    </RequireRole>
  )
}
