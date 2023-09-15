import { toast } from "react-toastify"
import { Imdb, RottenTomatoe } from "../../assets/icons/generatedIcons"
import * as Icon from '@heroicons/react/24/solid'
import { Link } from "react-router-dom"
import { genres as allGenres } from "../../data/genres"
import { useDateFormat } from "../../hooks/useDateFormat"

export const MovieCard = (props) => {
    // Destructure props to access movie information
    const {
        id,
        title,
        rating,
        score,
        posterPath,
        date,
        genres
    } = props

    // Function to handle liking a movie and show a success toast
    const handleLikeMove = () => {
        toast.success("Saved!");
    }

    return (
        <div className="flex flex-col gap-3 relative" data-testid="movie-card">

            {/* Movie Poster */}
            <Link to={`/movies/${id}`}>
                <div className="flex justify-center items-center relative w-[250px] h-[370px] overflow-hidden bg-gray-400">
                    {!posterPath ? <p className="text-gray-900 text-5xl text-center">No Poster Available</p> : <img data-testid="movie-poster" src={`${posterPath ? `https://image.tmdb.org/t/p/w342/${posterPath}` : null}`} className="w-[250px] h-[370px] hover:scale-[1.02] hover:rotate-[1deg]" />}
                </div>
            </Link>

            {/* Like button */}
            <span className="bg-gray-opacity hover:bg-rose-200 hover:cursor-pointer w-7 h-7 flex items-center justify-center rounded-full absolute top-0 right-0 m-4 group" onClick={handleLikeMove}>
                <Icon.HeartIcon className="text-gray-300 w-5 h-5 group-hover:text-rose-500" />
            </span>

            {/* Release Date */}
            <p className="text-xs font-bold text-gray-400" data-testid="movie-release-date">{date}</p>

            {/* Title */}
            <Link to={`/movies/${id}`}>
                <h1 className="text-lg font-bold w-[250px] hover:underline hover:text-rose-700" data-testid="movie-title">{title}</h1>
            </Link>

            {/* Ratings */}
            <div className="flex items-center justify-between w-[250px]">
                <span className="flex items-center gap-2 text-xs">
                    <Imdb />
                    <p>{rating} / 10</p>
                </span>
                <span className="flex items-center gap-2 text-xs">
                    <RottenTomatoe />
                    <p>{score}%</p>
                </span>
            </div>

            {/* Genres */}
            <span className="flex gap-1">
                {genres.map((genreId) => (
                    <p key={genreId} className="text-xs font-bold text-gray-400">{allGenres[genreId]}, </p>
                ))}
            </span>
        </div>
    )
}
