import { useState } from "react";

export default function DeskIcons() {
  const [sel, setSel] = useState<string | null>(null);
  const icons = [
    { id: "resume",   emoji: "📄", label: "Resume.pdf",   href: "https://public.tableau.com/views/MyTableauResume_17478344660870/Tableau_CV" },
    { id: "linkedin", emoji: "💼", label: "LinkedIn.app", href: "https://www.linkedin.com/in/sanjana-adiga/" },
    { id: "github",   emoji: "🐙", label: "Github.app",   href: "https://www.github.com/sanj-adiga" },
  ];
  return (
    <div style={{ position: "fixed", top: 32, right: 12, display: "flex", flexDirection: "column", gap: 6, zIndex: 50 }}>
      {icons.map(ic => (
        <div key={ic.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "5px 8px", borderRadius: 6, cursor: "pointer", background: sel === ic.id ? "rgba(50,100,200,.38)" : "transparent", transition: "background .15s" }}
          onClick={() => setSel(ic.id)} onDoubleClick={() => window.open(ic.href, "_blank", "noopener,noreferrer")}
          onMouseEnter={e => { if (sel !== ic.id) e.currentTarget.style.background = "rgba(255,255,255,.15)"; }}
          onMouseLeave={e => { if (sel !== ic.id) e.currentTarget.style.background = "transparent"; }}
        >
          <span style={{ fontSize: 34, filter: "drop-shadow(0 2px 4px rgba(0,0,0,.45))" }}>{ic.emoji}</span>
          <span style={{ fontSize: 10, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,.8)", fontFamily: "'Lucida Grande',sans-serif", fontWeight: 700, textAlign: "center" }}>{ic.label}</span>
        </div>
      ))}
    </div>
  );
}
