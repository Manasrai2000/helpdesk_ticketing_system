"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import RequireRole from '../../../components/auth/RequireRole'
import TopBar from '../../../components/common/TopBar'
import { Search, Clock, Wrench, Grid, RotateCw, Home, AlertTriangle, Plus } from 'lucide-react'
import BottomNav from '../../../components/common/BottomNav'

const INITIAL_TASKS = [
  {
    id: "FC-8291",
    title: "Clogged Main Drain",
    location: "Building B, Room 402 • John Smith",
    priority: "High",
    category: "Plumbing",
    dueText: "Due in 45m",
    iconType: "wrench",
    defaultStatus: "Assigned"
  },
  {
    id: "FC-8304",
    title: "HVAC Maintenance",
    location: "Lobby East Wing • Facilities Manager",
    priority: "Medium",
    category: "HVAC",
    dueText: "Due Today",
    iconType: "grid",
    defaultStatus: "Assigned"
  },
  {
    id: "FC-7992",
    title: "Replace LED Ballasts",
    location: "Floor 12, Suite 1205 • Sarah Connor",
    priority: "Low",
    category: "Electrical",
    dueText: "1h 12m active",
    iconType: "rotate",
    defaultStatus: "In Progress"
  },
  {
    id: "FC-8441",
    title: "Server Room Leak",
    location: "Building A, IT Hub • Mark Davis",
    priority: "High",
    category: "Emergency",
    dueText: "Immediate",
    iconType: "alert",
    defaultStatus: "Assigned"
  }
]

export default function TechnicianTasksPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [taskStatuses, setTaskStatuses] = useState<Record<string, string>>({})

  useEffect(() => {
    const saved = localStorage.getItem('technician_task_statuses')
    if (saved) {
      setTaskStatuses(JSON.parse(saved))
    } else {
      const initial: Record<string, string> = {}
      INITIAL_TASKS.forEach(t => {
        initial[t.id] = t.defaultStatus
      })
      localStorage.setItem('technician_task_statuses', JSON.stringify(initial))
      setTaskStatuses(initial)
    }
  }, [])

  const getStatus = (id: string) => {
    return taskStatuses[id] || "Assigned"
  }

  // Filter tasks based on activeTab:
  // Tab 0: Assigned
  // Tab 1: In Progress
  // Tab 2: Completed
  const tabNames = ["Assigned", "In Progress", "Completed"]
  const filteredTasks = INITIAL_TASKS.filter(task => {
    const status = getStatus(task.id)
    return status === tabNames[activeTab]
  })

  return (
    <RequireRole allowed={["technician"]}>
      <div className="max-w-[430px] mx-auto min-h-screen bg-surface pb-28">
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
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant text-body-sm">
                No tasks in this category
              </div>
            ) : (
              filteredTasks.map(task => {
                const isInProgress = getStatus(task.id) === "In Progress"
                const isCompleted = getStatus(task.id) === "Completed"

                return (
                  <Link key={task.id} href={`/technician/tasks/${task.id}`}>
                    <article className={`task-card bg-white border rounded-xl p-4 shadow-sm relative overflow-hidden transition-all active:scale-[0.98] ${
                      isInProgress ? 'border-primary/20' : 'border-outline-variant'
                    }`}>
                      {isInProgress && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                      
                      <div className={`flex justify-between items-start mb-3 ${isInProgress ? 'pl-2' : ''}`}>
                        <span className="font-mono-sm text-mono-sm text-on-surface-variant">#{task.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          task.priority === 'High' 
                            ? 'bg-error-container text-on-error-container' 
                            : task.priority === 'Medium'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-surface-container-highest text-on-surface'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      <h3 className={`font-h3 text-h3 text-on-surface mb-1 ${isInProgress ? 'pl-2' : ''}`}>
                        {task.title}
                      </h3>
                      
                      <p className={`text-body-sm text-on-surface-variant mb-4 ${isInProgress ? 'pl-2' : ''}`}>
                        {task.location}
                      </p>

                      <div className={`flex items-center justify-between border-t border-outline-variant pt-3 ${isInProgress ? 'pl-2' : ''}`}>
                        <div className="flex items-center gap-2">
                          {task.iconType === 'wrench' ? (
                            <Wrench size={18} className="text-primary" />
                          ) : task.iconType === 'alert' ? (
                            <Home size={18} className="text-primary" />
                          ) : (
                            <Grid size={18} className="text-primary" />
                          )}
                          <span className="text-label-sm font-medium text-on-surface-variant">
                            {task.category}
                          </span>
                        </div>

                        <div className={`flex items-center gap-1 ${
                          isCompleted
                            ? 'text-emerald-600'
                            : task.priority === 'High'
                            ? 'text-error'
                            : 'text-on-surface-variant'
                        }`}>
                          {task.iconType === 'rotate' ? (
                            <RotateCw size={16} />
                          ) : task.iconType === 'alert' ? (
                            <AlertTriangle size={16} />
                          ) : (
                            <Clock size={16} />
                          )}
                          <span className="text-label-sm font-semibold">
                            {isCompleted ? 'Completed' : task.dueText}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })
            )}
          </div>
        </main>

        <BottomNav active="tasks" />

        {/* FAB */}
        <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-95 duration-150 transition-all z-40">
          <Plus size={28} />
        </button>
      </div>
    </RequireRole>
  )
}

