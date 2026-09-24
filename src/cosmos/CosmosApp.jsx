import { Universe } from './Universe';
import { Hero } from './Hero';
import { ScrollRail } from './ScrollRail';
import { Cursor } from './Cursor';
import { Nav, About, Worlds, Research, Contact } from './Sections';
import './cosmos.css';

export default function CosmosApp() {
  return (
    <>
      <Universe />
      <Nav />
      <ScrollRail />
      <Cursor />
      <main>
        <Hero />
        <About />
        <Worlds />
        <Research />
        <Contact />
      </main>
    </>
  );
}
