"use client"
import React from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import BottomNav from '../../../components/common/BottomNav'
import { 
  Mail, 
  Phone, 
  Info, 
  FileText, 
  Lock, 
  LogOut, 
  ShieldAlert, 
  ChevronRight,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DispatcherProfilePage() {
  const router = useRouter()

  const handleLogout = () => {
    try {
      localStorage.removeItem('role')
    } catch (e) {}
    router.push('/login')
  }

  return (
    <RequireRole allowed={["dispatcher"]}>
      <div className="bg-background text-on-background min-h-screen pb-24 max-w-[430px] mx-auto flex flex-col relative">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full max-w-[430px] z-50 bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center px-container-padding h-16">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">precision_manufacturing</span>
            <h1 className="font-h1 text-h1 text-primary tracking-tight">FacilityFlow</h1>
          </div>
          <span className="text-xs bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Dispatcher
          </span>
        </header>

        {/* Content Canvas */}
        <main className="flex-grow pt-20 px-container-padding flex flex-col gap-6">
          {/* Header Card */}
          <section className="flex flex-col items-center text-center gap-4 mt-2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-outline-variant overflow-hidden shadow-sm bg-surface-container-low">
                <img 
                  alt="Dispatcher Avatar" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLbSZ_NRfnvHpib5BvcOE77MvMq-6VeurdxhVWlwC9aJkjR2YFr_ss3itz_DjQPHd47nWtorwe1CRJV0_Di1YXn3ba2-4JoVkL9V5sJH17m-7NxgAAZy7Q4CRwZdu3begiYWeyw34mG3kGn-6Z6w-u3s_7CFTwtcVfgSRPhZFpOtoOY65q0nvnvxBd18Wle3TpCs6a9BVK9JH657H7n0ZBYQluX_d5irwxuF4D1UkdQ0_1l1xNX74-LjOdjnJ2RcKymKlFyglpk58"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <Sparkles size={14} className="fill-white" />
              </div>
            </div>
            <div>
              <h2 className="font-h2 text-lg font-bold text-on-surface">Marcus Vance</h2>
              <p className="text-xs text-on-surface-variant font-medium flex items-center justify-center gap-1 mt-1">
                <MapPin size={12} className="text-outline" /> Operations Center • Shift A
              </p>
            </div>
          </section>

          {/* Contact Details Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-outline">Email</span>
                <div className="text-sm font-semibold text-on-surface">marcus.vance@facilityflow.com</div>
              </div>
            </div>
            <div className="h-px bg-outline-variant w-full" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-outline">Phone Extension</span>
                <div className="text-sm font-semibold text-on-surface">+1 (555) 901-4433 (Ext. 102)</div>
              </div>
            </div>
          </div>

          {/* Navigation Options */}
          <nav className="flex flex-col gap-3">
            <button className="flex items-center justify-between w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm hover:bg-surface-container-low transition-colors active:scale-[0.99]">
              <div className="flex items-center gap-3">
                <Info size={18} className="text-on-surface-variant" />
                <span className="text-xs font-semibold text-on-surface">Shift Schedules</span>
              </div>
              <ChevronRight size={16} className="text-outline" />
            </button>
            <button className="flex items-center justify-between w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm hover:bg-surface-container-low transition-colors active:scale-[0.99]">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-on-surface-variant" />
                <span className="text-xs font-semibold text-on-surface">Dispatch History Logs</span>
              </div>
              <ChevronRight size={16} className="text-outline" />
            </button>
            <button className="flex items-center justify-between w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm hover:bg-surface-container-low transition-colors active:scale-[0.99]">
              <div className="flex items-center gap-3">
                <Lock size={18} className="text-on-surface-variant" />
                <span className="text-xs font-semibold text-on-surface">Change Password</span>
              </div>
              <ChevronRight size={16} className="text-outline" />
            </button>
            
            <button 
              onClick={handleLogout} 
              className="flex items-center justify-between w-full p-4 bg-surface-container-lowest border border-error/20 rounded-xl shadow-sm hover:bg-error-container/10 transition-colors active:scale-[0.99] mt-3"
            >
              <div className="flex items-center gap-3 text-error">
                <LogOut size={18} />
                <span className="text-xs font-semibold">Logout</span>
              </div>
            </button>
          </nav>

          {/* Footer Info */}
          <footer className="text-center mt-6">
            <p className="font-mono text-[10px] text-outline">v2.4.0-prod-stable</p>
          </footer>
        </main>

        {/* BottomNavBar */}
        <BottomNav active="profile" />
      </div>
    </RequireRole>
  )
}
