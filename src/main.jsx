import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './api/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { TopMovies } from './routes/landing/topMovies.js'
import { SearchResults } from './routes/landing/searchResults.js'
import { Movie } from './routes/details/movie.js'
import { MoviesLayout } from './components/layouts/movies.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <TopMovies />
      },
      {
        path: ":query",
        element: <SearchResults />
      }
    ]
  },
  {
    path: "movies",
    element: <MoviesLayout />,
    children: [
      {
        path: ":movieId",
        element: <Movie />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
