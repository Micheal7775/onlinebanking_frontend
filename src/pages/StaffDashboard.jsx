import { useNavigate } from "react-router-dom";

import "./StaffDashboard.css";

function StaffDashboard() {

  const navigate = useNavigate();

  // =====================================================
  // STAFF NAME
  // =====================================================



  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("customerAccount");
    

    navigate("/login");
  };


  return (

    <div className="staff-dashboard">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="staff-header">

        <div className="staff-header-left">

          <div className="staff-logo">
            🏦
          </div>

          <div>

            <h1>
              Canada Banking
            </h1>

            <p>
              Staff Portal
            </p>

          </div>

        </div>


        <div className="staff-header-right">

          <div className="staff-profile">

            <div className="staff-profile-icon">
              👤
            </div>

            <div>

            

              <span>
                Account Opening Staff
              </span>

            </div>

          </div>


          <button
            className="staff-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="staff-main">


        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="staff-welcome">

          <div>

            <span className="staff-welcome-label">
              STAFF PORTAL
            </span>

            <h2>
              Welcome back
            </h2>

            <p>
              Manage customer onboarding and banking
              operations from one place.
            </p>

          </div>


          <div className="staff-welcome-icon">
            🏦
          </div>

        </section>


        {/* =================================================
            STATISTICS
        ================================================= */}

      


        {/* =================================================
            OPERATIONS
        ================================================= */}

        <section className="staff-operations-section">

          <div className="staff-section-title">

            <div>

              <span>
              mange your customers
              </span>

              <h2>
                Banking Operations
              </h2>

              <p>
                Select an operation to continue.
              </p>

            </div>

          </div>


          <div className="staff-operations">


            {/* =================================================
                CREATE CUSTOMER
            ================================================= */}

            <button
              className="staff-operation-card"
              onClick={() =>
                navigate("/staff/create-customer")
              }
            >

              <div className="staff-operation-icon">
                👤
              </div>


              <div className="staff-operation-content">

                <h3>
                  Create Customer
                </h3>

                <p>
                  Register a new customer and create
                  their banking profile.
                </p>

                <span>
                  Create Customer →
                </span>

              </div>

            </button>


            {/* =================================================
                MANAGE CUSTOMERS
            ================================================= */}

            <button
              className="staff-operation-card"
              onClick={() =>
                navigate("/staff/customers")
              }
            >

              <div className="staff-operation-icon customer-icon">
                👥
              </div>


              <div className="staff-operation-content">

                <h3>
                  Manage Customers
                </h3>

                <p>
                  View customer details, edit information
                  and manage registered customers.
                </p>

                <span>
                  View Customers →
                </span>

              </div>

            </button>


            {/* =================================================
                DEPOSIT MONEY
            ================================================= */}



          </div>

        </section>


        {/* =================================================
            QUICK INFORMATION
        ================================================= */}

        

          

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="staff-footer">

        <p>
          Canada Banking System
        </p>

        <span>
          Staff Portal • Secure Banking Operations
        </span>

      </footer>


    </div>

  );
}


export default StaffDashboard;