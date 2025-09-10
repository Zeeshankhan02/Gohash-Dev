import { NavLink } from "react-router-dom";

function NavBar() {
  return (



<div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm ">
      <div className="container">
        {/* Brand Name */}
        <NavLink className="navbar-brand fw-bold text-danger fs-4" to="/">
          Gohash
        </NavLink>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler border-danger"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">

            
                  <li className="nav-item mx-2 my-1 my-lg-0">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-danger fw-bold px-3"
                    : "btn btn-outline-danger fw-semibold px-3"
                }
              >
                home
              </NavLink>
            </li>
            <li className="nav-item mx-2 my-1 my-lg-0">
              <NavLink
                to="/general"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-danger fw-bold px-3"
                    : "btn btn-outline-danger fw-semibold px-3"
                }
              >
                General
              </NavLink>
            </li>
            <li className="nav-item mx-2 my-1 my-lg-0">
              <NavLink
                to="/headlines"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-danger fw-bold px-3"
                    : "btn btn-outline-danger fw-semibold px-3"
                }
              >
                Headlines
              </NavLink>
            </li>
            <li className="nav-item mx-2 my-1 my-lg-0">
              <NavLink
                to="/apply-for-ads"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-danger fw-bold px-3"
                    : "btn btn-outline-danger fw-semibold px-3"
                }
              >
                Ads
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
    





</div>

  );
}

export default NavBar;
