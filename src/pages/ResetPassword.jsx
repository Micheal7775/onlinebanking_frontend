import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";
import "../login.css";

function ResetPassword() {

  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  // =====================================================
  // LOAD USERNAME
  // =====================================================

  useEffect(() => {

    const storedUsername =
      sessionStorage.getItem("resetUsername");

    if (!storedUsername) {
      navigate("/forgot-password", {
        replace: true,
      });

      return;
    }

    setUsername(storedUsername);

  }, [navigate]);


  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setMessage("");


    if (!otp.trim()) {
      setError("OTP is required.");
      return;
    }


    if (!newPassword) {
      setError("New password is required.");
      return;
    }


    if (newPassword.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }


    if (newPassword !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }


    setLoading(true);


    try {

      const data = await resetPassword(
        username,
        otp.trim(),
        newPassword
      );


      console.log(
        "Reset Password Response:",
        data
      );


      setMessage(
        data.message ||
        "Password reset successfully."
      );


      sessionStorage.removeItem(
        "resetUsername"
      );


      setTimeout(() => {

        navigate("/login", {
          replace: true,
        });

      }, 1500);


    } catch (error) {

      console.error(
        "Reset Password Error:",
        error
      );

      setError(
        error.message ||
        "Unable to reset password."
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
                RESET PASSWORD
              </span>

              <h2>
                Create New Password
              </h2>

              <p>
                Enter the OTP and create your
                new password.
              </p>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="login-form"
            >


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
                    value={username}
                    readOnly
                  />

                </div>

              </div>


              {/* OTP */}

              <div className="input-group">

                <label htmlFor="otp">
                  OTP
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    🔢
                  </span>

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => {
                      const value =
                        e.target.value
                          .replace(/\D/g, "");

                      setOtp(value);
                      setError("");
                    }}
                    required
                  />

                </div>

              </div>


              {/* NEW PASSWORD */}

              <div className="input-group">

                <label>
                  New Password
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(
                        e.target.value
                      );
                      setError("");
                    }}
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
                  >
                    {showPassword
                      ? "🙈"
                      : "👁"}
                  </button>

                </div>

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="input-group">

                <label>
                  Confirm Password
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(
                        e.target.value
                      );
                      setError("");
                    }}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "🙈"
                      : "👁"}
                  </button>

                </div>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="button-loader"></span>

                    <span>
                      Resetting...
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Reset Password
                    </span>

                    <span className="login-arrow">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>


            {/* SUCCESS */}

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


            {/* BACK LOGIN */}

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
                  Secure password reset
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

export default ResetPassword;