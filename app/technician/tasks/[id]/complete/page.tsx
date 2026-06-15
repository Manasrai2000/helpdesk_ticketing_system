"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import RequireRole from '../../../../../components/auth/RequireRole'
import BottomNav from '../../../../../components/common/BottomNav'
import { 
  ArrowLeft, 
  Camera, 
  Video, 
  Info, 
  CheckCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react'
import { toast } from 'sonner'

export default function WorkCompletionPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  // State to track if each evidence is uploaded
  const [beforeUploaded, setBeforeUploaded] = useState(false)
  const [afterUploaded, setAfterUploaded] = useState(false)
  const [videoUploaded, setVideoUploaded] = useState(false)
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const uploadCount = (beforeUploaded ? 1 : 0) + (afterUploaded ? 1 : 0) + (videoUploaded ? 1 : 0)
  const canSubmit = uploadCount >= 3

  const handleSubmit = () => {
    if (!canSubmit) return

    setSubmitting(true)
    toast.success("Processing submission...")
    
    setTimeout(() => {
      setSubmitting(false)
      toast.success("Work submitted successfully!")
      router.push(`/technician/tasks/${id}/submit`)
    }, 1500)
  }

  return (
    <RequireRole allowed={["technician"]}>
      <div className="bg-background text-on-surface font-body-lg min-h-screen pb-40 max-w-[430px] mx-auto flex flex-col relative shadow-md">
        {/* TopAppBar */}
        <header className="bg-surface border-b border-outline-variant fixed top-0 z-40 w-full max-w-[430px]">
          <div className="flex justify-between items-center px-container-padding h-16 w-full">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()}
                className="active:scale-95 duration-150 p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors"
              >
                <ArrowLeft className="text-primary" size={24} />
              </button>
              <h1 className="font-h2 text-h2 font-bold text-primary">Complete Task</h1>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
                <img 
                  alt="Technician Profile" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAprMMbWLHRKQN3wAdGeumLL9e3kzubG6AtOkWHPFJ3feD_WE_9x8HgiU_cg2SIQyg3HCJQdO5Ap1XSgPuKWn5fdKjZdfH_jJQlxwabZq20NioybDi5nnQYi88r9mo1ID37W7gqwcplNJxtTEUAG3vvmDTLXwsiWXy2LIbadZp8ru8lKrdj7g1De0vYrhA3wqn3Y34cDaIwqYc0H1aSkrqzjxAe2dr_bL1jROO9oKWxCseDkF3EFbGaWu7OHdgMHA7C0mX25yM1tWc"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="pt-20 px-container-padding flex-grow flex flex-col gap-6">
          {/* Progress Indicator */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="font-label-sm text-xs text-on-surface-variant font-medium">Job Status</span>
              <span className="font-h3 text-base text-primary font-semibold">Finalizing Execution</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
            </div>
          </div>

          {/* Evidence Section */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-h3 text-base text-primary font-semibold">Evidence Upload</h2>
              <span className="font-label-sm text-[11px] text-red-600 bg-red-50 border border-red-200/50 px-2 py-0.5 rounded-full font-semibold">Required</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Before Photos */}
              <button 
                onClick={() => setBeforeUploaded(v => !v)}
                className={`proof-card border rounded-xl p-4 flex flex-col items-center justify-center gap-2 min-h-[140px] cursor-pointer transition-all border-dashed border-2 hover:bg-surface-container-low ${
                  beforeUploaded 
                    ? 'bg-secondary-container/30 border-primary' 
                    : 'bg-white border-outline-variant'
                }`}
              >
                {beforeUploaded ? (
                  <CheckCircle2 className="text-primary fill-current text-white" size={32} />
                ) : (
                  <Camera className="text-secondary" size={32} />
                )}
                <span className="font-semibold text-xs text-on-surface-variant">Before Photos</span>
                <span className="font-mono text-[11px] text-secondary">{beforeUploaded ? "3/3" : "0/3"}</span>
              </button>

              {/* After Photos */}
              <button 
                onClick={() => setAfterUploaded(v => !v)}
                className={`proof-card border rounded-xl p-4 flex flex-col items-center justify-center gap-2 min-h-[140px] cursor-pointer transition-all border-dashed border-2 hover:bg-surface-container-low ${
                  afterUploaded 
                    ? 'bg-secondary-container/30 border-primary' 
                    : 'bg-white border-outline-variant'
                }`}
              >
                {afterUploaded ? (
                  <CheckCircle2 className="text-primary fill-current text-white" size={32} />
                ) : (
                  <Camera className="text-secondary" size={32} />
                )}
                <span className="font-semibold text-xs text-on-surface-variant">After Photos</span>
                <span className="font-mono text-[11px] text-secondary">{afterUploaded ? "3/3" : "0/3"}</span>
              </button>

              {/* Video Proof */}
              <button 
                onClick={() => setVideoUploaded(v => !v)}
                className={`proof-card border rounded-xl p-4 flex flex-col items-center justify-center gap-2 min-h-[140px] cursor-pointer transition-all border-dashed border-2 col-span-2 hover:bg-surface-container-low ${
                  videoUploaded 
                    ? 'bg-secondary-container/30 border-primary' 
                    : 'bg-white border-outline-variant'
                }`}
              >
                {videoUploaded ? (
                  <CheckCircle2 className="text-primary fill-current text-white" size={32} />
                ) : (
                  <Video className="text-secondary" size={32} />
                )}
                <div className="text-center">
                  <span className="font-semibold text-xs text-on-surface-variant block">Video Proof</span>
                  <span className="text-[11px] text-secondary mt-0.5 block">Max 30s detailing repaired components</span>
                </div>
              </button>
            </div>
          </section>

          {/* Work Notes */}
          <section className="flex flex-col gap-2">
            <label className="font-h3 text-base text-primary font-semibold block" htmlFor="work-notes">Work Notes</label>
            <textarea 
              className="w-full bg-white border border-outline-variant rounded-xl p-3 font-body-sm text-sm resize-none focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
              id="work-notes" 
              placeholder="Describe the work performed, any unexpected findings, and materials used during the process..." 
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </section>

          {/* Validation Message */}
          <div className="bg-red-50 border border-red-200/50 p-4 rounded-xl flex items-start gap-3 shadow-sm">
            <Info className="text-red-600 flex-shrink-0" size={18} />
            <p className="font-body-sm text-xs text-red-900 leading-normal">
              All evidence (before/after photos and video) is required to complete the ticket. Ensure clear lighting for all visual documentation.
            </p>
          </div>
        </main>

        {/* Sticky Bottom Action */}
        <div className="fixed bottom-20 left-0 right-0 max-w-[430px] mx-auto px-container-padding pb-4 bg-background/80 backdrop-blur-md z-40">
          <button 
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className={`w-full h-14 rounded-xl flex items-center justify-center gap-2 font-semibold text-base transition-all duration-200 shadow-md ${
              canSubmit 
                ? 'bg-primary text-white hover:opacity-90 active:scale-95 cursor-pointer' 
                : 'bg-outline-variant text-on-primary-fixed-variant cursor-not-allowed opacity-60'
            }`}
          >
            {submitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span>Submit for Verification</span>
                <CheckCircle size={18} />
              </>
            )}
          </button>
        </div>

        {/* BottomNavBar */}
        <BottomNav active="tasks" />
      </div>
    </RequireRole>
  )
}
