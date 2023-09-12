import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './api/store.js'
import { RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom'

import { TopMovies } from './routes/landing/topMovies.jsx'
import { SearchResults } from './routes/landing/searchResults.jsx'
import { Movie } from './routes/details/movie.jsx'
import { MoviesLayout } from './components/layouts/movies.jsx'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { ErrorState } from './components/states/error.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorState />,
    children: [
      {
        index: true,
        path: "/",
        element: <TopMovies />,
      },
      {
        path: "find/:query",
        element: <SearchResults />,
      }
    ]
  },

  {
    path: "movies",
    element: <MoviesLayout />,
    errorElement: <ErrorState />,
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
      position="bottom-center"
      autoClose={1000}
      hideProgressBar={true}
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
