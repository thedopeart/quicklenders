'use client'

import { ReactNode } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion'
import { cn } from '@/lib/utils'

interface FAQ {
  question: string
  answer: ReactNode
}

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  className?: string
}

export default function FAQSection({ faqs, title = 'Frequently Asked Questions', className }: FAQSectionProps) {
  return (
    <section className={cn('py-16 lg:py-20 bg-white', className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-quicklend-900 mb-10 text-center">
            {title}
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-white rounded-xl border border-gray-100 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-quicklend-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-gray-600 leading-relaxed">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
