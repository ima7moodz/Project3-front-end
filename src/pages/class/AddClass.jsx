import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addClass } from "../../services/classService"

const AddClass = ({ classes, setClasses }) => {
  const initialState = {
    classStyle: "",
    duration: "",
    time: "",
    traineesInClass: "",
  }
  const [formClass, setFormClass] = useState(initialState)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = {
        classStyle: formClass.classStyle,
        duration: parseInt(formClass.duration),
        time: formClass.time,
        traineesInClass: formClass.traineesInClass,
      }

      const response = await addClass(formData)
      setClasses([...classes, response])
      setFormClass(initialState)
      navigate("/class")
    } catch (error) {
      console.error("Error adding class:", error)
    }
  }

  const handleChange = (event) => {
    setFormClass({ ...formClass, [event.target.id]: event.target.value })
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Create a New Class</h1>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <div className="mb-3">
          <label htmlFor="classStyle" className="form-label">
            Class Style
          </label>
          <select
            id="classStyle"
            onChange={handleChange}
            value={formClass.classStyle}
            className="form-select"
            required
          >
            <option value="">Select a style</option>
            <option value="kick boxing">Kick Boxing</option>
            <option value="boxing">Boxing</option>
            <option value="muay thai">Muay Thai</option>
            <option value="grappling">Grappling</option>
            <option value="kowat alrami">Kowat Alrami</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration (in minutes)
          </label>
          <input
            type="number"
            id="duration"
            placeholder="Enter duration"
            onChange={handleChange}
            value={formClass.duration}
            className="form-control"
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Date & Time
          </label>
          <input
            type="datetime-local"
            id="time"
            onChange={handleChange}
            value={formClass.time}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="traineesInClass" className="form-label">
            Trainees in Class (optional)
          </label>
          <input
            type="number"
            id="traineesInClass"
            placeholder="Enter number of trainees"
            onChange={handleChange}
            value={formClass.traineesInClass}
            className="form-control"
            min="0"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create Class
        </button>
      </form>
    </div>
  )
}

export default AddClass
