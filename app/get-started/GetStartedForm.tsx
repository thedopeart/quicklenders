'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const loanTypes = [
  'Term Loan',
  'Line of Credit',
  'Equipment Financing',
  'Asset-Based',
  'ESOP',
  'Investment Banking',
  'Bonds',
  'Not Sure',
] as const

const amountRanges = [
  'Under $50,000',
  '$50,000 - $150,000',
  '$150,000 - $500,000',
  '$500,000 - $1M',
  '$1M - $5M',
  '$5M - $25M',
  '$25M+',
] as const

const timeInBusinessOptions = [
  'Less than 1 year',
  '1-2 years',
  '3-5 years',
  '5-10 years',
  '10+ years',
] as const

const urgencyOptions = [
  'ASAP',
  '1-2 weeks',
  '1-3 months',
  'Just exploring',
] as const

const leadSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  businessName: z.string().min(1, 'Please enter your business name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  loanType: z.string().min(1, 'Please select a loan type'),
  estimatedAmount: z.string().min(1, 'Please select an estimated amount'),
  timeInBusiness: z.string().min(1, 'Please select time in business'),
  urgency: z.string().min(1, 'Please select how soon you need funding'),
  notes: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: 'You must agree to the consent terms to continue',
  }),
  website: z.string().optional(),
  source: z.string().optional(),
  page: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadSchema>

const labelClasses = 'block text-sm font-medium text-gray-700 mb-1'
const inputClasses =
  'w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-colors'
const errorClasses = 'mt-1 text-sm text-red-600'

export default function GetStartedForm() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      loanType: searchParams.get('loan_type') || '',
      source: searchParams.get('source') || '',
      page: searchParams.get('page') || '',
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      estimatedAmount: '',
      timeInBusiness: '',
      urgency: '',
      notes: '',
      consent: false,
      website: '',
    },
  })

  const onSubmit = async (data: LeadFormData) => {
    setServerError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        setServerError(json.error || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
    } catch {
      setServerError('Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="rounded-2xl bg-white p-12 shadow-sm border border-gray-100">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thank you for reaching out
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            We have received your information and a funding specialist will review your details.
          </p>
          <p className="text-lg font-medium text-gray-800">
            We will reach out within 1 business day.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl bg-white p-8 sm:p-10 shadow-sm border border-gray-100 space-y-6"
    >
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input {...register('website')} id="website" type="text" autoComplete="off" tabIndex={-1} />
      </div>

      <input {...register('source')} type="hidden" />
      <input {...register('page')} type="hidden" />

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className={labelClasses}>Full Name</label>
        <input
          {...register('fullName')}
          id="fullName"
          type="text"
          placeholder="John Smith"
          className={inputClasses}
        />
        {errors.fullName && <p className={errorClasses}>{errors.fullName.message}</p>}
      </div>

      {/* Business Name */}
      <div>
        <label htmlFor="businessName" className={labelClasses}>Business Name</label>
        <input
          {...register('businessName')}
          id="businessName"
          type="text"
          placeholder="Acme Corp"
          className={inputClasses}
        />
        {errors.businessName && <p className={errorClasses}>{errors.businessName.message}</p>}
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="john@acme.com"
            className={inputClasses}
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone</label>
          <input
            {...register('phone')}
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            className={inputClasses}
          />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Loan Type */}
      <div>
        <label htmlFor="loanType" className={labelClasses}>Loan Type Interest</label>
        <select {...register('loanType')} id="loanType" className={inputClasses}>
          <option value="">Select a loan type</option>
          {loanTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.loanType && <p className={errorClasses}>{errors.loanType.message}</p>}
      </div>

      {/* Estimated Amount and Time in Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="estimatedAmount" className={labelClasses}>Estimated Amount Needed</label>
          <select {...register('estimatedAmount')} id="estimatedAmount" className={inputClasses}>
            <option value="">Select a range</option>
            {amountRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          {errors.estimatedAmount && <p className={errorClasses}>{errors.estimatedAmount.message}</p>}
        </div>
        <div>
          <label htmlFor="timeInBusiness" className={labelClasses}>Time in Business</label>
          <select {...register('timeInBusiness')} id="timeInBusiness" className={inputClasses}>
            <option value="">Select time in business</option>
            {timeInBusinessOptions.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.timeInBusiness && <p className={errorClasses}>{errors.timeInBusiness.message}</p>}
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label htmlFor="urgency" className={labelClasses}>How Soon Do You Need Funding?</label>
        <select {...register('urgency')} id="urgency" className={inputClasses}>
          <option value="">Select a timeline</option>
          {urgencyOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.urgency && <p className={errorClasses}>{errors.urgency.message}</p>}
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelClasses}>
          Anything else we should know? <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          {...register('notes')}
          id="notes"
          rows={4}
          placeholder="Tell us about your business goals, current situation, or any questions you have."
          className={inputClasses}
        />
      </div>

      {/* Consent */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('consent')}
            id="consent"
            type="checkbox"
            className="mt-1 h-5 w-5 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
          />
          <span className="text-xs text-gray-600 leading-relaxed">
            By checking this box and clicking &ldquo;Get Your Options,&rdquo; I agree to the{' '}
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">
              Privacy Policy
            </a>
            , and I provide my express written consent for Quick Lenders and its lending partners to contact me at the phone number and email address I provided &mdash; including via automated telephone dialing system, artificial or prerecorded voice, and SMS/text message &mdash; regarding my business financing request, even if my number is on a federal or state Do Not Call list. I understand that consent is not a condition of any purchase, that message and data rates may apply, and that I can reply STOP to opt out of text messages at any time. I also confirm that I am the subscriber to, or the customary user of, the phone number provided and that I am at least 18 years old.
          </span>
        </label>
        {errors.consent && <p className={`${errorClasses} ml-8`}>{errors.consent.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-red-600 text-center">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Get Your Options'}
      </button>

      <p className="text-center text-xs text-gray-500">
        No obligation. No hard credit pull for pre-qualification. Your information is kept confidential.
      </p>
    </form>
  )
}
