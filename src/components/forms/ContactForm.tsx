import { useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { contact } from '@/content/pages'

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Public Web3Forms access key (safe to expose in client-side code by design).
const WEB3FORMS_ACCESS_KEY = '8292fc0c-bb7f-444a-8ef0-b6375210870d'

const field =
  'w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40'
const labelCls = 'mb-1.5 block text-sm font-medium text-slate-700'

/**
 * Contact form wired to Web3Forms (https://web3forms.com).
 *
 * Email formatting: Web3Forms uses each field's `name` attribute as its label
 * in the email, so the inputs below are named "First Name", "Email", etc. The
 * subject and reply-to are set dynamically from the submission so replies go
 * straight back to the sender. Submissions are emailed to the address set in
 * the Web3Forms dashboard (inquiries@cmcmod.com).
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [phone, setPhone] = useState('')

  // Keep the phone field numbers-only and auto-format it as (XXX) XXX-XXXX.
  function formatPhone(input: string) {
    const digits = input.replace(/\D/g, '').slice(0, 10)
    if (digits.length === 0) return ''
    if (digits.length < 4) return `(${digits}`
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('submitting')

    try {
      const formData = new FormData(form)
      const first = (formData.get('First Name') ?? '').toString().trim()
      const last = (formData.get('Last Name') ?? '').toString().trim()
      const email = (formData.get('Email') ?? '').toString().trim()
      const fullName = `${first} ${last}`.trim()

      // Nicely formatted subject + reply directly to the sender.
      formData.append(
        'subject',
        fullName ? `New website inquiry from ${fullName}` : 'New website inquiry — cmcmod.com',
      )
      if (email) formData.append('replyto', email)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        setStatus('success')
        form.reset()
        setPhone('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-2xl border border-green-200 bg-green-50 p-8 text-center sm:p-10"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30">
          <Check className="h-9 w-9 text-white" strokeWidth={3} aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-green-900">Message Sent!</h3>
        <p className="mt-2 max-w-md text-green-800">{contact.form.successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Web3Forms configuration */}
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="from_name" value="CMC Website Contact Form" />
      {/* Honeypot — bots that tick this are silently rejected by Web3Forms */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelCls}>
            First Name
          </label>
          <input
            id="firstName"
            name="First Name"
            type="text"
            autoComplete="given-name"
            required
            className={field}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelCls}>
            Last Name
          </label>
          <input
            id="lastName"
            name="Last Name"
            type="text"
            autoComplete="family-name"
            required
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="Email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            title="Please enter a valid email address that includes an @."
            className={field}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone
          </label>
          <input
            id="phone"
            name="Phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(555) 123-4567"
            pattern="\(\d{3}\) \d{3}-\d{4}"
            title="Enter a 10-digit phone number"
            maxLength={14}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea id="message" name="Message" rows={5} required className={field} />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {contact.form.errorMessage}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full">
        {status === 'submitting' ? 'Sending…' : 'Submit'}
      </Button>
    </form>
  )
}
