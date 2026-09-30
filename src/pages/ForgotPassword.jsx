import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import "../login.css";

function ForgotPassword() {

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {

      const cleanUsername = username.trim();

      if (!cleanUsername) {
        throw new Error("Username is required.");
      }

      const data = await forgotPassword(cleanUsername);

      console.log("Forgot Password Response:", data);

      setMessage(
        data.message ||
        "OTP has been sent successfully."
      );

      // Store username for reset page
      sessionStorage.setItem(
        "resetUsername",
        cleanUsername
      );

      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);

    } catch (error) {

      console.error(
        "Forgot Password Error:",
        error
      );

      setError(
        error.message ||
        "Unable to process request."
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="login-page">

      <div className="login-background">

        <div className="background-glow glow-one"></div>
        <div className="background-glow glow-two"></div>
        <div className="background-grid"></div>

      </div>


      <div className="login-container">

        <div className="login-panel">

          <div className="login-box">


            {/* BRAND */}

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


            {/* HEADING */}

            <div className="login-heading">

              <span className="login-badge">
                PASSWORD RECOVERY
              </span>

              <h2>
                Forgot Password?
              </h2>

              <p>
                Enter your username to receive
                a password reset OTP.
              </p>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="login-form"
            >

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
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                      setMessage("");
                    }}
                    autoComplete="username"
                    required
                  />

                </div>

              </div>


              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="button-loader"></span>
                    <span>
                      Sending OTP...
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Send OTP
                    </span>

                    <span className="login-arrow">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>


            {/* MESSAGE */}

            {message && (
              <div className="login-success">

                <span>✓</span>

                <span>
                  {message}
                </span>

              </div>
            )}


            {/* ERROR */}

            {error && (
              <div className="login-error">

                <span>!</span>

                <span>
                  {error}
                </span>

              </div>
            )}


            {/* BACK */}

            <div className="register-text">

              <span>
                Remember your password?
              </span>

              <Link to="/login">
                Back to Login
              </Link>

            </div>


            {/* SECURITY */}

            <div className="secure-footer">

              <div className="secure-footer-icon">
                🔐
              </div>

              <div>

                <strong>
                  Secure password recovery
                </strong>

                <span>
                  OTP protected verification
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;