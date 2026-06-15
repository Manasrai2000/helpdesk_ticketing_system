"use client"
import React, { useState } from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import BottomNav from '../../../components/common/BottomNav'
import { 
  Activity, 
  Search, 
  User, 
  DoorOpen, 
  ArrowRight, 
  Plus 
} from 'lucide-react'
import { toast } from 'sonner'

import Link from 'next/link'

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
  }
]

export default function DispatcherQueuePage() {
  const [activeFilter, setActiveFilter] = useState("New")
  const [searchQuery, setSearchQuery] = useState("")

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

  const handleAssign = (ticketId: string) => {
    toast.success(`Assigning ticket ${ticketId}...`)
  }

  return (
    <RequireRole allowed={["dispatcher"]}>
      <div className="bg-background text-on-background min-h-screen pb-28 max-w-[430px] mx-auto flex flex-col relative">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full max-w-[430px] bg-surface border-b border-outline-variant shadow-sm z-50 flex justify-between items-center px-container-padding h-16">
          <div className="flex items-center gap-2 transition-transform duration-200 active:scale-95">
            <Activity className="text-primary" size={24} />
            <h1 className="font-h1 text-h1 text-primary tracking-tight">FacilityFlow</h1>
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
          <div className="mb-6 overflow-x-auto flex gap-2 pb-2 scrollbar-none">
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

          {/* Ticket List */}
          <div className="flex flex-col gap-card-gap">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant text-sm italic">
                No tickets in this category
              </div>
            ) : (
              filteredTickets.map(ticket => (
                <Link key={ticket.id} href={`/dispatcher/tickets/${ticket.id}`} className="block">
                  <div 
                    className={`glass-card p-4 rounded-xl shadow-sm border-l-4 transition-all duration-200 hover:border-primary/20 active:scale-[0.98] ${
                      ticket.priority === 'Urgent' 
                        ? 'border-l-red-600' 
                        : ticket.priority === 'Medium'
                        ? 'border-l-blue-400'
                        : 'border-l-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-outline tracking-wider uppercase">{ticket.id}</span>
                        <h3 className="font-h3 text-base text-on-surface mt-1 font-semibold">{ticket.title}</h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded-lg font-bold text-[10px] uppercase tracking-wider ${
                        ticket.priority === 'Urgent' 
                          ? 'bg-red-100 text-red-800' 
                          : ticket.priority === 'Medium'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-on-surface-variant">
                      <div className="flex items-center gap-1">
                        <User size={14} className="text-outline" />
                        <span>{ticket.reporter}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DoorOpen size={14} className="text-outline" />
                        <span>{ticket.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center text-xs font-medium">
                      <span className="text-outline">{ticket.createdText}</span>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleAssign(ticket.id)
                        }}
                        className="text-primary font-semibold flex items-center gap-1 hover:underline"
                      >
                        Assign <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}

            {/* Aesthetic Background / Info banner */}
            <div className="relative overflow-hidden rounded-2xl h-32 w-full mt-6 bg-gradient-to-br from-primary-container to-secondary-container bg-opacity-10 border border-outline-variant/30 flex items-center justify-center p-4">
              <div className="text-center relative z-10">
                <p className="font-semibold text-sm text-on-surface-variant">7 new tickets pending triage</p>
                <p className="text-xs text-outline mt-0.5">Peak workload expected in 2 hours</p>
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
      </div>
    </RequireRole>
  )
}
