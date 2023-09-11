import { Link } from "react-router-dom"

export const LandingLayout = ({ children }) => {
    return (
        <>
            <h1>Header</h1>
            {children}

            <Link to="movies">movies</Link>
        </>
    )
}