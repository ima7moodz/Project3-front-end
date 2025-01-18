import { Link } from "react-router-dom"

const Nav = ({ logOut, user }) => {
  return (
    <nav>
      <div>
        <Link to="/">Martial Art Club</Link>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/class">Class</Link>
                </li>

                {/* {user && user.role === "trainer" && (
                  <li>
                    <Link to="/class/add">Add Class</Link>
                  </li>
                )} */}

                <li>
                  <button onClick={logOut}>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/auth/signin">Sign In</Link>
                </li>
                <li>
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
