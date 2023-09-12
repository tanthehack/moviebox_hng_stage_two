import { apiSlice } from "../api/apiSlice";

export const movieVideosSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovieVideos: builder.query({
            query: (id) => ({
                url: `/movie/${id}/videos`,
                method: 'get'
            })
        })
    })
});

export const {
    useGetMovieVideosQuery
} = movieVideosSlice