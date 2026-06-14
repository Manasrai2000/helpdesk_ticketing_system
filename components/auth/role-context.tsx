"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

type Role = 'customer' | 'admin' | 'guest' | string

type RoleContext = {
  role: Role
  setRole: (r: Role) => void
}

const ctx = createContext<RoleContext | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    try {
      return (localStorage.getItem('role') as Role) || 'guest'
    } catch (e) {
      return 'guest'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('role', role)
      window.dispatchEvent(new StorageEvent('storage', { key: 'role', newValue: role }))
    } catch (e) {
      // ignore
    }
  }, [role])

  return <ctx.Provider value={{ role, setRole }}>{children}</ctx.Provider>
}

export function useRole() {
  const c = useContext(ctx)
  if (!c) throw new Error('useRole must be used within RoleProvider')
  return c
}
