import { Footer } from "../global/footer"
import { Nav } from "../global/nav"

export const LandingLayout = ({ children }) => {
    return (
        <main className="font-dm w-[100dvw]">
            <Nav />
            {children}
            <Footer />
        </main>
    )
}