import classNames from "classnames"
import { cloneElement } from "react"

export const Button = ({ text, icon, iconOnly, type, widthFit, onClick }) => {
    // Define CSS classes based on the 'type' prop
    const primarySolid = classNames("bg-rose-700 text-white")
    const primaryOutline = classNames("bg-rose-opacity border-[1px] border-rose-700 text-grey-700")
    const normal = classNames("hover:bg-rose-700 hover:text-white")

    return (
        <button onClick={onClick} className={`${type === 'solid' ? primarySolid : type === "outline" ? primaryOutline : normal} ${widthFit ? "w-fit" : "lg:w-[360px] w-[200px]"} text-xl flex items-center justify-center gap-2 p-3 h-fit rounded-lg`}>
            {/* Render Icon if icon prop is passed */}
            {icon &&
                cloneElement(icon, {
                    className: `w-6 h-6`,
                    strokeColor: 'currentColor',
                })
            }

            {/* Render text if iconOnly prop is false */}
            {iconOnly ? null : <p>{text}</p>}
        </button>
    )
}