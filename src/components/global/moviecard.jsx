import { toast } from "react-toastify"
import { Imdb, RottenTomatoe } from "../../assets/icons/generatedIcons"
import * as Icon from '@heroicons/react/24/solid'

export const MovieCard = (props) => {

    const {
        title,
        rating,
        score,
        posterPath,
        date
    } = props

    const handleLikeMove = () => {
        toast.success("Saved!");
    }

    return (
        <div className="flex flex-col gap-3" data-testid="movie-card">
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${posterPath})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                className="w-[250px] h-[370px] relative" data-testid="movie-poster"
            >
                <span className="bg-gray-opacity hover:bg-rose-200 hover:cursor-pointer w-7 h-7 flex items-center justify-center rounded-full absolute top-0 right-0 m-4" onClick={handleLikeMove}>
                    <Icon.HeartIcon className="text-gray-300 w-5 h-5 hover:text-rose-500" />
                </span>
            </div>
            <p className="text-xs font-bold text-gray-400" data-testid="movie-release-date">{date}</p>
            <h1 className="text-lg font-bold w-[250px]" data-testid="movie-title">{title}</h1>
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
        </div>
    )
}