"use client"
import React, { useState } from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import BottomNav from '../../../components/common/BottomNav'
import { 
  Search, 
  MapPin, 
  User, 
  Plus, 
  Bell,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { toast } from 'sonner'

const INITIAL_TICKETS = [
  {
    id: "FC-9012",
    title: "AC Compressor Issue",
    status: "In Progress",
    location: "Room 402",
    assigned: "Alex Rivera",
    priority: "High",
    updated: "2m ago",
    department: "HVAC"
  },
  {
    id: "FC-8995",
    title: "Elevator B Inspection",
    status: "New",
    location: "East Lobby",
    assigned: "Unassigned",
    priority: "Normal",
    updated: "15m ago",
    department: "Electrical"
  },
  {
    id: "FC-8977",
    title: "Water Leakage Report",
    status: "Verification",
    location: "Cafeteria",
    assigned: "Jordan Smith",
    priority: "Critical",
    updated: "45m ago",
    department: "Plumbing"
  },
  {
    id: "FC-8960",
    title: "Light Fixture Swap",
    status: "Closed",
    location: "Conf. Hall C",
    assigned: "Sarah Chen",
    priority: "Low",
    updated: "2h ago",
    department: "Electrical"
  }
]

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedDept, setSelectedDept] = useState("All Depts")
  const [selectedPriority, setSelectedPriority] = useState("All Priority")

  const handleAddTicket = () => {
    toast.info("Create new ticket modal triggered.")
  }

  // Count active and urgent tickets
  const activeCount = tickets.filter(t => t.status !== "Closed").length
  const urgentCount = tickets.filter(t => t.priority === "Critical" || t.priority === "High").length

  // Filtering logic
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.assigned.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = 
      selectedStatus === "All Status" || 
      ticket.status.toLowerCase() === selectedStatus.toLowerCase()

    const matchesDept = 
      selectedDept === "All Depts" || 
      ticket.department.toLowerCase() === selectedDept.toLowerCase()

    const matchesPriority = 
      selectedPriority === "All Priority" || 
      ticket.priority.toLowerCase() === selectedPriority.toLowerCase()

    return matchesSearch && matchesStatus && matchesDept && matchesPriority
  })

  return (
    <RequireRole allowed={["admin"]}>
      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center max-w-[430px] mx-auto pb-24 relative shadow-2xl">
        {/* TopAppBar */}
        <header className="w-full sticky top-0 z-50 bg-surface border-b border-surface-container-highest shadow-sm h-16 flex items-center justify-between px-container-padding">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant">
              <img 
                alt="Admin Profile Photo" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmQo8ExruT7jZvCYAnVuFyk34ZGi3ONybFlrIvVQlk1gXzose9TCHkGxv-zxnErVtNnxcTa0NJezAxuINS-CmxkiYZdokaMmIQrVsiRBMtfstPoJ0xVgRsZweIkfvNbK86L0zM6Pj4wiwZ0rO02YmqBIw0RxAQd5WUqN70-r8J835Jn8i5-9-APRVKUdtP32_HywXWB5nASYpq-q4NARPxIQPfw4CaJmP67K4wSEc_goZfpdkKJoOWY2J7azGk2S1RPoggoj1OGB8"
              />
            </div>
            <h1 className="font-h1 text-h1 text-on-surface">FacilityFlow</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-all duration-200 active:scale-95">
            <Bell size={20} />
          </button>
        </header>

        {/* Main Canvas */}
        <main className="w-full px-container-padding flex-grow">
          {/* Search & Quick Stats */}
          <section className="pt-6 pb-4 flex flex-col gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
              <input 
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 outline-none font-body-sm text-on-surface text-sm" 
                placeholder="Search Ticket ID or Keyword..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col justify-between shadow-sm">
                <p className="font-semibold text-xs text-on-surface-variant">Active Tickets</p>
                <p className="font-h1 text-2xl font-bold mt-1">{activeCount}</p>
              </div>
              <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col justify-between shadow-sm">
                <p className="font-semibold text-xs text-on-surface-variant">Urgent</p>
                <p className="font-h1 text-2xl font-bold text-error mt-1">{String(urgentCount).padStart(2, '0')}</p>
              </div>
            </div>
          </section>

          {/* Filters Scrollable Row */}
          <section className="pb-4 overflow-x-auto flex gap-2 no-scrollbar scroll-smooth">
            {["All Status", "New", "In Progress", "Verification", "Closed"].map((status) => {
              const isActive = selectedStatus === status
              return (
                <button 
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full font-semibold text-xs transition-all active:scale-95 border ${
                    isActive 
                      ? "bg-primary text-on-primary border-primary shadow-sm" 
                      : "bg-surface-container-high text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-highest"
                  }`}
                >
                  {status}
                </button>
              )
            })}
          </section>

          {/* Dropdown Filters */}
          <section className="pb-6 flex gap-2">
            <div className="flex-1 relative">
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-on-surface pr-8 focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="All Depts">All Depts</option>
                <option value="HVAC">HVAC</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline" size={16} />
            </div>
            <div className="flex-1 relative">
              <select 
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-on-surface pr-8 focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="All Priority">All Priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline" size={16} />
            </div>
          </section>

          {/* Ticket List */}
          <section className="space-y-3">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant/60 font-semibold text-sm">
                No matching tickets found.
              </div>
            ) : (
              filteredTickets.map((ticket) => {
                const getStatusStyle = (status: string) => {
                  switch (status) {
                    case "In Progress":
                      return "bg-secondary-container text-on-secondary-container border border-secondary-container/20"
                    case "New":
                      return "bg-surface-container-highest text-on-surface-variant border border-outline-variant/25"
                    case "Verification":
                      return "bg-tertiary-fixed text-on-tertiary-fixed-variant border border-tertiary-fixed/20"
                    default:
                      return "bg-surface-container-low text-outline border border-outline-variant/10"
                  }
                }

                const getPriorityStyle = (priority: string) => {
                  switch (priority) {
                    case "Critical":
                      return { dot: "bg-error", label: "text-error", weight: "Critical" }
                    case "High":
                      return { dot: "bg-error animate-pulse", label: "text-error", weight: "High Priority" }
                    case "Normal":
                      return { dot: "bg-on-secondary-container", label: "text-on-secondary-container", weight: "Normal" }
                    default:
                      return { dot: "bg-outline-variant", label: "text-outline", weight: "Low" }
                  }
                }

                const priorityInfo = getPriorityStyle(ticket.priority)

                return (
                  <div 
                    key={ticket.id} 
                    onClick={() => toast.info(`Viewing details for ticket #${ticket.id}`)}
                    className="ticket-card bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-outline font-semibold">#{ticket.id}</span>
                        <h3 className="font-bold text-sm text-on-surface mt-0.5">{ticket.title}</h3>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 py-2 border-y border-surface-container-highest">
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                        <MapPin className="text-outline" size={14} />
                        <span>{ticket.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                        <User className="text-outline" size={14} />
                        <span>{ticket.assigned}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${priorityInfo.dot}`}></span>
                        <span className={priorityInfo.label}>{priorityInfo.weight}</span>
                      </div>
                      <span className="text-outline font-normal normal-case">Updated {ticket.updated}</span>
                    </div>
                  </div>
                )
              })
            )}
          </section>
        </main>

        {/* FAB for New Ticket */}
        <button 
          onClick={handleAddTicket}
          className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-40"
        >
          <Plus size={28} />
        </button>

        {/* BottomNavBar */}
        <BottomNav active="tickets" />
      </div>
    </RequireRole>
  )
}
