import { Logo } from "../../assets/icons/generatedIcons"
import * as Icon from '@heroicons/react/24/solid'
import { SearchBar } from "./search"
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useState } from "react";

export const Nav = () => {
    let isMobile = useMediaQuery("(max-width: 768px)");
    const [showSearch, setShowSearch] = useState(true)

    const handleShowSearch = (value) => {
        setShowSearch(value)
    }

    const normalNav = <nav className="flex items-center justify-between w-full text-white py-6 px-24 fixed z-100">
        <span className="text-2xl flex items-center gap-6 font-bold"><Logo /> MovieBox</span>
        <SearchBar />
        <span className="flex items-center w-fit gap-6" >Sign in <Icon.Bars2Icon className="w-6 h-6 p-[6px] bg-rose-700 rounded-full" /></span>
    </nav>

    const mobileNav = <nav className="flex items-center justify-between w-full text-white p-6 h-[70px] fixed z-100">
        <span className={`${!showSearch ? "translate-x-[-120%]" : "translate-x-0"} text-xl flex items-center gap-4 font-bold transition ease-in-out delay-150 duration-300`}><Logo /> MovieBox</span>
        <div className="flex items-center gap-2">
            <SearchBar isMobile={true} showSearch={handleShowSearch} />
            <span className={`${!showSearch ? "translate-x-[-120dvw]" : "translate-x-0"} transition ease-in-out delay-150 duration-300`}>Sign in</span>
        </div>
    </nav>

    return (
        <>
            {isMobile ? mobileNav : normalNav}
        </>
    )
} 