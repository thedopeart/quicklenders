'use client'

import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceArea,
  ReferenceLine,
} from 'recharts'

const schema = z.object({
  fixedCosts: z.number().min(1000).max(1000000),
  pricePerUnit: z.number().min(1).max(10000),
  variableCostPerUnit: z.number().min(0.01).max(9999),
})

type FormData = z.infer<typeof schema>

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

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value)
}

const labelClasses = 'block text-sm font-medium text-gray-700 mb-2'
const inputClasses =
  'w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-quicklend-600 focus:ring-2 focus:ring-quicklend-600/20 focus:outline-none transition-colors'

export default function BreakEvenCalculatorTool() {
  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fixedCosts: 25000,
      pricePerUnit: 150,
      variableCostPerUnit: 60,
    },
    mode: 'onChange',
  })

  const values = watch()

  const results = useMemo(() => {
    const { fixedCosts, pricePerUnit, variableCostPerUnit } = values

    if (!fixedCosts || !pricePerUnit) return null

    const contributionMargin = pricePerUnit - variableCostPerUnit

    if (contributionMargin <= 0) {
      return { isValid: false as const }
    }

    const breakEvenUnits = fixedCosts / contributionMargin
    const breakEvenRevenue = breakEvenUnits * pricePerUnit
    const contributionMarginRatio = (contributionMargin / pricePerUnit) * 100

    return {
      isValid: true as const,
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio,
    }
  }, [values])

  const chartData = useMemo(() => {
    if (!results || !results.isValid) return []

    const maxUnits = Math.ceil(results.breakEvenUnits * 2)
    const step = Math.max(1, Math.floor(maxUnits / 40))
    const data = []

    for (let units = 0; units <= maxUnits; units += step) {
      data.push({
        units,
        revenue: units * values.pricePerUnit,
        totalCost: values.fixedCosts + units * values.variableCostPerUnit,
      })
    }

    // Ensure break-even point is in the data
    const beUnits = Math.round(results.breakEvenUnits)
    const beExists = data.some((d) => d.units === beUnits)
    if (!beExists) {
      data.push({
        units: beUnits,
        revenue: beUnits * values.pricePerUnit,
        totalCost: values.fixedCosts + beUnits * values.variableCostPerUnit,
      })
      data.sort((a, b) => a.units - b.units)
    }

    return data
  }, [results, values])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Form */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Fixed Costs */}
          <div>
            <label className={labelClasses}>Fixed Costs (Monthly)</label>
            <Controller
              control={control}
              name="fixedCosts"
              render={({ field }) => (
                <>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      value={field.value.toLocaleString()}
                      onChange={(e) => {
                        const num = Number(e.target.value.replace(/[^0-9]/g, ''))
                        if (num >= 0 && num <= 1000000) field.onChange(num)
                      }}
                      className={`${inputClasses} pl-8`}
                    />
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={1000000}
                    step={1000}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full mt-3 accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$1K</span>
                    <span>$1M</span>
                  </div>
                </>
              )}
            />
          </div>

          {/* Price Per Unit */}
          <div>
            <label className={labelClasses}>Price Per Unit</label>
            <Controller
              control={control}
              name="pricePerUnit"
              render={({ field }) => (
                <>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step={1}
                      min={1}
                      max={10000}
                      value={field.value}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        if (!isNaN(val) && val >= 0 && val <= 10000) field.onChange(val)
                      }}
                      className={`${inputClasses} pl-8`}
                    />
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10000}
                    step={1}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full mt-3 accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$1</span>
                    <span>$10,000</span>
                  </div>
                </>
              )}
            />
          </div>

          {/* Variable Cost Per Unit */}
          <div>
            <label className={labelClasses}>Variable Cost Per Unit</label>
            <Controller
              control={control}
              name="variableCostPerUnit"
              render={({ field }) => (
                <>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step={1}
                      min={0.01}
                      max={9999}
                      value={field.value}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        if (!isNaN(val) && val >= 0 && val <= 9999) field.onChange(val)
                      }}
                      className={`${inputClasses} pl-8`}
                    />
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={9999}
                    step={1}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full mt-3 accent-quicklend-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$1</span>
                    <span>$9,999</span>
                  </div>
                </>
              )}
            />
          </div>
        </div>
      </div>

      {/* Edge Case: Price <= Variable Cost */}
      {results && !results.isValid && (
        <div className="border-t border-gray-100">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <p className="font-semibold text-red-800 mb-2">No Break-Even Point Exists</p>
              <p className="text-red-700 text-sm leading-relaxed">
                Your price per unit (${values.pricePerUnit.toFixed(2)}) is equal to or less than your
                variable cost per unit (${values.variableCostPerUnit.toFixed(2)}). This means every
                unit sold generates a loss, so you can never cover your fixed costs through sales
                alone. To reach a break-even point, you must either raise your price or lower your
                variable cost per unit.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results && results.isValid && (
        <div className="border-t border-gray-100">
          {/* Primary Highlight Card */}
          <div className="p-6 sm:p-8 lg:p-10 text-center">
            <p className="text-sm text-gray-600 mb-2">Break-Even Point</p>
            <div className="inline-block bg-quicklend-50 border border-quicklend-200 rounded-2xl px-10 py-6">
              <p className="text-5xl font-bold text-quicklend-900">
                {formatNumber(Math.ceil(results.breakEvenUnits))}
              </p>
              <p className="text-sm text-quicklend-700 mt-1">units to break even</p>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Break-Even Revenue</p>
              <p className="text-xl font-bold text-quicklend-900">
                {formatCurrency(results.breakEvenRevenue)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Contribution Margin / Unit</p>
              <p className="text-xl font-bold text-quicklend-900">
                {formatCurrency(results.contributionMargin)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">Contribution Margin Ratio</p>
              <p className="text-xl font-bold text-quicklend-900">
                {results.contributionMarginRatio.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Chart */}
          {chartData.length > 1 && (
            <div className="px-6 sm:px-8 lg:px-10 pb-8">
              <h3 className="text-lg font-bold text-quicklend-900 mb-4">
                Revenue vs. Total Cost
              </h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    {/* Loss zone: 0 to break-even */}
                    <ReferenceArea
                      x1={0}
                      x2={Math.round(results.breakEvenUnits)}
                      fill="#fecaca"
                      fillOpacity={0.3}
                    />
                    {/* Profit zone: break-even to max */}
                    <ReferenceArea
                      x1={Math.round(results.breakEvenUnits)}
                      x2={chartData[chartData.length - 1]?.units}
                      fill="#bbf7d0"
                      fillOpacity={0.3}
                    />
                    {/* Break-even line */}
                    <ReferenceLine
                      x={Math.round(results.breakEvenUnits)}
                      stroke="#6b7280"
                      strokeDasharray="6 4"
                      label={{
                        value: 'Break-Even',
                        position: 'top',
                        fontSize: 12,
                        fill: '#6b7280',
                      }}
                    />
                    <XAxis
                      dataKey="units"
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(v) => formatNumber(v)}
                      label={{
                        value: 'Units Sold',
                        position: 'insideBottom',
                        offset: -5,
                        fontSize: 12,
                        fill: '#6b7280',
                      }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(v) => formatCurrencyShort(v)}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        name === 'revenue' ? 'Revenue' : 'Total Cost',
                      ]}
                      labelFormatter={(label) => `${formatNumber(Number(label))} units`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#0066db"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalCost"
                      name="Total Cost"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-red-200" /> Loss Zone
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-green-200" /> Profit Zone
                </span>
              </div>
            </div>
          )}

          {/* Context Callout */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <p className="font-semibold text-quicklend-900 mb-2">What does this mean?</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                At a price of {formatCurrency(values.pricePerUnit)} and a variable cost of{' '}
                {formatCurrency(values.variableCostPerUnit)} per unit, each sale contributes{' '}
                <span className="font-bold text-quicklend-900">
                  {formatCurrency(results.contributionMargin)}
                </span>{' '}
                toward covering your {formatCurrency(values.fixedCosts)} in monthly fixed costs. You
                need to sell{' '}
                <span className="font-bold text-quicklend-900">
                  {formatNumber(Math.ceil(results.breakEvenUnits))} units
                </span>{' '}
                ({formatCurrency(results.breakEvenRevenue)} in revenue) before you start generating
                profit.
              </p>
              <p className="text-gray-600 text-sm">
                If you are considering financing to grow your business — such as a{' '}
                <Link
                  href="/business-loans/term-loans"
                  className="text-theme-primary-light font-medium hover:underline"
                >
                  term loan
                </Link>{' '}
                or{' '}
                <Link
                  href="/business-loans/equipment-financing"
                  className="text-theme-primary-light font-medium hover:underline"
                >
                  equipment financing
                </Link>{' '}
                — add the monthly payment to your fixed costs and re-run this calculator to see the
                new break-even point.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 sm:px-8 lg:px-10 pb-8">
            <div className="bg-quicklend-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-3">
                Need financing to scale past your break-even point?
              </p>
              <Link
                href="/get-started?source=calculator&tool=break-even-calculator"
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
