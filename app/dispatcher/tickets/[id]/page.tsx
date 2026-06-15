"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import RequireRole from '../../../../components/auth/RequireRole'
import { 
  ArrowLeft, 
  Phone, 
  ZoomIn, 
  PlayCircle, 
  Camera, 
  User, 
  DoorOpen, 
  UserPlus, 
  Loader2 
} from 'lucide-react'
import { toast } from 'sonner'

interface TicketDetails {
  id: string
  title: string
  priority: 'Urgent' | 'High' | 'Medium' | 'Low'
  reporter: string
  location: string
  floor: string
  room: string
  company: string
  ext: string
  description: string
  attachmentsCount: number
  attachments: Array<{ type: 'image' | 'video'; src?: string }>
  history: Array<{ title: string; subtitle: string; pending?: boolean }>
}

const TICKETS_DATA: Record<string, TicketDetails> = {
  "WO-8821": {
    id: "WO-8821",
    title: "HVAC Failure - Data Center B",
    priority: "Urgent",
    reporter: "Sarah Jenkins",
    location: "Data Center B • Server Room 4",
    floor: "Level 04",
    room: "Server RM 4B",
    company: "Global Logistics Corp",
    ext: "442",
    description: "Main cooling unit is making a loud grinding noise and cycling off every 15 minutes. Server room temperature is currently at 78°F and rising. Potential bearing failure in the primary compressor fan.",
    attachmentsCount: 4,
    attachments: [
      { type: 'image', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7rCq41D_5UcwZ1z2UyjYuwZLvFjHrOT0_BiIVvtNtQRYGkI8T2BbJJFE0N4yoBP-klerTaZpnLrj9t3EVSV6--TwvUJjeuNleRu8ql-pyVPH3EewGx_FumeHoZZLETRbWT6zKFM_Ct4lIoWW302uVUPJmA7CfRrXtMdACPVBc_dQmzUcbaWCubbvAXFs1LAWjeKcPEyJzB6EITHVdUIq3NC274g3GUpXqUpzOISBUpTubjnNaObT2l20DanjHIj7iPmYDu3ncxrE' },
      { type: 'image', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr917jlP4APEvKJmMY7rLW2iEIhjx9z-R2qrdwDZhE3TxnnDtUoeccfIta7BHBVjWiyHkJ2g2r9vhwmJvPfXq6MxZ0mkl5EOxq6VBA9Wmu9gbDz1uBH0CaIZV0KQoGLZtiJD-egMw4iBkHnZKbnGyVnZpRKKcIgO9mE1fnnbb5jTRIzsRmcBIQcju2P51OUxXAG3kZ9njk_-UaJ_i6UtjG9SEagC1wFAbqM9z_rPALFA74Hi-CVef-kMsQVyYbkAZ9lbJnC2iFUFo' },
      { type: 'video' }
    ],
    history: [
      { title: "Ticket Created", subtitle: "Today, 09:12 AM • Automated System" },
      { title: "Diagnostics Ran", subtitle: "Today, 09:15 AM • Server Node B-12" },
      { title: "Technician Assigned", subtitle: "Pending", pending: true }
    ]
  },
  "TKT-8842": {
    id: "TKT-8842",
    title: "HVAC System Failure",
    priority: "Urgent",
    reporter: "Sarah Jenkins",
    location: "Data Center B • Server Room 4",
    floor: "Level 04",
    room: "Server RM 4B",
    company: "Global Logistics Corp",
    ext: "442",
    description: "Main cooling unit is making a loud grinding noise and cycling off every 15 minutes. Server room temperature is currently at 78°F and rising. Potential bearing failure in the primary compressor fan.",
    attachmentsCount: 3,
    attachments: [
      { type: 'image', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7rCq41D_5UcwZ1z2UyjYuwZLvFjHrOT0_BiIVvtNtQRYGkI8T2BbJJFE0N4yoBP-klerTaZpnLrj9t3EVSV6--TwvUJjeuNleRu8ql-pyVPH3EewGx_FumeHoZZLETRbWT6zKFM_Ct4lIoWW302uVUPJmA7CfRrXtMdACPVBc_dQmzUcbaWCubbvAXFs1LAWjeKcPEyJzB6EITHVdUIq3NC274g3GUpXqUpzOISBUpTubjnNaObT2l20DanjHIj7iPmYDu3ncxrE' },
      { type: 'image', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr917jlP4APEvKJmMY7rLW2iEIhjx9z-R2qrdwDZhE3TxnnDtUoeccfIta7BHBVjWiyHkJ2g2r9vhwmJvPfXq6MxZ0mkl5EOxq6VBA9Wmu9gbDz1uBH0CaIZV0KQoGLZtiJD-egMw4iBkHnZKbnGyVnZpRKKcIgO9mE1fnnbb5jTRIzsRmcBIQcju2P51OUxXAG3kZ9njk_-UaJ_i6UtjG9SEagC1wFAbqM9z_rPALFA74Hi-CVef-kMsQVyYbkAZ9lbJnC2iFUFo' },
      { type: 'video' }
    ],
    history: [
      { title: "Ticket Created", subtitle: "Today, 09:12 AM • Automated System" },
      { title: "Diagnostics Ran", subtitle: "Today, 09:15 AM • Server Node B-12" },
      { title: "Technician Assigned", subtitle: "Pending", pending: true }
    ]
  },
  "WO-8819": {
    id: "WO-8819",
    title: "Main Elevator Malfunction",
    priority: "High",
    reporter: "Facilities Manager",
    location: "Tower A • Main Lobby",
    floor: "Level 12",
    room: "Elevator Shaft C",
    company: "FacilityOps Corp",
    ext: "101",
    description: "Elevator 3 is stuck on Floor 12. Passengers have been evacuated successfully. Technician needed to examine mechanical cabling and restart breaker module.",
    attachmentsCount: 1,
    attachments: [
      { type: 'image', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr917jlP4APEvKJmMY7rLW2iEIhjx9z-R2qrdwDZhE3TxnnDtUoeccfIta7BHBVjWiyHkJ2g2r9vhwmJvPfXq6MxZ0mkl5EOxq6VBA9Wmu9gbDz1uBH0CaIZV0KQoGLZtiJD-egMw4iBkHnZKbnGyVnZpRKKcIgO9mE1fnnbb5jTRIzsRmcBIQcju2P51OUxXAG3kZ9njk_-UaJ_i6UtjG9SEagC1wFAbqM9z_rPALFA74Hi-CVef-kMsQVyYbkAZ9lbJnC2iFUFo' }
    ],
    history: [
      { title: "Ticket Created", subtitle: "Today, 08:30 AM • Manual Entry" },
      { title: "Technician Assigned", subtitle: "Pending", pending: true }
    ]
  },
  "TKT-8845": {
    id: "TKT-8845",
    title: "Lighting Repair",
    priority: "Medium",
    reporter: "John Doe",
    location: "Floor 2 • West Wing",
    floor: "Level 02",
    room: "Office 202",
    company: "Global Logistics Corp",
    ext: "331",
    description: "Lights are flickering inside room 202. Two ballasts need replacement. Sarah Jenkins reported this on behalf of team.",
    attachmentsCount: 1,
    attachments: [
      { type: 'image', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7Hp4SHNmqMbpEbBwsmN1XfKIE_1n2080IldJVtX-humU2w9-Tt0NRoHLFwIcInFP9loaXnKuJ3qGNYIwFtB_fB-iGqSTiwo8EvC1QRb6wmGuFC6rQ8A3vFmQ7cXxybYpf5a52U6uvKcY6UUv9BNkGcmOUs63t_HvRJljACUk56C8_LPcr4hXSswWem6hM3l25ftPqpm18WrubZAq86pakBcbc63jwWR-99uQeU66pCWlFbQwSoG59-vo9yg7B-UNknFs3cafudk4' }
    ],
    history: [
      { title: "Ticket Created", subtitle: "Today, 07:15 AM • John Doe" },
      { title: "Technician Assigned", subtitle: "Pending", pending: true }
    ]
  },
  "TKT-8850": {
    id: "TKT-8850",
    title: "Plumbing Maintenance",
    priority: "Low",
    reporter: "Cafeteria Staff",
    location: "Basement 1 • Main Kitchen",
    floor: "Level B1",
    room: "Kitchen A",
    company: "FoodServices Inc",
    ext: "882",
    description: "Clogged floor drain inside Kitchen A. Water is draining very slowly. Requires grease trap cleanout.",
    attachmentsCount: 0,
    attachments: [],
    history: [
      { title: "Ticket Created", subtitle: "Today, 06:12 AM • Automated Alert" },
      { title: "Technician Assigned", subtitle: "Pending", pending: true }
    ]
  }
}

export default function TicketDetailsDispatcherPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const task = TICKETS_DATA[id] || TICKETS_DATA["TKT-8842"] // fallback

  const [assigning, setAssigning] = useState(false)
  const [assigned, setAssigned] = useState(false)

  const handleAssign = () => {
    setAssigning(true)
    setTimeout(() => {
      setAssigning(false)
      setAssigned(true)
      toast.success("Technician Alex Rivera assigned to task successfully!")
    }, 1200)
  }

  return (
    <RequireRole allowed={["dispatcher"]}>
      <div className="bg-background text-on-background min-h-screen font-body-sm pb-40 max-w-[430px] mx-auto flex flex-col relative shadow-md">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant shadow-sm h-16 flex justify-between items-center px-container-padding max-w-[430px]">
          <div 
            onClick={() => router.back()}
            className="flex items-center gap-2 transition-transform duration-200 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="text-primary" size={24} />
            <span className="font-h2 text-h2 font-bold text-primary">Ticket #{task.id}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
            <img 
              alt="Dispatcher Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhvasnSprCOIxoGbLR0GARkS8eDYZJzb3dZQiTqDhTWEM_sbsNqrVIVXPbLVPVzwJqMtRgEQj50flqidnjFkIfA6_fON8We1T3NFEzVR0QE9soO4WFLN5OuVLEHOwqrPB87VEW3Umo3t6lVOhdqJj0yQsYdg0AA1sItdI9kcRkWFjU7XMYeAiTSnC2sko9ImkXoqf2X703tcxdl1uIHvOvyylLPWUKCmac6V_o5yI11iv413k2CHxfrMX90HyRw75O5u11pxBALnQ"
            />
          </div>
        </header>

        {/* Content Canvas */}
        <main className="pt-20 px-container-padding flex-grow flex flex-col gap-6">
          {/* Status Header Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="font-h1 text-lg font-bold text-primary tracking-tight">{task.title}</h1>
                <p className="font-label-sm text-xs text-on-surface-variant mt-1">Reported by Building Manager</p>
              </div>
              <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                task.priority === 'Urgent' 
                  ? 'bg-red-100 text-red-800' 
                  : task.priority === 'High'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {task.priority}
              </span>
            </div>
            
            <div className="flex gap-2 mt-4">
              <div className="flex-1 bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 text-center">
                <p className="font-label-sm text-xs text-on-surface-variant mb-1">Floor</p>
                <p className="font-label-md text-sm text-primary font-semibold">{task.floor}</p>
              </div>
              <div className="flex-1 bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 text-center">
                <p className="font-label-sm text-xs text-on-surface-variant mb-1">Room</p>
                <p className="font-label-md text-sm text-primary font-semibold">{task.room}</p>
              </div>
            </div>
          </section>

          {/* Requester Information */}
          <section className="flex flex-col gap-2">
            <h3 className="font-h3 text-base text-primary font-semibold pl-1">Requester Information</h3>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img 
                    alt="Customer Avatar" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzHG7z1eQdBKWoBpWVkCj21UdyW8jHIj-vmyi9vV2E628mp-q_xnBE-wSDbmph4SHaCZtaLYwcE6kT_4kms7M80FtfbXaBPfFIcqKa0ZLg2n87MHpo2dpAo_oZ3Z-8nGbgT2xWkZrCfE_tXOKSN1SaQ5S2_g1odE69l4uVtWd6f5VvQfZTJA57KkyMem-R14lBoUgwclsnJzNrNtD1o5OuKaqT__8UWjyPWMlISwb09CRkF5DXJgicaChXx1bDqVKQgNExzKRhYYg"
                  />
                </div>
                <div>
                  <p className="font-h3 text-sm text-primary font-bold">{task.reporter}</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">{task.company} • Ext. {task.ext}</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center bg-surface active:scale-95 transition-transform">
                <Phone size={18} className="text-primary" />
              </button>
            </div>
          </section>

          {/* Description */}
          <section className="flex flex-col gap-2">
            <h3 className="font-h3 text-base text-primary font-semibold pl-1">Problem Description</h3>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
              <p className="font-body-lg text-sm text-on-surface leading-relaxed">
                {task.description}
              </p>
            </div>
          </section>

          {/* Site Media */}
          {task.attachments.length > 0 && (
            <section className="flex flex-col gap-2">
              <div className="flex justify-between items-center pl-1">
                <h3 className="font-h3 text-base text-primary font-semibold">Site Media</h3>
                <span className="font-label-sm text-xs text-on-surface-variant">{task.attachmentsCount} Attachments</span>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
                {task.attachments.map((att, idx) => (
                  <div key={idx} className="min-w-[140px] h-32 rounded-xl border border-outline-variant overflow-hidden flex-shrink-0 relative">
                    {att.type === 'image' && att.src ? (
                      <>
                        <img className="w-full h-full object-cover" alt="Attachment details" src={att.src} />
                        <div className="absolute bottom-1 right-1 bg-black/50 text-white p-1 rounded-md">
                          <ZoomIn size={14} />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-black/40 flex items-center justify-center">
                        <PlayCircle className="text-white" size={32} />
                      </div>
                    )}
                  </div>
                ))}
                <div className="min-w-[140px] h-32 rounded-xl border border-outline-variant bg-surface-container flex flex-col items-center justify-center text-on-surface-variant flex-shrink-0 border-dashed cursor-pointer hover:bg-surface-container-low transition-colors">
                  <Camera size={20} />
                  <span className="font-label-sm text-xs mt-1 font-semibold">Add More</span>
                </div>
              </div>
            </section>
          )}

          {/* Ticket History */}
          <section className="flex flex-col gap-2">
            <h3 className="font-h3 text-base text-primary font-semibold pl-1">Ticket History</h3>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm space-y-6 relative overflow-hidden pl-8">
              {/* Timeline Line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-outline-variant"></div>
              
              {task.history.map((step, idx) => (
                <div key={idx} className="flex gap-4 relative z-10">
                  <div className={`w-3.5 h-3.5 rounded-full absolute -left-[16px] top-1.5 border-2 border-white ${
                    step.pending && !assigned
                      ? 'bg-outline-variant' 
                      : 'bg-primary ring-4 ring-primary-fixed'
                  }`} />
                  <div>
                    <p className="font-label-md text-sm text-primary font-bold">
                      {step.title === "Technician Assigned" && assigned ? "Technician Assigned: Alex Rivera" : step.title}
                    </p>
                    <p className="font-label-sm text-xs text-on-surface-variant">
                      {step.title === "Technician Assigned" && assigned ? "Today, Just Now • Dispatched" : step.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Bottom Action Bar (Fixed) */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface-container-lowest border-t border-outline-variant p-4 pb-8 z-50 shadow-[0px_-4px_12px_rgba(0,0,0,0.05)]">
          <button 
            onClick={handleAssign}
            disabled={assigning || assigned}
            className={`w-full py-4 rounded-xl font-h3 text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] font-semibold text-white ${
              assigned 
                ? 'bg-emerald-600' 
                : 'bg-primary hover:bg-slate-800'
            }`}
          >
            {assigning ? (
              <Loader2 className="animate-spin" size={18} />
            ) : assigned ? (
              <span>Technician Assigned</span>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Assign Technician</span>
              </>
            )}
          </button>
        </div>
      </div>
    </RequireRole>
  )
}
