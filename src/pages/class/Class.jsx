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
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">Classes Available</h1>

      {/* Add New Class Button for Trainers */}
      {user && user.role === "trainer" && (
        <Link
          to="/class/add"
          className="btn btn-primary mb-4"
          style={{ padding: "8px 16px", textDecoration: "none" }}
        >
          Add New Class
        </Link>
      )}

      <div className="row">
        {classes.length > 0 ? (
          classes.map((classData) => (
            <div className="col-md-4 mb-4" key={classData._id}>
              <ClassComp classData={classData} />
            </div>
          ))
        ) : (
          <p className="text-center col-12">Stay tuned for upcoming classes!</p>
        )}
      </div>
    </div>
  )
}

export default Class
