import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getClassById, deleteClass } from "../../services/classService"
import { joinClass, getJoinedClasses } from "../../services/classService"

const ClassDetail = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [classData, setClassData] = useState(null)
  const [hasJoined, setHasJoined] = useState(false)

  useEffect(() => {
    const getClass = async () => {
      try {
        const data = await getClassById(id)
        setClassData(data)

        if (user) {
          const joinedClasses = await getJoinedClasses(user._id)
          setHasJoined(joinedClasses.some((classItem) => classItem._id === id))
        }
      } catch (error) {
        console.error("Error fetching class details:", error)
      }
    }
    if (user) {
      getClass()
    }
  }, [id, user])

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

  const handleJoinClass = async () => {
    try {
      if (hasJoined) {
        alert("You have already joined this class.")
        return
      }
      await joinClass(id, user._id)
      setHasJoined(true)

      alert("Successfully joined the class!")
      navigate("/class/join")
    } catch (error) {
      console.error("Error joining class:", error)
      alert("Could not join the class.")
    }
  }

  if (!classData) {
    return <p>Loading...</p>
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Class Details</h1>
      <div className="card p-3 mb-4">
        <h3>Style: {classData.classStyle}</h3>
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
      </div>

      {user && user.role === "trainer" && (
        <div>
          <button onClick={handleUpdate} className="btn btn-warning me-2">
            Update Class
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Class
          </button>
        </div>
      )}

      {user && user.role === "trainee" && !hasJoined && (
        <button onClick={handleJoinClass} className="btn btn-primary mt-3">
          Join Class
        </button>
      )}

      {user && user.role === "trainee" && hasJoined && (
        <p className="mt-3 text-success">You have already joined this class.</p>
      )}
    </div>
  )
}

export default ClassDetail
