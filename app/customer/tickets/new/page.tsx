import React from 'react'
import TopBar from '../../../../components/common/TopBar'
import BottomNav from '../../../../components/common/BottomNav'
import RaiseTicketForm from '../../../../components/tickets/RaiseTicketForm'

export default function NewTicketPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <TopBar title="Raise a Ticket" />
      <main className="w-full max-w-[430px] flex-1 px-container-padding py-6">
        <div className="space-y-6">
          <section className="space-y-1">
            <p className="text-secondary font-body-sm">Submit a new facility request or report an issue. Our maintenance team will review it shortly.</p>
          </section>

          <RaiseTicketForm />
        </div>
      </main>
      <BottomNav active="tickets" />
    </div>
  )
}
