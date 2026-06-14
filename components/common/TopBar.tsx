"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Settings, Search, ChevronDown } from 'lucide-react'
import { useRole } from '../auth/role-context'
import { useRouter } from 'next/navigation'

export default function TopBar({ title = '' }: { title?: string }) {
  const { role, setRole } = useRole()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  function selectRole(r: string) {
    setRole(r)
    setOpen(false)
    if (r === 'admin') router.push('/admin')
    else if (r === 'customer') router.push('/customer/dashboard')
    else if (r === 'technician') router.push('/technician')
    else if (r === 'dispatcher') router.push('/dispatcher')
    else router.push('/')
  }

  return (
    <header className="w-full sticky top-0 z-50 bg-surface border-b border-outline-variant flex items-center justify-between px-container-padding h-16 max-w-[430px] mx-auto">
      <div className="flex items-center gap-3">
        <Settings className="text-primary" size={24} />
        <h1 className="text-h1 font-h1 text-primary tracking-tight">{title || 'FacilityConnect'}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button aria-label="Search" className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center active:scale-95 transition-transform">
          <Search size={18} className="text-on-surface" />
        </button>

        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(v => !v)} className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface-container-low">
            <span className="text-sm font-medium">{role}</span>
            <ChevronDown size={14} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-surface border border-outline-variant rounded-md shadow-md overflow-hidden">
              <button className="w-full text-left px-3 py-2 hover:bg-surface-container-high" onClick={() => selectRole('customer')}>Customer</button>
              <button className="w-full text-left px-3 py-2 hover:bg-surface-container-high" onClick={() => selectRole('technician')}>Technician</button>
              <button className="w-full text-left px-3 py-2 hover:bg-surface-container-high" onClick={() => selectRole('dispatcher')}>Dispatcher</button>
              <button className="w-full text-left px-3 py-2 hover:bg-surface-container-high" onClick={() => selectRole('admin')}>Admin</button>
              <button className="w-full text-left px-3 py-2 hover:bg-surface-container-high" onClick={() => selectRole('guest')}>Guest</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
