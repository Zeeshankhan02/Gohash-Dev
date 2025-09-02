import { Outlet } from "react-router-dom";

function SuperAdminLoginLayout() {
  return (
    <div>
      <h2>Super Admin Panel</h2>
      <Outlet /> 
    </div>
  );
}

export default SuperAdminLoginLayout;
