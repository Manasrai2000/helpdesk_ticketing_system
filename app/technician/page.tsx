"use client"
import React, { useState } from 'react'
import RequireRole from '../../components/auth/RequireRole'
import BottomNav from '../../components/common/BottomNav'
import { Menu, ClipboardList, Clock, CheckCircle, ClipboardCheck, AlertTriangle, MapPin, Zap, ArrowRight, Plus, X } from 'lucide-react'

export default function TechnicianPage() {
  const [sheetOpen, setSheetOpen] = useState(false)

  const openSheet = () => setSheetOpen(true)
  const closeSheet = () => setSheetOpen(false)

  return (
    <RequireRole allowed={["technician"]}>
      <main className="w-full max-w-[430px] bg-background relative flex flex-col min-h-screen pb-24 mx-auto">
        <header className="bg-surface dark:bg-surface-dim text-primary dark:text-inverse-primary border-b border-outline-variant dark:border-outline fixed top-0 w-full max-w-[430px] z-50 flex justify-between items-center px-container-padding h-16">
          <div className="flex items-center gap-4">
            <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full active:scale-95 duration-150">
              <Menu size={22} className="text-primary" />
            </button>
            <h1 className="font-h2 text-h2 font-bold text-primary dark:text-on-surface">FacilityOps</h1>
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
            <img alt="Technician Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHT5ml6-4Z90Nsdlx_TCpqyGevWsTKnTiXCMuuBNN7g1UQeVSOuN0Wvmz4uz7EKmmgsFxrGfIRs-0IIwkTGbW3NI33ysR5i63b3XpA8J_g09-tE6kZvsdJLvlbVSAz1gC3U5U2yO9zNRpV5ZlkAM0ZHzLBG_dHZ6U4c6Pw9MF7ReGJkEHK9GdUvFf2tJVZTGkN5C0yYgpDoc8ZRXL2pV-p6I0sceaXrQ7QZhaGm8qXHMGe5m8tlkfhJo3k_u9bc7VO1iSbQO8h9_8" />
          </div>
        </header>

        <div className="mt-16 px-container-padding pt-6 flex flex-col gap-6">
          <section className="animate-in fade-in duration-700">
            <h2 className="font-h1 text-h1 text-on-surface">Welcome back, Alex</h2>
            <p className="font-body-sm text-on-surface-variant mt-1" id="current-date">October 24, 2023</p>
          </section>

          <section className="grid grid-cols-2 gap-card-gap">
            <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl custom-card-shadow active-scale">
              <div className="flex items-center justify-between mb-2">
                <ClipboardList size={20} className="text-primary" />
                <span className="bg-primary-fixed text-on-primary-fixed text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Total</span>
              </div>
              <div className="font-h2 text-h2 text-on-surface">8</div>
              <div className="font-label-sm text-on-surface-variant">Assigned Tasks</div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl custom-card-shadow active-scale">
              <div className="flex items-center justify-between mb-2">
                <Clock size={20} className="text-[#F59E0B]" />
                <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Active</span>
              </div>
              <div className="font-h2 text-h2 text-on-surface">3</div>
              <div className="font-label-sm text-on-surface-variant">In Progress</div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl custom-card-shadow active-scale">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle size={20} className="text-[#10B981]" />
                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Done</span>
              </div>
              <div className="font-h2 text-h2 text-on-surface">12</div>
              <div className="font-label-sm text-on-surface-variant">Completed Today</div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl custom-card-shadow active-scale">
              <div className="flex items-center justify-between mb-2">
                <ClipboardCheck size={20} className="text-[#3B82F6]" />
                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Review</span>
              </div>
              <div className="font-h2 text-h2 text-on-surface">2</div>
              <div className="font-label-sm text-on-surface-variant">Pending Verify</div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="font-h3 text-h3 text-on-surface">Upcoming Priority</h3>
              <button className="text-primary font-label-md hover:underline transition-all">View All</button>
            </div>
            <div className="bg-surface-container-lowest border-2 border-primary p-5 rounded-xl custom-card-shadow relative overflow-hidden active-scale">
              <div className="absolute top-0 right-0 p-3">
                <AlertTriangle size={20} className="text-error" />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="font-mono-sm text-on-surface-variant mb-1">TICKET #FC-9012</div>
                  <h4 className="font-h2 text-h2 text-on-surface">Room 402: AC Compressor Issue</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant">
                    <MapPin size={16} className="text-on-surface-variant" />
                    <span className="font-label-md text-on-surface">Floor 4, West Wing</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-error-container px-3 py-1.5 rounded-lg border border-error/10">
                    <Zap size={16} className="text-error" />
                    <span className="font-label-md text-error">High Priority</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-outline-variant mt-2">
                  <button onClick={openSheet} className="w-full bg-primary text-on-primary font-label-md py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    Start Task
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h3 className="font-h3 text-h3 text-on-surface mb-3 px-1">Recent Activity</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="flex-1">
                  <p className="font-body-sm text-on-surface">Completed <span className="font-semibold">#FC-8892</span>: Lighting Fixture Replace</p>
                  <p className="font-label-sm text-on-surface-variant mt-0.5">14:20 PM • Main Lobby</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="font-body-sm text-on-surface">Verified <span className="font-semibold">#FC-8741</span>: Water Leak Fix</p>
                  <p className="font-label-sm text-on-surface-variant mt-0.5">11:05 AM • Kitchen B1</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <div className="mt-1 w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="flex-1">
                  <p className="font-body-sm text-on-surface">Started <span className="font-semibold">#FC-8901</span>: Generator Test</p>
                  <p className="font-label-sm text-on-surface-variant mt-0.5">09:15 AM • Basement Tech Room</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <button onClick={openSheet} className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40">
          <Plus size={28} />
        </button>

        {/* Bottom sheet overlay */}
        <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${sheetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={closeSheet} />

        {/* Bottom sheet panel */}
        <aside className={`fixed left-0 right-0 bottom-0 z-50 mx-auto w-full max-w-[430px] transform transition-transform ${sheetOpen ? 'translate-y-0' : 'translate-y-full'}`} aria-hidden={!sheetOpen}>
          <div className="bg-surface rounded-t-xl shadow-2xl p-4 pb-safe mb-safe">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-h3 text-h3">Start Task</h4>
              <button onClick={closeSheet} className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-body-sm text-on-surface-variant">Confirm start of task <span className="font-semibold">#FC-9012</span> at Room 402.</p>
              <div className="flex gap-2">
                <button onClick={closeSheet} className="flex-1 py-3 rounded-lg border border-outline-variant">Cancel</button>
                <button onClick={closeSheet} className="flex-1 py-3 rounded-lg bg-primary text-on-primary">Start</button>
              </div>
            </div>
          </div>
        </aside>

        <BottomNav active="home" />
      </main>
    </RequireRole>
  )
}
