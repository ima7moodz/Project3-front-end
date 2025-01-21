import React from "react"
import { Link } from "react-router-dom"

const ClassComp = ({ classData }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{classData.classStyle}</h2>
        <p className="card-text">
          <strong>Duration:</strong> {classData.duration} minutes
        </p>
        <p className="card-text">
          <strong>Time:</strong>{" "}
          {new Date(classData.time).toLocaleString("en-US", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <Link to={`/class/${classData._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ClassComp
