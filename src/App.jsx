import { Outlet } from "react-router-dom";
import { LandingLayout } from "./components/layouts/landing";
function App() {

  return (
    <>
      <LandingLayout>
        <Outlet />
      </LandingLayout>
    </>
  )
}

export default App
