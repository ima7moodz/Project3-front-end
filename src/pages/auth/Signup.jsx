import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../../services/authService"

const initialFormData = {
  username: "",
  password: "",
  passwordConf: "",
}
const Signup = ({ getUserProfile }) => {
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp(formData)
      await getUserProfile()
      setFormData(initialFormData)
      navigate("/")
    } catch (error) {
      setMessage(error.response?.data?.error)
      console.log(error)
    }
  }

  const isFormInvalid = () => {
    return !(
      formData.username &&
      formData.password &&
      formData.password === formData.passwordConf
    )
  }

  return (
    <main>
      <h1>Sign Up</h1>
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
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={formData.passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            type="submit"
            style={{ backgroundColor: "#800000", color: "#fff" }}
            disabled={isFormInvalid()}
          >
            Sign Up
          </button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </main>
  )
}

export default Signup
