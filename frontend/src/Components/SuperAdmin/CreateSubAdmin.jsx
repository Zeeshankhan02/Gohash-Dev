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
      fullNameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      if (error.response) {
        // Backend sent a response 
        console.log(error); // for debugging
        alert(error.response.data.msg);
      } else {
        // No response 
        console.error(error.message);
        alert("Something went wrong. Please try again.");
      }
    }

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
              autoComplete="off"
            />
          </label>
          <label htmlFor="SAemail">
            Email
            <input
              type="email"
              ref={emailRef}
              name="email"
              id="SAemail"
              autoComplete="off"
            />
          </label>
          <label htmlFor="SApassword">
            password
            <input
              type="password"
              ref={passwordRef}
              name="password"
              id="SApassword"
              autoComplete="off"
            />
          </label>
        </div>
        <button type="submit">Create SubAdmin</button>
      </form>
    </div>
  );
}

export default CreateSubAdmin;
