import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSubmittedApplications,
  verifyApplication
} from "../services/verificationService";
import "./VerificationDashboard.css";

function VerificationDashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadApplications = async () => {
    try {
      setError("");

      const data = await getSubmittedApplications();
      setApplications(data);
    } catch (error) {
      console.error("Application Error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleVerify = async (applicationId, verified) => {
    setError("");
    setMessage("");

    try {
      await verifyApplication(applicationId, verified);

      setMessage(
        verified
          ? "Application verified successfully!"
          : "Application rejected!"
      );

      await loadApplications();
    } catch (error) {
      console.error("Verification Error:", error);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("customerAccount");

    window.location.replace("/login");
  };

  return (
    <div className="verification-dashboard">

      {/* Background */}
      <div className="verification-bg-circle verification-circle-one"></div>
      <div className="verification-bg-circle verification-circle-two"></div>

      {/* Header */}
      <header className="verification-header">

        <div className="verification-brand">

          <div className="verification-logo">
            B
          </div>

          <div>
            <h2>Online Banking</h2>
            <span>Verification Portal</span>
          </div>

        </div>

        <div className="verification-header-right">

          <div className="verification-profile">

            <div className="verification-avatar">
              V
            </div>

            <div>
              <strong>Document Verification Staff</strong>
              <span>Verification Access</span>
            </div>

          </div>

          <button
            className="verification-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </header>


      {/* Main */}
      <main className="verification-main">

        {/* Welcome */}
        <section className="verification-welcome">

          <div>
            <span className="verification-label">
              DOCUMENT VERIFICATION
            </span>

            <h1>
              Verification Dashboard
            </h1>

            <p>
              Review submitted customer applications
              and verify documents before manager approval.
            </p>
          </div>

          <div className="verification-security-badge">
            <span></span>
            Secure Access
          </div>

        </section>


        {/* Stats */}
        <section className="verification-stats">

          <div className="verification-stat-card">

            <div className="verification-stat-icon">
              📋
            </div>

            <div>
              <span>Pending Applications</span>
              <strong>{applications.length}</strong>
            </div>

          </div>


          <div className="verification-stat-card">

            <div className="verification-stat-icon">
              🔎
            </div>

            <div>
              <span>Verification</span>
              <strong>Active</strong>
            </div>

          </div>


          <div className="verification-stat-card">

            <div className="verification-stat-icon">
              🔐
            </div>

            <div>
              <span>Access Level</span>
              <strong>Staff</strong>
            </div>

          </div>

        </section>


        {/* Messages */}
        {message && (
          <div className="verification-success">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="verification-error">
            ⚠ {error}
          </div>
        )}


        {/* Applications */}
        <section className="verification-section">

          <div className="verification-section-heading">

            <div>
              <span>CUSTOMER APPLICATIONS</span>

              <h2>
                Submitted Applications
              </h2>
            </div>

            <p>
              Review and verify customer applications
            </p>

          </div>


          {applications.length === 0 ? (

            <div className="verification-empty">

              <div className="verification-empty-icon">
                📂
              </div>

              <h3>
                No Submitted Applications
              </h3>

              <p>
                There are currently no applications
                waiting for document verification.
              </p>

            </div>

          ) : (

            <div className="verification-grid">

              {applications.map((application) => (

                <div
                  className="verification-card"
                  key={application.applicationId}
                >

                  {/* Card Header */}
                  <div className="verification-card-header">

                    <div className="verification-application-id">
                      <span>APPLICATION</span>

                      <strong>
                        #{application.applicationId}
                      </strong>
                    </div>

                    <span className="submitted-badge">
                      ● SUBMITTED
                    </span>

                  </div>


                  <div className="verification-divider"></div>


                  {/* Details */}
                  <div className="verification-details">

                    <div className="verification-detail">
                      <span>Customer</span>

                      <strong>
                        {application.customer?.fullName || "N/A"}
                      </strong>
                    </div>


                    <div className="verification-detail">
                      <span>Account Type</span>

                      <strong>
                        {application.accountType || "N/A"}
                      </strong>
                    </div>


                    <div className="verification-detail">
                      <span>Status</span>

                      <strong className="submitted-text">
                        {application.applicationStatus || "SUBMITTED"}
                      </strong>
                    </div>

                  </div>


                  {/* Actions */}
                  <div className="verification-actions">

                    <button
                      className="verify-button"
                      onClick={() =>
                        handleVerify(
                          application.applicationId,
                          true
                        )
                      }
                    >
                      ✓ Verify
                    </button>

                    <button
                      className="reject-verification-button"
                      onClick={() =>
                        handleVerify(
                          application.applicationId,
                          false
                        )
                      }
                    >
                      ✕ Reject
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* Footer */}
        <footer className="verification-footer">

          <span>🔒</span>

          <span>
            Secure Document Verification
          </span>

          <span className="verification-footer-dot">
            •
          </span>

          <span>
            Authorized Access Only
          </span>

        </footer>

      </main>

    </div>
  );
}

export default VerificationDashboard;