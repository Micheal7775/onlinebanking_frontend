import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  withdrawMoney,
  getMyAccount
} from "../services/customerAccountService";
import "./WithdrawPage.css";

function WithdrawPage() {

  const navigate = useNavigate();

  const [account, setAccount] = useState(null);

  const [amount, setAmount] = useState("");
  const [successAmount, setSuccessAmount] = useState("");

  const [description, setDescription] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(true);


  // =========================
  // LOAD CUSTOMER ACCOUNT
  // =========================

  useEffect(() => {

    const loadAccount = async () => {

      try {

        setAccountLoading(true);

        const data = await getMyAccount();

        setAccount(data);

      } catch (error) {

        console.error("Account Error:", error);

        setError(
          error.message || "Failed to load account"
        );

      } finally {

        setAccountLoading(false);

      }

    };

    loadAccount();

  }, []);


  // =========================
  // CONTINUE
  // =========================

  const handleContinue = (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    if (!account) {
      setError("Account details are not available");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid withdrawal amount");
      return;
    }

    if (Number(amount) > Number(account.balance)) {
      setError("Insufficient account balance");
      return;
    }

    setShowConfirm(true);

  };


  // =========================
  // CONFIRM WITHDRAW
  // =========================

  const handleConfirmWithdraw = async () => {

    setLoading(true);
    setError("");

    try {

      const data = await withdrawMoney(
        account.accountNumber,
        amount,
        description
      );

      setSuccessAmount(amount);

      setReferenceNumber(
        data.referenceNumber
      );

      setMessage(
        "Withdrawal Successful"
      );

      setShowConfirm(false);

      setAmount("");
      setDescription("");

    } catch (error) {

      console.error(
        "Withdrawal Error:",
        error
      );

      setError(
        error.message ||
        "Withdrawal failed"
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

      <div className="withdraw-page">

        <div className="withdraw-success-card">

          <div className="success-check">
            ✓
          </div>

          <h1>
            Withdrawal Successful
          </h1>

          <p>
            Your withdrawal has been
            processed successfully.
          </p>

          <div className="success-amount">

            ₹
            {Number(
              successAmount
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
              navigate(
                "/customer/dashboard"
              )
            }
          >
            ← Back to Home
          </button>

        </div>

      </div>

    );

  }


  // =========================
  // ACCOUNT LOADING
  // =========================

  if (accountLoading) {

    return (

      <div className="withdraw-page">

        <div className="withdraw-card">

          <div className="withdraw-header">

            <h1>
              Withdraw Money
            </h1>

            <p>
              Loading your account...
            </p>

          </div>

          <div className="account-loading">

            <span className="withdraw-loader"></span>

            Loading account details...

          </div>

        </div>

      </div>

    );

  }


  // =========================
  // WITHDRAW PAGE
  // =========================

  return (

    <div className="withdraw-page">

      <div className="withdraw-card">

        {/* HEADER */}

        <div className="withdraw-header">

          <button
            className="withdraw-back"
            onClick={() =>
              navigate(
                "/customer/dashboard"
              )
            }
          >
            ←
          </button>

          <div>

            <h1>
              Withdraw Money
            </h1>

            <p>
              Withdraw money from your account
            </p>

          </div>

        </div>


        {/* ACCOUNT */}

        {account && (

          <div className="account-preview">

            <div className="account-icon">
              ₹
            </div>

            <div className="account-info">

              <span>
                Withdraw from
              </span>

              <strong>
                {account.accountType}
                {" "}Account
              </strong>

              <small>
                ••••{" "}
                {account.accountNumber.slice(-4)}
              </small>

            </div>

            <div className="account-status">
              {account.status}
            </div>

          </div>

        )}


        <form
          onSubmit={handleContinue}
        >

          {/* AMOUNT */}

          <div className="amount-section">

            <label>
              Withdrawal Amount
            </label>

            <div className="amount-input">

              <span>
                ₹
              </span>

              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                placeholder="0.00"
                min="1"
                step="0.01"
                autoFocus
              />

            </div>

            {account && (

              <small className="available-balance">

                Available Balance: ₹
                {Number(
                  account.balance
                ).toLocaleString("en-IN")}

              </small>

            )}

          </div>


          {/* QUICK AMOUNT */}

          <div className="quick-section">

            <span>
              Quick Amount
            </span>

            <div className="quick-buttons">

              {[500, 1000, 2000, 5000].map(
                (value) => (

                  <button
                    type="button"
                    key={value}
                    onClick={() =>
                      setAmount(
                        String(value)
                      )
                    }
                    disabled={
                      account &&
                      value >
                        Number(
                          account.balance
                        )
                    }
                  >

                    ₹
                    {value.toLocaleString(
                      "en-IN"
                    )}

                  </button>

                )
              )}

            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="description-section">

            <label>

              Description

              <span>
                Optional
              </span>

            </label>

            <input
              type="text"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="e.g. Cash withdrawal"
            />

          </div>


          {/* ERROR */}

          {error && (

            <div className="withdraw-error">

              ✕ {error}

            </div>

          )}


          {/* CONTINUE */}

          <button
            type="submit"
            className="continue-button"
            disabled={!account}
          >

            Continue

            <span>
              →
            </span>

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
              Confirm Withdrawal
            </h2>

            <p>
              Please review your transaction
            </p>


            <div className="confirm-details">

              <div>

                <span>
                  Account
                </span>

                <strong>
                  ••••{" "}
                  {account.accountNumber.slice(-4)}
                </strong>

              </div>


              <div>

                <span>
                  Amount
                </span>

                <strong>
                  ₹
                  {Number(
                    amount
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <div>

                <span>
                  Description
                </span>

                <strong>
                  {description ||
                    "Withdrawal"}
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
                onClick={
                  handleConfirmWithdraw
                }
                disabled={loading}
              >

                {loading ? (

                  <>

                    <span
                      className="withdraw-loader"
                    ></span>

                    Processing...

                  </>

                ) : (

                  "Confirm Withdrawal"

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default WithdrawPage;