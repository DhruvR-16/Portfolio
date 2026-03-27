import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animId;
    const stars = [];
    const shootingStars = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.2,
        baseAlpha: Math.random() * 0.8 + 0.2, 
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const createShootingStar = () => {
      const edge = Math.floor(Math.random() * 3);
      let x, y, angle;
      
      if (edge === 0) {
        x = Math.random() * canvas.width;
        y = -20;
        angle = Math.PI * (0.5 + Math.random() * 0.5);
      } else if (edge === 1) {
        x = canvas.width + 20;
        y = Math.random() * canvas.height * 0.6;
        angle = Math.PI * (0.8 + Math.random() * 0.2);
      } else {
        x = -20;
        y = Math.random() * canvas.height * 0.6;
        angle = Math.PI * (0.0 + Math.random() * 0.2);
      }

      shootingStars.push({
        x,
        y,
        len: Math.random() * 100 + 50,
        speed: Math.random() * 12 + 6,
        angle,
        opacity: 1,
      });
    };

    let t = 0;
    const draw = () => {
      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      t += 0.015;
      
      stars.forEach((s) => {
        const pulse = s.baseAlpha * (0.4 + 0.6 * Math.abs(Math.sin(t * s.speed * 40 + s.phase)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${pulse})`; // Cyan stars
        ctx.fill();
        
        if (s.r > 1.2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(0, 242, 255, 0.4)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      if (Math.random() < 0.012) createShootingStar();
      
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          s.x, s.y, 
          s.x - Math.cos(s.angle) * s.len, 
          s.y + Math.sin(s.angle) * s.len
        );
        gradient.addColorStop(0, `rgba(0, 242, 255, ${s.opacity})`);
        gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y + Math.sin(s.angle) * s.len);
        ctx.stroke();
        
        s.x += Math.cos(s.angle) * s.speed;
        s.y -= Math.sin(s.angle) * s.speed;
        s.opacity -= 0.015;
        
        if (s.opacity <= 0 || s.x < -200 || s.x > canvas.width + 200 || s.y > canvas.height + 200) {
          shootingStars.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#020408' }} />;
}

export function CursorGlow() {
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -300, y: -300 });
  const glow = useRef({ x: -300, y: -300 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const handleOver = (e) => {
      if (e.target.closest('a, button, .glass')) setIsHovering(true);
      else setIsHovering(false);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);

    let id;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      glow.current.x = lerp(glow.current.x, pos.current.x, 0.07);
      glow.current.y = lerp(glow.current.y, pos.current.y, 0.07);
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.current.x - 200}px, ${glow.current.y - 200}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px) scale(${isHovering ? 2.5 : 1})`;
      }
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => { 
      cancelAnimationFrame(id); 
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [isHovering]);

  return (
    <>
      <div ref={glowRef} style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none', willChange: 'transform', top: 0, left: 0 }} />
      <div ref={dotRef} style={{ position: 'fixed', width: 8, height: 8, borderRadius: '50%', background: 'rgba(0, 242, 255, 0.9)', zIndex: 9999, pointerEvents: 'none', willChange: 'transform', mixBlendMode: 'screen', top: 0, left: 0, transition: 'transform 0.2s ease' }} />
    </>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--accent-primary)',
        transformOrigin: '0%',
        zIndex: 10000,
        scaleX
      }}
    />
  );
}

export function SectionLabel({ children }) {
  return <span className="section-label">{children}</span>;
}

export function Divider() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 auto', maxWidth: 760 }} />;
}
