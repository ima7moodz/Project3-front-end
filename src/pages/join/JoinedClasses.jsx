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
    <div>
      <h1>My Joined Classes</h1>
      {joinedClasses.length === 0 ? (
        <div>
          <p>You haven't joined any classes yet.</p>
          <Link to="/class">Browse Available Classes</Link>
        </div>
      ) : (
        <ul>
          {joinedClasses.map((classData) => (
            <li key={classData._id}>
              <h2>{classData.classStyle}</h2>
              <p>Duration: {classData.duration} minutes</p>
              <p>
                Time:{" "}
                {new Date(classData.time).toLocaleString("en-US", {
                  weekday: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>Trainees In this Class: {classData.traineesInClass}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default JoinedClasses
