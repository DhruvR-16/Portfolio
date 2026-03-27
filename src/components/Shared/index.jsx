import { useRef, useEffect } from 'react';

export function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId;
    const stars = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.015 + 0.003,
        drift: (Math.random() - 0.5) * 0.04,
      });
    }
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      stars.forEach((s) => {
        const pulse = s.alpha * (0.7 + 0.3 * Math.sin(t * s.speed * 60 + s.x));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 124, 246, ${pulse})`;
        ctx.fill();
        s.y -= s.speed;
        s.x += s.drift;
        if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
        if (s.x < -2 || s.x > canvas.width + 2) { s.x = Math.random() * canvas.width; }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#05050a' }} />;
}

export function CursorGlow() {
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -300, y: -300 });
  const glow = useRef({ x: -300, y: -300 });
  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);
    let id;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      glow.current.x = lerp(glow.current.x, pos.current.x, 0.07);
      glow.current.y = lerp(glow.current.y, pos.current.y, 0.07);
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.current.x - 200}px, ${glow.current.y - 200}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(id); window.removeEventListener('mousemove', move); };
  }, []);
  return (
    <>
      <div ref={glowRef} style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,124,246,0.08) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none', willChange: 'transform', top: 0, left: 0 }} />
      <div ref={dotRef} style={{ position: 'fixed', width: 8, height: 8, borderRadius: '50%', background: 'rgba(139,124,246,0.9)', zIndex: 9999, pointerEvents: 'none', willChange: 'transform', mixBlendMode: 'screen', top: 0, left: 0 }} />
    </>
  );
}

export function SectionLabel({ children }) {
  return <span className="section-label">{children}</span>;
}

export function Divider() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 auto', maxWidth: 760 }} />;
}
