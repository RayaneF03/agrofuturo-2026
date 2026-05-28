import { useEffect } from "react";
import { X } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";

export default function Dialog({
  open,
  title,
  subtitle,
  children,
  footer,
  onClose,
  maxWidth = 760,
}) {
  const isMobile = useIsMobile();

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
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "center",
        padding: isMobile ? 8 : 16,
      }}
    >
      <div
        style={{
          width: isMobile ? "100%" : `min(${maxWidth}px, calc(100vw - 32px))`,
          maxHeight: isMobile ? "calc(100vh - 16px)" : "calc(100vh - 32px)",
          overflow: "hidden",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: isMobile ? "16px" : "20px",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: isMobile ? "14px 16px" : "18px 20px",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 16,
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isMobile ? 16 : 18,
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
              flexShrink: 0,
            }}
            aria-label="Fechar"
            title="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: isMobile ? 16 : 20, overflowY: "auto" }}>
          {children}
        </div>

        {footer && (
          <div
            style={{
              padding: isMobile ? "14px 16px" : "16px 20px",
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
