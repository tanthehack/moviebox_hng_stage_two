import { NavLink } from "react-router-dom"
import { cloneElement } from "react"

export const SideBarItem = ({ icon, text, active, mobile, onClick }) => {
    return (
        <NavLink to={'/movies/'} className={`${active ? "bg-rose-opacity border-r-[6px] border-rose-700" : ""} py-7 px-[42px] block`}>
            <span onClick={onClick} className={`${active ? "text-rose-700" : mobile ? "text-white" : "text-gray-500"} text-xl font-semibold flex items-center gap-4`}>
                {/* Render the provided icon with optional customization */}
                {icon &&
                    cloneElement(icon, {
                        className: `w-6 h-6`,
                        strokeColor: 'currentColor',
                    })}

                {/* Display the text of the sidebar item */}
                {text}
            </span>
        </NavLink>
    )
}
