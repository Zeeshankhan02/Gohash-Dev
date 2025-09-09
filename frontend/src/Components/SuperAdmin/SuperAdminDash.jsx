import SuperAdminNav from "./SuperAdminNav";
import "./CSS/SuperAdminPages.css";

function SuperAdminDash() {
  return (
    <div className="superadmin-page">
      <h1>Super Admin Dashboard</h1>
      <SuperAdminNav />
      <p>Choose an option from the navbar above.</p>
    </div>
  );
}

export default SuperAdminDash;
