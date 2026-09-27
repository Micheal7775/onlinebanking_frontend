const API_URL =
  "https://online-banking-kgrd.onrender.com/api/staff/customers";


// =========================
// CREATE CUSTOMER
// =========================

export const createCustomer = async (customerData) => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(customerData),
  });

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  console.log(
    "Create Customer:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to create customer (${response.status})`
    );
  }

  return data;
};


// =========================
// GET ACCOUNT DETAILS
// =========================

export const getAccountDetails = async (
  accountNumber
) => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(
    `${API_URL}/${encodeURIComponent(accountNumber)}`,
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

  console.log(
    "Get Account Details:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch account details (${response.status})`
    );
  }

  return data;
};