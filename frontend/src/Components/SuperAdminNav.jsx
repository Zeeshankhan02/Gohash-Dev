import { NavLink, useNavigate } from "react-router-dom";
import "./SuperAdminNav.css";

function SuperAdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/secret/superAdmin"); // redirect to login
  };

  return (
    <nav className="superadmin-nav">
      {/* Left: navigation links */}
      <div className="superadmin-links">
        <NavLink
          to="../list-subadmins"
          className={({ isActive }) =>
            isActive ? "superadmin-link superadmin-link-active" : "superadmin-link"
          }
        >
          List SubAdmins
        </NavLink>

        <NavLink
          to="../create-subadmin"
          className={({ isActive }) =>
            isActive ? "superadmin-link superadmin-link-active" : "superadmin-link"
          }
        >
          Create SubAdmin
        </NavLink>

        <NavLink
          to="../view-ads-application"
          className={({ isActive }) =>
            isActive ? "superadmin-link superadmin-link-active" : "superadmin-link"
          }
        >
          View Ads Application
        </NavLink>
      </div>

      {/* Right: logout */}
      <button className="superadmin-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default SuperAdminNav;
