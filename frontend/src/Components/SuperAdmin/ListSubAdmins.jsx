import { useEffect, useState } from "react";
import axios from "axios";
import SuperAdminNav from "./SuperAdminNav";
import "./CSS/SuperAdminPages.css";

function ListSubAdmins() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/superAdmin/listSubAdmins`,
          { headers: { token: token } }
        );
        setSubAdmins(res.data.listOfSubAdmins);
      } catch (err) {
        console.error("Error fetching subAdmins", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubAdmins();
  }, []);

  return (
    <div className="superadmin-page bg-light min-vh-100">
      <SuperAdminNav />

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: "#dc3545" }}>
          List of SubAdmins
        </h2>

        {loading ? (
          <p className="text-center text-muted">Loading...</p>
        ) : subAdmins.length === 0 ? (
          <p className="text-center text-muted">No SubAdmins found</p>
        ) : (
          <div className="row g-4">
            {subAdmins.map((subAdmin, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 shadow-sm border rounded">
                  <div className="card-body">
                    <h5 className="card-title fw-bold" style={{ color: "#dc3545" }}>
                      {subAdmin.fullname}
                    </h5>
                    <p className="card-text text-muted">{subAdmin.email}</p>
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

export default ListSubAdmins;
