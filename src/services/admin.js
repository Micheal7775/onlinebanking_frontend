const API_URL = "http://13.126.207.99:8080/api/admin";


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
// RESPONSE PARSER
// =====================================================

const parseResponse = async (response) => {

  const text = await response.text();

  let data = {};

  try {

    data = text ? JSON.parse(text) : {};

  } catch {

    data = {};

  }

  return {
    data,
    text
  };
};


// =====================================================
// EMPLOYEE
// =====================================================


// GET ALL EMPLOYEES

export const getAllEmployees = async () => {

  const response = await fetch(
    `${API_URL}/employees`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch employees (${response.status})`
    );

  }


  return data;
};


// GET EMPLOYEE BY ID

export const getEmployeeById = async (
  employeeId
) => {

  const response = await fetch(
    `${API_URL}/employees/${employeeId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch employee (${response.status})`
    );

  }


  return data;
};
// UPDATE EMPLOYEE

export const updateEmployee = async (
  employeeId,
  employeeData
) => {

  const response = await fetch(
    `${API_URL}/employees/${employeeId}`,
    {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(employeeData),
    }
  );

  const { data, text } =
    await parseResponse(response);

  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to update employee (${response.status})`
    );

  }

  return data;
};



// DELETE EMPLOYEE

export const deleteEmployee = async (
  employeeId
) => {

  const response = await fetch(
    `${API_URL}/employees/${employeeId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to delete employee (${response.status})`
    );

  }


  return data;
};


// =====================================================
// CUSTOMER
// =====================================================


// GET ALL CUSTOMERS

export const getAllCustomers = async () => {

  const response = await fetch(
    `${API_URL}/customers`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch customers (${response.status})`
    );

  }


  return data;
};


// GET CUSTOMER BY ID

export const getCustomerById = async (
  customerId
) => {

  const response = await fetch(
    `${API_URL}/customers/${customerId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch customer (${response.status})`
    );

  }


  return data;
};


// UPDATE CUSTOMER

export const updateCustomer = async (
  customerId,
  customerData
) => {

  const response = await fetch(
    `${API_URL}/customers/${customerId}`,
    {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(customerData),
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to update customer (${response.status})`
    );

  }


  return data;
};


// DELETE CUSTOMER

export const deleteCustomer = async (
  customerId
) => {

  const response = await fetch(
    `${API_URL}/customers/${customerId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to delete customer (${response.status})`
    );

  }


  return data;
};


// =====================================================
// BRANCH
// =====================================================


// GET ALL BRANCHES

export const getAllBranches = async () => {

  const response = await fetch(
    `${API_URL}/branches`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch branches (${response.status})`
    );

  }


  return data;
};


// GET BRANCH BY ID

export const getBranchById = async (
  branchId
) => {

  const response = await fetch(
    `${API_URL}/branches/${branchId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to fetch branch (${response.status})`
    );

  }


  return data;
};


// CREATE BRANCH

export const createBranch = async (
  branchData
) => {

  const response = await fetch(
    `${API_URL}/branches`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(branchData),
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to create branch (${response.status})`
    );

  }


  return data;
};


// UPDATE BRANCH

export const updateBranch = async (
  branchId,
  branchData
) => {

  const response = await fetch(
    `${API_URL}/branches/${branchId}`,
    {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(branchData),
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to update branch (${response.status})`
    );

  }


  return data;
};


// DELETE BRANCH

export const deleteBranch = async (
  branchId
) => {

  const response = await fetch(
    `${API_URL}/branches/${branchId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


  const { data, text } =
    await parseResponse(response);


  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to delete branch (${response.status})`
    );

  }


  return data;
};