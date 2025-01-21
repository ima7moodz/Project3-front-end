import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getJoinedClasses } from "../../services/classService"

const JoinedClasses = ({ user }) => {
  const [joinedClasses, setJoinedClasses] = useState([])

  useEffect(() => {
    if (!user) return

    const fetchJoinedClasses = async () => {
      try {
        const classes = await getJoinedClasses(user._id)
        setJoinedClasses(classes)
      } catch (error) {
        console.error("Error fetching joined classes:", error)
      }
    }

    fetchJoinedClasses()
  }, [user])

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Classes</h1>
      {joinedClasses.length === 0 ? (
        <div className="alert alert-info text-center">
          <p>You haven't joined any classes yet.</p>
          <Link to="/class" className="btn btn-primary">
            Browse Available Classes
          </Link>
        </div>
      ) : (
        <ul className="list-group">
          {joinedClasses.map((classData) =>
            classData ? (
              <li key={classData._id} className="list-group-item mb-3">
                <h2 className="h5">{classData.classStyle}</h2>
                <p>
                  <strong>Duration:</strong> {classData.duration} minutes
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(classData.time).toLocaleString("en-US", {
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <strong>Trainees in this Class:</strong>{" "}
                  {classData.traineesInClass}
                </p>
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  )
}

export default JoinedClasses
