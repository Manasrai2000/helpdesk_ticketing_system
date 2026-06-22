"use client"
import React from 'react'
import Link from 'next/link'
import RequireRole from '../../components/auth/RequireRole'
import BottomNav from '../../components/common/BottomNav'
import { 
  Users, 
  Wrench, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Star,
  MoreVertical,
  Bell,
  LayoutDashboard,
  Ticket,
  MoreHorizontal,
  Settings
} from 'lucide-react'

export default function AdminPage() {
  return (
    <RequireRole allowed={["admin"]}>
      <div className="bg-background text-on-surface min-h-screen pb-24 relative flex flex-col">
        {/* TopAppBar */}
        <header className="w-full sticky top-0 z-50 bg-surface border-b border-surface-container-highest shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between px-container-padding h-16 w-full max-w-screen-xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-outline-variant">
                <img 
                  alt="Admin Profile Photo" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmQo8ExruT7jZvCYAnVuFyk34ZGi3ONybFlrIvVQlk1gXzose9TCHkGxv-zxnErVtNnxcTa0NJezAxuINS-CmxkiYZdokaMmIQrVsiRBMtfstPoJ0xVgRsZweIkfvNbK86L0zM6Pj4wiwZ0rO02YmqBIw0RxAQd5WUqN70-r8J835Jn8i5-9-APRVKUdtP32_HywXWB5nASYpq-q4NARPxIQPfw4CaJmP67K4wSEc_goZfpdkKJoOWY2J7azGk2S1RPoggoj1OGB8"
                />
              </div>
              <h1 className="font-h1 text-h1 text-on-surface tracking-tight">FacilityFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-primary hover:bg-surface-container-low p-2 rounded-full transition-colors active:scale-95">
                <Bell size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-screen-xl w-full mx-auto px-container-padding pt-6 flex-grow flex flex-col gap-8 pb-12">
          {/* Operations Overview Title */}
          <section>
            <h2 className="font-h2 text-h2 mb-4">Operations Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-card-gap">
              {/* Total Customers */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm transition-transform active:scale-95 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                    <Users size={16} className="text-on-surface-variant" />
                    <span className="font-label-sm text-xs font-semibold">Customers</span>
                  </div>
                  <div className="font-h1 text-h1">1,240</div>
                </div>
                <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-3">
                  <TrendingUp size={12} /> +12%
                </div>
              </div>

              {/* Total Technicians */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm transition-transform active:scale-95 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                    <Wrench size={16} className="text-on-surface-variant" />
                    <span className="font-label-sm text-xs font-semibold">Technicians</span>
                  </div>
                  <div className="font-h1 text-h1">45</div>
                </div>
                <div className="text-[10px] text-on-surface-variant font-semibold flex items-center gap-1 mt-3">
                  <CheckCircle2 size={12} className="text-emerald-600" /> 8 Active
                </div>
              </div>

              {/* Total Dispatchers */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm transition-transform active:scale-95 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                    <UserCheck size={16} className="text-on-surface-variant" />
                    <span className="font-label-sm text-xs font-semibold">Dispatchers</span>
                  </div>
                  <div className="font-h1 text-h1">12</div>
                </div>
                <div className="text-[10px] text-on-surface-variant font-semibold flex items-center gap-1 mt-3">
                  <Clock size={12} /> 24/7 Coverage
                </div>
              </div>

              {/* Open Tickets */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm transition-transform active:scale-95 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                    <Ticket size={16} className="text-error" />
                    <span className="font-label-sm text-xs font-semibold">Open</span>
                  </div>
                  <div className="font-h1 text-h1">34</div>
                </div>
                <div className="text-[10px] text-error font-bold flex items-center gap-1 mt-3">
                  <AlertCircle size={12} /> 5 Critical
                </div>
              </div>

              {/* Closed Tickets */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm transition-transform active:scale-95 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span className="font-label-sm text-xs font-semibold">Closed</span>
                  </div>
                  <div className="font-h1 text-h1">892</div>
                </div>
                <div className="text-[10px] text-on-surface-variant font-semibold mt-3">This month</div>
              </div>

              {/* Avg. Resolution */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm transition-transform active:scale-95 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                    <Clock size={16} className="text-on-surface-variant" />
                    <span className="font-label-sm text-xs font-semibold">Avg. Res.</span>
                  </div>
                  <div className="font-h1 text-h1">4.2h</div>
                </div>
                <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-3">
                  <TrendingDown size={12} /> -15m
                </div>
              </div>
            </div>
          </section>

          {/* Visual Data (2 columns on large screens) */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tickets by Department */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="font-h3 text-h3 text-on-surface">Tickets by Department</h3>
                <button className="text-outline hover:text-primary transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {/* HVAC */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-on-surface">
                    <span>HVAC</span>
                    <span>342</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                {/* Electrical */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-on-surface">
                    <span>Electrical</span>
                    <span>210</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-container rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
                {/* Plumbing */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-on-surface">
                    <span>Plumbing</span>
                    <span>185</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-on-secondary-fixed-variant rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
                {/* Cleaning */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-on-surface">
                    <span>Cleaning</span>
                    <span>155</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-outline-variant rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tickets by Priority */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="font-h3 text-h3 text-on-surface">Tickets by Priority</h3>
                <span className="px-3 py-1 bg-surface-container text-[10px] font-bold rounded-full text-on-surface-variant uppercase">
                  Weekly
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
                {/* Circular Gauge simulation */}
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-surface-container-high" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="12"></circle>
                    <circle className="text-error" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="200" strokeLinecap="round" strokeWidth="12"></circle>
                    <circle className="text-primary" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="150" strokeLinecap="round" strokeWidth="12" style={{ transformOrigin: '50% 50%', transform: 'rotate(80deg)' }}></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-h2 text-lg font-bold text-on-surface">1,271</span>
                    <span className="text-[9px] text-outline font-bold uppercase tracking-wider">Total</span>
                  </div>
                </div>
                {/* Legend */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 w-full max-w-[180px]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <span className="text-xs font-semibold text-on-surface-variant flex-grow">Urgent</span>
                    <span className="font-mono text-xs text-on-surface">12%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-xs font-semibold text-on-surface-variant flex-grow">High</span>
                    <span className="font-mono text-xs text-on-surface">28%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
                    <span className="text-xs font-semibold text-on-surface-variant flex-grow">Medium</span>
                    <span className="font-mono text-xs text-on-surface">45%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                    <span className="text-xs font-semibold text-on-surface-variant flex-grow">Low</span>
                    <span className="font-mono text-xs text-on-surface">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Top Performance Technicians */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-h2 text-h2 text-on-surface">Top Performance: Technicians</h2>
              <button className="text-primary font-semibold text-xs hover:underline">View All</button>
            </div>
            <div className="flex flex-col gap-3">
              {/* Tech 1 */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between shadow-sm hover:translate-y-[-2px] transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                    <img 
                      alt="Marcus Sterling" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVA6tBzWVqVFgNHwa6jr4fZmYNeIggq6fX_4JNF7VnI9LaV4wp2bcmkSVgz9Mh2WZjx_JWLQXOCW1T9oJmjBaWwlUuIyFTsoWUY37Q8StL6mm84ckjcxe-7ctxaxYcx-3aYZF65GKpf08FFp6dIEi_QUl0NtnMYUnaWjRqMIV-jMZoPP_4Y-uwly8A1OY-bWflvprKl1yhnFSFQdDCO9o0AWAEmu26XePEsaQgP9ynWVP1ahjUspPLZfMU_nxuSYR33k8YuikGPtA"
                    />
                  </div>
                  <div>
                    <h4 className="font-h3 text-sm font-bold text-on-surface">Marcus Sterling</h4>
                    <p className="text-xs text-on-surface-variant">Lead HVAC Specialist</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold text-sm text-on-surface">142</div>
                    <div className="text-[10px] text-outline font-semibold">Tickets</div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-bold border border-emerald-100">
                    <Star size={12} className="fill-emerald-600" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>

              {/* Tech 2 */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between shadow-sm hover:translate-y-[-2px] transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                    <img 
                      alt="Elena Rodriguez" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmeNNsr5MuAVkaxNLnRSGQ6jNZ9Ri9Vg2XEXut4M9XIZt84raXNKfx-AlBLv7nQDCEmCvJE4dRCO0MdHoaIq8uuzyq6IMhki1bXBTRJtUNT1xAdi2tRToeIAUuRaYH2dN0Q0M7_X1qrux-hEPvOXMY22JokV5ffz3F6UCUUnNwn6ENI9dtoq8Y3fQ_eZAm-bzQ25omTLWrdb_IKZbIiMj1mziAx6J83s72WfmEV9dYIQkctgRe38Wri2vIFQzSRW03UQabJ007zHA"
                    />
                  </div>
                  <div>
                    <h4 className="font-h3 text-sm font-bold text-on-surface">Elena Rodriguez</h4>
                    <p className="text-xs text-on-surface-variant">Master Electrician</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold text-sm text-on-surface">128</div>
                    <div className="text-[10px] text-outline font-semibold">Tickets</div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-bold border border-emerald-100">
                    <Star size={12} className="fill-emerald-600" />
                    <span>4.8</span>
                  </div>
                </div>
              </div>

              {/* Tech 3 */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between shadow-sm hover:translate-y-[-2px] transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                    <img 
                      alt="David Chen" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8ZEN9fKuBbpLl1FWA56weTamK0Te3U5pDa-IMrl-ny6XF3zRkmDrRfvKanIEUW7aZfhKtfAwTSXJ00iYFnzKfgYIkzOMxvxaSD-00nNLERx1TxrvONH00wgCXHfnLtMXX8ziALGTox3d4diE8kvlOG_oZSiGnoX3kuBR7v_2uC1WFUi9pFJdIWUespfPY6dnvu2EfuZlr8zeVy7OFEOKqrZcpw8_cH_GFUOS1GcO1Kx-_TqlluU6pPYwuDqttyeVrftK6Pp5nXqo"
                    />
                  </div>
                  <div>
                    <h4 className="font-h3 text-sm font-bold text-on-surface">David Chen</h4>
                    <p className="text-xs text-on-surface-variant">Senior Plumbing</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold text-sm text-on-surface">115</div>
                    <div className="text-[10px] text-outline font-semibold">Tickets</div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-bold border border-emerald-100">
                    <Star size={12} className="fill-emerald-600" />
                    <span>4.7</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* BottomNavBar */}
        <BottomNav active="home" />

        {/* Desktop Side Navigation */}
        <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-4 bg-surface-container-lowest border border-outline-variant p-3 rounded-2xl shadow-xl z-50">
          <Link href="/admin" className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg active:scale-95 transition-all">
            <LayoutDashboard size={22} />
          </Link>
          <Link href="/admin/users" className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-all active:scale-95 text-on-surface-variant">
            <Users size={22} />
          </Link>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-all active:scale-95 text-on-surface-variant">
            <Ticket size={22} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-all active:scale-95 text-on-surface-variant">
            <Settings size={22} />
          </button>
        </div>
      </div>
    </RequireRole>
  )
}
