import { useNotification } from "../../context/NotificationContext";
import "./notification.css";

export default function NotificationRenderer() {
  const { notifications } = useNotification();

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {notifications.map((notif) => (
        <Notification key={notif.id} notification={notif} />
      ))}
    </div>
  );
}

function Notification({ notification }) {
  const { removeNotification } = useNotification();

  const colors = {
    success: "#4fbf4f",
    error: "#c0392b",
    warning: "#d4a017",
    info: "#2980b9",
  };

  const bgColors = {
    success: "rgba(79,191,79,0.1)",
    error: "rgba(192,57,43,0.1)",
    warning: "rgba(212,160,23,0.1)",
    info: "rgba(41,128,185,0.1)",
  };

  return (
    <div
      className="notification animate-slideIn"
      style={{
        background: bgColors[notification.type] || bgColors.info,
        border: `1px solid ${colors[notification.type] || colors.info}`,
        borderRadius: 8,
        padding: "12px 16px",
        marginBottom: 10,
        minWidth: 280,
        maxWidth: 400,
        color: colors[notification.type] || colors.info,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        pointerEvents: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
      onClick={() => removeNotification(notification.id)}
    >
      {notification.message}
    </div>
  );
}
