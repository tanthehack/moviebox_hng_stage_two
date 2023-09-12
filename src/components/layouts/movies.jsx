import { Outlet } from "react-router-dom"
import { SideBar } from "../global/sideBar"

export const MoviesLayout = () => {
    return (
        <main className="lg:h-[100dvh] font-dm flex">
            <SideBar />
            <Outlet />
        </main>
    )

}