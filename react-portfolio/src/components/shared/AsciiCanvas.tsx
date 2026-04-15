import {useRef, useEffect } from "react";

type Point = {
  ch: string;
  ox: number;
  oy: number;
  fx: number;
  fy: number;
};

export default function AsciiCanvas() {
  const ref   = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const raf   = useRef<number | null>(null);
  useEffect(() => {
    const c = ref.current; 
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const fs = 10, pad = 5;
    const art = `                                                            
_ ,,         ,,          ,, gp                              
'7MM         db          db \//                              
  MM                        '                              
  MMpMMMb. '7MM        '7MM   '7MMpMMMb.pMMMb.              
  MM    MM   MM          MM     MM    MM    MM              
  MM    MM   MM          MM     MM    MM    MM              
  MM    MM   MM  ,,      MM     MM    MM    MM              
.JMML  JMML.JMML.dg    .JMML. .JMML  JMML  JMML.            
                 ,j         ,,                              
                ,'          db                              
                                                            
,pP"Ybd  ,6"Yb. '7MMpMMMb.'7MM  ,6"Yb. '7MMpMMMb.   ,6"Yb.  
8I   '" 8)   MM   MM    MM  MM 8)   MM   MM    MM  8)   MM  
'YMMMa.  ,pm9MM   MM    MM  MM  ,pm9MM   MM    MM   ,pm9MM  
L.   I8 8M   MM   MM    MM  MM 8M   MM   MM    MM  8M   MM  
M9mmmP' 'Moo9^Yo.JMML  JMML.MM 'Moo9^Yo.JMML  JMML.'Moo9^Yo.
                         QO MP                              
                         'bmP                               
`;
    const lines = art.split("\n");
    const cols  = Math.max(...lines.map(l => l.length));
    const rows  = lines.length;
    const dpr = window.devicePixelRatio || 1;
    const W = 620, H = 170;
    c.width = W * dpr; c.height = H * dpr;
    c.style.width = W + "px"; c.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `bold ${fs}px monospace`;
    const pts: Point[] = [];
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        const ox = x * fs + pad, oy = y * (fs + 1) + pad + fs;
        pts.push({ ch: lines[y][x] || " ", ox, oy, fx: 0, fy: 0 });
      }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouse.current;
      ctx.fillStyle = "#1a2b4a";
      for (const p of pts) {
        const dx = p.ox - mx, 
        dy = p.oy - my, 
        d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) { 
            const a = Math.atan2(dy, dx), 
            f = ((80 - d) / 80) * 11; 
            p.fx = Math.cos(a) * f; 
            p.fy = Math.sin(a) * f; }
        else { 
            p.fx *= .87; 
            p.fy *= .87; 
        }
        ctx.fillText(p.ch, p.ox + p.fx, p.oy + p.fy);
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    const mv = (e: MouseEvent) => { 
        const r = c.getBoundingClientRect(); 
        mouse.current = { 
            x: e.clientX - r.left, 
            y: e.clientY - r.top 
        }; 
    };
    const ml = () => { 
        mouse.current = { x: -999, y: -999 }; 
    };
    c.addEventListener("mousemove", mv); 
    c.addEventListener("mouseleave", ml);
    return () => { 
        if (raf.current) cancelAnimationFrame(raf.current);
        c.removeEventListener("mousemove", mv); 
        c.removeEventListener("mouseleave", ml); 
    };
  }, []);
  return <canvas ref={ref} style={{ display: "block", maxWidth: "100%" }} />;
}