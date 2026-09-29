import { useEffect, useState } from "react";

import {
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from "../services/admin";

import "./AdminCustomers.css";


function AdminCustomers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [saving, setSaving] = useState(false);


  // =========================
  // LOAD CUSTOMERS
  // =========================

  const loadCustomers = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getAllCustomers();

      setCustomers(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {
    loadCustomers();
  }, []);


  // =========================
  // DELETE CUSTOMER
  // =========================

  const handleDelete = async (customerId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

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

      alert(err.message);
    }
  };


  // =========================
  // OPEN EDIT
  // =========================

  const handleEdit = (customer) => {

    setEditingCustomer({
      ...customer,
    });
  };


  // =========================
  // CLOSE EDIT
  // =========================

  const handleCancelEdit = () => {

    setEditingCustomer(null);
  };


  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setEditingCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // =========================
  // UPDATE CUSTOMER
  // =========================

  const handleUpdate = async (event) => {

    event.preventDefault();

    if (!editingCustomer) return;

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

      alert(err.message);

    } finally {

      setSaving(false);
    }
  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="customers-page">

        <div className="customers-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading customers...
          </p>

        </div>

      </div>
    );
  }


  // =========================
  // PAGE
  // =========================

  return (

    <div className="customers-page">

      <div className="customers-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="customers-header">

          <div>

            <span className="customers-label">
              ADMINISTRATION
            </span>

            <h1>
              Customer Management
            </h1>

            <p>
              View, edit and manage all registered customers.
            </p>

          </div>


          <button
            className="refresh-btn"
            onClick={loadCustomers}
          >
            ↻ Refresh
          </button>

        </div>


        {/* =========================
            ERROR
        ========================= */}

        {error && (

          <div className="customers-error">
            ⚠ {error}
          </div>

        )}


        {/* =========================
            CUSTOMER COUNT
        ========================= */}

        <div className="customer-summary">

          <div className="summary-icon">
            👥
          </div>

          <div>

            <span>
              Total Customers
            </span>

            <strong>
              {customers.length}
            </strong>

          </div>

        </div>


        {/* =========================
            NO CUSTOMERS
        ========================= */}

        {customers.length === 0 ? (

          <div className="empty-customers">

            <div className="empty-icon">
              👤
            </div>

            <h2>
              No Customers Found
            </h2>

            <p>
              There are currently no registered customers.
            </p>

          </div>

        ) : (

          <>


            {/* =========================
                DESKTOP TABLE
            ========================= */}

            <div className="customers-table-wrapper">

              <table className="customers-table">

                <thead>

                  <tr>

                    <th>
                      ID
                    </th>

                    <th>
                      Customer Number
                    </th>

                    <th>
                      Name
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Mobile Number
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
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


                      <td className="customer-number">
                        {customer.customerNumber || "-"}
                      </td>


                      <td className="customer-name">
                        {customer.fullName || "-"}
                      </td>


                      <td>
                        {customer.email || "-"}
                      </td>


                      {/* MOBILE NUMBER */}

                      <td>
                        {customer.mobileNumber || "-"}
                      </td>


                      <td>

                        <span
                          className={`customer-status ${
                            customer.status?.toLowerCase()
                          }`}
                        >
                          {customer.status || "-"}
                        </span>

                      </td>


                      <td>

                        <div className="customer-actions">

                          <button
                            className="edit-customer-btn"
                            onClick={() =>
                              handleEdit(customer)
                            }
                          >
                            ✏ Edit
                          </button>


                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                customer.customerId
                              )
                            }
                          >
                            🗑 Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            {/* =========================
                MOBILE CARDS
            ========================= */}

            <div className="customers-mobile-list">

              {customers.map((customer) => (

                <div
                  className="customer-card"
                  key={customer.customerId}
                >


                  <div className="customer-card-header">

                    <div className="customer-avatar">

                      {customer.fullName
                        ? customer.fullName
                            .charAt(0)
                            .toUpperCase()
                        : "C"}

                    </div>


                    <div className="customer-card-title">

                      <h3>
                        {customer.fullName || "Customer"}
                      </h3>

                      <span>
                        #{customer.customerId}
                      </span>

                    </div>


                    <span
                      className={`customer-status ${
                        customer.status?.toLowerCase()
                      }`}
                    >
                      {customer.status || "-"}
                    </span>

                  </div>


                  <div className="customer-card-details">


                    <div className="customer-detail">

                      <span>
                        Customer Number
                      </span>

                      <strong>
                        {customer.customerNumber || "-"}
                      </strong>

                    </div>


                    <div className="customer-detail">

                      <span>
                        Email
                      </span>

                      <strong>
                        {customer.email || "-"}
                      </strong>

                    </div>


                    {/* MOBILE NUMBER */}

                    <div className="customer-detail">

                      <span>
                        Mobile Number
                      </span>

                      <strong>
                        {customer.mobileNumber || "-"}
                      </strong>

                    </div>


                  </div>


                  <div className="customer-mobile-actions">

                    <button
                      className="mobile-edit-btn"
                      onClick={() =>
                        handleEdit(customer)
                      }
                    >
                      ✏ Edit Customer
                    </button>


                    <button
                      className="mobile-delete-btn"
                      onClick={() =>
                        handleDelete(
                          customer.customerId
                        )
                      }
                    >
                      🗑 Delete Customer
                    </button>

                  </div>


                </div>

              ))}

            </div>

          </>

        )}


        {/* =========================
            EDIT CUSTOMER MODAL
        ========================= */}

        {editingCustomer && (

          <div className="customer-modal-overlay">

            <div className="customer-modal">


              <div className="customer-modal-header">

                <div>

                  <span>
                    ADMINISTRATION
                  </span>

                  <h2>
                    Edit Customer
                  </h2>

                </div>


                <button
                  className="customer-modal-close"
                  onClick={handleCancelEdit}
                >
                  ×
                </button>

              </div>


              <form
                onSubmit={handleUpdate}
                className="customer-edit-form"
              >


                {/* FULL NAME */}

                <div className="customer-form-group">

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

                </div>


                {/* EMAIL */}

                <div className="customer-form-group">

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

                </div>


                {/* MOBILE NUMBER */}

                <div className="customer-form-group">

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

                </div>


                {/* ADDRESS */}

                <div className="customer-form-group">

                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={
                      editingCustomer.address || ""
                    }
                    onChange={handleChange}
                    rows="3"
                  />

                </div>


                {/* AADHAAR */}

                <div className="customer-form-group">

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
                  />

                </div>


                {/* PAN */}

                <div className="customer-form-group">

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

                </div>


                {/* STATUS */}

                <div className="customer-form-group">

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

                </div>


                {/* BUTTONS */}

                <div className="customer-modal-actions">

                  <button
                    type="button"
                    className="customer-cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="customer-save-btn"
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


export default AdminCustomers;