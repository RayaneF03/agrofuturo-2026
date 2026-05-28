import { useState, useEffect } from "react";
import {
  MapPin,
  Layers,
  Tractor,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { api } from "../../services/api";
import { Card, SectionHeader, Badge, ProgressBar } from "../../components/ui";
import useIsMobile from "../../hooks/useIsMobile";

const statusConfig = {
  pulverizando: {
    color: "var(--accent-green)",
    label: "Pulverizando",
    icon: Tractor,
  },
  concluido: {
    color: "var(--accent-blue)",
    label: "Concluído",
    icon: CheckCircle,
  },
  aguardando: { color: "var(--text-muted)", label: "Aguardando", icon: Clock },
  alerta: {
    color: "var(--accent-yellow)",
    label: "Alerta",
    icon: AlertTriangle,
  },
};

// Grid-based field visualization
function FieldGrid({ talhoes }) {
  const [hover, setHover] = useState(null);
  const isMobile = useIsMobile();

  const layout = [
    ["A", "A", "B", "B", "B"],
    ["A", "A", "B", "B", "B"],
    ["C", "C", "C", "D", "D"],
    ["C", "C", "E", "D", "D"],
  ];

  const talhaoMap = Object.fromEntries(talhoes.map((t) => [t.id, t]));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {layout.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 3 }}>
          {row.map((cell, ci) => {
            const t = talhaoMap[cell];
            const sc = statusConfig[t.status];
            const isHover = hover === cell;
            const alpha = t.status === "aguardando" ? "15" : "25";
            return (
              <div
                key={`${ri}-${ci}`}
                onMouseEnter={() => setHover(cell)}
                onMouseLeave={() => setHover(null)}
                style={{
                  flex: 1,
                  height: isMobile ? 64 : 80,
                  background: isHover ? `${sc.color}40` : `${sc.color}${alpha}`,
                  border: `1.5px solid ${isHover ? sc.color : sc.color + "60"}`,
                  borderRadius: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Progress fill */}
                {t.status === "pulverizando" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: `${t.progresso}%`,
                      height: "3px",
                      background: sc.color,
                      transition: "width 0.6s ease",
                    }}
                  />
                )}

                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isMobile ? 14 : 18,
                    fontWeight: 700,
                    color: sc.color,
                    letterSpacing: "0.04em",
                  }}
                >
                  {t.id === cell ? t.nome.split(" ")[1] : ""}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  {t.cultura}
                </span>
                {t.status === "pulverizando" && (
                  <div
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: sc.color,
                      animation: "pulse-ring 2s infinite",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Mapa() {
  const isMobile = useIsMobile();
  const [mapaField, setMapaField] = useState(null);
  const [selectedTalhao, setSelectedTalhao] = useState(null);

  useEffect(() => {
    api.getMapaField().then((d) => {
      setMapaField(d);
      setSelectedTalhao(d.talhoes[0]);
    });
  }, []);

  if (!mapaField)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 300,
        }}
      >
        <div
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
          }}
        >
          Carregando...
        </div>
      </div>
    );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      className="animate-fadeIn"
    >
      {/* Status Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {Object.entries(statusConfig).map(([key, conf]) => {
          const count = mapaField.talhoes.filter(
            (t) => t.status === key,
          ).length;
          return (
            <Card
              key={key}
              style={{
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `${conf.color}15`,
                  border: `1px solid ${conf.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <conf.icon size={14} color={conf.color} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 700,
                    color: conf.color,
                  }}
                >
                  {count}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {conf.label}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 320px",
          gap: 16,
        }}
      >
        {/* Field map */}
        <Card style={{ padding: 24 }}>
          <SectionHeader
            title="Mapa dos Talhões"
            subtitle="Visualização da fazenda — clique para detalhes"
            action={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: "var(--text-muted)",
                }}
              >
                <Layers size={13} />5 talhões · 416 ha total
              </div>
            }
          />

          <FieldGrid talhoes={mapaField.talhoes} />

          {/* North indicator */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 12,
              fontSize: 11,
              color: "var(--text-muted)",
              alignItems: "center",
              gap: 4,
            }}
          >
            <MapPin size={12} />
            <span>Fazenda AgroFuturo — Mato Grosso, BR</span>
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid var(--border-light)",
            }}
          >
            {Object.entries(statusConfig).map(([key, conf]) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: "var(--text-muted)",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: conf.color,
                    opacity: 0.7,
                  }}
                />
                {conf.label}
              </div>
            ))}
          </div>
        </Card>

        {/* Side panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionHeader title="Talhões" subtitle="Selecione para detalhes" />
          {mapaField.talhoes.map((t) => {
            const sc = statusConfig[t.status];
            const isSelected = selectedTalhao?.id === t.id;
            return (
              <Card
                key={t.id}
                style={{
                  padding: "14px 16px",
                  cursor: "pointer",
                  borderColor: isSelected ? sc.color : "var(--border)",
                  background: isSelected ? `${sc.color}08` : "var(--bg-card)",
                  transition: "all var(--transition)",
                }}
                onClick={() => setSelectedTalhao(t)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    {t.nome}
                  </span>
                  <Badge
                    variant={
                      t.status === "concluido"
                        ? "info"
                        : t.status === "pulverizando"
                          ? "success"
                          : t.status === "alerta"
                            ? "warning"
                            : "default"
                    }
                    label={sc.label}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginBottom: 8,
                  }}
                >
                  <span>{t.cultura}</span>
                  <span>{t.hectares} ha</span>
                </div>
                {t.status !== "aguardando" && (
                  <ProgressBar
                    value={t.progresso}
                    color={sc.color}
                    height={4}
                  />
                )}
                {t.status !== "aguardando" && (
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-muted)",
                      marginTop: 3,
                    }}
                  >
                    {t.progresso}% concluído
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
