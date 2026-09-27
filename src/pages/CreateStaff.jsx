import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStaff } from "../services/staffService";
import "./CreateStaff.css";

function CreateStaff() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "ACCOUNT_OPENING_STAFF",
    fullName: "",
    email: "",
    mobileNumber: "",
    branchId: "",
    joiningDate: ""
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
      const staffData = {
        ...formData,
        branchId: Number(formData.branchId)
      };

      const data = await createStaff(staffData);

      console.log("Staff Response:", data);

      setMessage("Staff created successfully!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Staff Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="create-staff-page">

      <div className="staff-bg-circle staff-circle-one"></div>
      <div className="staff-bg-circle staff-circle-two"></div>

      <div className="create-staff-card">

        <div className="staff-header">
          <div className="staff-icon">
            👤
          </div>

          <div>
            <span className="staff-label">
              ADMINISTRATION
            </span>

            <h1>Create Staff</h1>

            <p>
              Create a staff account and assign banking access.
            </p>
          </div>
        </div>

        <div className="staff-divider"></div>

        <form onSubmit={handleSubmit} className="staff-form">

          <div className="form-section-title">
            Account Information
          </div>

          <div className="staff-grid">

            <div className="staff-field">
              <label>Username</label>

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="staff-field">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="staff-field">
              <label>Staff Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="ACCOUNT_OPENING_STAFF">
                  Account Opening Staff
                </option>

                <option value="DOCUMENT_VERIFICATION_STAFF">
                  Document Verification Staff
                </option>

                <option value="BANK_MANAGER">
                  Bank Manager
                </option>
              </select>
            </div>

          </div>

          <div className="form-section-title">
            Personal Information
          </div>

          <div className="staff-grid">

            <div className="staff-field">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="staff-field">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="staff-field">
              <label>Mobile Number</label>

              <input
                type="text"
                name="mobileNumber"
                placeholder="Enter mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="staff-field">
              <label>Branch ID</label>

              <input
                type="number"
                name="branchId"
                placeholder="Enter branch ID"
                value={formData.branchId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="staff-field">
              <label>Joining Date</label>

              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {message && (
            <div className="staff-success">
              ✓ {message}
            </div>
          )}

          {error && (
            <div className="staff-error">
              ⚠ {error}
            </div>
          )}

          <div className="staff-actions">

            <button
              type="button"
              className="staff-back-button"
              onClick={() => navigate("/admin/dashboard")}
            >
              ← Back
            </button>

            <button
              type="submit"
              className="staff-submit-button"
            >
              Create Staff
              <span>→</span>
            </button>

          </div>

        </form>

        <div className="staff-security-footer">
          🔒 Secure Administration Portal
          <span>•</span>
          Authorized Access Only
        </div>

      </div>
    </div>
  );
}

export default CreateStaff;