import { useLocation } from "react-router-dom";
import { Sun, Moon, RefreshCw, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import NotificationDropdown from "../ui/NotificationDropdown";
import useIsMobile from "../../hooks/useIsMobile";

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

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isMobile = useIsMobile();
  const title = titles[location.pathname] || "AgroFuturo";
  const subtitle = subtitles[location.pathname] || "";

  const now = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header
      style={{
        minHeight: "var(--header-height)",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "10px 12px" : "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        gap: 12,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}
      >
        {isMobile && (
          <button
            type="button"
            onClick={onMenuClick}
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
              flexShrink: 0,
            }}
            aria-label="Abrir menu"
            title="Abrir menu"
          >
            <Menu size={16} />
          </button>
        )}

        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? 16 : 20,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "var(--text-primary)",
              lineHeight: 1.1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h1>
          {!isMobile && (
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
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {!isMobile && (
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
        )}

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

        <NotificationDropdown />

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
              "linear-gradient(135deg, var(--accent-green), var(--accent-green-dark))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-display)",
          }}
        >
          AF
        </div>
      </div>
    </header>
  );
}
