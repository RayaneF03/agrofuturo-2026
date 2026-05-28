import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const plans = [
  {
    id: "basico",
    label: "Plano Básico",
    description: "Controle operacional e monitoramento inicial",
  },
  {
    id: "pro",
    label: "Plano Pro",
    description: "Automação, relatórios e suporte avançado",
  },
  {
    id: "precision",
    label: "Precision",
    description: "Operação completa com foco em precisão",
  },
];

const inputStyle = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--bg-input)",
  color: "var(--text-primary)",
  padding: "12px 14px",
  fontSize: 14,
  outline: "none",
};

export default function Cadastro({ onRegister }) {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("precision");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cnpj: "",
    senha: "",
    confirmarSenha: "",
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
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        background:
          "linear-gradient(135deg, rgba(58,155,58,0.16), rgba(15,31,15,0.08))",
      }}
    >
      <div
        style={{
          padding: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(160deg, rgba(26,46,26,0.96), rgba(15,31,15,0.98))",
          color: "#e8f4e8",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <ShieldCheck size={18} />
            AgroFuturo
          </div>

          <h1
            style={{
              marginTop: 28,
              fontFamily: "var(--font-display)",
              fontSize: 56,
              lineHeight: 0.95,
              letterSpacing: "0.05em",
            }}
          >
            Cadastre sua operação com precisão.
          </h1>
          <p
            style={{
              marginTop: 18,
              maxWidth: 520,
              color: "rgba(232,244,232,0.78)",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            Configure a conta da empresa, identifique quem está criando o acesso
            e escolha o plano ideal para o uso da plataforma.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            marginTop: 28,
          }}
        >
          {[
            {
              icon: Building2,
              title: "Empresa",
              text: "Inclua o CNPJ para vincular a operação.",
            },
            {
              icon: UserRound,
              title: "Responsável",
              text: "CPF de quem está criando o cadastro.",
            },
            {
              icon: BadgeCheck,
              title: "Plano",
              text: "Seleção visual sem sair do formulário.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: 16,
                borderRadius: 16,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <item.icon size={18} />
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  marginTop: 12,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(232,244,232,0.72)",
                  marginTop: 6,
                  lineHeight: 1.5,
                }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 540,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 24,
            boxShadow: "var(--shadow-lg)",
            padding: 28,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Criar conta
            </h2>
            <p
              style={{ marginTop: 6, fontSize: 13, color: "var(--text-muted)" }}
            >
              Preencha os dados da empresa e do responsável pelo acesso.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ marginTop: 22, display: "grid", gap: 14 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <label style={{ display: "grid", gap: 6 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  Nome completo
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
                  style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  E-mail
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <label style={{ display: "grid", gap: 6 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  Telefone
                </span>
                <input
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
              <label style={{ display: "grid", gap: 6 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  CPF
                </span>
                <input
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
            </div>

            <label style={{ display: "grid", gap: 6 }}>
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  fontWeight: 600,
                }}
              >
                CNPJ da empresa
              </span>
              <input
                name="cnpj"
                value={form.cnpj}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <label style={{ display: "grid", gap: 6 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  Senha
                </span>
                <input
                  name="senha"
                  type="password"
                  value={form.senha}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
              <label style={{ display: "grid", gap: 6 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  Confirmar senha
                </span>
                <input
                  name="confirmarSenha"
                  type="password"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
            </div>

            <div style={{ marginTop: 6 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                Selecione o plano
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    style={{
                      textAlign: "left",
                      padding: 14,
                      borderRadius: 14,
                      border: `1px solid ${selectedPlan === plan.id ? "var(--accent-green)" : "var(--border)"}`,
                      background:
                        selectedPlan === plan.id
                          ? "rgba(79,191,79,0.08)"
                          : "var(--bg-input)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <strong
                        style={{ fontSize: 14, color: "var(--text-primary)" }}
                      >
                        {plan.label}
                      </strong>
                      <span
                        style={{ fontSize: 11, color: "var(--text-muted)" }}
                      >
                        {selectedPlan === plan.id
                          ? "Selecionado"
                          : "Selecionar"}
                      </span>
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        color: "var(--text-muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {plan.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: 8,
                padding: "14px 18px",
                borderRadius: 14,
                background: "var(--accent-green)",
                color: "#fff",
                border: "none",
                fontFamily: "var(--font-display)",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              Criar conta
            </button>
          </form>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "var(--text-muted)",
              fontSize: 12,
            }}
          >
            <Mail size={14} />
            <Phone size={14} />
            Acesso criado com a mesma identidade visual do sistema.
          </div>
        </div>
      </div>
    </div>
  );
}
