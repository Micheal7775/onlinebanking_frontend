import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getVerifiedApplications,
  approveApplication,
  createAccount,
} from "../services/managerService";

import { issueDebitCard } from "../services/cardService";

import "./ManagerDashboard.css";

function ManagerDashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Card creation
  const [accountNumber, setAccountNumber] = useState("");
  const [cardLoading, setCardLoading] = useState(false);
  const [createdCard, setCreatedCard] = useState(null);

  const loadApplications = async () => {
    try {
      const data = await getVerifiedApplications();
      setApplications(data);
    } catch (error) {
      console.error("Application Error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // =========================================
  // APPROVE APPLICATION + CREATE ACCOUNT
  // =========================================

  const handleApprove = async (applicationId) => {
    setMessage("");
    setError("");

    try {
      await approveApplication(applicationId, true);

      const account = await createAccount(applicationId);

      setMessage(
        `Application approved. Account created successfully. Account Number: ${account.accountNumber}`
      );

      loadApplications();
    } catch (error) {
      console.error("Approval Error:", error);
      setError(error.message);
    }
  };

  // =========================================
  // REJECT APPLICATION
  // =========================================

  const handleReject = async (applicationId) => {
    setMessage("");
    setError("");

    try {
      await approveApplication(applicationId, false);

      setMessage("Application rejected successfully!");

      loadApplications();
    } catch (error) {
      console.error("Reject Error:", error);
      setError(error.message);
    }
  };

  // =========================================
  // CREATE DEBIT CARD
  // =========================================

  const handleCreateCard = async () => {
    setMessage("");
    setError("");
    setCreatedCard(null);

    if (!accountNumber.trim()) {
      setError("Please enter account number");
      return;
    }

    try {
      setCardLoading(true);

      const card = await issueDebitCard(
        accountNumber.trim()
      );

      setCreatedCard(card);

      setMessage(
        "Debit card created successfully!"
      );

      setAccountNumber("");

    } catch (error) {
      console.error("Card Creation Error:", error);
      setError(error.message);
    } finally {
      setCardLoading(false);
    }
  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("customerAccount");

    window.location.replace("/login");
  };

  return (
    <div className="manager-dashboard">

      {/* Background decoration */}
      <div className="manager-bg-circle manager-circle-one"></div>
      <div className="manager-bg-circle manager-circle-two"></div>

      {/* Header */}
      <header className="manager-header">

        <div className="manager-brand">

          <div className="manager-logo">
            B
          </div>

          <div>
            <h2>Online Banking</h2>
            <span>Manager Portal</span>
          </div>

        </div>

        <div className="manager-header-right">

          <div className="manager-profile">

            <div className="manager-avatar">
              M
            </div>

            <div>
              <strong>Bank Manager</strong>
              <span>Management Access</span>
            </div>

          </div>

          <button
            className="manager-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </header>


      {/* Main */}
      <main className="manager-main">

        {/* Welcome */}
        <section className="manager-welcome">

          <div>

            <span className="manager-label">
              BANK MANAGEMENT
            </span>

            <h1>Manager Dashboard</h1>

            <p>
              Review verified applications and manage
              account approvals.
            </p>

          </div>

          <div className="manager-security-badge">

            <span className="manager-status-dot"></span>

            Secure Access

          </div>

        </section>


        {/* Stats */}
        <section className="manager-stats">

          <div className="manager-stat-card">

            <div className="manager-stat-icon">
              📋
            </div>

            <div>

              <span>
                Verified Applications
              </span>

              <strong>
                {applications.length}
              </strong>

            </div>

          </div>


          <div className="manager-stat-card">

            <div className="manager-stat-icon">
              🏦
            </div>

            <div>

              <span>
                Account Operations
              </span>

              <strong>
                Active
              </strong>

            </div>

          </div>


          <div className="manager-stat-card">

            <div className="manager-stat-icon">
              🔐
            </div>

            <div>

              <span>
                Access Level
              </span>

              <strong>
                Manager
              </strong>

            </div>

          </div>

        </section>


        {/* Messages */}
        {message && (
          <div className="manager-success">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="manager-error">
            ⚠ {error}
          </div>
        )}


        {/* =========================================
            DEBIT CARD SECTION
        ========================================= */}

        <section className="applications-section">

          <div className="applications-heading">

            <div>

              <span>
                CARD MANAGEMENT
              </span>

              <h2>
                Issue Debit Card
              </h2>

            </div>

            <p>
              Create a debit card for an active account
            </p>

          </div>


          <div
            className="application-card"
            style={{
              maxWidth: "600px",
              marginBottom: "35px",
            }}
          >

            <div className="application-card-header">

              <div className="application-id">

                <span>
                  DEBIT CARD
                </span>

                <strong>
                  Create New Card
                </strong>

              </div>

              <span className="verified-badge">
                BANK MANAGER
              </span>

            </div>


            <div className="application-divider"></div>


            <div
              style={{
                padding: "20px 0",
              }}
            >

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                Customer Account Number
              </label>

              <input
                type="text"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(e.target.value)
                }
                placeholder="Enter account number"
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                  fontSize: "15px",
                }}
              />

            </div>


            <div className="application-actions">

              <button
                className="approve-button"
                onClick={handleCreateCard}
                disabled={cardLoading}
              >

                {cardLoading
                  ? "Creating Card..."
                  : "💳 Create Debit Card"}

              </button>

            </div>


            {/* Created Card Details */}

            {createdCard && (

              <div
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#f5f7fa",
                }}
              >

                <h3>
                  ✓ Card Created Successfully
                </h3>

                <p>
                  <strong>Card Number:</strong>{" "}
                  {createdCard.cardNumber}
                </p>

                <p>
                  <strong>Card Type:</strong>{" "}
                  {createdCard.cardType}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {createdCard.status}
                </p>

                <p>
                  <strong>Expiry Date:</strong>{" "}
                  {createdCard.expiryDate}
                </p>

              </div>

            )}

          </div>

        </section>


        {/* =========================================
            VERIFIED APPLICATIONS
        ========================================= */}

        <section className="applications-section">

          <div className="applications-heading">

            <div>

              <span>
                ACCOUNT MANAGEMENT
              </span>

              <h2>
                Verified Applications
              </h2>

            </div>

            <p>
              Review and process customer applications
            </p>

          </div>


          {applications.length === 0 ? (

            <div className="empty-applications">

              <div className="empty-icon">
                📂
              </div>

              <h3>
                No Verified Applications
              </h3>

              <p>
                There are currently no applications
                waiting for manager approval.
              </p>

            </div>

          ) : (

            <div className="application-grid">

              {applications.map((application) => (

                <div
                  className="application-card"
                  key={application.applicationId}
                >

                  <div className="application-card-header">

                    <div className="application-id">

                      <span>
                        APPLICATION
                      </span>

                      <strong>
                        #{application.applicationId}
                      </strong>

                    </div>

                    <span className="verified-badge">
                      ✓ VERIFIED
                    </span>

                  </div>


                  <div className="application-divider"></div>


                  <div className="application-details">

                    <div className="application-detail">

                      <span>
                        Customer
                      </span>

                      <strong>
                        {application.customer?.fullName ||
                          "N/A"}
                      </strong>

                    </div>


                    <div className="application-detail">

                      <span>
                        Account Type
                      </span>

                      <strong>
                        {application.accountType}
                      </strong>

                    </div>


                    <div className="application-detail">

                      <span>
                        Status
                      </span>

                      <strong className="status-text">
                        {application.applicationStatus}
                      </strong>

                    </div>

                  </div>


                  <div className="application-actions">

                    <button
                      className="approve-button"
                      onClick={() =>
                        handleApprove(
                          application.applicationId
                        )
                      }
                    >
                      ✓ Approve & Create Account
                    </button>

                    <button
                      className="reject-button"
                      onClick={() =>
                        handleReject(
                          application.applicationId
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
        <footer className="manager-footer">

          <span>🔒</span>

          <span>
            Secure Banking Management
          </span>

          <span className="footer-divider">
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

export default ManagerDashboard;