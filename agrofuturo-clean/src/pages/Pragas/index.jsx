import { useState, useEffect } from "react";
import {
  Bug,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { api } from "../../services/api";
import { Card, Badge, SectionHeader } from "../../components/ui";

const severidadeConfig = {
  alta: { variant: "danger", label: "Alta", color: "var(--accent-red)" },
  media: { variant: "warning", label: "Média", color: "var(--accent-yellow)" },
  baixa: { variant: "success", label: "Baixa", color: "var(--accent-green)" },
};

export default function Pragas() {
  const [pragas, setPragas] = useState([]);
  const [filtro, setFiltro] = useState("todas");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.getPragas().then((d) => {
      setPragas(d);
      setSelected(d[0]);
    });
  }, []);

  const filtered = pragas.filter((p) => {
    if (filtro === "ativas") return !p.tratada;
    if (filtro === "tratadas") return p.tratada;
    if (filtro === "alta") return p.severidade === "alta";
    return true;
  });

  const ativas = pragas.filter((p) => !p.tratada).length;
  const tratadas = pragas.filter((p) => p.tratada).length;

  const marcarComoTratada = () => {
    if (!selected || selected.tratada) return;

    const dataTratamento = new Date().toISOString();

    setPragas((prev) =>
      prev.map((p) =>
        p.id === selected.id
          ? { ...p, tratada: true, tratadaEm: dataTratamento }
          : p,
      ),
    );

    setSelected((prev) =>
      prev ? { ...prev, tratada: true, tratadaEm: dataTratamento } : prev,
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      className="animate-fadeIn"
    >
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {[
          {
            label: "Total Detectadas",
            value: pragas.length,
            color: "var(--text-primary)",
          },
          { label: "Não Tratadas", value: ativas, color: "var(--accent-red)" },
          { label: "Tratadas", value: tratadas, color: "var(--accent-green)" },
          {
            label: "Alta Severidade",
            value: pragas.filter((p) => p.severidade === "alta").length,
            color: "var(--accent-yellow)",
          },
        ].map((item, i) => (
          <Card key={i} style={{ padding: "14px 18px", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: item.color,
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

      {/* Filter */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Filter size={14} color="var(--text-muted)" />
        {[
          { key: "todas", label: "Todas" },
          { key: "ativas", label: "Não Tratadas" },
          { key: "tratadas", label: "Tratadas" },
          { key: "alta", label: "Alta Severidade" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFiltro(t.key)}
            style={{
              padding: "6px 14px",
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

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16 }}
      >
        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((p) => {
            const sv = severidadeConfig[p.severidade];
            const isSelected = selected?.id === p.id;
            return (
              <Card
                key={p.id}
                style={{
                  padding: "16px 18px",
                  cursor: "pointer",
                  borderColor: isSelected
                    ? "var(--accent-green)"
                    : p.tratada
                      ? "var(--border-light)"
                      : sv.color + "40",
                  background: isSelected
                    ? "rgba(79,191,79,0.05)"
                    : p.tratada
                      ? "var(--bg-card)"
                      : `${sv.color}06`,
                  opacity: p.tratada ? 0.65 : 1,
                  transition: "all var(--transition)",
                }}
                onClick={() => setSelected(p)}
              >
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <div style={{ fontSize: 28, lineHeight: 1 }}>{p.imagem}</div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        {p.nome}
                      </span>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Badge
                          variant="info"
                          label={p.categoria || "Sem categoria"}
                        />
                        <Badge variant={sv.variant} label={sv.label} />
                        {p.tratada && <Badge variant="info" label="Tratada" />}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        fontStyle: "italic",
                        marginBottom: 6,
                      }}
                    >
                      {p.cientifico}
                    </div>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 11,
                          color: "var(--text-secondary)",
                        }}
                      >
                        <MapPin size={11} />
                        {p.area}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 11,
                          color: "var(--text-muted)",
                        }}
                      >
                        <Calendar size={11} />
                        {new Date(p.detectadaEm).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ position: "sticky", top: 24 }}>
            <Card style={{ padding: 22 }}>
              <SectionHeader title="Detalhes da Praga" />
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 12 }}>
                  {selected.imagem}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {selected.nome}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  {selected.cientifico}
                </p>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <Badge
                    variant={severidadeConfig[selected.severidade].variant}
                    label={`Severidade ${severidadeConfig[selected.severidade].label}`}
                  />
                  {selected.tratada ? (
                    <Badge variant="success" label="✓ Tratada" />
                  ) : (
                    <Badge variant="danger" label="Aguardando Tratamento" />
                  )}
                </div>
              </div>

              {[
                {
                  label: "Categoria",
                  value: selected.categoria || "Sem categoria",
                },
                { label: "Localização", value: selected.area },
                {
                  label: "Coordenadas",
                  value: `${selected.coordenadas[0].toFixed(4)}, ${selected.coordenadas[1].toFixed(4)}`,
                },
                {
                  label: "Detectada em",
                  value: new Date(selected.detectadaEm).toLocaleString("pt-BR"),
                },
                {
                  label: "Status",
                  value: selected.tratada
                    ? "Área tratada"
                    : "Requer tratamento",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "10px 0",
                    borderBottom:
                      i < 4 ? "1px solid var(--border-light)" : "none",
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      textAlign: "right",
                      maxWidth: 180,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              {!selected.tratada && (
                <button
                  onClick={marcarComoTratada}
                  style={{
                    width: "100%",
                    marginTop: 16,
                    padding: "10px",
                    borderRadius: 8,
                    background: "var(--accent-green)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.04em",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity var(--transition)",
                  }}
                >
                  <CheckCircle
                    size={14}
                    style={{ marginRight: 6, verticalAlign: "middle" }}
                  />
                  Marcar como Tratada
                </button>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
