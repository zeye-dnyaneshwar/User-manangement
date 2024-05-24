import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/authorization/Login"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/home" Component={HomePage}/> 
      </Routes>
    </>
  )
}

export default App
