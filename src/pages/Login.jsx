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
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // =====================================================
  // CHECK EXISTING LOGIN
  // =====================================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const role = localStorage.getItem("role");

    if (role === "CUSTOMER") {
      navigate("/customer/dashboard", {
        replace: true,
      });
    } else if (role === "ADMIN") {
      navigate("/admin/dashboard", {
        replace: true,
      });
    } else if (role === "ACCOUNT_OPENING_STAFF") {
      navigate("/staff/dashboard", {
        replace: true,
      });
    } else if (role === "DOCUMENT_VERIFICATION_STAFF") {
      navigate("/verification/dashboard", {
        replace: true,
      });
    } else if (role === "BANK_MANAGER") {
      navigate("/manager/dashboard", {
        replace: true,
      });
    }
  }, [navigate]);

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        username: username.trim(),
        password,
      });

      console.log("Login Response:", data);

      // =================================================
      // VALIDATE RESPONSE
      // =================================================

      if (!data || !data.token || !data.role) {
        throw new Error(
          "Invalid login response from server."
        );
      }

      // =================================================
      // SAVE LOGIN DETAILS
      // =================================================

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "username",
        data.username || username.trim()
      );

      localStorage.setItem(
        "role",
        data.role
      );

      setMessage("Login successful!");

      // =================================================
      // ROLE BASED NAVIGATION
      // =================================================

      switch (data.role) {
        case "ADMIN":
          navigate("/admin/dashboard", {
            replace: true,
          });
          break;

        case "ACCOUNT_OPENING_STAFF":
          navigate("/staff/dashboard", {
            replace: true,
          });
          break;

        case "DOCUMENT_VERIFICATION_STAFF":
          navigate("/verification/dashboard", {
            replace: true,
          });
          break;

        case "BANK_MANAGER":
          navigate("/manager/dashboard", {
            replace: true,
          });
          break;

        case "CUSTOMER":
          navigate("/customer/dashboard", {
            replace: true,
          });
          break;

        default:
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("role");

          throw new Error(
            "Invalid user role."
          );
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

  // =====================================================
  // DEMO FEATURES
  // =====================================================

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError("");
    setMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
    setMessage("");
  };

  return (
    <div className="login-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="login-background">

        <div className="background-glow glow-one"></div>

        <div className="background-glow glow-two"></div>

        <div className="background-grid"></div>

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


      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="login-container">


        {/* =================================================
            LEFT SHOWCASE
        ================================================= */}

        <div className="login-showcase">

          <div className="showcase-overlay"></div>

          <div className="showcase-content">

            {/* BRAND */}

            <div className="brand-area">

              <div className="brand-logo">
                B
              </div>

              <div className="brand-name">
                <strong>
                  Canada Banking
                </strong>

                <span>
                  DIGITAL BANKING
                </span>
              </div>

            </div>


            {/* HERO TEXT */}

            <div className="showcase-heading">

              <span className="welcome-label">
                WELCOME TO
              </span>

              <h1>
                Secure banking.
                <br />

                <span>
                  Made simple.
                </span>
              </h1>

              <p>
                Manage your money, payments and
                accounts securely from one place.
              </p>

            </div>


            {/* =================================================
                BANK CARD
            ================================================= */}

            <div className="bank-card-animation">

              <div className="card-shine"></div>

              <div className="card-top">

                <span className="card-brand">
                  CANADA BANKING
                </span>

                <span className="card-chip">
                  ◈
                </span>

              </div>

              <div className="card-number">
                •••• &nbsp; •••• &nbsp; •••• &nbsp; 4821
              </div>

              <div className="card-bottom">

                <div>
                  <small>
                    CARD HOLDER
                  </small>

                  <span>
                    SECURE CUSTOMER
                  </span>
                </div>

                <strong>
                  VISA
                </strong>

              </div>

            </div>


            {/* =================================================
                SECURITY LINE
            ================================================= */}

            <div className="security-line">

              <span className="pulse-dot"></span>

              <span>
                Your money. Your control. Your security.
              </span>

            </div>


            {/* =================================================
                FEATURE ITEMS
            ================================================= */}

            <div className="showcase-features">

              <div className="feature-item">

                <span className="feature-icon">
                  ✓
                </span>

                <div>
                  <strong>
                    Secure Access
                  </strong>

                  <span>
                    Protected banking environment
                  </span>
                </div>

              </div>


              <div className="feature-item">

                <span className="feature-icon">
                  ↗
                </span>

                <div>
                  <strong>
                    Easy Payments
                  </strong>

                  <span>
                    Manage your transactions easily
                  </span>
                </div>

              </div>


              <div className="feature-item">

                <span className="feature-icon">
                  ◉
                </span>

                <div>
                  <strong>
                    Always Connected
                  </strong>

                  <span>
                    Access your account anytime
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            RIGHT LOGIN PANEL
        ================================================= */}

        <div className="login-panel">

          <div className="login-box">


            {/* =================================================
                MOBILE BRAND
            ================================================= */}

            <div className="mobile-brand">

              <div className="mobile-brand-logo">
                B
              </div>

              <div>

                <strong>
                  Canada Banking
                </strong>

                <span>
                  DIGITAL BANKING
                </span>

              </div>

            </div>


            {/* =================================================
                LOGIN HEADING
            ================================================= */}

            <div className="login-heading">

              <span className="login-badge">
                SECURE LOGIN
              </span>

            

              <p>
                Sign in to continue to your account
              </p>

            </div>


            {/* =================================================
                LOGIN FORM
            ================================================= */}

            <form
              onSubmit={handleLogin}
              className="login-form"
            >


              {/* USERNAME */}

              <div className="input-group">

                <label htmlFor="username">
                  Username
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    👤
                  </span>

                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={
                      handleUsernameChange
                    }
                    autoComplete="username"
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="input-group">

                <div className="password-label-row">

                  <label htmlFor="password">
                    Password
                  </label>

                  <span className="secure-label">
                    Secure
                  </span>

                </div>

                <div className="input-wrapper">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={
                      handlePasswordChange
                    }
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword
                      ? "🙈"
                      : "👁"}
                  </button>

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

                    <span>
                      Signing in...
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Sign In
                    </span>

                    <span className="login-arrow">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {message && (

              <div className="login-success">
                <span>✓</span>

                <span>
                  {message}
                </span>
              </div>

            )}


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

              <div className="login-error">

                <span>
                  !
                </span>

                <span>
                  {error}
                </span>

              </div>

            )}


            {/* =================================================
                REGISTER
            ================================================= */}

            <div className="register-text">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create Account
              </Link>

            </div>


            {/* =================================================
                SECURITY FOOTER
            ================================================= */}

            <div className="secure-footer">

              <div className="secure-footer-icon">
                🔐
              </div>

              <div>

                <strong>
                  Secure connection
                </strong>

                <span>
                  256-bit encrypted banking
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          MOBILE BOTTOM SECURITY
      ================================================= */}

      <div className="mobile-security">

        <span>
          🔐
        </span>

        <span>
          Secure & encrypted banking
        </span>

      </div>

    </div>
  );
}

export default Login;