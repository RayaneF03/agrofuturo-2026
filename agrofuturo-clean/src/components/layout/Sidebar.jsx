import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Cpu,
  Map,
  Bug,
  Droplets,
  ShoppingCart,
  Settings,
  ChevronRight,
  Tractor,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/sensores", icon: Cpu, label: "Sensores" },
  { to: "/mapa", icon: Map, label: "Mapa do Campo" },
  { to: "/pragas", icon: Bug, label: "Pragas" },
  { to: "/insumos", icon: Droplets, label: "Insumos" },
  { to: "/vendas", icon: ShoppingCart, label: "Vendas" },
];

const styles = {
  sidebar: {
    width: "var(--sidebar-width)",
    minHeight: "100vh",
    background: "var(--bg-sidebar)",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  },
  logo: {
    padding: "20px 20px 0",
    marginBottom: 8,
  },
  logoInner: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  logoIcon: {
    width: 36,
    height: 36,
    background:
      "linear-gradient(135deg, var(--accent-green), var(--accent-green-dark))",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 700,
    color: "var(--accent-green-dark)",
    letterSpacing: "0.05em",
    lineHeight: 1,
  },
  logoSub: {
    fontSize: 10,
    color: "var(--text-muted)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginTop: 2,
  },
  nav: {
    flex: 1,
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    padding: "8px 8px 4px",
    marginTop: 8,
  },
  footer: {
    padding: "12px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  tractorStatus: {
    background: "rgba(58,155,58,0.1)",
    border: "1px solid rgba(58,155,58,0.2)",
    borderRadius: 8,
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  tractorDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--accent-green)",
    animation: "pulse-ring 2s infinite",
    flexShrink: 0,
  },
  tractorLabel: {
    fontSize: 11,
    color: "var(--text-muted)",
    lineHeight: 1,
  },
  tractorValue: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--accent-green)",
    marginTop: 2,
    fontFamily: "var(--font-mono)",
  },
};

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <div style={styles.logoInner}>
          <div style={styles.logoIcon}>
            <Tractor size={18} color="#fff" />
          </div>
          <div>
            <div style={styles.logoTitle}>AgroFuturo</div>
            <div style={styles.logoSub}>Sistema de Precisão</div>
          </div>
        </div>
      </div>

      <nav style={styles.nav}>
        <div style={styles.navLabel}>Principal</div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive
                ? "var(--text-sidebar-active)"
                : "var(--text-sidebar)",
              background: isActive ? "rgba(79,191,79,0.15)" : "transparent",
              borderLeft: isActive
                ? "3px solid var(--accent-green)"
                : "3px solid transparent",
              transition: "all 0.15s ease",
              textDecoration: "none",
              position: "relative",
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span style={{ flex: 1 }}>{label}</span>
                {isActive && <ChevronRight size={12} />}
              </>
            )}
          </NavLink>
        ))}

        <div style={styles.navLabel}>Sistema</div>
        <NavLink
          to="/configuracoes"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: isActive ? 600 : 400,
            color: isActive
              ? "var(--text-sidebar-active)"
              : "var(--text-sidebar)",
            background: isActive ? "rgba(79,191,79,0.15)" : "transparent",
            borderLeft: isActive
              ? "3px solid var(--accent-green)"
              : "3px solid transparent",
            transition: "all 0.15s ease",
            textDecoration: "none",
          })}
        >
          <Settings size={16} />
          <span>Configurações</span>
        </NavLink>
      </nav>

      <div style={styles.footer}>
        <div style={styles.tractorStatus}>
          <div style={styles.tractorDot} />
          <div>
            <div style={styles.tractorLabel}>John Deere R4045</div>
            <div style={styles.tractorValue}>● OPERANDO</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
