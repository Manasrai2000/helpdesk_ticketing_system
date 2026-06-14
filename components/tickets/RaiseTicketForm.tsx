"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormState = {
  category: string
  title: string
  priority: string
  description: string
  files: File[]
}

function uid() {
  return '#FC-' + Math.floor(1000 + Math.random() * 9000).toString()
}

export default function RaiseTicketForm() {
  const [form, setForm] = useState<FormState>({ category: '', title: '', priority: 'low', description: '', files: [] })
  const [previews, setPreviews] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : []
    setForm((s) => ({ ...s, files }))
    const readers: Promise<string>[] = files.slice(0,4).map(f => new Promise((res) => {
      const r = new FileReader()
      r.onload = () => res(String(r.result))
      r.readAsDataURL(f)
    }))
    Promise.all(readers).then(setPreviews)
  }

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }))
  }

  function saveTicket() {
    const t = {
      id: uid(),
      title: form.title || 'Untitled',
      description: form.description || '',
      priority: form.priority,
      status: form.priority === 'high' ? 'Urgent' : 'Pending',
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      assignee: 'Unassigned'
    }
    try {
      const raw = localStorage.getItem('tickets')
      const arr = raw ? JSON.parse(raw) : []
      arr.unshift(t)
      localStorage.setItem('tickets', JSON.stringify(arr))
      // also trigger storage event for other tabs
      window.dispatchEvent(new StorageEvent('storage', { key: 'tickets', newValue: JSON.stringify(arr) }))
    } catch (e) {
      console.error(e)
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      saveTicket()
      setSubmitting(false)
      router.push('/customer/tickets')
    }, 700)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface">Category <span className="text-error">*</span></label>
        <select required value={form.category} onChange={(e)=>update('category', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg h-12 px-4">
          <option value="">Select Category</option>
          <option value="plumbing">Plumbing & HVAC</option>
          <option value="electrical">Electrical</option>
          <option value="security">Security & Access</option>
          <option value="cleaning">Janitorial & Cleaning</option>
          <option value="furniture">Furniture & Layout</option>
          <option value="it">IT & Infrastructure</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface">Ticket Title <span className="text-error">*</span></label>
        <input required value={form.title} onChange={(e)=>update('title', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg h-12 px-4" placeholder="Brief summary of the issue" />
      </div>

      <div className="space-y-3">
        <label className="font-label-md text-label-md text-on-surface">Priority Level</label>
        <div className="priority-segmented flex bg-surface-container-high p-1 rounded-xl h-11 bg-gray-200/50 border border-outline-variant">
          <label className={`flex-1 relative cursor-pointer`}>
            <input className="hidden" type="radio" name="priority" checked={form.priority==='low'} onChange={()=>update('priority','low')} />
            <div className={`h-full flex items-center justify-center rounded-lg transition ${form.priority==='low' ? 'bg-primary text-on-primary' : 'text-secondary'}`}>Low</div>
          </label>
          <label className={`flex-1 relative cursor-pointer`}>
            <input className="hidden" type="radio" name="priority" checked={form.priority==='medium'} onChange={()=>update('priority','medium')} />
            <div className={`h-full flex items-center justify-center rounded-lg transition ${form.priority==='medium' ? 'bg-primary text-on-primary' : 'text-secondary'}`}>Medium</div>
          </label>
          <label className={`flex-1 relative cursor-pointer`}>
            <input className="hidden" type="radio" name="priority" checked={form.priority==='high'} onChange={()=>update('priority','high')} />
            <div className={`h-full flex items-center justify-center rounded-lg transition ${form.priority==='high' ? 'bg-primary text-on-primary' : 'text-secondary'}`}>High</div>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface">Description</label>
        <textarea value={form.description} onChange={(e)=>update('description', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 resize-none" rows={4} placeholder="Describe the problem in detail (location, frequency, impact)..." />
      </div>

      <div className="space-y-3">
        <label className="font-label-md text-label-md text-on-surface">Evidence (Photos & Video)</label>
        <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-surface-container-low/30 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
            <span className="text-primary">📷</span>
          </div>
          <div className="text-center">
            <p className="font-label-md text-primary">Tap to upload files</p>
            <p className="font-body-sm text-secondary">PNG, JPG, or MP4 (Max 25MB)</p>
          </div>
          <input id="fileInput" onChange={onFileChange} className="hidden" type="file" multiple />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {previews.map((p,i)=>(<div key={i} className="w-full aspect-square bg-surface-container-high rounded-lg flex items-center justify-center overflow-hidden border border-outline-variant"><img src={p} alt="preview" className="object-cover w-full h-full"/></div>))}
        </div>
      </div>

      <div className="pt-4 pb-8">
        <button disabled={submitting} type="submit" className="w-full bg-primary text-on-primary h-14 rounded-xl font-h3 transition-transform shadow-sm flex items-center justify-center gap-2">
          {submitting ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </div>
    </form>
  )
}
