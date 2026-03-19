import { useState, useRef, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export default function NotificationDropdown() {
  const { notifications, removeNotification } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const colors = {
    success: { bg: "rgba(79,191,79,0.1)", border: "#4fbf4f", text: "#4fbf4f" },
    error: { bg: "rgba(192,57,43,0.1)", border: "#c0392b", text: "#c0392b" },
    warning: { bg: "rgba(212,160,23,0.1)", border: "#d4a017", text: "#d4a017" },
    info: { bg: "rgba(41,128,185,0.1)", border: "#2980b9", text: "#2980b9" },
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isOpen ? "var(--accent-green)" : "var(--bg-input)",
          color: isOpen ? "#fff" : "var(--text-secondary)",
          border: "1px solid var(--border)",
          transition: "all 0.2s ease",
          cursor: "pointer",
          position: "relative",
        }}
        title="Notificações"
      >
        <Bell size={14} />
        {notifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent-red)",
              animation: "pulse 2s infinite",
            }}
          />
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 8,
            width: 360,
            maxHeight: 400,
            borderRadius: 12,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            zIndex: 1000,
            overflowY: "auto",
            animation: "slideDown 0.2s ease",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              top: 0,
              background: "var(--bg-card)",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Notificações
            </span>
            <span
              style={{
                fontSize: 11,
                background: "var(--accent-green)",
                color: "#fff",
                padding: "2px 6px",
                borderRadius: 4,
              }}
            >
              {notifications.length}
            </span>
          </div>

          {notifications.length === 0 ? (
            <div
              style={{
                padding: "24px 16px",
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: 12,
              }}
            >
              Nenhuma notificação
            </div>
          ) : (
            <div style={{ maxHeight: 340, overflowY: "auto" }}>
              {notifications.map((notif) => {
                const style = colors[notif.type] || colors.info;
                return (
                  <div
                    key={notif.id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid var(--border-light)",
                      background: style.bg,
                      borderLeft: `3px solid ${style.border}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 8,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${style.bg}99`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = style.bg;
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: style.text,
                          wordWrap: "break-word",
                        }}
                      >
                        {notif.message}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notif.id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        flexShrink: 0,
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
