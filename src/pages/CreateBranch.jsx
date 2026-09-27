import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBranch } from "../services/branchService";
import "./CreateBranch.css";
function CreateBranch() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    branchCode: "",
    branchName: "",
    ifscCode: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber: "",
    email: "",
    status: "ACTIVE",
    openedAt: ""
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

      const data = await createBranch(formData);

      console.log("Branch Response:", data);

      setMessage("Branch created successfully!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);

    } catch (error) {

      console.error("Branch Error:", error);

      setError(error.message);
    }
  };

 
return (
  <div className="create-branch-page">

    <div className="create-branch-card">

      <div className="create-branch-header">

        <div className="create-branch-icon">
          🏦
        </div>

        <h2>Create New Branch</h2>

        <p>
          Add and configure a new banking branch
        </p>

      </div>

      <form
        className="branch-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Branch Code</label>
          <input
            type="text"
            name="branchCode"
            placeholder="Example: CHN003"
            value={formData.branchCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Branch Name</label>
          <input
            type="text"
            name="branchName"
            placeholder="Branch name"
            value={formData.branchName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            placeholder="Example: BANK0000003"
            value={formData.ifscCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Complete branch address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Branch email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>

        <div className="form-group">
          <label>Opened Date</label>

          <input
            type="date"
            name="openedAt"
            value={formData.openedAt}
            onChange={handleChange}
            required
          />
        </div>

        <div className="branch-actions">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Back
          </button>

          <button
            type="submit"
            className="create-branch-button"
          >
            Create Branch
          </button>

        </div>

      </form>

      {message && (
        <div className="branch-success">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="branch-error">
          ✕ {error}
        </div>
      )}

    </div>

  </div>
);
}

export default CreateBranch;