import { Link } from "react-router-dom"
import { Logo } from "../../assets/icons/generatedIcons"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { SideBarItem } from "./sideBarItem"
import * as Icon from '@heroicons/react/24/outline'
import { useState } from "react"

export const SideBar = () => {
    // State to toggle the mobile menu
    const [showMenu, setShowMenu] = useState(false)

    // Check if the screen is in mobile view
    let isMobile = useMediaQuery("(max-width: 768px)")

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setShowMenu(prev => !prev)
    }

    // Sidebar content for normal (non-mobile) view
    const normalNav = (
        <nav className="w-[226px] h-fit border-[1px] border-gray-300 rounded-r-[45px] pt-9 flex flex-col justify-between">
            <Link to="/" className="text-2xl text-gray-700 flex items-center gap-3 font-bold pl-4"><Logo /> MovieBox</Link>

            <div>
                <SideBarItem icon={<Icon.HomeIcon />} text="Home" />
                <SideBarItem icon={<Icon.FilmIcon />} text="Movies" active />
                <SideBarItem icon={<Icon.TvIcon />} text="TV Series" />
                <SideBarItem icon={<Icon.CalendarDaysIcon />} text="Upcoming" />
            </div>

            <div className="px-7">
                <div className="rounded-[20px] bg-rose-opacity px-4 pt-[24px] pb-4 border-[1px] border-rose-700 flex flex-col gap-2">
                    <h1 className="text-lg font-semibold text-gray-700">Play movie quizzes and earn free tickets</h1>
                    <p className="text-xs font-medium text-gray-700">50k people are playing now</p>
                    <span className="bg-rose-200 text-center text-xs font-medium py-[6px] px-[17px] rounded-full text-rose-700">Start playing</span>
                </div>
            </div>

            <SideBarItem icon={<Icon.ArrowRightOnRectangleIcon />} text="Log out" />
        </nav>
    )

    // Sidebar content for mobile view
    const mobileNav = (
        <nav className="bg-white fixed h-[66px] w-full py-2 px-4 flex border-b-[1px] border-rose-600 items-center justify-between z-[100]">
            <Link to="/" className="text-2xl text-gray-700 flex items-center gap-3 font-bold"><Logo /> MovieBox</Link>
            {!showMenu ? <Icon.Bars2Icon className="h-6 w-6" onClick={toggleMenu} /> : <Icon.XMarkIcon className="h-6 w-6" onClick={toggleMenu} />}
            {/* Mobile menu that slides down when toggled */}
            <div className={`${showMenu ? "translate-y-0" : "translate-y-[-100vh]"} h-[calc(100dvh-66px)] w-full bg-rose-700 absolute z-[50] top-[66px] right-0 flex flex-col items-center justify-center gap-2 text-xl font-semibold transition ease-in-out duration-300`}>
                <SideBarItem onClick={toggleMenu} icon={<Icon.HomeIcon />} text="Home" mobile />
                <SideBarItem onClick={toggleMenu} icon={<Icon.FilmIcon />} text="Movies" mobile />
                <SideBarItem onClick={toggleMenu} icon={<Icon.TvIcon />} text="TV Series" mobile />
                <SideBarItem onClick={toggleMenu} icon={<Icon.CalendarDaysIcon />} text="Upcoming" mobile />
            </div>
        </nav>
    )

    return (
        <>
            {isMobile ? mobileNav : normalNav}
        </>
    )
}
