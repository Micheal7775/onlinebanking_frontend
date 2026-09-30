const API_URL = "http://13.126.207.99:8080/api/auth";


// =====================================================
// COMMON RESPONSE HANDLER
// =====================================================

const parseResponse = async (response) => {

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
      `Request failed (${response.status})`
    );
  }

  return data;
};


// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================

export const loginUser = async (loginData) => {

  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(loginData),
    }
  );

  return parseResponse(response);
};


// =====================================================
// REGISTER
// POST /api/auth/register
// =====================================================

export const registerUser = async (registerData) => {

  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(registerData),
    }
  );

  return parseResponse(response);
};


// =====================================================
// CHANGE PASSWORD
// PUT /api/auth/change-password
// =====================================================

export const changePassword = async (
  changePasswordData
) => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  const response = await fetch(
    `${API_URL}/change-password`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(changePasswordData),
    }
  );

  return parseResponse(response);
};


// =====================================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// =====================================================

export const forgotPassword = async (
  username
) => {

  if (!username || !username.trim()) {
    throw new Error(
      "Username is required."
    );
  }

  const response = await fetch(
    `${API_URL}/forgot-password`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username.trim(),
      }),
    }
  );

  return parseResponse(response);
};


// =====================================================
// RESET PASSWORD
// POST /api/auth/reset-password
// =====================================================

export const resetPassword = async (
  username,
  otp,
  newPassword
) => {

  if (!username || !username.trim()) {
    throw new Error(
      "Username is required."
    );
  }

  if (!otp || !otp.trim()) {
    throw new Error(
      "OTP is required."
    );
  }

  if (!newPassword) {
    throw new Error(
      "New password is required."
    );
  }

  const response = await fetch(
    `${API_URL}/reset-password`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username.trim(),
        otp: otp.trim(),
        newPassword: newPassword,
      }),
    }
  );

  return parseResponse(response);
};