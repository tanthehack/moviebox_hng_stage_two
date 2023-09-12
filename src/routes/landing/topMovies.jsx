import { useEffect, useState } from "react"
import { Imdb, Rect, RottenTomatoe } from "../../assets/icons/generatedIcons"
import * as Icon from '@heroicons/react/24/solid'
import { useGetTopMoviesQuery } from "../../services/topMoviesSlice"
import { MovieCard } from "../../components/global/moviecard"
import { Button } from "../../components/global/button"
import { toast } from "react-toastify"

export const TopMovies = () => {

    const [heroActiveIndex, setHeroActiveIndex] = useState(0)

    const changeHeroActiveIndex = (index) => {
        setHeroActiveIndex(index)
    }

    useEffect(() => {
        setTimeout(() => { () => setHeroActiveIndex(prev => prev++) }, 3000)
    }, [heroActiveIndex])

    const { data: topMoviesData, isLoading, isSuccess, isError } = useGetTopMoviesQuery()

    // Error Handling
    useEffect(() => {
        if (isSuccess)
            toast.success("Page Loaded Sucessfully")

        if (isError)
            toast.error("Server Error")
    }, [isSuccess, isError])

    const topMovies = topMoviesData?.results?.slice(0, 10).map((item) => {
        return {
            id: item.id,
            title: item.title,
            backdropPath: item.backdrop_path,
            posterPath: item.poster_path,
            releaseDate: item.release_date,
            overview: item.overview,
            rating: item.vote_average,
            genres: item.genre_ids
        }
    })

    return (
        <section className="w-full h-fit">
            <div
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(https://image.tmdb.org/t/p/original/${topMovies?.[heroActiveIndex]?.backdropPath ?? ""})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                className="w-full lg:h-[100dvh] flex flex-col items-center lg:flex-row lg:justify-between lg:items-center lg:pl-24 lg:pr-6 pt-[100px] lg:pt-0 p-6 gap-7"
            >
                <div className="lg:w-2/5 text-white space-y-4">
                    <h1 className="lg:text-5xl text-3xl font-bold">{topMovies?.[heroActiveIndex]?.title}</h1>
                    <div className="flex items-center gap-8 text-xs">
                        <span className="flex items-center gap-2">
                            <Imdb />
                            <p>{topMovies?.[heroActiveIndex]?.rating} / 10</p>
                        </span>
                        <span className="flex items-center gap-2">
                            <RottenTomatoe />
                            <p>{(topMovies?.[heroActiveIndex]?.rating / 10 * 100).toFixed(1)} / 100</p>
                        </span>
                    </div>
                    <p className="text-sm font-medium">{topMovies?.[heroActiveIndex]?.overview}</p>
                    <Button text="Watch Trailer" type="solid" icon={<Icon.PlayCircleIcon />} />
                </div>

                <div className="flex flex-row lg:flex-col items-end gap-4">
                    <button className={`${heroActiveIndex === 0 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(0)}>{heroActiveIndex === 0 ? <Rect /> : null} 1</button>
                    <button className={`${heroActiveIndex === 1 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(1)}>{heroActiveIndex === 1 ? <Rect /> : null} 2</button>
                    <button className={`${heroActiveIndex === 2 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(2)}>{heroActiveIndex === 2 ? <Rect /> : null} 3</button>
                    <button className={`${heroActiveIndex === 3 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(3)}>{heroActiveIndex === 3 ? <Rect /> : null} 4</button>
                    <button className={`${heroActiveIndex === 4 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(4)}>{heroActiveIndex === 4 ? <Rect /> : null} 5</button>
                </div>
            </div>

            <div className="px-16 mt-[100px] space-y-8">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 justify-items-center gap-y-24 w-full">
                    <div className="2xl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-2 md:flex-row flex lg:flex-row flex-col lg:items-center lg:justify-between md:items-center md:justify-between gap-2 w-full">
                        <h1 className="text-4xl font-bold">Featured Movies</h1>
                        <p className="text-rose-700 text-lg flex items-center gap-2">See more <Icon.ChevronRightIcon className="w-5 h-5" /> </p>
                    </div>

                    {topMovies?.map((item) => (
                        <MovieCard
                            key={item.id}
                            id={item.id}
                            posterPath={item?.posterPath}
                            date={item?.releaseDate}
                            title={item?.title}
                            rating={item?.rating}
                            score={(item?.rating / 10 * 100).toFixed(1)}
                            genres={item.genres}
                        />
                    ))}
                </section>
            </div>
        </section>
    )
}

