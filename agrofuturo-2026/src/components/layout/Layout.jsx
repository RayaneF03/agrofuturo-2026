import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SupportChatWidget from "../ui/SupportChatWidget";
import useIsMobile from "../../hooks/useIsMobile";

export default function Layout({ onLogout }) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-primary)",
      }}
    >
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 90,
            background: "rgba(7, 16, 7, 0.58)",
          }}
        />
      )}

      <Sidebar
        onLogout={onLogout}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div
        style={{
          marginLeft: isMobile ? 0 : "var(--sidebar-width)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header onMenuClick={() => setSidebarOpen((current) => !current)} />
        <main
          style={{
            flex: 1,
            padding: isMobile ? "16px 14px 20px" : "24px",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
        <SupportChatWidget />
      </div>
    </div>
  );
}
