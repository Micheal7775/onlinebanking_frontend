import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService";

import "./StaffCustomers.css";


function StaffCustomers() {

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [editingCustomer, setEditingCustomer] =
    useState(null);

  const [saving, setSaving] = useState(false);


  // =====================================================
  // LOAD CUSTOMERS
  // =====================================================

  const loadCustomers = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getAllCustomers();

      setCustomers(
        Array.isArray(data) ? data : []
      );

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Failed to load customers."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadCustomers();

  }, []);


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (customer) => {

    setEditingCustomer({
      ...customer,
    });

  };


  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setEditingCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =====================================================
  // UPDATE
  // =====================================================

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const updatedCustomer =
        await updateCustomer(
          editingCustomer.customerId,
          editingCustomer
        );


      setCustomers((prev) =>
        prev.map((customer) =>
          customer.customerId ===
          editingCustomer.customerId
            ? updatedCustomer
            : customer
        )
      );


      setEditingCustomer(null);

      alert("Customer updated successfully.");

    } catch (err) {

      alert(
        err.message ||
        "Failed to update customer."
      );

    } finally {

      setSaving(false);

    }
  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (customerId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) {
      return;
    }

    try {

      await deleteCustomer(customerId);

      setCustomers((prev) =>
        prev.filter(
          (customer) =>
            customer.customerId !== customerId
        )
      );

      alert("Customer deleted successfully.");

    } catch (err) {

      alert(
        err.message ||
        "Failed to delete customer."
      );

    }
  };


  return (

    <div className="staff-customers-page">

      <div className="staff-customers-container">


        {/* HEADER */}

        <div className="customers-page-header">

          <div>

            <span>
              STAFF OPERATIONS
            </span>

            <h1>
              Manage Customers
            </h1>

            <p>
              View, edit and manage registered customers.
            </p>

          </div>


          <div className="customers-header-actions">

            <button
              className="back-btn"
              onClick={() =>
                navigate("/staff/dashboard")
              }
            >
              ← Dashboard
            </button>


            <button
              className="refresh-btn"
              onClick={loadCustomers}
            >
              ↻ Refresh
            </button>

          </div>

        </div>


        {/* ERROR */}

        {error && (

          <div className="customer-error">
            ⚠ {error}
          </div>

        )}


        {/* LOADING */}

        {loading ? (

          <div className="customer-loading">
            Loading customers...
          </div>

        ) : customers.length === 0 ? (

          <div className="customer-empty">

            <div>
              👥
            </div>

            <h2>
              No Customers Found
            </h2>

            <p>
              No customers are currently registered.
            </p>

          </div>

        ) : (

          <div className="customers-table-card">


            {/* TABLE HEADER */}

            <div className="customers-table-top">

              <div>

                <h2>
                  Customer List
                </h2>

                <p>
                  Total Customers:
                  <strong>
                    {" "}
                    {customers.length}
                  </strong>
                </p>

              </div>

            </div>


            {/* TABLE */}

            <div className="customers-table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>
                      ID
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Mobile
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {customers.map((customer) => (

                    <tr
                      key={customer.customerId}
                    >

                      <td>
                        #{customer.customerId}
                      </td>


                      <td>

                        <div className="customer-name">

                          <div className="customer-avatar">
                            {customer.fullName
                              ?.charAt(0)
                              .toUpperCase() || "C"}
                          </div>

                          <strong>
                            {customer.fullName || "-"}
                          </strong>

                        </div>

                      </td>


                      <td>
                        {customer.email || "-"}
                      </td>


                      <td>
                        {customer.mobileNumber || "-"}
                      </td>


                      <td>

                        <span
                          className={`status-badge ${
                            customer.status
                              ?.toLowerCase()
                          }`}
                        >
                          {customer.status || "-"}
                        </span>

                      </td>


                      <td>

                        <div className="customer-actions">

                          <button
                            className="view-btn"
                            onClick={() =>
                              setSelectedCustomer(
                                customer
                              )
                            }
                          >
                            View
                          </button>


                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(customer)
                            }
                          >
                            Edit
                          </button>


                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                customer.customerId
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}


        {/* =================================================
            VIEW CUSTOMER
        ================================================= */}

        {selectedCustomer && (

          <div className="customer-modal-overlay">

            <div className="customer-modal">

              <div className="modal-header">

                <div>

                  <span>
                    CUSTOMER PROFILE
                  </span>

                  <h2>
                    Customer Details
                  </h2>

                </div>


                <button
                  onClick={() =>
                    setSelectedCustomer(null)
                  }
                >
                  ×
                </button>

              </div>


              <div className="customer-profile">

                <div className="profile-avatar">

                  {selectedCustomer.fullName
                    ?.charAt(0)
                    .toUpperCase() || "C"}

                </div>


                <h3>
                  {selectedCustomer.fullName || "-"}
                </h3>

                <span>
                  Customer ID #
                  {selectedCustomer.customerId}
                </span>

              </div>


              <div className="customer-details-grid">

                <div>
                  <label>
                    Email
                  </label>

                  <strong>
                    {selectedCustomer.email || "-"}
                  </strong>
                </div>


                <div>
                  <label>
                    Mobile Number
                  </label>

                  <strong>
                    {selectedCustomer.mobileNumber || "-"}
                  </strong>
                </div>


                <div>
                  <label>
                    Address
                  </label>

                  <strong>
                    {selectedCustomer.address || "-"}
                  </strong>
                </div>


                <div>
                  <label>
                    Aadhaar Number
                  </label>

                  <strong>
                    {selectedCustomer.aadhaarNumber || "-"}
                  </strong>
                </div>


                <div>
                  <label>
                    PAN Number
                  </label>

                  <strong>
                    {selectedCustomer.panNumber || "-"}
                  </strong>
                </div>


                <div>
                  <label>
                    Status
                  </label>

                  <strong>
                    {selectedCustomer.status || "-"}
                  </strong>
                </div>

              </div>


              <div className="modal-actions">

                <button
                  onClick={() => {
                    setSelectedCustomer(null);
                    handleEdit(selectedCustomer);
                  }}
                >
                  Edit Customer
                </button>


                <button
                  onClick={() =>
                    setSelectedCustomer(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        )}


        {/* =================================================
            EDIT CUSTOMER
        ================================================= */}

        {editingCustomer && (

          <div className="customer-modal-overlay">

            <div className="customer-modal">

              <div className="modal-header">

                <div>

                  <span>
                    CUSTOMER MANAGEMENT
                  </span>

                  <h2>
                    Edit Customer
                  </h2>

                </div>


                <button
                  onClick={() =>
                    setEditingCustomer(null)
                  }
                >
                  ×
                </button>

              </div>


              <form
                onSubmit={handleUpdate}
                className="edit-form"
              >

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={
                    editingCustomer.fullName || ""
                  }
                  onChange={handleChange}
                />


                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    editingCustomer.email || ""
                  }
                  onChange={handleChange}
                />


                <label>
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobileNumber"
                  value={
                    editingCustomer.mobileNumber || ""
                  }
                  onChange={handleChange}
                  maxLength="10"
                />


                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={
                    editingCustomer.address || ""
                  }
                  onChange={handleChange}
                />


                <label>
                  Aadhaar Number
                </label>

                <input
                  type="text"
                  name="aadhaarNumber"
                  value={
                    editingCustomer.aadhaarNumber || ""
                  }
                  onChange={handleChange}
                  maxLength="12"
                />


                <label>
                  PAN Number
                </label>

                <input
                  type="text"
                  name="panNumber"
                  value={
                    editingCustomer.panNumber || ""
                  }
                  onChange={handleChange}
                />


                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={
                    editingCustomer.status || ""
                  }
                  onChange={handleChange}
                >

                  <option value="ACTIVE">
                    ACTIVE
                  </option>

                  <option value="INACTIVE">
                    INACTIVE
                  </option>

                  <option value="BLOCKED">
                    BLOCKED
                  </option>

                </select>


                <div className="modal-actions">

                  <button
                    type="button"
                    onClick={() =>
                      setEditingCustomer(null)
                    }
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>

    </div>

  );
}


export default StaffCustomers;