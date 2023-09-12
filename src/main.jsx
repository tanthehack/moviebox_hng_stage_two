import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './api/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { TopMovies } from './routes/landing/topMovies.jsx'
import { SearchResults } from './routes/landing/searchResults.jsx'
import { Movie } from './routes/details/movie.jsx'
import { MoviesLayout } from './components/layouts/movies.jsx'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const router = createBrowserRouter([
  {
    path: "/",
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
        index: true,
        path: ":movieId",
        element: <Movie />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      limit={1}
      className="toast-global"
    />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
