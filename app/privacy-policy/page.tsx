import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = generatePageMetadata({
  title: 'Privacy Policy | Quick Lenders Data Practices',
  description:
    'Learn how Quick Lenders collects, uses, and protects your personal information. Our commitment to data privacy when you use our website and lending services.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
  ])

  return (
    <main className="flex flex-grow flex-wrap w-full justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-r from-theme-gradient-1-from to-theme-gradient-1-to w-full pt-24 md:pt-28 pb-16 lg:pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white text-4xl font-bold leading-tight lg:text-5xl mb-6">
              Privacy Policy
            </h1>
            <p className="text-white/90 text-lg">
              Last updated: February 2, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray prose-lg">
            <p className="text-gray-600 leading-relaxed mb-8">
              Quick Lenders (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
              operates the website quicklenders.com. This Privacy Policy explains
              how we collect, use, and protect your personal information when you
              visit our website or use our services.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you provide directly to us through
              forms on our website. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business name and type</li>
              <li>Financing amount requested</li>
              <li>Other details you provide in form submissions or messages</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              We also collect certain information automatically when you visit
              our website, including your IP address, browser type, referring
              URL, and pages viewed. This data is collected through cookies and
              similar technologies.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Match you with lending partners who may offer financing that fits your needs</li>
              <li>Respond to your inquiries and communicate with you about our services</li>
              <li>Send you information related to your financing request</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Sharing Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We share your information with third-party lending partners in
              order to match you with financing options. When you submit a form
              requesting financing, your information may be shared with one or
              more lenders in our network.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information to unrelated third parties
              for their own marketing purposes. We may also share information
              with service providers who assist us in operating our website, as
              well as when required by law.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website uses cookies and similar tracking technologies to
              improve your experience and analyze site traffic. You can control
              cookie settings through your browser preferences. Disabling
              cookies may affect certain features of the website.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We take reasonable steps to protect your personal information from
              unauthorized access, use, or disclosure. However, no method of
              transmission over the internet or electronic storage is completely
              secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may request access to, correction of, or deletion of your
              personal information by contacting us. If you are a Colorado
              resident, you may have additional rights under the Colorado Privacy
              Act, including the right to opt out of the sale of personal data
              and the right to access or delete your data.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of those websites.
              We encourage you to read the privacy policies of any third-party
              sites you visit.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated effective date. Your
              continued use of our website after changes are posted constitutes
              your acceptance of the updated policy.
            </p>

            <h2 className="text-theme-primary-dark text-2xl font-bold mt-10 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy or how we handle
              your information, please contact us at{' '}
              <a
                href="tel:3039218529"
                className="text-theme-primary hover:underline"
              >
                (303) 921-8529
              </a>{' '}
              during business hours, Monday through Friday, 9:00 AM to 5:00 PM
              MST.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
