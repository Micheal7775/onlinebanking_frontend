const API_URL =
  "http://13.126.207.99:8080/api/cards";

const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  return token;
};


// =========================================
// ISSUE DEBIT CARD
// BANK MANAGER
// =========================================

export const issueDebitCard = async (accountNumber) => {

  const response = await fetch(
    `${API_URL}/issue/${accountNumber}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
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

  console.log(
    "ISSUE CARD RESPONSE:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to issue card (${response.status})`
    );
  }

  return data;
};


// =========================================
// GET MY CARD
// CUSTOMER
// =========================================

export const getMyCard = async () => {

  const response = await fetch(
    `${API_URL}/my-card`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
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

  console.log(
    "GET MY CARD:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to load card (${response.status})`
    );
  }

  return data;
};


// =========================================
// SET / CHANGE CARD PIN
// CUSTOMER
// =========================================

export const setCardPin = async (pin) => {

  const response = await fetch(
    `${API_URL}/pin`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pin: pin,
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

  console.log(
    "SET CARD PIN:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to set card PIN (${response.status})`
    );
  }

  return data;
};


// =========================================
// VERIFY CARD PIN
// CUSTOMER
// =========================================

export const verifyCardPin = async (pin) => {

  const response = await fetch(
    `${API_URL}/pin/verify`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pin: pin,
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

  console.log(
    "VERIFY CARD PIN:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Card PIN verification failed (${response.status})`
    );
  }

  return data;
};


// =========================================
// BLOCK MY CARD
// CUSTOMER
// =========================================

export const blockMyCard = async () => {

  const response = await fetch(
    `${API_URL}/my-card/block`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
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
      `Failed to block card (${response.status})`
    );
  }

  return data;
};