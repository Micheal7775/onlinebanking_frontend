const API_URL =
  "http://13.126.207.99:8080/api/verification/applications";

const MANAGER_APPLICATION_API_URL =
  "http://13.126.207.99:8080/api/manager/applications";

const ACCOUNT_API_URL =
  "http://13.126.207.99:8080/api/manager/accounts";


// =====================================================
// Get VERIFIED applications
// =====================================================

export const getVerifiedApplications = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
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


// =====================================================
// Get ALL applications for MANAGER
// =====================================================

export const getAllApplications = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  const response = await fetch(
    `${API_URL}/all`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const text = await response.text();

  let data = [];

  try {
    data = text ? JSON.parse(text) : [];
  } catch {
    data = [];
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch all applications (${response.status})`
    );
  }

  return data;
};


// =====================================================
// Approve / Reject application
// =====================================================

export const approveApplication = async (
  applicationId,
  approved
) => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
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
        approved: approved,
      }),
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


// =====================================================
// Create Account
// =====================================================

export const createAccount = async (
  applicationId
) => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  const response = await fetch(
    `${ACCOUNT_API_URL}/create/${applicationId}`,
    {
      method: "POST",

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
      `Failed to create account (${response.status})`
    );
  }

  return data;
};


// =====================================================
// Get ALL Accounts
// =====================================================

export const getAllAccounts = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  const response = await fetch(
    `${ACCOUNT_API_URL}/account`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const text = await response.text();

  let data = [];

  try {
    data = text ? JSON.parse(text) : [];
  } catch {
    data = [];
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch accounts (${response.status})`
    );
  }

  return data;
};

export const getAccountByNumber = async (accountNumber) => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  const response = await fetch(
    `http://localhost:8080/api/manager/accounts/account/${accountNumber}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
      `Account not found (${response.status})`
    );
  }

  return data;
};