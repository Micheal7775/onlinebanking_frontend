const API_URL =
  "https://online-banking-kgrd.onrender.com/api/verification/applications";

const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  return token;
};

const parseResponse = async (response) => {
  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  return { data, text };
};

export const getSubmittedApplications = async () => {
  const token = getToken();

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const { data, text } = await parseResponse(response);

  console.log("Submitted Applications:", response.status, data);

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

export const verifyApplication = async (
  applicationId,
  verified
) => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/${applicationId}/verify`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        verified: verified,
      }),
    }
  );

  const { data, text } = await parseResponse(response);

  console.log("Verification Response:", response.status, data);

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