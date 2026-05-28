import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Droplets,
  Cpu,
  Bug,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Activity,
} from "lucide-react";
import { api } from "../../services/api";
import {
  StatCard,
  Card,
  SectionHeader,
  Badge,
  ProgressBar,
} from "../../components/ui";
import { useNotification } from "../../context/NotificationContext";
import useIsMobile from "../../hooks/useIsMobile";

export default function Dashboard() {
  const isMobile = useIsMobile();
  const [stats, setStats] = useState(null);
  const [semanal, setSemanal] = useState([]);
  const [mapaField, setMapaField] = useState(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    api.getDashboardStats().then(setStats);
    api.getConsumoSemanal().then(setSemanal);
    api.getMapaField().then(setMapaField);
  }, []);

  // Notificações automáticas do sistema
  useEffect(() => {
    const notifications = [
      {
        type: "success",
        message: "Sensor #12 sincronizado com sucesso",
        delay: 3000,
      },
      {
        type: "warning",
        message: "Nível de combustível da pulverizadora em 25%",
        delay: 8000,
      },
      {
        type: "info",
        message: "Calibração de sensores concluída",
        delay: 15000,
      },
      {
        type: "success",
        message: "Dados de pulverização foram salvos",
        delay: 22000,
      },
    ];

    const timers = notifications.map((notif) =>
      setTimeout(() => {
        addNotification({
          type: notif.type,
          message: notif.message,
        });
      }, notif.delay),
    );

    return () => timers.forEach(clearTimeout);
  }, [addNotification]);

  if (!stats)
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
          Carregando dados...
        </div>
      </div>
    );

  const statusColor = {
    pulverizando: "success",
    concluido: "info",
    aguardando: "default",
    alerta: "warning",
  };
  const statusLabel = {
    pulverizando: "Pulverizando",
    concluido: "Concluído",
    aguardando: "Aguardando",
    alerta: "Alerta",
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
      className="animate-fadeIn"
    >
      {/* Alert Banner */}
      <div
        style={{
          background: "rgba(212,160,23,0.08)",
          border: "1px solid rgba(212,160,23,0.25)",
          borderRadius: "var(--radius-md)",
          padding: "12px 16px",
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          flexDirection: isMobile ? "column" : "row",
          gap: 10,
        }}
      >
        <AlertTriangle size={16} color="var(--accent-yellow)" />
        <span
          style={{
            fontSize: 13,
            color: "var(--accent-yellow)",
            fontWeight: 500,
          }}
        >
          2 pragas detectadas requerem atenção — Talhão A (Setor 3) e Talhão D
          (Setor 4)
        </span>
        <span
          style={{
            marginLeft: isMobile ? 0 : "auto",
            fontSize: 11,
            color: "var(--accent-yellow)",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Ver detalhes →
        </span>
      </div>

      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 14,
        }}
      >
        <StatCard
          icon={Droplets}
          label="Insumo Hoje"
          value={stats.insumoHoje.toFixed(0)}
          unit="L"
          delta={4.2}
          color="var(--accent-blue)"
        />
        <StatCard
          icon={MapPin}
          label="Hectares Hoje"
          value={stats.hectaresHoje.toFixed(0)}
          unit="ha"
          delta={8.1}
          color="var(--accent-green)"
        />
        <StatCard
          icon={Bug}
          label="Pragas Detectadas"
          value={stats.pragasDetectadas}
          color="var(--accent-red)"
          delta={-12}
        />
        <StatCard
          icon={Cpu}
          label="Sensores Ativos"
          value={`${stats.sensoresAtivos}/${stats.sensoresTotal}`}
          color="var(--accent-green)"
        />
        <StatCard
          icon={Zap}
          label="Eficiência"
          value={`${stats.eficiencia}%`}
          delta={1.5}
          color="var(--accent-yellow)"
        />
        <StatCard
          icon={TrendingUp}
          label="Insumo Total"
          value={(stats.insumoTotal / 1000).toFixed(1)}
          unit="kL"
          delta={18.4}
          color="var(--accent-orange)"
        />
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 16,
        }}
      >
        <Card style={{ padding: 20 }}>
          <SectionHeader
            title="Consumo de Insumo"
            subtitle="Últimos 7 dias (litros/dia)"
          />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={semanal}>
              <defs>
                <linearGradient id="gradInsumo" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--accent-green)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--accent-green)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="dia"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="insumo"
                stroke="var(--accent-green)"
                strokeWidth={2}
                fill="url(#gradInsumo)"
                name="Insumo (L)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: 20 }}>
          <SectionHeader
            title="Hectares Pulverizados"
            subtitle="Últimos 7 dias"
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={semanal} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="dia"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="hectares"
                fill="var(--accent-blue)"
                radius={[4, 4, 0, 0]}
                name="Hectares (ha)"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Talhões status + Sensor Live */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
          gap: 16,
        }}
      >
        <Card style={{ padding: 20 }}>
          <SectionHeader
            title="Status dos Talhões"
            subtitle="Progresso de pulverização por área"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mapaField?.talhoes.map((t) => (
              <div key={t.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {t.nome}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                      {t.cultura}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Badge
                      variant={statusColor[t.status]}
                      label={statusLabel[t.status]}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {t.progresso}%
                    </span>
                  </div>
                </div>
                <ProgressBar
                  value={t.progresso}
                  color={
                    t.status === "alerta"
                      ? "var(--accent-yellow)"
                      : t.status === "concluido"
                        ? "var(--accent-blue)"
                        : "var(--accent-green)"
                  }
                />
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginTop: 3,
                  }}
                >
                  {t.hectares} ha
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 20 }}>
          <SectionHeader
            title="Leitura ao Vivo"
            subtitle="Sensores frontais — John Deere R4045"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                label: "Pressão de Pulverização",
                value: "2.8 bar",
                icon: Activity,
                status: "ok",
              },
              {
                label: "Fluxo de Insumo",
                value: "12.4 L/min",
                icon: Droplets,
                status: "ok",
              },
              {
                label: "Velocidade do Trator",
                value: "8.2 km/h",
                icon: Zap,
                status: "ok",
              },
              {
                label: "Temp. Ambiente",
                value: "31.4 °C",
                icon: Activity,
                status: "alerta",
              },
              {
                label: "Umidade do Solo",
                value: "63.2%",
                icon: Droplets,
                status: "ok",
              },
              {
                label: "Sensor SEN-006",
                value: "Manutenção",
                icon: Cpu,
                status: "erro",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <item.icon size={13} color="var(--text-muted)" />
                  <span
                    style={{ fontSize: 12, color: "var(--text-secondary)" }}
                  >
                    {item.label}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                      color:
                        item.status === "erro"
                          ? "var(--accent-red)"
                          : item.status === "alerta"
                            ? "var(--accent-yellow)"
                            : "var(--text-primary)",
                    }}
                  >
                    {item.value}
                  </span>
                  {item.status === "ok" && (
                    <CheckCircle size={12} color="var(--accent-green)" />
                  )}
                  {item.status === "alerta" && (
                    <AlertTriangle size={12} color="var(--accent-yellow)" />
                  )}
                  {item.status === "erro" && (
                    <AlertTriangle size={12} color="var(--accent-red)" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
