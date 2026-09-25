import { useEffect, useLayoutEffect, useMemo } from 'react';
import { Universe } from './Universe';
import { Hero } from './Hero';
import { ScrollRail } from './ScrollRail';
import { Cursor } from './Cursor';
import { Nav, About, WorldsIndex, Research, Contact } from './Sections';
import { WorkPage, LostPage } from './WorkPage';
import { worlds } from './data';
import { lastNav, usePath } from './router';
import './cosmos.css';

const HOME = [['top', 'Horizon'], ['about', 'About'], ['worlds', 'Worlds'], ['research', 'Research'], ['contact', 'Contact']];

function route(path) {
  if (path === '/') return { page: 'home' };
  const m = path.match(/^\/work\/([\w-]+)\/?$/);
  const world = m && worlds.find((w) => w.id === m[1]);
  return world ? { page: 'work', world } : { page: 'lost' };
}

export default function CosmosApp() {
  const path = usePath();
  const { page, world } = route(path);

  // Back and forward return to where you were. A new page starts at the top,
  // or at its #section when the link names one.
  useLayoutEffect(() => {
    const y = window.history.state?.y;
    const id = window.location.hash.slice(1);
    const nav = lastNav();
    if (nav === 'pop' && typeof y === 'number') window.scrollTo({ top: y, behavior: 'instant' });
    else if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
    else if (nav !== 'load') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);

  useEffect(() => {
    document.title = world ? `${world.name} · Dhruv Ramani` : page === 'lost' ? 'Lost in space · Dhruv Ramani' : 'Dhruv Ramani';
  }, [page, world]);

  const sections = useMemo(() => {
    if (page === 'home') return HOME;
    if (page === 'lost') return [];
    return [['overview', world.name], ['how', 'How it works'], ...(world.paper ? [['paper', 'Paper']] : []), ['next', 'Next world']];
  }, [page, world]);

  return (
    <>
      <Universe />
      <Nav home={page === 'home'} />
      <ScrollRail key={path} sections={sections} />
      <Cursor />
      <main>
        {page === 'home' && (
          <>
            <Hero />
            <About />
            <WorldsIndex />
            <Research />
            <Contact />
          </>
        )}
        {page === 'work' && <WorkPage key={world.id} w={world} />}
        {page === 'lost' && <LostPage />}
      </main>
    </>
  );
}
