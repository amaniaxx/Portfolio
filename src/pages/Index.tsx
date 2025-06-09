import { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Uses from '@/components/Uses';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import ParticleBackground from '@/components/ParticleBackground';
import ChessPlaying from '@/components/ChessPlaying';
import RecentFavorite from '@/components/RecentFavorite';

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Smooth scrolling behavior
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <main ref={mainRef} className="relative bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Uses />
      <div className="flex flex-col items-center justify-center px-6 py-24 mx-auto max-w-7xl">
        <h2 className="section-heading text-center mb-12">Connect and Fun</h2>
        <div className="section-divider mb-12"></div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 w-full">
          <div className="w-full lg:w-1/2">
            <RecentFavorite />
          </div>
          <div className="w-full lg:w-1/2">
            <ChessPlaying />
          </div>
        </div>
      </div>
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Index;
