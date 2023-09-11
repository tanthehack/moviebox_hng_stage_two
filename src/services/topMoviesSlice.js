import { apiSlice } from "../api/apiSlice";

export const topMoviesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTopMovies: builder.query({
            query: () => ({
                url: "/movie/popular?language=en-US&page=1",
                method: 'get'
            })
        })
    })
});

export const {
    useGetTopMoviesQuery
} = topMoviesSlice