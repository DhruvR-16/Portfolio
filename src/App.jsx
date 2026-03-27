import { Starfield, CursorGlow, Divider } from './components/Shared';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Photography } from './components/Photography';
import { Thinking } from './components/Thinking';
import { Contact } from './components/Contact';
import './styles/globals.css';

function App() {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <Starfield />
      <CursorGlow />
      <main style={{ position: 'relative', zIndex: 2 }}>
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
