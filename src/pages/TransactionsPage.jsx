import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyAccount,
  getTransactionHistory
} from "../services/customerAccountService";
import "./TransactionsPage.css";

function TransactionsPage() {

  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadTransactions = async () => {

      try {

        setLoading(true);
        setError("");

        // Get logged-in customer's account
        const accountData = await getMyAccount();

        setAccount(accountData);

        // Get transactions automatically
        const transactionData =
          await getTransactionHistory(
            accountData.accountNumber
          );

        setTransactions(transactionData);

      } catch (error) {

        console.error(
          "Transaction Error:",
          error
        );

        setError(
          error.message ||
          "Failed to load transactions"
        );

      } finally {

        setLoading(false);

      }
    };

    loadTransactions();

  }, []);


  const getTransactionLabel = (transaction) => {

    if (
      transaction.transactionType ===
      "DEPOSIT"
    ) {
      return "Money Deposited";
    }

    if (
      transaction.transactionType ===
      "WITHDRAW"
    ) {
      return "Money Withdrawn";
    }

    if (
      transaction.transactionType ===
      "TRANSFER"
    ) {

      if (
        transaction.fromAccount?.accountNumber ===
        account?.accountNumber
      ) {
        return "Money Transferred";
      }

      return "Money Received";
    }

    return transaction.transactionType;
  };


  const getTransactionClass = (transaction) => {

    if (
      transaction.transactionType ===
      "DEPOSIT"
    ) {
      return "deposit";
    }

    if (
      transaction.transactionType ===
      "WITHDRAW"
    ) {
      return "withdraw";
    }

    if (
      transaction.transactionType ===
      "TRANSFER"
    ) {
      return "transfer";
    }

    return "";
  };


  const isCredit = (transaction) => {

    if (
      transaction.transactionType ===
      "DEPOSIT"
    ) {
      return true;
    }

    if (
      transaction.transactionType ===
      "TRANSFER" &&
      transaction.toAccount?.accountNumber ===
        account?.accountNumber
    ) {
      return true;
    }

    return false;
  };


  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    );
  };


  if (loading) {

    return (
      <div className="transactions-page">

        <div className="transactions-card loading-card">

          <div className="transaction-loader"></div>

          <h3>
            Loading transactions...
          </h3>

          <p>
            Please wait while we fetch
            your transaction history.
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="transactions-page">

      <div className="transactions-container">

        {/* HEADER */}

        <div className="transactions-header">

          <div className="header-left">

            <button
              className="back-button"
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
                Transactions
              </h1>

              <p>
                View your recent account activity
              </p>

            </div>

          </div>

        </div>


        {/* ERROR */}

        {error && (

          <div className="transaction-error">

            ✕ {error}

          </div>

        )}


        {/* ACCOUNT SUMMARY */}

        {account && (

          <div className="account-summary">

            <div className="account-summary-left">

              <div className="account-icon">
                ₹
              </div>

              <div>

                <span>
                  {account.accountType} Account
                </span>

                <strong>
                  ••••{" "}
                  {account.accountNumber.slice(-4)}
                </strong>

              </div>

            </div>


            <div className="balance-section">

              <span>
                Available Balance
              </span>

              <strong>
                ₹
                {Number(
                  account.balance
                ).toLocaleString("en-IN")}
              </strong>

            </div>

          </div>

        )}


        {/* TRANSACTION LIST */}

        <div className="transactions-card">

          <div className="card-title">

            <div>

              <h2>
                Transaction History
              </h2>

              <p>
                {transactions.length} transaction
                {transactions.length !== 1
                  ? "s"
                  : ""}
              </p>

            </div>

          </div>


          {transactions.length === 0 ? (

            <div className="empty-transactions">

              <div className="empty-icon">
                ₹
              </div>

              <h3>
                No Transactions Yet
              </h3>

              <p>
                Your transaction history
                will appear here.
              </p>

            </div>

          ) : (

            <div className="transaction-list">

              {transactions.map(
                (transaction) => {

                  const credit =
                    isCredit(transaction);

                  return (

                    <div
                      className="transaction-row"
                      key={
                        transaction.transactionId ||
                        transaction.referenceNumber
                      }
                    >

                      {/* ICON */}

                      <div
                        className={`transaction-icon ${getTransactionClass(
                          transaction
                        )}`}
                      >

                        {credit
                          ? "↓"
                          : "↑"}

                      </div>


                      {/* DETAILS */}

                      <div className="transaction-details">

                        <strong>

                          {getTransactionLabel(
                            transaction
                          )}

                        </strong>

                        <span>

                          {transaction.description ||
                            "Bank transaction"}

                        </span>

                        <small>

                          {formatDate(
                            transaction.transactionDate
                          )}

                        </small>

                      </div>


                      {/* AMOUNT */}

                      <div
                        className={`transaction-amount ${
                          credit
                            ? "credit"
                            : "debit"
                        }`}
                      >

                        {credit
                          ? "+"
                          : "-"}
                        ₹
                        {Number(
                          transaction.amount
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </div>


        {/* SECURITY NOTE */}

        <div className="transaction-security">

          🔒 Your transaction information
          is securely protected.

        </div>

      </div>

    </div>
  );
}

export default TransactionsPage;