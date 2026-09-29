const API_URL =
  "http://13.126.207.99:8080/api/admin/employees";

export const createStaff = async (staffData) => {
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
    body: JSON.stringify(staffData),
  });

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  console.log("Create Staff:", response.status, data);

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to create staff (${response.status})`
    );
  }

  return data;
};