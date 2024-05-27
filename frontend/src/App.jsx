import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/authorization/Login"
import Signup from "./pages/authorization/Signup"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/home" Component={HomePage}/>
        <Route path="/signup" Component={Signup}/>
      </Routes>
    </>
  )
}

export default App
