import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getClasses } from "../../services/classService"
import ClassComp from "../../components/ClassComp"

const Class = ({ user }) => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses()
        setClasses(data)
      } catch (error) {
        console.error("Error fetching classes:", error)
      }
    }
    fetchClasses()
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Classes</h1>
      {user && user.role === "trainer" && (
        <Link
          to="/class/add"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "8px 16px",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Add New Class
        </Link>
      )}
      <div>
        {classes.length > 0 ? (
          classes.map((classData) => (
            <ClassComp key={classData._id} classData={classData} />
          ))
        ) : (
          <p>stay tuned</p>
        )}
      </div>
    </div>
  )
}

export default Class
