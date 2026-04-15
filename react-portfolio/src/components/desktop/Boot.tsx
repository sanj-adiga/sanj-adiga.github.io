import React, { useEffect, useState  } from "react";
import logo from "../../assets/converted-icons/apple.png"

type BootProps = {
  onDone: () => void;
};
export default function Boot({ onDone }: BootProps) {
  const [phase, setPhase] = useState("gray");
  const [pct,   setPct]   = useState(0);
  const [msg,   setMsg]   = useState("Welcome to Macintosh.");
  const MSGS = ["Welcome to Macintosh.","Loading IP Firewall extension","Starting NetInfo","Starting Directory Services","Starting Core Services","Starting internet services","Starting timed execution services","Starting printing services"];
  useEffect(() => {
    if (sessionStorage.getItem("boot_done")) { onDone(); return; }
    const t = setTimeout(() => setPhase("modal"), 1600);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (phase !== "modal") return;
    let s = 0;
    const iv = setInterval(() => {
      s++; setMsg(MSGS[Math.min(s, MSGS.length - 1)]); setPct(Math.round(s / MSGS.length * 100));
      if (s >= MSGS.length) { clearInterval(iv); setTimeout(() => setPhase("login"), 500); }
    }, 650);
    return () => clearInterval(iv);
  }, [phase]);
  const login = () => { sessionStorage.setItem("boot_done", "1"); onDone(); };
  const shared = { position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" };
  const aqua = "linear-gradient(180deg,#6eb9f7 0%,#3d82d4 45%,#1a5fac 100%)";
  if (phase === "gray") return (
    <div style={{ ...shared as React.CSSProperties, background: "#888", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 64 }}>🍎</div>
      <img src="../../assets/converted-icons/apple.png" alt="" />
      <div style={{ width: 22, height: 22, borderRadius: "50%", border: "3px solid rgba(255,255,255,.25)", borderTopColor: "rgba(255,255,255,.9)", animation: "spin .8s linear infinite" }} />
    </div>
  );
  if (phase === "modal") return (
    <div style={{ ...shared as React.CSSProperties, background: "#888" }}>
      <div style={{ background: "linear-gradient(180deg,#eaeaea,#d2d2d2)", border: "2px solid #aaa", borderRadius: 12, padding: "28px 44px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, boxShadow: "0 10px 40px rgba(0,0,0,.55)", width: 320 }}>
        <div style={{ fontSize: 48 }}>🍎</div>
        <h1 style={{ fontSize: 21, fontWeight: 700, color: "#1a2b4a", fontFamily: "'Lucida Grande',sans-serif", margin: 0 }}>Sanjana's Portfolio</h1>
        <div style={{ width: "100%", height: 12, background: "#c8c8c8", borderRadius: 6, overflow: "hidden", border: "1px solid #aaa" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: aqua, transition: "width .4s ease", borderRadius: 6 }} />
        </div>
        <p style={{ fontSize: 11, color: "#555", fontFamily: "monospace", margin: 0, textAlign: "center" }}>{msg}</p>
      </div>
    </div>
  );
  if (phase === "login") return (
    <div style={{ ...shared as React.CSSProperties, background: "linear-gradient(135deg,#18386a 0%,#275a9a 55%,#18386a 100%)", flexDirection: "column", gap: 14, animation: "fadeIn .6s ease" }}>
      <div style={{ fontSize: 52 }}>🍎</div>
      <h1 style={{ fontSize: 26, fontWeight: 300, color: "#fff", fontFamily: "'Lucida Grande',sans-serif", margin: 0, letterSpacing: 1 }}>Mac OS X</h1>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,.65)", margin: 0 }}>Sanjana's Portfolio</p>
      <div onClick={login} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "14px 28px", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.28)", borderRadius: 12, cursor: "pointer", transition: "background .2s", backdropFilter: "blur(8px)", marginTop: 6 }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.24)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.14)"}
      >
        <div style={{ fontSize: 50 }}>👩🏽‍💻</div>
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Sanjana</span>
        <span style={{ color: "rgba(255,255,255,.55)", fontSize: 11 }}>Click to log in</span>
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
        {["Restart","Shut Down"].map(b => <button key={b} disabled style={{ background: "rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.4)", borderRadius: 6, padding: "4px 16px", fontSize: 12, cursor: "not-allowed" }}>{b}</button>)}
      </div>
    </div>
  );
  return null;
}