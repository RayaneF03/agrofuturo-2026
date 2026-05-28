import { useState, useEffect } from "react";
import {
  Cpu,
  CheckCircle,
  AlertTriangle,
  Thermometer,
  Droplets,
  Wind,
  Battery,
  Activity,
} from "lucide-react";
import { api } from "../../services/api";
import { Card, Badge, SectionHeader } from "../../components/ui";
import useIsMobile from "../../hooks/useIsMobile";

function SensorCard({ sensor }) {
  const isAlerta = sensor.status === "alerta";
  return (
    <Card
      style={{
        padding: 16,
        borderColor: isAlerta ? "rgba(212,160,23,0.4)" : "var(--border)",
        background: isAlerta ? "rgba(212,160,23,0.04)" : "var(--bg-card)",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              color: isAlerta ? "var(--accent-yellow)" : "var(--accent-green)",
              letterSpacing: "0.06em",
            }}
          >
            {sensor.id}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              marginTop: 2,
            }}
          >
            {sensor.nome}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
          }}
        >
          {isAlerta ? (
            <AlertTriangle size={14} color="var(--accent-yellow)" />
          ) : (
            <CheckCircle size={14} color="var(--accent-green)" />
          )}
          <Badge
            variant={isAlerta ? "warning" : "success"}
            label={isAlerta ? "Alerta" : "Ativo"}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          {
            icon: Thermometer,
            label: "Temp",
            value: `${sensor.temperatura}°C`,
            color: "var(--accent-orange)",
          },
          {
            icon: Droplets,
            label: "Umidade",
            value: `${sensor.umidade}%`,
            color: "var(--accent-blue)",
          },
          {
            icon: Wind,
            label: "Pressão",
            value: `${sensor.pressao} bar`,
            color: "var(--accent-green)",
          },
          {
            icon: Activity,
            label: "Fluxo",
            value: `${sensor.fluxo} L/m`,
            color: "var(--accent-yellow)",
          },
        ].map(({ icon: Icon, label, value, color }, i) => (
          <div
            key={i}
            style={{
              padding: "8px 10px",
              background: "var(--bg-input)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon size={11} color={color} />
            <div>
              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                {label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)",
                }}
              >
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
          paddingTop: 10,
          borderTop: "1px solid var(--border-light)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: "var(--text-muted)",
          }}
        >
          <Battery size={11} />
          <span>{sensor.bateria}%</span>
        </div>
        <div
          style={{
            fontSize: 10,
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {new Date(sensor.ultimaLeitura).toLocaleTimeString("pt-BR")}
        </div>
        <Badge
          variant={sensor.posicao === "Esquerdo" ? "info" : "default"}
          label={sensor.posicao}
        />
      </div>
    </Card>
  );
}

export default function Sensores() {
  const isMobile = useIsMobile();
  const [sensores, setSensores] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    api.getSensores().then(setSensores);
  }, []);

  const filtered = sensores.filter((s) => {
    if (filtro === "ativos") return s.status === "ativo";
    if (filtro === "alertas") return s.status === "alerta";
    if (filtro === "esquerdo") return s.posicao === "Esquerdo";
    if (filtro === "direito") return s.posicao === "Direito";
    return true;
  });

  const ativos = sensores.filter((s) => s.status === "ativo").length;
  const alertas = sensores.filter((s) => s.status === "alerta").length;

  const tabs = [
    { key: "todos", label: `Todos (${sensores.length})` },
    { key: "ativos", label: `Ativos (${ativos})` },
    { key: "alertas", label: `Alertas (${alertas})` },
    { key: "esquerdo", label: "Braço Esq." },
    { key: "direito", label: "Braço Dir." },
  ];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      className="animate-fadeIn"
    >
      {/* Summary bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {[
          {
            label: "Total de Sensores",
            value: sensores.length,
            color: "var(--text-primary)",
          },
          {
            label: "Operando Normal",
            value: ativos,
            color: "var(--accent-green)",
          },
          { label: "Em Alerta", value: alertas, color: "var(--accent-yellow)" },
          {
            label: "Cobertura",
            value: `${((ativos / sensores.length) * 100).toFixed(0)}%`,
            color: "var(--accent-blue)",
          },
        ].map((item, i) => (
          <Card key={i} style={{ padding: "14px 18px", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 700,
                color: item.color,
                letterSpacing: "0.02em",
              }}
            >
              {item.value}
            </div>
            <div
              style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}
            >
              {item.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Diagram: tractor with sensors */}
      <Card style={{ padding: 20 }}>
        <SectionHeader
          title="Diagrama da Pulverizadora"
          subtitle="John Deere R4045 — distribuição dos sensores nos braços"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "16px 0",
          }}
        >
          {/* Braço Esquerdo */}
          <div
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              marginBottom: 4,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            ← Braço Esquerdo
          </div>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {sensores
              .filter((s) => s.posicao === "Esquerdo")
              .map((s) => (
                <div
                  key={s.id}
                  title={s.id}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background:
                      s.status === "alerta"
                        ? "rgba(212,160,23,0.15)"
                        : "rgba(79,191,79,0.12)",
                    border: `1px solid ${s.status === "alerta" ? "var(--accent-yellow)" : "var(--accent-green)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Cpu
                    size={14}
                    color={
                      s.status === "alerta"
                        ? "var(--accent-yellow)"
                        : "var(--accent-green)"
                    }
                  />
                </div>
              ))}
          </div>

          {/* Trator central */}
          <div
            style={{
              margin: "8px 0",
              padding: "10px 32px",
              background: "var(--bg-input)",
              border: "2px solid var(--border)",
              borderRadius: 10,
              fontFamily: "var(--font-display)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--text-secondary)",
            }}
          >
            🚜 JOHN DEERE R4045
          </div>

          {/* Braço Direito */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {sensores
              .filter((s) => s.posicao === "Direito")
              .map((s) => (
                <div
                  key={s.id}
                  title={s.id}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background:
                      s.status === "alerta"
                        ? "rgba(212,160,23,0.15)"
                        : "rgba(79,191,79,0.12)",
                    border: `1px solid ${s.status === "alerta" ? "var(--accent-yellow)" : "var(--accent-green)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Cpu
                    size={14}
                    color={
                      s.status === "alerta"
                        ? "var(--accent-yellow)"
                        : "var(--accent-green)"
                    }
                  />
                </div>
              ))}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              marginTop: 4,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Braço Direito →
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                color: "var(--text-muted)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: "var(--accent-green)",
                  opacity: 0.6,
                }}
              />
              Sensor Ativo
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                color: "var(--text-muted)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: "var(--accent-yellow)",
                  opacity: 0.6,
                }}
              />
              Sensor em Alerta
            </div>
          </div>
        </div>
      </Card>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          overflowX: isMobile ? "auto" : "visible",
          paddingBottom: isMobile ? 4 : 0,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFiltro(t.key)}
            style={{
              padding: "7px 14px",
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 600,
              background:
                filtro === t.key ? "var(--accent-green)" : "var(--bg-card)",
              color: filtro === t.key ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${filtro === t.key ? "transparent" : "var(--border)"}`,
              transition: "all var(--transition)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sensor grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 14,
        }}
      >
        {filtered.map((s) => (
          <SensorCard key={s.id} sensor={s} />
        ))}
      </div>
    </div>
  );
}
