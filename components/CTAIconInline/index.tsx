// ** Typescript Imports
import type { StaticImageData } from "next/image"

interface Props {
    icon: JSX.Element
    classes?: string
    title: string
    text: string
}

const CTAIconInline: React.FC<Props> = ({ classes = 'text-red-500 bg-red-500', text, title, icon }) => {
    return (
        <div className="flex flex-col items-start transition-all duration-300 py-5 px-8 rounded-xl hover:bg-white hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] sm:flex-row">
            <div className="mb-5 sm:mb-0 sm:mr-5">
                <div className={`relative h-14 w-14  bg-opacity-20 rounded-3xl text-2xl ${classes}`}>
                    <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        {icon}
                    </span>
                </div>
            </div>
            <div>
                <h3 className="text-theme-primary-dark text-lg font-bold mb-5">{title}</h3>
                <p className="text-theme-dark-gray">{text}</p>
            </div>
        </div>
    )
}

export default CTAIconInline