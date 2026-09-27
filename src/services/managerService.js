const API_URL =
  "https://online-banking-kgrd.onrender.com/api/verification/applications";


// =========================
// Get VERIFIED applications
// =========================

export const getVerifiedApplications = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(
    `${API_URL}/verified`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch applications (${response.status})`
    );
  }

  return data;
};


// =========================
// Approve / Reject application
// =========================

export const approveApplication = async (
  applicationId,
  approved
) => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(
    `${API_URL}/${applicationId}/approve`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        approved: approved
      })
    }
  );

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to process application (${response.status})`
    );
  }

  return data;
};


// =========================
// Create Account
// =========================

export const createAccount = async (
  applicationId
) => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(
    `https://online-banking-kgrd.onrender.com/api/manager/accounts/create/${applicationId}`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to create account (${response.status})`
    );
  }

  return data;
};