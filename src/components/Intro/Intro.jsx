import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Intro.css';

const SmokeParticle = ({ x, y, offsetX, offsetY }) => {
  return (
    <motion.div
      initial={{ opacity: 0.6, scale: 0.2, x, y }}
      animate={{ 
        opacity: 0, 
        scale: 2, 
        x: x + offsetX, 
        y: y + offsetY 
      }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="smoke-particle"
      style={{ position: 'absolute', left: 0, top: 0 }}
    />
  );
};

export const Intro = ({ onComplete }) => {
  const [particles, setParticles] = useState([]);

  // Periodically add smoke particles based on current rocket position
  useEffect(() => {
    const interval = setInterval(() => {
      const rocket = document.querySelector('.rocket-container');
      if (rocket) {
        const rect = rocket.getBoundingClientRect();
        // Smoke comes from the bottom-left of the rocket (relative to its rotation)
        // Since it's rotated -45deg, the tail is roughly at the bottom-left diagonal of the container
        const newParticle = {
          id: Date.now() + Math.random(),
          x: rect.left + rect.width * 0.2,
          y: rect.top + rect.height * 0.8,
          offsetX: (Math.random() - 0.5) * 40,
          offsetY: (Math.random() - 0.5) * 40
        };
        setParticles(prev => [...prev.slice(-30), newParticle]);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="mini-planet"
        initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
        animate={{ opacity: 0.6, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div className="planet-ring" />
      </motion.div>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <AnimatePresence>
          {particles.map(p => (
            <SmokeParticle 
              key={p.id} 
              x={p.x} 
              y={p.y} 
              offsetX={p.offsetX} 
              offsetY={p.offsetY} 
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="rocket-container"
        initial={{ x: '-15vw', y: '115vh', rotate: 45 }}
        animate={{ 
          x: '115vw', 
          y: '-15vh', // Diagonal to top right
          rotate: 45
        }}
        transition={{ 
          duration: 3.5, 
          ease: "easeInOut",
        }}
        onAnimationComplete={() => {
          onComplete();
        }}
      >
        <svg 
          viewBox="0 0 24 24" 
          className="rocket-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12,2C12,2 8,6 8,11.5C8,15.1 10,18.5 12,21C14,18.5 16,15.1 16,11.5C16,6 12,2 12,2Z" fill="var(--accent-primary)" />
          <path d="M12,14C10.9,14 10,13.1 10,12C10,10.9 10.9,10 12,10C13.1,10 14,10.9 14,12C14,13.1 13.1,14 12,14Z" fill="var(--bg-dark)" opacity="0.6" />
          <path d="M7,15C7,15 3,17 3,21L7,19L11,21C11,21 7,15 7,15Z" fill="var(--accent-secondary)" />
          <path d="M17,15C17,15 21,17 21,21L17,19L13,21C13,21 17,15 17,15Z" fill="var(--accent-secondary)" />
        </svg>
      </motion.div>
    </motion.div>
  );
};
