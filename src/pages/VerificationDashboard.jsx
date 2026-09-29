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

  // HAMBURGER MENU STATE
  const [menuOpen, setMenuOpen] = useState(false);


  // =====================================================
  // LOAD ALL APPLICATIONS
  // =====================================================

  const loadApplications = async () => {

    try {

      setError("");
      setLoading(true);

      const data = await getAllApplications();

      setApplications(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      console.error(
        "Application Error:",
        error
      );

      setError(error.message);

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

  const handleVerify = async (
    applicationId,
    verified
  ) => {

    setError("");
    setMessage("");

    try {

      await verifyApplication(
        applicationId,
        verified
      );

      setMessage(
        verified
          ? "Application verified successfully!"
          : "Application rejected!"
      );

      await loadApplications();

    } catch (error) {

      console.error(
        "Verification Error:",
        error
      );

      setError(error.message);
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

            <h2>
              Canda Banking
            </h2>

            <span>
              Verification Portal
            </span>

          </div>

        </div>


        {/* =================================================
            MOBILE HAMBURGER
        ================================================= */}

        <button
          className="verification-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >

          <span></span>
          <span></span>
          <span></span>

        </button>


        {/* =================================================
            HEADER RIGHT
        ================================================= */}

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

            <span>
              ↪
            </span>

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

            verification Secure Access

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

            <p>
              Review and verify customer applications
            </p>

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

              {applications.map((application) => (

                <div
                  className="verification-card"
                  key={application.applicationId}
                >


                  {/* =================================================
                      CARD HEADER
                  ================================================= */}

                  <div className="verification-card-header">

                    <div className="verification-application-id">

                      <span>
                        APPLICATION
                      </span>

                      <strong>
                        #{application.applicationId}
                      </strong>

                    </div>


                    <span
                      className={
                        application.applicationStatus === "SUBMITTED"
                          ? "submitted-badge"
                          : "submitted-badge"
                      }
                    >

                      ●{" "}
                      {application.applicationStatus ||
                        "UNKNOWN"}

                    </span>

                  </div>


                  <div className="verification-divider"></div>


                  {/* =================================================
                      DETAILS
                  ================================================= */}

                  <div className="verification-details">


                    <div className="verification-detail">

                      <span>
                        Customer
                      </span>

                      <strong>
                        {application.customer?.fullName ||
                          "N/A"}
                      </strong>

                    </div>


                    <div className="verification-detail">

                      <span>
                        Account Type
                      </span>

                      <strong>
                        {application.accountType ||
                          "N/A"}
                      </strong>

                    </div>


                    <div className="verification-detail">

                      <span>
                        Branch
                      </span>

                      <strong>
                        {application.branch?.branchName ||
                          application.branch?.name ||
                          "N/A"}
                      </strong>

                    </div>


                    <div className="verification-detail">

                      <span>
                        Status
                      </span>

                      <strong className="submitted-text">

                        {application.applicationStatus ||
                          "N/A"}

                      </strong>

                    </div>


                    <div className="verification-detail">

                      <span>
                        Created Date
                      </span>

                      <strong>

                        {application.createdAt
                          ? new Date(
                              application.createdAt
                            ).toLocaleDateString()
                          : "N/A"}

                      </strong>

                    </div>


                    <div className="verification-detail">

                      <span>
                        Application ID
                      </span>

                      <strong>
                        #{application.applicationId}
                      </strong>

                    </div>

                  </div>


                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  {application.applicationStatus ===
                    "SUBMITTED" && (

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

                  )}


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

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="verification-footer">

          <span>
            🔒
          </span>

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