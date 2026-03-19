import { useLocation } from "react-router-dom";
import { Sun, Moon, Bell, RefreshCw, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useNotification } from "../../context/NotificationContext";
import { useState, useRef, useEffect } from "react";

const titles = {
  "/": "Dashboard",
  "/sensores": "Sensores & Leituras",
  "/mapa": "Mapa do Campo",
  "/pragas": "Pragas Detectadas",
  "/insumos": "Relatório de Insumos",
  "/vendas": "Vendas de Sensores",
  "/configuracoes": "Configurações",
};

const subtitles = {
  "/": "Visão geral da operação em tempo real",
  "/sensores": "Monitoramento dos 24 sensores nos braços da pulverizadora",
  "/mapa": "Visualização geográfica dos talhões e pulverização",
  "/pragas": "Detecções automatizadas por sensor óptico e IA",
  "/insumos": "Consumo, custo e eficiência por área e período",
  "/vendas": "Painel comercial — sensores e kits vendidos",
  "/configuracoes": "Parâmetros do sistema e da pulverizadora",
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { notifications, removeNotification } = useNotification();
  const location = useLocation();
  const title = titles[location.pathname] || "AgroFuturo";
  const subtitle = subtitles[location.pathname] || "";
  const [showNotifications, setShowNotifications] = useState(false);
  const panelRef = useRef(null);

  const now = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Fechar painel ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        // Verificar se o clique foi no botão de notificações
        const notificationButton = event.target.closest(
          'button[title="Notificações"]',
        );
        if (!notificationButton) {
          setShowNotifications(false);
        }
      }
    }

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showNotifications]);

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

  const getIconColor = (type) => {
    switch (type) {
      case "success":
        return "#10b981";
      case "error":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      case "info":
      default:
        return "#3b82f6";
    }
  };

  return (
    <header
      style={{
        height: "var(--header-height)",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            marginTop: 2,
            letterSpacing: "0.02em",
          }}
        >
          {subtitle}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            marginRight: 8,
          }}
        >
          {now}
        </span>

        <button
          onClick={() => window.location.reload()}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-input)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
            transition: "all var(--transition)",
          }}
          title="Atualizar dados"
        >
          <RefreshCw size={14} />
        </button>

        <button
          onClick={() => setShowNotifications(!showNotifications)}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-input)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
            position: "relative",
            transition: "all var(--transition)",
            backgroundColor: showNotifications
              ? "var(--bg-tertiary)"
              : "var(--bg-input)",
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
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {notifications.length > 9 ? "9+" : notifications.length}
            </span>
          )}
        </button>

        {/* Painel de Notificações */}
        {showNotifications && (
          <div
            ref={panelRef}
            style={{
              position: "absolute",
              top: "var(--header-height)",
              right: 24,
              width: 380,
              maxHeight: "calc(100vh - var(--header-height) - 24px)",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-lg)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              animation: "slideDown 0.3s ease-out",
            }}
          >
            {/* Header do Painel */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: 0,
                    marginBottom: 2,
                  }}
                >
                  Notificações
                </h3>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                  {notifications.length === 0
                    ? "Nenhuma notificação"
                    : `${notifications.length} mensagem${notifications.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            {/* Lista de Notificações */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                maxHeight: "calc(100vh - var(--header-height) - 80px)",
              }}
            >
              {notifications.length === 0 ? (
                <div
                  style={{
                    padding: "40px 20px",
                    textAlign: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  <Bell size={32} style={{ opacity: 0.3, marginBottom: 8 }} />
                  <p style={{ fontSize: 13, margin: 0 }}>
                    Nenhuma notificação no momento
                  </p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      transition: "all var(--transition)",
                      "&:hover": {
                        background: "var(--bg-tertiary)",
                      },
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--bg-tertiary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: `${getIconColor(notif.type)}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: getIconColor(notif.type),
                        fontSize: 14,
                        fontWeight: "bold",
                        flexShrink: 0,
                      }}
                    >
                      {getIcon(notif.type)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: 2,
                        }}
                      >
                        {notif.title}
                      </div>
                      {notif.message && (
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--text-muted)",
                            lineHeight: 1.4,
                          }}
                        >
                          {notif.message}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeNotification(notif.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        transition: "color var(--transition)",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--text-secondary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text-muted)")
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <button
          onClick={toggleTheme}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-input)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
            transition: "all var(--transition)",
          }}
          title={theme === "dark" ? "Modo claro" : "Modo escuro"}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background:
              theme === "dark"
                ? "linear-gradient(135deg, var(--accent-green), var(--accent-green-dark))"
                : "var(--bg-input)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: theme === "dark" ? "#fff" : "var(--accent-green-dark)",
            fontFamily: "var(--font-display)",
            border: theme === "light" ? "1px solid var(--border)" : "none",
          }}
        >
          AF
        </div>
      </div>
    </header>
  );
}
