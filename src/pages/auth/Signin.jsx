import { useState } from "react"
import { signIn } from "../../services/authService"
import { Link, useNavigate } from "react-router-dom"

const initialFormData = {
  username: "",
  password: "",
}

const Signin = ({ getUserProfile }) => {
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(formData)
      await getUserProfile()
      setFormData(initialFormData)
      navigate("/")
    } catch (error) {
      setMessage(error.response?.data?.error)
    }
  }

  return (
    <main>
      <h1>Sign In</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </main>
  )
}

export default Signin
