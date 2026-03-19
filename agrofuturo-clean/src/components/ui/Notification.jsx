import { useNotification } from "../../context/NotificationContext";
import "./notification.css";

export default function Notification() {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`notification notification-${notif.type}`}
        >
          <div className="notification-content">
            <span className="notification-icon">{getIcon(notif.type)}</span>
            <div className="notification-text">
              <div className="notification-title">{notif.title}</div>
              {notif.message && (
                <div className="notification-message">{notif.message}</div>
              )}
            </div>
          </div>
          <button
            className="notification-close"
            onClick={() => removeNotification(notif.id)}
            aria-label="Fechar notificação"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
