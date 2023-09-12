import { Footer } from "../global/footer"
import { Nav } from "../global/nav"

export const LandingLayout = ({ children }) => {
    return (
        <main className="flex flex-col gap-[100px] font-dm">
            <Nav />
            {children}
            <Footer />
        </main>
    )
}