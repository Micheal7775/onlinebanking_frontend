import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../login.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  // =========================
  // CHECK EXISTING LOGIN
  // =========================
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      const role = localStorage.getItem("role");

      if (role === "CUSTOMER") {

        navigate("/customer/dashboard", {
          replace: true
        });

      } else if (role === "ADMIN") {

        navigate("/admin/dashboard", {
          replace: true
        });

      } else if (role === "ACCOUNT_OPENING_STAFF") {

        navigate("/staff/dashboard", {
          replace: true
        });

      } else if (role === "DOCUMENT_VERIFICATION_STAFF") {

        navigate("/verification/dashboard", {
          replace: true
        });

      } else if (role === "BANK_MANAGER") {

        navigate("/manager/dashboard", {
          replace: true
        });

      }

    }

  }, [navigate]);


  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {

      const data = await loginUser({
        username,
        password
      });

      console.log("Login Response:", data);


      // Save login details
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);


      setMessage("Login successful!");


      // =========================
      // ROLE BASED NAVIGATION
      // =========================

      if (data.role === "ADMIN") {

        navigate("/admin/dashboard", {
          replace: true
        });

      } else if (data.role === "ACCOUNT_OPENING_STAFF") {

        navigate("/staff/dashboard", {
          replace: true
        });

      } else if (data.role === "DOCUMENT_VERIFICATION_STAFF") {

        navigate("/verification/dashboard", {
          replace: true
        });

      } else if (data.role === "BANK_MANAGER") {

        navigate("/manager/dashboard", {
          replace: true
        });

      } else if (data.role === "CUSTOMER") {

        navigate("/customer/dashboard", {
          replace: true
        });

      }

    } catch (error) {

      console.error("Login Error:", error);

      setError(
        error.message || "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="login-page">

      {/* =========================
          ANIMATED BACKGROUND
      ========================= */}

      <div className="login-background">

        <div className="floating-circle circle-one"></div>
        <div className="floating-circle circle-two"></div>
        <div className="floating-circle circle-three"></div>

        <span className="money-particle particle-one">
          ₹
        </span>

        <span className="money-particle particle-two">
          ₹
        </span>

        <span className="money-particle particle-three">
          ₹
        </span>

        <span className="money-particle particle-four">
          ₹
        </span>

      </div>


      {/* =========================
          MAIN CONTAINER
      ========================= */}

      <div className="login-container">


        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="login-showcase">

          <div className="showcase-content">

            <div className="brand-logo">
              B
            </div>

            <h1>
              Canada
              <span>Banking</span>
            </h1>

            <p>
              Secure. Simple. Smart Banking.
            </p>


            {/* =========================
                ANIMATED CARD
            ========================= */}

            <div className="bank-card-animation">

              <div className="card-top">

                <span className="card-brand">
                  BANK
                </span>

                <span className="card-chip">
                  ◈
                </span>

              </div>


              <div className="card-number">
                •••• &nbsp; •••• &nbsp; •••• &nbsp; 4821
              </div>


              <div className="card-bottom">

                <span>
                  SECURE ACCOUNT
                </span>

                <span>
                  VISA
                </span>

              </div>

            </div>


            {/* =========================
                SECURITY LINE
            ========================= */}

            <div className="security-line">

              <span className="pulse-dot"></span>

              <span>
                Your money. Your control. Your security.
              </span>

            </div>

          </div>

        </div>


        {/* =========================
            RIGHT SIDE LOGIN
        ========================= */}

        <div className="login-panel">

          <div className="login-box">

            <div className="login-heading">

              <span className="mobile-logo">
                B
              </span>

              <h2>
                Welcome Back
              </h2>

              <p>
                Sign in to continue to your account
              </p>

            </div>


            {/* =========================
                LOGIN FORM
            ========================= */}

            <form onSubmit={handleLogin}>


              {/* USERNAME */}

              <div className="input-group">

                <label>
                  Username
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    👤
                  </span>

                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="input-group">

                <label>
                  Password
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="button-loader"></span>
                    Signing in...
                  </>

                ) : (

                  <>
                    Login

                    <span className="login-arrow">
                      →
                    </span>
                  </>

                )}

              </button>

            </form>


            {/* =========================
                SUCCESS MESSAGE
            ========================= */}

            {message && (

              <div className="login-success">
                ✓ {message}
              </div>

            )}


            {/* =========================
                ERROR MESSAGE
            ========================= */}

            {error && (

              <div className="login-error">
                ✕ {error}
              </div>

            )}


            {/* =========================
                REGISTER
            ========================= */}

            <div className="register-text">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create Account
              </Link>

            </div>


            {/* =========================
                SECURITY FOOTER
            ========================= */}

            <div className="secure-footer">

              <span>
                🔐
              </span>

              <span>
                256-bit secure connection
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Login;