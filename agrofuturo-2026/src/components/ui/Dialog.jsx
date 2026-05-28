import { useEffect } from "react";
import { X } from "lucide-react";

export default function Dialog({
  open,
  title,
  subtitle,
  children,
  footer,
  onClose,
  maxWidth = 760,
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(7, 16, 7, 0.72)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: `min(${maxWidth}px, calc(100vw - 32px))`,
          maxHeight: "calc(100vh - 32px)",
          overflow: "hidden",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "0.04em",
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginTop: 4,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--bg-input)",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Fechar"
            title="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: 20, overflowY: "auto" }}>{children}</div>

        {footer && (
          <div
            style={{
              padding: "16px 20px",
              borderTop: "1px solid var(--border-light)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
