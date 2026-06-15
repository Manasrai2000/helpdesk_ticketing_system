"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import RequireRole from '../../../../components/auth/RequireRole'
import BottomNav from '../../../../components/common/BottomNav'
import { 
  ArrowLeft, 
  Building, 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  FileText, 
  Paperclip, 
  Video, 
  History, 
  Play, 
  CheckCircle,
  MoreVertical,
  AlertCircle
} from 'lucide-react'

interface TaskDetail {
  id: string
  title: string
  location: string
  wing: string
  reporter: string
  priority: 'High' | 'Medium' | 'Low'
  category: string
  dueText: string
  assetId: string
  description: string
  attachments: Array<{ type: 'image' | 'video'; src?: string; duration?: string }>
  timeline: Array<{ title: string; time: string; user: string }>
}

const TASKS_DATA: Record<string, TaskDetail> = {
  "FC-8291": {
    id: "FC-8291",
    title: "Clogged Main Drain",
    location: "Building B, Room 402",
    wing: "West Wing",
    reporter: "John Smith",
    priority: "High",
    category: "Plumbing",
    dueText: "Due in 45m",
    assetId: "PLUMB-DRAIN-8291",
    description: "The main drain in building B room 402 is completely clogged and overflowing. Water is starting to pool around the floor drain. Emergency attention required to prevent water damage to the surrounding office spaces.",
    attachments: [
      { type: "image", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsIEHsHk9d4LOCymaj2xBwjeIr4TinKQDv6pjazPRj4jnwmItCUdAPGIVV4hl7tSe9ADGoHsPjEE_87xDTqAlFyDSFxeHA4j5asZ6nq_LETbBRSdc3Jn8BvXfxVa_XJ3M8d0yGbTtDo1edtdhbmsmuYMuSQmIFdbZcNkdhKZZ9qzJJJ4l1Rf-G-y3-q7b1zDtJ7AT-swnX0DtMU16KY6JMvAlHNcGrNf4-IfZCGhn4MHxflIyWsGo-BakcBcRwOW3zsvFulBZwy6w" },
      { type: "image", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_zimc9gawy2davFQB0MFv9QEzE8Vbfrwevn7VpTXiUnAZAe3Uj8UkVzkY4CbH9N-fkHENLFSd2OK6f-Vagop4L83pq3GN7fzYlofFr-phh1bpa5DS4AqQNyI-kijaYGR8R10pVFnP28AtnWhJWvcQbxrcNqXN4dbOUMPewEVG8dCV8ZImp0okxUMqFrgwMVWFG-atKhKmO1P_s0YN6EeSs1fzzktgbZCsYahQl9M4YIa5Us06M15wVQdvQl8FvHLWDAqH2QnoHvw" },
      { type: "video", duration: "0:12" }
    ],
    timeline: [
      { title: "Technician Assigned", time: "Today, 10:45 AM", user: "Alex Rivera" },
      { title: "Ticket Confirmed", time: "Today, 09:12 AM", user: "Front Desk" },
      { title: "Ticket Created", time: "Today, 08:30 AM", user: "John Smith" }
    ]
  },
  "FC-8304": {
    id: "FC-8304",
    title: "HVAC Maintenance",
    location: "Lobby East Wing",
    wing: "East Wing",
    reporter: "Facilities Manager",
    priority: "Medium",
    category: "HVAC",
    dueText: "Due Today",
    assetId: "HVAC-UNIT-9920",
    description: "The AC unit in the main conference room is making a loud grinding noise and is no longer blowing cold air. It started approximately 2 hours ago during a board meeting. There is a small amount of moisture visible on the exterior casing.",
    attachments: [
      { type: "image", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsIEHsHk9d4LOCymaj2xBwjeIr4TinKQDv6pjazPRj4jnwmItCUdAPGIVV4hl7tSe9ADGoHsPjEE_87xDTqAlFyDSFxeHA4j5asZ6nq_LETbBRSdc3Jn8BvXfxVa_XJ3M8d0yGbTtDo1edtdhbmsmuYMuSQmIFdbZcNkdhKZZ9qzJJJ4l1Rf-G-y3-q7b1zDtJ7AT-swnX0DtMU16KY6JMvAlHNcGrNf4-IfZCGhn4MHxflIyWsGo-BakcBcRwOW3zsvFulBZwy6w" },
      { type: "image", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_zimc9gawy2davFQB0MFv9QEzE8Vbfrwevn7VpTXiUnAZAe3Uj8UkVzkY4CbH9N-fkHENLFSd2OK6f-Vagop4L83pq3GN7fzYlofFr-phh1bpa5DS4AqQNyI-kijaYGR8R10pVFnP28AtnWhJWvcQbxrcNqXN4dbOUMPewEVG8dCV8ZImp0okxUMqFrgwMVWFG-atKhKmO1P_s0YN6EeSs1fzzktgbZCsYahQl9M4YIa5Us06M15wVQdvQl8FvHLWDAqH2QnoHvw" },
      { type: "video", duration: "0:12" }
    ],
    timeline: [
      { title: "Technician Assigned", time: "Today, 10:45 AM", user: "Alex Rivera" },
      { title: "Ticket Confirmed", time: "Today, 09:12 AM", user: "Front Desk" },
      { title: "Ticket Created", time: "Today, 08:30 AM", user: "Johnathan Doe" }
    ]
  },
  "FC-7992": {
    id: "FC-7992",
    title: "Replace LED Ballasts",
    location: "Floor 12, Suite 1205",
    wing: "Main Office",
    reporter: "Sarah Connor",
    priority: "Low",
    category: "Electrical",
    dueText: "1h 12m active",
    assetId: "ELEC-BALLAST-7992",
    description: "Multiple lights are flickering on the 12th floor, specifically in Suite 1205. Seems like the ballasts need a quick replacement.",
    attachments: [],
    timeline: [
      { title: "Technician Assigned", time: "Today, 09:45 AM", user: "Alex Rivera" },
      { title: "Ticket Confirmed", time: "Today, 08:12 AM", user: "Front Desk" },
      { title: "Ticket Created", time: "Today, 07:30 AM", user: "Sarah Connor" }
    ]
  },
  "FC-8441": {
    id: "FC-8441",
    title: "Server Room Leak",
    location: "Building A, IT Hub",
    wing: "Server Block",
    reporter: "Mark Davis",
    priority: "High",
    category: "Emergency",
    dueText: "Immediate",
    assetId: "PLUMB-LEAK-8441",
    description: "Active water dripping from ceiling directly above server rack B4. High risk of hardware damage. Needs immediate investigation.",
    attachments: [],
    timeline: [
      { title: "Technician Assigned", time: "Today, 11:45 AM", user: "Alex Rivera" },
      { title: "Ticket Confirmed", time: "Today, 11:12 AM", user: "Front Desk" },
      { title: "Ticket Created", time: "Today, 11:00 AM", user: "Mark Davis" }
    ]
  }
}

export default function TaskDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  
  const task = TASKS_DATA[id] || TASKS_DATA["FC-8291"] // fallback

  const [status, setStatus] = useState<string>("Assigned")

  useEffect(() => {
    const saved = localStorage.getItem('technician_task_statuses')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed[task.id]) {
        setStatus(parsed[task.id])
      }
    }
  }, [task.id])

  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    const saved = localStorage.getItem('technician_task_statuses')
    const current = saved ? JSON.parse(saved) : {}
    current[task.id] = newStatus
    localStorage.setItem('technician_task_statuses', JSON.stringify(current))
  }

  const handleAction = () => {
    if (status === "Assigned") {
      updateStatus("In Progress")
    } else if (status === "In Progress") {
      router.push(`/technician/tasks/${task.id}/complete`)
    }
  }

  return (
    <RequireRole allowed={["technician"]}>
      <div className="max-w-[430px] mx-auto min-h-screen bg-surface pb-40 relative">
        {/* Header */}
        <header className="bg-surface border-b border-outline-variant flex justify-between items-center px-container-padding h-16 w-full sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="active:scale-95 duration-150 p-2 -ml-2 hover:bg-surface-container-high transition-colors rounded-full"
            >
              <ArrowLeft className="text-primary" size={24} />
            </button>
            <h1 className="font-h2 text-h2 font-bold text-primary">Task Details</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
            <img 
              alt="Technician Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOewt3EruvCcUTKggl71EvbNebfO0s8pVaCYtDb399QMXgBs03fkhOA8ePavO_9GFOSYecN1LbmoJ0QUyN8V17ZHKJWLFSxigBMl_rWr_iaC3s3wUPKcd8AesmM1km0voBBG2BXOtIAdgZCH8b2Xjwt2tq0O5aRfO3Vrbq2k8jPuYW20ieK81H7HdKbJ2XLVKHDwORphjh2AkR2enYOwKK43XGpehTQx87xqUZGrUb64stHYYqgDhGn2PumBC-iwcQJMMcq5FEYdc"
            />
          </div>
        </header>

        <main className="px-container-padding pt-4 space-y-4 max-w-lg mx-auto">
          {/* Status Banner */}
          <div className="bg-primary-fixed border border-outline-variant rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                <AlertCircle className="text-primary" size={22} />
              </div>
              <div>
                <p className="font-label-sm text-[12px] text-secondary uppercase tracking-wider">Current Status</p>
                <p className="font-h3 text-h3 text-primary">{status}</p>
              </div>
            </div>
            
            {status !== "Completed" ? (
              <button 
                onClick={handleAction}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all text-sm font-semibold"
              >
                {status === "Assigned" ? "Start Work" : "Complete"}
              </button>
            ) : (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle size={18} /> Done
              </span>
            )}
          </div>

          {/* Customer Information Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Customer Profile"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAadox65TfUFuzGw8QKIOCjdRGWBlcyvYsOTI3e8FnJwxtqj_UjPMGtQ729b3mUFGOm3hGcA8h6SsexCA9-WlCT-KzcxhBiyra69uDYmOvpx3bwdqJUrTyN_ZvygLonAj6O8XQVYGb7AcYsaQM88_DJy9Y8vRRKgLL_bUBPqB8ZU3-CGVqDP2t7Mnw4kEOe06Mkl9HpZF8ihqXsvAxCGlC_4_65t-F96oNQNCq2md4cEqiJZkiUqD_8GqMG7xU1ZxCcnyTcwOgaFwE"
                  />
                </div>
                <div>
                  <h2 className="font-h3 text-h3 text-on-surface">{task.reporter}</h2>
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-xs mt-0.5">
                    <Building size={14} className="text-secondary" />
                    {task.location} • {task.wing}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-secondary-container transition-colors">
                  <Phone size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-secondary-container transition-colors">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
            
            <div className="h-[1px] bg-outline-variant w-full my-4"></div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-label-sm text-xs text-on-surface-variant">Asset ID</p>
                <p className="font-body-lg text-primary font-mono-sm text-sm font-semibold">{task.assetId}</p>
              </div>
              <div>
                <p className="font-label-sm text-xs text-on-surface-variant">Priority</p>
                <p className="font-body-lg text-error font-semibold flex items-center gap-1 text-sm text-red-600">
                  <AlertTriangle size={14} /> {task.priority}
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Description */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <h3 className="font-label-md text-on-surface-variant mb-2 flex items-center gap-2 text-sm font-medium">
              <FileText size={16} /> Description
            </h3>
            <p className="font-body-lg text-on-surface leading-relaxed text-sm">
              {task.description}
            </p>
          </div>

          {/* Attachments Section */}
          {task.attachments.length > 0 && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-label-md text-on-surface-variant flex items-center gap-2 text-sm font-medium">
                  <Paperclip size={16} /> Attachments ({task.attachments.length})
                </h3>
                <button className="text-primary font-label-sm text-xs hover:underline">View All</button>
              </div>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                {task.attachments.map((att, idx) => (
                  <div key={idx} className="min-w-[120px] h-20 rounded-lg bg-surface-container overflow-hidden border border-outline-variant flex items-center justify-center relative">
                    {att.type === 'image' && att.src ? (
                      <img className="w-full h-full object-cover" alt="Attachment" src={att.src} />
                    ) : (
                      <>
                        <Video size={24} className="text-on-surface-variant" />
                        <p className="absolute bottom-1 right-1 font-mono-sm text-[10px] bg-black/50 text-white px-1 rounded">{att.duration}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Timeline */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <h3 className="font-label-md text-on-surface-variant mb-6 flex items-center gap-2 text-sm font-medium">
              <History size={16} /> Activity Timeline
            </h3>
            <div className="space-y-0 relative pl-4 border-l border-outline-variant">
              {task.timeline.map((step, idx) => (
                <div key={idx} className="relative pb-6 last:pb-0">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white" />
                  <div>
                    <p className="font-label-md text-on-surface text-sm font-semibold">{step.title}</p>
                    <p className="font-body-sm text-xs text-on-surface-variant">{step.time} • {step.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Sticky Bottom Action Bar */}
        {status !== "Completed" && (
          <div className="fixed bottom-20 left-0 w-full px-container-padding py-4 bg-surface/80 backdrop-blur-md z-40">
            <div className="max-w-[430px] mx-auto flex gap-3">
              <button 
                onClick={handleAction}
                className="flex-1 bg-primary text-on-primary h-12 rounded-xl font-h3 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all font-semibold"
              >
                <Play size={18} />
                {status === "Assigned" ? "Start Work" : "Complete Work"}
              </button>
              <button className="w-12 h-12 bg-white border border-outline-variant rounded-xl flex items-center justify-center text-on-surface active:scale-95 transition-all">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        )}

        <BottomNav active="tasks" />
      </div>
    </RequireRole>
  )
}
