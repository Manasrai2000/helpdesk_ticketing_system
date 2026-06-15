"use client"
import React, { useState, useEffect } from 'react'
import RequireRole from '../../components/auth/RequireRole'
import BottomNav from '../../components/common/BottomNav'
import { 
  Activity, 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  PlusCircle, 
  Search 
} from 'lucide-react'

import Link from 'next/link'

export default function DispatcherPage() {
  const [totalTickets, setTotalTickets] = useState(142)

  // Simulating live data update for the total tickets card periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setTotalTickets(prev => prev + 1)
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <RequireRole allowed={["dispatcher"]}>
      <div className="max-w-[430px] mx-auto min-h-screen bg-surface pb-28 relative flex flex-col">
        {/* Top App Bar */}
        <header className="fixed top-0 w-full max-w-[430px] bg-surface border-b border-outline-variant shadow-sm z-50">
          <div className="flex justify-between items-center px-container-padding h-16 w-full">
            <div className="flex items-center gap-2">
              <Activity className="text-primary" size={24} />
              <h1 className="font-h1 text-h1 text-primary tracking-tight">FacilityFlow</h1>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-outline-variant">
              <img 
                alt="Dispatcher Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNGF9Ngi75NHMKlRL1wnGAx4nwcSM4H43xKRP1ZvvexDdFsw3KQHc3lD7zM8kleR27NcX4FuvlbelVlE9AWG6zCXH4MZTTn4B-cnacePB-VxlsTxWu0s7dNPux9bQ7ABSazvO5FFlO57uAqVozX0RwgbAaIzg2D6HjDIYFfofXRms-16XZCL4ZBeULwbS-f_ngtczo5edUis89dg_wvbwFbLol9PtVVRmrofAevm0L3lN1JZXy1299IZeB7FfCBLEW6fQeag9kT88"
              />
            </div>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="mt-20 px-container-padding flex-grow flex flex-col gap-6">
          {/* Dashboard Header */}
          <section>
            <h2 className="font-h2 text-h2 text-on-surface">Dispatcher Overview</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time facility operations status</p>
          </section>

          {/* Metrics Grid (Bento Style) */}
          <section className="grid grid-cols-2 gap-card-gap">
            {/* Total Tickets */}
            <div className="col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-shadow flex justify-between items-center transition-transform duration-200 active:scale-95">
              <div>
                <p className="font-label-sm text-xs text-on-surface-variant mb-1">Total Tickets</p>
                <p className="font-h1 text-h1 text-primary transition-all duration-300">{totalTickets}</p>
              </div>
              <div className="p-2 bg-primary-fixed rounded-lg">
                <LayoutDashboard className="text-primary" size={20} />
              </div>
            </div>

            {/* New */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-shadow transition-transform duration-200 active:scale-95">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <p className="font-label-sm text-xs text-on-surface-variant">New</p>
              </div>
              <p className="font-h2 text-h2 text-on-surface">12</p>
            </div>

            {/* Assigned */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-shadow transition-transform duration-200 active:scale-95">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <p className="font-label-sm text-xs text-on-surface-variant">Assigned</p>
              </div>
              <p className="font-h2 text-h2 text-on-surface">48</p>
            </div>

            {/* In Progress */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-shadow transition-transform duration-200 active:scale-95">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <p className="font-label-sm text-xs text-on-surface-variant">In Progress</p>
              </div>
              <p className="font-h2 text-h2 text-on-surface">34</p>
            </div>

            {/* Verification Pending */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-shadow transition-transform duration-200 active:scale-95">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                <p className="font-label-sm text-xs text-on-surface-variant">Verification</p>
              </div>
              <p className="font-h2 text-h2 text-on-surface">18</p>
            </div>

            {/* Closed Today */}
            <div className="col-span-2 bg-emerald-50 border border-emerald-100 rounded-xl p-4 card-shadow flex justify-between items-center">
              <div>
                <p className="font-label-sm text-xs text-emerald-700 mb-1">Closed Today</p>
                <p className="font-h2 text-h2 text-emerald-900">30</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircle2 className="text-emerald-700" size={20} />
              </div>
            </div>
          </section>

          {/* Priority Tickets */}
          <section className="flex flex-col gap-3">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-h3 text-h3 text-on-surface">Priority Tickets</h3>
              <button className="text-primary font-label-sm text-xs hover:underline">View All</button>
            </div>
            
            <div className="flex flex-col gap-card-gap">
              {/* Priority Card 1 */}
              <Link href="/dispatcher/tickets/WO-8821">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-shadow transition-all duration-200 hover:border-primary/20 active:scale-[0.98]">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded-full uppercase tracking-wider">Critical</span>
                    <span className="font-mono-sm text-mono-sm text-on-surface-variant">#WO-8821</span>
                  </div>
                  <h4 className="font-label-md text-sm text-on-surface font-semibold mb-1">HVAC Failure - Data Center B</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-normal mb-3">Ambient temperature exceeding 28°C. Immediate dispatch required.</p>
                  <div className="flex items-center gap-4 border-t border-outline-variant pt-2 mt-2 text-on-surface-variant text-xs">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>12m ago</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>Zone 4</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Priority Card 2 */}
              <Link href="/dispatcher/tickets/WO-8819">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-shadow transition-all duration-200 hover:border-primary/20 active:scale-[0.98]">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded-full uppercase tracking-wider">High</span>
                    <span className="font-mono-sm text-mono-sm text-on-surface-variant">#WO-8819</span>
                  </div>
                  <h4 className="font-label-md text-sm text-on-surface font-semibold mb-1">Main Elevator Malfunction</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-normal mb-3">Elevator 3 stuck on Floor 12. No passengers reported inside.</p>
                  <div className="flex items-center gap-4 border-t border-outline-variant pt-2 mt-2 text-on-surface-variant text-xs">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>45m ago</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>Tower A</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-4">
            <h3 className="font-h3 text-h3 text-on-surface mb-3">Quick Dispatch</h3>
            <div className="grid grid-cols-2 gap-card-gap">
              <button className="flex flex-col items-center justify-center p-4 bg-primary text-on-primary rounded-xl gap-2 transition-transform active:scale-95 shadow-sm">
                <PlusCircle size={24} />
                <span className="font-semibold text-sm">New Order</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-surface-container-lowest border border-outline-variant text-on-surface rounded-xl gap-2 transition-transform active:scale-95 shadow-sm hover:bg-surface-container-low">
                <Search size={24} />
                <span className="font-semibold text-sm">Find Tech</span>
              </button>
            </div>
          </section>
        </main>

        <BottomNav active="home" />
      </div>
    </RequireRole>
  )
}
