import { Link, useNavigate } from "react-router-dom"

const Nav = ({ logOut, user }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logOut()
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Martial Art Club
        </Link>
        <div>
          <ul
            className="navbar-nav ms-auto"
            style={{ padding: "10px", marginBottom: "20px" }}
          >
            <li className="nav-item" style={{ marginRight: "15px" }}>
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item" style={{ marginRight: "15px" }}>
                  <Link
                    to="/class"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Class
                  </Link>
                </li>
                {user && user.role === "trainee" && (
                  <li className="nav-item" style={{ marginRight: "15px" }}>
                    <Link
                      to="/class/join"
                      className="nav-link active"
                      aria-current="page"
                    >
                      My Classes
                    </Link>
                  </li>
                )}
                <button onClick={handleLogout} className="btn btn-danger">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <li className="nav-item" style={{ marginRight: "15px" }}>
                  <Link
                    to="/auth/signin"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item" style={{ marginRight: "15px" }}>
                  <Link
                    to="/auth/signup"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
