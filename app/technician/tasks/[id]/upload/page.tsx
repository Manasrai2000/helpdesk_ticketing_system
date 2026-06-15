"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import RequireRole from '../../../../../components/auth/RequireRole'
import BottomNav from '../../../../../components/common/BottomNav'
import { 
  ArrowLeft, 
  Info, 
  Grid, 
  Camera, 
  Video, 
  Image as ImageIcon, 
  X, 
  PlayCircle 
} from 'lucide-react'
import { toast } from 'sonner'

interface EvidenceItem {
  id: string
  type: 'image' | 'video'
  src?: string
  duration?: string
}

export default function EvidenceUploadPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([
    { 
      id: '1', 
      type: 'image', 
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg3jO5iEOcrCkpE4IsKU63hGpT7n_DEJyuO-YFk3xTzMntBVezBVhA4uNkEWKxQoWDnJepPd6DGoZDdViTUDJ-HBvlw90He7KxNeSmcbcSWBbxNbRTETCS6Uy0Mo8o0h9ba2olishyDFARcS0HkJvrQtgWv8NR3OSlgM01K7CanhZSgLfbz-XUtG_XyHyarSZqrDD_aZ_ICLREajQ4MPE21Md2JNZZ0FQwrwxvYOLQIawI61ndtWrUvNJ0-WssBL3eaBngehHQ0LY' 
    },
    { 
      id: '2', 
      type: 'image', 
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApdcncMbUEhruT5r7KofrbFgWZ6zhXlsh2bTN-QgbviQs4Vb-Z6toPAOgtrh-dZf4wWGTrp99C2LQ7A9ILunoVEWGfHutv7Gsu3ZbS5aHcvku65CizXDW1Q1ydfQE6XeYITIcqlrgxqzwzkgjjquR9Vj8mdnAzFc0gibAmxumPjt_U4DqGMXy4nfC5q6QKt2h_AtSq7AIpd7NZ-gyY5Woh0LCikcdt5_HOUqd_eA9cdAND4mKJdeErgpRBOqaOsKjCjj2PPkJ_3Ag' 
    },
    { 
      id: '3', 
      type: 'video', 
      duration: '0:12' 
    }
  ])

  const handleRemove = (itemId: string) => {
    setEvidenceList(prev => prev.filter(item => item.id !== itemId))
    toast.success("Evidence removed")
  }

  const handleAddPhoto = () => {
    const newId = String(Date.now())
    const newItem: EvidenceItem = {
      id: newId,
      type: 'image',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg3jO5iEOcrCkpE4IsKU63hGpT7n_DEJyuO-YFk3xTzMntBVezBVhA4uNkEWKxQoWDnJepPd6DGoZDdViTUDJ-HBvlw90He7KxNeSmcbcSWBbxNbRTETCS6Uy0Mo8o0h9ba2olishyDFARcS0HkJvrQtgWv8NR3OSlgM01K7CanhZSgLfbz-XUtG_XyHyarSZqrDD_aZ_ICLREajQ4MPE21Md2JNZZ0FQwrwxvYOLQIawI61ndtWrUvNJ0-WssBL3eaBngehHQ0LY'
    }
    setEvidenceList(prev => [...prev, newItem])
    toast.success("Photo attached successfully")
  }

  const handleAddVideo = () => {
    const newId = String(Date.now())
    const newItem: EvidenceItem = {
      id: newId,
      type: 'video',
      duration: '0:05'
    }
    setEvidenceList(prev => [...prev, newItem])
    toast.success("Video attached successfully")
  }

  const handleComplete = () => {
    toast.success("Evidence uploaded!")
    router.push(`/technician/tasks/${id}/submit`)
  }

  return (
    <RequireRole allowed={["technician"]}>
      <div className="max-w-[430px] mx-auto min-h-screen bg-surface pb-32 flex flex-col">
        {/* Top App Bar */}
        <header className="bg-surface border-b border-outline-variant flex justify-between items-center px-container-padding h-16 w-full sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 transition-colors hover:bg-surface-container-high rounded-full active:scale-95 duration-150"
            >
              <ArrowLeft className="text-primary" size={24} />
            </button>
            <h1 className="font-h2 text-h2 font-bold text-primary">Evidence Upload</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
            <img 
              alt="Technician Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGDOpQ1xDkklcxpA97qWvtNK6whz468gv3XAJKpMY17TDp3gaKW_V3Z8Wb4JyqKSM60xNGLe5vjHTxJn7hMg6VLrmU8l-MUZb03QjcU3fu1RoeFQb0B55-ICgwnIU-r4t3M-mww3Jy65HBTC5-kd7-0OfHDlbJX2aqHKrKfCeKA8Y1trKkdD2Tk5RWaXM5r7aoPgc6NCe6qu-nvJFtGqvfxGHGcS7kENLrCbfD405SKA4NZErxb6ECbwrPe2dU03-pEX7-MX_rPJI"
            />
          </div>
        </header>

        <main className="w-full p-container-padding flex flex-col gap-6 flex-grow">
          {/* Instruction Text */}
          <div className="bg-secondary-container/30 border border-secondary-container p-4 rounded-xl flex items-start gap-3">
            <Info className="text-secondary flex-shrink-0" size={20} />
            <p className="font-body-sm text-body-sm text-on-secondary-container">
              Ensure the work area is clearly visible. Capture the serial number and the final installation state for verification.
            </p>
          </div>

          {/* Viewfinder / Upload Area */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-surface-container-highest border border-outline-variant shadow-sm">
            <img 
              className="w-full h-full object-cover" 
              alt="Viewfinder Content" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcfwd3lY4zyiE18wsLRIny4akEKEa3PrZsIgeVmcWa1hK_EJIJdrCtiCojq6-AjEfQxTfWLdSO2GcQZNGxWuMMTbMquIyXU6l9vQw5KKNOXWYOXErzUc90nToJkNZNI_ViChhkiAM-QnsmUcW2bOzpsz5kmLJ3YvuxwdX3Rpij-m7aLS8DJUL6KfqSPSB2Gszgd6oAE2LOPwmPaHDmhs7cdap0Y20XWtJOAomfwNWcEaXl25Pbmo-jc0SiR8zYcdrOBqe3ggih11M"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 flex flex-col justify-between p-4 pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[10px] text-white font-mono uppercase tracking-widest">
                  Rec 00:00:12
                </div>
                <Grid className="text-white drop-shadow-md" size={20} />
              </div>
              <div className="flex justify-center">
                <div className="w-12 h-12 border-2 border-white/50 rounded-lg flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div></div>
            </div>
            {/* Focus Corners */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-white/80 rounded-tl-sm"></div>
            <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-white/80 rounded-tr-sm"></div>
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-white/80 rounded-bl-sm"></div>
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-white/80 rounded-br-sm"></div>
          </div>

          {/* Primary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleAddPhoto}
              className="flex flex-col items-center justify-center gap-2 p-6 bg-primary text-on-primary rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <Camera size={32} />
              <span className="font-semibold text-sm">Take Photo</span>
            </button>
            <button 
              onClick={handleAddVideo}
              className="flex flex-col items-center justify-center gap-2 p-6 bg-white border border-outline-variant text-on-surface rounded-xl shadow-sm hover:bg-surface-container-low active:scale-95 transition-all"
            >
              <Video size={32} />
              <span className="font-semibold text-sm">Record Video</span>
            </button>
          </div>

          <button 
            onClick={handleAddPhoto}
            className="w-full flex items-center justify-center gap-2 p-4 bg-white border border-outline-variant text-on-surface rounded-xl hover:bg-surface-container-low active:scale-[0.98] transition-all"
          >
            <ImageIcon size={20} />
            <span className="font-semibold text-sm">Choose from Gallery</span>
          </button>

          {/* Selected Media Thumbnails */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-semibold text-base text-on-surface">Attached Evidence ({evidenceList.length})</h3>
              <span className="text-on-surface-variant text-xs">Max 10MB each</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {evidenceList.map(item => (
                <div key={item.id} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-outline-variant bg-surface-container flex items-center justify-center">
                  {item.type === 'image' && item.src ? (
                    <img className="w-full h-full object-cover" alt="Attached evidence" src={item.src} />
                  ) : (
                    <>
                      <PlayCircle size={32} className="text-on-surface-variant" />
                      <div className="absolute bottom-1 right-1 px-1 bg-black/60 rounded text-[9px] text-white">
                        {item.duration}
                      </div>
                    </>
                  )}
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleComplete}
            className="w-full py-4 bg-primary text-on-primary font-semibold text-base rounded-xl shadow-xl active:scale-95 transition-all mt-4"
          >
            Upload &amp; Complete Task
          </button>
        </main>

        <BottomNav active="tasks" />
      </div>
    </RequireRole>
  )
}
