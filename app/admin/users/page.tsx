"use client"
import React, { useState } from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import BottomNav from '../../../components/common/BottomNav'
import { 
  Search, 
  Users, 
  Wrench, 
  UserCheck, 
  ChevronRight, 
  Plus, 
  Bell,
  Trash2,
  Lock,
  UserPlus
} from 'lucide-react'
import { toast } from 'sonner'

const INITIAL_CUSTOMERS = [
  { id: "cust-1", name: "Sarah Jenkins", role: "Global Logistics Corp", status: "Active", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzHG7z1eQdBKWoBpWVkCj21UdyW8jHIj-vmyi9vV2E628mp-q_xnBE-wSDbmph4SHaCZtaLYwcE6kT_4kms7M80FtfbXaBPfFIcqKa0ZLg2n87MHpo2dpAo_oZ3Z-8nGbgT2xWkZrCfE_tXOKSN1SaQ5S2_g1odE69l4uVtWd6f5VvQfZTJA57KkyMem-R14lBoUgwclsnJzNrNtD1o5OuKaqT__8UWjyPWMlISwb09CRkF5DXJgicaChXx1bDqVKQgNExzKRhYYg" },
  { id: "cust-2", name: "John Doe", role: "Office 202 Tenant", status: "Active", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmeNNsr5MuAVkaxNLnRSGQ6jNZ9Ri9Vg2XEXut4M9XIZt84raXNKfx-AlBLv7nQDCEmCvJE4dRCO0MdHoaIq8uuzyq6IMhki1bXBTRJtUNT1xAdi2tRToeIAUuRaYH2dN0Q0M7_X1qrux-hEPvOXMY22JokV5ffz3F6UCUUnNwn6ENI9dtoq8Y3fQ_eZAm-bzQ25omTLWrdb_IKZbIiMj1mziAx6J83s72WfmEV9dYIQkctgRe38Wri2vIFQzSRW03UQabJ007zHA" }
]

const INITIAL_TECHNICIANS = [
  {
    id: "tech-1",
    name: "Alex Rivera",
    role: "Lead Technician",
    status: "Active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlZ1ezeRKg-dPWDTocfgtP2oQqOeQYr1gCH0NV4KnmzwCL0389Q_WKIMn80Wr44tvcYJxjztrnW3Azbkh7XXy7U4JyzMvOe4u95Ja3fp9si2gSagPFWJPfWsVdER8P0ef6ILkrsi61TBM1EJs6WAie2EjjUEWoCwHFjbtAF0BKc5EMpID-SNo5nuRjwBfKpD2QEu6Pc-taNGWFVxj26d9vA8_S4MNbQSpL_ggCUQAxilQYuiu7O7N6xoqlACyrSV8qGJY7Bmrc0lQ"
  },
  {
    id: "tech-2",
    name: "Jordan Smith",
    role: "HVAC Specialist",
    status: "Active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-5ErszVqFfm5VFRrW6AQ7ymd8aC8Gk91C1SLMxOOn8Qn9tXexZIWrs1-b8SpriUjePlfyEb-11aYFL9IgHSQi_IKPhyCw85PiX47gVhswrLeBeAeSfmRCS43wcnpjP8gt7VDEKvkJYyRTmhj4o-w2gSzff9kwGVeFEGrlgYC8vpS-_cD8fcVEqnPQgvbiaeFXsBavZaprjFBW0vQ4ZMRTQVfNjLACk6NmpksJIbRtNpgcFspByfKL6XrsgDnUBLaWhMbU2cnVsFc"
  },
  {
    id: "tech-3",
    name: "Casey Valdes",
    role: "Junior Technician",
    status: "Suspended",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQsjmOo2584auLnkwfkdbTBswrRYYSgl9pJ4mGoTgMnc3yt-gRCyu3iKizxC6N4368wfXI8xHGmsliCDKBJ2jb7xJb8qnQ8qpVW08c8NwlJdofmrB4d3kJXaFWXuU43vn59DIHGh8wI4YDjdw0H11sLSke4SFtIlO58-h36LyQSKYHlukGajxi9bKST5pJTmyuH4Ga-Md0QGaTcsQMrXhMR5VU8LxektRXDdfNmJRFtxE9qvRXHgf1bZJXC3LrAyydHsVm7-uvyd0"
  }
]

const INITIAL_DISPATCHERS = [
  { id: "disp-1", name: "Marcus Vance", role: "Shift Operations Director", status: "Active", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLbSZ_NRfnvHpib5BvcOE77MvMq-6VeurdxhVWlwC9aJkjR2YFr_ss3itz_DjQPHd47nWtorwe1CRJV0_Di1YXn3ba2-4JoVkL9V5sJH17m-7NxgAAZy7Q4CRwZdu3begiYWeyw34mG3kGn-6Z6w-u3s_7CFTwtcVfgSRPhZFpOtoOY65q0nvnvxBd18Wle3TpCs6a9BVK9JH657H7n0ZBYQluX_d5irwxuF4D1UkdQ0_1l1xNX74-LjOdjnJ2RcKymKlFyglpk58" }
]

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<"customers" | "technicians" | "dispatchers">("technicians")
  const [searchQuery, setSearchQuery] = useState("")
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS)
  const [technicians, setTechnicians] = useState(INITIAL_TECHNICIANS)
  const [dispatchers, setDispatchers] = useState(INITIAL_DISPATCHERS)

  const handleToggleStatus = (userId: string, name: string) => {
    const toggle = (list: any[]) => 
      list.map(u => {
        if (u.id === userId) {
          const newStatus = u.status === "Active" ? "Suspended" : "Active"
          toast.success(`User ${name} is now ${newStatus}`)
          return { ...u, status: newStatus }
        }
        return u
      })

    if (activeTab === "customers") setCustomers(toggle(customers))
    if (activeTab === "technicians") setTechnicians(toggle(technicians))
    if (activeTab === "dispatchers") setDispatchers(toggle(dispatchers))
  }

  const handleAddUser = () => {
    toast.info("Invite/Add user modal triggered.")
  }

  const getFilteredUsers = () => {
    let list: any[] = []
    if (activeTab === "customers") list = customers
    if (activeTab === "technicians") list = technicians
    if (activeTab === "dispatchers") list = dispatchers

    return list.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const filteredList = getFilteredUsers()

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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKSzn8VgU1nUqFssav3BjRzfB4hsOgpws6MkILVF2QoSTd1zQG8X7vNl-PCk7N248WHx9L4J97w2yL7_0mhyNkszEZ-B-XxEIqZyPeOjkrAzINQW1SArIJl92mC8pMM27G9D0ruLzxxOUZQDFGjyLmd_nYET3JqXz0lszmpQKYAcDmk12DwSDpKv4NkVNZ83a-J3r5tkShWJNpFyi1NNevg3n80bURIADc_9ziFWGa8adv3CpC4ePwXbeDL-GXhEbzrt1H5XyIVSg"
              />
            </div>
            <h1 className="font-h1 text-h1 text-on-surface">FacilityFlow</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-all duration-200 active:scale-95">
            <Bell size={20} />
          </button>
        </header>

        {/* Main Canvas */}
        <main className="w-full px-container-padding flex-1">
          {/* Search Area */}
          <section className="pt-6 pb-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
              <input 
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 outline-none font-body-sm text-on-surface text-sm" 
                placeholder={`Search ${activeTab}...`} 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </section>

          {/* Segmented Tabs */}
          <section className="mb-6">
            <div className="bg-surface-container-low p-1 rounded-xl flex items-center border border-outline-variant/30">
              <button 
                onClick={() => { setActiveTab("customers"); setSearchQuery(""); }}
                className={`flex-1 py-2 font-semibold text-xs rounded-lg transition-all ${
                  activeTab === "customers" 
                    ? "bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/10" 
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Customers
              </button>
              <button 
                onClick={() => { setActiveTab("technicians"); setSearchQuery(""); }}
                className={`flex-1 py-2 font-semibold text-xs rounded-lg transition-all ${
                  activeTab === "technicians" 
                    ? "bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/10" 
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Technicians
              </button>
              <button 
                onClick={() => { setActiveTab("dispatchers"); setSearchQuery(""); }}
                className={`flex-1 py-2 font-semibold text-xs rounded-lg transition-all ${
                  activeTab === "dispatchers" 
                    ? "bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/10" 
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Dispatchers
              </button>
            </div>
          </section>

          {/* User List */}
          <section className="space-y-3">
            <h2 className="font-label-sm text-[10px] font-bold text-outline uppercase tracking-wider px-1">
              Active {activeTab} ({filteredList.length})
            </h2>

            {filteredList.map((user) => {
              const isSuspended = user.status === "Suspended"
              return (
                <div 
                  key={user.id} 
                  className={`bg-surface-container-lowest p-4 rounded-xl border border-surface-container-highest shadow-sm flex flex-col gap-4 transition-all duration-200 hover:scale-[1.01] ${
                    isSuspended ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full overflow-hidden border border-outline-variant flex-shrink-0 ${
                        isSuspended ? "grayscale" : ""
                      }`}>
                        <img alt={user.name} className="w-full h-full object-cover" src={user.avatar} />
                      </div>
                      <div>
                        <p className="font-h3 text-sm font-bold text-on-surface">{user.name}</p>
                        <p className="text-xs text-on-surface-variant">{user.role}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isSuspended 
                        ? "bg-surface-container-highest text-outline border border-outline-variant/30" 
                        : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    }`}>
                      {user.status}
                    </span>
                  </div>

                  <div className="h-[1px] bg-surface-container-highest w-full" />

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toast.info(`Editing details for ${user.name}`)}
                        className="px-4 py-1.5 bg-primary text-on-primary rounded-lg font-bold text-xs hover:opacity-90 active:scale-95 transition-all"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(user.id, user.name)}
                        className={`px-4 py-1.5 rounded-lg border font-bold text-xs active:scale-95 transition-all ${
                          isSuspended 
                            ? "bg-primary-container text-on-primary-container border-primary-container hover:brightness-110" 
                            : "bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container-high"
                        }`}
                      >
                        {isSuspended ? "Activate" : "Suspend"}
                      </button>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )
            })}
          </section>

          {/* FAB */}
          <button 
            onClick={handleAddUser}
            className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-40"
          >
            <Plus size={28} />
          </button>
        </main>

        {/* BottomNavBar */}
        <BottomNav active="users" />
      </div>
    </RequireRole>
  )
}
