import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { depositMoney } from "../services/staffAccountService";
import "./DepositPage.css";

function DepositPage() {

  const navigate = useNavigate();

  const [accountNumber] = useState("ACC64CDF451BA7");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  // =========================
  // CONTINUE
  // =========================

  const handleContinue = (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid deposit amount");
      return;
    }

    setShowConfirm(true);
  };


  // =========================
  // CONFIRM DEPOSIT
  // =========================

  const handleConfirmDeposit = async () => {

    setLoading(true);
    setError("");

    try {

      const data = await depositMoney(
        accountNumber,
        amount,
        description
      );

      setReferenceNumber(data.referenceNumber);

      setMessage("Deposit Successful");

      setShowConfirm(false);

      setAmount("");
      setDescription("");

    } catch (error) {

      console.error("Deposit Error:", error);

      setError(
        error.message || "Deposit failed"
      );

      setShowConfirm(false);

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // SUCCESS SCREEN
  // =========================

  if (message) {

    return (

      <div className="deposit-page">

        <div className="deposit-success-card">

          <div className="success-check">
            ✓
          </div>

          <h1>
            Deposit Successful
          </h1>

          <p>
            Your money has been deposited successfully.
          </p>

          <div className="success-amount">
            ₹{Number(
              referenceNumber ? amount : 0
            ).toLocaleString("en-IN")}
          </div>

          <div className="reference-box">

            <span>
              Transaction Reference
            </span>

            <strong>
              {referenceNumber}
            </strong>

          </div>

          <button
            className="home-button"
            onClick={() =>
              navigate("/customer/dashboard")
            }
          >
            ← Back to Home
          </button>

        </div>

      </div>

    );
  }


  // =========================
  // MAIN DEPOSIT PAGE
  // =========================

  return (

    <div className="deposit-page">

      <div className="deposit-card">

        {/* Header */}

        <div className="deposit-header">

          <button
            className="deposit-back"
            onClick={() =>
              navigate("/customer/dashboard")
            }
          >
            ←
          </button>

          <div>
            <h1>Deposit Money</h1>

            <p>
              Add money to your account
            </p>
          </div>

        </div>


        {/* Account */}

        <div className="account-preview">

          <div className="account-icon">
            ₹
          </div>

          <div className="account-info">

            <span>
              Deposit to
            </span>

            <strong>
              Current Account
            </strong>

            <small>
              •••• {accountNumber.slice(-4)}
            </small>

          </div>

          <div className="account-status">
            ACTIVE
          </div>

        </div>


        <form onSubmit={handleContinue}>

          {/* Amount */}

          <div className="amount-section">

            <label>
              Deposit Amount
            </label>

            <div className="amount-input">

              <span>₹</span>

              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="0.00"
                min="1"
                step="0.01"
                autoFocus
              />

            </div>

          </div>


          {/* Quick Amount */}

          <div className="quick-section">

            <span>
              Quick Amount
            </span>

            <div className="quick-buttons">

              {[500, 1000, 5000, 10000].map(
                (value) => (

                  <button
                    type="button"
                    key={value}
                    onClick={() =>
                      setAmount(String(value))
                    }
                  >
                    ₹{value.toLocaleString("en-IN")}
                  </button>

                )
              )}

            </div>

          </div>


          {/* Description */}

          <div className="description-section">

            <label>
              Description
              <span>Optional</span>
            </label>

            <input
              type="text"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="e.g. Cash deposit"
            />

          </div>


          {/* Error */}

          {error && (

            <div className="deposit-error">
              ✕ {error}
            </div>

          )}


          {/* Continue */}

          <button
            type="submit"
            className="continue-button"
          >
            Continue
            <span>→</span>
          </button>

        </form>


        <div className="secure-note">
          🔒 Secure banking transaction
        </div>

      </div>


      {/* =========================
          CONFIRMATION MODAL
      ========================= */}

      {showConfirm && (

        <div className="confirm-overlay">

          <div className="confirm-card">

            <div className="confirm-icon">
              ₹
            </div>

            <h2>
              Confirm Deposit
            </h2>

            <p>
              Please review your transaction
            </p>


            <div className="confirm-details">

              <div>
                <span>Account</span>

                <strong>
                  •••• {accountNumber.slice(-4)}
                </strong>
              </div>

              <div>
                <span>Amount</span>

                <strong>
                  ₹{Number(amount).toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Description</span>

                <strong>
                  {description || "Deposit"}
                </strong>
              </div>

            </div>


            <div className="confirm-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setShowConfirm(false)
                }
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="confirm-button"
                onClick={handleConfirmDeposit}
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="deposit-loader"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Deposit
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default DepositPage;