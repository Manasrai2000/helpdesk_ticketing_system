"use client"
import React, { useState } from 'react'
import RequireRole from '../../../components/auth/RequireRole'
import BottomNav from '../../../components/common/BottomNav'
import { 
  Bell,
  ChevronRight,
  Settings,
  FolderTree,
  AlertOctagon,
  Timer,
  Sliders,
  Mail,
  MessageSquare,
  Shield,
  Key,
  Unlock,
  LogOut,
  BarChart2,
  FileText
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [pushNotifications, setPushNotifications] = useState(true)
  const [ssoConfig, setSsoConfig] = useState(false)

  const handleSignOut = () => {
    toast.success("Signing out...")
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  const triggerSettingInfo = (name: string) => {
    toast.info(`${name} setting panel triggered.`)
  }

  return (
    <RequireRole allowed={["admin"]}>
      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center max-w-[430px] mx-auto pb-24 relative shadow-2xl">
        {/* TopAppBar */}
        <header className="w-full sticky top-0 z-50 bg-surface shadow-sm border-b border-surface-container-highest flex items-center justify-between px-container-padding h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
              <img 
                alt="Admin Profile Photo" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmQo8ExruT7jZvCYAnVuFyk34ZGi3ONybFlrIvVQlk1gXzose9TCHkGxv-zxnErVtNnxcTa0NJezAxuINS-CmxkiYZdokaMmIQrVsiRBMtfstPoJ0xVgRsZweIkfvNbK86L0zM6Pj4wiwZ0rO02YmqBIw0RxAQd5WUqN70-r8J835Jn8i5-9-APRVKUdtP32_HywXWB5nASYpq-q4NARPxIQPfw4CaJmP67K4wSEc_goZfpdkKJoOWY2J7azGk2S1RPoggoj1OGB8"
              />
            </div>
            <h1 className="font-h1 text-h1 text-on-surface">FacilityFlow</h1>
          </div>
          <button className="transition-all duration-200 active:scale-95 text-on-surface-variant p-2 hover:bg-surface-container-low rounded-full">
            <Bell size={20} />
          </button>
        </header>

        {/* Main Content Canvas */}
        <main className="w-full flex-grow px-container-padding py-6 flex flex-col gap-6">
          {/* Section Header */}
          <div className="space-y-1">
            <h2 className="font-h2 text-xl font-bold text-on-surface">System Settings</h2>
            <p className="text-xs text-on-surface-variant">Global configurations for your facility instance.</p>
          </div>

          {/* Operations Group */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1 text-primary">
              <Settings size={16} />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-outline">Operations</h3>
            </div>
            <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl overflow-hidden shadow-sm">
              {/* Categories */}
              <button 
                onClick={() => triggerSettingInfo("Categories")}
                className="w-full flex items-center justify-between p-4 border-b border-surface-container-highest transition-all duration-200 hover:bg-surface-container-low/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <FolderTree size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">Categories</p>
                    <p className="text-xs text-on-surface-variant">Manage facility asset types</p>
                  </div>
                </div>
                <ChevronRight className="text-outline" size={18} />
              </button>

              {/* Priorities */}
              <button 
                onClick={() => triggerSettingInfo("Priorities")}
                className="w-full flex items-center justify-between p-4 border-b border-surface-container-highest transition-all duration-200 hover:bg-surface-container-low/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <AlertOctagon size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">Priorities</p>
                    <p className="text-xs text-on-surface-variant">Critical, High, Medium levels</p>
                  </div>
                </div>
                <ChevronRight className="text-outline" size={18} />
              </button>

              {/* Service Levels */}
              <button 
                onClick={() => triggerSettingInfo("Service Levels")}
                className="w-full flex items-center justify-between p-4 border-b border-surface-container-highest transition-all duration-200 hover:bg-surface-container-low/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <Timer size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">Service Levels</p>
                    <p className="text-xs text-on-surface-variant">SLA response time targets</p>
                  </div>
                </div>
                <ChevronRight className="text-outline" size={18} />
              </button>

              {/* System Reports */}
              <button 
                onClick={() => router.push('/admin/reports')}
                className="w-full flex items-center justify-between p-4 transition-all duration-200 hover:bg-surface-container-low/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <BarChart2 size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">System Reports</p>
                    <p className="text-xs text-on-surface-variant">Analyze facility operations data</p>
                  </div>
                </div>
                <ChevronRight className="text-outline" size={18} />
              </button>
            </div>
          </section>

          {/* Notifications Group */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1 text-primary">
              <Bell size={16} />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-outline">Notifications</h3>
            </div>
            <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl overflow-hidden shadow-sm">
              {/* Push Rules */}
              <div className="w-full flex items-center justify-between p-4 border-b border-surface-container-highest">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <Sliders size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">Push Rules</p>
                    <p className="text-xs text-on-surface-variant">Global mobile alerts</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={pushNotifications}
                    onChange={(e) => {
                      setPushNotifications(e.target.checked)
                      toast.success(`Push notifications ${e.target.checked ? "enabled" : "disabled"}`)
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Email Templates */}
              <button 
                onClick={() => triggerSettingInfo("Email Templates")}
                className="w-full flex items-center justify-between p-4 border-b border-surface-container-highest transition-all duration-200 hover:bg-surface-container-low/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <Mail size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">Email Templates</p>
                    <p className="text-xs text-on-surface-variant">Customize outgoing reports</p>
                  </div>
                </div>
                <ChevronRight className="text-outline" size={18} />
              </button>

              {/* SMS Gateway */}
              <button 
                onClick={() => triggerSettingInfo("SMS Gateway")}
                className="w-full flex items-center justify-between p-4 transition-all duration-200 hover:bg-surface-container-low/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <MessageSquare size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">SMS Gateway</p>
                    <p className="text-xs text-on-surface-variant">Twilio integration status</p>
                  </div>
                </div>
                <ChevronRight className="text-outline" size={18} />
              </button>
            </div>
          </section>

          {/* Access Control Group */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1 text-primary">
              <Shield size={16} />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-outline">Access Control</h3>
            </div>
            <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl overflow-hidden shadow-sm">
              {/* User Roles */}
              <button 
                onClick={() => triggerSettingInfo("User Roles")}
                className="w-full flex items-center justify-between p-4 border-b border-surface-container-highest transition-all duration-200 hover:bg-surface-container-low/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <Shield size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">User Roles</p>
                    <p className="text-xs text-on-surface-variant">Admin, Tech, Viewer levels</p>
                  </div>
                </div>
                <ChevronRight className="text-outline" size={18} />
              </button>

              {/* Permissions */}
              <button 
                onClick={() => triggerSettingInfo("Permissions")}
                className="w-full flex items-center justify-between p-4 border-b border-surface-container-highest transition-all duration-200 hover:bg-surface-container-low/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <Key size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">Permissions</p>
                    <p className="text-xs text-on-surface-variant">Granular module overrides</p>
                  </div>
                </div>
                <ChevronRight className="text-outline" size={18} />
              </button>

              {/* Audit Logs */}
              <button 
                onClick={() => router.push('/admin/audit-logs')}
                className="w-full flex items-center justify-between p-4 border-b border-surface-container-highest transition-all duration-200 hover:bg-surface-container-low/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <FileText size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">Audit Logs</p>
                    <p className="text-xs text-on-surface-variant">Review immutable event history</p>
                  </div>
                </div>
                <ChevronRight className="text-outline" size={18} />
              </button>

              {/* SSO Config */}
              <div className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <Unlock size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-on-surface">SSO Config</p>
                    <p className="text-xs text-on-surface-variant">SAML & Azure AD</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={ssoConfig}
                    onChange={(e) => {
                      setSsoConfig(e.target.checked)
                      toast.success(`SSO Config ${e.target.checked ? "enabled" : "disabled"}`)
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="mt-4">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 p-4 border border-error/20 bg-error/5 text-error rounded-xl font-semibold text-sm active:scale-95 transition-all hover:bg-error/10"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </section>
        </main>

        {/* BottomNavBar */}
        <BottomNav active="more" />
      </div>
    </RequireRole>
  )
}
