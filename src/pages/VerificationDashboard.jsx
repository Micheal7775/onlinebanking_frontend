import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllApplications,
  verifyApplication,
} from "../services/verificationService";

import "./VerificationDashboard.css";

function VerificationDashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // HAMBURGER MENU
  const [menuOpen, setMenuOpen] = useState(false);

  // =====================================================
  // LOAD ALL APPLICATIONS
  // =====================================================

  const loadApplications = async () => {
    try {
      setError("");
      setLoading(true);

      const data = await getAllApplications();

      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Application Error:", error);
      setError(error.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD ON PAGE OPEN
  // =====================================================

  useEffect(() => {
    loadApplications();
  }, []);

  // =====================================================
  // VERIFY / REJECT
  // =====================================================

  const handleVerify = async (applicationId, verified) => {
    setError("");
    setMessage("");
    setProcessingId(applicationId);

    try {
      await verifyApplication(applicationId, verified);

      setMessage(
        verified
          ? "Application verified successfully!"
          : "Application rejected successfully!"
      );

      await loadApplications();
    } catch (error) {
      console.error("Verification Error:", error);
      setError(error.message || "Failed to process application.");
    } finally {
      setProcessingId(null);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("customerAccount");

    setMenuOpen(false);

    window.location.replace("/login");
  };

  // =====================================================
  // FORMAT VALUE
  // =====================================================

  const displayValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "Not provided";
    }

    return value;
  };

  return (
    <div className="verification-dashboard">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="verification-bg-circle verification-circle-one"></div>
      <div className="verification-bg-circle verification-circle-two"></div>

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="verification-header">

        {/* BRAND */}

        <div className="verification-brand">

          <div className="verification-logo">
            CB
          </div>

          <div>
            <h2>Canda Banking</h2>
            <span>Verification Portal</span>
          </div>

        </div>

        {/* MOBILE HAMBURGER */}

        <button
          className="verification-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* HEADER RIGHT */}

        <div
          className={`verification-header-right ${
            menuOpen ? "verification-menu-open" : ""
          }`}
        >

          {/* PROFILE */}

          <div className="verification-profile">

            <div className="verification-avatar">
              V
            </div>

            <div>
              <strong>
                Document Verification Staff
              </strong>

              <span>
                Verification Access
              </span>
            </div>

          </div>

          {/* LOGOUT */}

          <button
            className="verification-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="verification-main">

        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="verification-welcome">

          <div>

            <span className="verification-label">
              DOCUMENT VERIFICATION
            </span>

            <h1>
              Verification Dashboard
            </h1>

            <p>
              Review customer applications and verify
              documents before manager approval.
            </p>

          </div>

          <div className="verification-security-badge">
            <span></span>
            Verification Secure Access
          </div>

        </section>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="verification-stats">

          <div className="verification-stat-card">

            <div className="verification-stat-icon">
              📋
            </div>

            <div>
              <span>
                Total Applications
              </span>

              <strong>
                {applications.length}
              </strong>
            </div>

          </div>

        </section>

        {/* =================================================
            MESSAGES
        ================================================= */}

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

        {/* =================================================
            APPLICATIONS
        ================================================= */}

        <section className="verification-section">

          <div className="verification-section-heading">

            <div>

              <span>
                CUSTOMER APPLICATIONS
              </span>

              <h2>
                All Applications
              </h2>

            </div>

            <button
              type="button"
              onClick={loadApplications}
              className="verification-refresh-btn"
              disabled={loading}
            >
              ↻ Refresh
            </button>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="verification-empty">

              <div className="verification-empty-icon">
                ⏳
              </div>

              <h3>
                Loading Applications
              </h3>

              <p>
                Please wait while applications are loaded.
              </p>

            </div>

          ) : applications.length === 0 ? (

            /* =================================================
               EMPTY
            ================================================= */

            <div className="verification-empty">

              <div className="verification-empty-icon">
                📂
              </div>

              <h3>
                No Applications Found
              </h3>

              <p>
                There are currently no customer applications.
              </p>

            </div>

          ) : (

            /* =================================================
               APPLICATION GRID
            ================================================= */

            <div className="verification-grid">

              {applications.map((application) => {

                const applicationId =
                  application.applicationId;

                const isProcessing =
                  processingId === applicationId;

                return (

                  <div
                    className="verification-card"
                    key={applicationId}
                  >

                    {/* =================================================
                        CARD HEADER
                    ================================================= */}

                    <div className="verification-card-header">

                      <div>
                        <span>
                          APPLICATION ID
                        </span>

                        <h3>
                          #{applicationId}
                        </h3>
                      </div>

                      <div className="verification-status-badge">
                        {displayValue(
                          application.applicationStatus
                        )}
                      </div>

                    </div>

                    {/* =================================================
                        CUSTOMER DETAILS
                    ================================================= */}

                    <div className="verification-details">

                      <div className="verification-detail-row">

                        <span>
                          Customer Name
                        </span>

                        <strong>
                          {displayValue(
                            application.customerName
                          )}
                        </strong>

                      </div>

                      <div className="verification-detail-row">

                        <span>
                          Username
                        </span>

                        <strong>
                          {displayValue(
                            application.username
                          )}
                        </strong>

                      </div>

                      <div className="verification-detail-row">

                        <span>
                          Email
                        </span>

                        <strong>
                          {displayValue(
                            application.email
                          )}
                        </strong>

                      </div>

                      <div className="verification-detail-row">

                        <span>
                          Phone
                        </span>

                        <strong>
                          {displayValue(
                            application.phone
                          )}
                        </strong>

                      </div>

                      <div className="verification-detail-row">

                        <span>
                          Account Number
                        </span>

                        <strong>
                          {displayValue(
                            application.accountNumber
                          )}
                        </strong>

                      </div>

                      <div className="verification-detail-row">

                        <span>
                          PAN
                        </span>

                        <strong>
                          {displayValue(
                            application.pan
                          )}
                        </strong>

                      </div>

                      <div className="verification-detail-row">

                        <span>
                          Aadhaar
                        </span>

                        <strong>
                          {displayValue(
                            application.aadhaar
                          )}
                        </strong>

                      </div>

                      <div className="verification-detail-row">

                        <span>
                          Application Status
                        </span>

                        <strong>
                          {displayValue(
                            application.applicationStatus
                          )}
                        </strong>

                      </div>

                    </div>

                    {/* =================================================
                        VERIFIED / OTHER STATUS
                    ================================================= */}

                    {application.applicationStatus !==
                      "SUBMITTED" && (

                      <div className="verification-status-message">

                        Application is{" "}

                        <strong>
                          {application.applicationStatus}
                        </strong>

                      </div>

                    )}

                    {/* =================================================
                        ACTION BUTTONS
                    ================================================= */}

                    {application.applicationStatus ===
                      "SUBMITTED" && (

                      <div className="verification-actions">

                        <button
                          type="button"
                          className="verification-reject-btn"
                          disabled={isProcessing}
                          onClick={() =>
                            handleVerify(
                              applicationId,
                              false
                            )
                          }
                        >
                          {isProcessing
                            ? "Processing..."
                            : "✕ Reject"}
                        </button>

                        <button
                          type="button"
                          className="verification-approve-btn"
                          disabled={isProcessing}
                          onClick={() =>
                            handleVerify(
                              applicationId,
                              true
                            )
                          }
                        >
                          {isProcessing
                            ? "Processing..."
                            : "✓ Verify"}
                        </button>

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          )}

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

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