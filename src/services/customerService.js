const API_URL =
  "http://13.126.207.99:8080/api/staff/customers";


// =====================================================
// TOKEN
// =====================================================

const getToken = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  return token;
};


// =====================================================
// RESPONSE HANDLER
// =====================================================

const handleResponse = async (response) => {

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  console.log(
    "API Response:",
    response.status,
    data
  );

  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Request failed (${response.status})`
    );
  }

  return data;
};


// =====================================================
// CREATE CUSTOMER
// POST /api/staff/customers
// =====================================================

export const createCustomer = async (customerData) => {

  const token = getToken();

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(customerData),

  });

  return await handleResponse(response);
};


// =====================================================
// GET ALL CUSTOMERS
// GET /api/staff/customers
// =====================================================n

export const getAllCustomers = async () => {

  const token = getToken();

  const response = await fetch(API_URL, {

    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

  });

  const data = await handleResponse(response);

  return Array.isArray(data) ? data : [];
};


// =====================================================
// GET CUSTOMER BY ID
// GET /api/staff/customers/{customerId}
// =====================================================

export const getCustomerById = async (customerId) => {

  const token = getToken();

  const response = await fetch(
    `${API_URL}/${customerId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return await handleResponse(response);
};


// =====================================================
// UPDATE CUSTOMER
// PUT /api/staff/customers/{customerId}
// =====================================================

export const updateCustomer = async (
  customerId,
  customerData
) => {

  const token = getToken();

  const response = await fetch(
    `${API_URL}/${customerId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(customerData),
    }
  );

  return await handleResponse(response);
};


// =====================================================
// DELETE CUSTOMER
// DELETE /api/staff/customers/{customerId}
// =====================================================

export const deleteCustomer = async (customerId) => {

  const token = getToken();

  const response = await fetch(
    `${API_URL}/${customerId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await handleResponse(response);
};


// =====================================================
// GET ACCOUNT DETAILS
// =====================================================

export const getAccountDetails = async (
  accountNumber
) => {

  const token = getToken();

  const response = await fetch(
    `${API_URL}/${encodeURIComponent(accountNumber)}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await handleResponse(response);
};