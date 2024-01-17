'use client'

// ** Framer Motion Imports
import { motion } from 'framer-motion'

// ** Component Imports
import CTABlock from "@/components/CTABlock"
import CTAIconBlock from "@/components/CTAIconBlock"
import CTAIconInline from "@/components/CTAIconInline"

// ** NextJS Imports
import Link from "next/link"
import Image from "next/image"

// ** Image Imports
import ctaImageHero from '@/public/assets/images/mobile-device-mockup.png'
import ctaImage1 from '@/public/assets/images/mobile-device-with-application-stats.png'
import ctaImage2 from '@/public/assets/images/tech-stack-icon-group.png'
import ctaImage3 from '@/public/assets/images/hand-holding-phone.png'

// ** Icon Imports
import { FaBriefcase, FaPaperPlane } from "react-icons/fa"
import StepsSection from "./Sections/StepsSection"
import ReviewsSection from "./Sections/ReviewsSection"
import PriceCard from "@/components/PriceCard"
import FAQSection from "./Sections/FAQSection"


const features = [
  {
    name: 'Vector Editing',
    icon: <FaPaperPlane aria-hidden="true" />,
    paragraph: 'Get your blood tests delivered at home collect a sample from the your blood tests.',
    iconClasses: 'bg-green-500/10',
  },
  {
    name: 'Customize & Monitoring',
    icon: <FaPaperPlane aria-hidden="true" />,
    paragraph: 'Get your blood tests delivered at home collect a sample from the your blood tests.',
    iconClasses: 'bg-red-500/10',
  },
  {
    name: 'Quality & Speed',
    icon: <FaPaperPlane aria-hidden="true" />,
    paragraph: 'Get your blood tests delivered at home collect a sample from the your blood tests.',
    iconClasses: 'bg-purple-500/10',
  },

]
export default function Home() {

  return (
    <main className="flex flex-grow flex-wrap w-full justify-center">
      <section className="overflow-hidden bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to w-full py-10 xl:py-20">
        <div className="relative container pt-[4.625rem]">
          <div className="flex flex-wrap">
            <div className="hidden lg:absolute lg:left-1/2 lg:box-border xl:static xl:block xl:w-1/2 xl:pl-2 xl:text-right xl:order-2">
              <Image
                src={ctaImageHero}
                alt="Mockup of mobile device with application displayed"
                className=""
                priority
              />
            </div>
            <div className="relative w-full box-border xl:w-1/2 xl:pr-2 xl:order-1">
              <CTABlock />
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden w-full py-16">
        <div className="container">
          <hgroup className="text-center mb-20">
            <p className="text-theme-primary-light text-sm leading-10 uppercase tracking-widest font-bold">Quality Features</p>
            <h2 className="text-theme-primary-dark text-4xl font-bold leading-normal">Meet exciting feature of app</h2>
          </hgroup>
          <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto">
            {features.map(feature => (
              <div
                key={feature.name}
                className="box-border w-full px-4 mb-8 text-center md:w-1/3 md:max-w-64 md:mb-0"
              >
                <CTAIconBlock
                  icon={feature.icon}
                  title={feature.name}
                  paragraph={feature.paragraph}
                  iconClasses={feature.iconClasses}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="overflow-hidden w-full py-10 lg:py-20">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full box-border mb-10 lg:mb-0 lg:w-1/2 lg:pr-4">
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <Image
                  src={ctaImage1}
                  alt="Mobile device with application stats"
                  className="mx-auto"
                />
              </motion.div>
            </div>
            <div className="flex flex-col w-full items-center justify-center box-border lg:w-1/2 lg:pl-4">
              <hgroup className="mb-5">
                <p className="text-theme-primary-light text-sm leading-10 uppercase tracking-widest font-bold">Core Features</p>
                <h2 className="text-theme-primary-dark text-4xl font-bold leading-tight lg:text-5xl">Smart Jackpots that you may love this anytime &amp; anywhere</h2>
              </hgroup>
              <motion.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="mb-5"
              >
                <CTAIconInline
                  icon={<FaBriefcase aria-hidden="true" />}
                  title="Smart Features"
                  text="Get your blood tests delivered at let home collect sample from the victory of the managments your blood tests."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <CTAIconInline
                  icon={<FaBriefcase aria-hidden="true" />}
                  title="Smart Features"
                  text="Get your blood tests delivered at let home collect sample from the victory of the managments your blood tests."
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden w-full py-10 lg:py-20">
        <div className="container">
          <hgroup className="mb-20 text-center">
            <p className="text-theme-primary-light text-sm leading-10 uppercase tracking-widest font-bold">Quality Features</p>
            <h2 className="text-theme-primary-dark text-4xl font-bold leading-normal">Meet exciting feature of app</h2>
          </hgroup>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <CTAIconInline
              icon={<FaBriefcase aria-hidden="true" />}
              classes="bg-blue-500 text-blue-500"
              title="Smart Features"
              text="Get your blood tests delivered at let home collect sample from the victory of the managments your blood tests."
            />
            <CTAIconInline
              icon={<FaBriefcase aria-hidden="true" />}
              classes="bg-yellow-500 text-yellow-500"
              title="Fast Performance"
              text="Get your blood tests delivered at let home collect sample from the victory of the managments your blood tests."
            />
            <CTAIconInline
              icon={<FaBriefcase aria-hidden="true" />}
              classes="bg-green-500 text-green-500"
              title="Unlimited Content"
              text="Get your blood tests delivered at let home collect sample from the victory of the managments your blood tests."
            />
            <CTAIconInline
              icon={<FaBriefcase aria-hidden="true" />}
              classes="bg-purple-500 text-purple-500"
              title="Ulitmate Customization"
              text="Get your blood tests delivered at let home collect sample from the victory of the managments your blood tests."
            />
            <CTAIconInline
              icon={<FaBriefcase aria-hidden="true" />}
              classes="bg-purple-500 text-purple-500"
              title="Boost Productivity"
              text="Get your blood tests delivered at let home collect sample from the victory of the managments your blood tests."
            />
            <CTAIconInline
              icon={<FaBriefcase aria-hidden="true" />}
              classes="bg-orange-500 text-orange-500"
              title="Customer Support"
              text="Get your blood tests delivered at let home collect sample from the victory of the managments your blood tests."
            />
          </div>
        </div>
      </section>
      <section className="overflow-hidden w-full py-10 lg:py-20">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full box-border mb-10 lg:w-3/5 lg:pl-2 lg:order-2 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <Image
                  src={ctaImage2}
                  alt="Tech Stack Image Group"
                />
              </motion.div>
            </div>
            <div className="w-full box-border lg:w-2/5 lg:pr-2 lg:order-1">
              <hgroup className="mb-5">
                <p className="text-theme-primary-light text-sm leading-10 uppercase tracking-widest font-bold">Core Features</p>
                <h2 className="text-theme-primary-dark text-4xl font-bold leading-normal lg:text-5xl">Smart Jackpots that you may love this anytime &amp; anywhere</h2>
              </hgroup>
              <motion.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-lg font-medium leading-loose mb-8">
                  Get your tests delivered at let home collect sample from the victory of the managments that supplies best design system guidelines ever. Get your tests delivered at let home collect sample.
                </p>
                <Link
                  href="/"
                  className="inline-block transition duration-300 rounded-full py-3 px-8 font-medium bg-theme-button-primary text-white"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
      <StepsSection />
      <ReviewsSection />
      <section className="w-full overflow-hidden pb-10 lg:pb-20">
        <div className="container">
          <div className="relative">
            <div className="absolute inset-0 w-full h-full rounded-tl-[250px] bg-[linear-gradient(288deg,_rgba(255,_253,_230,_0.35)_-3.53%,_rgba(255,_253,_230,_0.07)_-3.52%,_rgba(224,_239,_250,_0.35)_92.55%)]"></div>
            <div className="relative flex flex-wrap items-center justify-between">
              <div className="w-[200%] box-border mb-10 lg:w-3/5 lg:pr-2 lg:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 300 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={ctaImage3}
                    alt="Hand holding phone"
                  />
                </motion.div>
              </div>
              <div className="w-full box-border lg:w-2/5 lg:pl-2">
                <hgroup className="mb-5">
                  <p className="text-theme-primary-light text-sm leading-10 uppercase tracking-widest font-bold">Core Features</p>
                  <h2 className="text-theme-primary-dark text-4xl font-bold leading-normal lg:text-5xl">Smart Jackpots that you may love this anytime &amp; anywhere</h2>
                </hgroup>
                <motion.div
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg font-medium leading-loose mb-8">
                    Get your tests delivered at let home collect sample from the victory of the managments that supplies best design system guidelines ever. Get your tests delivered at let home collect sample.
                  </p>
                  <Link
                    href="/"
                    className="inline-block transition duration-300 rounded-full py-3 px-8 font-medium bg-theme-button-primary text-white"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to w-full py-10 lg:py-20">
        <div className="container">
          <hgroup className="mb-20 text-center">
            <p className="text-white text-sm leading-10 uppercase tracking-widest font-bold">Whats the Function</p>
            <h2 className="text-white text-4xl font-bold leading-normal">Let's See How It Works</h2>
          </hgroup>
          <div className="flex flex-wrap justify-center max-w-5xl mx-auto">
            <div className="w-full box-border mb-10 md:w-1/2 md:pr-4">
              <PriceCard
                variant="dark"
                title="Free Plan"
                subTitle="For small teams or office"
                features={[
                  { desc: 'Ultimate access to all course, exercises, and assessments', available: true },
                  { desc: 'Free access for all kind of exercise corrections with downloads.', available: true },
                  { desc: 'Total assessment corrections with free download access system', available: true },
                  { desc: 'Unlimited download of courses on the mobile app contents', available: false },
                  { desc: 'Download and print courses and exercises in PDF', available: false },
                ]}
                link="#"
                linkText="Signup Now"
              />
            </div>
            <div className="w-full box-border mb-10 md:w-1/2 md:pl-4">
              <PriceCard
                recommended={true}
                title="Premium"
                subTitle="For startup enterprise"
                priceLabel="Starting from"
                price="$49.99"
                priceUoM="mo"
                features={[
                  { desc: 'Ultimate access to all course, exercises, and assessments', available: true },
                  { desc: 'Free access for all kind of exercise corrections with downloads.', available: true },
                  { desc: 'Total assessment corrections with free download access system', available: true },
                  { desc: 'Unlimited download of courses on the mobile app contents', available: true },
                  { desc: 'Download and print courses and exercises in PDF', available: true },
                ]}
                link="#"
                linkText="Signup Now"
              />
            </div>
          </div>
        </div>
      </section>
      <FAQSection />
    </main>
  )
}
