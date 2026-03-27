import { Starfield, CursorGlow, Divider, ScrollProgress } from './components/Shared/Shared';
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
    </div>
  );
}

export default App;
