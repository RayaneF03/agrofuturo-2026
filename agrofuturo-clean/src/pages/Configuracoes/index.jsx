import { Settings, Cpu, Wifi, Bell, Shield, Save } from "lucide-react";
import { Card, SectionHeader } from "../../components/ui";
import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";

function SettingRow({ label, description, children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 0",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {label}
        </div>
        {description && (
          <div
            style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}
          >
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        background: value ? "var(--accent-green)" : "var(--border)",
        position: "relative",
        cursor: "pointer",
        transition: "background var(--transition)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: value ? 21 : 3,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          transition: "left var(--transition)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}

export default function Configuracoes() {
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotification();

  const [configs, setConfigs] = useState(() => {
    const saved = localStorage.getItem("agrofuturo-config");
    return saved
      ? JSON.parse(saved)
      : {
          lerorsensor: "5s",
          alertassensor: true,
          autocalib: true,
          pressaomax: 3.5,
          velomax: 12,
          paradoalerta: false,
          apijwt: true,
        };
  });

  const handleSave = () => {
    try {
      localStorage.setItem("agrofuturo-config", JSON.stringify(configs));
      addNotification({
        type: "success",
        message: "Configurações salvas com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      addNotification({
        type: "error",
        message: "Erro ao salvar configurações",
      });
    }
  };

  const updateConfig = (key, value) => {
    setConfigs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      className="animate-fadeIn"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Aparência */}
        <Card style={{ padding: 20 }}>
          <SectionHeader
            title="Aparência"
            subtitle="Tema e exibição do sistema"
          />
          <SettingRow
            label="Modo Escuro"
            description="Ativar tema dark no sistema"
          >
            <Toggle value={theme === "dark"} onChange={toggleTheme} />
          </SettingRow>
        </Card>

        {/* Sensores */}
        <Card style={{ padding: 20 }}>
          <SectionHeader
            title="Sensores"
            subtitle="Configurações de leitura e frequência"
          />
          <SettingRow
            label="Intervalo de Leitura"
            description="Frequência de coleta dos sensores"
          >
            <select
              value={configs.lerorsensor}
              onChange={(e) => updateConfig("lerorsensor", e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                fontSize: 12,
                background: "var(--bg-input)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                outline: "none",
              }}
            >
              <option value="500ms">500ms</option>
              <option value="1s">1s</option>
              <option value="5s">5s</option>
              <option value="10s">10s</option>
            </select>
          </SettingRow>
          <SettingRow
            label="Alertas de Sensor"
            description="Notificar quando sensor falhar"
          >
            <Toggle
              value={configs.alertassensor}
              onChange={(val) => updateConfig("alertassensor", val)}
            />
          </SettingRow>
          <SettingRow
            label="Auto-calibração"
            description="Calibrar sensores automaticamente ao ligar"
          >
            <Toggle
              value={configs.autocalib}
              onChange={(val) => updateConfig("autocalib", val)}
            />
          </SettingRow>
        </Card>

        {/* Pulverizadora */}
        <Card style={{ padding: 20 }}>
          <SectionHeader
            title="Pulverizadora"
            subtitle="Parâmetros da John Deere R4045"
          />
          <SettingRow
            label="Pressão Máxima"
            description="Limite de pressão nos bicos (bar)"
          >
            <input
              type="number"
              value={configs.pressaomax}
              onChange={(e) =>
                updateConfig("pressaomax", parseFloat(e.target.value))
              }
              style={{
                width: 80,
                padding: "6px 10px",
                borderRadius: 6,
                fontSize: 12,
                background: "var(--bg-input)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                outline: "none",
                textAlign: "right",
              }}
            />
          </SettingRow>
          <SettingRow
            label="Velocidade Máxima"
            description="Limite de velocidade durante pulverização"
          >
            <input
              type="number"
              value={configs.velomax}
              onChange={(e) =>
                updateConfig("velomax", parseInt(e.target.value))
              }
              style={{
                width: 80,
                padding: "6px 10px",
                borderRadius: 6,
                fontSize: 12,
                background: "var(--bg-input)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                outline: "none",
                textAlign: "right",
              }}
            />
          </SettingRow>
          <SettingRow
            label="Parar em alerta de praga"
            description="Interromper operação ao detectar praga alta"
          >
            <Toggle
              value={configs.paradoalerta}
              onChange={(val) => updateConfig("paradoalerta", val)}
            />
          </SettingRow>
        </Card>

        {/* API / Integração */}
        <Card style={{ padding: 20 }}>
          <SectionHeader
            title="Integração API"
            subtitle="Conexão com backend C#"
          />
          <SettingRow
            label="URL da API"
            description="Endpoint da API AgroFuturo"
          >
            <div />
          </SettingRow>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: "8px 12px",
              background: "var(--bg-input)",
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <input
              defaultValue="https://api.agrofuturo.local/v1"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                color: "var(--text-secondary)",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent-yellow)",
              }}
            />
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
              Offline
            </span>
          </div>
          <SettingRow
            label="Autenticação JWT"
            description="Token de acesso à API"
          >
            <Toggle
              value={configs.apijwt}
              onChange={(val) => updateConfig("apijwt", val)}
            />
          </SettingRow>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button
          onClick={() => {
            const saved = localStorage.getItem("agrofuturo-config");
            if (saved) {
              setConfigs(JSON.parse(saved));
            } else {
              setConfigs({
                lerorsensor: "5s",
                alertassensor: true,
                autocalib: true,
                pressaomax: 3.5,
                velomax: 12,
                paradoalerta: false,
                apijwt: true,
              });
            }
          }}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: "var(--bg-input)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all var(--transition)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--border)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-input)";
          }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: "var(--accent-green)",
            color: "#fff",
            border: "none",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            letterSpacing: "0.04em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all var(--transition)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-green-dark)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(79,191,79,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--accent-green)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Save size={14} />
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
