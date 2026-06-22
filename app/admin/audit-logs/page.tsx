"use client"
import React, { useState } from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import BottomNav from '../../../components/common/BottomNav'
import { 
  Bell,
  Search,
  ChevronDown,
  Clock,
  Shield,
  FileText,
  User,
  Key
} from 'lucide-react'

const INITIAL_LOGS = [
  {
    id: "log-1",
    user: "Admin",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_JI-MQ6UAYvOS7zmIq-xBaoxH-_CLRqs3eEJ6NCI3IxWMGRa-LkKFByJPJqLO5EOuw8ZhVLbFXFue6v19J5Nxg0H597WUFYfpWLp0iHAg_RVbzRv6P_NkRc6EZqfJD11d7OZ2hr-IfFynwrUPdvzQfmO25g3ySBv6szliKMi3nGuCcBGI3Rq2mXFVNQ98oOZcHAgLbRxE9wY6BoO9lZb5ke2-jjLyJMEz05_Rky85UdU7c9mRp81cG5MHXYehZtr60kf5o2ejVMw",
    time: "2m ago",
    description: "Ticket #FC-9012 reassigned to Sarah Chen",
    tags: ["Ticket", "Update"],
    role: "Admin",
    type: "Tickets"
  },
  {
    id: "log-2",
    user: "Alex Rivera",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMUE9vuSeRUhXE04t8xRJ7BIUNOZqvXGNNoRX7stUByV7FnI4Cjf49B6bbJhGcVyXGkiXo6SyUaau5dJHR17V9XQMeQjWwugnAsiiJO9Eh0GCP4G9h3fCq23eH6837lHnCZnfeBIuy3hERPmMZudJ-jkdVE0QigpS61iEk5tXwSY_CQzE1VFPiwfTdBtMUOukrf6tI78KUTONJGCXhNNS2snp4qHXZSsZDYt8995rDMDNbY61r-F9UHrtNy7aYbAvkQBglXetOhmU",
    time: "15m ago",
    description: "Technician Alex Rivera logged into the system",
    tags: ["Security", "Auth"],
    role: "Technician",
    type: "System"
  },
  {
    id: "log-3",
    user: "Admin",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3t2BA-1ZWKgArip3Fhm9JLXvfiUEtPFeCeRyGRMyBJPOtSRrkbgbVcAG8l2ezNF4mIxHMnQdtyBKqhSZREn3wSZnmGgpsoJSGyrbvVi8Ldvk3EXj-oUCdnfTLxGBQ2YU7ufoQF-BpcVu-ElBuDDwIBOiQmHyMbxwVQVSzJ9M_4dPPD83RRVJjLSZlmTUl6BETdxQPrfcB9pUr9unKdxoZ8w48-bbxFJQPYMuSmPIsFI2c2F20RhQaNesMCVMVZbkGGvYD1UH8AR0",
    time: "1h ago",
    description: "New Category [Security] added to system settings",
    tags: ["Config", "System"],
    role: "Admin",
    type: "System"
  },
  {
    id: "log-4",
    user: "System Process",
    avatar: "",
    time: "2h ago",
    description: "Ticket #FC-8821 status changed to Closed",
    tags: ["Status Change"],
    role: "System",
    type: "Tickets"
  },
  {
    id: "log-5",
    user: "Jordan Smith",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAEly-OU_KA3xor-SxSsrXnW67z6MCmcOwndzC0hTC7dxzj5IMgRGI0heCfP4tTmG17TogfTjPqnvYJNak-LOe1AXJO631mZSf5jKwuYhvwVfNpbdCfKT7-sk5qYVkC_JCNgFkoo2RWOPCh6lih58BrB-5coSkd8q5KzTLrrANmTk6dXysN6hS4ReWShvBwV2SelAPLh7wBbs9vbqmyPYfZViGhkYX6AVJARLYSGQRFjzWR-ADjCfqGijptNkOQnO_XYgW7u3ugEI",
    time: "4h ago",
    description: "Updated billing information for Vendor: North Star Electrics",
    tags: ["Vendor", "Billing"],
    role: "Technician",
    type: "System"
  }
]

