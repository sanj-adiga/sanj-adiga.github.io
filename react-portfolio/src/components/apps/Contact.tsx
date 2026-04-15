import Window from "../window/AppWindow";

const CONTACTS = [
  { label: "Email",      val: "sanjana.adiga@...uwoca", href: "#" },
  { label: "LinkedIn",   val: "linkedin.com/in/sanjana-adiga", href: "https://www.linkedin.com/in/sanjana-adiga/" },
  { label: "GitHub",     val: "github.com/sanj-adiga",    href: "https://www.github.com/sanj-adiga" },
  { label: "Letterboxd", val: "letterboxd.com/s4njana",   href: "https://letterboxd.com/s4njana/" },
  { label: "Spotify",    val: "spotify.com/user/sanjana.adiga", href: "https://open.spotify.com/user/sanjana.adiga" },
];

type ContactProps = {
  visible: boolean;
  onClose: () => void;
  onFocus: () => void;
  z: number;
};

export default function Contact({ visible, onClose, onFocus, z }: ContactProps) {
  return (
    <Window title="Address Book" width={420} height={270} visible={visible} onClose={onClose} onFocus={onFocus} zIndex={z} defaultPos={{ x: 380, y: 190 }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: 130, borderRight: "1px solid #ccc", background: "linear-gradient(180deg,#e4eaf4,#d4ddf0)", padding: "8px 0", flexShrink: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#666", padding: "0 8px 3px", textTransform: "uppercase", letterSpacing: .5 }}>Group</div>
          <div style={{ padding: "3px 10px", fontSize: 12, color: "#333" }}>📁 All Contacts</div>
          <div style={{ height: 1, background: "#bbb", margin: "5px 0" }} />
          <div style={{ fontSize: 9, fontWeight: 700, color: "#666", padding: "0 8px 3px", textTransform: "uppercase", letterSpacing: .5 }}>Name</div>
          <div style={{ padding: "3px 10px", fontSize: 12, background: "linear-gradient(180deg,#4d88d9,#2461bb)", color: "#fff" }}>🧾 Sanjana Adiga</div>
        </div>
        <div style={{ flex: 1, padding: 12, overflowY: "auto", fontFamily: "'Lucida Grande',sans-serif" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <strong style={{ fontSize: 15, color: "#111" }}>Sanjana Adiga</strong>
            <input placeholder="Search" style={{ width: 80, fontSize: 11, padding: "2px 5px", border: "1px solid #aaa", borderRadius: 4 }} />
          </div>
          {CONTACTS.map(c => (
            <div key={c.label} style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 12 }}>
              <strong style={{ color: "#333", minWidth: 72, flexShrink: 0 }}>{c.label}</strong>
              <a href={c.href} target="_blank" rel="noreferrer" style={{ color: "#1a5fac", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
              >{c.val}</a>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #ddd", marginTop: 10, paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#888" }}>1 card</span>
            <button style={{ background: "linear-gradient(180deg,#efefef,#d8d8d8)", border: "1px solid #aaa", borderRadius: 4, padding: "2px 12px", fontSize: 11, cursor: "default" }}>Edit</button>
          </div>
        </div>
      </div>
    </Window>
  );
}