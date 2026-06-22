"use client"
import React from 'react'
import Link from 'next/link'
import { Home, Ticket, Bell, User, Wrench, ClipboardList, LayoutDashboard, History, Users, MoreHorizontal } from 'lucide-react'
import { useRole } from '../auth/role-context'

export default function BottomNav({ active = 'home' }: { active?: string }) {
  const { role } = useRole()

  const items = (() => {
    switch (role) {
      case 'technician':
        return [
          { href: '/technician', key: 'home', label: 'Dashboard', icon: Home },
          { href: '/technician/tasks', key: 'tasks', label: 'Tasks', icon: Wrench },
          { href: '/technician/profile', key: 'profile', label: 'Profile', icon: User },
        ]
      case 'dispatcher':
        return [
          { href: '/dispatcher', key: 'home', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/dispatcher/queue', key: 'queue', label: 'Queue', icon: ClipboardList },
          { href: '/dispatcher/activity', key: 'activity', label: 'Activity', icon: History },
          { href: '/dispatcher/profile', key: 'profile', label: 'Profile', icon: User },
        ]
      case 'admin':
        return [
          { href: '/admin', key: 'home', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/admin/users', key: 'users', label: 'Users', icon: Users },
          { href: '/admin/tickets', key: 'tickets', label: 'Tickets', icon: Ticket },
          { href: '/admin/more', key: 'more', label: 'More', icon: MoreHorizontal },
        ]
      default:
        return [
          { href: '/customer/dashboard', key: 'home', label: 'Home', icon: Home },
          { href: '/customer/tickets', key: 'tickets', label: 'My Tickets', icon: Ticket },
          { href: '/customer/notifications', key: 'notifications', label: 'Notifications', icon: Bell },
          { href: '/customer/profile', key: 'profile', label: 'Profile', icon: User },
        ]
    }
  })()

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
      <nav className="w-full bg-white/95 backdrop-blur-sm shadow-lg px-3 py-2 flex items-center justify-between" style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}>
        {items.map((it) => {
          const Icon = it.icon
          return (
            <Link key={it.key} href={it.href} aria-label={it.label} className="flex-1">
              <div className="flex flex-col items-center justify-center gap-1 py-1">
                <Icon size={20} className={active === it.key ? 'text-primary' : 'text-secondary'} />
                <span className={`font-label-sm text-[11px] ${active === it.key ? 'text-primary font-semibold' : 'text-secondary'}`}>{it.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
