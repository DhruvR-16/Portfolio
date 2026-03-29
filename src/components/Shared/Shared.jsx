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
      const count = Math.floor((window.innerWidth * window.innerHeight) / 8000); 
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
        y: Math.random() * canvas.height * 0.7,
        len: Math.random() * 160 + 200,
        speed: Math.random() * 4 + 1, //  speed of shooting stars
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
      });

      //frequency for shooting stars
      if (Math.random() < 0.005) createShootingStar();
      
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
  const [isNavHovering, setIsNavHovering] = useState(false);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const handleOver = (e) => {
      if (e.target.closest('.nav-item')) {
        setIsNavHovering(true);
        setIsHovering(false);
      } else if (e.target.closest('a, button, .glass')) {
        setIsHovering(true);
        setIsNavHovering(false);
      } else {
        setIsHovering(false);
        setIsNavHovering(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);

    let id;
    const tick = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 150}px, ${pos.current.y - 150}px)`;
        // Fade out the big glow completely when hovering navbar
        glowRef.current.style.opacity = isNavHovering ? '0' : '1';
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px) scale(${isHovering ? 2.5 : (isNavHovering ? 0 : 1)})`;
        dotRef.current.style.opacity = isNavHovering ? '0' : '1';
      }
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => { 
      cancelAnimationFrame(id); 
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [isHovering, isNavHovering]);

  return (
    <>
      <div ref={glowRef} style={{ position: 'fixed', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(165,180,252,0.1) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none', willChange: 'transform, opacity', top: 0, left: 0, transition: 'opacity 0.2s ease' }} />
      <div ref={dotRef} style={{ position: 'fixed', width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', zIndex: 9999, pointerEvents: 'none', willChange: 'transform, opacity', top: 0, left: 0, transition: 'transform 0.2s ease, opacity 0.2s ease, background 0.3s ease' }} />
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

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '1.5rem',
        zIndex: 50,
        pointerEvents: 'none'
      }}
    >
      <motion.div 
        animate={{ 
          background: scrolled ? 'rgba(15, 15, 26, 0.7)' : 'rgba(15, 15, 26, 0.2)',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(4px)'
        }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.4rem',
          borderRadius: '100px',
          pointerEvents: 'auto',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}
      >
        {['hero', 'Projects', 'tech', 'contact'].map(item => (
          <motion.a
            className="nav-item"
            key={item}
            href={`#${item}`}
            whileHover={{ 
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.1)'
            }}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '100px',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              transition: 'color 0.3s ease, background 0.3s ease'
            }}
          >
            {item === 'hero' ? 'Home' : item}
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
}

// Static stars spread throughout the document vertically (0 to 100%)
const INITIAL_STARS = Array.from({ length: 100 }).map(() => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 3 + 1,
  opacity: Math.random() * 0.5 + 0.2
}));

export function BackgroundPlanets() {
  const planets = [
    // Mercury
    { top: 6, right: 15, size: 50, delay: 2.5, style: { background: 'radial-gradient(circle at 30% 30%, #9e9e9e, #333333)' }, hasRing: false },
    // Venus
    { top: 18, left: 10, size: 85, delay: 0.5, style: { background: 'radial-gradient(circle at 30% 30%, #e3bb76, #8c6a3f)' }, hasRing: false },
    // Earth
    { top: 28, right: 25, size: 90, delay: 0, style: { background: 'radial-gradient(circle at 30% 30%, #4b9cd3, #152238)' }, hasRing: false },
    // Mars
    { top: 42, left: 18, size: 70, delay: 1.5, style: { background: 'radial-gradient(circle at 30% 30%, #c1440e, #451804)' }, hasRing: false },
    // Jupiter
    { top: 55, right: 12, size: 150, delay: 2, style: { background: 'linear-gradient(160deg, #d39c7e 0%, #c88b3a 20%, #90614d 40%, #c88b3a 60%, #eaddcf 80%, #90614d 100%)' }, hasRing: false },
    // Saturn
    { top: 72, left: 8, size: 120, delay: 1, style: { background: 'radial-gradient(circle at 30% 30%, #eaddcf, #a47c59)' }, hasRing: true, ringColor: '#eaddcf' },
    // Uranus
    { top: 85, right: 20, size: 100, delay: 1.2, style: { background: 'radial-gradient(circle at 30% 30%, #bce1e8, #4e808c)' }, hasRing: true, ringColor: 'rgba(188, 225, 232, 0.4)' },
    // Neptune
    { top: 96, left: 15, size: 95, delay: 0.8, style: { background: 'radial-gradient(circle at 30% 30%, #3e66bb, #0b1a38)' }, hasRing: false }
  ];

  return (
    <div style={{ position: 'absolute', width: '100vw', height: '100%', top: 0, left: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {INITIAL_STARS.map((s, i) => (
        <div key={`star-${i}`} style={{
          position: 'absolute',
          top: s.top + '%',
          left: s.left + '%',
          width: s.size + 'px',
          height: s.size + 'px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          opacity: s.opacity,
          boxShadow: `0 0 ${s.size * 2}px #fff`
        }}></div>
      ))}
      {planets.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: p.top + '%',
            ...(p.left ? { left: p.left + '%' } : { right: p.right + '%' }),
            width: p.size + 'px',
            height: p.size + 'px',
            borderRadius: '50%',
            opacity: 0.8,
            boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.05)',
            ...p.style
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: [0, -15, 0], opacity: 0.85 }}
          transition={{ 
            y: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
            opacity: { duration: 2 }
          }}
        >
          {p.hasRing && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '180%',
              height: '40%',
              border: `10px solid ${p.ringColor}`,
              borderTop: 'none',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%) rotate(20deg)',
              opacity: 0.7,
              boxShadow: `0 5px 10px rgba(0,0,0,0.5)`,
              zIndex: 1
            }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
