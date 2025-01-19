import React from "react"
import { Link } from "react-router-dom"

const Class = ({ user }) => {
  return (
    <div>
      <h1>Classes</h1>
      {user && user.role === "trainer" && (
        <Link to="/class/add">Add new Class</Link>
      )}
    </div>
  )
}

export default Class
