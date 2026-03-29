import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Starfield, CursorGlow, Divider, ScrollProgress } from './components/Shared/Shared';
import { Hero } from './components/Hero/Hero';
import { Work } from './components/Work/Work';
import { Photography } from './components/Photography/Photography';
import { Thinking } from './components/Thinking/Thinking';
import { Contact } from './components/Contact/Contact';
import { Intro } from './components/Intro/Intro';
import './styles/globals.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', background: 'transparent' }}>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <Intro key="intro" onComplete={() => setShowIntro(false)} />
        ) : (
          <React.Fragment key="content">
            <ScrollProgress />
            <Starfield />
            <CursorGlow />
            <main style={{ position: 'relative', zIndex: 1 }}>
              <Hero />
              <Divider />
              <Work />
              <Divider />
              <Photography />
              <Divider />
              <Thinking />
              <Divider />
              <Contact />
            </main>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
