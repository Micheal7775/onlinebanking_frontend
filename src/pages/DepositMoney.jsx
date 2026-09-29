import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyAccount,
  depositMoney
} from "../services/staffAccountService";

import "./DepositPage.css";

function DepositPage() {

  const navigate = useNavigate();

  // =========================
  // ACCOUNT
  // =========================

  const [account, setAccount] = useState(null);
  const [accountLoading, setAccountLoading] = useState(true);

  // =========================
  // FORM
  // =========================

  const [amount, setAmount] = useState("");
  const [successAmount, setSuccessAmount] = useState("");
  const [description, setDescription] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // =========================
  // LOAD CUSTOMER ACCOUNT
  // =========================

  useEffect(() => {

    const loadAccount = async () => {

      try {

        setAccountLoading(true);
        setError("");

        const data = await getMyAccount();

        if (!data || !data.accountNumber) {
          throw new Error("Customer account not found");
        }

        console.log("CUSTOMER ACCOUNT:", data);

        setAccount(data);

      } catch (err) {

        console.error(
          "ACCOUNT LOAD ERROR:",
          err
        );

        setError(
          err.message ||
          "Unable to load your account"
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

    if (!account?.accountNumber) {

      setError(
        "Account details are not available"
      );

      return;
    }

    if (!amount || Number(amount) <= 0) {

      setError(
        "Please enter a valid deposit amount"
      );

      return;
    }

    setShowConfirm(true);
  };


  // =========================
  // CONFIRM DEPOSIT
  // =========================

  const handleConfirmDeposit = async () => {

    if (!account?.accountNumber) {

      setError(
        "Account number not available"
      );

      return;
    }

    setLoading(true);
    setError("");

    try {

      console.log(
        "DEPOSIT ACCOUNT:",
        account.accountNumber
      );

      const data = await depositMoney(
        account.accountNumber,
        amount,
        description
      );

      setSuccessAmount(amount);

      setReferenceNumber(
        data.referenceNumber
      );

      setMessage("Deposit Successful");

      setShowConfirm(false);

      setAmount("");
      setDescription("");

    } catch (err) {

      console.error(
        "Deposit Error:",
        err
      );

      setError(
        err.message ||
        "Deposit failed"
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
            ₹
            {Number(successAmount)
              .toLocaleString("en-IN")}
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

      <div className="deposit-page">

        <div className="deposit-card">

          <div className="deposit-header">

            <button
              className="deposit-back"
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
                Deposit Money
              </h1>

              <p>
                Add money to your account
              </p>

            </div>

          </div>

          <div className="deposit-loading">

            <span className="deposit-loader"></span>

            Loading account details...

          </div>

        </div>

      </div>

    );
  }


  // =========================
  // MAIN PAGE
  // =========================

  return (

    <div className="deposit-page">

      <div className="deposit-card">

        {/* HEADER */}

        <div className="deposit-header">

          <button
            className="deposit-back"
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
              Deposit Money
            </h1>

            <p>
              Add money to your account
            </p>

          </div>

        </div>


        {/* ACCOUNT */}

        <div className="account-preview">

          <div className="account-icon">
            ₹
          </div>

          <div className="account-info">

            <span>
              Deposit to
            </span>

            <strong>
              {account.accountType || "Account"}
            </strong>

            <small>
              ••••{" "}
              {account.accountNumber.slice(-4)}
            </small>

          </div>

          <div className="account-status">
            {account.status || "ACTIVE"}
          </div>

        </div>


        {/* ERROR */}

        {error && (

          <div className="deposit-error">
            ✕ {error}
          </div>

        )}


        <form onSubmit={handleContinue}>

          {/* AMOUNT */}

          <div className="amount-section">

            <label>
              Deposit Amount
            </label>

            <div className="amount-input">

              <span>
                ₹
              </span>

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


          {/* QUICK AMOUNT */}

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
                      setAmount(
                        String(value)
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
              placeholder="e.g. Cash deposit"
            />

          </div>


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
              Confirm Deposit
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
                  {Number(amount)
                    .toLocaleString(
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
                    "Deposit"}
                </strong>

              </div>

            </div>


            <div className="confirm-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  setShowConfirm(false)
                }
                disabled={loading}
              >
                Cancel
              </button>


              <button
                type="button"
                className="confirm-button"
                onClick={
                  handleConfirmDeposit
                }
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="deposit-loader"></span>
                    Processing...
                  </>

                ) : (

                  "Confirm Deposit"

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