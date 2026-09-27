import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("customerAccount");

    window.location.replace("/login");
  };

  return (
    <div className="admin-dashboard">

      {/* Background */}
      <div className="admin-bg-circle circle-1"></div>
      <div className="admin-bg-circle circle-2"></div>


      {/* Header */}
      <header className="admin-header">

        <div className="admin-brand">

          <div className="admin-logo">
            B
          </div>

          <div>
            <h2>Online Banking</h2>
            <span>Administration Portal</span>
          </div>

        </div>


        <div className="admin-header-right">

          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>System Admin</span>
            </div>

          </div>


          {/* Logout */}
          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </header>


      {/* Main */}
      <main className="admin-main">

        <div className="welcome-section">

          <div>

            <span className="dashboard-label">
              ADMIN CONTROL CENTER
            </span>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage branches, staff and banking operations
              from one secure workspace.
            </p>

          </div>


          <div className="security-badge">

            <span className="status-dot"></span>

            System Secure

          </div>

        </div>


        {/* Statistics */}
        <section className="admin-stats">

          <div className="stat-card">

            <div className="stat-icon">
              🏦
            </div>

            <div>
              <span>Branches</span>
              <strong>Manage</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>
              <span>Staff</span>
              <strong>Manage</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🔐
            </div>

            <div>
              <span>Security</span>
              <strong>Protected</strong>
            </div>

          </div>

        </section>


        {/* Operations */}
        <section className="operations-section">

          <div className="section-heading">

            <div>

              <span>ADMINISTRATION</span>

              <h2>
                Admin Operations
              </h2>

            </div>

            <p>
              Select an operation to continue
            </p>

          </div>


          <div className="operation-grid">

            {/* Create Branch */}
            <Link
              to="/admin/create-branch"
              className="operation-card"
            >

              <div className="operation-icon branch-icon">
                🏦
              </div>

              <div className="operation-content">

                <h3>
                  Create Branch
                </h3>

                <p>
                  Register and configure a new banking
                  branch.
                </p>

                <span className="operation-link">
                  Open Module →
                </span>

              </div>

            </Link>


            {/* Create Staff */}
            <Link
              to="/admin/create-staff"
              className="operation-card"
            >

              <div className="operation-icon staff-icon">
                👤
              </div>

              <div className="operation-content">

                <h3>
                  Create Staff
                </h3>

                <p>
                  Create staff accounts and assign
                  banking roles.
                </p>

                <span className="operation-link">
                  Open Module →
                </span>

              </div>

            </Link>

          </div>

        </section>


        {/* Footer */}
        <footer className="admin-footer">

          <span>🔒</span>

          <span>
            Secure Banking Administration
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

export default AdminDashboard;