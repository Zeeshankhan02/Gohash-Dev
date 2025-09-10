import SuperAdminNav from "./SuperAdminNav";
import { NavLink } from "react-router-dom";
import "./CSS/SuperAdminPages.css";

function SuperAdminDash() {
  return (
    <div className="superadmin-page">
      {/* Navbar Top */}
      <SuperAdminNav />

      {/* Dashboard Buttons */}
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-center flex-wrap gap-4">
          <NavLink
            to="../list-subadmins"
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline-danger btn-lg shadow-sm px-5 py-3 fw-bold"
                : "btn btn-outline-secondary btn-lg shadow-sm px-5 py-3 fw-bold"
            }
          >
            List SubAdmins
          </NavLink>

          <NavLink
            to="../create-subadmin"
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline-danger btn-lg shadow-sm px-5 py-3 fw-bold"
                : "btn btn-outline-secondary btn-lg shadow-sm px-5 py-3 fw-bold"
            }
          >
            Create SubAdmin
          </NavLink>

          <NavLink
            to="../view-ads-application"
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline-danger btn-lg shadow-sm px-5 py-3 fw-bold"
                : "btn btn-outline-secondary btn-lg shadow-sm px-5 py-3 fw-bold"
            }
          >
            View Ads Application
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDash;
