"use client"
import React from 'react'
import TopBar from '../../../components/common/TopBar'
import BottomNav from '../../../components/common/BottomNav'
import RequireRole from '../../../components/auth/RequireRole'
import { Mail, Phone, Info, FileText, Lock, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

function TechnicianProfilePage() {
  const router = useRouter()

  const handleLogout = () => {
    try { localStorage.removeItem('role') } catch (e) {}
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <TopBar title="Profile" />
      <main className="w-full max-w-[430px] px-container-padding pb-32 pt-8 flex flex-col gap-6">
        <section className="flex flex-col items-center text-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-surface-container-high overflow-hidden profile-card-shadow bg-surface-container">
              <img alt="Technician" className="w-full h-full object-cover" src="https://via.placeholder.com/96" />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center border-2 border-surface profile-card-shadow active:scale-95 transition-transform">
              <Info size={16} />
            </button>
          </div>
          <div>
            <h2 className="font-h2 text-h2 text-on-background">Alex Johnson</h2>
            <div className="flex items-center justify-center gap-2 text-secondary">
              <span className="text-[16px]">Technician • Facilities</span>
            </div>
          </div>
        </section>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 profile-card-shadow flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
              <Mail size={18} />
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-secondary">Email</span>
              <div className="font-body-lg text-body-lg text-on-background">alex.johnson@facility.com</div>
            </div>
          </div>
          <div className="h-px bg-outline-variant w-full" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
              <Phone size={18} />
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-secondary">Phone</span>
              <div className="font-body-lg text-body-lg text-on-background">+1 (555) 012-3456</div>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          <button className="flex items-center justify-between w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl profile-card-shadow hover:bg-surface-container-low transition-colors active:scale-[0.99]">
            <div className="flex items-center gap-3"><Info size={18} className="text-secondary" /><span className="font-label-md text-label-md text-on-background">Certifications</span></div>
            <span className="text-outline">›</span>
          </button>
          <button className="flex items-center justify-between w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl profile-card-shadow hover:bg-surface-container-low transition-colors active:scale-[0.99]">
            <div className="flex items-center gap-3"><FileText size={18} className="text-secondary" /><span className="font-label-md text-label-md text-on-background">Work History</span></div>
            <span className="text-outline">›</span>
          </button>
          <button className="flex items-center justify-between w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl profile-card-shadow hover:bg-surface-container-low transition-colors active:scale-[0.99]">
            <div className="flex items-center gap-3"><Lock size={18} className="text-secondary" /><span className="font-label-md text-label-md text-on-background">Change Password</span></div>
            <span className="text-outline">›</span>
          </button>
          <button onClick={handleLogout} className="flex items-center justify-between w-full p-4 bg-surface-container-lowest border border-error/20 rounded-xl profile-card-shadow hover:bg-error-container/30 transition-colors active:scale-[0.99] mt-3">
            <div className="flex items-center gap-3 text-error"><LogOut size={18} /><span className="font-label-md text-label-md">Logout</span></div>
          </button>
        </nav>

        <footer className="text-center mt-4">
          <p className="font-mono-sm text-mono-sm text-outline">v2.4.0-prod-stable</p>
        </footer>
      </main>
      <BottomNav active="profile" />
    </div>
  )
}

export default function TechnicianProfileRoute() {
  return (
    <RequireRole allowed={["technician"]}>
      <TechnicianProfilePage />
    </RequireRole>
  )
}
