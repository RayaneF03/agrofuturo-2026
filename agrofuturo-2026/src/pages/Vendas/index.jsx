import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Package,
  ArrowUpRight,
  PlusCircle,
} from "lucide-react";
import { api } from "../../services/api";
import {
  Card,
  StatCard,
  SectionHeader,
  ProgressBar,
  Badge,
} from "../../components/ui";
import CadastroModal from "../../components/ui/CadastroModal";
import useIsMobile from "../../hooks/useIsMobile";

export default function Vendas() {
  const isMobile = useIsMobile();
  const [vendas, setVendas] = useState(null);
  const [cadastroOpen, setCadastroOpen] = useState(false);

  useEffect(() => {
    api.getVendasSensores().then(setVendas);
  }, []);

  if (!vendas)
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

  const progresso = (vendas.totalVendas / vendas.metaMensal) * 100;
  const cadastroFields = [
    { name: "data", label: "Data", type: "date" },
    { name: "quantidade", label: "Quantidade", type: "number" },
    { name: "valor", label: "Valor", type: "number" },
    { name: "desconto", label: "Desconto", type: "number" },
    {
      name: "cnpjEmpresa",
      label: "CNPJ da empresa",
      type: "text",
      fullWidth: true,
    },
    {
      name: "cpfCriador",
      label: "CPF de quem está criando",
      type: "text",
      fullWidth: true,
    },
  ];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      className="animate-fadeIn"
    >
      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "flex-end",
        }}
      >
        <button
          onClick={() => setCadastroOpen(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            letterSpacing: "0.04em",
            background: "var(--accent-green)",
            color: "#fff",
            border: "none",
          }}
        >
          <PlusCircle size={16} />
          Cadastrar venda
        </button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 14,
        }}
      >
        <StatCard
          icon={DollarSign}
          label="Receita Total"
          value={`R$ ${(vendas.totalVendas / 1000).toFixed(0)}k`}
          delta={vendas.crescimento}
          color="var(--accent-green)"
        />
        <StatCard
          icon={Package}
          label="Unidades Vendidas"
          value={vendas.unidadesVendidas}
          delta={12.3}
          color="var(--accent-blue)"
        />
        <StatCard
          icon={ShoppingCart}
          label="Ticket Médio"
          value={`R$ ${vendas.ticketMedio.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`}
          delta={5.8}
          color="var(--accent-yellow)"
        />
        <StatCard
          icon={TrendingUp}
          label="Crescimento"
          value={`+${vendas.crescimento}%`}
          color="var(--accent-orange)"
        />
      </div>

      {/* Meta mensal */}
      <Card style={{ padding: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            gap: 8,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Meta Mensal
            </div>
            <div
              style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
            >
              R$ {vendas.totalVendas.toLocaleString("pt-BR")} de R${" "}
              {vendas.metaMensal.toLocaleString("pt-BR")}
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 700,
              color:
                progresso >= 100
                  ? "var(--accent-green)"
                  : progresso >= 70
                    ? "var(--accent-yellow)"
                    : "var(--accent-red)",
            }}
          >
            {progresso.toFixed(1)}%
          </div>
        </div>
        <ProgressBar
          value={progresso}
          max={100}
          height={10}
          color={
            progresso >= 80
              ? "var(--accent-green)"
              : progresso >= 60
                ? "var(--accent-yellow)"
                : "var(--accent-red)"
          }
        />
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
          Faltam R${" "}
          {(vendas.metaMensal - vendas.totalVendas).toLocaleString("pt-BR")}{" "}
          para bater a meta
        </div>
      </Card>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 16,
        }}
      >
        <Card style={{ padding: 20 }}>
          <SectionHeader title="Receita por Mês" subtitle="Últimos 6 meses" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={vendas.porMes} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v) => [
                  `R$ ${v.toLocaleString("pt-BR")}`,
                  "Receita",
                ]}
              />
              <Bar
                dataKey="vendas"
                fill="var(--accent-green)"
                radius={[4, 4, 0, 0]}
                name="Receita"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: 20 }}>
          <SectionHeader
            title="Vendas por Modelo"
            subtitle="Receita e margem por produto"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginTop: 4,
            }}
          >
            {vendas.porModelo.map((m, i) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {m.modelo}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                      {m.vendas} un. · Margem {m.margem}%
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent-green)",
                    }}
                  >
                    R$ {(m.receita / 1000).toFixed(0)}k
                  </span>
                </div>
                <ProgressBar
                  value={m.receita}
                  max={Math.max(...vendas.porModelo.map((x) => x.receita))}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Clientes recentes */}
      <Card style={{ padding: 20 }}>
        <SectionHeader
          title="Clientes Recentes"
          subtitle="Últimas vendas realizadas"
        />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Cliente", "Estado", "Sensores", "Valor", "Data", ""].map(
                  (h, i) => (
                    <th
                      key={i}
                      style={{
                        padding: "8px 12px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {vendas.clientes.map((c, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: "1px solid var(--border-light)",
                    transition: "background var(--transition)",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 12px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {c.nome}
                  </td>
                  <td style={{ padding: "12px 12px" }}>
                    <Badge variant="default" label={c.estado} />
                  </td>
                  <td
                    style={{
                      padding: "12px 12px",
                      fontSize: 13,
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {c.sensores} un.
                  </td>
                  <td
                    style={{
                      padding: "12px 12px",
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent-green)",
                    }}
                  >
                    R$ {c.valor.toLocaleString("pt-BR")}
                  </td>
                  <td
                    style={{
                      padding: "12px 12px",
                      fontSize: 11,
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {new Date(c.data).toLocaleDateString("pt-BR")}
                  </td>
                  <td style={{ padding: "12px 12px" }}>
                    <button
                      style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        background: "var(--bg-input)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <ArrowUpRight size={11} /> Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <CadastroModal
        open={cadastroOpen}
        title="Novo cadastro de venda"
        subtitle="Cadastro rápido com CNPJ da empresa e CPF do criador"
        fields={cadastroFields}
        onClose={() => setCadastroOpen(false)}
        onSubmit={() => setCadastroOpen(false)}
        submitLabel="Salvar venda"
      />
    </div>
  );
}
