"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from '../../components/auth/role-context'

export default function SelectRolePage() {
  const { role, setRole } = useRole()
  const router = useRouter()

  function pick(r: string) {
    setRole(r)
    // small delay to persist then navigate to role home
    setTimeout(() => {
      if (r === 'customer') router.push('/customer/dashboard')
      else if (r === 'technician') router.push('/technician')
      else if (r === 'dispatcher') router.push('/dispatcher')
      else if (r === 'admin') router.push('/admin')
      else router.push('/')
    }, 200)
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="w-full max-w-[430px] px-container-padding pt-12">
        <h2 className="text-h2 font-h2 mb-4">Select Role</h2>
        <p className="text-body-sm text-secondary mb-6">Choose a role for the current session. Pages will be gated based on this role.</p>
        <div className="grid grid-cols-1 gap-3">
          <button onClick={() => pick('customer')} className={`w-full py-3 rounded-xl ${role==='customer' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-secondary'}`}>Customer</button>
          <button onClick={() => pick('technician')} className={`w-full py-3 rounded-xl ${role==='technician' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-secondary'}`}>Technician</button>
          <button onClick={() => pick('dispatcher')} className={`w-full py-3 rounded-xl ${role==='dispatcher' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-secondary'}`}>Dispatcher</button>
          <button onClick={() => pick('admin')} className={`w-full py-3 rounded-xl ${role==='admin' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-secondary'}`}>Admin</button>
          <button onClick={() => pick('guest')} className={`w-full py-3 rounded-xl ${role==='guest' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-secondary'}`}>Guest</button>
        </div>
      </main>
    </div>
  )
}
