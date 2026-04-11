import Link from "next/link"
import { companyName, loanProducts, emailAddress, phoneFormatted, hours } from "@/lib/config"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from 'react-icons/fa'
import { Phone, Mail, Clock } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="w-full bg-theme-primary-dark text-white">
            <div className="container py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand column */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{companyName}</h3>
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                            Connecting business owners with financing from our network of lending partners.
                        </p>
                        <div className="flex flex-col gap-2 mb-6 text-sm text-gray-400">
                            <a href="tel:3039218529" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Phone className="h-4 w-4 text-quicklend-400" />
                                {phoneFormatted}
                            </a>
                            <a href={`mailto:${emailAddress}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                <Mail className="h-4 w-4 text-quicklend-400" />
                                {emailAddress}
                            </a>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-quicklend-400" />
                                {hours}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.facebook.com/quicklendersllc/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="text-sm" />
                            </a>
                            <a
                                href="https://twitter.com/quicklenders"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="text-sm" />
                            </a>
                            <a
                                href="https://www.instagram.com/quicklenders/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="text-sm" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/quicklenders/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn className="text-sm" />
                            </a>
                            <a
                                href="https://www.youtube.com/@quicklenders"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="text-sm" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@quicklenders"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="TikTok"
                            >
                                <FaTiktok className="text-sm" />
                            </a>
                        </div>
                    </div>

                    {/* Products column */}
                    <div>
                        <h3 className="text-base font-semibold mb-4">Products</h3>
                        <ul className="space-y-3">
                            {loanProducts.map((product) => (
                                <li key={product.slug}>
                                    <Link
                                        href={`/business-loans/${product.slug}`}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {product.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company column */}
                    <div>
                        <h3 className="text-base font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about-us" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Our Team
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources column */}
                    <div>
                        <h3 className="text-base font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/financial-insights" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/financial-insights" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Resource Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/business-loans" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    FAQs
                                </Link>
                            </li>
                        </ul>

                        <h3 className="text-base font-semibold mb-4 mt-6">Tools</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/tools" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    All Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/loan-payment-calculator" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Loan Payment Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/factor-rate-to-apr-calculator" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Factor Rate to APR Converter
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/california-privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Cookie Policy
                        </Link>
                        <Link href="/editorial-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Editorial Policy
                        </Link>
                        <Link href="/advertiser-disclosure" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Advertiser Disclosure
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
