import './globals.css'
import React from 'react'
import { RoleProvider } from '../components/auth/role-context'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="font-sans antialiased min-h-screen">
        <RoleProvider>{children}</RoleProvider>
      </body>
    </html>
  )
}
