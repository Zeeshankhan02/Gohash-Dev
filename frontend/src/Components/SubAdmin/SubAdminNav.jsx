import { NavLink, useNavigate } from "react-router-dom";


function SubAdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("subAdmintoken");
    navigate("../");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 fixed-top">
      <div className="container-fluid">
        {/* Brand Name Left */}
        <span className="navbar-brand fw-bold fs-4">Gohash</span>

        {/* Hamburger Toggle for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#superadminNavbar"
          aria-controls="superadminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Buttons Center + Logout Right */}
        <div className="collapse navbar-collapse justify-content-center" id="superadminNavbar">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <NavLink
                to="../create-news"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-outline-danger fw-semibold"
                    : "btn btn-outline-secondary fw-semibold"
                }
              >
                Create News
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink
                to="../articles-created"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-outline-danger fw-semibold"
                    : "btn btn-outline-secondary fw-semibold"
                }
              >
                View News Articles Created
              </NavLink>
            </li>
           
          </ul>

          {/* Logout Button Right */}
          <div className="ms-auto">
            <button
              className="btn btn-danger fw-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SubAdminNav;
