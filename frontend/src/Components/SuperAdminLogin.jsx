import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function SuperAdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/superAdmin`, {
        username,
        password
      });
  
      // if request succeeds (200)
      alert(res.data.msg);
      localStorage.setItem("token", res.data.token);
      navigate("dashboard");
      
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
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default SuperAdminLogin;
