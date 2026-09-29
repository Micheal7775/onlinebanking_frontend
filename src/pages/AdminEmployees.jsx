import { useEffect, useState } from "react";

import {
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} from "../services/admin";

import "./AdminEmployees.css";

function AdminEmployees() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [saving, setSaving] = useState(false);


  // =====================================================
  // LOAD EMPLOYEES
  // =====================================================

  const loadEmployees = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getAllEmployees();

      setEmployees(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadEmployees();
  }, []);


  // =====================================================
  // DELETE EMPLOYEE
  // =====================================================

  const handleDelete = async (employeeId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {

      await deleteEmployee(employeeId);

      setEmployees((prev) =>
        prev.filter(
          (employee) =>
            employee.employeeId !== employeeId
        )
      );

      alert("Employee deleted successfully.");

    } catch (err) {

      alert(err.message);

    }
  };


  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEdit = (employee) => {

    setEditingEmployee({
      ...employee
    });

  };


  // =====================================================
  // CLOSE EDIT
  // =====================================================

  const handleCancelEdit = () => {

    setEditingEmployee(null);

  };


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;

    setEditingEmployee((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // =====================================================
  // UPDATE EMPLOYEE
  // =====================================================

  const handleUpdate = async (event) => {

    event.preventDefault();

    if (!editingEmployee) return;

    try {

      setSaving(true);

      const updatedEmployee =
        await updateEmployee(
          editingEmployee.employeeId,
          editingEmployee
        );

      setEmployees((prev) =>
        prev.map((employee) =>
          employee.employeeId ===
          editingEmployee.employeeId
            ? updatedEmployee
            : employee
        )
      );

      setEditingEmployee(null);

      alert("Employee updated successfully.");

    } catch (err) {

      alert(err.message);

    } finally {

      setSaving(false);

    }
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="employees-page">

        <div className="employees-loading">

          <div className="employee-spinner"></div>

          <p>
            Loading employees...
          </p>

        </div>

      </div>
    );
  }


  return (

    <div className="employees-page">

      <div className="employees-container">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="employees-header">

          <div>

            <span className="employees-label">
              ADMINISTRATION
            </span>

            <h1>
              Employee Management
            </h1>

            <p>
              View, edit and manage all banking employees.
            </p>

          </div>


          <button
            className="employee-refresh-btn"
            onClick={loadEmployees}
          >
            ↻ Refresh
          </button>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="employees-error">
            ⚠ {error}
          </div>

        )}


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="employee-summary">

          <div className="employee-summary-icon">
            👥
          </div>

          <div>

            <span>
              Total Employees
            </span>

            <strong>
              {employees.length}
            </strong>

          </div>

        </div>


        {/* =================================================
            EMPTY
        ================================================= */}

        {employees.length === 0 ? (

          <div className="empty-employees">

            <div className="empty-employee-icon">
              👤
            </div>

            <h2>
              No Employees Found
            </h2>

            <p>
              There are currently no registered employees.
            </p>

          </div>

        ) : (

          <>


            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            <div className="employees-table-wrapper">

              <table className="employees-table">

                <thead>

                  <tr>

                    <th>
                      ID
                    </th>

                    <th>
                      Employee Number
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
                      Role
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

                  {employees.map((employee) => (

                    <tr
                      key={employee.employeeId}
                    >

                      <td>
                        #{employee.employeeId}
                      </td>


                      <td className="employee-number">
                        {employee.employeeNumber || "-"}
                      </td>


                      <td className="employee-name">
                        {employee.fullName || "-"}
                      </td>


                      <td>
                        {employee.email || "-"}
                      </td>


                      <td>
                        {employee.mobileNumber || "-"}
                      </td>


                      {/* ROLE */}

                      <td>

                        <span className="employee-role">
                          {employee.role || "-"}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`employee-status ${
                            employee.status
                              ? employee.status.toLowerCase()
                              : ""
                          }`}
                        >
                          {employee.status || "-"}
                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <div className="employee-actions">

                          <button
                            className="employee-edit-btn"
                            onClick={() =>
                              handleEdit(employee)
                            }
                          >
                            ✏ Edit
                          </button>


                          <button
                            className="employee-delete-btn"
                            onClick={() =>
                              handleDelete(
                                employee.employeeId
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


            {/* =================================================
                MOBILE LIST
            ================================================= */}

            <div className="employees-mobile-list">

              {employees.map((employee) => (

                <div
                  className="employee-card"
                  key={employee.employeeId}
                >


                  {/* CARD HEADER */}

                  <div className="employee-card-header">

                    <div className="employee-avatar">

                      {employee.fullName
                        ? employee.fullName
                            .charAt(0)
                            .toUpperCase()
                        : "E"}

                    </div>


                    <div className="employee-card-title">

                      <h3>
                        {employee.fullName || "Employee"}
                      </h3>

                      <span>
                        #{employee.employeeId}
                      </span>

                    </div>


                    <span
                      className={`employee-status ${
                        employee.status
                          ? employee.status.toLowerCase()
                          : ""
                      }`}
                    >
                      {employee.status || "-"}
                    </span>

                  </div>


                  {/* CARD DETAILS */}

                  <div className="employee-card-details">


                    <div className="employee-detail">

                      <span>
                        Employee Number
                      </span>

                      <strong>
                        {employee.employeeNumber || "-"}
                      </strong>

                    </div>


                    <div className="employee-detail">

                      <span>
                        Email
                      </span>

                      <strong>
                        {employee.email || "-"}
                      </strong>

                    </div>


                    <div className="employee-detail">

                      <span>
                        Mobile Number
                      </span>

                      <strong>
                        {employee.mobileNumber || "-"}
                      </strong>

                    </div>


                    {/* ROLE */}

                    <div className="employee-detail">

                      <span>
                        Role
                      </span>

                      <strong>
                        {employee.role || "-"}
                      </strong>

                    </div>

                  </div>


                  {/* MOBILE ACTIONS */}

                  <div className="employee-mobile-actions">

                    <button
                      className="employee-mobile-edit"
                      onClick={() =>
                        handleEdit(employee)
                      }
                    >
                      ✏ Edit Employee
                    </button>


                    <button
                      className="employee-mobile-delete"
                      onClick={() =>
                        handleDelete(
                          employee.employeeId
                        )
                      }
                    >
                      🗑 Delete Employee
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}


        {/* =================================================
            EDIT MODAL
        ================================================= */}

        {editingEmployee && (

          <div className="employee-modal-overlay">

            <div className="employee-modal">


              {/* MODAL HEADER */}

              <div className="employee-modal-header">

                <div>

                  <span>
                    ADMINISTRATION
                  </span>

                  <h2>
                    Edit Employee
                  </h2>

                </div>


                <button
                  type="button"
                  className="employee-modal-close"
                  onClick={handleCancelEdit}
                >
                  ×
                </button>

              </div>


              {/* FORM */}

              <form
                onSubmit={handleUpdate}
                className="employee-edit-form"
              >


                {/* FULL NAME */}

                <div className="employee-form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={
                      editingEmployee.fullName || ""
                    }
                    onChange={handleChange}
                  />

                </div>


                {/* EMAIL */}

                <div className="employee-form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      editingEmployee.email || ""
                    }
                    onChange={handleChange}
                  />

                </div>


                {/* MOBILE NUMBER */}

                <div className="employee-form-group">

                  <label>
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    name="mobileNumber"
                    value={
                      editingEmployee.mobileNumber || ""
                    }
                    onChange={handleChange}
                  />

                </div>


                {/* ROLE */}

                <div className="employee-form-group">

                  <label>
                    Role
                  </label>

                  <select
                    name="role"
                    value={
                      editingEmployee.role || ""
                    }
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Role
                    </option>

                    <option value="BANK_MANAGER">
                      Bank Manager
                    </option>

                    <option value="ACCOUNT_OPENING_STAFF">
                      Account Opening Staff
                    </option>

                    <option value="DOCUMENT_VERIFICATION_STAFF">
                      Document Verification Staff
                    </option>

                  </select>

                </div>


                {/* JOINING DATE */}

                <div className="employee-form-group">

                  <label>
                    Joining Date
                  </label>

                  <input
                    type="date"
                    name="joiningDate"
                    value={
                      editingEmployee.joiningDate || ""
                    }
                    onChange={handleChange}
                  />

                </div>


                {/* STATUS */}

                <div className="employee-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      editingEmployee.status || ""
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


                {/* MODAL ACTIONS */}

                <div className="employee-modal-actions">

                  <button
                    type="button"
                    className="employee-cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="employee-save-btn"
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

export default AdminEmployees;