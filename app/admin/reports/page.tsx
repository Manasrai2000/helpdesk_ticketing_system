"use client"
import React, { useState } from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import BottomNav from '../../../components/common/BottomNav'
import { 
  Bell,
  Calendar,
  ChevronDown,
  TrendingUp,
  BarChart2,
  PieChart,
  Users,
  Download,
  FileText
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days")

  const handleExport = (format: 'PDF' | 'CSV', reportName: string) => {
    toast.success(`Exporting ${reportName} as ${format}...`)
  }

  const handleDatePicker = () => {
    toast.info("Date range selector triggered.")
  }

  return (
    <RequireRole allowed={["admin"]}>
      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center max-w-[430px] mx-auto pb-24 relative shadow-2xl">
        {/* TopAppBar */}
        <header className="bg-surface w-full sticky top-0 z-50 border-b border-surface-container-highest shadow-sm transition-all duration-200 flex items-center justify-between px-container-padding h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container-highest">
              <img 
                alt="Admin Profile Photo" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmQo8ExruT7jZvCYAnVuFyk34ZGi3ONybFlrIvVQlk1gXzose9TCHkGxv-zxnErVtNnxcTa0NJezAxuINS-CmxkiYZdokaMmIQrVsiRBMtfstPoJ0xVgRsZweIkfvNbK86L0zM6Pj4wiwZ0rO02YmqBIw0RxAQd5WUqN70-r8J835Jn8i5-9-APRVKUdtP32_HywXWB5nASYpq-q4NARPxIQPfw4CaJmP67K4wSEc_goZfpdkKJoOWY2J7azGk2S1RPoggoj1OGB8"
              />
            </div>
            <h1 className="font-h1 text-h1 text-on-surface">FacilityFlow</h1>
          </div>
          <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-all duration-200 active:scale-95">
            <Bell size={20} />
          </button>
        </header>

        {/* Main Content Canvas */}
        <main className="w-full flex-grow px-container-padding py-6">
          {/* Hero/Header Section */}
          <div className="mb-6 flex flex-col gap-4">
            <div>
              <h2 className="font-h2 text-xl font-bold text-primary">System Reports</h2>
              <p className="text-xs text-on-surface-variant">Analyze facility operations data</p>
            </div>
            {/* Date Picker Trigger */}
            <div 
              onClick={handleDatePicker}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 flex items-center justify-between transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Calendar className="text-primary" size={18} />
                <span className="font-semibold text-xs text-on-surface">{dateRange}</span>
              </div>
              <ChevronDown className="text-outline" size={16} />
            </div>
          </div>

          {/* Reports Bento Grid */}
          <div className="space-y-4">
            {/* Report Card 1: Ticket Performance */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 flex flex-col gap-4 shadow-sm hover:border-primary transition-all duration-200">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary-container">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">Ticket Performance</h3>
                  <p className="text-xs text-on-surface-variant">Volume & resolution trends</p>
                </div>
              </div>
              {/* Mock Chart */}
              <div className="h-24 w-full bg-surface-container-low rounded-lg flex items-end px-2 pb-2 gap-1 overflow-hidden">
                <div className="flex-1 bg-secondary-container h-[40%] rounded-t-sm animate-pulse"></div>
                <div className="flex-1 bg-secondary-container h-[65%] rounded-t-sm animate-pulse" style={{ animationDelay: '100ms' }}></div>
                <div className="flex-1 bg-primary h-[85%] rounded-t-sm"></div>
                <div className="flex-1 bg-secondary-container h-[55%] rounded-t-sm animate-pulse" style={{ animationDelay: '200ms' }}></div>
                <div className="flex-1 bg-secondary-container h-[75%] rounded-t-sm animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="flex-1 bg-secondary-container h-[45%] rounded-t-sm animate-pulse" style={{ animationDelay: '400ms' }}></div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleExport('PDF', 'Ticket Performance')}
                  className="flex-1 bg-primary text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all"
                >
                  <Download size={14} /> PDF
                </button>
                <button 
                  onClick={() => handleExport('CSV', 'Ticket Performance')}
                  className="flex-1 bg-white border border-outline-variant text-on-surface font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-surface-container-low active:scale-95 transition-all"
                >
                  <FileText size={14} /> CSV
                </button>
              </div>
            </div>

            {/* Report Card 2: Resolution Time Analysis */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 flex flex-col gap-4 shadow-sm hover:border-primary transition-all duration-200">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                  <BarChart2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">Resolution Time Analysis</h3>
                  <p className="text-xs text-on-surface-variant">Average time to close tickets</p>
                </div>
              </div>
              {/* Metric Highlights */}
              <div className="flex items-center gap-4 bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                <div className="text-center border-r border-outline-variant/30 pr-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Avg Time</p>
                  <p className="font-h2 text-base font-bold text-primary">4.2h</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Improvement</p>
                  <p className="font-h2 text-base font-bold text-emerald-600">-12%</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleExport('PDF', 'Resolution Time')}
                  className="flex-1 bg-primary text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all"
                >
                  <Download size={14} /> PDF
                </button>
                <button 
                  onClick={() => handleExport('CSV', 'Resolution Time')}
                  className="flex-1 bg-white border border-outline-variant text-on-surface font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-surface-container-low active:scale-95 transition-all"
                >
                  <FileText size={14} /> CSV
                </button>
              </div>
            </div>

            {/* Report Card 3: Technician Productivity */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 flex flex-col gap-4 shadow-sm hover:border-primary transition-all duration-200">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">Technician Productivity</h3>
                  <p className="text-xs text-on-surface-variant">Individual performance metrics</p>
                </div>
              </div>
              {/* Leaderboard */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-on-surface">
                    <span>Sarah Johnson</span>
                    <span className="text-primary font-bold">124 Done</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-on-surface">
                    <span>Marcus Chen</span>
                    <span className="text-primary font-bold">98 Done</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleExport('PDF', 'Tech Productivity')}
                  className="flex-1 bg-primary text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all"
                >
                  <Download size={14} /> PDF
                </button>
                <button 
                  onClick={() => handleExport('CSV', 'Tech Productivity')}
                  className="flex-1 bg-white border border-outline-variant text-on-surface font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-surface-container-low active:scale-95 transition-all"
                >
                  <FileText size={14} /> CSV
                </button>
              </div>
            </div>

            {/* Report Card 4: Department Analysis */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 flex flex-col gap-4 shadow-sm hover:border-primary transition-all duration-200">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                  <PieChart size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">Department Analysis</h3>
                  <p className="text-xs text-on-surface-variant">Ticket distribution across teams</p>
                </div>
              </div>
              {/* Distribution graphic */}
              <div className="flex gap-1 h-3 rounded-full overflow-hidden w-full bg-surface-container-high">
                <div className="bg-primary w-[45%]"></div>
                <div className="bg-secondary-container w-[25%]"></div>
                <div className="bg-tertiary-fixed w-[15%]"></div>
                <div className="bg-outline-variant w-[15%]"></div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <span>HVAC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-container"></div>
                  <span>Elec</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed"></div>
                  <span>Plumb</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleExport('PDF', 'Dept Analysis')}
                  className="flex-1 bg-primary text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all"
                >
                  <Download size={14} /> PDF
                </button>
                <button 
                  onClick={() => handleExport('CSV', 'Dept Analysis')}
                  className="flex-1 bg-white border border-outline-variant text-on-surface font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-surface-container-low active:scale-95 transition-all"
                >
                  <FileText size={14} /> CSV
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* BottomNavBar */}
        <BottomNav active="more" />
      </div>
    </RequireRole>
  )
}
