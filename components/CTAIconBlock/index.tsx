import Image from "next/image"

interface Props {
    icon: JSX.Element
    title: string
    paragraph: string
    iconClasses: string
}
const CTAIconBlock: React.FC<Props> = ({ icon, title, paragraph, iconClasses }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`flex flex-col items-center justify-center rounded-3xl w-28 h-28 mb-5 ${iconClasses}`}>
                {icon}
            </div>
            <h3 className="mb-5 text-lg font-bold text-theme-primary-dark">{title}</h3>
            <p className="text-theme-dark-gray max-w-xs">{paragraph}</p>
        </div>
    )
}

export default CTAIconBlock