const API_URL =
  "http://13.126.207.99:8080/api/manager/accounts";


// =========================
// GET MY ACCOUNT
// =========================

export const getMyAccount = async () => {

  const token =
    localStorage.getItem("token");

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

  const text =
    await response.text();

  let data = {};

  try {
    data = text
      ? JSON.parse(text)
      : {};
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
      "Failed to fetch account"
    );

  }

  return data;
};


// =========================
// DEPOSIT MONEY
// =========================

export const depositMoney = async (
  accountNumber,
  amount,
  description
) => {

  const token =
    localStorage.getItem("token");

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
      "Enter a valid deposit amount."
    );
  }

  const response = await fetch(
    `${API_URL}/${encodeURIComponent(
      accountNumber
    )}/deposit`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify({
        amount: Number(amount),

        description:
          description?.trim() || "",
      }),
    }
  );

  const text =
    await response.text();

  let data = {};

  try {
    data = text
      ? JSON.parse(text)
      : {};
  } catch {
    data = {};
  }

  console.log(
    "DEPOSIT RESPONSE:",
    response.status,
    data
  );

  if (!response.ok) {

    throw new Error(
      data.message ||
      data.error ||
      text ||
      "Deposit failed"
    );

  }

  return data;
};