import { useNotification } from "../../context/NotificationContext";
import {
  mockNotifications,
  getRandomNotification,
  getNotificationByType,
} from "../../utils/mockNotifications";
import "./DemoNotifications.css";

export default function DemoNotifications() {
  const { addNotification } = useNotification();

  return (
    <div className="demo-notifications">
      <h3>Demo de Notificações</h3>

      <div className="demo-buttons">
        <button
          className="btn btn-success"
          onClick={() => addNotification(getNotificationByType("success"))}
        >
          ✓ Sucesso
        </button>

        <button
          className="btn btn-error"
          onClick={() => addNotification(getNotificationByType("error"))}
        >
          ✕ Erro
        </button>

        <button
          className="btn btn-warning"
          onClick={() => addNotification(getNotificationByType("warning"))}
        >
          ⚠ Aviso
        </button>

        <button
          className="btn btn-info"
          onClick={() => addNotification(getNotificationByType("info"))}
        >
          ℹ Informação
        </button>

        <button
          className="btn btn-random"
          onClick={() => addNotification(getRandomNotification())}
        >
          🎲 Aleatória
        </button>
      </div>
    </div>
  );
}
