'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: wire up to API endpoint
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Thank you for reaching out!
        </h3>
        <p className="text-green-700">
          We have received your message and will get back to you within one
          business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary outline-none transition-colors"
          placeholder="John Smith"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary outline-none transition-colors"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary outline-none transition-colors"
          placeholder="(555) 555-5555"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary outline-none transition-colors resize-y"
          placeholder="Tell us how we can help..."
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-theme-primary text-theme-primary-fg font-medium py-3 px-6 hover:bg-theme-primary/90 transition-colors"
      >
        Send Message
      </button>
    </form>
  )
}
