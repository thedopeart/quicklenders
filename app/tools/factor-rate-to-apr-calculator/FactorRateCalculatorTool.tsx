'use client'

import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

const schema = z.object({
  loanAmount: z.number().min(1000).max(5000000),
  factorRate: z.number().min(1.01).max(2.0),
  repaymentTermMonths: z.number().min(1).max(60),
  paymentFrequency: z.enum(['daily', 'weekly', 'monthly']),
})

type FormData = z.infer<typeof schema>

const termOptions = [
  { label: '1 Month', value: 1 },
  { label: '2 Months', value: 2 },
  { label: '3 Months', value: 3 },
  { label: '4 Months', value: 4 },
  { label: '6 Months', value: 6 },
  { label: '9 Months', value: 9 },
  { label: '12 Months', value: 12 },
  { label: '18 Months', value: 18 },
  { label: '24 Months', value: 24 },
  { label: '36 Months', value: 36 },
  { label: '48 Months', value: 48 },
  { label: '60 Months', value: 60 },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

const labelClasses = 'block text-sm font-medium text-gray-700 mb-2'
const inputClasses =
  'w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors'

export default function FactorRateCalculatorTool() {
  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      loanAmount: 50000,
      factorRate: 1.3,
      repaymentTermMonths: 12,
      paymentFrequency: 'daily',
    },
    mode: 'onChange',
  })

  const values = watch()

  const results = useMemo(() => {
    const { loanAmount, factorRate, repaymentTermMonths, paymentFrequency } = values

    if (!loanAmount || !factorRate || !repaymentTermMonths) return null

    const totalRepayment = loanAmount * factorRate
    const totalInterest = totalRepayment - loanAmount
    const termInYears = repaymentTermMonths / 12
    const apr = ((factorRate - 1) / termInYears) * 100
    const costPerDollar = factorRate - 1

    let totalPayments: number
    let paymentAmount: number
    let frequencyLabel: string

    switch (paymentFrequency) {
      case 'daily':
        totalPayments = Math.round(repaymentTermMonths * 21.67) // ~business days per month
        paymentAmount = totalRepayment / totalPayments
        frequencyLabel = 'Daily'
        break
      case 'weekly':
        totalPayments = Math.round(repaymentTermMonths * 4.33)
        paymentAmount = totalRepayment / totalPayments
        frequencyLabel = 'Weekly'
        break
      default:
        totalPayments = repaymentTermMonths
        paymentAmount = totalRepayment / totalPayments
        frequencyLabel = 'Monthly'
    }

    return {
      apr,
      totalRepayment,
      totalInterest,
      costPerDollar,
      paymentAmount,
      totalPayments,
      frequencyLabel,
    }
  }, [values])

  const contextMessage = useMemo(() => {
    if (!results) return ''
    const { apr } = results
    if (apr > 100) return 'This is extremely expensive financing. Traditional business loans typically range from 4-30% APR.'
    if (apr > 50) return 'This is very expensive financing. Consider comparing against traditional term loans or lines of credit.'
    if (apr > 30) return 'This is above-average cost financing. You may qualify for lower rates with a traditional business loan.'
    return 'This rate is relatively competitive for factor-rate-based financing, but traditional loans may still offer lower rates.'
  }, [results])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Form */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Loan Amount */}
          <div>
            <label className={labelClasses}>Loan / Advance Amount</label>
            <Controller
              control={control}
              name="loanAmount"
              render={({ field }) => (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={field.value.toLocaleString()}
                    onChange={(e) => {
                      const num = Number(e.target.value.replace(/[^0-9]/g, ''))
                      if (num >= 0 && num <= 5000000) field.onChange(num)
                    }}
                    className={`${inputClasses} pl-8`}
                  />
                </div>
              )}
            />
          </div>

          {/* Factor Rate */}
          <div>
            <label className={labelClasses}>Factor Rate</label>
            <Controller
              control={control}
              name="factorRate"
              render={({ field }) => (
                <>
                  <input
                    type="number"
                    step={0.01}
                    min={1.01}
                    max={2.0}
                    value={field.value}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value)
                      if (!isNaN(val) && val >= 1.0 && val <= 2.0) field.onChange(val)
                    }}
                    className={inputClasses}
                  />
                  <input
                    type="range"
                    min={1.01}
                    max={2.0}
                    step={0.01}
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="w-full mt-3 accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1.01</span>
                    <span>2.00</span>
                  </div>
                </>
              )}
            />
          </div>

          {/* Repayment Term */}
          <div>
            <label className={labelClasses}>Repayment Term</label>
            <Controller
              control={control}
              name="repaymentTermMonths"
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className={inputClasses}
                >
                  {termOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Payment Frequency */}
          <div>
            <label className={labelClasses}>Payment Frequency</label>
            <Controller
              control={control}
              name="paymentFrequency"
              render={({ field }) => (
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => field.onChange(freq)}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${
                        field.value === freq
                          ? 'bg-quicklend-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {freq === 'daily' ? 'Daily' : freq === 'weekly' ? 'Weekly' : 'Monthly'}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="border-t border-gray-100">
          {/* APR Highlight */}
          <div className="p-6 sm:p-8 lg:p-10 text-center">
            <p className="text-sm text-gray-600 mb-2">Estimated Annual Percentage Rate (APR)</p>
            <div className="inline-block bg-amber-50 border border-amber-200 rounded-2xl px-10 py-6">
              <p className="text-5xl font-bold text-amber-700">
                {results.apr.toFixed(1)}%
              </p>
              <p className="text-sm text-amber-600 mt-1">APR</p>
            </div>
          </div>

          {/* Detail Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Repayment</p>
              <p className="text-xl font-bold text-quicklend-900">
                {formatCurrency(results.totalRepayment)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Interest / Fees</p>
              <p className="text-xl font-bold text-quicklend-900">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Cost per $1 Borrowed</p>
              <p className="text-xl font-bold text-quicklend-900">
                ${results.costPerDollar.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">{results.frequencyLabel} Payment</p>
              <p className="text-xl font-bold text-quicklend-900">
                {formatCurrency(results.paymentAmount)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {results.totalPayments} payments
              </p>
            </div>
          </div>

          {/* Context Callout */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <p className="font-semibold text-quicklend-900 mb-2">What does this mean?</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                A {values.factorRate.toFixed(2)} factor rate on {values.repaymentTermMonths} months equals approximately{' '}
                <span className="font-bold text-amber-700">{results.apr.toFixed(1)}% APR</span>.{' '}
                {contextMessage}
              </p>
              <p className="text-gray-600 text-sm">
                Traditional <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business term loans</Link> typically offer APRs between 4% and 30%, with transparent interest rates and fixed monthly payments.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-3">
                Looking for lower-cost financing options for your business?
              </p>
              <Link
                href="/get-started?loan_type=not-sure&source=calculator&tool=factor-rate-calculator"
                className="inline-block bg-quicklend-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-quicklend-700 transition-colors"
              >
                Get Your Options
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
