import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Tractor } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";

const plans = [
  {
    id: "basico",
    title: "Básico",
    subtitle: "Até 12 sensores",
    price: "R$ 290/mês",
  },
  { id: "pro", title: "Pro", subtitle: "Até 24 sensores", price: "R$ 490/mês" },
  {
    id: "enterprise",
    title: "Enterprise",
    subtitle: "Sensores ilimitados",
    price: "sob consulta",
  },
];

const benefits = [
  "Leitura ao vivo dos 24 sensores nos braços",
  "Detecção automática de pragas com IA",
  "Relatórios de consumo por talhão e período",
  "Dark mode e interface responsiva",
];

const inputStyle = {
  width: "100%",
  minHeight: 40,
  borderRadius: 10,
  border: "1px solid rgba(66, 120, 66, 0.45)",
  background: "rgba(20, 34, 20, 0.55)",
  color: "#edf8ed",
  padding: "10px 12px",
  fontSize: 14,
  outline: "none",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
};

function PlanCard({ plan, selected, onSelect }) {
  const isActive = selected === plan.id;

  return (
    <button
      type="button"
      onClick={() => onSelect(plan.id)}
      style={{
        minHeight: 82,
        textAlign: "center",
        padding: "14px 12px",
        borderRadius: 10,
        border: `1px solid ${isActive ? "rgba(79,191,79,0.7)" : "rgba(66, 120, 66, 0.45)"}`,
        background: isActive
          ? "rgba(79,191,79,0.08)"
          : "rgba(20, 34, 20, 0.52)",
        color: "#edf8ed",
        boxShadow: isActive ? "0 0 0 1px rgba(79,191,79,0.18)" : "none",
      }}
    >
      <div style={{ fontSize: 14, color: "#f5fff5", fontWeight: 500 }}>
        {plan.title}
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 11,
          color: "rgba(136, 188, 136, 0.92)",
        }}
      >
        {plan.subtitle}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 12,
          color: "rgba(136, 188, 136, 0.82)",
        }}
      >
        {plan.price}
      </div>
    </button>
  );
}

export default function Cadastro({ onRegister }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("basico");
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister?.();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: isMobile ? 12 : 0,
        background:
          "radial-gradient(circle at top, rgba(30,90,30,0.35), transparent 36%), linear-gradient(135deg, #040904 0%, #0c160c 50%, #101f10 100%)",
      }}
    >
      <div
        style={{
          minHeight: isMobile ? "calc(100vh - 24px)" : "100vh",
          border: isMobile ? "1px solid rgba(40, 160, 60, 0.9)" : "none",
          boxShadow: isMobile ? "0 0 0 1px rgba(0, 160, 255, 0.35)" : "none",
          background:
            "linear-gradient(90deg, rgba(7,15,7,0.98) 0%, rgba(16,30,16,0.98) 50%, rgba(17,33,17,0.98) 100%)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          overflow: "hidden",
        }}
      >
        <section
          style={{
            padding: isMobile ? 18 : 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background:
              "linear-gradient(180deg, rgba(3,9,3,0.98), rgba(8,17,8,0.98))",
            color: "#eef9ee",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 11,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(135deg, #62d35f, #2f8f2f)",
                color: "#fff",
                boxShadow: "0 10px 22px rgba(47, 143, 47, 0.25)",
              }}
            >
              <Tractor size={22} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                }}
              >
                AGROFUTURO
              </div>
              <div
                style={{
                  marginTop: 2,
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  color: "rgba(126, 178, 126, 0.72)",
                }}
              >
                SISTEMA DE PULVERIZAÇÃO DE PRECISÃO
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 420, paddingLeft: 18, marginTop: -20 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isMobile ? 30 : 42,
                lineHeight: 0.98,
                letterSpacing: "0.03em",
                color: "#f5fff5",
              }}
            >
              Comece a monitorar sua lavoura hoje
            </h1>
            <p
              style={{
                marginTop: 10,
                maxWidth: 360,
                fontSize: 14,
                lineHeight: 1.55,
                color: "rgba(177, 221, 177, 0.92)",
              }}
            >
              Configure sua conta em menos de 2 minutos e tenha acesso completo
              ao painel de sensores, pragas e relatórios de insumos.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: 10,
              maxWidth: 390,
              paddingLeft: 18,
              marginBottom: 6,
            }}
          >
            {benefits.map((benefit) => (
              <div
                key={benefit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "rgba(224, 245, 224, 0.88)",
                  fontSize: 12,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 999,
                    border: "1px solid rgba(79,191,79,0.85)",
                    display: "grid",
                    placeItems: "center",
                    color: "#62d35f",
                  }}
                >
                  <CheckCircle2 size={13} />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            padding: isMobile ? 18 : 28,
            background:
              "linear-gradient(180deg, rgba(15,31,15,0.95), rgba(18,40,18,0.96))",
            color: "#edf8ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: isMobile ? 520 : 355 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: "#5fbd4f",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  1
                </div>
                <div style={{ fontSize: 14, color: "#f4fff4" }}>Dados</div>
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    background: "rgba(116, 163, 116, 0.2)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: 0.7,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  2
                </div>
                <div style={{ fontSize: 14, color: "rgba(230,240,230,0.55)" }}>
                  Acesso
                </div>
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 34,
                  lineHeight: 1,
                  fontWeight: 800,
                  color: "#f7fff7",
                }}
              >
                Criar Conta
              </h2>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  color: "rgba(173, 218, 173, 0.95)",
                }}
              >
                Preencha todos os seus dados, para continuar
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ marginTop: 28, display: "grid", gap: 14 }}
            >
              <label style={{ display: "grid", gap: 6 }}>
                <span
                  style={{ fontSize: 12, color: "rgba(186, 230, 186, 0.95)" }}
                >
                  Nome Completo <span style={{ color: "#ff6d6d" }}>*</span>
                </span>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span
                  style={{ fontSize: 12, color: "rgba(186, 230, 186, 0.95)" }}
                >
                  Empresa / Fazenda <span style={{ color: "#ff6d6d" }}>*</span>
                </span>
                <input
                  name="empresa"
                  value={form.empresa}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span
                  style={{ fontSize: 12, color: "rgba(186, 230, 186, 0.95)" }}
                >
                  E-mail <span style={{ color: "#ff6d6d" }}>*</span>
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span
                  style={{ fontSize: 12, color: "rgba(186, 230, 186, 0.95)" }}
                >
                  Telefone{" "}
                  <span style={{ color: "rgba(186,230,186,0.6)" }}>
                    (opcional)
                  </span>
                </span>
                <input
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>

              <div style={{ marginTop: 4 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(186, 230, 186, 0.95)",
                    marginBottom: 10,
                  }}
                >
                  Planos
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(3, minmax(0, 1fr))",
                    gap: 12,
                  }}
                >
                  {plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      selected={selectedPlan}
                      onSelect={setSelectedPlan}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: 2,
                  minHeight: 34,
                  borderRadius: 8,
                  background: "linear-gradient(180deg, #3f9a40, #2f7d31)",
                  color: "#f7fff7",
                  border: "none",
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                Cadastrar{" "}
                <ArrowRight
                  size={14}
                  style={{
                    display: "inline",
                    marginLeft: 6,
                    verticalAlign: "-2px",
                  }}
                />
              </button>

              <div
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "rgba(141, 189, 141, 0.92)",
                }}
              >
                Já tem conta?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  style={{ color: "#c9ffb9", fontWeight: 700 }}
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
