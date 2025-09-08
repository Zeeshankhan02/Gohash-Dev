import SuperAdminNav from "./SuperAdminNav";
import "./CSS/SuperAdminPages.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ViewAdsApplication() {
  const [adsApplication,setAdsApplication] = useState([])
  const [loading, setLoading] = useState(true);

  async function fetchAdsApplication(){
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/superAdmin/viewAdsApplications`,{
        headers:{"token":token}
      })
      console.log(res.data);
      setAdsApplication(res.data.applications)
      setLoading(false)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchAdsApplication()
  },[])
  
  return (
    <div className="superadmin-page">
      <SuperAdminNav />
      <h2>Ads Applications</h2>


      {loading ? (
        <p>Loading...</p>
      ) : adsApplication.length === 0 ? (
        <p>No ads applications found</p>
      ) : (
        <div className="subadmin-card-container">
          {adsApplication.map((ad, index) => (
            <div key={index} className="subadmin-card">
              <h3>{ad.fullname}</h3>
              <p>{ad.email}</p>
              <p>{ad.mobileno}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAdsApplication;
