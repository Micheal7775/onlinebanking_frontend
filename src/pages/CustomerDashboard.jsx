import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyAccount } from "../services/customerAccountService";
import NotificationBell from "../components/NotificationBell";

import "./CustomerDashboard.css";

function CustomerDashboard() {

  const navigate = useNavigate();

  const [account, setAccount] = useState(() => {
    const saved =
      localStorage.getItem("customerAccount");

    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const username =
    localStorage.getItem("username") || "Customer";


  // =====================================================
  // LOAD ACCOUNT
  // =====================================================

const loadAccount = async (showMessage = false) => {
  try {
    setLoading(true);

    if (showMessage) {
      setMessage("");
    }

    setError("");

    const data = await getMyAccount();

    if (!data) {
      throw new Error("Account data not received");
    }

    setAccount(data);

    localStorage.setItem(
      "customerAccount",
      JSON.stringify(data)
    );

    if (showMessage) {
      setMessage("Balance updated successfully.");
    }

  } catch (err) {
    console.error("ACCOUNT API ERROR:", err);

    /*
     * If cached account exists,
     * keep showing existing account data.
     */
    if (!account) {
      setError(
        err.message ||
        "Unable to load account details."
      );
    }

  } finally {
    setLoading(false);
  }
};


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadAccount(false);

  }, []);


  // =====================================================
  // LOGOUT
  // =====================================================

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("customerAccount");

  // Full page navigation
  window.location.href = "/login";
};


  // =====================================================
  // BALANCE FORMAT
  // =====================================================

  const formatBalance = (balance) => {

    return Number(balance || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  };


  // =====================================================
  // MASK ACCOUNT
  // =====================================================

  const getMaskedAccount = () => {

    if (!account?.accountNumber) {
      return "•••• ••••";
    }

    return `•••• ${String(
      account.accountNumber
    ).slice(-4)}`;

  };


  return (

    <div className="customer-dashboard">


      {/* =================================================
          NAVBAR
      ================================================= */}
<header className="customer-navbar">



    {/* BRAND */}

    <div
      className="bank-brand"
      onClick={() =>
        navigate("/customer/dashboard")
      }
    >

      <div className="customer-header-left">

  <div className="customer-logo">
    🏦
  </div>

  <div>
    <h1>
      Canada Banking
    </h1>

    <p>
      Customer Portal
    </p>
  </div>

</div>


<div className="customer-header-right">

  <div className="customer-profile">

    <div className="customer-profile-icon">
      👤
    </div>

    <div>
      <span>
        Customer Account
      </span>
    </div>

  </div>

</div>

    {/* NAVIGATION */}

    <nav className="customer-nav">

      <button
        className="nav-link"
        onClick={() =>
          navigate("/customer/dashboard")
        }
      >
        Dashboard
      </button>


      {/* ACCOUNTS */}

      <div className="nav-dropdown">

        <button className="nav-link dropdown-trigger">
          Accounts
          <span>⌄</span>
        </button>

        <div className="dropdown-menu">

          <button
            onClick={() =>
              navigate("/customer/balance")
            }
          >
            💰 Balance
          </button>

          <button
            onClick={() =>
              navigate("/customer/transactions")
            }
          >
            📄 Transactions
          </button>

        </div>

      </div>


      {/* PAYMENTS */}

      <div className="nav-dropdown">

        <button className="nav-link dropdown-trigger">
          Payments
          <span>⌄</span>
        </button>

        <div className="dropdown-menu">

          <button
            onClick={() =>
              navigate("/customer/deposit")
            }
          >
            💵 Deposit
          </button>

          <button
            onClick={() =>
              navigate("/customer/withdraw")
            }
          >
            💸 Withdraw
          </button>

          <button
            onClick={() =>
              navigate("/customer/transfer")
            }
          >
            ↗ Transfer
          </button>

        </div>

      </div>


      {/* CARDS */}

      <button
        className="nav-link"
        onClick={() =>
          navigate("/customer/card")
        }
      >
        Cards
      </button>


      {/* SERVICES */}

      <div className="nav-dropdown">

        <button className="nav-link dropdown-trigger">
          Services
          <span>⌄</span>
        </button>

        <div className="dropdown-menu">

          <button
            onClick={() =>
              navigate("/customer/card")
            }
          >
            💳 My Debit Card
          </button>

          <button
            onClick={() =>
              navigate("/customer/transactions")
            }
          >
            📑 Statements
          </button>

        </div>

      </div>

    </nav>


    {/* RIGHT SIDE */}

    <div className="navbar-actions">

      <NotificationBell />


      <div className="nav-divider"></div>


      {/* PROFILE */}

      <div className="profile-dropdown">

        <button className="customer-profile">

     

         

          <div className="profile-details">

            <strong>
              {username}
            </strong>

            <span>
          
            </span>

          </div>

          <span className="profile-arrow">
            ⌄
          </span>

        </button>


        <div className="profile-menu">

          <button
            onClick={() =>
              navigate("/customer/dashboard")
            }
          >
            👤 My Profile
          </button>


          <button
            onClick={() =>
              navigate("/customer/card")
            }
          >
            💳 My Card
          </button>

          <div className="profile-menu-divider"></div>

          <button
            className="profile-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </div>

      </div>


      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>

  </div>

</header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="customer-main">


        {/* =================================================
            WELCOME
        ================================================= */}

      




        {/* =================================================
            ACCOUNT CARD
        ================================================= */}

        <section className="account-card">


          <div className="account-card-background"></div>


          {/* TOP */}

          <div className="account-card-header">

            <div>

              <span className="balance-label">
                AVAILABLE BALANCE
              </span>

              <div className="balance-amount">

                <span>₹</span>

                {formatBalance(
                  account?.balance
                )}

              </div>

              <p>
                Current available balance
              </p>

            </div>


            <div className="balance-icon">
              ₹
            </div>

          </div>


          {/* BOTTOM INFO */}

          <div className="account-card-footer">


            <div className="account-info">

              <span>
                ACCOUNT NUMBER
              </span>

              <strong>
                {getMaskedAccount()}
              </strong>

            </div>


            <div className="account-info">

              <span>
                ACCOUNT TYPE
              </span>

              <strong>
                {account?.accountType || "—"}
              </strong>

            </div>


            <div className="account-info">

              <span>
                CURRENCY
              </span>

              <strong>
                {account?.currency || "INR"}
              </strong>

            </div>


            <button
              className="refresh-btn"
              onClick={() =>
                loadAccount(true)
              }
              disabled={loading}
            >

              {loading
                ? "Refreshing..."
                : "↻ Refresh"}

            </button>


          </div>

        </section>



        {/* =================================================
            MESSAGES
        ================================================= */}

        {message && (

          <div className="dashboard-message success">

            <span>✓</span>

            {message}

          </div>

        )}


        {error && (

          <div className="dashboard-message error">

            <span>!</span>

            {error}

          </div>

        )}



        {/* =================================================
            SERVICES
        ================================================= */}

        <section className="services-section">


          <div className="section-header">

            <div>

          

              <h2>
                Banking Services
              </h2>

            </div>

            <p>
              Everything you need in one place
            </p>

          </div>



          <div className="services-grid">


            {/* DEPOSIT */}

            <button
              className="service-card"
              onClick={() =>
                navigate("/customer/deposit")
              }
            >

              <div className="service-top">

                <div className="service-icon deposit">
                  ↓
                </div>

                <span className="service-arrow">
                  →
                </span>

              </div>

              <h3>
                Deposit Money
              </h3>

              <p>
                Add money to your account
              </p>

            </button>



            {/* WITHDRAW */}

            <button
              className="service-card"
              onClick={() =>
                navigate("/customer/withdraw")
              }
            >

              <div className="service-top">

                <div className="service-icon withdraw">
                  ↑
                </div>

                <span className="service-arrow">
                  →
                </span>

              </div>

              <h3>
                Withdraw Money
              </h3>

              <p>
                Withdraw money from your account
              </p>

            </button>



            {/* TRANSFER */}

            <button
              className="service-card"
              onClick={() =>
                navigate("/customer/transfer")
              }
            >

              <div className="service-top">

                <div className="service-icon transfer">
                  ⇄
                </div>

                <span className="service-arrow">
                  →
                </span>

              </div>

              <h3>
                Transfer Money
              </h3>

              <p>
                Send money securely to another account
              </p>

            </button>



            {/* TRANSACTIONS */}

            <button
              className="service-card"
              onClick={() =>
                navigate("/customer/transactions")
              }
            >

              <div className="service-top">

                <div className="service-icon transactions">
                  ≡
                </div>

                <span className="service-arrow">
                  →
                </span>

              </div>

              <h3>
                Transactions
              </h3>

              <p>
                View your complete transaction history
              </p>

            </button>



            {/* BALANCE */}

            <button
              className="service-card"
              onClick={() =>
                loadAccount(true)
              }
            >

              <div className="service-top">

                <div className="service-icon balance">
                  ₹
                </div>

                <span className="service-arrow">
                  →
                </span>

              </div>

              <h3>
                Check Balance
              </h3>

              <p>
                Check your latest account balance
              </p>

            </button>



            {/* CARD */}

            <button
              className="service-card"
              onClick={() =>
                navigate("/customer/card")
              }
            >

              <div className="service-top">

                <div className="service-icon card">
                  💳
                </div>

                <span className="service-arrow">
                  →
                </span>

              </div>

              <h3>
                My Debit Card
              </h3>

              <p>
                View and manage your debit card
              </p>

            </button>


          </div>

        </section>



        {/* =================================================
            SECURITY
        ================================================= */}

        <section className="security-banner">

          <div className="security-icon">
            🔒
          </div>

          <div className="security-text">

            <strong>
              Your banking security matters
            </strong>

            <p>
              Never share your password, OTP
              or card PIN with anyone.
            </p>

          </div>

          <span className="secure-badge">
            SECURE
          </span>

        </section>


      </main>

    </div>

  );
}

export default CustomerDashboard;