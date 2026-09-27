import { useEffect, useState } from "react";

import {
  getMyNotifications,
  markNotificationAsRead,
} from "../services/notificationService";

import "../NotificationBell.css";


function NotificationBell() {

  const [notifications, setNotifications] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  // =========================
  // LOAD NOTIFICATIONS
  // =========================

  const loadNotifications = async () => {

    try {

      setLoading(true);

      const data =
        await getMyNotifications();

      setNotifications(data);

    } catch (error) {

      console.error(
        "Notification Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    loadNotifications();

  }, []);


  // =========================
  // AUTO REFRESH
  // Every 10 seconds
  // =========================

  useEffect(() => {

    const interval =
      setInterval(() => {

        loadNotifications();

      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);


  // =========================
  // UNREAD COUNT
  // =========================

  const unreadCount =
    notifications.filter(
      (notification) =>
        notification.status === "UNREAD"
    ).length;


  // =========================
  // MARK READ
  // =========================

  const handleNotificationClick =
    async (notification) => {

      if (
        notification.status ===
        "UNREAD"
      ) {

        try {

          await markNotificationAsRead(
            notification.notificationId
          );

          setNotifications((previous) =>
            previous.map((item) =>
              item.notificationId ===
              notification.notificationId
                ? {
                    ...item,
                    status: "READ",
                  }
                : item
            )
          );

        } catch (error) {

          console.error(
            "Mark Read Error:",
            error
          );

        }
      }
    };


  return (

    <div className="notification-container">


      {/* =========================
          BELL
      ========================= */}

      <button
        className="notification-button"
        onClick={() =>
          setOpen(!open)
        }
      >

        🔔


        {unreadCount > 0 && (

          <span className="notification-badge">

            {unreadCount > 99
              ? "99+"
              : unreadCount}

          </span>

        )}

      </button>


      {/* =========================
          DROPDOWN
      ========================= */}

      {open && (

        <div className="notification-dropdown">


          <div className="notification-header">

            <h3>
              Notifications
            </h3>

            {unreadCount > 0 && (

              <span>
                {unreadCount} unread
              </span>

            )}

          </div>


          <div className="notification-list">


            {loading ? (

              <div className="notification-empty">

                Loading...

              </div>

            ) : notifications.length === 0 ? (

              <div className="notification-empty">

                <div>
                  🔔
                </div>

                <p>
                  No notifications
                </p>

              </div>

            ) : (

              notifications.map(
                (notification) => (

                  <div
                    key={
                      notification.notificationId
                    }
                    className={`notification-item ${
                      notification.status ===
                      "UNREAD"
                        ? "unread"
                        : ""
                    }`}
                    onClick={() =>
                      handleNotificationClick(
                        notification
                      )
                    }
                  >

                    <div className="notification-icon">

                      {notification.notificationType ===
                      "DEPOSIT"
                        ? "💰"
                        : notification.notificationType ===
                          "WITHDRAW"
                        ? "💸"
                        : notification.notificationType ===
                          "TRANSFER"
                        ? "🔄"
                        : notification.notificationType ===
                          "ACCOUNT_OPENED"
                        ? "🏦"
                        : notification.notificationType ===
                          "LOGIN_ALERT"
                        ? "🔐"
                        : "🔔"}

                    </div>


                    <div className="notification-content">

                      <strong>
                        {notification.title}
                      </strong>

                      <p>
                        {notification.message}
                      </p>

                      <small>
                        {notification.createdAt
                          ? new Date(
                              notification.createdAt
                            ).toLocaleString()
                          : ""}
                      </small>

                    </div>


                    {notification.status ===
                      "UNREAD" && (

                      <span className="unread-dot">
                      </span>

                    )}

                  </div>

                )
              )

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default NotificationBell;