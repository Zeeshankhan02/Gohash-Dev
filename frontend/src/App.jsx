import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SuperAdminLoginLayout from './Components/SuperAdminLoginLayout';
import SuperAdminLogin from './Components/SuperAdminLogin';
import SuperAdminDash from './Components/SuperAdminDash';
import ProtectedRoute from './Components/ProtectedRoute';

// New pages
import ListSubAdmins from './Components/ListSubAdmins';
import CreateSubAdmin from './Components/CreateSubAdmin';
import ViewAdsApplication from './Components/ViewAdsApplication';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent layout */}
        <Route path="/secret/superAdmin" element={<SuperAdminLoginLayout />}>
          {/* Public login */}
          <Route index element={<SuperAdminLogin />} />

          {/* Protected routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <SuperAdminDash />
              </ProtectedRoute>
            }
          />
          <Route
            path="list-subadmins"
            element={
              <ProtectedRoute>
                <ListSubAdmins />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-subadmin"
            element={
              <ProtectedRoute>
                <CreateSubAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="view-ads-application"
            element={
              <ProtectedRoute>
                <ViewAdsApplication />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
