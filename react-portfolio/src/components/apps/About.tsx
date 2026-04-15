import Window from "../window/AppWindow"

type AboutProps = {
  visible: boolean;
  onClose: () => void;
  onFocus: () => void;
  z: number;
};

export default function About({ visible, onClose, onFocus, z }: AboutProps) {
  return (
    <Window title="Sanjana Adiga" width={260} height={200} visible={visible} onClose={onClose} onFocus={onFocus} zIndex={z} defaultPos={{ x: 80, y: 80 }}>
      <div style={{ padding: 20, textAlign: "center", fontFamily: "'Lucida Grande',sans-serif", background: "linear-gradient(180deg,#f0f0f0,#e0e0e0)", height: "100%" }}>
        <div style={{ fontSize: 52, marginBottom: 6 }}>🍎</div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a2b4a", margin: "0 0 4px" }}>Sanjana Adiga</h2>
        <p style={{ fontSize: 11, color: "#555", margin: "2px 0" }}>Version 10.2 (Jaguar)</p>
        <p style={{ fontSize: 11, color: "#555", margin: "2px 0" }}>Built with React / TypeScript</p>
        <p style={{ fontSize: 11, color: "#555", margin: "8px 0 2px" }}>Sanjana Adiga © 2026</p>
      </div>
    </Window>
  );
}
