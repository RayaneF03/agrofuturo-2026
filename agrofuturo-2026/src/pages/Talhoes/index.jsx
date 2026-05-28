import { useMemo, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Card, Badge, SectionHeader, ProgressBar } from "../../components/ui";
import CadastroModal from "../../components/ui/CadastroModal";

const talhoes = [
  {
    id: "T-01",
    area: 48,
    status: "Plantio",
    percentual: 86,
    data: "2026-05-18",
  },
  {
    id: "T-02",
    area: 32,
    status: "Monitoramento",
    percentual: 74,
    data: "2026-05-15",
  },
  {
    id: "T-03",
    area: 54,
    status: "Pulverização",
    percentual: 61,
    data: "2026-05-11",
  },
  {
    id: "T-04",
    area: 28,
    status: "Repouso",
    percentual: 42,
    data: "2026-05-03",
  },
];

const formFields = [
  {
    name: "identificador",
    label: "Identificador",
    type: "text",
    required: true,
  },
  { name: "area", label: "Área (ha)", type: "number", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["Plantio", "Monitoramento", "Pulverização", "Repouso"],
  },
  { name: "percentual", label: "Percentual", type: "number" },
  { name: "data", label: "Data", type: "date" },
  {
    name: "cnpjEmpresa",
    label: "CNPJ da empresa",
    type: "text",
    required: true,
  },
  {
    name: "cpfCriador",
    label: "CPF de quem está criando",
    type: "text",
    required: true,
  },
];

export default function Talhoes() {
  const [modalOpen, setModalOpen] = useState(false);

  const summary = useMemo(() => {
    const totalArea = talhoes.reduce((acc, item) => acc + item.area, 0);
    const media = Math.round(
      talhoes.reduce((acc, item) => acc + item.percentual, 0) / talhoes.length,
    );

    return {
      totalArea,
      media,
      emAtividade: talhoes.filter((item) => item.status !== "Repouso").length,
    };
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      className="animate-fadeIn"
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid transparent",
            background: "var(--accent-green)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            letterSpacing: "0.04em",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <PlusCircle size={16} />
          Cadastrar talhão
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
        }}
      >
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Área total
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            {summary.totalArea}{" "}
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>ha</span>
          </div>
        </Card>
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Talhões ativos
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 700,
              color: "var(--accent-green)",
            }}
          >
            {summary.emAtividade}
          </div>
        </Card>
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Média de progresso
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 700,
              color: "var(--accent-blue)",
            }}
          >
            {summary.media}%
          </div>
        </Card>
      </div>

      <Card style={{ padding: 20 }}>
        <SectionHeader
          title="Talhões"
          subtitle="Cadastro visual dos talhões sem alterar o layout principal"
        />
        <div style={{ display: "grid", gap: 12 }}>
          {talhoes.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 0.8fr 0.8fr 1.1fr",
                gap: 12,
                alignItems: "center",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--bg-input)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {item.id}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  Criado em {item.data}
                </div>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                {item.area} ha
              </div>
              <Badge
                variant={item.status === "Repouso" ? "warning" : "success"}
                label={item.status}
              />
              <div>
                <ProgressBar
                  value={item.percentual}
                  max={100}
                  color="var(--accent-green)"
                />
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginTop: 4,
                  }}
                >
                  {item.percentual}% concluído
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <CadastroModal
        open={modalOpen}
        title="Novo cadastro de talhão"
        subtitle="Preencha os dados do talhão sem sair da tela atual"
        fields={formFields}
        onClose={() => setModalOpen(false)}
        onSubmit={() => setModalOpen(false)}
        submitLabel="Salvar talhão"
      />
    </div>
  );
}
