"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from './role-context'

export default function RequireRole({ children, allowed = ['customer'] }: { children: React.ReactNode, allowed?: string[] }) {
  const { role } = useRole()
  const router = useRouter()

  useEffect(() => {
    if (!allowed.includes(role)) {
      // redirect to role selection or home
      router.replace('/select-role')
    }
  }, [role, allowed, router])

  if (!allowed.includes(role)) return null
  return <>{children}</>
}
