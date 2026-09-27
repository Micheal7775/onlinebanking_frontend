const API_URL =
  "https://online-banking-kgrd.onrender.com/api/notifications";


// =========================
// GET MY NOTIFICATIONS
// =========================

export const getMyNotifications = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(
    `${API_URL}/my`,
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

  console.log(
    "GET NOTIFICATIONS:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to load notifications (${response.status})`
    );
  }

  return data;
};


// =========================
// MARK AS READ
// =========================

export const markNotificationAsRead = async (
  notificationId
) => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(
    `${API_URL}/${notificationId}/read`,
    {
      method: "PUT",

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
    "MARK NOTIFICATION READ:",
    response.status,
    data
  );

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      text ||
      `Failed to mark notification as read (${response.status})`
    );
  }

  return data;
};