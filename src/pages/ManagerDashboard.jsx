import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getVerifiedApplications,
  getAllAccounts,
  approveApplication,
  createAccount,
} from "../services/managerService";

import { issueDebitCard } from "../services/cardService";

import "./ManagerDashboard.css";

function ManagerDashboard() {
  const navigate = useNavigate();

  // =========================================
  // APPLICATIONS
  // =========================================

  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // ACCOUNTS
  // =========================================

  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);

  // =========================================
  // ACCOUNT SEARCH
  // =========================================

  const [searchAccountNumber, setSearchAccountNumber] =
    useState("");

  const [searchedAccount, setSearchedAccount] =
    useState(null);

  const [searchLoading, setSearchLoading] =
    useState(false);

  // =========================================
  // CARD CREATION
  // =========================================

  const [accountNumber, setAccountNumber] =
    useState("");

  const [cardLoading, setCardLoading] =
    useState(false);

  const [createdCard, setCreatedCard] =
    useState(null);

  // =========================================
  // LOAD APPLICATIONS
  // =========================================

  const loadApplications = async () => {
    try {
      const data = await getVerifiedApplications();

      setApplications(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Application Error:",
        error
      );

      setError(error.message);
    }
  };

  // =========================================
  // LOAD ALL CUSTOMER ACCOUNTS
  // =========================================

  const loadAccounts = async () => {
    try {
      setAccountsLoading(true);

      const data = await getAllAccounts();

      setAccounts(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Account Loading Error:",
        error
      );

      setError(error.message);
    } finally {
      setAccountsLoading(false);
    }
  };

  // =========================================
  // LOAD OVERALL DATA
  // =========================================

  const loadOverallData = async () => {
    setError("");

    await Promise.all([
      loadApplications(),
      loadAccounts(),
    ]);
  };

  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {
    loadOverallData();
  }, []);

  // =========================================
  // SEARCH CUSTOMER BY ACCOUNT NUMBER
  // =========================================

  const handleSearchAccount = async () => {
    setMessage("");
    setError("");
    setSearchedAccount(null);

    const searchValue =
      searchAccountNumber.trim();

    if (!searchValue) {
      setError(
        "Please enter account number"
      );

      return;
    }

    try {
      setSearchLoading(true);

      const foundAccount = accounts.find(
        (account) =>
          String(
            account.accountNumber || ""
          )
            .trim()
            .toLowerCase() ===
          searchValue.toLowerCase()
      );

      if (!foundAccount) {
        setError(
          "Account not found"
        );

        return;
      }

      setSearchedAccount(
        foundAccount
      );

      setMessage(
        "Customer account found successfully."
      );
    } catch (error) {
      console.error(
        "Account Search Error:",
        error
      );

      setError(error.message);
    } finally {
      setSearchLoading(false);
    }
  };

  // =========================================
  // CLEAR SEARCH
  // =========================================

  const handleClearSearch = () => {
    setSearchAccountNumber("");
    setSearchedAccount(null);
    setMessage("");
    setError("");
  };

  // =========================================
  // APPROVE APPLICATION + CREATE ACCOUNT
  // =========================================

  const handleApprove = async (
    applicationId
  ) => {
    setMessage("");
    setError("");

    try {
      await approveApplication(
        applicationId,
        true
      );

      const account =
        await createAccount(
          applicationId
        );

      setMessage(
        `Application approved. Account created successfully. Account Number: ${
          account.accountNumber
        }`
      );

      await loadOverallData();
    } catch (error) {
      console.error(
        "Approval Error:",
        error
      );

      setError(error.message);
    }
  };

  // =========================================
  // REJECT APPLICATION
  // =========================================

  const handleReject = async (
    applicationId
  ) => {
    setMessage("");
    setError("");

    try {
      await approveApplication(
        applicationId,
        false
      );

      setMessage(
        "Application rejected successfully!"
      );

      await loadApplications();
    } catch (error) {
      console.error(
        "Reject Error:",
        error
      );

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
      setError(
        "Please enter account number"
      );

      return;
    }

    try {
      setCardLoading(true);

      const card =
        await issueDebitCard(
          accountNumber.trim()
        );

      setCreatedCard(card);

      setMessage(
        "Debit card created successfully!"
      );

      setAccountNumber("");
    } catch (error) {
      console.error(
        "Card Creation Error:",
        error
      );

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
    localStorage.removeItem(
      "customerAccount"
    );

    window.location.replace("/login");
  };

  return (
    <div className="manager-dashboard">

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="manager-bg-circle manager-circle-one"></div>

      <div className="manager-bg-circle manager-circle-two"></div>

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="manager-header">

        <div className="manager-brand">

          <div className="manager-logo">
            CB
          </div>

          <div>
            <h2>
            Canda Banking
            </h2>
          </div>

        </div>

        <div className="manager-header-right">

          <div className="manager-profile">

            <div className="manager-avatar">
              M
            </div>

            <div>
              <strong>
                Bank Manager
              </strong>

             
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

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="manager-main">

        {/* =========================================
            WELCOME
        ========================================= */}

        <section className="manager-welcome">

          <div>

          

            <h1>
              Manager Dashboard
            </h1>

            <p>
              Review applications and manage
              customer accounts.
            </p>

          </div>

          <div className="manager-security-badge">

            <span className="manager-status-dot"></span>

            Secure Access

          </div>

        </section>

        {/* =========================================
            STATS
        ========================================= */}

        <section className="manager-stats">

          <div className="manager-stat-card">

            <div className="manager-stat-icon">
              📋
            </div>

            <div>

              <span>
                Applications
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
                Customer Accounts
              </span>

              <strong>
                {accounts.length}
              </strong>

            </div>

          </div>

        </section>

        {/* =========================================
            SUCCESS MESSAGE
        ========================================= */}

        {message && (
          <div className="manager-success">
            ✓ {message}
          </div>
        )}

        {/* =========================================
            ERROR MESSAGE
        ========================================= */}

        {error && (
          <div className="manager-error">
            ⚠ {error}
          </div>
        )}

        {/* =========================================
            SEARCH CUSTOMER
        ========================================= */}

        <section className="applications-section">

          <div className="applications-heading">

            <div>

             


            </div>

            <p>
              Search customer using account number
            </p>

          </div>

          <div
            className="application-card"
            style={{
              maxWidth: "700px",
              marginBottom: "35px",
            }}
          >

            <div className="application-card-header">

              <div className="application-id">
                <strong>
                  Find Customer
                </strong>

              </div>

              <span className="verified-badge">
                MANAGER
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
                Account Number
              </label>

              <input
                type="text"
                value={searchAccountNumber}
                onChange={(e) =>
                  setSearchAccountNumber(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchAccount();
                  }
                }}
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

            <div
              className="application-actions"
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              <button
                type="button"
                className="approve-button"
                onClick={
                  handleSearchAccount
                }
                disabled={searchLoading}
              >
                {searchLoading
                  ? "Searching..."
                  : "🔍 Search"}
              </button>

              {searchedAccount && (
                <button
                  type="button"
                  className="reject-button"
                  onClick={
                    handleClearSearch
                  }
                >
                  Clear
                </button>
              )}

            </div>

            {/* =====================================
                SEARCH RESULT
            ===================================== */}

            {searchedAccount && (

              <div
                style={{
                  marginTop: "25px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#f5f7fa",
                }}
              >

                <h3
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  ✓ Customer Found
                </h3>

                <div className="application-details">

                  {/* CUSTOMER NAME */}

                  <div className="application-detail">

                    <span>
                      Customer Name
                    </span>

                    <strong>
                      {
                        searchedAccount
                          .customer
                          ?.fullName ||
                        searchedAccount
                          .customerName ||
                        "N/A"
                      }
                    </strong>

                  </div>

                  {/* USERNAME */}

                  <div className="application-detail">

                    <span>
                      Username
                    </span>

                    <strong>
                      {
                        searchedAccount
                          .customer
                          ?.username ||
                        searchedAccount
                          .username ||
                        searchedAccount
                          .customer
                          ?.user
                          ?.username ||
                        "N/A"
                      }
                    </strong>

                  </div>

                  {/* ACCOUNT NUMBER */}

                  <div className="application-detail">

                    <span>
                      Account Number
                    </span>

                    <strong>
                      {
                        searchedAccount
                          .accountNumber ||
                        "N/A"
                      }
                    </strong>

                  </div>

                  {/* ACCOUNT TYPE */}

                  <div className="application-detail">

                    <span>
                      Account Type
                    </span>

                    <strong>
                      {
                        searchedAccount
                          .accountType ||
                        "N/A"
                      }
                    </strong>

                  </div>

                  {/* BALANCE */}

                  <div className="application-detail">

                    <span>
                      Balance
                    </span>

                    <strong>
                      ₹{" "}
                      {
                        searchedAccount
                          .balance ??
                        "0.00"
                      }
                    </strong>

                  </div>

                  {/* STATUS */}

                  <div className="application-detail">

                    <span>
                      Status
                    </span>

                    <strong className="status-text">
                      {
                        searchedAccount
                          .status ||
                        "ACTIVE"
                      }
                    </strong>

                  </div>

                </div>

              </div>

            )}

          </div>

        </section>

        {/* =========================================
            DEBIT CARD
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
                  setAccountNumber(
                    e.target.value
                  )
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
                onClick={
                  handleCreateCard
                }
                disabled={cardLoading}
              >
                {cardLoading
                  ? "Creating Card..."
                  : "💳 Create Debit Card"}
              </button>

            </div>

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
                  <strong>
                    Card Number:
                  </strong>{" "}
                  {createdCard.cardNumber}
                </p>

                <p>
                  <strong>
                    Card Type:
                  </strong>{" "}
                  {createdCard.cardType}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {createdCard.status}
                </p>

                <p>
                  <strong>
                    Expiry Date:
                  </strong>{" "}
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

              {applications.map(
                (application) => {

                  const status =
                    String(
                      application.applicationStatus ||
                      ""
                    )
                      .trim()
                      .toUpperCase();

                  return (

                    <div
                      className="application-card"
                      key={
                        application.applicationId
                      }
                    >

                      <div className="application-card-header">

                        <div className="application-id">

                          <span>
                            APPLICATION
                          </span>

                          <strong>
                            #
                            {
                              application.applicationId
                            }
                          </strong>

                        </div>

                        <span className="verified-badge">
                          {application.applicationStatus ||
                            "APPLICATION"}
                        </span>

                      </div>

                      <div className="application-divider"></div>

                      <div className="application-details">

                        <div className="application-detail">

                          <span>
                            Customer
                          </span>

                          <strong>
                            {
                              application.customer
                                ?.fullName ||
                              "N/A"
                            }
                          </strong>

                        </div>

                        <div className="application-detail">

                          <span>
                            Account Type
                          </span>

                          <strong>
                            {
                              application.accountType ||
                              "N/A"
                            }
                          </strong>

                        </div>

                        <div className="application-detail">

                          <span>
                            Status
                          </span>

                          <strong className="status-text">
                            {
                              application.applicationStatus ||
                              "N/A"
                            }
                          </strong>

                        </div>

                      </div>

                      {/* PENDING */}

                      {status === "PENDING" && (

                        <div className="application-actions">

                          <button
                            className="approve-button"
                            onClick={() =>
                              handleApprove(
                                application.applicationId
                              )
                            }
                          >
                            ✓ Approve
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

                      )}

                      {/* APPROVED */}

                      {status === "APPROVED" && (

                        <div className="application-actions">

                          <strong className="status-text">
                            ✓ Application Approved
                          </strong>

                        </div>

                      )}

                      {/* REJECTED */}

                      {status === "REJECTED" && (

                        <div className="application-actions">

                          <strong className="status-text">
                            ✕ Application Rejected
                          </strong>

                        </div>

                      )}

                    </div>

                  );
                }
              )}

            </div>

          )}

        </section>

        {/* =========================================
            ALL CUSTOMER ACCOUNTS
        ========================================= */}

        <section className="applications-section">

          <div className="applications-heading">

            <div>

              <span>
                ACCOUNT MANAGEMENT
              </span>

              <h2>
                All Customer Accounts
              </h2>

            </div>

            <p>
              View all customer accounts with username
            </p>

          </div>

          {accountsLoading ? (

            <div className="empty-applications">

              <div className="empty-icon">
                ⏳
              </div>

              <h3>
                Loading Accounts
              </h3>

              <p>
                Please wait while accounts are loaded.
              </p>

            </div>

          ) : accounts.length === 0 ? (

            <div className="empty-applications">

              <div className="empty-icon">
                🏦
              </div>

              <h3>
                No Accounts Found
              </h3>

              <p>
                There are currently no customer accounts.
              </p>

            </div>

          ) : (

            <div className="application-grid">

              {accounts.map(
                (account) => (

                  <div
                    className="application-card"
                    key={
                      account.accountId ||
                      account.id ||
                      account.accountNumber
                    }
                  >

                    {/* ACCOUNT HEADER */}

                    <div className="application-card-header">

                      <div className="application-id">

                        <span>
                          ACCOUNT
                        </span>

                        <strong>
                          #
                          {
                            account.accountNumber ||
                            "N/A"
                          }
                        </strong>

                      </div>

                      <span className="verified-badge">
                        {account.status ||
                          "ACTIVE"}
                      </span>

                    </div>

                    <div className="application-divider"></div>

                    {/* ACCOUNT DETAILS */}

                    <div className="application-details">

                      {/* CUSTOMER NAME */}

                      <div className="application-detail">

                        <span>
                          Customer Name
                        </span>

                        <strong>
                          {
                            account.customer
                              ?.fullName ||
                            account.customerName ||
                            "N/A"
                          }
                        </strong>

                      </div>

                      {/* USERNAME */}

                      <div className="application-detail">

                        <span>
                          Username
                        </span>

                        <strong>
                          {
                            account.customer
                              ?.username ||
                            account.username ||
                            account.customer
                              ?.user
                              ?.username ||
                            "N/A"
                          }
                        </strong>

                      </div>

                      {/* ACCOUNT NUMBER */}

                      <div className="application-detail">

                        <span>
                          Account Number
                        </span>

                        <strong>
                          {
                            account.accountNumber ||
                            "N/A"
                          }
                        </strong>

                      </div>

                      {/* ACCOUNT TYPE */}

                      <div className="application-detail">

                        <span>
                          Account Type
                        </span>

                        <strong>
                          {
                            account.accountType ||
                            "N/A"
                          }
                        </strong>

                      </div>

                      {/* BALANCE */}

                      <div className="application-detail">

                        <span>
                          Balance
                        </span>

                        <strong>
                          ₹{" "}
                          {
                            account.balance ??
                            "0.00"
                          }
                        </strong>

                      </div>

                      {/* STATUS */}

                      <div className="application-detail">

                        <span>
                          Status
                        </span>

                        <strong className="status-text">
                          {
                            account.status ||
                            "ACTIVE"
                          }
                        </strong>

                      </div>

                      {/* ACCOUNT ID */}

                      <div className="application-detail">

                        <span>
                          Account ID
                        </span>

                        <strong>
                          {
                            account.accountId ||
                            account.id ||
                            "N/A"
                          }
                        </strong>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

        {/* =========================================
            FOOTER
        ========================================= */}

        <footer className="manager-footer">

          <span>
            🔒
          </span>

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