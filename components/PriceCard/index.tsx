import Link from "next/link"
import { IoMdCloseCircle } from "react-icons/io"
import { MdCheckCircle } from "react-icons/md"

export interface IPriceCardFeature {
    desc: string
    available: boolean
}

interface Props {
    title: string
    features: IPriceCardFeature[]
    variant?: 'light' | 'dark'
    subTitle?: string
    link?: string
    linkText?: string
    recommended?: boolean
    priceLabel?: string
    price?: string
    priceUoM?: string
}

const PriceCard: React.FC<Props> = ({ title, features, variant = "light", subTitle, link, linkText, recommended, priceLabel, price, priceUoM }) => {
    return (
        <div className={`relative p-10 rounded-xl ${variant === "light" ? 'bg-white text-black' : 'bg-theme-primary-dark text-white'}`}>
            <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <span className={`bg-[#EF9E48] text-white rounded-md text-sm font-bold p-2 shadow-md shadow-black/35 ${recommended ? 'visible' : 'invisible'}`}>
                    Recommended
                </span>
            </div>
            <div className="flex justify-between mb-12">
                <div>
                    <h3 className={`${variant === "light" ? 'text-theme-primary-dark' : 'text-white'} text-xl font-bold`}>{title}</h3>
                    {subTitle && <p className={`${variant === "light" ? 'text-theme-dark-gray' : 'text-white'} mt-2`}>{subTitle}</p>}
                </div>
                {
                    price && (
                        <div className="text-right">
                            {priceLabel && <div className="text-theme-dark-gray">{priceLabel}</div>}
                            <div className="text-[#25CB9E] text-2xl font-bold">$49.99{priceUoM && <>/<span className="text-lg">{priceUoM}</span></>}</div>
                        </div>
                    )
                }
            </div>
            <ul>
                {
                    features.map((feature, index) => (
                        <li
                            key={`feature-item-${index}`}
                            className="flex items-center mb-6 last:mb-0"
                        >
                            {
                                feature.available ? (
                                    <>
                                        <MdCheckCircle className="mr-2 text-[#3FDBB1]" aria-hidden="true" />
                                        <span className={`${variant === "light" ? 'text-theme-dark-gray' : 'text-white'}`}>{feature.desc}</span>
                                    </>
                                ) :
                                    (
                                        <>
                                            <IoMdCloseCircle className="text-white/30 mr-2" aria-hidden="true" />
                                            <span className="opacity-50">{feature.desc}</span>
                                        </>
                                    )
                            }

                        </li>
                    ))
                }
            </ul>
            {
                (link && linkText) && (
                    <div className="text-center mt-10">
                        <Link
                            href={link}
                            className={`inline-block transition duration-300 rounded-full py-3 px-8 font-medium ${variant === "light" ? 'bg-theme-button-primary text-white' : 'bg-white text-theme-button-primary'}`}
                        >
                            {linkText}
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default PriceCard