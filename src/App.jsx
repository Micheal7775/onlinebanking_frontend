import { Routes, Route, Navigate } from "react-router-dom";

// =========================
// PUBLIC PAGES
// =========================
import Login from "./pages/Login";
import Register from "./pages/Register";

// =========================
// ADMIN PAGES
// =========================
import AdminDashboard from "./pages/AdminDashboard";
import CreateBranch from "./pages/CreateBranch";
import CreateStaff from "./pages/CreateStaff";

// =========================
// ACCOUNT OPENING STAFF
// =========================
import StaffDashboard from "./pages/StaffDashboard";
import CreateCustomer from "./pages/CreateCustomer";
import DepositMoney from "./pages/DepositMoney";

// =========================
// DOCUMENT VERIFICATION
// =========================
import VerificationDashboard from "./pages/VerificationDashboard";

// =========================
// BANK MANAGER
// =========================
import ManagerDashboard from "./pages/ManagerDashboard";
import CreateCard from "./pages/CreateCard";
// =========================
// CUSTOMER
// =========================
import CustomerDashboard from "./pages/CustomerDashboard";
import DepositPage from "./pages/DepositPage";
import WithdrawPage from "./pages/WithdrawPage";
import TransferPage from "./pages/TransferPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import BalancePage from "./pages/BalancePage";
import CardPage from "./pages/CardPage";

// =========================
// ROUTE PROTECTION
// =========================
import ProtectedRoute from "./routes/ProtectedRoute";


// =====================================================
// UNAUTHORIZED PAGE
// =====================================================

function Unauthorized() {

  const handleGoBack = () => {

    const role = localStorage.getItem("role");

    if (role === "ADMIN") {

      window.location.replace(
        "/admin/dashboard"
      );

    } else if (
      role === "ACCOUNT_OPENING_STAFF"
    ) {

      window.location.replace(
        "/staff/dashboard"
      );

    } else if (
      role === "DOCUMENT_VERIFICATION_STAFF"
    ) {

      window.location.replace(
        "/verification/dashboard"
      );

    } else if (
      role === "BANK_MANAGER"
    ) {

      window.location.replace(
        "/manager/dashboard"
      );

    } else if (
      role === "CUSTOMER"
    ) {

      window.location.replace(
        "/customer/dashboard"
      );

    } else {

      window.location.replace("/login");

    }
  };


  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >

      <h1>403</h1>

      <h2>
        Access Denied
      </h2>

      <p>
        You are not authorized to access this page.
      </p>

      <button
        onClick={handleGoBack}
      >
        Go Back
      </button>

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
        path="/register"
        element={<Register />}
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
          path="/admin/create-staff"
          element={<CreateStaff />}
        />

      </Route>


      {/* =================================================
          ACCOUNT OPENING STAFF ROUTES
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
          path="/staff/deposit"
          element={<DepositMoney />}
        />

      </Route>


      {/* =================================================
          DOCUMENT VERIFICATION STAFF ROUTES
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
          element={<VerificationDashboard />}
        />

      </Route>


      {/* =================================================
          BANK MANAGER ROUTES
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

      </Route>
      <Route
  path="/manager/create-card"
  element={<CreateCard />}
/>


      {/* =================================================
          CUSTOMER ROUTES
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

        {/* -------------------------
            CUSTOMER DASHBOARD
        ------------------------- */}

        <Route
          path="/customer/dashboard"
          element={<CustomerDashboard />}
        />


        {/* -------------------------
            DEPOSIT
        ------------------------- */}

        <Route
          path="/customer/deposit"
          element={<DepositPage />}
        />


        {/* -------------------------
            WITHDRAW
        ------------------------- */}

        <Route
          path="/customer/withdraw"
          element={<WithdrawPage />}
        />


        {/* -------------------------
            TRANSFER
        ------------------------- */}

        <Route
          path="/customer/transfer"
          element={<TransferPage />}
        />


        {/* -------------------------
            TRANSACTION HISTORY
        ------------------------- */}

        <Route
          path="/customer/transactions"
          element={
            <TransactionHistoryPage />
          }
        />


        {/* -------------------------
            BALANCE
        ------------------------- */}

        <Route
          path="/customer/balance"
          element={<BalancePage />}
        />


        {/* -------------------------
            MY CARD
        ------------------------- */}

        <Route
          path="/customer/card"
          element={<CardPage />}
        />

      </Route>


      {/* =================================================
          DEFAULT ROUTE
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