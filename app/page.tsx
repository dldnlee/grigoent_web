import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Artists from './components/sections/Artists';
import RecentWorks from './components/sections/RecentWorks';
import Contact from './components/sections/Contact';
import WorkWithUs from './components/sections/WorkWithUs';
import Footer from './components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full">
      <Hero />
      <Services />
      <Artists />
      <RecentWorks />
      <Contact />
      <WorkWithUs />
      <Footer />
    </main>
  );
}
