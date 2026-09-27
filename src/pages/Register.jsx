import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const data = await registerUser({
        username: username,
        password: password,
        role: role
      });

      console.log("Register Response:", data);

      setMessage(data.message || "Registration successful");

      setUsername("");
      setPassword("");
      setRole("CUSTOMER");

      // After 2 seconds go to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      setError(error.message);

    }
  };

  return (
    <div>

      <h2>Online Banking - Register</h2>

      <form onSubmit={handleRegister}>

        <div>
          <label>Username</label>
          <br />

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Role</label>
          <br />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="CUSTOMER">Customer</option>
            <option value="ADMIN">Admin</option>
            <option value="BANK_MANAGER">Bank Manager</option>
            <option value="ACCOUNT_OPENING_STAFF">
              Account Opening Staff
            </option>
            <option value="DOCUMENT_VERIFICATION_STAFF">
              Document Verification Staff
            </option>
          </select>
        </div>

        <br />

        <button type="submit">
          Register
        </button>

      </form>

      {message && (
        <p>{message}</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      <p>
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>

    </div>
  );
}

export default Register;