import { useEffect, useMemo, useState } from "react";
import Dialog from "./Dialog";

function buildInitialState(fields, initialValues = {}) {
  return fields.reduce((acc, field) => {
    if (Object.prototype.hasOwnProperty.call(initialValues, field.name)) {
      acc[field.name] = initialValues[field.name];
      return acc;
    }

    if (field.type === "toggle") {
      acc[field.name] = false;
      return acc;
    }

    acc[field.name] = "";
    return acc;
  }, {});
}

function FieldControl({ field, value, onChange }) {
  const baseStyle = {
    width: "100%",
    borderRadius: 10,
    border: "1px solid var(--border)",
    background: "var(--bg-input)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: 13,
    outline: "none",
    padding: "11px 12px",
  };

  if (field.type === "toggle") {
    return (
      <label
        style={{
          minHeight: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "11px 12px",
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--bg-input)",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          {field.label}
        </span>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(field.name, event.target.checked)}
          style={{ width: 16, height: 16, accentColor: "var(--accent-green)" }}
        />
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        rows={field.rows || 4}
        placeholder={field.placeholder || field.label}
        style={{ ...baseStyle, resize: "vertical", minHeight: 96 }}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        style={baseStyle}
      >
        <option value="">Selecione</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={field.type || "text"}
      value={value}
      onChange={(event) => onChange(field.name, event.target.value)}
      placeholder={field.placeholder || field.label}
      style={baseStyle}
    />
  );
}

export default function CadastroModal({
  open,
  title,
  subtitle,
  fields,
  initialValues,
  submitLabel = "Salvar cadastro",
  onClose,
  onSubmit,
}) {
  const memoizedInitial = useMemo(
    () => buildInitialState(fields, initialValues),
    [fields, initialValues],
  );
  const [form, setForm] = useState(memoizedInitial);

  useEffect(() => {
    if (open) setForm(memoizedInitial);
  }, [open, memoizedInitial]);

  const handleChange = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(form);
  };

  return (
    <Dialog
      open={open}
      title={title}
      subtitle={subtitle}
      onClose={onClose}
      maxWidth={820}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--bg-input)",
              color: "var(--text-secondary)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="cadastro-form"
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "1px solid transparent",
              background: "var(--accent-green)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              letterSpacing: "0.04em",
            }}
          >
            {submitLabel}
          </button>
        </div>
      }
    >
      <form id="cadastro-form" onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {fields.map((field) => (
            <label
              key={field.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                gridColumn: field.fullWidth ? "1 / -1" : undefined,
              }}
            >
              {field.type !== "toggle" && (
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  {field.label}
                </span>
              )}
              <FieldControl
                field={field}
                value={form[field.name]}
                onChange={handleChange}
              />
              {field.helper && (
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {field.helper}
                </span>
              )}
            </label>
          ))}
        </div>
      </form>
    </Dialog>
  );
}
