import { apiSlice } from "../api/apiSlice";

export const movieDetailsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovieDetails: builder.query({
            query: (id) => ({
                url: `movie/${id}?language=en-US&video=true`,
                method: 'get'
            })
        })
    })
});

export const {
    useGetMovieDetailsQuery
} = movieDetailsSlice