"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import RequireRole from '../../../../../components/auth/RequireRole'
import { 
  ArrowLeft, 
  Play, 
  Volume2, 
  CheckCircle, 
  XCircle, 
  User, 
  Tag, 
  ChevronRight,
  ZoomIn,
  Video
} from 'lucide-react'
import { toast } from 'sonner'

export default function DispatcherVerifyPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [playing, setPlaying] = useState(false)
  const [status, setStatus] = useState("PENDING VERIFICATION")

  const handleApprove = () => {
    setStatus("APPROVED & CLOSED")
    toast.success("Work Order approved and closed successfully!")
    setTimeout(() => {
      router.push('/dispatcher/queue')
    }, 1200)
  }

  const handleReject = () => {
    setStatus("REJECTED & REOPENED")
    toast.error("Work Order rejected. Status set back to Assigned.")
    setTimeout(() => {
      router.push('/dispatcher/queue')
    }, 1200)
  }

  return (
    <RequireRole allowed={["dispatcher"]}>
      <div className="bg-background text-on-background min-h-screen pb-24 max-w-[430px] mx-auto flex flex-col relative">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full max-w-[430px] z-50 bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center px-container-padding h-16">
          <div 
            onClick={() => router.back()}
            className="flex items-center gap-2 cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <ArrowLeft className="text-primary" size={24} />
            <h1 className="font-h1 text-h1 text-primary tracking-tight">FacilityFlow</h1>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
            <img 
              alt="Dispatcher Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOisuKUD7Gw4kRHR5r1iwi5Y-9UdcUzBD0YAvuUGmrdxXnyY0jkjkkRc4wXOpNXbkV11wyrFGEsrrjUbBCvlb-TNreLj2jotoSonOhaZVHmvvWGokZSYm2Ht73h84CFTrgPbexFYoLHrvGT2cfTePyjMO_iGCTRpvOfqssukhSHVe6s8vbT0vJVzJUE7fFHRu1JJNzFwMIiLHqMLveLPpo1y1UmHRss7fY74ovppeXktW4QfDwhSE71JL95VSDwd22h7ZL8dexRDM"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20 px-container-padding flex-grow flex flex-col gap-6">
          {/* Header Info */}
          <section className="mt-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">{id || "WO-882910"}</span>
                <h2 className="font-h2 text-base font-bold text-on-surface mt-1">HVAC Compressor Failure</h2>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider shrink-0 ${
                status === "APPROVED & CLOSED" 
                  ? "bg-emerald-100 text-emerald-800" 
                  : status === "REJECTED & REOPENED"
                  ? "bg-red-100 text-red-800"
                  : "bg-secondary-container text-on-secondary-container"
              }`}>
                {status}
              </span>
            </div>
          </section>

          {/* Visual Proof Comparison */}
          <section className="flex flex-col gap-2">
            <h3 className="font-h3 text-xs uppercase tracking-wider text-on-surface-variant font-bold">Visual Proof</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Before */}
              <div className="relative rounded-xl overflow-hidden shadow-sm group">
                <img 
                  className="w-full h-40 object-cover" 
                  alt="Before maintenance" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDIkwmK0cl_KhcbYnZxczhc8hMtblN9z2kZWBlwapbcf0eBdx50v7lAUGTBv6NiEqJ8ZrkalE99KCAavxF3ovvuo9sKrE75eFfYPavKGR5ktr2-WClAVYj_9V50ler04OMghBOYWgZsTYLx1wt7YcAvFu6-scimqBLF_iBxqzvg-fHPJjqx751NjZP7e6DhFJfy3GrEcjp3BnwOPmHce-aKg-m3OZvEWEvd0YbyEiNpCul4vBlvReA7rFPaehXirbESnBPru5ww1I" 
                />
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full">
                  <span className="text-[9px] font-bold text-white uppercase tracking-tighter">Before</span>
                </div>
              </div>
              {/* After */}
              <div className="relative rounded-xl overflow-hidden shadow-sm group border-2 border-emerald-500/30">
                <img 
                  className="w-full h-40 object-cover" 
                  alt="After maintenance" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApvJh9fwgXBPITO84SLUYsOjP02txsFVLkFhhP8qxMO40mvHuzQZr1OHZgDum5HBgjnFzm8sldtB0emwUfLCXlsNgJ0eb2I9crsL_AoxJlrNHQbDuU5VkkfBX3hJx2T43b4evRyxKn003yZP6CBLNedl7NuZz_mk4jj-HP-Pn-eyil1H-bEWWHm3fFiLs1YJwar2Z4FB-qoCVGf3ycfsxP_iWBkaGKm3B9CU4fbBTdMqU1LKjdoaONIJNqK_HXOxsncA0wjGFPDGo" 
                />
                <div className="absolute top-2 left-2 bg-emerald-600 px-2 py-0.5 rounded-full shadow-lg">
                  <span className="text-[9px] font-bold text-white uppercase tracking-tighter">After</span>
                </div>
              </div>
            </div>
          </section>

          {/* Video Playback Proof */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-on-surface">
                <Video size={16} className="text-primary" />
                <span className="font-semibold text-xs">Playback Proof</span>
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant">00:14 / 00:30</span>
            </div>
            <div className="relative aspect-video bg-surface-dim rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-60" 
                alt="Video preview" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIld6Sof5yWY8SIK2y6W4SI_lKkt2mwpULmn6MwA0Q_wNT3xYXHyE8dNttevn6Jt_vNYlgz8_tCbKffht5H8PKcucquJuqgvrD2lm0PlXQ779QbY_scy7RbCf2hNqDohuL5_ugtxSjIRSwNkG_y5MkdKOw3FPjGWy-5vizVBEK3sFbVWDHBJ0iLjJUu6AvdvssfRuCQBVqqdq5YGhuCFIDp0AOs9Fxnyn2GA0A3Ud2Y8tEBlUyegYfX8dReKKS9Dx9Fs2i8TSx4Yw" 
              />
              <button 
                onClick={() => setPlaying(!playing)}
                className="z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-xl transition-transform active:scale-95"
              >
                <Play size={20} className="fill-white translate-x-0.5" />
              </button>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-outline-variant">
                <div className="h-full bg-primary w-[45%]"></div>
              </div>
            </div>
          </section>

          {/* Technician Notes */}
          <section className="flex flex-col gap-2">
            <h3 className="font-h3 text-xs uppercase tracking-wider text-on-surface-variant font-bold">Technician Notes</h3>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                  <img 
                    alt="Technician Avatar" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRbP5IYS_CIlDmu811RDLKh4Kc8zc8U7e9hurNpela1uO7EXyVsI02dC0g31gFgRiUKkGX2v4DzEL1_ym0UwEUZ_PJFWEQZmpF43tZyc3hFUqK6Bdh0umEiFAcIsztnMM56gLeGOe05_xtVntYIWyVHdhH5FidohfYRepxqIJNRJ0_bdaLHCfS4IoLd9npzIwdkW6BSGupDrgItHLAI41gF54_o4mu8hP16aSIS_px8OP7ol8Kt8h3CNvFFljiR7V3aNYnVNvXuu8"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface">Mark Sanderson</p>
                  <p className="text-xs text-on-surface-variant">Lead Maintenance Tech</p>
                </div>
              </div>
              
              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 text-xs text-on-surface leading-relaxed italic">
                &ldquo;Replaced main compressor unit (Model X-400). Pressure tested lines up to 250 PSI. No leaks detected during 20-minute cycle. System running at optimal 68°F. Cleaned debris from external venting assembly.&rdquo;
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded-md text-[10px] font-mono font-semibold text-on-surface-variant border border-outline-variant/30">
                  <Tag size={10} /> Compressor
                </span>
                <span className="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded-md text-[10px] font-mono font-semibold text-on-surface-variant border border-outline-variant/30">
                  <Tag size={10} /> Pressure_Test
                </span>
              </div>
            </div>
          </section>

          {/* Decision Center */}
          <section className="pt-2 flex flex-col gap-3">
            <button 
              onClick={handleApprove}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-md font-bold uppercase tracking-wider text-xs"
            >
              <CheckCircle size={18} />
              <span>Approve and Close</span>
            </button>
            <button 
              onClick={handleReject}
              className="w-full h-12 bg-white border-2 border-error text-error hover:bg-red-50/40 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] font-bold text-xs"
            >
              <XCircle size={18} />
              <span>Reject and Reopen</span>
            </button>
            <p className="text-center text-[10px] text-on-surface-variant font-medium">
              Approving will finalize billing and update site inventory.
            </p>
          </section>
        </main>
      </div>
    </RequireRole>
  )
}
