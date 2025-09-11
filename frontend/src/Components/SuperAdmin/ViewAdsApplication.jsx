import SuperAdminNav from "./SuperAdminNav";
import "./CSS/SuperAdminPages.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ViewAdsApplication() {
  const [adsApplication, setAdsApplication] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAdsApplication() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/superAdmin/viewAdsApplications`,
        { headers: { token: token } }
      );
      setAdsApplication(res.data.applications.reverse());
    } catch (error) {
      console.error("Error fetching ads applications", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdsApplication();
  }, []);

  return (
    <div className="superadmin-page bg-light min-vh-100">
      <SuperAdminNav />

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: "#dc3545" }}>
          Ads Applications
        </h2>

        {loading ? (
          <p className="text-center text-muted">Loading...</p>
        ) : adsApplication.length === 0 ? (
          <p className="text-center text-muted">No ads applications found</p>
        ) : (
          <div className="row g-4">
            {adsApplication.map((ad, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 shadow-sm border rounded">
                  <div className="card-body">
                    <h5 className="card-title fw-bold" style={{ color: "#dc3545" }}>
                      {ad.fullname}
                    </h5>
                    <p className="card-text"><strong>Email:</strong> {ad.email}</p>
                    <p className="card-text"><strong>Mobile:</strong> {ad.mobileno}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewAdsApplication;
