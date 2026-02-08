'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { companyName, phoneFormatted, hours, loanProducts } from "@/lib/config"
import { Phone, ChevronDown, Menu, X, Clock, Building2, Briefcase, Calculator, BarChart, BookOpen, Wrench } from "lucide-react"

const solutionsLinks = [
    { name: 'Small Business', href: '/business-loans', icon: Building2 },
    { name: 'Startups', href: '/business-loans', icon: Briefcase },
    { name: 'Enterprise', href: '/business-loans', icon: BarChart },
    { name: 'Financial Insights', href: '/financial-insights', icon: BookOpen },
    { name: 'Loan Calculator', href: '/tools', icon: Calculator },
]

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/images/site/logo-icon.png"
                                alt="Quick Lenders Logo"
                                width={40}
                                height={40}
                                className="mr-2"
                            />
                            <span className="text-xl font-bold text-quicklend-600">
                                {companyName}
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - centered */}
                    <nav className="hidden lg:flex flex-grow items-center justify-center">
                        <div className="flex space-x-8">
                            {/* Loans dropdown */}
                            <div className="group relative">
                                <button className="flex items-center text-gray-700 hover:text-quicklend-600 text-lg font-medium">
                                    Loans <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                <div className="absolute left-1/2 transform -translate-x-1/2 top-full z-50 mt-2 w-48 rounded-md bg-white p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {loanProducts.map((product) => (
                                        <Link
                                            key={product.slug}
                                            href={`/business-loans/${product.slug}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-quicklend-50 rounded-md"
                                        >
                                            {product.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Solutions dropdown */}
                            <div className="group relative">
                                <button className="flex items-center text-gray-700 hover:text-quicklend-600 text-lg font-medium">
                                    Solutions <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                <div className="absolute left-1/2 transform -translate-x-1/2 top-full z-50 mt-2 w-48 rounded-md bg-white p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {solutionsLinks.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-quicklend-50 rounded-md"
                                        >
                                            <item.icon className="h-4 w-4 mr-2 text-quicklend-600" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Tools dropdown */}
                            <div className="group relative">
                                <Link href="/tools" className="flex items-center text-gray-700 hover:text-quicklend-600 text-lg font-medium">
                                    Tools <ChevronDown className="ml-1 h-4 w-4" />
                                </Link>
                                <div className="absolute left-1/2 transform -translate-x-1/2 top-full z-50 mt-2 w-64 rounded-md bg-white p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link
                                        href="/tools/loan-payment-calculator"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-quicklend-50 rounded-md"
                                    >
                                        <Calculator className="h-4 w-4 mr-2 text-quicklend-600" />
                                        Loan Payment Calculator
                                    </Link>
                                    <Link
                                        href="/tools/factor-rate-to-apr-calculator"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-quicklend-50 rounded-md"
                                    >
                                        <BarChart className="h-4 w-4 mr-2 text-quicklend-600" />
                                        Factor Rate to APR Converter
                                    </Link>
                                    <div className="border-t border-gray-100 mt-1 pt-1">
                                        <Link
                                            href="/tools"
                                            className="flex items-center px-4 py-2 text-sm text-quicklend-600 font-medium hover:bg-quicklend-50 rounded-md"
                                        >
                                            View All Tools →
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/contact" className="text-gray-700 hover:text-quicklend-600 text-lg font-medium">
                                Contact
                            </Link>
                        </div>
                    </nav>

                    {/* Phone and CTA */}
                    <div className="flex items-center space-x-4 flex-shrink-0">
                        <div className="hidden md:flex flex-col items-end">
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 text-quicklend-600 mr-2" />
                                <a href="tel:3039218529" className="text-sm font-medium">{phoneFormatted}</a>
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{hours}</span>
                            </div>
                        </div>

                        <Link
                            href="/get-started"
                            className="hidden md:inline-flex bg-quicklend-600 hover:bg-quicklend-700 text-white px-6 py-2 text-base h-12 items-center justify-center rounded-md font-medium transition-colors"
                        >
                            Get Started
                        </Link>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden text-gray-700"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="lg:hidden mt-4 pb-4">
                        <nav className="flex flex-col space-y-4">
                            <div className="border-b border-gray-200 pb-2">
                                <div className="flex items-center justify-between w-full text-left text-gray-700 py-2">
                                    Loans <ChevronDown className="h-4 w-4" />
                                </div>
                                <div className="mt-2 pl-4 flex flex-col space-y-2">
                                    {loanProducts.map((product) => (
                                        <Link
                                            key={product.slug}
                                            href={`/business-loans/${product.slug}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-quicklend-50 rounded-md"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {product.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="border-b border-gray-200 pb-2">
                                <div className="flex items-center justify-between w-full text-left text-gray-700 py-2">
                                    Solutions <ChevronDown className="h-4 w-4" />
                                </div>
                                <div className="mt-2 pl-4 flex flex-col space-y-2">
                                    {solutionsLinks.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center text-sm text-gray-600"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <item.icon className="h-4 w-4 mr-1 text-quicklend-600" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="border-b border-gray-200 pb-2">
                                <div className="flex items-center justify-between w-full text-left text-gray-700 py-2">
                                    Tools <ChevronDown className="h-4 w-4" />
                                </div>
                                <div className="mt-2 pl-4 flex flex-col space-y-2">
                                    <Link
                                        href="/tools/loan-payment-calculator"
                                        className="flex items-center text-sm text-gray-600"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <Calculator className="h-4 w-4 mr-1 text-quicklend-600" />
                                        Loan Payment Calculator
                                    </Link>
                                    <Link
                                        href="/tools/factor-rate-to-apr-calculator"
                                        className="flex items-center text-sm text-gray-600"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <BarChart className="h-4 w-4 mr-1 text-quicklend-600" />
                                        Factor Rate to APR Converter
                                    </Link>
                                    <Link
                                        href="/tools"
                                        className="flex items-center text-sm text-quicklend-600 font-medium"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        View All Tools →
                                    </Link>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="text-gray-700 py-2 border-b border-gray-200"
                                onClick={() => setMobileOpen(false)}
                            >
                                Contact
                            </Link>

                            <div className="flex items-center py-2 border-b border-gray-200">
                                <Phone className="h-4 w-4 text-quicklend-600 mr-2" />
                                <div className="flex flex-col">
                                    <a href="tel:3039218529" className="text-sm font-medium">{phoneFormatted}</a>
                                    <span className="text-xs text-gray-600">{hours}</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Link
                                    href="/get-started"
                                    className="w-full bg-quicklend-600 hover:bg-quicklend-700 text-white py-3 text-base h-12 flex items-center justify-center rounded-md font-medium transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
