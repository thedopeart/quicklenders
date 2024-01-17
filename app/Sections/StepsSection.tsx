// ** Framer Motion Imports
import { motion } from 'framer-motion'

// ** Font Imports
import { Lexend_Deca } from 'next/font/google'
const lexendDeca = Lexend_Deca({ subsets: ['latin'] })

// ** NextJS Imports
import Image from "next/image"

// ** Image Imports
import RightArrowCurving from "@/public/assets/images/right-arrow-curving.png"

const steps = [
    {
        number: '01',
        title: 'Set disbursement Instructions',
        text: 'Get your blood tests delivered at home collect a sample from the your blood tests.',
    },
    {
        number: '02',
        title: 'Assembly retrieves funds from your account',
        text: 'Get your blood tests delivered at home collect a sample from the your blood tests.',
    },
    {
        number: '03',
        title: 'Assembly initiates disbursement',
        text: 'Get your blood tests delivered at home collect a sample from the your blood tests.',
    },
    {
        number: '04',
        title: 'Customer receives funds payment',
        text: 'Get your blood tests delivered at home collect a sample from the your blood tests.',
    },
]

const StepsSection = () => {
    return (
        <section className="overflow-hidden w-full py-10 bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to text-white lg:py-20">
            <div className="container">
                <hgroup className="text-center mb-32">
                    <p className="text-sm font-bold leading-10 uppercase tracking-widest">What's the Function</p>
                    <h2 className="text-4xl font-bold leading-normal -tracking-wide">Let's see how it works</h2>
                </hgroup>
                <div>
                    <ol className="flex flex-wrap justify-center">
                        {
                            steps.map((step, index) => (
                                <motion.li
                                    key={`${step.title}-${index}`}
                                    initial={{ opacity: 0, x: -45, y: 45 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 * index }}
                                    viewport={{ once: true }}
                                    className="w-full mb-10 last:mb-0 sm:w-1/2 xl:w-1/4 xl:mb-0"
                                >
                                    <div className={`flex mb-6 ${index % 2 == 0 ? 'items-start' : 'items-end'}`}>
                                        <div className={`flex flex-col items-center justify-center h-14 w-14 bg-white text-theme-primary-light text-3xl ${lexendDeca.className} rounded-3xl mr-5`}>
                                            {step.number}
                                        </div>
                                        <div className={`${index + 1 >= steps.length ? 'hidden' : 'block'}`}>
                                            <Image
                                                src={RightArrowCurving}
                                                alt="Right arrow icon"
                                                className={`opacity-40 h-10 w-auto ${index % 2 == 0 ? '' : 'xl:rotate-x-180'}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-2/3">
                                        <h3 className="mb-4 text-2xl font-bold leading-normal">{step.title}</h3>
                                        <p className="leading-relaxed text-white/65">{step.text}</p>
                                    </div>
                                </motion.li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        </section>
    )
}

export default StepsSection