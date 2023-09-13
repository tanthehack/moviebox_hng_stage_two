import { Outlet, ScrollRestoration } from "react-router-dom";
import { LandingLayout } from "./components/layouts/landing";
import ScrollToTop from "./helpers/scrollToTop";
function App() {

  return (
    <>
      <ScrollToTop />
      <LandingLayout>
        <ScrollRestoration />
        <Outlet />
      </LandingLayout>
    </>
  )
}

export default App
