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
    <div>
      <h1 className="text-center mb-4">Create a New Class</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div>
          <label htmlFor="classStyle">Class Style</label>
          <select
            id="classStyle"
            onChange={handleChange}
            value={formClass.classStyle}
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

        <div>
          <label htmlFor="duration">Duration (in minutes)</label>
          <input
            type="number"
            id="duration"
            placeholder="Enter duration"
            onChange={handleChange}
            value={formClass.duration}
            required
            min="1"
          />
        </div>

        <div>
          <label htmlFor="time">Date & Time</label>
          <input
            type="datetime-local"
            id="time"
            onChange={handleChange}
            value={formClass.time}
            required
          />
        </div>

        <div>
          <label htmlFor="traineesInClass">Trainees in Class (optional)</label>
          <input
            type="number"
            id="traineesInClass"
            placeholder="Enter number of trainees"
            onChange={handleChange}
            value={formClass.traineesInClass}
            min="0"
          />
        </div>

        <button type="submit">Create Class</button>
      </form>
    </div>
  )
}

export default AddClass
