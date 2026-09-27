import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyCard,
  setCardPin,
} from "../services/cardService";

import "../card.css";

function CardPage() {
  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");

  const [pinMessage, setPinMessage] = useState("");
  const [pinError, setPinError] = useState("");

  // =========================
  // LOAD CARD
  // =========================
  const loadCard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyCard();

      setCard(data);

    } catch (error) {
      console.error("Card Error:", error);

      setError(
        error.message || "Failed to load card"
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // LOAD CARD ON PAGE OPEN
  // =========================
  useEffect(() => {
    loadCard();
  }, []);


  // =========================
  // SET / CHANGE PIN
  // =========================
  const handleSetPin = async (e) => {
    e.preventDefault();

    setPinMessage("");
    setPinError("");

    // Validate PIN
    if (!/^\d{4}$/.test(pin)) {
      setPinError(
        "Card PIN must contain exactly 4 digits."
      );
      return;
    }

    try {

      await setCardPin(pin);

      setPinMessage(
        "Card PIN set successfully."
      );

      setPin("");

      setShowPin(false);

    } catch (error) {

      console.error("PIN Error:", error);

      setPinError(
        error.message ||
        "Failed to set card PIN"
      );
    }
  };


  // =========================
  // MASK CARD NUMBER
  // =========================
  const getMaskedCardNumber = () => {

    if (!card?.cardNumber) {
      return "**** **** **** ****";
    }

    const number = String(card.cardNumber);

    return `**** **** **** ${number.slice(-4)}`;
  };


  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="card-page">

        <div className="card-loading">
          Loading card...
        </div>

      </div>
    );
  }


  return (
    <div className="card-page">

      {/* =========================
          HEADER
      ========================= */}
      <div className="card-page-header">

        <button
          className="back-button"
          onClick={() =>
            navigate("/customer/dashboard")
          }
        >
          ← Back
        </button>

        <div>
          <h1>My Card</h1>

          <p>
            Manage your debit card securely
          </p>
        </div>

      </div>


      {/* =========================
          ERROR
      ========================= */}
      {error && (
        <div className="card-error">
          ✕ {error}
        </div>
      )}


      {/* =========================
          CARD CONTENT
      ========================= */}
      {card && (

        <div className="card-content">

          {/* =========================
              DEBIT CARD
          ========================= */}
          <div className="bank-card">

            <div className="card-header">

              <span>
                ONLINE BANKING
              </span>

              <span>
                {card.cardType}
              </span>

            </div>


            {/* CHIP */}
            <div className="chip">
              ◈
            </div>


            {/* CARD NUMBER */}
            <div className="card-number">
              {getMaskedCardNumber()}
            </div>


            {/* CARD BOTTOM */}
            <div className="card-bottom">

              <div>

                <small>
                  VALID THRU
                </small>

                <strong>
                  {card.expiryDate}
                </strong>

              </div>


              <div>

                <small>
                  STATUS
                </small>

                <strong>
                  {card.status}
                </strong>

              </div>

            </div>

          </div>


          {/* =========================
              CARD DETAILS
          ========================= */}
          <div className="card-info">

            <h2>
              Card Details
            </h2>


            <div className="info-row">

              <span>
                Card Number
              </span>

              <strong>
                {getMaskedCardNumber()}
              </strong>

            </div>


            <div className="info-row">

              <span>
                Card Type
              </span>

              <strong>
                {card.cardType}
              </strong>

            </div>


            <div className="info-row">

              <span>
                Expiry Date
              </span>

              <strong>
                {card.expiryDate}
              </strong>

            </div>


            <div className="info-row">

              <span>
                Status
              </span>

              <strong className="card-status">
                {card.status}
              </strong>

            </div>


            {/* =========================
                PIN BUTTON
            ========================= */}
            <button
              className="pin-button"
              onClick={() => {
                setShowPin(!showPin);
                setPinMessage("");
                setPinError("");
              }}
            >
              🔐 Set / Change Card PIN
            </button>


            {/* =========================
                PIN FORM
            ========================= */}
            {showPin && (

              <form
                className="pin-form"
                onSubmit={handleSetPin}
              >

                <label>
                  Enter 4-digit Card PIN
                </label>


                <input
                  type="password"
                  inputMode="numeric"
                  maxLength="4"
                  value={pin}
                  onChange={(e) =>
                    setPin(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="••••"
                />


                <button type="submit">
                  Save PIN
                </button>

              </form>

            )}


            {/* =========================
                SUCCESS MESSAGE
            ========================= */}
            {pinMessage && (

              <div className="pin-success">
                ✓ {pinMessage}
              </div>

            )}


            {/* =========================
                ERROR MESSAGE
            ========================= */}
            {pinError && (

              <div className="pin-error">
                ✕ {pinError}
              </div>

            )}

          </div>

        </div>

      )}


      {/* =========================
          SECURITY MESSAGE
      ========================= */}
      <div className="card-security">

        <span>
          🔒
        </span>

        <div>

          <strong>
            Keep your card secure
          </strong>

          <p>
            Never share your card PIN with anyone.
          </p>

        </div>

      </div>

    </div>
  );
}

export default CardPage;