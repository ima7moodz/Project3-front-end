import "./App.css"
import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { BASE_URL } from "./globals"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import Class from "./pages/class/Class"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import { getProfile } from "./services/userService"
import axios from "axios"

const App = () => {
  const [user, setUser] = useState(null)

  const getUserProfile = async () => {
    try {
      const data = await getProfile()
      setUser(data)
    } catch (error) {
      setUser(null)
      console.log(error)
    }
  }

  const logOut = () => {
    localStorage.removeItem("authToken")
    setUser(null)
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <>
      <header>
        <Nav logOut={logOut} user={user} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/signup"
            element={<Signup getUserProfile={getUserProfile} />}
          />
          <Route
            path="/auth/signin"
            element={<Signin getUserProfile={getUserProfile} />}
          />
          <Route path="/class" element={<Class />} />
        </Routes>
      </main>
    </>
  )
}

export default App
