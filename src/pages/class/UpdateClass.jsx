import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getClassById } from "../../services/classService"
import { updateClass } from "../../services/classService"

const UpdateClass = ({ classes, setClasses }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formClass, setFormClass] = useState({
    classStyle: "",
    duration: "",
    time: "",
    traineesInClass: "",
  })

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const classData = await getClassById(id)
        setFormClass({
          classStyle: classData.classStyle,
          duration: classData.duration,
          time: classData.time,
          traineesInClass: classData.traineesInClass,
        })
      } catch (error) {
        console.error("Error fetching class details:", error)
      }
    }
    fetchClassDetails()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = {
        classStyle: formClass.classStyle,
        duration: parseInt(formClass.duration),
        time: formClass.time,
        traineesInClass: formClass.traineesInClass,
      }

      const updatedClass = await updateClass(id, formData)
      const updatedClasses = classes.map((cls) =>
        cls._id === id ? updatedClass : cls
      )
      setClasses(updatedClasses)
      navigate(`/class/${id}`)
    } catch (error) {
      console.error("Error updating class:", error)
    }
  }

  const handleChange = (event) => {
    setFormClass({ ...formClass, [event.target.id]: event.target.value })
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Update Class</h1>
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

        <button type="submit" className="btn btn-success w-100">
          Update Class
        </button>
      </form>
    </div>
  )
}

export default UpdateClass
