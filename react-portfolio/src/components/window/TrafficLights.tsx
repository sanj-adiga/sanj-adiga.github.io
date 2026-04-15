import {useState} from "react"

type TrafficLightsProps = {
  onClose: () => void;
};
export default function TrafficLights({ onClose }: TrafficLightsProps) {
  const [hov, setHov] = useState(false);
  const dots = [
    { bg: "#ff5f57", border: "#c84b45", sym: "✕" },
    { bg: "#ffbd2e", border: "#c9922a", sym: "–" },
    { bg: "#28c840", border: "#1f9d31", sym: "+" },
  ];
  return (
    <div
      style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {dots.map(({ bg, border, sym }, i) => (
        <div key={i} onClick={i === 0 ? onClose : undefined} style={{
          width: 12, height: 12, borderRadius: "50%",
          background: bg, border: `1px solid ${border}`,
          cursor: i === 0 ? "pointer" : "default",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, fontWeight: 700, color: "rgba(0,0,0,.5)",
          transition: "filter .1s",
        }}
        onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.12)"}
        onMouseLeave={e => e.currentTarget.style.filter = ""}
        >{hov ? sym : ""}</div>
      ))}
    </div>
  );
}