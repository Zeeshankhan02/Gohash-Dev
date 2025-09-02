import SuperAdminNav from "./SuperAdminNav";
import "./SuperAdminPages.css";

function SuperAdminDash() {
  return (
    <div className="superadmin-page">
      <h1>Super Admin Dashboard</h1>
      <SuperAdminNav />
      <p>Welcome! Choose an option from the navbar above.</p>
    </div>
  );
}

export default SuperAdminDash;
