import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Artists from './components/sections/Artists';
import RecentWorks from './components/sections/RecentWorks';
import Contact from './components/sections/Contact';
import WorkWithUs from './components/sections/WorkWithUs';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Artists />
      <RecentWorks />
      <Contact />
      <hr className="w-[90%] mx-auto border-white"/>
      <WorkWithUs />
    </main>
  );
}
