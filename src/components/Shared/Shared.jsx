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
    let stars = [];
    const shootingStars = [];
    
    const initStars = () => {
      stars = [];
      // High density for unmistakable visibility
      const count = Math.floor((window.innerWidth * window.innerHeight) / 1500); 
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 2.0 + 0.4, // Clearly visible
          baseAlpha: Math.random() * 0.6 + 0.4, 
          speed: Math.random() * 0.005 + 0.002,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? '#a5b4fc' : '#fda4af'
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };
    
    resize();
    window.addEventListener('resize', resize);

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.9,
        len: Math.random() * 160 + 100,
        speed: Math.random() * 20 + 14,
        angle: Math.PI * 0.75 + (Math.random() - 0.5) * 0.6,
        life: 0,
        color: Math.random() > 0.5 ? '#a5b4fc' : '#fda4af'
      });
    };

    let t = 0;
    const draw = () => {
      // Solid base layer
      ctx.fillStyle = '#05060f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      
      stars.forEach((s) => {
        const pulse = s.baseAlpha * (0.6 + 0.4 * Math.sin(t * s.speed * 40 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        const colorRgb = s.color === '#a5b4fc' ? '165, 180, 252' : '253, 164, 175';
        ctx.fillStyle = `rgba(${colorRgb}, ${pulse})`;
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (Math.random() < 0.045) createShootingStar();
      
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life += 0.015;
        const opacity = Math.sin(Math.PI * s.life) * 1.0;
        
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          s.x, s.y, 
          s.x - Math.cos(s.angle) * s.len, 
          s.y + Math.sin(s.angle) * s.len
        );
        const colorRgb = s.color === '#a5b4fc' ? '165, 180, 252' : '253, 164, 175';
        gradient.addColorStop(0, `rgba(${colorRgb}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${colorRgb}, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y + Math.sin(s.angle) * s.len);
        ctx.stroke();
        
        s.x += Math.cos(s.angle) * s.speed;
        s.y -= Math.sin(s.angle) * s.speed;
        
        if (s.life >= 1) shootingStars.splice(i, 1);
      }
      animId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => { 
      cancelAnimationFrame(animId); 
      window.removeEventListener('resize', resize); 
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 0, 
        pointerEvents: 'none', 
        background: '#05060f',
        width: '100vw',
        height: '100vh',
        display: 'block'
      }} 
    />
  );
}

export function CursorGlow() {
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -300, y: -300 });
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
    const tick = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 150}px, ${pos.current.y - 150}px)`;
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
      <div ref={glowRef} style={{ position: 'fixed', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(165,180,252,0.1) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none', willChange: 'transform', top: 0, left: 0 }} />
      <div ref={dotRef} style={{ position: 'fixed', width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', zIndex: 9999, pointerEvents: 'none', willChange: 'transform', top: 0, left: 0, transition: 'transform 0.2s ease, background 0.3s ease' }} />
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
        background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
        transformOrigin: '0%',
        zIndex: 10000,
        scaleX,
        opacity: 0.8
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
