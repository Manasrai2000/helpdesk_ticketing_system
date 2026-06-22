"use client"
import React, { useState } from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import BottomNav from '../../../components/common/BottomNav'
import { 
  Wrench, 
  Search, 
  User, 
  DoorOpen, 
  ArrowRight, 
  Plus,
  X,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Loader2,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ALL_TICKETS = [
  {
    id: "TKT-8842",
    title: "HVAC System Failure",
    priority: "Urgent",
    reporter: "Data Center B",
    location: "Server Room 4",
    createdText: "Created 12m ago",
    status: "New"
  },
  {
    id: "TKT-8845",
    title: "Lighting Repair",
    priority: "Medium",
    reporter: "John Doe",
    location: "Office 202",
    createdText: "Created 45m ago",
    status: "New"
  },
  {
    id: "TKT-8850",
    title: "Plumbing Maintenance",
    priority: "Low",
    reporter: "Cafeteria",
    location: "Kitchen A",
    createdText: "Created 1h ago",
    status: "New"
  },
  {
    id: "WO-882910",
    title: "HVAC Compressor Failure",
    priority: "Urgent",
    reporter: "Building Manager",
    location: "Server Room 4B",
    createdText: "Completed 2h ago",
    status: "Pending"
  },
  {
    id: "TKT-8304",
    title: "Elevator Inspection",
    priority: "Medium",
    reporter: "Facilities Manager",
    location: "Elevator Shaft C",
    createdText: "Assigned 45m ago",
    status: "Assigned"
  },
  {
    id: "TKT-8291",
    title: "HVAC Maintenance",
    priority: "Medium",
    reporter: "West Wing Floor 2",
    location: "Mechanical Room",
    createdText: "Started 2m ago",
    status: "In Progress"
  },
  {
    id: "FC-8100",
    title: "Lighting fixture replacement",
    priority: "Low",
    reporter: "Lobby B",
    location: "Reception",
    createdText: "Closed yesterday",
    status: "Closed"
  }
]

const TECHNICIANS = [
  {
    id: "tech-1",
    name: "Alex Rivera",
    specialty: "Electrical Systems",
    status: "Online",
    activeTasks: 0,
    distance: "0.4 km away",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQFJjMgzoDOj_5RQYO_p5DzDpJ-H4hgst9ekFSrQUBwTZ-5DIhVpiAPhEX6px2QOAYbeTcBkn_PJKrjcx2iA8kzf3B8claxo0x1w81tUyoumhNX5_53t5uPms42Dlpo9g0fUSyIDof-shzi6uGpmpBXNpLSEoIb9HmRUzd8-fb8U_VeVNyQiEZZCaDtVyc1OYKOjpVu7gX33az1M1IrwDi3MV59lrcEeIMNYQpHjDMk2IWb0t3QV074fVu4Q9fg6ALrOLQiNFh3V4"
  },
  {
    id: "tech-2",
    name: "Sarah Chen",
    specialty: "HVAC & Plumbing",
    status: "Busy",
    activeTasks: 2,
    distance: "1.2 km away",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsFXK0HAPrPt8tbee4Vb5LhjyuVg0KsVBPoS0_82PX9FTyhKeWHkeG4a-qYJTAU1lGH7LquZU4K4oxG0K893-birRJW1h9jDedpcuEfRda5fJOSuVFf_nAC7R4LPJGZygLzNS2qUl4auDDbJ9cDhzPaf5AF8m5Kc_aKLY9Yw-7-pG0jsEZ1zQAHotDMtLTn18ov15wx6ZVcln1Oubq5ETz3LND1Ao-5us6KZGbu-0rD-zBl6huwwr1Kvmfbf_bHHvrK9-4ZKZwEiw"
  },
  {
    id: "tech-3",
    name: "Jordan Smith",
    specialty: "General Maintenance",
    status: "Offline",
    activeTasks: 0,
    distance: "Back at 08:00 AM",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRZ5JR3UT0Bkg0Ysbij8ak2r59GkDgNJyflPC7HeJ0ZvL8mhhUQ4pi0UcTOsIOmS30t0tn3JrpoZU2NJpNPU9yJ2fm43oIRQCXM_i4SWy4sbiXlSCQfSA4o6zsyWDfo4WBCDwy-UH1e4SgxeqwJ6Yr7DTYzGzB2eqx_jY6UEh6KtA7p1Xvc0mMWxKofnPE4ygIe7Ft64M0HmzRCp8QNaI5FmVKPMXwQQ83vOnUqjfSsC3efjQKL5o3dOsNkOkzNoAT2ln9hqqM3Dk"
  },
  {
    id: "tech-4",
    name: "Maria Garcia",
    specialty: "HVAC Systems",
    status: "Online",
    activeTasks: 1,
    distance: "4.9 Rating",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtABZkutGDCWegDN4NpO0FKPOiUFDfoOpYNsK-9b-7Q8eQKLxW0iLSQy0dPFmLaVSBag-snJmQjB-kTb2rd3F90KSBe4rdRjDWQpodBgtOiw9fX9sDM-1qq9U9abEGuPI-MA1nrNlMmSBNyQwp2GPmU5Ga06tUhru2bKiit6QjuBbnHbAL0-LosGR6wDZPUsVY8gfhwZzBrHMmVk2jH5jSp-tKACvMZywFxfcaw440DAVfKWnHhgwqXetdNS1GAMzB5QvPpPuWwbg"
  }
]

export default function DispatcherQueuePage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState("New")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Sheet states
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [assigningId, setAssigningId] = useState<string | null>(null)
  const [assignedTechId, setAssignedTechId] = useState<string | null>(null)

  const filters = ["New", "Assigned", "In Progress", "Pending", "Closed"]

  const filteredTickets = ALL_TICKETS.filter(t => {
    const statusMatch = t.status === activeFilter
    const searchMatch = 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase())
    return statusMatch && searchMatch
  })

  const openAssignSheet = (ticketId: string) => {
    setSelectedTicketId(ticketId)
    setAssignedTechId(null)
    setAssigningId(null)
    setSheetOpen(true)
  }

  const closeAssignSheet = () => {
    setSheetOpen(false)
  }

  const handleSelectTechnician = (techId: string, name: string) => {
    setAssigningId(techId)
    setTimeout(() => {
      setAssigningId(null)
      setAssignedTechId(techId)
      toast.success(`Assigned ${name} to ticket ${selectedTicketId} successfully!`)
      setTimeout(() => {
        closeAssignSheet()
        router.push(`/dispatcher/tickets/${selectedTicketId}?assignedTechName=${encodeURIComponent(name)}`)
      }, 800)
    }, 1200)
  }

  return (
    <RequireRole allowed={["dispatcher"]}>
      <div className="bg-background text-on-background min-h-screen pb-24 max-w-[430px] mx-auto flex flex-col relative">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full max-w-[430px] bg-surface dark:bg-surface-dim text-primary dark:text-primary-fixed-dim border-b border-outline-variant dark:border-outline shadow-sm z-50 flex justify-between items-center px-container-padding h-16">
          <div className="flex items-center gap-2 transition-transform duration-200 active:scale-95">
            <h1 className="font-h1 text-h1 text-primary dark:text-primary-fixed-dim tracking-tight">FacilityFlow</h1>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant transition-transform duration-200 active:scale-95">
            <img 
              alt="Dispatcher Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLbSZ_NRfnvHpib5BvcOE77MvMq-6VeurdxhVWlwC9aJkjR2YFr_ss3itz_DjQPHd47nWtorwe1CRJV0_Di1YXn3ba2-4JoVkL9V5sJH17m-7NxgAAZy7Q4CRwZdu3begiYWeyw34mG3kGn-6Z6w-u3s_7CFTwtcVfgSRPhZFpOtoOY65q0nvnvxBd18Wle3TpCs6a9BVK9JH657H7n0ZBYQluX_d5irwxuF4D1UkdQ0_1l1xNX74-LjOdjnJ2RcKymKlFyglpk58"
            />
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="pt-20 px-container-padding flex-grow flex flex-col">
          {/* Search Section */}
          <div className="mb-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
              <input 
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none font-body-sm text-on-surface text-sm transition-all" 
                placeholder="Search Ticket ID or Customer..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 overflow-x-auto flex gap-2 pb-2 scrollbar-none no-scrollbar">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold text-xs transition-all active:scale-95 ${
                  activeFilter === filter 
                    ? 'bg-primary text-on-primary shadow-sm' 
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Ticket List (Bento-inspired asymmetry) */}
          <div className="flex flex-col gap-card-gap">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant text-sm italic">
                No tickets in this category
              </div>
            ) : (
              filteredTickets.map(ticket => {
                const targetUrl = ticket.status === 'Pending'
                  ? `/dispatcher/tickets/${ticket.id}/verify`
                  : `/dispatcher/tickets/${ticket.id}`

                return (
                  <div 
                    key={ticket.id}
                    onClick={() => router.push(targetUrl)}
                    className={`glass-card p-4 rounded-xl shadow-sm transition-all duration-200 cursor-pointer hover:border-primary/20 active:scale-[0.98] border-l-4 ${
                      ticket.priority === 'Urgent' 
                        ? 'border-l-error' 
                        : ticket.priority === 'Medium'
                        ? 'border-l-secondary'
                        : 'border-l-outline-variant'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-outline tracking-wider uppercase">{ticket.id}</span>
                        <h3 className="font-h3 text-base text-on-surface mt-1 font-semibold">{ticket.title}</h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded-lg font-bold text-[10px] uppercase tracking-wider ${
                        ticket.priority === 'Urgent' 
                          ? 'bg-error-container text-on-error-container' 
                          : ticket.priority === 'Medium'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-on-surface-variant">
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="text-outline" />
                        <span>{ticket.reporter}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DoorOpen size={14} className="text-outline" />
                        <span>{ticket.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center text-xs font-medium">
                      <span className="text-outline">{ticket.createdText}</span>
                      {ticket.status === 'New' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            openAssignSheet(ticket.id)
                          }}
                          className="text-primary font-semibold flex items-center gap-1 hover:underline active:scale-95 transition-transform"
                        >
                          Assign <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            )}

            {/* Aesthetic Background / Info banner */}
            <div className="relative overflow-hidden rounded-2xl h-32 w-full mt-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-tertiary-container opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="font-semibold text-sm text-on-surface-variant">7 new tickets pending triage</p>
                  <p className="text-xs text-outline mt-0.5">Peak workload expected in 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* BottomNavBar */}
        <BottomNav active="queue" />

        {/* FAB */}
        <button className="fixed bottom-24 right-4 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-90 z-40">
          <Plus size={28} />
        </button>

        {/* Bottom Sheet Backdrop */}
        <div 
          onClick={closeAssignSheet}
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 max-w-[430px] mx-auto ${
            sheetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`} 
        />

        {/* Bottom Sheet Panel for Assigning Technician */}
        <aside 
          className={`fixed left-0 right-0 bottom-0 z-50 mx-auto w-full max-w-[430px] bg-background rounded-t-2xl shadow-2xl transition-transform duration-300 transform flex flex-col max-h-[85vh] ${
            sheetOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-outline-variant">
            <div>
              <h2 className="font-h2 text-base font-bold text-on-surface">Assign Technician</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Select a technician for ticket {selectedTicketId}</p>
            </div>
            <button 
              onClick={closeAssignSheet} 
              className="p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search & Filter (Inside Sheet) */}
          <div className="p-4 border-b border-outline-variant bg-surface-container-low">
            <div className="bg-surface border border-outline-variant rounded-xl px-3 py-2 flex items-center gap-2">
              <Search size={16} className="text-on-surface-variant" />
              <input 
                className="bg-transparent border-none outline-none focus:ring-0 w-full text-xs font-body-sm text-on-surface p-0" 
                placeholder="Search by name or specialty..." 
                type="text" 
              />
              <SlidersHorizontal size={16} className="text-on-surface-variant cursor-pointer" />
            </div>
          </div>

          {/* Technicians List */}
          <div className="p-4 overflow-y-auto flex flex-col gap-3 max-h-[50vh]">
            {TECHNICIANS.map((tech) => {
              const isOffline = tech.status === "Offline"
              const isBusy = tech.status === "Busy"
              const isSelected = assignedTechId === tech.id
              const isAssigning = assigningId === tech.id

              return (
                <article 
                  key={tech.id}
                  className={`border rounded-xl p-4 flex flex-col gap-3 transition-all duration-200 ${
                    isOffline ? 'bg-surface-container-low border-outline-variant/60 opacity-70' : 'bg-surface-container-lowest border-outline-variant shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                          <img alt={tech.name} className="w-full h-full object-cover" src={tech.avatar} />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${
                          tech.status === 'Online' ? 'bg-emerald-500' : tech.status === 'Busy' ? 'bg-amber-500' : 'bg-slate-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-h3 text-sm font-bold text-on-surface">{tech.name}</h3>
                        <p className="text-xs text-on-surface-variant">{tech.specialty}</p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      tech.status === 'Online' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : tech.status === 'Busy' 
                        ? 'bg-amber-50 text-amber-700 border-amber-100' 
                        : 'bg-surface-container text-on-surface-variant border-outline-variant'
                    }`}>
                      {tech.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-on-surface font-medium">
                    <div className="flex items-center gap-1">
                      <Wrench size={14} className="text-on-surface-variant" />
                      <span>{tech.activeTasks} active tasks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {isOffline ? (
                        <Clock size={14} className="text-on-surface-variant" />
                      ) : tech.distance.includes('Rating') ? (
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                      ) : (
                        <MapPin size={14} className="text-on-surface-variant" />
                      )}
                      <span>{tech.distance}</span>
                    </div>
                  </div>

                  <button 
                    disabled={isOffline || isSelected || isAssigning || assignedTechId !== null}
                    onClick={() => handleSelectTechnician(tech.id, tech.name)}
                    className={`w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 ${
                      isSelected 
                        ? 'bg-emerald-600 text-white' 
                        : isOffline 
                        ? 'bg-surface-container-high text-outline cursor-not-allowed'
                        : isBusy 
                        ? 'border border-outline-variant text-on-surface hover:bg-surface-container-low' 
                        : 'bg-primary text-on-primary hover:bg-slate-800'
                    }`}
                  >
                    {isAssigning ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        <span>Assigning...</span>
                      </>
                    ) : isSelected ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Assigned</span>
                      </>
                    ) : isBusy ? (
                      <span>Assign Anyway</span>
                    ) : (
                      <span>Assign Technician</span>
                    )}
                  </button>
                </article>
              )
            })}
          </div>
        </aside>
      </div>
    </RequireRole>
  )
}

