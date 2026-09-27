import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyAccount,
  getTransactionHistory,
} from "../services/customerAccountService";

import "./TransactionHistoryPage.css";

function TransactionHistoryPage() {

  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("ALL");


  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {

    const loadTransactions = async () => {

      try {

        setLoading(true);
        setError("");

        const accountData =
          await getMyAccount();

        setAccount(accountData);

        const transactionData =
          await getTransactionHistory(
            accountData.accountNumber
          );

        setTransactions(transactionData);

      } catch (error) {

        console.error(
          "Transaction History Error:",
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


  // =========================================
  // FILTER
  // =========================================

  const filteredTransactions = useMemo(() => {

    if (filter === "ALL") {
      return transactions;
    }

    return transactions.filter(
      (transaction) => {

        const type =
          transaction.transactionType;

        if (filter === "RECEIVED") {

          return type === "DEPOSIT" ||
            (
              type === "TRANSFER" &&
              transaction.toAccount?.accountNumber ===
                account?.accountNumber
            );

        }

        if (filter === "SENT") {

          return type === "WITHDRAW" ||
            (
              type === "TRANSFER" &&
              transaction.fromAccount?.accountNumber ===
                account?.accountNumber
            );

        }

        return true;
      }
    );

  }, [
    transactions,
    filter,
    account
  ]);


  // =========================================
  // TRANSACTION TYPE
  // =========================================

  const getTransactionInfo = (
    transaction
  ) => {

    const type =
      transaction.transactionType;

    const received =
      type === "DEPOSIT" ||
      (
        type === "TRANSFER" &&
        transaction.toAccount?.accountNumber ===
          account?.accountNumber
      );

    if (type === "DEPOSIT") {

      return {
        title: "Money added",
        icon: "↓",
        className: "received",
        prefix: "+",
      };

    }

    if (type === "WITHDRAW") {

      return {
        title: "Cash withdrawal",
        icon: "↑",
        className: "sent",
        prefix: "-",
      };

    }

    if (type === "TRANSFER") {

      if (received) {

        return {
          title: "Money received",
          icon: "↓",
          className: "received",
          prefix: "+",
        };

      }

      return {
        title: "Money sent",
        icon: "↑",
        className: "sent",
        prefix: "-",
      };

    }

    return {
      title: type || "Transaction",
      icon: "₹",
      className: "neutral",
      prefix: "",
    };
  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="history-page">

        <div className="premium-loader">

          <div className="loader-orbit">

            <div className="loader-core">
              ₹
            </div>

          </div>

          <h3>
            Loading your transactions
          </h3>

          <p>
            Fetching your latest activity...
          </p>

        </div>

      </div>
    );
  }


  return (

    <div className="history-page">


      {/* BACKGROUND DECORATION */}

      <div className="bg-orb orb-one"></div>
      <div className="bg-orb orb-two"></div>


      {/* =====================================
          TOP BAR
          ===================================== */}

      <header className="history-topbar">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/customer/dashboard")
          }
        >
          <span>←</span>
        </button>

        <div className="topbar-title">

          <h2>
            Transaction History
          </h2>

          <span>
            Banking activity
          </span>

        </div>

        <div className="secure-icon">
          🔒
        </div>

      </header>


      <main className="history-container">


        {/* =====================================
            BALANCE HERO
            ===================================== */}

        {account && (

          <section className="balance-hero">

            <div className="hero-glow"></div>

            <div className="floating-coin coin-one">
              ₹
            </div>

            <div className="floating-coin coin-two">
              ₹
            </div>

            <div className="floating-coin coin-three">
              ₹
            </div>


            <div className="balance-content">

              <span className="balance-label">
                Available Balance
              </span>

              <div className="balance-amount">

                <span className="rupee">
                  ₹
                </span>

                <span>
                  {Number(
                    account.balance
                  ).toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </span>

              </div>

              <div className="account-pill">

                <span className="online-dot"></span>

                Account

                <strong>
                  ••••{" "}
                  {account.accountNumber.slice(-4)}
                </strong>

              </div>

            </div>


            <div className="hero-wallet">

              <div className="wallet-ring">
                ₹
              </div>

            </div>

          </section>

        )}


        {/* =====================================
            ERROR
            ===================================== */}

        {error && (

          <div className="history-error">

            <span>⚠</span>

            <div>
              <strong>
                Something went wrong
              </strong>

              <p>
                {error}
              </p>
            </div>

          </div>

        )}


        {/* =====================================
            SECTION HEADER
            ===================================== */}

        <section className="history-heading">

          <div>

            <span className="eyebrow">
              ACTIVITY
            </span>

            <h1>
              Your transactions
            </h1>

            <p>
              Track every movement of your money
            </p>

          </div>

          <div className="transaction-count">

            <strong>
              {transactions.length}
            </strong>

            <span>
              Total
            </span>

          </div>

        </section>


        {/* =====================================
            FILTER
            ===================================== */}

        <div className="filter-bar">

          {[
            ["ALL", "All"],
            ["RECEIVED", "Received"],
            ["SENT", "Sent"],
          ].map(
            ([value, label]) => (

              <button
                key={value}
                className={
                  filter === value
                    ? "filter-chip active"
                    : "filter-chip"
                }
                onClick={() =>
                  setFilter(value)
                }
              >
                {label}
              </button>

            )
          )}

        </div>


        {/* =====================================
            TRANSACTIONS
            ===================================== */}

        {filteredTransactions.length === 0 ? (

          <div className="empty-history">

            <div className="empty-animation">

              <div className="empty-circle">
                ₹
              </div>

              <div className="empty-wave"></div>

            </div>

            <h3>
              No transactions found
            </h3>

            <p>
              Your banking activity will
              appear here.
            </p>

          </div>

        ) : (

          <section className="transaction-feed">

            {filteredTransactions.map(
              (transaction, index) => {

                const info =
                  getTransactionInfo(
                    transaction
                  );

                return (

                  <div
                    className="transaction-card"
                    key={
                      transaction.transactionId ||
                      transaction.id ||
                      index
                    }
                    style={{
                      animationDelay:
                        `${index * 70}ms`
                    }}
                  >


                    {/* ICON */}

                    <div
                      className={
                        `transaction-icon ${info.className}`
                      }
                    >

                      <span>
                        {info.icon}
                      </span>

                      <div className="icon-ripple"></div>

                    </div>


                    {/* DETAILS */}

                    <div className="transaction-details">

                      <div className="transaction-title-row">

                        <h3>
                          {info.title}
                        </h3>

                        <span
                          className={
                            transaction.status ===
                            "SUCCESS"
                              ? "success-dot"
                              : "failed-dot"
                          }
                        >
                          {transaction.status}
                        </span>

                      </div>

                      <p>
                        {transaction.description ||
                          "Banking transaction"}
                      </p>

                      <div className="transaction-meta">

                        <span>
                          {transaction.transactionDate
                            ? new Date(
                                transaction.transactionDate
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "-"}
                        </span>

                        <span className="meta-dot">
                          •
                        </span>

                        <span>
                          {transaction.transactionDate
                            ? new Date(
                                transaction.transactionDate
                              ).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : ""}
                        </span>

                      </div>

                    </div>


                    {/* AMOUNT */}

                    <div className="transaction-money">

                      <strong
                        className={
                          info.className ===
                          "received"
                            ? "money-in"
                            : "money-out"
                        }
                      >

                        {info.prefix}

                        ₹
                        {Number(
                          transaction.amount
                        ).toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}

                      </strong>

                      <span>
                        {transaction.referenceNumber
                          ? `#${transaction.referenceNumber.slice(-8)}`
                          : "Transaction"}
                      </span>

                    </div>

                  </div>

                );
              }
            )}

          </section>

        )}


        {/* =====================================
            FOOTER
            ===================================== */}

        <div className="history-footer">

          <span className="footer-lock">
            🔒
          </span>

          <span>
            Your transactions are secured
          </span>

        </div>

      </main>

    </div>
  );
}

export default TransactionHistoryPage;