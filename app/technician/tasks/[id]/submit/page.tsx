"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import RequireRole from '../../../../../components/auth/RequireRole'
import BottomNav from '../../../../../components/common/BottomNav'
import { 
  CheckCircle, 
  FileText, 
  Clock, 
  Package, 
  Video, 
  Play, 
  Check, 
  ArrowRight,
  Menu,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

interface TaskReviewData {
  id: string
  title: string
  category: string
  summary: string
  timeSpent: string
  partsUsed: string
  media: string[]
}

const TASKS_REVIEW_DATA: Record<string, TaskReviewData> = {
  "FC-8291": {
    id: "FC-8291",
    title: "Clogged Main Drain",
    category: "Plumbing Issue - Main Floor Restroom",
    summary: "Detected leak at the main shut-off valve assembly. Replaced the gasket and tightened the compression nut. Pressure tested for 20 minutes with zero moisture detected. Cleaned up area and verified functionality of all downstream fixtures.",
    timeSpent: "45 mins",
    partsUsed: "2 Parts Used",
    media: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXFyuAynJwQEdZkhrXXKqoMrxkKfGLvNLrtRtWxIMQZEWKcsdUM9aCX772FJSALEgLfyl-2RLsOFRea8IHeu3WVg_vQZhpeT1Su9-_-V8nh-nLwug-BMbXGf0FxfD0MdrW_gxbLIEyrpkttQHcS10itqm-_-a6pR9-2ePERCTbOJC78UAhIJle6PSRbXGmswJQcrdqZCJnB_RMw74y_IqW4-41AN4wLxU7eYiGhy_oq1GpghW7aXF2LkC9R3t5ovny5vTcaJIba44",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1xotl70MM-3heZovHJf5QgRMYO9K8gr2Ripwazlqbp8rh0yR6b-JOlgGUEVCE7oNxGXqUamWlkiUbsPVNexfomVKENx3ZGR1ntV3YKTLyZm3KfYQt5hV56p-f-gmky1S3-5GYLc0PIct2r1Ufu22KeesdShZFxzvak_DWaXMKX0F-IgAKWiTec0x9s0BsAQA3u_Ou9qZsd4zbGDjgrDeUD9BQDQ_Qz4A3gR7moATn_3iht8yHjtQPTHDExKsMZjetIj4tmkIkp4M",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADdAp9YTIqthFUbwb37TNj-10oNRkm3nyAr_OceYLK1HPrmY_wkwJ9LLKzLowwCxeOiJWqH78yigMZKAcG97TgPf9vWMSr_7bve6zgAxnLT3ZJmdYVBPxcf1mtVtTVLy74XVlDFp057VZVBYOHdZLCZ9o_ygTBYmAKY4-3EJ2CKuygVvAT6Z_jxEENxjyDks9H6I0uzeX8G6ksUHXVbm2BlhcT7XQ7M-BVCNMqFMOpus1yM01J4kYXisddnQg5C1oCpRqWSC8J3UI"
    ]
  },
  "FC-8304": {
    id: "FC-8304",
    title: "HVAC Maintenance",
    category: "HVAC Issue - Lobby East Wing",
    summary: "Replaced faulty start capacitor in AC condenser unit. Cleaned evaporator coils and cleared dust blockages. Checked refrigerant pressure levels and verified smooth starting operation without grinding noise.",
    timeSpent: "60 mins",
    partsUsed: "1 Part Used",
    media: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXFyuAynJwQEdZkhrXXKqoMrxkKfGLvNLrtRtWxIMQZEWKcsdUM9aCX772FJSALEgLfyl-2RLsOFRea8IHeu3WVg_vQZhpeT1Su9-_-V8nh-nLwug-BMbXGf0FxfD0MdrW_gxbLIEyrpkttQHcS10itqm-_-a6pR9-2ePERCTbOJC78UAhIJle6PSRbXGmswJQcrdqZCJnB_RMw74y_IqW4-41AN4wLxU7eYiGhy_oq1GpghW7aXF2LkC9R3t5ovny5vTcaJIba44",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1xotl70MM-3heZovHJf5QgRMYO9K8gr2Ripwazlqbp8rh0yR6b-JOlgGUEVCE7oNxGXqUamWlkiUbsPVNexfomVKENx3ZGR1ntV3YKTLyZm3KfYQt5hV56p-f-gmky1S3-5GYLc0PIct2r1Ufu22KeesdShZFxzvak_DWaXMKX0F-IgAKWiTec0x9s0BsAQA3u_Ou9qZsd4zbGDjgrDeUD9BQDQ_Qz4A3gR7moATn_3iht8yHjtQPTHDExKsMZjetIj4tmkIkp4M"
    ]
  },
  "FC-7992": {
    id: "FC-7992",
    title: "Replace LED Ballasts",
    category: "Electrical Issue - Suite 1205",
    summary: "Replaced two faulty electronic ballasts in fluorescent fixtures on Floor 12. Verified that flickering has stopped and new LED tubes light up instantly. Checked for any wire insulation damage.",
    timeSpent: "72 mins",
    partsUsed: "2 Parts Used",
    media: []
  },
  "FC-8441": {
    id: "FC-8441",
    title: "Server Room Leak",
    category: "Emergency Issue - IT Hub Rack B4",
    summary: "Identified ceiling leak source as an AC condensation tray overflow. Unclogged drain pipe and cleaned tray. Installed temporary drip shield. Verified that water is now draining correctly.",
    timeSpent: "30 mins",
    partsUsed: "1 Part Used",
    media: []
  }
}

