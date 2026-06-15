"use client"
import React, { useState, useEffect } from 'react'
import TopBar from '../../../components/common/TopBar'
import BottomNav from '../../../components/common/BottomNav'
import { Search, SlidersHorizontal } from 'lucide-react'
import TicketList from '../../../components/tickets/TicketList'
import Link from 'next/link'
import RequireRole from '../../../components/auth/RequireRole'

function TicketsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get('tab')
      if (tabParam === 'closed' || tabParam === 'active') {
        setActiveTab(tabParam)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center">
      <TopBar title="My Tickets" />
      <main className="w-full max-w-[430px] flex-1 pb-24 px-container-padding">
        <div className="pt-6 pb-4">
          <h2 className="font-h1 text-h1 text-on-background mb-4">My Tickets</h2>
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={20} />
              <input className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-body-sm transition-all" placeholder="Search tickets..." type="text" />
            </div>
            <button className="p-2 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-high transition-colors active:scale-95">
              <SlidersHorizontal size={18} />
            </button>
          </div>

          <div className="bg-surface-container p-1 rounded-lg flex w-full mb-6">
            <button 
              onClick={() => setActiveTab('active')} 
              className={`flex-1 py-1.5 text-label-md font-label-md rounded-[6px] transition-all ${activeTab === 'active' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-secondary hover:text-primary'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setActiveTab('closed')} 
              className={`flex-1 py-1.5 text-label-md font-label-md rounded-[6px] transition-all ${activeTab === 'closed' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-secondary hover:text-primary'}`}
            >
              Closed
            </button>
          </div>
        </div>

        <TicketList tab={activeTab} />

      </main>
      <Link href="/customer/tickets/new" className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40">
        <span className="sr-only">New ticket</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </Link>
      <BottomNav active="tickets" />
    </div>
  )
}

export default function TicketsRoute() {
  return (
    <RequireRole allowed={["customer"]}>
      <TicketsPage />
    </RequireRole>
  )
}
