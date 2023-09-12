import classNames from "classnames"
import { cloneElement } from "react"

export const Button = ({ text, icon, iconOnly, type, widthFit, onClick }) => {
    const primarySolid = classNames("bg-rose-700 text-white")
    const primaryOutline = classNames("bg-rose-opacity border-[1px] border-rose-700 text-grey-700")
    const normal = classNames("hover:bg-rose-700 hover:text-white")

    return (
        <button onClick={onClick} className={`${type === 'solid' ? primarySolid : type === "outline" ? primaryOutline : normal} ${widthFit ? "w-fit" : "lg:w-[360px] w-[200px]"} text-xl flex items-center justify-center gap-2 p-3 h-fit rounded-lg`}>
            {icon &&
                cloneElement(icon, {
                    className: `w-6 h-6`,
                    strokeColor: 'currentColor',
                })
            }
            {iconOnly ? null : <p>{text}</p>}
        </button>
    )
}