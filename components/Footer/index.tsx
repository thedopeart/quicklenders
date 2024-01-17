import Link from "next/link"

const linkGroups = [
    {
        title: "About Us",
        links: [
            {
                path: '#',
                label: 'Support Center',
            },
            {
                path: '#',
                label: 'Customer Support',
            },
            {
                path: '#',
                label: 'About Us',
            },
            {
                path: '#',
                label: 'Copyright',
            },
        ],
    },
    {
        title: "Our Info",
        links: [
            {
                path: '#',
                label: 'Store Hours',
            },
            {
                path: '#',
                label: 'Get Directions',
            },
            {
                path: '#',
                label: 'Sitemap',
            },
        ],
    },
    {
        title: "My Account",
        links: [
            {
                path: '#',
                label: 'Login',
            },
            {
                path: '#',
                label: 'Make a Payment',
            },
            {
                path: '#',
                label: 'Manage Settings',
            },
        ],
    },
    {
        title: "Policy",
        links: [
            {
                path: '#',
                label: 'Return Policy',
            },
            {
                path: '#',
                label: 'Privacy Policy',
            },
            {
                path: '#',
                label: 'Terms & Conditions',
            },
            {
                path: '#',
                label: 'Accessibility Statement',
            },
        ]
    }
]

export const FooterLink = ({ path, label }: { path: string, label: string }) => {
    return (
        <Link
            href={path}
            className="inline-block transition duration-300 py-1.5 text-sm text-theme-primary-dark hover:underline"
        >
            {label}
        </Link>
    )
}

const Footer = () => {
    return (
        <footer className="w-full py-10 lg:pb-20">
            <div className="container">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto border-t border-theme-dark-gray pt-10">
                    {
                        linkGroups.map(linkGroup => (
                            <div key={linkGroup.title}>
                                <div className="text-lg font-medium text-theme-primary-dark mb-7">{linkGroup.title}</div>
                                <ul>
                                    {
                                        linkGroup.links.map((link, linkIndex) => (
                                            <li key={`link-${link.label}-${linkIndex}`}>
                                                <FooterLink
                                                    path={link.path}
                                                    label={link.label}
                                                />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </footer>
    )
}

export default Footer