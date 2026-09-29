const API_URL =
  "http://13.126.207.99:8080/api/manager/accounts";

// =====================================================
// GET MY ACCOUNT
// =====================================================

export const getMyAccount = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  const response = await fetch(
    `${API_URL}/my-account`,
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

  console.log(
    "GET MY ACCOUNT:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
        data.error ||
        text ||
        `Failed to fetch account (${response.status})`
    );
  }

  if (
    !data ||
    !data.accountNumber
  ) {
    throw new Error(
      "Customer account details are not available. Please login again."
    );
  }

  return data;
};

// =====================================================
// GET ACCOUNT DETAILS BY ACCOUNT NUMBER
// =====================================================

export const getAccountDetails = async (
  accountNumber
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  if (!accountNumber) {
    throw new Error(
      "Account number is required."
    );
  }

  const response = await fetch(
    `${API_URL}/${encodeURIComponent(
      accountNumber
    )}`,
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
        `Failed to fetch account (${response.status})`
    );
  }

  return data;
};

// =====================================================
// WITHDRAW MONEY
// =====================================================

export const withdrawMoney = async (
  accountNumber,
  amount,
  description
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  if (!accountNumber) {
    throw new Error(
      "Account number is required."
    );
  }

  if (!amount || Number(amount) <= 0) {
    throw new Error(
      "Enter a valid withdrawal amount."
    );
  }

  const response = await fetch(
    `${API_URL}/${encodeURIComponent(
      accountNumber
    )}/withdraw`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        amount: Number(amount),

        description:
          description?.trim() || "",
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
    "WITHDRAW RESPONSE:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
        data.error ||
        text ||
        "Withdrawal failed"
    );
  }

  return data;
};

// =====================================================
// REQUEST TRANSFER OTP
// =====================================================

export const requestTransferOtp = async (
  fromAccountNumber,
  toAccountNumber,
  amount
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  if (!fromAccountNumber) {
    throw new Error(
      "Sender account number is required."
    );
  }

  if (!toAccountNumber) {
    throw new Error(
      "Beneficiary account number is required."
    );
  }

  if (!amount || Number(amount) <= 0) {
    throw new Error(
      "Enter a valid transfer amount."
    );
  }

  const response = await fetch(
    `${API_URL}/${encodeURIComponent(
      fromAccountNumber
    )}/transfer/otp`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        toAccountNumber:
          String(toAccountNumber).trim(),

        amount: Number(amount),
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
        "Failed to generate OTP"
    );
  }

  console.log(
    "TRANSFER OTP RESPONSE:",
    data
  );

  return data;
};

// =====================================================
// CONFIRM TRANSFER WITH OTP
// =====================================================

export const transferWithOtp = async (
  fromAccountNumber,
  otpCode,
  description
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  if (!fromAccountNumber) {
    throw new Error(
      "Sender account number is required."
    );
  }

  const enteredOtp =
    String(otpCode || "").trim();

  if (!/^\d{6}$/.test(enteredOtp)) {
    throw new Error(
      "Enter a valid 6-digit OTP."
    );
  }

  const response = await fetch(
    `${API_URL}/${encodeURIComponent(
      fromAccountNumber
    )}/transfer/confirm`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        otp: enteredOtp,

        description:
          description?.trim() || "",
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
        "Transfer failed"
    );
  }

  return data;
};

// =====================================================
// GET TRANSACTION HISTORY
// =====================================================

export const getTransactionHistory = async (
  accountNumber
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  if (!accountNumber) {
    throw new Error(
      "Account number is required."
    );
  }

  const response = await fetch(
    `${API_URL}/${encodeURIComponent(
      accountNumber
    )}/transactions`,
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
        "Failed to fetch transactions"
    );
  }

  return data;
};

// =====================================================
// GET STATEMENT
// =====================================================

export const getStatement = async (
  accountNumber,
  fromDate,
  toDate
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  if (!accountNumber) {
    throw new Error(
      "Account number is required."
    );
  }

  const response = await fetch(
    `${API_URL}/${encodeURIComponent(
      accountNumber
    )}/statement?fromDate=${encodeURIComponent(
      fromDate
    )}&toDate=${encodeURIComponent(
      toDate
    )}`,
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
        "Failed to fetch statement"
    );
  }

  return data;
};