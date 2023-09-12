import classNames from "classnames"
import { cloneElement } from "react"

export const Button = ({ text, icon, type }) => {
    const primarySolid = classNames("bg-rose-700 text-white")
    const primaryOutline = classNames("bg-rose-opacity border-[1px] border-rose-700 text-grey-700")

    return (
        <button className={`${type === 'solid' ? primarySolid : primaryOutline} text-xl flex items-center justify-center gap-2 py-3 h-fit w-[200px] lg:w-[360px] rounded-lg`}>
            {icon &&
                cloneElement(icon, {
                    className: `w-6 h-6`,
                    strokeColor: 'currentColor',
                })
            }
            <p>{text}</p>
        </button>
    )
}