import Link from "next/link";

import { MdPlayCircle } from 'react-icons/md'

import payPalImg from '@/public/assets/images/logos/paypal-logo-gray-wide-xs.png'
import googleImg from '@/public/assets/images/logos/google-logo-gray-wide-xs.png'
import dropboxImg from '@/public/assets/images/logos/dropbox-logo-gray-wide-xs.png'
import { GoSponsorTiers } from "react-icons/go";
import Image from "next/image";
import { buttonVariants } from "@/components/UI/Button";

const sponsors = [
    {
        name: 'PayPal',
        image: payPalImg,
    },
    {
        name: 'Google',
        image: googleImg,
    },
    {
        name: 'DropBox',
        image: dropboxImg,
    }
]

const CTABlock = () => {
    return (
        <div>
            <hgroup className="mb-10">
                <h1 className="leading-tight font-bold text-white mb-8 text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">Experience your ultimate mobile application</h1>
                <p className="text-white text-lg font-medium leading-loose max-w-xl">
                    Get your blood tests delivered at let home collect sample from the victory of the managments that supplies best design system guidelines ever.
                </p>
            </hgroup>
            <div className="flex items-center mb-10">

                <Link
                    href="#"
                    className={buttonVariants({ variant: "secondary", size: 'lg', rounded: 'full' }) + ' mr-2'}
                >
                    Get Started
                </Link>
                <Link
                    href="#"
                    className={buttonVariants({ variant: "ghost", size: 'lg', rounded: 'full' })}
                >
                    <MdPlayCircle className="text-3xl mr-1.5" aria-hidden="true" /> Get Started
                </Link>
                {/* <Link
                    href="#"
                    className="inline-block transition duration-300 rounded-full py-3 px-8 mr-2 font-medium bg-white text-theme-gradient-1-from"
                >
                    Get Started
                </Link>
                <Link
                    href="#"
                    className="inline-block transition duration-300 rounded-full py-35 px-8 font-medium text-white"
                >
                    <span className="flex items-center">
                        <MdPlayCircle className="text-3xl mr-1.5" aria-hidden="true" />
                        <span>Get Started</span>
                    </span>
                </Link> */}
            </div>
            <div className="flex items-center">
                <div className="mr-5 text-white/60">Sponsored by:</div>
                <ul className="flex items-center">
                    {sponsors.map(sponsor => (
                        <li
                            key={sponsor.name}
                            className="mr-7"
                        >
                            <Image
                                src={sponsor.image}
                                alt={`${sponsor.name} logo`}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CTABlock;