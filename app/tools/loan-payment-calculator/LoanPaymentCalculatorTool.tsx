'use client'

import { useState, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const schema = z.object({
  loanAmount: z.number().min(10000).max(10000000),
  interestRate: z.number().min(1).max(35),
  loanTermMonths: z.number().min(6).max(300),
  paymentFrequency: z.enum(['monthly', 'biweekly', 'weekly']),
})

type FormData = z.infer<typeof schema>

const termOptions = [
  { label: '6 Months', value: 6 },
  { label: '1 Year', value: 12 },
  { label: '2 Years', value: 24 },
  { label: '3 Years', value: 36 },
  { label: '5 Years', value: 60 },
  { label: '7 Years', value: 84 },
  { label: '10 Years', value: 120 },
  { label: '15 Years', value: 180 },
  { label: '20 Years', value: 240 },
  { label: '25 Years', value: 300 },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatCurrencyShort(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toFixed(0)}`
}

interface AmortizationRow {
  period: number
  payment: number
  principal: number
  interest: number
  balance: number
}

function calculateAmortization(
  loanAmount: number,
  annualRate: number,
  totalPeriods: number,
  periodsPerYear: number
): { payment: number; schedule: AmortizationRow[]; totalInterest: number; totalCost: number } {
  const periodicRate = annualRate / 100 / periodsPerYear

  let payment: number
  if (periodicRate === 0) {
    payment = loanAmount / totalPeriods
  } else {
    payment =
      (loanAmount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods))) /
      (Math.pow(1 + periodicRate, totalPeriods) - 1)
  }

  const schedule: AmortizationRow[] = []
  let balance = loanAmount
  let totalInterest = 0

  for (let i = 1; i <= totalPeriods; i++) {
    const interestPayment = balance * periodicRate
    const principalPayment = payment - interestPayment
    balance = Math.max(0, balance - principalPayment)
    totalInterest += interestPayment

    schedule.push({
      period: i,
      payment: payment,
      principal: principalPayment,
      interest: interestPayment,
      balance: balance,
    })
  }

  return {
    payment,
    schedule,
    totalInterest,
    totalCost: loanAmount + totalInterest,
  }
}

const labelClasses = 'block text-sm font-medium text-gray-700 mb-2'
const inputClasses =
  'w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors'

export default function LoanPaymentCalculatorTool() {
  const [showFullSchedule, setShowFullSchedule] = useState(false)

  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      loanAmount: 250000,
      interestRate: 8,
      loanTermMonths: 36,
      paymentFrequency: 'monthly',
    },
    mode: 'onChange',
  })

  const values = watch()

  const results = useMemo(() => {
    const { loanAmount, interestRate, loanTermMonths, paymentFrequency } = values

    if (!loanAmount || !interestRate || !loanTermMonths) return null

    let periodsPerYear: number
    let totalPeriods: number
    switch (paymentFrequency) {
      case 'biweekly':
        periodsPerYear = 26
        totalPeriods = Math.round((loanTermMonths / 12) * 26)
        break
      case 'weekly':
        periodsPerYear = 52
        totalPeriods = Math.round((loanTermMonths / 12) * 52)
        break
      default:
        periodsPerYear = 12
        totalPeriods = loanTermMonths
    }

    return calculateAmortization(loanAmount, interestRate, totalPeriods, periodsPerYear)
  }, [values])

  const chartData = useMemo(() => {
    if (!results) return []
    const step = Math.max(1, Math.floor(results.schedule.length / 50))
    return results.schedule
      .filter((_, i) => i % step === 0 || i === results.schedule.length - 1)
      .map((row) => ({
        period: row.period,
        principal: Math.round(row.principal),
        interest: Math.round(row.interest),
      }))
  }, [results])

  const payoffDate = useMemo(() => {
    if (!results) return ''
    const now = new Date()
    const { paymentFrequency } = values
    let daysToAdd: number
    switch (paymentFrequency) {
      case 'biweekly':
        daysToAdd = results.schedule.length * 14
        break
      case 'weekly':
        daysToAdd = results.schedule.length * 7
        break
      default:
        daysToAdd = results.schedule.length * 30.44
    }
    const payoff = new Date(now.getTime() + daysToAdd * 86400000)
    return payoff.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }, [results, values])

  const frequencyLabel = values.paymentFrequency === 'biweekly' ? 'Biweekly' : values.paymentFrequency === 'weekly' ? 'Weekly' : 'Monthly'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Form */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Loan Amount */}
          <div>
            <label className={labelClasses}>Loan Amount</label>
            <Controller
              control={control}
              name="loanAmount"
              render={({ field }) => (
                <>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      value={field.value.toLocaleString()}
                      onChange={(e) => {
                        const num = Number(e.target.value.replace(/[^0-9]/g, ''))
                        if (num >= 0 && num <= 10000000) field.onChange(num)
                      }}
                      className={`${inputClasses} pl-8`}
                    />
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={10000000}
                    step={10000}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full mt-3 accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$10K</span>
                    <span>$10M</span>
                  </div>
                </>
              )}
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className={labelClasses}>Annual Interest Rate</label>
            <Controller
              control={control}
              name="interestRate"
              render={({ field }) => (
                <>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.1}
                      min={1}
                      max={35}
                      value={field.value}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        if (!isNaN(val) && val >= 0 && val <= 35) field.onChange(val)
                      }}
                      className={`${inputClasses} pr-10`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={35}
                    step={0.5}
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="w-full mt-3 accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1%</span>
                    <span>35%</span>
                  </div>
                </>
              )}
            />
          </div>

          {/* Loan Term */}
          <div>
            <label className={labelClasses}>Loan Term</label>
            <Controller
              control={control}
              name="loanTermMonths"
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
                  {(['monthly', 'biweekly', 'weekly'] as const).map((freq) => (
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
                      {freq === 'biweekly' ? 'Biweekly' : freq === 'weekly' ? 'Weekly' : 'Monthly'}
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
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:p-8 lg:p-10">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-1">{frequencyLabel} Payment</p>
              <p className="text-3xl font-bold text-quicklend-900">
                {formatCurrency(results.payment)}
              </p>
            </div>
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Interest</p>
              <p className="text-3xl font-bold text-quicklend-900">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Cost</p>
              <p className="text-3xl font-bold text-quicklend-900">
                {formatCurrency(results.totalCost)}
              </p>
            </div>
          </div>

          {/* Payoff Date */}
          <div className="px-6 sm:px-8 lg:px-10 pb-4">
            <p className="text-sm text-gray-600 text-center">
              Estimated payoff date: <span className="font-semibold text-quicklend-900">{payoffDate}</span>
            </p>
          </div>

          {/* Amortization Chart */}
          {chartData.length > 1 && (
            <div className="px-6 sm:px-8 lg:px-10 pb-8">
              <h3 className="text-lg font-bold text-quicklend-900 mb-4">
                Payment Breakdown Over Time
              </h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="period"
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      label={{ value: `Payment #`, position: 'insideBottom', offset: -5, fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(v) => formatCurrencyShort(v)}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        name === 'principal' ? 'Principal' : 'Interest',
                      ]}
                      labelFormatter={(label) => `Payment #${label}`}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="principal"
                      name="Principal"
                      stackId="1"
                      stroke="#0066db"
                      fill="#0066db"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="interest"
                      name="Interest"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.4}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Amortization Table */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <button
              type="button"
              onClick={() => setShowFullSchedule(!showFullSchedule)}
              className="flex items-center gap-2 text-quicklend-600 font-semibold text-sm hover:text-quicklend-700 transition-colors mb-4"
            >
              {showFullSchedule ? 'Hide' : 'Show'} Amortization Schedule
              {showFullSchedule ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showFullSchedule && (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">#</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Payment</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Principal</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Interest</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.map((row) => (
                      <tr key={row.period} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-600">{row.period}</td>
                        <td className="px-4 py-2 text-right">{formatCurrency(row.payment)}</td>
                        <td className="px-4 py-2 text-right text-quicklend-600">{formatCurrency(row.principal)}</td>
                        <td className="px-4 py-2 text-right text-amber-600">{formatCurrency(row.interest)}</td>
                        <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-3">
                Want a personalized quote based on your business profile?
              </p>
              <Link
                href="/get-started?loan_type=not-sure&source=calculator&tool=loan-payment-calculator"
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