export default function ReviewSubmitPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [submitting, setSubmitting] = useState(false)

  const task = TASKS_REVIEW_DATA[id] || TASKS_REVIEW_DATA["FC-8291"]

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      // Mark as completed in localStorage
      const saved = localStorage.getItem('technician_task_statuses')
      const current = saved ? JSON.parse(saved) : {}
      current[task.id] = "Completed"
      localStorage.setItem('technician_task_statuses', JSON.stringify(current))

      toast.success("Task status updated to Completed!")
      router.push('/technician/tasks')
    }, 800)
  }

  return (
    <RequireRole allowed={["technician"]}>
      <div className="flex flex-col min-h-screen max-w-[430px] mx-auto bg-surface pb-32 relative shadow-lg">
        {/* TopAppBar */}
        <header className="bg-surface flex justify-between items-center px-container-padding h-16 w-full border-b border-outline-variant fixed top-0 z-50 max-w-[430px]">
          <div className="flex items-center gap-4">
            <Menu className="text-primary" size={24} />
            <h1 className="font-h2 text-h2 font-bold text-primary">Review &amp; Submit</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
            <img 
              alt="Technician Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3ya0Dxsz2YDxiDtpkRtIXQMCpNRuKVCdN9Zjazn_190ohWE52QSPfQuA_R8dtOrhNS4uar6nJ9F2ST84I_qKnfgkHn841NU-Qd0HmYa_akUN8gDpH4elJHweJ9fbAHI1tDawXWOWLX2Mg6Z05KOfavTx7ADMItMExePAwmEJiC770EAOfrYf3x7SgzWNxCegd_8BE69iCF5B0GHoSzYCLionbyCGHYJlRNHVJvGOtHNJPU23aLzyWW5LvLYYBOCvev5Uht83ZAyg"
            />
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-1 mt-16 px-container-padding pt-6 space-y-6 overflow-y-auto">
          {/* Success Message Toast-style Header */}
          <div className="bg-primary text-on-primary p-4 rounded-xl shadow-sm flex items-start gap-3 transform transition-all animate-in slide-in-from-top duration-500">
            <CheckCircle className="text-on-primary mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="font-label-md text-label-md font-semibold">Ready for Final Submission</p>
              <p className="font-body-sm text-body-sm opacity-90 text-xs mt-0.5">Submitted to supervisor for verification.</p>
            </div>
          </div>

          {/* Summary Header Section */}
          <section className="space-y-1">
            <div className="flex justify-between items-center">
              <h2 className="font-h2 text-h2 text-on-surface">Ticket #{task.id}</h2>
              <span className="bg-secondary-container/50 text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-xs border border-secondary-container">
                Verification Pending
              </span>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant text-sm font-medium">{task.category}</p>
          </section>

          {/* Work Summary Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="text-primary" size={20} />
              <h3 className="font-h3 text-h3 text-on-surface text-base">Work Summary</h3>
            </div>
            <div className="bg-surface-container-low p-3 rounded-lg">
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-sm">
                {task.summary}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-4 text-secondary">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Clock size={16} />
                <span>{task.timeSpent}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Package size={16} />
                <span>{task.partsUsed}</span>
              </div>
            </div>
          </section>

          {/* Media Review Section */}
          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-h3 text-h3 text-on-surface text-base">Media Review</h3>
              <span className="font-label-sm text-xs text-secondary font-semibold">
                {task.media.length + (task.media.length > 0 ? 1 : 0)} Files Uploaded
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-none py-1">
              {task.media.map((url, idx) => (
                <div key={idx} className="relative min-w-[140px] h-[140px] rounded-xl overflow-hidden border border-outline-variant shadow-sm flex-shrink-0">
                  <img className="w-full h-full object-cover" alt="Uploaded work" src={url} />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5 flex items-center justify-center">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                </div>
              ))}

              {/* Render dynamic video if there are media attachments */}
              {task.media.length > 0 && (
                <div className="relative min-w-[140px] h-[140px] rounded-xl overflow-hidden border border-outline-variant shadow-sm flex-shrink-0 bg-surface-container-high flex items-center justify-center">
                  <Video className="text-secondary" size={40} />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                      <Play className="text-primary fill-current" size={18} />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5 flex items-center justify-center">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                </div>
              )}

              {task.media.length === 0 && (
                <div className="text-center py-4 text-xs text-on-surface-variant italic w-full">
                  No attachments uploaded
                </div>
              )}
            </div>
          </section>

          {/* Final Action Button Container */}
          <div className="pt-4 pb-8">
            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-4 bg-primary text-on-primary rounded-xl font-h3 flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800 transition-all active:scale-[0.98] duration-150 font-semibold text-base disabled:opacity-80"
            >
              {submitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Return to Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            <p className="text-center font-label-sm text-xs text-secondary mt-4">
              You will be notified once the supervisor approves.
            </p>
          </div>
        </main>

        {/* BottomNavBar */}
        <BottomNav active="home" />
      </div>
    </RequireRole>
  )
}
