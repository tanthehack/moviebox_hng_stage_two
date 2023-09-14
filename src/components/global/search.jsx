import * as Icon from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useDebounceValue } from '../../hooks/useDebounceValue'
import { useSearchMoviesQuery } from '../../services/searchSlice'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'

export const SearchBar = ({ isMobile, showSearch }) => {
    // State for managing search bar visibility and query
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [query, setQuery] = useState("")

    // Declare navigate hook
    const navigate = useNavigate()

    // Toggle the search bar and search results visibility
    const handleShowSearch = () => {
        setShowSearchInput(prev => !prev)
        showSearch(showSearchInput)
        setShowSearchResults(prev => !prev)
    }

    // Handle input change and show/hide search results
    const handleSearch = (e) => {
        e.preventDefault()

        //If the input is empty, hide the search results
        e.target.value !== "" ? setShowSearchResults(true) : setShowSearchResults(false)
        setQuery(e.target.value)
    }

    // Handle Enter key press for searching
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setShowSearchResults(false)
            navigate(`/find/${e.target.value}`)

            //Clear search box and query after navigating to search results
            setQuery('')
        }
    }

    // Handle search button click
    const handleSearchButton = () => {
        navigate(`/find/${query}`)
    }

    // Toggle search results visibility
    const handleShowSearchContainer = () => {
        setShowSearchResults(prev => !prev)
    }

    // Debounce the query for smoother search requests
    const debouncedValue = useDebounceValue(query)

    // Fetch search results using a query from the search service
    const { data: searchResults, isLoading, isError } = useSearchMoviesQuery({ query: debouncedValue, page: 1 })

    // Handle errors and show a toast if there's a server error
    useEffect(() => {
        if (isError)
            toast.error("Server Error")
    }, [isError])

    // Map and format search results
    const results = searchResults?.results?.slice(0, 5).map((item) => {
        return {
            id: item.id,
            posterPath: item.poster_path,
            title: item.title,
            date: item.date,
            overview: item.overview
        }
    })

    // Container for displaying search results
    const searchResultsContainer = (
        <div className={`${showSearchResults ? "block" : "hidden"} h-fit w-full bg-gray-900 p-7 absolute top-[55px] lg:top-[40px] left-0 rounded-b-[6px] overflow-hidden space-y-4 border-b-[1px] border-gray-700`}>
            {results?.map((item) => (
                <Link to={`movies/${item.id}`} className='p-4 border-b-[1px] border-gray-800 flex items-center gap-4 text-sm hover:bg-gray-700 rounded-lg'>
                    <div style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w92/${item.posterPath})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                        className="min-h-[60px] min-w-[50px]"
                    />
                    {item.title}
                </Link>
            ))}

            {isLoading ? null : searchResults?.total_results === 0 ? (
                <span className='flex items-center text-grey-600 gap-3'>
                    <Icon.FaceFrownIcon className='w-4 h-4' />
                    <p>No Results</p>
                </span>
            ) : (
                <Link onClick={handleShowSearchContainer} to={`find/${debouncedValue}`} className='hover:after:content-["→"] hover:text-rose-700 block'>See All Results </Link>
            )}
        </div>
    )

    // Search bar for mobile view
    const mobileSearch = (
        <div>
            <div className={`${showSearchInput ? "translate-x-0" : "translate-x-[120%]"} flex items-center justify-between border-[1px] border-white py-[6px] px-[10px] rounded-[6px] w-full absolute z-10 h-[40px] top-[calc((100%-40px)/2)] left-0 transition ease-in-out delay-150 duration-300`}>
                <input
                    style={{ backgroundColor: "transparent" }}
                    type="text"
                    placeholder="What do you want to watch?"
                    className="placeholder-white text-base focus:outline-none border-none w-full"
                    onChange={handleSearch}
                    value={query}
                />
                <Icon.XMarkIcon className='w-4 h-6' onClick={handleShowSearch} />
            </div>
            <Icon.MagnifyingGlassIcon className={`${showSearchInput ? "translate-x-[-120dvw]" : ""} w-4 h-6 transition ease-in-out delay-150 duration-300`} onClick={handleShowSearch} />
            {searchResultsContainer}
        </div>
    )

    // Search bar for normal view
    const normalSearch = (
        <div className="w-2/5 bg-transparent border-[1px] border-gray-300 text-gray-300 rounded-[6px] h-[40px] flex items-center justify-between focus-within:border-white focus-within:text-white hover:border-white relative">
            <input
                style={{ backgroundColor: "transparent" }}
                type="text"
                placeholder="What do you want to watch?"
                className="placeholder-gray-200 text-base border-none p-[10px] w-full focus:outline-none "
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                value={query}
            />
            <span className='h-full py-[8px] px-[10px] hover:bg-rose-700 group hover:cursor-pointer transition ease-in-out duration-150 rounded-r-[5px]'
                onClick={handleSearchButton}
            >
                <Icon.MagnifyingGlassIcon className={`${showSearchInput ? "translate-x-[-120dvw]" : ""} w-4 h-6 transition ease-in-out delay-150 duration-300`} onClick={handleShowSearch} />
            </span>
            {searchResultsContainer}
        </div>
    )

    return (
        <>
            {/* Display search based on the isMobile value */}
            {isMobile ? mobileSearch : normalSearch}
        </>
    )
}
