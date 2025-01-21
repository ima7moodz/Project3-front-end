import "./App.css"
import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { BASE_URL } from "./globals"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import Class from "./pages/class/Class"
import AddClass from "./pages/class/AddClass"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import { getProfile } from "./services/userService"
import axios from "axios"
import ClassDetail from "./pages/class/ClassDetail"
import UpdateClass from "./pages/class/UpdateClass"
import JoinedClasses from "./pages/join/JoinedClasses"
import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  const [user, setUser] = useState(null)
  const [classes, setClasses] = useState([])

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
          <Route path="/class" element={<Class user={user} />} />
          {user && user.role === "trainer" && (
            <Route
              path="/class/add"
              element={<AddClass classes={classes} setClasses={setClasses} />}
            />
          )}
          <Route path="/class/:id" element={<ClassDetail user={user} />} />
          <Route
            path="class/:id/update"
            element={<UpdateClass classes={classes} setClasses={setClasses} />}
          />
          <Route path="class/join" element={<JoinedClasses user={user} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
