import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Tractor, CheckCircle } from "lucide-react";

const PLANOS = [
  {
    id: "basico",
    label: "Básico",
    desc: "Até 12 sensores",
    preco: "R$ 290/mês",
  },
  { id: "pro", label: "Pro", desc: "Até 24 sensores", preco: "R$ 490/mês" },
  {
    id: "enterprise",
    label: "Enterprise",
    desc: "Sensores ilimitados",
    preco: "Sob consulta",
  },
];

export default function Cadastro({ onRegister }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    plano: "pro",
  });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErro("");
  }

  function handleStep1(e) {
    e.preventDefault();
    if (!form.nome || !form.empresa || !form.email) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    setErro("");
    setStep(2);
  }

  async function handleStep2(e) {
    e.preventDefault();
    if (!form.senha || !form.confirmarSenha) {
      setErro("Preencha a senha e a confirmação.");
      return;
    }
    if (form.senha.length < 8) {
      setErro("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    setErro("");
    setLoading(true);
    // Simulação — substitua por fetch à API C#
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep(3);
  }

  if (step === 3) {
    return (
      <div style={styles.page}>
        <div style={styles.left}>
          <div style={styles.leftInner}>
            <div style={styles.logoArea}>
              <div style={styles.logoIcon}>
                <Tractor size={28} color="#fff" />
              </div>
              <div>
                <div style={styles.logoTitle}>AgroFuturo</div>
                <div style={styles.logoSub}>
                  Sistema de Pulverização de Precisão
                </div>
              </div>
            </div>
            <div style={styles.decoBall1} />
            <div style={styles.decoBall2} />
          </div>
        </div>
        <div style={styles.right}>
          <div style={{ ...styles.formBox, textAlign: "center" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(79,191,79,0.12)",
                border: "2px solid var(--accent-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <CheckCircle size={34} color="var(--accent-green)" />
            </div>
            <h1 style={{ ...styles.formTitle, textAlign: "center" }}>
              Conta criada!
            </h1>
            <p
              style={{
                ...styles.formSub,
                textAlign: "center",
                marginBottom: 32,
              }}
            >
              Bem-vindo ao AgroFuturo,{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                {form.nome}
              </strong>
              .<br />
              Sua conta foi criada com sucesso no plano{" "}
              <strong style={{ color: "var(--accent-green)" }}>
                {form.plano}
              </strong>
              .
            </p>
            <button
              onClick={() => {
                localStorage.setItem("agrofuturo-auth", "true");
                onRegister?.();
                navigate("/");
              }}
              style={{ ...styles.btnPrimary, opacity: 1, cursor: "pointer" }}
            >
              Acessar o sistema
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Painel esquerdo */}
      <div style={styles.left}>
        <div style={styles.leftInner}>
          <div style={styles.logoArea}>
            <div style={styles.logoIcon}>
              <Tractor size={28} color="#fff" />
            </div>
            <div>
              <div style={styles.logoTitle}>AgroFuturo</div>
              <div style={styles.logoSub}>
                Sistema de Pulverização de Precisão
              </div>
            </div>
          </div>

          <div style={styles.heroText}>
            <h2 style={styles.heroH2}>
              Comece a monitorar
              <br />
              sua lavoura hoje
            </h2>
            <p style={styles.heroP}>
              Configure sua conta em menos de 2 minutos e tenha acesso completo
              ao painel de sensores, pragas e relatórios de insumo.
            </p>
          </div>

          {/* Benefícios */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "Leitura ao vivo dos 24 sensores nos braços",
              "Detecção automática de pragas com IA",
              "Relatórios de consumo por talhão e período",
              "Dark mode e interface responsiva",
            ].map((item, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(79,191,79,0.15)",
                    border: "1px solid rgba(79,191,79,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle size={11} color="var(--accent-green)" />
                </div>
                <span style={{ fontSize: 13, color: "#7aaa7a" }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={styles.decoBall1} />
          <div style={styles.decoBall2} />
        </div>
      </div>

      {/* Painel direito */}
      <div style={styles.right}>
        <div style={styles.formBox}>
          {/* Steps indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              marginBottom: 32,
            }}
          >
            {[
              { n: 1, label: "Dados" },
              { n: 2, label: "Acesso" },
            ].map(({ n, label }, i) => (
              <div
                key={n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: i === 0 ? 1 : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background:
                        step >= n ? "var(--accent-green)" : "var(--bg-input)",
                      border: `1.5px solid ${step >= n ? "var(--accent-green)" : "var(--border)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: step >= n ? "#fff" : "var(--text-muted)",
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    {step > n ? "✓" : n}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color:
                        step >= n ? "var(--text-primary)" : "var(--text-muted)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i === 0 && (
                  <div
                    style={{
                      flex: 1,
                      height: 1.5,
                      margin: "0 12px",
                      background:
                        step >= 2 ? "var(--accent-green)" : "var(--border)",
                      transition: "background 0.3s",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1 — Dados */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: 24 }}>
                <h1 style={styles.formTitle}>Criar conta</h1>
                <p style={styles.formSub}>Preencha seus dados para começar</p>
              </div>

              <form
                onSubmit={handleStep1}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>
                    Nome completo{" "}
                    <span style={{ color: "var(--accent-red)" }}>*</span>
                  </label>
                  <input
                    name="nome"
                    type="text"
                    placeholder="João da Silva"
                    value={form.nome}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>
                    Empresa / Fazenda{" "}
                    <span style={{ color: "var(--accent-red)" }}>*</span>
                  </label>
                  <input
                    name="empresa"
                    type="text"
                    placeholder="Fazenda São João"
                    value={form.empresa}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>
                    E-mail <span style={{ color: "var(--accent-red)" }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>
                    Telefone{" "}
                    <span
                      style={{ color: "var(--text-muted)", fontWeight: 400 }}
                    >
                      (opcional)
                    </span>
                  </label>
                  <input
                    name="telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={form.telefone}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                {/* Plano */}
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Plano</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {PLANOS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, plano: p.id }))}
                        style={{
                          flex: 1,
                          padding: "10px 6px",
                          borderRadius: 8,
                          cursor: "pointer",
                          border: `1.5px solid ${form.plano === p.id ? "var(--accent-green)" : "var(--border)"}`,
                          background:
                            form.plano === p.id
                              ? "rgba(79,191,79,0.08)"
                              : "var(--bg-input)",
                          transition: "all 0.15s",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color:
                              form.plano === p.id
                                ? "var(--accent-green)"
                                : "var(--text-primary)",
                          }}
                        >
                          {p.label}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "var(--text-muted)",
                            marginTop: 2,
                          }}
                        >
                          {p.desc}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color:
                              form.plano === p.id
                                ? "var(--accent-green)"
                                : "var(--text-muted)",
                            fontWeight: 600,
                            marginTop: 3,
                          }}
                        >
                          {p.preco}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {erro && <div style={styles.erroBox}>{erro}</div>}

                <button
                  type="submit"
                  style={{
                    ...styles.btnPrimary,
                    opacity: 1,
                    cursor: "pointer",
                    marginTop: 4,
                  }}
                >
                  Continuar →
                </button>
              </form>

              <p style={{ ...styles.cadastroText, marginTop: 24 }}>
                Já tem conta?{" "}
                <Link to="/login" style={styles.linkStrong}>
                  Entrar
                </Link>
              </p>
            </>
          )}

          {/* Step 2 — Senha */}
          {step === 2 && (
            <>
              <div style={{ marginBottom: 24 }}>
                <h1 style={styles.formTitle}>Defina sua senha</h1>
                <p style={styles.formSub}>
                  Crie uma senha segura para sua conta
                </p>
              </div>

              <form
                onSubmit={handleStep2}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>
                    Senha <span style={{ color: "var(--accent-red)" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      name="senha"
                      type={showPass ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres"
                      value={form.senha}
                      onChange={handleChange}
                      style={{ ...styles.input, paddingRight: 44 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      style={styles.eyeBtn}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {/* Força da senha */}
                  {form.senha && (
                    <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                      {[1, 2, 3, 4].map((i) => {
                        const forca = Math.min(
                          4,
                          Math.floor(form.senha.length / 3),
                        );
                        const colors = [
                          "var(--accent-red)",
                          "var(--accent-yellow)",
                          "var(--accent-blue)",
                          "var(--accent-green)",
                        ];
                        return (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: 3,
                              borderRadius: 2,
                              background:
                                i <= forca
                                  ? colors[forca - 1]
                                  : "var(--border)",
                              transition: "background 0.2s",
                            }}
                          />
                        );
                      })}
                      <span
                        style={{
                          fontSize: 10,
                          color: "var(--text-muted)",
                          marginLeft: 4,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {["", "Fraca", "Razoável", "Boa", "Forte"][
                          Math.min(4, Math.floor(form.senha.length / 3))
                        ] || ""}
                      </span>
                    </div>
                  )}
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>
                    Confirmar senha{" "}
                    <span style={{ color: "var(--accent-red)" }}>*</span>
                  </label>
                  <input
                    name="confirmarSenha"
                    type={showPass ? "text" : "password"}
                    placeholder="Repita a senha"
                    value={form.confirmarSenha}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      borderColor:
                        form.confirmarSenha &&
                        form.confirmarSenha !== form.senha
                          ? "var(--accent-red)"
                          : form.confirmarSenha &&
                              form.confirmarSenha === form.senha
                            ? "var(--accent-green)"
                            : undefined,
                    }}
                  />
                </div>

                {/* Resumo da conta */}
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 9,
                    background: "var(--bg-input)",
                    border: "1px solid var(--border)",
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: 4,
                    }}
                  >
                    Resumo da conta
                  </div>
                  <div>👤 {form.nome}</div>
                  <div>🏢 {form.empresa}</div>
                  <div>📧 {form.email}</div>
                  <div>
                    📦 Plano{" "}
                    <strong style={{ color: "var(--accent-green)" }}>
                      {PLANOS.find((p) => p.id === form.plano)?.label}
                    </strong>{" "}
                    — {PLANOS.find((p) => p.id === form.plano)?.preco}
                  </div>
                </div>

                {erro && <div style={styles.erroBox}>{erro}</div>}

                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: 9,
                      background: "var(--bg-input)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      ...styles.btnPrimary,
                      flex: 2,
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Criando conta..." : "Criar conta"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "var(--bg-primary)",
  },
  left: {
    width: "42%",
    background:
      "linear-gradient(160deg, #132013 0%, #0a140a 60%, #0d1f0d 100%)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "stretch",
  },
  leftInner: {
    flex: 1,
    padding: "48px 52px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 1,
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  logoIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    background: "linear-gradient(135deg, #4fbf4f, #246024)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(79,191,79,0.3)",
  },
  logoTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 26,
    fontWeight: 700,
    color: "#e8f4e8",
    letterSpacing: "0.06em",
    lineHeight: 1,
  },
  logoSub: {
    fontSize: 11,
    color: "#5a885a",
    letterSpacing: "0.08em",
    marginTop: 3,
    textTransform: "uppercase",
  },
  heroText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroH2: {
    fontFamily: "var(--font-display)",
    fontSize: 36,
    fontWeight: 700,
    color: "#e8f4e8",
    letterSpacing: "0.03em",
    lineHeight: 1.15,
    marginBottom: 18,
  },
  heroP: {
    fontSize: 14,
    color: "#7aaa7a",
    lineHeight: 1.7,
    maxWidth: 340,
  },
  decoBall1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(79,191,79,0.08) 0%, transparent 70%)",
    top: -80,
    right: -80,
    pointerEvents: "none",
  },
  decoBall2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(79,191,79,0.06) 0%, transparent 70%)",
    bottom: 40,
    left: -60,
    pointerEvents: "none",
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
    background: "var(--bg-secondary)",
    overflowY: "auto",
  },
  formBox: {
    width: "100%",
    maxWidth: 420,
  },
  formTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 30,
    fontWeight: 700,
    color: "var(--text-primary)",
    letterSpacing: "0.03em",
    marginBottom: 6,
  },
  formSub: {
    fontSize: 13,
    color: "var(--text-muted)",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-secondary)",
    letterSpacing: "0.04em",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 9,
    border: "1px solid var(--border)",
    background: "var(--bg-input)",
    color: "var(--text-primary)",
    fontSize: 13,
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "var(--font-body)",
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--text-muted)",
    display: "flex",
    alignItems: "center",
    padding: 2,
  },
  erroBox: {
    padding: "10px 14px",
    borderRadius: 8,
    background: "rgba(229,85,71,0.1)",
    border: "1px solid rgba(229,85,71,0.25)",
    fontSize: 12,
    color: "var(--accent-red)",
  },
  btnPrimary: {
    width: "100%",
    padding: "12px",
    borderRadius: 9,
    background: "var(--accent-green)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "var(--font-display)",
    letterSpacing: "0.06em",
    border: "none",
    transition: "opacity 0.15s, transform 0.1s",
  },
  linkStrong: {
    color: "var(--accent-green)",
    fontWeight: 700,
    textDecoration: "none",
  },
  cadastroText: {
    textAlign: "center",
    fontSize: 13,
    color: "var(--text-muted)",
  },
};
