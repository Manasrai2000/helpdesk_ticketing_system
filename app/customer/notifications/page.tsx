"use client"
import React, { useState } from 'react'
import TopBar from '../../../components/common/TopBar'
import BottomNav from '../../../components/common/BottomNav'
import RequireRole from '../../../components/auth/RequireRole'
import { User, Ticket, Bell, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type NotificationType = {
  id: string
  title: string
  time: string
  dateGroup: 'Today' | 'Yesterday' | 'Earlier'
  category: 'Tickets' | 'Team' | 'Alerts'
  description: string
  unread: boolean
  link?: string
}

const MOCK_NOTIFICATIONS: NotificationType[] = [
  {
    id: '1',
    title: 'Ticket #FC-8291 Assigned to John Doe',
    time: '10m ago',
    dateGroup: 'Today',
    category: 'Tickets',
    description: 'A new HVAC maintenance ticket has been delegated to your primary technician.',
    unread: true,
    link: '/customer/tickets'
  },
  {
    id: '2',
    title: 'Emergency Drill Schedule',
    time: '2h ago',
    dateGroup: 'Today',
    category: 'Alerts',
    description: 'Annual fire and safety inspection scheduled for Building B today at 2:00 PM.',
    unread: true
  },
  {
    id: '3',
    title: 'Technician Chat Message',
    time: '4h ago',
    dateGroup: 'Today',
    category: 'Team',
    description: 'Sarah Miller: "I have resolved the issue with the AC unit. Please confirm completion."',
    unread: false,
    link: '/customer/tickets'
  },
  {
    id: '4',
    title: 'Ticket #FC-2219 Closed',
    time: '1d ago',
    dateGroup: 'Yesterday',
    category: 'Tickets',
    description: 'Your ticket for Wall Paint Touchup has been closed successfully.',
    unread: false,
    link: '/customer/tickets?tab=closed'
  },
  {
    id: '5',
    title: 'System Maintenance Alert',
    time: '1d ago',
    dateGroup: 'Yesterday',
    category: 'Alerts',
    description: 'FacilityConnect app will undergo maintenance on Sunday from 2 AM to 4 AM.',
    unread: false
  },
  {
    id: '6',
    title: 'New Member Added to Team',
    time: '3d ago',
    dateGroup: 'Earlier',
    category: 'Team',
    description: 'Mike Knight has been assigned as the new lead maintenance technician for Building B.',
    unread: false
  },
  {
    id: '7',
    title: 'Ticket #FC-3392 Completed',
    time: '4d ago',
    dateGroup: 'Earlier',
    category: 'Tickets',
    description: 'Work completed for "Loose Door Knob". Thank you for your feedback!',
    unread: false,
    link: '/customer/tickets?tab=closed'
  }
]

function NotificationsPage() {
  const [filter, setFilter] = useState<'All' | 'Tickets' | 'Team' | 'Alerts'>('All')

  const filtered = MOCK_NOTIFICATIONS.filter(n => filter === 'All' || n.category === filter)

  const dateGroups: ('Today' | 'Yesterday' | 'Earlier')[] = ['Today', 'Yesterday', 'Earlier']

  function getCategoryIcon(cat: 'Tickets' | 'Team' | 'Alerts') {
    switch (cat) {
      case 'Tickets':
        return <Ticket size={18} className="text-primary" />
      case 'Team':
        return <User size={18} className="text-secondary" />
      case 'Alerts':
        return <Bell size={18} className="text-error" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-surface text-on-surface font-body-lg overflow-x-hidden">
      <TopBar title="Notifications" />
      <main className="max-w-[430px] mx-auto px-container-padding pt-6 pb-32 min-h-screen w-full">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {(['All', 'Tickets', 'Team', 'Alerts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap shadow-sm border transition-all ${
                filter === tab
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-lowest border-outline-variant text-secondary hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {dateGroups.map(group => {
          const groupNotifications = filtered.filter(n => n.dateGroup === group)
          if (groupNotifications.length === 0) return null

          return (
            <section key={group} className="mb-8">
              <h2 className="font-label-sm text-label-sm uppercase tracking-widest text-outline mb-4 px-1">{group}</h2>
              <div className="space-y-card-gap">
                {groupNotifications.map(n => (
                  <div
                    key={n.id}
                    className={`notification-card bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex gap-4 items-start shadow-sm transition-transform duration-100 active:scale-[0.99] relative overflow-hidden`}
                  >
                    {n.unread && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    )}
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(n.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <p className={`font-h3 text-body-lg leading-tight ${n.unread ? 'font-semibold text-primary' : 'text-on-surface'}`}>
                          {n.title}
                        </p>
                        <span className="font-label-sm text-[10px] text-outline whitespace-nowrap flex-shrink-0">{n.time}</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary leading-relaxed">{n.description}</p>
                      {n.link && (
                        <div className="mt-3">
                          <Link href={n.link} className="inline-flex items-center gap-1 text-label-sm font-label-md text-primary hover:underline">
                            <span>View details</span>
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-secondary text-body-sm">
            No notifications in this category.
          </div>
        )}
      </main>
      <BottomNav active="notifications" />
    </div>
  )
}

export default function NotificationsRoute() {
  return (
    <RequireRole allowed={["customer"]}>
      <NotificationsPage />
    </RequireRole>
  )
}
