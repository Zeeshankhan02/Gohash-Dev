import { NavLink } from "react-router-dom";

function NavBar() {
  // Close offcanvas on mobile click
  function handleClose() {
    const offcanvasElement = document.getElementById("offcanvasNavbar");
    const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvas) offcanvas.hide();
  }

  // NavLinks (reusable)
  const renderLinks = (isMobile = false) => (
    <>
      <li className="nav-item mx-2 my-1 my-lg-0">
        <NavLink
          to="/"
          onClick={isMobile ? handleClose : undefined}
          className={({ isActive }) =>
            isActive
              ? "btn btn-danger fw-bold px-3"
              : "btn btn-outline-danger fw-semibold px-3"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item mx-2 my-1 my-lg-0">
        <NavLink
          to="/general"
          onClick={isMobile ? handleClose : undefined}
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
          onClick={isMobile ? handleClose : undefined}
          className={({ isActive }) =>
            isActive
              ? "btn btn-danger fw-bold px-3"
              : "btn btn-outline-danger fw-semibold px-3"
          }
        >
          Daily Bulletin
        </NavLink>
      </li>
      <li className="nav-item mx-2 my-1 my-lg-0">
        <NavLink
          to="/apply-for-ads"
          onClick={isMobile ? handleClose : undefined}
          className={({ isActive }) =>
            isActive
              ? "btn btn-danger fw-bold px-3"
              : "btn btn-outline-danger fw-semibold px-3"
          }
        >
          Ads
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        {/* Brand */}
        <NavLink
          className="navbar-brand fw-bold text-danger fs-4"
          to="/"
          onClick={handleClose}
        >
          Gohash
        </NavLink>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler border-danger"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas (Mobile Menu) */}
        <div
          className="offcanvas offcanvas-end d-lg-none"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title fw-bold text-danger"
              id="offcanvasNavbarLabel"
            >
              Gohash Menu
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">{renderLinks(true)}</ul>
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="d-none d-lg-flex ms-auto">
          <ul className="navbar-nav">{renderLinks(false)}</ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
