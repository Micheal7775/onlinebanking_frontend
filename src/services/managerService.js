const API_URL =
  "http://13.126.207.99:8080/api/verification/applications";

const ACCOUNT_API_URL =
  "http://13.126.207.99cmd /c rmdir /s /q .git\rebase-merge:8080/api/manager/accounts";


// =====================================================
// GET TOKEN
// =====================================================

const getToken = () => {

  const token =
    localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Session expired. Please login again."
    );
  }

  return token;
};


// =====================================================
// PARSE RESPONSE
// =====================================================

const parseResponse = async (
  response
) => {

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

  return {
    data,
    text,
  };
};


// =====================================================
// GET SUBMITTED APPLICATIONS
// DOCUMENT VERIFICATION STAFF
// =====================================================

export const getSubmittedApplications =
  async () => {

    const token = getToken();

    const response = await fetch(
      API_URL,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "application/json",
        },
      }
    );


    const {
      data,
      text,
    } =
      await parseResponse(
        response
      );


    console.log(
      "Submitted Applications:",
      response.status,
      data
    );


    if (!response.ok) {

      throw new Error(
        data.message ||
        data.error ||
        text ||
        `Failed to fetch submitted applications (${response.status})`
      );

    }


    return Array.isArray(data)
      ? data
      : [];
  };


// =====================================================
// GET ALL APPLICATIONS
// =====================================================

export const getAllApplications =
  async () => {

    const token = getToken();

    const response = await fetch(
      `${API_URL}/all`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "application/json",
        },
      }
    );


    const {
      data,
      text,
    } =
      await parseResponse(
        response
      );


    console.log(
      "All Applications:",
      response.status,
      data
    );


    if (!response.ok) {

      throw new Error(
        data.message ||
        data.error ||
        text ||
        `Failed to fetch applications (${response.status})`
      );

    }


    return Array.isArray(data)
      ? data
      : [];
  };


// =====================================================
// GET ALL APPLICATIONS
// ACCOUNT OPENING STAFF
// =====================================================

export const getAllApplicationsForStaff =
  async () => {

    const token = getToken();

    const response = await fetch(
      `${API_URL}/staff/all`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "application/json",
        },
      }
    );


    const {
      data,
      text,
    } =
      await parseResponse(
        response
      );


    console.log(
      "Staff Applications:",
      response.status,
      data
    );


    if (!response.ok) {

      throw new Error(
        data.message ||
        data.error ||
        text ||
        `Failed to fetch staff applications (${response.status})`
      );

    }


    return Array.isArray(data)
      ? data
      : [];
  };


// =====================================================
// GET VERIFIED APPLICATIONS
// BANK MANAGER
//
// Document Staff already verified.
// Manager gets VERIFIED applications only.
// =====================================================

export const getVerifiedApplications =
  async () => {

    const token = getToken();

    const response = await fetch(
      `${API_URL}/verified`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "application/json",
        },
      }
    );


    const {
      data,
      text,
    } =
      await parseResponse(
        response
      );


    console.log(
      "Verified Applications:",
      response.status,
      data
    );


    if (!response.ok) {

      throw new Error(
        data.message ||
        data.error ||
        text ||
        `Failed to fetch verified applications (${response.status})`
      );

    }


    return Array.isArray(data)
      ? data
      : [];
  };


// =====================================================
// DOCUMENT VERIFICATION STAFF
// VERIFY / REJECT
//
// SUBMITTED → VERIFIED
// SUBMITTED → REJECTED
// =====================================================

export const verifyApplication =
  async (
    applicationId,
    verified,
    remarks = ""
  ) => {

    const token = getToken();


    const response = await fetch(
      `${API_URL}/${applicationId}/verify`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          verified:
            verified,

          remarks:
            remarks,
        }),
      }
    );


    const {
      data,
      text,
    } =
      await parseResponse(
        response
      );


    console.log(
      "Verification Response:",
      response.status,
      data
    );


    if (!response.ok) {

      throw new Error(
        data.message ||
        data.error ||
        text ||
        `Failed to process verification (${response.status})`
      );

    }


    return data;
  };


// =====================================================
// BANK MANAGER
// APPROVE / REJECT
//
// VERIFIED → APPROVED
// VERIFIED → REJECTED
// =====================================================

export const approveApplication =
  async (
    applicationId,
    approved
  ) => {

    const token = getToken();


    const response = await fetch(
      `${API_URL}/${applicationId}/approve`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          approved:
            approved,
        }),
      }
    );


    const {
      data,
      text,
    } =
      await parseResponse(
        response
      );


    console.log(
      "Approval Response:",
      response.status,
      data
    );


    if (!response.ok) {

      throw new Error(
        data.message ||
        data.error ||
        text ||
        `Failed to process approval (${response.status})`
      );

    }


    return data;
  };


// =====================================================
// CREATE ACCOUNT
//
// Called AFTER Manager approves
// =====================================================

export const createAccount =
  async (
    applicationId
  ) => {

    const token = getToken();


    const response = await fetch(
      `${ACCOUNT_API_URL}/create/${applicationId}`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "application/json",
        },
      }
    );


    const {
      data,
      text,
    } =
      await parseResponse(
        response
      );


    console.log(
      "Create Account Response:",
      response.status,
      data
    );


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
// GET ALL CUSTOMER ACCOUNTS
// =====================================================

export const getAllAccounts =
  async () => {

    const token = getToken();


    const response = await fetch(
      `${ACCOUNT_API_URL}/account`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "application/json",
        },
      }
    );


    const {
      data,
      text,
    } =
      await parseResponse(
        response
      );


    console.log(
      "All Accounts:",
      response.status,
      data
    );


    if (!response.ok) {

      throw new Error(
        data.message ||
        data.error ||
        text ||
        `Failed to fetch accounts (${response.status})`
      );

    }


    return Array.isArray(data)
      ? data
      : [];
  };


// =====================================================
// GET ACCOUNT BY ACCOUNT NUMBER
// =====================================================

export const getAccountByNumber =
  async (
    accountNumber
  ) => {

    const token = getToken();


    if (!accountNumber) {

      throw new Error(
        "Account number is required."
      );

    }


    const response = await fetch(
      `${ACCOUNT_API_URL}/account/${encodeURIComponent(
        accountNumber
      )}`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "application/json",
        },
      }
    );


    const {
      data,
      text,
    } =
      await parseResponse(
        response
      );


    console.log(
      "Account Response:",
      response.status,
      data
    );


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