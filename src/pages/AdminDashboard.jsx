import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

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


      {/* =========================
          HEADER
      ========================= */}

      <header className="admin-header">

        <div className="admin-brand">

          <div className="admin-logo">
            CB
          </div>

          <div className="admin-brand-text">

            <h2>
              Canada Bank
            </h2>

            <span>
              Secure Banking Administration
            </span>

          </div>

        </div>


        <div className="admin-header-right">

          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div className="admin-profile-text">

              <strong>
                Admin
              </strong>

            </div>

          </div>


          {/* Logout */}

          <button
            className="admin-logout"
            onClick={handleLogout}
          >

            <span>
              ↪
            </span>

            <span className="logout-text">
              Logout
            </span>

          </button>

        </div>

      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main className="admin-main">


        {/* =========================
            WELCOME
        ========================= */}

        <section className="welcome-section">

          <div className="welcome-content">

            <span className="dashboard-label">
              ADMIN CONTROL CENTER
            </span>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage branches, employees, customers, and daily banking operations from one place.
            </p>

          </div>


          <div className="security-badge">

            <span className="status-dot"></span>

            System Secure

          </div>

        </section>


        {/* =========================
            ADMIN OPERATIONS
        ========================= */}

        <section className="operations-section">

          <div className="section-heading">

            <div>

              <h2>
                Admin Operations
              </h2>

            </div>

            <p>
              Choose an option to manage your banking operations.
            </p>

          </div>


          <div className="operation-grid">


            {/* =========================
                CREATE BRANCH
            ========================= */}

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
                  Add and configure a new banking branch.
                </p>

                <span className="operation-link">
                  Create Branch →
                </span>

              </div>

            </Link>


            {/* =========================
                MANAGE BRANCHES
            ========================= */}

            <Link
              to="/admin/branches"
              className="operation-card"
            >

              <div className="operation-icon branch-icon">
                🏢
              </div>


              <div className="operation-content">

                <h3>
                  Manage Branches
                </h3>

                <p>
                  View and manage existing banking branches.
                </p>

                <span className="operation-link">
                  Manage Branches →
                </span>

              </div>

            </Link>


            {/* =========================
                CREATE STAFF
            ========================= */}

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
                  Create staff accounts and assign appropriate roles.
                </p>

                <span className="operation-link">
                  Create Staff →
                </span>

              </div>

            </Link>


            {/* =========================
                MANAGE EMPLOYEES
            ========================= */}

            <Link
              to="/admin/employees"
              className="operation-card"
            >

              <div className="operation-icon employee-icon">
                👥
              </div>


              <div className="operation-content">

                <h3>
                  Manage Employees
                </h3>

                <p>
                  View and manage employee information and roles.
                </p>

                <span className="operation-link">
                  Manage Employees →
                </span>

              </div>

            </Link>


            {/* =========================
                MANAGE CUSTOMERS
            ========================= */}

            <Link
              to="/admin/customers"
              className="operation-card"
            >

              <div className="operation-icon customer-icon">
                👤
              </div>


              <div className="operation-content">

                <h3>
                  Manage Customers
                </h3>

                <p>
                  View and manage registered customer information.
                </p>

                <span className="operation-link">
                  Manage Customers →
                </span>

              </div>

            </Link>


          </div>

        </section>


        {/* =========================
            FOOTER
        ========================= */}

        <footer className="admin-footer">

          <span>
            🔒
          </span>

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