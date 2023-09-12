import { Link, useNavigate, useParams } from "react-router-dom"
import { useSearchMoviesQuery } from "../../services/searchSlice"
import Paginate from "../../components/global/paginate";
import { useState } from "react";
import { MovieCard } from "../../components/global/moviecard";
import * as Icon from '@heroicons/react/24/solid'
import { Button } from "../../components/global/button";

export const SearchResults = () => {
    const { query } = useParams()
    const [currentPage, setCurrentPage] = useState(1);

    const { data: searchResults, isLoading } = useSearchMoviesQuery({ query: query, page: currentPage })
    console.log(searchResults)

    const navigate = useNavigate()

    const results = searchResults?.results?.map((item) => {
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

    const handlePaginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="space-y-10">
            <div className="bg-gray-900 w-full lg:h-[200px] h-[150px] text-white flex items-center gap-2 pt-16 lg:pl-16 pl-4">
                <Button
                    icon={<Icon.ChevronLeftIcon />}
                    iconOnly
                    widthFit
                    onClick={() => navigate(-1)}
                />
                <h1 className="lg:text-4xl text-xl font-bold">Search Results</h1>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 justify-items-center gap-y-24 w-full">

                {results?.map((item) => (
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
            <Paginate totalPosts={searchResults?.total_results} totalPages={searchResults?.total_pages} currentPage={currentPage} paginate={handlePaginate} />
        </div>
    )
}