import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import SuperAdminLoginLayout from './Components/Layouts/SuperAdminLoginLayout';
import SuperAdminLogin from './Components/SuperAdmin/SuperAdminLogin';
import SuperAdminDash from './Components/SuperAdmin/SuperAdminDash';
import ProtectedRoute from './Components/SuperAdmin/ProtectedRoute';

// New pages
import ListSubAdmins from './Components/SuperAdmin/ListSubAdmins';
import CreateSubAdmin from './Components/SuperAdmin/CreateSubAdmin';
import ViewAdsApplication from './Components/SuperAdmin/ViewAdsApplication';
import SubAdminLayout from "./Components/Layouts/SubAdminLayout";
import SubAdminLogin from "./Components/SubAdmin/SubAdminLogin";
import CreateNews from "./Components/SubAdmin/CreateNews";
import AdApplication from "./Components/User/AdApplication";
import HomeLayout from "./Components/Layouts/HomeLayout";
import News from "./Components/User/News";
import HomePage from "./Components/User/homePage";
import AllNews from "./Components/SubAdmin/AllNews";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Super Admin Parent layout */}
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
        
        {/* Sub Admin Parent Layout */}
        <Route path="/secret/subAdmin" element={<SubAdminLayout/>}>
            <Route index element={<SubAdminLogin/>}/>
            <Route path="create-news" element={<CreateNews/>}/>
            <Route path="articles-created" element={<AllNews/>}/>
        </Route>

        {/* General Routes */}  
        <Route element={<HomeLayout/>}>
        <Route   path="/" element={<HomePage/>} />
        <Route path=":category" element={<News/>}/>
        <Route path="/apply-for-ads" element={<AdApplication/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
