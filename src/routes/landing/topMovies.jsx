import { useEffect, useState } from "react"
import { Imdb, Rect } from "../../assets/icons/generatedIcons"
import { useGetTopMoviesQuery } from "../../services/topMoviesSlice"

export const TopMovies = () => {

    const [heroActiveIndex, setHeroActiveIndex] = useState(0)

    const changeHeroActiveIndex = (index) => {
        setHeroActiveIndex(index)
    }

    useEffect(() => {
        setTimeout(() => { () => setHeroActiveIndex(prev => prev++) }, 3000)
    }, [heroActiveIndex])

    console.log(heroActiveIndex)

    const { data: topMoviesData, isLoading } = useGetTopMoviesQuery()

    const topMovies = topMoviesData?.results?.slice(0, 9).map((item, index) => {
        return {
            id: index,
            title: item.title,
            backdropPath: item.backdrop_path,
            posterPath: item.poster_path,
            releaseDate: item.releaseDate,
            overview: item.overview,
            rating: item.vote_average
        }
    })

    console.log(topMoviesData?.results)
    console.log(topMovies)

    return (
        <section className="w-full h-fit">
            <div
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(https://image.tmdb.org/t/p/original/${topMovies?.[heroActiveIndex]?.backdropPath ?? ""})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                className="w-full lg:h-[100dvh] flex flex-col items-center lg:flex-row lg:justify-between lg:items-center lg:pl-24 lg:pr-6 pt-[100px] lg:pt-0 p-6"
            >
                <div className="lg:w-2/5 text-white space-y-4">
                    <h1 className="lg:text-5xl text-3xl font-bold">{topMovies?.[heroActiveIndex]?.title}</h1>
                    <div className="flex items-center gap-8 text-xs">
                        <span className="flex items-center gap-2">
                            <Imdb />
                            <p>{topMovies?.[heroActiveIndex]?.rating} / 10</p>
                        </span>
                    </div>
                    <p className="text-sm font-medium">{topMovies?.[heroActiveIndex]?.overview}</p>
                    <p>Watch Trailer</p>
                </div>

                <div className="flex flex-row lg:flex-col items-end gap-4">
                    <button className={`${heroActiveIndex === 0 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(0)}>{heroActiveIndex === 0 ? <Rect /> : null} 1</button>
                    <button className={`${heroActiveIndex === 1 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(1)}>{heroActiveIndex === 1 ? <Rect /> : null} 2</button>
                    <button className={`${heroActiveIndex === 2 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(2)}>{heroActiveIndex === 2 ? <Rect /> : null} 3</button>
                    <button className={`${heroActiveIndex === 3 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(3)}>{heroActiveIndex === 3 ? <Rect /> : null} 4</button>
                    <button className={`${heroActiveIndex === 4 ? "text-white text-base hover:cursor-pointer" : "text-gray-400 text-xs"} font-bold flex items-center gap-2`} onClick={() => changeHeroActiveIndex(4)}>{heroActiveIndex === 4 ? <Rect /> : null} 5</button>
                </div>
            </div>
        </section>
    )
}
