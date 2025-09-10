import { useRef } from "react";
import SuperAdminNav from "./SuperAdminNav";
import "./CSS/SuperAdminPages.css";
import axios from "axios";

function CreateSubAdmin() {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const fullname = fullNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/superAdmin/createSubAdmins`,
        { fullname, email, password },
        { headers: { token: token } }
      );

      alert(res.data.msg);
      fullNameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      if (error.response) {
        console.log(error);
        alert(error.response.data.msg);
      } else {
        console.error(error.message);
        alert("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className="superadmin-page bg-light min-vh-100">
      <SuperAdminNav />

      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "500px", width: "100%" }}>
          <h2 className="text-center mb-4 fw-bold text-danger">
            Create a new SubAdmin
          </h2>

          <form onSubmit={handleSubmit} method="post">
            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="SAfullName" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                ref={fullNameRef}
                name="fullName"
                id="SAfullName"
                autoComplete="off"
                className="form-control"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="SAemail" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                ref={emailRef}
                name="email"
                id="SAemail"
                autoComplete="off"
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="SApassword" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                ref={passwordRef}
                name="password"
                id="SApassword"
                autoComplete="off"
                className="form-control"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-danger fw-semibold">
                Create SubAdmin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSubAdmin;
