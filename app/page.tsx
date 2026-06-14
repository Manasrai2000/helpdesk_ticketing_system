"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const [show, setShow] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false)
      router.push('/login')
    }, 900)
    return () => clearTimeout(t)
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-3xl">⚙️</span>
        </div>
        <h1 className="text-xl font-semibold">FacilityConnect</h1>
        <p className="text-sm text-secondary">Loading…</p>
        {show && <div className="mt-4 w-24 h-1 bg-primary rounded-full animate-pulse" />}
      </div>
    </main>
  )
}
