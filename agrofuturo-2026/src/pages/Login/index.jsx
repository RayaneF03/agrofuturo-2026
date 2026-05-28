import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Tractor, Leaf } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";

export default function Login({ onLogin }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErro("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }
    setLoading(true);
    // Simulação — substitua por fetch à API C#
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    localStorage.setItem("agrofuturo-auth", "true");
    onLogin?.();
    navigate("/");
  }

  return (
    <div style={styles.page}>
      {/* Painel esquerdo — visual */}
      {!isMobile && (
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
                Agricultura de
                <br />
                precisão ao seu alcance
              </h2>
              <p style={styles.heroP}>
                Monitore seus sensores, detecte pragas e controle o consumo de
                insumos em tempo real — direto do campo.
              </p>
            </div>

            <div style={styles.stats}>
              {[
                { value: "24", label: "Sensores ativos" },
                { value: "94%", label: "Eficiência média" },
                { value: "22%", label: "Economia de insumo" },
              ].map((s, i) => (
                <div key={i} style={styles.statItem}>
                  <div style={styles.statValue}>{s.value}</div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Decoração */}
            <div style={styles.decoBall1} />
            <div style={styles.decoBall2} />
            <div style={styles.decoLeaf}>
              <Leaf size={160} color="rgba(255,255,255,0.04)" strokeWidth={1} />
            </div>
          </div>
        </div>
      )}

      {/* Painel direito — formulário */}
      <div
        style={{
          ...styles.right,
          padding: isMobile ? "28px 16px" : styles.right.padding,
          minHeight: isMobile ? "100vh" : undefined,
        }}
      >
        <div style={{ ...styles.formBox, maxWidth: isMobile ? 440 : 400 }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={styles.formTitle}>Bem-vindo de volta</h1>
            <p style={styles.formSub}>
              Entre com suas credenciais para continuar
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div style={styles.fieldGroup}>
              <label style={styles.label}>E-mail</label>
              <input
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
                autoComplete="email"
              />
            </div>

            <div style={styles.fieldGroup}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label style={styles.label}>Senha</label>
                <Link to="/recuperar-senha" style={styles.link}>
                  Esqueci minha senha
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  name="senha"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={handleChange}
                  style={{ ...styles.input, paddingRight: 44 }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={styles.eyeBtn}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {erro && <div style={styles.erroBox}>{erro}</div>}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.btnPrimary,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>ou</span>
            <div style={styles.dividerLine} />
          </div>

          <p style={styles.cadastroText}>
            Não tem uma conta?{" "}
            <Link to="/cadastro" style={styles.linkStrong}>
              Criar conta
            </Link>
          </p>
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
  // ── Esquerdo ──────────────────────────────────
  left: {
    width: "45%",
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
    fontSize: 38,
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
  stats: {
    display: "flex",
    gap: 0,
    borderTop: "1px solid rgba(255,255,255,0.07)",
    paddingTop: 28,
  },
  statItem: {
    flex: 1,
    paddingRight: 20,
  },
  statValue: {
    fontFamily: "var(--font-display)",
    fontSize: 28,
    fontWeight: 700,
    color: "#4fbf4f",
    letterSpacing: "0.04em",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 11,
    color: "#5a885a",
    marginTop: 4,
    letterSpacing: "0.04em",
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
  decoLeaf: {
    position: "absolute",
    bottom: -20,
    right: -20,
    pointerEvents: "none",
  },
  // ── Direito ───────────────────────────────────
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
    background: "var(--bg-secondary)",
  },
  formBox: {
    width: "100%",
    maxWidth: 400,
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
    marginTop: 4,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "24px 0",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "var(--border)",
  },
  dividerText: {
    fontSize: 11,
    color: "var(--text-muted)",
    letterSpacing: "0.08em",
  },
  link: {
    fontSize: 11,
    color: "var(--accent-green)",
    textDecoration: "none",
    fontWeight: 500,
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
