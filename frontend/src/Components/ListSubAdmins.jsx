import { useEffect, useState } from "react";
import axios from "axios";
import SuperAdminNav from "./SuperAdminNav";
import "./SuperAdminPages.css";

function ListSubAdmins() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/superAdmin/listSubAdmins`,
          {
            headers: {token:token},
          }
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
    <div className="superadmin-page">
      <SuperAdminNav />
      <h2>List of SubAdmins</h2>

      {loading ? (
        <p>Loading...</p>
      ) : subAdmins.length === 0 ? (
        <p>No SubAdmins found</p>
      ) : (
        <div className="subadmin-card-container">
          {subAdmins.map((subAdmin, index) => (
            <div key={index} className="subadmin-card">
              <h3>{subAdmin.fullname}</h3>
              <p>{subAdmin.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListSubAdmins;
