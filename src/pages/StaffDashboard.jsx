import { useNavigate } from "react-router-dom";
import "./StaffDashboard.css";

function StaffDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("customerAccount");

    window.location.replace("/login");
  };

  return (
    <div className="staff-dashboard">

      {/* Background */}
      <div className="staff-dashboard-circle circle-one"></div>
      <div className="staff-dashboard-circle circle-two"></div>

      {/* Header */}
      <header className="staff-dashboard-header">

        <div className="staff-brand">

          <div className="staff-brand-logo">
            B
          </div>

          <div>
            <h2>Online Banking</h2>
            <span>Staff Portal</span>
          </div>

        </div>

        <div className="staff-header-right">

          <div className="staff-profile">

            <div className="staff-avatar">
              S
            </div>

            <div>
              <strong>Account Opening Staff</strong>
              <span>Staff Access</span>
            </div>

          </div>

          <button
            className="staff-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </header>


      {/* Main */}
      <main className="staff-dashboard-main">

        {/* Welcome */}
        <section className="staff-welcome">

          <div>
            <span className="staff-dashboard-label">
              STAFF OPERATIONS
            </span>

            <h1>Staff Dashboard</h1>

            <p>
              Manage customer registration and banking operations
              from your secure workspace.
            </p>
          </div>

          <div className="staff-secure-badge">
            <span></span>
            Secure Access
          </div>

        </section>


        {/* Stats */}
        <section className="staff-stats">

          <div className="staff-stat-card">

            <div className="staff-stat-icon">
              👤
            </div>

            <div>
              <span>Customer Management</span>
              <strong>Active</strong>
            </div>

          </div>


          <div className="staff-stat-card">

            <div className="staff-stat-icon">
              💰
            </div>

            <div>
              <span>Deposit Operations</span>
              <strong>Available</strong>
            </div>

          </div>


          <div className="staff-stat-card">

            <div className="staff-stat-icon">
              🔐
            </div>

            <div>
              <span>Security</span>
              <strong>Protected</strong>
            </div>

          </div>

        </section>


        {/* Operations */}
        <section className="staff-operations">

          <div className="staff-section-heading">

            <div>
              <span>STAFF SERVICES</span>

              <h2>Available Operations</h2>
            </div>

            <p>
              Select an operation to continue
            </p>

          </div>


          <div className="staff-operation-grid">

            {/* Create Customer */}
            <button
              className="staff-operation-card"
              onClick={() =>
                navigate("/staff/create-customer")
              }
            >

              <div className="staff-operation-icon customer-icon">
                👤
              </div>

              <div className="staff-operation-content">

                <h3>Create Customer</h3>

                <p>
                  Register a new customer and capture
                  their personal and KYC information.
                </p>

                <span>
                  Open Module →
                </span>

              </div>

            </button>


            {/* Deposit */}
            <button
              className="staff-operation-card"
              onClick={() =>
                navigate("/staff/deposit")
              }
            >

              <div className="staff-operation-icon deposit-icon">
                💰
              </div>

              <div className="staff-operation-content">

                <h3>Deposit Money</h3>

                <p>
                  Process customer deposits and record
                  banking transactions securely.
                </p>

                <span>
                  Open Module →
                </span>

              </div>

            </button>

          </div>

        </section>


        {/* Footer */}
        <footer className="staff-dashboard-footer">

          <span>🔒</span>

          <span>
            Secure Banking Staff Portal
          </span>

          <span className="staff-footer-dot">
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

export default StaffDashboard;