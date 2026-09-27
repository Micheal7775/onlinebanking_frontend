import { useNavigate } from "react-router-dom";

function BalancePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Account Balance</h1>

      <p>View your current account balance.</p>

      <button onClick={() => navigate("/customer/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default BalancePage;