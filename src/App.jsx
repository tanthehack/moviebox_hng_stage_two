import { useTestQuery } from "./services/test"
function App() {

  const { data: testData } = useTestQuery();

  console.log(testData)

  return (
    <>
      <p>yo</p>
    </>
  )
}

export default App
