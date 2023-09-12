import { Outlet, ScrollRestoration } from "react-router-dom";
import { LandingLayout } from "./components/layouts/landing";
function App() {

  return (
    <>
      <LandingLayout>
        <ScrollRestoration />
        <Outlet />
      </LandingLayout>
    </>
  )
}

export default App
