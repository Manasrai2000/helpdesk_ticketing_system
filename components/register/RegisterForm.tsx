"use client"
import React, { useState } from 'react'
import Link from 'next/link'

export default function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  function togglePassword() {
    setPasswordVisible((v) => !v)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const password = formData.get('password')?.toString() || ''
    const confirm = formData.get('confirm')?.toString() || ''
    if (password !== confirm) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Registration successful! You can now log in.')
    }, 1200)
  }

  return (
    <main className="w-full max-w-[430px] flex flex-col gap-xl px-4">
      <header className="flex flex-col items-center text-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-primary text-[32px]">⚙️</span>
          <h1 className="text-h1 font-semibold">FacilityConnect</h1>
        </div>
        <div className="mt-3">
          <h2 className="text-h2 font-medium">Create account</h2>
          <p className="text-body-sm text-secondary">Enter details to create your account</p>
        </div>
      </header>

      <section className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-6">
        <form id="registerForm" onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-on-background" htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" required placeholder="Your name" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-on-background placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-on-background" htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required placeholder="m@example.com" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-on-background placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-on-background" htmlFor="password">Password</label>
            <div className="relative">
              <input id="password" name="password" type={passwordVisible ? 'text' : 'password'} required placeholder="••••••••" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-on-background placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary" />
              <button type="button" onClick={togglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">{passwordVisible ? '🙈' : '👁️'}</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-on-background" htmlFor="confirm">Confirm password</label>
            <input id="confirm" name="confirm" type={passwordVisible ? 'text' : 'password'} required placeholder="••••••••" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-on-background placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary text-on-primary py-2 rounded-lg font-medium hover:opacity-90 active:scale-95 transition">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">Google</button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">SSO</button>
        </div>
      </section>

      <footer className="text-center mt-4">
        <p className="text-sm text-secondary">Already have an account? <Link href="/login" className="text-primary font-semibold">Sign in</Link></p>
      </footer>
    </main>
  )
}
