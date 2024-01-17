// ** NextJS Imports
import Image from "next/image"
import Link from "next/link"

// ** Image Imports
import logoImg from '@/public/assets/images/logos/temp-logo-landscape-light-xs.png'

// ** Lib Imports
import { companyName } from "@/lib/config"
import { buttonVariants } from "../UI/Button"

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-theme-gradient-1-from/90 to-theme-gradient-1-to/90 fixed top-0 left-0 w-full py-4 z-20">
            <div className="container">
                <div className="flex justify-between items-center">
                    <div>
                        <Image
                            src={logoImg}
                            alt={`${companyName} logo`}
                        />
                    </div>
                    <div>
                        <nav>
                            <ul></ul>
                            <div>
                                <Link
                                    href="#"
                                    className={buttonVariants({ variant: 'outline', size: 'lg', rounded: 'full' })}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header