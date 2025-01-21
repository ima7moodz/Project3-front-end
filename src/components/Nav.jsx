import { Link } from "react-router-dom"

const Nav = ({ logOut, user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Martial Art Club
        </Link>
        <div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/class">Class</Link>
                </li>
                {user && user.role === "trainee" && (
                  <li className="nav-item">
                    <Link to="/class/join">My Classes</Link>
                  </li>
                )}

                <button onClick={logOut}>Log Out</button>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/auth/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth/signup">Sign Up</Link>
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
