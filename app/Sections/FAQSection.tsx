import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/Accordion'

const faqs = [
    {
        q: "Question",
        a: "Answer",
    },
    {
        q: "Question",
        a: "Answer",
    },
    {
        q: "Question",
        a: "Answer",
    },
    {
        q: "Question",
        a: "Answer",
    },
    {
        q: "Question",
        a: "Answer",
    },
]

const FAQSection = () => {
    return (
        <section className="w-full py-10 lg:py-20">
            <div className="container">
                <hgroup className="mb-20 text-center">
                    <p className="text-theme-primary-light text-sm leading-10 uppercase tracking-widest font-bold">Frequently Asked Questions</p>
                    <h2 className="text-theme-primary-dark text-4xl font-bold leading-normal">Get fast answers to your questions</h2>
                </hgroup>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible>
                        {
                            faqs.map((faq, index) => (
                                <AccordionItem
                                    key={`faq-item-${index}`}
                                    value={`faq-item-${index}`}
                                >
                                    <AccordionTrigger className="text-theme-primary-dark text-lg font-medium">{faq.q}</AccordionTrigger>
                                    <AccordionContent className="text-theme-dark-gray leading-relaxed">{faq.a}</AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default FAQSection