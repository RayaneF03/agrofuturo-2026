import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, MessageCircle, SendHorizontal, UserRound } from "lucide-react";
import Dialog from "./Dialog";
import useIsMobile from "../../hooks/useIsMobile";

const suggestedReplies = [
  {
    match: /cadastro|cadastrar|formul[aá]rio/i,
    text: "Os botões de cadastro abrem um pop-up na própria tela. Se quiser, eu posso te orientar em qual campo preencher primeiro.",
  },
  {
    match: /cnpj|cpf/i,
    text: "Os formulários trazem CNPJ da empresa e CPF de quem está criando para identificar o registro.",
  },
  {
    match: /praga|insumo|talh[aã]o|venda/i,
    text: "Essas telas têm o cadastro rápido no canto superior da área principal, sem alterar o layout original.",
  },
];

function makeReply(message) {
  const found = suggestedReplies.find((item) => item.match.test(message));
  return (
    found?.text ||
    "Posso ajudar com cadastro, navegação e dúvidas sobre as telas do AgroFuturo."
  );
}

export default function SupportChatWidget() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "support",
      text: "Olá, sou o suporte do AgroFuturo. Como posso ajudar?",
    },
  ]);
  const messagesEndRef = useRef(null);

  const shortcuts = useMemo(
    () => [
      "Cadastro de praga",
      "Cadastro de insumo",
      "Cadastro de talhão",
      "Cadastro de venda",
    ],
    [],
  );

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, open]);

  const sendMessage = (text) => {
    const value = text.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), author: "user", text: value },
      { id: Date.now() + 1, author: "support", text: makeReply(value) },
    ]);
    setDraft("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Abrir chat de suporte"
        aria-label="Abrir chat de suporte"
        style={{
          position: "fixed",
          right: isMobile ? 16 : 24,
          bottom: isMobile ? 16 : 24,
          zIndex: 1900,
          width: isMobile ? 52 : 60,
          height: isMobile ? 52 : 60,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.16)",
          background:
            "linear-gradient(135deg, var(--accent-green-light), var(--accent-green-dark))",
          color: "#fff",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.24)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MessageCircle size={22} />
      </button>

      <Dialog
        open={open}
        title="Chat de suporte"
        subtitle="Atendimento rápido para cadastro, telas e operação do sistema"
        onClose={() => setOpen(false)}
        maxWidth={460}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut}
                type="button"
                onClick={() => sendMessage(shortcut)}
                style={{
                  padding: "7px 10px",
                  borderRadius: 999,
                  border: "1px solid var(--border)",
                  background: "var(--bg-input)",
                  color: "var(--text-secondary)",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {shortcut}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxHeight: 360,
              overflowY: "auto",
              paddingRight: 4,
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.author === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    flexDirection:
                      message.author === "user" ? "row-reverse" : "row",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background:
                        message.author === "user"
                          ? "rgba(41,128,185,0.16)"
                          : "rgba(79,191,79,0.14)",
                      color:
                        message.author === "user"
                          ? "var(--accent-blue)"
                          : "var(--accent-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {message.author === "user" ? (
                      <UserRound size={14} />
                    ) : (
                      <Bot size={14} />
                    )}
                  </div>
                  <div
                    style={{
                      padding: "11px 12px",
                      borderRadius: 14,
                      background:
                        message.author === "user"
                          ? "rgba(41,128,185,0.12)"
                          : "var(--bg-input)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      fontSize: 13,
                      lineHeight: 1.45,
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
            style={{
              display: "flex",
              gap: 8,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Digite sua mensagem..."
              style={{
                flex: 1,
                minWidth: 0,
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--bg-input)",
                color: "var(--text-primary)",
                padding: "12px 14px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                width: isMobile ? "100%" : 48,
                minWidth: isMobile ? "100%" : 48,
                borderRadius: 12,
                border: "1px solid transparent",
                background: "var(--accent-green)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Enviar mensagem"
            >
              <SendHorizontal size={16} />
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
}
