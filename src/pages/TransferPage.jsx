import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyAccount,
  requestTransferOtp,
  transferWithOtp
} from "../services/customerAccountService";

import "./TransferPage.css";

function TransferPage() {

  const navigate = useNavigate();

  const [account, setAccount] = useState(null);

  const [toAccountNumber, setToAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [otpCode, setOtpCode] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(true);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [referenceNumber, setReferenceNumber] = useState("");
  const [successAmount, setSuccessAmount] = useState("");

  // LOAD CUSTOMER ACCOUNT
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


  // REQUEST OTP
  const handleContinue = async (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    if (!account) {
      setError("Account details are not available");
      return;
    }

    if (!toAccountNumber.trim()) {
      setError("Please enter receiver account number");
      return;
    }

    if (
      toAccountNumber.trim() ===
      account.accountNumber
    ) {
      setError(
        "Cannot transfer to the same account"
      );
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (
      Number(amount) >
      Number(account.balance)
    ) {
      setError("Insufficient account balance");
      return;
    }

    try {

      setLoading(true);

      const data = await requestTransferOtp(
        account.accountNumber,
        toAccountNumber,
        amount
      );

      console.log("OTP Response:", data);

      setShowOtp(true);

      setMessage(
        "OTP sent successfully"
      );

    } catch (error) {

      console.error(
        "OTP Error:",
        error
      );

      setError(
        error.message ||
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);

    }
  };


  // CONFIRM TRANSFER
  const handleConfirmTransfer = async () => {

    setError("");

    if (!otpCode.trim()) {

      setError("Please enter OTP");

      return;
    }

    try {

      setLoading(true);

      const data =
        await transferWithOtp(
          account.accountNumber,
          otpCode,
          description
        );

      setReferenceNumber(
        data.referenceNumber
      );

      setSuccessAmount(
        data.amount
      );

      setMessage(
        "Transfer Successful"
      );

      setShowOtp(false);

      setOtpCode("");

      setToAccountNumber("");

      setAmount("");

      setDescription("");

    } catch (error) {

      console.error(
        "Transfer Error:",
        error
      );

      setError(
        error.message ||
        "Transfer failed"
      );

    } finally {

      setLoading(false);

    }
  };


  // ACCOUNT LOADING
  if (accountLoading) {

    return (
      <div className="transfer-page">

        <div className="transfer-card">

          <h1>Transfer Money</h1>

          <p>
            Loading your account...
          </p>

        </div>

      </div>
    );
  }


  // SUCCESS
  if (
    message === "Transfer Successful"
  ) {

    return (
      <div className="transfer-page">

        <div className="transfer-success-card">

          <div className="success-check">
            ✓
          </div>

          <h1>
            Transfer Successful
          </h1>

          <p>
            Money has been transferred
            successfully.
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


  return (
    <div className="transfer-page">

      <div className="transfer-card">

        <div className="transfer-header">

          <button
            className="transfer-back"
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
              Transfer Money
            </h1>

            <p>
              Transfer money securely
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
                Transfer from
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

            <div className="account-balance">

              ₹
              {Number(
                account.balance
              ).toLocaleString("en-IN")}

            </div>

          </div>

        )}


        {/* TRANSFER FORM */}

        <form onSubmit={handleContinue}>

          <div className="input-section">

            <label>
              Receiver Account Number
            </label>

            <input
              type="text"
              value={toAccountNumber}
              onChange={(e) =>
                setToAccountNumber(
                  e.target.value
                )
              }
              placeholder="Enter account number"
            />

          </div>


          <div className="amount-section">

            <label>
              Transfer Amount
            </label>

            <div className="amount-input">

              <span>₹</span>

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
              />

            </div>

            {account && (

              <small>

                Available Balance: ₹
                {Number(
                  account.balance
                ).toLocaleString("en-IN")}

              </small>

            )}

          </div>


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
              placeholder="e.g. Rent payment"
            />

          </div>


          {error && (

            <div className="transfer-error">

              ✕ {error}

            </div>

          )}


          {message ===
            "OTP sent successfully" && (

            <div className="otp-message">

              ✓ OTP sent successfully

            </div>

          )}


          <button
            type="submit"
            className="continue-button"
            disabled={
              loading || !account
            }
          >

            {loading
              ? "Sending OTP..."
              : "Continue →"}

          </button>

        </form>


        <div className="secure-note">

          🔒 Secure banking transaction

        </div>

      </div>


      {/* OTP MODAL */}

      {showOtp && (

        <div className="confirm-overlay">

          <div className="confirm-card">

            <div className="confirm-icon">
              🔐
            </div>

            <h2>
              Verify Transfer
            </h2>

            <p>
              Enter the OTP sent to
              your registered mobile
            </p>


            <div className="confirm-details">

              <div>

                <span>
                  Receiver
                </span>

                <strong>
                  ••••{" "}
                  {toAccountNumber.slice(-4)}
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
                    "Money Transfer"}
                </strong>

              </div>

            </div>


            <div className="otp-input-section">

              <label>
                Enter OTP
              </label>

              <input
                type="text"
                maxLength="6"
                value={otpCode}
                onChange={(e) =>
                  setOtpCode(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="Enter 6-digit OTP"
                autoFocus
              />

            </div>


            {error && (

              <div className="transfer-error">

                ✕ {error}

              </div>

            )}


            <div className="confirm-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setShowOtp(false)
                }
                disabled={loading}
              >
                Cancel
              </button>


              <button
                className="confirm-button"
                onClick={
                  handleConfirmTransfer
                }
                disabled={
                  loading ||
                  otpCode.length !== 6
                }
              >

                {loading
                  ? "Processing..."
                  : "Confirm Transfer"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default TransferPage;