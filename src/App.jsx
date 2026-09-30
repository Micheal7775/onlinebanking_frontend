import { Routes, Route, Navigate } from "react-router-dom";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Login from "./pages/Login";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// =====================================================
// ADMIN PAGES
// =====================================================

import AdminDashboard from "./pages/AdminDashboard";
import CreateBranch from "./pages/CreateBranch";
import CreateStaff from "./pages/CreateStaff";
import AdminEmployees from "./pages/AdminEmployees";
import AdminCustomers from "./pages/AdminCustomers";
import AdminBranches from "./pages/AdminBranches";

// =====================================================
// ACCOUNT OPENING STAFF
// =====================================================

import StaffDashboard from "./pages/StaffDashboard";
import CreateCustomer from "./pages/CreateCustomer";
import StaffCustomers from "./pages/StaffCustomers";
import DepositMoney from "./pages/DepositMoney";

// =====================================================
// DOCUMENT VERIFICATION
// =====================================================

import VerificationDashboard from "./pages/VerificationDashboard";

// =====================================================
// BANK MANAGER
// =====================================================

import ManagerDashboard from "./pages/ManagerDashboard";
import CreateCard from "./pages/CreateCard";

// =====================================================
// CUSTOMER
// =====================================================

import CustomerDashboard from "./pages/CustomerDashboard";
import DepositPage from "./pages/DepositPage";
import WithdrawPage from "./pages/WithdrawPage";
import TransferPage from "./pages/TransferPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import BalancePage from "./pages/BalancePage";
import CardPage from "./pages/CardPage";

// =====================================================
// ROUTE PROTECTION
// =====================================================

import ProtectedRoute from "./routes/ProtectedRoute";

// =====================================================
// UNAUTHORIZED PAGE
// =====================================================

function Unauthorized() {
  const handleGoBack = () => {
    const role = localStorage.getItem("role");

    switch (role) {
      case "ADMIN":
        window.location.replace("/admin/dashboard");
        break;

      case "ACCOUNT_OPENING_STAFF":
        window.location.replace("/staff/dashboard");
        break;

      case "DOCUMENT_VERIFICATION_STAFF":
        window.location.replace("/verification/dashboard");
        break;

      case "BANK_MANAGER":
        window.location.replace("/manager/dashboard");
        break;

      case "CUSTOMER":
        window.location.replace("/customer/dashboard");
        break;

      default:
        window.location.replace("/login");
        break;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          padding: "40px 30px",
          borderRadius: "18px",
          textAlign: "center",
          boxShadow:
            "0 15px 40px rgba(20,32,55,0.08)",
        }}
      >
        <h1
          style={{
            margin: "0",
            fontSize: "54px",
            color: "#172033",
          }}
        >
          403
        </h1>

        <h2
          style={{
            margin: "10px 0",
            color: "#263148",
          }}
        >
          Access Denied
        </h2>

        <p
          style={{
            color: "#7c8798",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          You are not authorized to access this page.
        </p>

        <button
          onClick={handleGoBack}
          style={{
            marginTop: "15px",
            border: "none",
            background: "#172033",
            color: "#ffffff",
            padding: "12px 22px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <Routes>

      {/* =================================================
          PUBLIC ROUTES
      ================================================= */}

      <Route
        path="/login"
        element={<Login />}
      />

    <Route
    path="/forgot-password"
    element={<ForgotPassword />}
  />

  <Route
    path="/reset-password"
    element={<ResetPassword />}
  />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />


      {/* =================================================
          ADMIN ROUTES
      ================================================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN"]}
          />
        }
      >
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/create-branch"
          element={<CreateBranch />}
        />

        <Route
          path="/admin/branches"
          element={<AdminBranches />}
        />

        <Route
          path="/admin/create-staff"
          element={<CreateStaff />}
        />

        <Route
          path="/admin/employees"
          element={<AdminEmployees />}
        />

        <Route
          path="/admin/customers"
          element={<AdminCustomers />}
        />
      </Route>


      {/* =================================================
          ACCOUNT OPENING STAFF
      ================================================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              "ACCOUNT_OPENING_STAFF",
            ]}
          />
        }
      >
        <Route
          path="/staff/dashboard"
          element={<StaffDashboard />}
        />

        <Route
          path="/staff/create-customer"
          element={<CreateCustomer />}
        />

        <Route
          path="/staff/customers"
          element={<StaffCustomers />}
        />

        <Route
          path="/staff/deposit"
          element={<DepositMoney />}
        />
      </Route>


      {/* =================================================
          DOCUMENT VERIFICATION STAFF
      ================================================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              "DOCUMENT_VERIFICATION_STAFF",
            ]}
          />
        }
      >
        <Route
          path="/verification/dashboard"
          element={
            <VerificationDashboard />
          }
        />
      </Route>


      {/* =================================================
          BANK MANAGER
      ================================================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              "BANK_MANAGER",
            ]}
          />
        }
      >
        <Route
          path="/manager/dashboard"
          element={<ManagerDashboard />}
        />

        <Route
          path="/manager/create-card"
          element={<CreateCard />}
        />
      </Route>


      {/* =================================================
          CUSTOMER
      ================================================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              "CUSTOMER",
            ]}
          />
        }
      >
        <Route
          path="/customer/dashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/customer/deposit"
          element={<DepositPage />}
        />

        <Route
          path="/customer/withdraw"
          element={<WithdrawPage />}
        />

        <Route
          path="/customer/transfer"
          element={<TransferPage />}
        />

        <Route
          path="/customer/transactions"
          element={
            <TransactionHistoryPage />
          }
        />

        <Route
          path="/customer/balance"
          element={<BalancePage />}
        />

        <Route
          path="/customer/card"
          element={<CardPage />}
        />
      </Route>


      {/* =================================================
          APPLICATION ENTRY
      ================================================= */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />


      {/* =================================================
          UNKNOWN URL
      ================================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;