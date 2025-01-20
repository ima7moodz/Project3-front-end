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
    <div>
      <h1>Update Class</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Update Class</button>
      </form>
    </div>
  )
}

export default UpdateClass
