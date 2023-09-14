import { Link, useNavigate, useParams } from "react-router-dom";
import { useSearchMoviesQuery } from "../../services/searchSlice";
import Paginate from "../../components/global/paginate";
import { useEffect, useState } from "react";
import { MovieCard } from "../../components/global/moviecard";
import * as Icon from '@heroicons/react/24/solid';
import { Button } from "../../components/global/button";
import { ErrorState } from "../../components/states/errorState";
import { toast } from "react-toastify";

export const SearchResults = () => {
    // Get the search query from the URL using useParams
    const { query } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch search results using the useSearchMoviesQuery hook
    const { data: searchResults, isLoading, isError } = useSearchMoviesQuery({ query: query, page: currentPage });

    // Error Handling
    useEffect(() => {
        if (isError)
            toast.error("Server Error");
    }, [isError]);

    const navigate = useNavigate();

    // Transform search results into a more readable format
    const results = searchResults?.results?.map((item) => {
        return {
            id: item.id,
            title: item.title,
            backdropPath: item.backdrop_path,
            posterPath: item.poster_path,
            releaseDate: item.release_date,
            overview: item.overview,
            rating: item.vote_average,
            genres: item.genre_ids,
        };
    });

    const handlePaginate = (pageNumber) => {
        setCurrentPage(pageNumber);

        // Scroll to top of page when page changes
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    };

    return (
        <div className="space-y-10">
            <div className="bg-gray-900 w-full lg:h-[200px] h-[150px] text-white flex items-center gap-2 pt-16 lg:pl-16 pl-4">
                <Button
                    icon={<Icon.ChevronLeftIcon />}
                    iconOnly
                    widthFit
                    onClick={() => navigate(-1, { replace: true })}
                />
                <h1 className="lg:text-4xl text-xl font-bold">Search Results</h1>
            </div>
            {searchResults?.total_results === 0 ? (
                <ErrorState subText="We could not find what you were looking for" />
            ) : (
                <>
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
                    <Paginate
                        totalCount={searchResults?.total_results}
                        totalPages={searchResults?.total_pages}
                        currentPage={currentPage}
                        paginate={handlePaginate}
                        pageSize={20}
                    />
                </>
            )}
        </div>
    );
};
