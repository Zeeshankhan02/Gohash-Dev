import { useRef } from "react";
import SuperAdminNav from "./SuperAdminNav";
import "./SuperAdminPages.css";
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
        {
          fullname,
          email,
          password,
        },
        {
          headers: { token: token },
        }
      );

      alert(res.data.msg);
    } catch (error) {
      if (error.response) {
        // Backend sent a response (e.g. 404, 403, 500)
        console.log(error); // for debugging
        alert(error.response.data.msg);
      } else {
        // No response (network error, server down, etc.)
        console.error(error.message);
        alert("Something went wrong. Please try again.");
      }
    }

    // console.log(res.data);
  }
  return (
    <div className="superadmin-page">
      <SuperAdminNav />
      <h2>Create a new SubAdmin</h2>

      <form onSubmit={handleSubmit} method="post">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="SAfullName">
            fullName
            <input
              type="text"
              ref={fullNameRef}
              name="fullName"
              id="SAfullName"
            />
          </label>
          <label htmlFor="SAemail">
            Email
            <input type="text" ref={emailRef} name="email" id="SAemail" />
          </label>
          <label htmlFor="SApassword">
            password
            <input
              type="password"
              ref={passwordRef}
              name="password"
              id="SApassword"
            />
          </label>
        </div>
        <button type="submit">Create SubAdmin</button>
      </form>
    </div>
  );
}

export default CreateSubAdmin;
