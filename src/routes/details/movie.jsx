import { useParams } from "react-router-dom"
import { useGetMovieDetailsQuery } from "../../services/movieDetails"
import * as Icon from '@heroicons/react/24/solid'
import { useDateFormat } from "../../hooks/useDateFormat"
import { useGetMovieVideosQuery } from "../../services/movieTrailer"
import { Button } from "../../components/global/button"
import blogImg from '../../assets/blog.png'
import { LoadingState } from "../../components/states/loadingState"
import { ColorRing } from "react-loader-spinner"

export const Movie = () => {
    const { movieId } = useParams()

    const { data: movieDetails, isLoading: detailsLoading } = useGetMovieDetailsQuery(`${movieId ?? ""}`)
    const { data: movieVideosData, isLoading: videosLoading } = useGetMovieVideosQuery(`${movieId ?? ""}`)

    const movieTrailers = movieVideosData?.results?.filter(video => video.type === "Trailer").map(item => {
        return {
            id: item.id,
            site: item.site,
            key: item.key,
            name: item.name
        }
    })

    const mainTrailer = movieTrailers?.filter(trailer => trailer.name === "Main Trailer").reduce((obj, item) => ({ ...obj, [`site`]: item.site, [`key`]: item.key }), {})

    return (
        <section className="px-10 py-10 w-full flex flex-col gap-6 mt-[70px] lg:m-0">
            {/* Loading State */}
            <LoadingState isLoading={detailsLoading} />
            <a
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                href={`${mainTrailer?.site === "YouTube" ? "https://www.youtube.com/watch?v=" : "https://vimeo.com/"}${mainTrailer?.key}`}
                target="_blank"
                className="min-h-[396px] h-[450px] rounded-3xl flex flex-col items-center hover:cursor-pointer justify-center group overflow-hidden"
            >
                {!mainTrailer ? <p className="text-gray-100 text-xl font-medium bg-gray-900 opacity-40 h-full w-full flex items-center justify-center" >No trailer availble</p> :
                    <>
                        <div className="bg-gray-opacity group-hover:bg-rose-200 group-hover:cursor-pointer w-[100px] h-[100px] flex items-center justify-center rounded-full m-4">
                            {videosLoading ? <ColorRing /> : <Icon.PlayIcon className="text-white w-12 h-12 group-hover:text-rose-500" />}
                        </div>
                        <p className="text-white text-xl font-medium group-hover:text-rose-700">Watch Trailer</p>
                    </>
                }

            </a>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-7 gap-3">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 text-lg lg:text-2xl font-medium text-gray-700">
                        <h1 data-testid="movie-title">{movieDetails?.title}</h1>
                        <span className="hidden lg:block">•</span>
                        <h1 data-testid="movie-release-date">{useDateFormat(movieDetails?.release_date)}</h1>
                        <span className="hidden lg:block">•</span>
                        <h1 data-testid="movie-runtime">{movieDetails?.runtime}mins</h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs lg:text-base">
                        {movieDetails?.genres?.map((item) => (
                            <span key={item.id} className="text-red-700 border-[1px] border-rose-200 rounded-full py-1 px-4">{item.name}</span>
                        ))}
                    </div>
                </div>

                <span className="flex items-center gap-2">
                    <Icon.StarIcon className="w-[30px] h-[30px] text-yellow" />
                    <p className="text-gray-300 lg:text-2xl">{movieDetails?.vote_average.toFixed(1)}</p>
                    <p className="text-gray-500 lg:text-xl">| {movieDetails?.vote_count}</p>
                </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col justify-between gap-6">
                    <p className="text-base lg:text-xl text-gray-600" data-testid="movie-overview">{movieDetails?.overview}</p>
                    <div className="text-base lg:text-xl font-medium border-[1px] border-gray-400 flex items-center rounded-[10px] overflow-hidden">
                        <span className="bg-rose-700 py-[12px] px-4 rounded-[10px] text-white mr-6">Top rated movie</span>
                        <p className="flex items-center justify-between w-4/5 ">Popularity: {movieDetails?.popularity} <Icon.ChevronDownIcon className="w-[30px] h-[30px] text-gray-700" /></p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <Button icon={<Icon.TicketIcon />} text="See Showtimes" type="solid" />
                        <Button icon={<Icon.ListBulletIcon />} text="See Showtimes" />
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