import { useRef, useState } from "react";
import axios from "axios";

function AdApplication() {
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileNoRef = useRef();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/createAd`,
        {
          fullname: nameRef.current.value,
          email: emailRef.current.value,
          mobileno: mobileNoRef.current.value,
        }
      );

      alert(res.data.msg);
      // Clear form
      nameRef.current.value = "";
      emailRef.current.value = "";
      mobileNoRef.current.value = "";
    } catch (error) {
      alert(
        error.response?.data?.msg || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-start py-5 bg-light min-vh-100 mt-5">
      <div
        className="card shadow-lg p-5"
        style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-danger">
          Apply for Advertisement
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label fw-semibold">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              ref={nameRef}
              className="form-control border border-danger shadow-sm"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              ref={emailRef}
              className="form-control border border-danger shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label htmlFor="mobile" className="form-label fw-semibold">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="text"
              ref={mobileNoRef}
              className="form-control border border-danger shadow-sm"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-danger btn-lg fw-bold shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : null}
              {loading ? "Submitting..." : "Apply Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdApplication;
