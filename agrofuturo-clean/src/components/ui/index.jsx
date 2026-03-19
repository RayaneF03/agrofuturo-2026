// ── Card ──────────────────────────────────────────────────────────────────
export function Card({ children, style = {}, className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── StatCard ──────────────────────────────────────────────────────────────
export function StatCard({ icon: Icon, label, value, unit, delta, color = 'var(--accent-green)', trend }) {
  return (
    <Card style={{ padding: '18px 20px', animation: 'fadeIn 0.4s ease' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: `${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${color}30`,
        }}>
          {Icon && <Icon size={16} color={color} strokeWidth={2} />}
        </div>
        {delta !== undefined && (
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: delta >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
            background: delta >= 0 ? 'rgba(79,191,79,0.1)' : 'rgba(192,57,43,0.1)',
            padding: '2px 8px', borderRadius: 20,
          }}>
            {delta >= 0 ? '+' : ''}{delta}%
          </span>
        )}
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28, fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '0.02em',
          lineHeight: 1,
        }}>
          {value}
          {unit && (
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 4 }}>
              {unit}
            </span>
          )}
        </div>
        <div style={{
          fontSize: 12, color: 'var(--text-muted)',
          marginTop: 4, letterSpacing: '0.03em',
        }}>
          {label}
        </div>
      </div>
    </Card>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────
export function Badge({ label, variant = 'default' }) {
  const variants = {
    default: { bg: 'var(--bg-input)', color: 'var(--text-secondary)' },
    success: { bg: 'rgba(79,191,79,0.12)', color: 'var(--accent-green)' },
    warning: { bg: 'rgba(212,160,23,0.12)', color: 'var(--accent-yellow)' },
    danger: { bg: 'rgba(192,57,43,0.12)', color: 'var(--accent-red)' },
    info: { bg: 'rgba(41,128,185,0.12)', color: 'var(--accent-blue)' },
  }
  const s = variants[variant] || variants.default
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
      padding: '3px 10px', borderRadius: 20,
      background: s.bg, color: s.color,
    }}>
      {label}
    </span>
  )
}

// ── SectionHeader ─────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 16,
    }}>
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16, fontWeight: 700,
          letterSpacing: '0.04em',
          color: 'var(--text-primary)',
        }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

// ── ProgressBar ───────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = 'var(--accent-green)', height = 6 }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div style={{
      height, borderRadius: height,
      background: 'var(--bg-input)',
      overflow: 'hidden',
    }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: color, borderRadius: height,
        transition: 'width 0.6s ease',
      }} />
    </div>
  )
}

// ── EmptyState ────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '60px 20px', color: 'var(--text-muted)',
      textAlign: 'center',
    }}>
      {Icon && <Icon size={40} strokeWidth={1} style={{ marginBottom: 16, opacity: 0.4 }} />}
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>{title}</div>
      {description && <div style={{ fontSize: 12 }}>{description}</div>}
    </div>
  )
}
