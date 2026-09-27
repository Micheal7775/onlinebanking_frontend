import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../services/customerService";
import "./CreateCustomer.css";

function CreateCustomer() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    aadhaarNumber: "",
    panNumber: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const data = await createCustomer(formData);

      console.log("Customer Response:", data);

      setMessage("Customer created successfully!");

      setTimeout(() => {
        navigate("/staff/dashboard");
      }, 1500);

    } catch (error) {

      console.error("Customer Error:", error);

      setError(error.message);
    }
  };

  return (
    <div className="create-customer-page">

      {/* Background */}
      <div className="customer-bg-circle customer-circle-one"></div>
      <div className="customer-bg-circle customer-circle-two"></div>


      <div className="create-customer-card">

        {/* Header */}
        <div className="customer-form-header">

          <div className="customer-form-icon">
            👤
          </div>

          <div>
            <span className="form-label">
              CUSTOMER MANAGEMENT
            </span>

            <h2>Create Customer</h2>

            <p>
              Register a new customer and capture their
              personal information securely.
            </p>
          </div>

        </div>


        {/* Form */}
        <form
          className="customer-form"
          onSubmit={handleSubmit}
        >

          {/* Personal Information */}
          <div className="form-section-title">
            <span>01</span>

            <div>
              <h3>Personal Information</h3>
              <p>Basic customer details</p>
            </div>
          </div>


          <div className="customer-grid">

            {/* Full Name */}
            <div className="customer-field full-width">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter customer's full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>


            {/* DOB */}
            <div className="customer-field">
              <label>Date of Birth</label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>


            {/* Gender */}
            <div className="customer-field">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">
                  Select Gender
                </option>

                <option value="MALE">
                  Male
                </option>

                <option value="FEMALE">
                  Female
                </option>

                <option value="OTHER">
                  Other
                </option>
              </select>
            </div>


            {/* Email */}
            <div className="customer-field">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="customer@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>


            {/* Mobile */}
            <div className="customer-field">
              <label>Mobile Number</label>

              <input
                type="text"
                name="mobileNumber"
                placeholder="10 digit mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>

          </div>


          {/* Address */}
          <div className="form-section-title">

            <span>02</span>

            <div>
              <h3>Address Information</h3>
              <p>Customer residential details</p>
            </div>

          </div>


          <div className="customer-grid">

            {/* Address */}
            <div className="customer-field full-width">

              <label>Address</label>

              <input
                type="text"
                name="address"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={handleChange}
              />

            </div>


            {/* City */}
            <div className="customer-field">

              <label>City</label>

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />

            </div>


            {/* State */}
            <div className="customer-field">

              <label>State</label>

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />

            </div>


            {/* Pincode */}
            <div className="customer-field">

              <label>Pincode</label>

              <input
                type="text"
                name="pincode"
                placeholder="6 digit pincode"
                value={formData.pincode}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* KYC */}
          <div className="form-section-title">

            <span>03</span>

            <div>
              <h3>KYC Information</h3>
              <p>Identity verification details</p>
            </div>

          </div>


          <div className="customer-grid">

            {/* Aadhaar */}
            <div className="customer-field">

              <label>Aadhaar Number</label>

              <input
                type="text"
                name="aadhaarNumber"
                placeholder="12 digit Aadhaar number"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                maxLength="12"
              />

            </div>


            {/* PAN */}
            <div className="customer-field">

              <label>PAN Number</label>

              <input
                type="text"
                name="panNumber"
                placeholder="ABCDE1234F"
                value={formData.panNumber}
                onChange={handleChange}
                maxLength="10"
              />

            </div>

          </div>


          {/* Messages */}
          {message && (
            <div className="customer-success">
              ✓ {message}
            </div>
          )}

          {error && (
            <div className="customer-error">
              ✕ {error}
            </div>
          )}


          {/* Actions */}
          <div className="customer-actions">

            <button
              type="button"
              className="customer-back-button"
              onClick={() =>
                navigate("/staff/dashboard")
              }
            >
              ← Back
            </button>

            <button
              type="submit"
              className="customer-submit-button"
            >
              Create Customer
              <span>→</span>
            </button>

          </div>

        </form>


        {/* Footer */}
        <div className="customer-security-footer">

          <span>🔒</span>

          <span>
            Customer information is protected by secure
            banking controls.
          </span>

        </div>

      </div>

    </div>
  );
}

export default CreateCustomer;