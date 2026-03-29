import React from 'react';
import { motion } from 'framer-motion';
import { Starfield, CursorGlow, Divider, ScrollProgress, BackgroundPlanets, TopNav } from './components/Shared/Shared';
import { Hero } from './components/Hero/Hero';
import { Work } from './components/Work/Work';
import { Photography } from './components/Photography/Photography';
import { Thinking } from './components/Thinking/Thinking';
import { Contact } from './components/Contact/Contact';
import './styles/globals.css';

function App() {
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
        <Photography />
        <Divider />
        <Thinking />
        <Divider />
        <Contact />
      </motion.main>
    </div>
  );
}

export default App;
