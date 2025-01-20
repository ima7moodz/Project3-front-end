import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getClassById, deleteClass } from "../../services/classService"

const ClassDetail = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [classData, setClassData] = useState(null)

  useEffect(() => {
    const getClass = async () => {
      try {
        const data = await getClassById(id)
        setClassData(data)
      } catch (error) {
        console.error("Error fetching class details:", error)
      }
    }
    getClass()
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteClass(id)
      navigate("/class")
    } catch (error) {
      console.error("Error deleting class:", error)
    }
  }

  const handleUpdate = () => {
    navigate(`/class/${id}/update`)
  }

  const handleJoinClass = () => {
    alert("You have successfully joined the class!")
    // I will do the logic for join
  }

  if (!classData) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Class Details</h1>
      <p>Style: {classData.classStyle}</p>
      <p>Duration: {classData.duration} minutes</p>
      <p>
        Time:{" "}
        {new Date(classData.time).toLocaleString("en-US", {
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      {classData.traineesInClass && (
        <p>Trainees: {classData.traineesInClass}</p>
      )}
      {user && user.role === "trainer" && (
        <div>
          <button onClick={handleUpdate}>Update Class</button>
          <button onClick={handleDelete}>Delete Class</button>
        </div>
      )}
      {user && user.role === "trainee" && (
        <button onClick={handleJoinClass}>Join Class</button>
      )}
    </div>
  )
}

export default ClassDetail
