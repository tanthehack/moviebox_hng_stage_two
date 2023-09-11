import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    // Define the base URL for API requests. It's loaded from environment variables.
    baseUrl: import.meta.env.VITE_APP_MOVIEBOX_BASE_URL,

    // Prepare headers for API requests, including authorization.
    prepareHeaders: (headers) => {
        // Load the authorization token from environment variables.
        const token = import.meta.env.VITE_APP_MOVIEBOX_TOKEN;

        // Set the "Authorization" header with the Bearer token.
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
    }
});

// Create an API slice using createApi.
export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: (builder) => ({}),
});