export default function AdminAuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("Today")
  const [selectedRole, setSelectedRole] = useState("All Roles")
  const [selectedType, setSelectedType] = useState("All Types")

  // Filter logs logic
  const filteredLogs = INITIAL_LOGS.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesRole = 
      selectedRole === "All Roles" || 
      log.role.toLowerCase() === selectedRole.toLowerCase()

    const matchesType = 
      selectedType === "All Types" || 
      log.type.toLowerCase() === selectedType.toLowerCase()

    return matchesSearch && matchesRole && matchesType
  })

  return (
    <RequireRole allowed={["admin"]}>
      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center max-w-[430px] mx-auto pb-24 relative shadow-2xl">
        {/* TopAppBar */}
        <header className="w-full sticky top-0 z-50 bg-surface border-b border-surface-container-highest shadow-sm h-16 flex items-center justify-between px-container-padding transition-all duration-200">
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
        <main className="w-full px-container-padding py-6 flex-grow">
          {/* Section title */}
          <div className="mb-6">
            <h2 className="font-h2 text-xl font-bold text-on-surface">Audit Logs</h2>
            <p className="text-xs text-on-surface-variant">Review immutable system event history</p>
          </div>

          {/* Search & Filter Controls */}
          <section className="space-y-4 mb-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
              <input 
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all font-body-sm text-xs outline-none shadow-sm text-on-surface" 
                placeholder="Search audit logs..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[9px] uppercase tracking-wider text-on-surface-variant px-1">Date Range</label>
                <div className="relative">
                  <select 
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-2 pl-2 pr-6 font-semibold text-[11px] appearance-none focus:ring-1 focus:ring-primary outline-none text-on-surface"
                  >
                    <option value="Today">Today</option>
                    <option value="7 Days">7 Days</option>
                    <option value="30 Days">30 Days</option>
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline" size={12} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[9px] uppercase tracking-wider text-on-surface-variant px-1">User Role</label>
                <div className="relative">
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-2 pl-2 pr-6 font-semibold text-[11px] appearance-none focus:ring-1 focus:ring-primary outline-none text-on-surface"
                  >
                    <option value="All Roles">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Technician">Technician</option>
                    <option value="System">System</option>
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline" size={12} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[9px] uppercase tracking-wider text-on-surface-variant px-1">Action Type</label>
                <div className="relative">
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-2 pl-2 pr-6 font-semibold text-[11px] appearance-none focus:ring-1 focus:ring-primary outline-none text-on-surface"
                  >
                    <option value="All Types">All Types</option>
                    <option value="Tickets">Tickets</option>
                    <option value="System">System</option>
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline" size={12} />
                </div>
              </div>
            </div>
          </section>

          {/* Audit Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-surface-container-highest" />

            <div className="space-y-6 relative">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-12 text-on-surface-variant/60 font-semibold text-sm pl-10">
                  No logs found matching filters.
                </div>
              ) : (
                filteredLogs.map((log) => {
                  const isSecurity = log.tags.includes("Security")
                  const isSystem = log.role === "System"
                  
                  return (
                    <div key={log.id} className="relative pl-10 group">
                      {/* Timeline Dot */}
                      <div className={`absolute left-[16px] top-2.5 w-[10px] h-[10px] rounded-full border-2 border-surface z-10 transition-transform group-hover:scale-125 ${
                        isSecurity ? "bg-outline" : isSystem ? "bg-error" : "bg-primary"
                      }`} />

                      <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-4 shadow-sm hover:border-outline-variant transition-all duration-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-secondary-container flex items-center justify-center flex-shrink-0 border border-outline-variant/10">
                              {log.avatar ? (
                                <img alt={log.user} className="w-full h-full object-cover" src={log.avatar} />
                              ) : (
                                <Shield className="text-on-secondary-container" size={12} />
                              )}
                            </div>
                            <span className="font-semibold text-xs text-on-surface">{log.user}</span>
                          </div>
                          <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase">{log.time}</span>
                        </div>
                        <p className="text-xs text-on-surface mb-3 leading-relaxed">
                          {log.description}
                        </p>
                        <div className="flex gap-1.5 flex-wrap">
                          {log.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                tag === "Ticket" || tag === "Status Change"
                                  ? "bg-secondary-container text-on-secondary-container"
                                  : "bg-surface-container-high text-on-surface-variant"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </main>

        {/* BottomNavBar */}
        <BottomNav active="more" />
      </div>
    </RequireRole>
  )
}
