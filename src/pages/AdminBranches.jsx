import { useEffect, useState } from "react";
import {
  getAllBranches,
  updateBranch,
  deleteBranch
} from "../services/admin";

import "./AdminBranches.css";

function AdminBranches() {

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingBranch, setEditingBranch] = useState(null);
  const [saving, setSaving] = useState(false);


  // =========================
  // LOAD BRANCHES
  // =========================

  const loadBranches = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getAllBranches();

      setBranches(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadBranches();

  }, []);


  // =========================
  // DELETE BRANCH
  // =========================

  const handleDelete = async (branchId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this branch?"
    );

    if (!confirmDelete) return;


    try {

      await deleteBranch(branchId);

      setBranches((prev) =>
        prev.filter(
          (branch) =>
            branch.branchId !== branchId
        )
      );

      alert("Branch deleted successfully.");

    } catch (err) {

      alert(err.message);

    }
  };


  // =========================
  // OPEN EDIT
  // =========================

  const handleEdit = (branch) => {

    setEditingBranch({
      ...branch
    });

  };


  // =========================
  // CLOSE EDIT
  // =========================

  const handleCancelEdit = () => {

    setEditingBranch(null);

  };


  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;

    setEditingBranch((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // =========================
  // UPDATE BRANCH
  // =========================

  const handleUpdate = async (event) => {

    event.preventDefault();

    if (!editingBranch) return;


    try {

      setSaving(true);

      const updatedBranch =
        await updateBranch(
          editingBranch.branchId,
          editingBranch
        );


      setBranches((prev) =>
        prev.map((branch) =>
          branch.branchId ===
          editingBranch.branchId
            ? updatedBranch
            : branch
        )
      );


      setEditingBranch(null);

      alert("Branch updated successfully.");

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

      <div className="branches-page">

        <div className="branches-loading">

          <div className="branch-spinner"></div>

          <p>
            Loading branches...
          </p>

        </div>

      </div>

    );
  }


  return (

    <div className="branches-page">

      <div className="branches-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="branches-header">

          <div>

            <span className="branches-label">
              ADMINISTRATION
            </span>

            <h1>
              Branch Management
            </h1>

            <p>
              View, edit and manage all banking branches.
            </p>

          </div>


          <button
            className="branch-refresh-btn"
            onClick={loadBranches}
          >
            ↻ Refresh
          </button>

        </div>


        {/* =========================
            ERROR
        ========================= */}

        {error && (

          <div className="branches-error">
            ⚠ {error}
          </div>

        )}


        {/* =========================
            SUMMARY
        ========================= */}

        <div className="branch-summary">

          <div className="branch-summary-icon">
            🏦
          </div>

          <div>

            <span>
              Total Branches
            </span>

            <strong>
              {branches.length}
            </strong>

          </div>

        </div>


        {/* =========================
            EMPTY
        ========================= */}

        {branches.length === 0 ? (

          <div className="empty-branches">

            <div className="empty-branch-icon">
              🏦
            </div>

            <h2>
              No Branches Found
            </h2>

            <p>
              There are currently no registered branches.
            </p>

          </div>

        ) : (

          <>


            {/* =========================
                DESKTOP TABLE
            ========================= */}

            <div className="branches-table-wrapper">

              <table className="branches-table">

                <thead>

                  <tr>

                    <th>
                      ID
                    </th>

                    <th>
                      Branch Code
                    </th>

                    <th>
                      IFSC
                    </th>

                    <th>
                      Branch Name
                    </th>

                    <th>
                      City
                    </th>

                    <th>
                      State
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

                  {branches.map((branch) => (

                    <tr
                      key={branch.branchId}
                    >

                      <td>
                        #{branch.branchId}
                      </td>

                      <td className="branch-code">
                        {branch.branchCode || "-"}
                      </td>

                      <td className="branch-ifsc">
                        {branch.ifscCode || "-"}
                      </td>

                      <td className="branch-name">
                        {branch.branchName || "-"}
                      </td>

                      <td>
                        {branch.city || "-"}
                      </td>

                      <td>
                        {branch.state || "-"}
                      </td>

                      <td>

                        <span
                          className={`branch-status ${
                            branch.status?.toLowerCase()
                          }`}
                        >
                          {branch.status || "-"}
                        </span>

                      </td>

                      <td>

                        <div className="branch-actions">

                          <button
                            className="branch-edit-btn"
                            onClick={() =>
                              handleEdit(branch)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="branch-delete-btn"
                            onClick={() =>
                              handleDelete(
                                branch.branchId
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

            <div className="branches-mobile-list">

              {branches.map((branch) => (

                <div
                  className="branch-card"
                  key={branch.branchId}
                >

                  <div className="branch-card-header">

                    <div className="branch-avatar">
                      🏦
                    </div>

                    <div className="branch-card-title">

                      <h3>
                        {branch.branchName || "Branch"}
                      </h3>

                      <span>
                        #{branch.branchId}
                      </span>

                    </div>

                    <span
                      className={`branch-status ${
                        branch.status?.toLowerCase()
                      }`}
                    >
                      {branch.status || "-"}
                    </span>

                  </div>


                  <div className="branch-card-details">


                    <div className="branch-detail">

                      <span>
                        Branch Code
                      </span>

                      <strong>
                        {branch.branchCode || "-"}
                      </strong>

                    </div>


                    <div className="branch-detail">

                      <span>
                        IFSC Code
                      </span>

                      <strong>
                        {branch.ifscCode || "-"}
                      </strong>

                    </div>


                    <div className="branch-detail">

                      <span>
                        Location
                      </span>

                      <strong>
                        {branch.city || "-"},{" "}
                        {branch.state || "-"}
                      </strong>

                    </div>


                    <div className="branch-detail">

                      <span>
                        Address
                      </span>

                      <strong>
                        {branch.address || "-"}
                      </strong>

                    </div>

                  </div>


                  <div className="branch-mobile-actions">

                    <button
                      className="branch-mobile-edit"
                      onClick={() =>
                        handleEdit(branch)
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="branch-mobile-delete"
                      onClick={() =>
                        handleDelete(
                          branch.branchId
                        )
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}


        {/* =========================
            EDIT MODAL
        ========================= */}

        {editingBranch && (

          <div className="branch-modal-overlay">

            <div className="branch-modal">

              <div className="branch-modal-header">

                <div>

                  <span>
                    ADMINISTRATION
                  </span>

                  <h2>
                    Edit Branch
                  </h2>

                </div>


                <button
                  className="modal-close"
                  onClick={handleCancelEdit}
                >
                  ×
                </button>

              </div>


              <form
                onSubmit={handleUpdate}
                className="branch-edit-form"
              >


                <div className="form-group">

                  <label>
                    Branch Code
                  </label>

                  <input
                    type="text"
                    name="branchCode"
                    value={
                      editingBranch.branchCode || ""
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label>
                    IFSC Code
                  </label>

                  <input
                    type="text"
                    name="ifscCode"
                    value={
                      editingBranch.ifscCode || ""
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label>
                    Branch Name
                  </label>

                  <input
                    type="text"
                    name="branchName"
                    value={
                      editingBranch.branchName || ""
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label>
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={
                      editingBranch.address || ""
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="form-row">

                  <div className="form-group">

                    <label>
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={
                        editingBranch.city || ""
                      }
                      onChange={handleChange}
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={
                        editingBranch.state || ""
                      }
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={
                      editingBranch.pincode || ""
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      editingBranch.status || ""
                    }
                    onChange={handleChange}
                  >

                    <option value="ACTIVE">
                      ACTIVE
                    </option>

                    <option value="INACTIVE">
                      INACTIVE
                    </option>

                    <option value="CLOSED">
                      CLOSED
                    </option>

                  </select>

                </div>


                <div className="branch-modal-actions">

                  <button
                    type="button"
                    className="cancel-edit-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="save-branch-btn"
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

export default AdminBranches;