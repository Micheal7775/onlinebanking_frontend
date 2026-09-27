import { useState } from "react";
import { issueDebitCard } from "../services/cardService";

function CreateCard() {

  const [accountNumber, setAccountNumber] = useState("");
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateCard = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");
    setCard(null);

    if (!accountNumber.trim()) {
      setError("Account number is required");
      return;
    }

    try {

      setLoading(true);

      const data =
        await issueDebitCard(accountNumber.trim());

      setCard(data);

      setMessage(
        "Debit card created successfully"
      );

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "40px auto",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    }}>

      <h2>Issue Debit Card</h2>

      <p>
        Create a debit card for an active customer account.
      </p>

      <form onSubmit={handleCreateCard}>

        <label>Account Number</label>

        <input
          type="text"
          value={accountNumber}
          onChange={(e) =>
            setAccountNumber(e.target.value)
          }
          placeholder="Enter account number"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {loading
            ? "Creating Card..."
            : "Create Debit Card"}
        </button>

      </form>

      {message && (
        <div style={{ marginTop: "20px" }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{
          marginTop: "20px"
        }}>
          {error}
        </div>
      )}

      {card && (
        <div style={{
          marginTop: "25px",
          padding: "20px",
          borderRadius: "12px",
          background: "#f5f5f5"
        }}>

          <h3>Card Created</h3>

          <p>
            <strong>Card Number:</strong>{" "}
            {card.cardNumber}
          </p>

          <p>
            <strong>Card Type:</strong>{" "}
            {card.cardType}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {card.status}
          </p>

          <p>
            <strong>Expiry:</strong>{" "}
            {card.expiryDate}
          </p>

        </div>
      )}

    </div>
  );
}

export default CreateCard;