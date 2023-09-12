import { apiSlice } from "../api/apiSlice";

export const searchSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchMovies: builder.query({
            query: ({ query, page }) => ({
                url: `search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
                method: 'get'
            })
        })
    })
});

export const {
    useSearchMoviesQuery
} = searchSlice