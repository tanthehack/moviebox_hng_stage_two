import * as Icon from '@heroicons/react/24/solid'
import { useState } from 'react'

export const SearchBar = ({ isMobile, showSearch }) => {
    const [showSearchInput, setShowSearchInput] = useState(false)

    const handleShowSearch = () => {
        setShowSearchInput(prev => !prev)
        showSearch(showSearchInput)
    }

    const mobileSearch = <div>

        <div className={`${showSearchInput ? "translate-x-0" : "translate-x-[120%]"} flex items-center justify-between border-[2px] border-white py-[6px] px-[10px] rounded-[6px] w-full absolute z-10 h-[50px] top-[calc((100%-50px)/2)] left-0 transition ease-in-out delay-150 duration-300`}>
            <input
                style={{ backgroundColor: "transparent" }}
                type="text"
                placeholder="What do you want to watch?"
                className="placeholder-white text-base focus:outline-none border-none w-full"
            />
            <Icon.XMarkIcon className='w-4 h-6' onClick={handleShowSearch} />
        </div>
        <Icon.MagnifyingGlassIcon className={`${showSearchInput ? "translate-x-[-120dvw]" : ""} w-4 h-6 transition ease-in-out delay-150 duration-300`} onClick={handleShowSearch} />
    </div>

    const normalSearch = <div className="w-2/5 bg-transparent border-[2px] border-gray-300 text-gray-300 py-[6px] px-[10px] rounded-[6px] flex items-center justify-between focus-within:border-white focus-within:text-white hover:border-white">
        <input
            style={{ backgroundColor: "transparent" }}
            type="text"
            placeholder="What do you want to watch?"
            className="placeholder-white text-base border-none w-full focus:outline-none"
        />
        <Icon.MagnifyingGlassIcon className='w-4 h-6' />
    </div>

    return (
        <>
            {isMobile ? mobileSearch : normalSearch}
        </>
    )
}