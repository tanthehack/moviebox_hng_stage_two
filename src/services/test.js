import { apiSlice } from "../api/apiSlice";

export const test = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        test: builder.query({
            query: () => ({
                url: "/movie/11/images",
                method: 'get'
            })
        })
    })
});

export const {
    useTestQuery
} = test