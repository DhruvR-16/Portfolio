import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Starfield, CursorGlow, Divider, ScrollProgress, BackgroundPlanets, TopNav } from './components/Shared/Shared';
import { Hero } from './components/Hero/Hero';
import { Work } from './components/Work/Work';
import { TechStack } from './components/TechStack/TechStack';
import { Thinking } from './components/Thinking/Thinking';
import { Contact } from './components/Contact/Contact';
import './styles/globals.css';

function App() {
  useEffect(() => {
    // Prevent the browser from restoring the previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Always start at the top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', background: 'transparent' }}>
      <ScrollProgress />
      <TopNav />
      <Starfield />
      <BackgroundPlanets />
      <CursorGlow />
      <motion.main 
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Hero />
        <Divider />
        <Work />
        <Divider />
        <TechStack />
        <Divider />
        <Divider />
        <Contact />
      </motion.main>
    </div>
  );
}

export default App;
