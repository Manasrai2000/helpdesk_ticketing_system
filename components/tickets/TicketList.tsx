"use client"
import React, { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'

type Ticket = {
  id: string
  title: string
  description: string
  priority?: string
  status?: string
  date?: string
  assignee?: string
}

const SAMPLE: Ticket[] = [
  { id: '#FC-8291', title: 'Leaking Bathroom Tap', description: 'Reported in Executive Suite 402. Water pressure is fluctuating.', status: 'In Progress', date: 'Oct 24, 2023', assignee: 'John Doe' },
  { id: '#FC-7104', title: 'AC Unit Noise Complaint', description: 'Main Hallway unit 3 is making a grinding noise every 20 minutes.', status: 'Pending Approval', date: 'Oct 23, 2023', assignee: 'Sarah Miller' },
  { id: '#FC-9012', title: 'Broken Keypad Access', description: 'Main storage room entrance. Keypad is not responding to codes.', status: 'Urgent', date: 'Oct 25, 2023', assignee: 'Unassigned' },
  { id: '#FC-8111', title: 'Light Fixture Flickering', description: 'Conference Room B. Third row fixture needs ballast replacement.', status: 'In Progress', date: 'Oct 22, 2023', assignee: 'Mike Knight' },
  { id: '#FC-2219', title: 'Wall Paint Touchup', description: 'Paint peeling in Lobby area.', status: 'Completed', date: 'Oct 20, 2023', assignee: 'John Doe' },
  { id: '#FC-3392', title: 'Loose Door Knob', description: 'Room 102 entry door knob was loose.', status: 'Completed', date: 'Oct 19, 2023', assignee: 'Sarah Miller' },
]

export default function TicketList({ tab = 'active' }: { tab?: 'active' | 'closed' }) {
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('tickets')
        if (raw) {
          setTickets(JSON.parse(raw))
          return
        }
      } catch (e) {
        console.error(e)
      }
      setTickets(SAMPLE)
    }

    load()

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'tickets') load()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const filteredTickets = tickets.filter(t => {
    const isClosed = t.status === 'Completed' || t.status === 'Closed' || t.status === 'Done'
    return tab === 'closed' ? isClosed : !isClosed
  })

  return (
    <div className="space-y-card-gap">
      {filteredTickets.length === 0 ? (
        <div className="text-center py-8 text-secondary text-body-sm">
          No {tab} tickets found.
        </div>
      ) : (
        filteredTickets.map((t) => (
          <div key={t.id} className="ticket-card bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-100">
            <div className="flex justify-between items-start">
              <span className="font-mono-sm text-[10px] leading-none text-on-secondary-container bg-secondary-container/30 px-1.5 py-0.5 rounded">{t.id}</span>
              <span className="inline-flex items-center rounded-full bg-secondary-container px-2 py-0.5 text-[11px] font-medium text-on-secondary-fixed-variant">{t.status}</span>
            </div>
            <div>
              <h3 className="font-h3 text-h3 text-on-background mb-1">{t.title}</h3>
              <p className="text-body-sm text-secondary">{t.description}</p>
            </div>
            <div className="pt-2 border-t border-outline-variant flex items-center justify-between text-label-sm text-secondary">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{t.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant">
                  <span className="text-[10px] font-bold">{(t.assignee || 'Unassigned').split(' ').map(n=>n[0]).slice(0,2).join('')}</span>
                </div>
                <span className="font-medium text-on-surface">{t.assignee || 'Unassigned'}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
