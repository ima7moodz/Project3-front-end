import React from "react"

const ClassComp = ({ classData }) => {
  return (
    <div>
      <h2>Style: {classData.classStyle}</h2>
      <p>Duration: {classData.duration} minutes</p>
      <p>
        Time:{" "}
        {new Date(classData.time).toLocaleString("en-US", {
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  )
}

export default ClassComp
