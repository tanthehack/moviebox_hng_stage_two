import { useParams } from "react-router-dom"
import { useGetMovieDetailsQuery } from "../../services/movieDetailsSlice"
import * as Icon from '@heroicons/react/24/solid'
import { useDateFormat } from "../../hooks/useDateFormat"
import { useGetMovieVideosQuery } from "../../services/movieTrailerSlice"
import { Button } from "../../components/global/button"
import blogImg from '../../assets/blog.png'
import { LoadingState } from "../../components/states/loadingState"
import { ColorRing } from "react-loader-spinner"
import ScrollToTop from "../../helpers/scrollToTop"
import { toast } from "react-toastify"
import { useEffect } from "react"

export const Movie = () => {
    const { movieId } = useParams() // Get the movieId from the URL params

    // Fetch movie details using a query from the get movie details service
    const { data: movieDetails, isLoading: detailsLoading, isError: detailError } = useGetMovieDetailsQuery(`${movieId ?? ""}`)

    // Fetch movie videos using a query from the get movie videos service
    const { data: movieVideosData, isLoading: videosLoading, isError: videosError } = useGetMovieVideosQuery(`${movieId ?? ""}`)

    // Error Handling: Display an error toast if there's an error in fetching data
    useEffect(() => {
        if (detailError || videosError)
            toast.error("Server Error")
    }, [detailError, videosError])

    // Filter and map movie trailers
    const movieTrailers = movieVideosData?.results?.filter(video => video.type === "Trailer").map(item => {
        return {
            id: item.id,
            site: item.site,
            key: item.key,
            name: item.name
        }
    })

    // Check if an object is empty
    const isObject = (obj) => {
        if (obj === null || obj === undefined) return false
        if (Object.keys(obj).length === 0 && obj.constructor === Object) return false
        if (Object.keys(obj).length > 0) return true
    }

    // Filter and get the main trailer
    const mainTrailer = movieTrailers?.filter(trailer =>
        trailer.name.toLowerCase().includes("main trailer" && "official trailer" && "trailer")).reduce((obj, item) =>
            ({ ...obj, [`site`]: item.site, [`key`]: item.key }), {}
        )

    return (
        <section className="px-10 py-10 w-full flex flex-col gap-6 mt-[70px] lg:m-0 overflow-y-auto">
            {/* Scroll to top of route */}
            <ScrollToTop />

            {/* Loading State: Display loading state while fetching data */}
            <LoadingState isLoading={detailsLoading} />

            {/* Background image for movie trailer */}
            <a
                style={{
                    backgroundImage: `${movieDetails?.backdrop_path == null ? "" : `url(https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path})`}`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                href={`${mainTrailer?.site === "YouTube" ? "https://www.youtube.com/watch?v=" : "https://vimeo.com/"}${mainTrailer?.key}`}
                target="_blank"
                className="min-h-[396px] h-[450px] rounded-3xl flex flex-col items-center hover:cursor-pointer justify-center group overflow-hidden"
            >
                {!isObject(mainTrailer) ? <p className="text-gray-100 text-xl font-medium bg-gray-900 opacity-40 h-full w-full flex items-center justify-center" >No trailer available</p> :
                    <>
                        <div className="bg-gray-opacity group-hover:bg-rose-200 group-hover:cursor-pointer w-[100px] h-[100px] flex items-center justify-center rounded-full m-4">
                            {videosLoading ? <ColorRing /> : <Icon.PlayIcon className="text-white w-12 h-12 group-hover:text-rose-500" />}
                        </div>
                        <p className="text-white text-xl font-medium group-hover:text-rose-700">Watch Trailer</p>
                    </>
                }
            </a>

            {/* Movie details */}
            <div className="flex lg:flex-wrap flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
                <div className="flex lg:flex-wrap flex-col lg:flex-row lg:items-center lg:gap-7 gap-3">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 text-lg lg:text-xl font-medium text-gray-700">
                        <h1 data-testid="movie-title">{movieDetails?.title}</h1>
                        <span className="hidden lg:block">•</span>
                        <h1 data-testid="movie-release-date">{useDateFormat(movieDetails?.release_date)}</h1>
                        <span className="hidden lg:block">•</span>
                        <h1 data-testid="movie-runtime">{movieDetails?.runtime}mins</h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs lg:text-sm">
                        {movieDetails?.genres?.map((item) => (
                            <span key={item.id} className="text-red-700 border-[1px] border-rose-200 rounded-full py-1 px-4">{item.name}</span>
                        ))}
                    </div>
                </div>

                <span className="flex items-center gap-2">
                    <Icon.StarIcon className="w-[30px] h-[30px] text-yellow" />
                    <p className="text-gray-300 lg:text-2xl">{movieDetails?.vote_average.toFixed(1)}</p>
                    <p className="text-gray-500 lg:text-lg">| {movieDetails?.vote_count}</p>
                </span>
            </div>

            {/* Movie description and buttons */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col justify-between gap-6">
                    <p className="text-base lg:text-xl text-gray-600" data-testid="movie-overview">{movieDetails?.overview}</p>
                    <div className="text-base lg:text-xl font-medium border-[1px] border-gray-400 flex items-center rounded-[10px] overflow-hidden">
                        <span className="bg-rose-700 py-[12px] px-4 rounded-[10px] text-white mr-6 flex-none">Top rated movie</span>
                        <p className="flex items-center justify-between w-4/5 ">Popularity: {movieDetails?.popularity} <Icon.ChevronDownIcon className="w-[30px] h-[30px] text-gray-700" /></p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-3">
                        <Button icon={<Icon.TicketIcon />} text="See Showtimes" type="solid" />
                        <Button icon={<Icon.ListBulletIcon />} text="More watch options" type="outline" />
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${blogImg})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                        className="h-full min-h-[100px] w-full rounded-[10px] overflow-hidden relative"
                    >
                        <span className="text-white text-sm flex items-center justify-center gap-3 w-full bg-gray-900 opacity-70 absolute bottom-0 py-3"><Icon.ListBulletIcon className="w-5 h-5" />The Best Movies and Shows in September</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
