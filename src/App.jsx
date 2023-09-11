import { Outlet } from "react-router-dom";
import { LandingLayout } from "./components/layouts/landing";
import { useTestQuery } from "./services/test"
function App() {

  const { data: testData } = useTestQuery();

  console.log(testData)

  return (
    <>
      <LandingLayout>
        <Outlet />
      </LandingLayout>
    </>
  )
}

export default App
