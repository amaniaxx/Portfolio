import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const GuestbookSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="guestbook" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20">
            <h2 className="section-heading">
              Guestbook
            </h2>
            <div className="section-divider" aria-hidden="true"></div>
            <p className="section-description">
              Let me know you were here
            </p>
          </div>
          
          <Card className="glass-effect hover:border-white/50 transition-all duration-500 professional-shadow hover-lift">
            <CardContent>
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-gradient"></div>
                <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 min-h-[200px] flex items-center justify-center border border-white/10 glass-enhanced">
                  <div className="text-center animate-bounce-in">
                    <div className="text-5xl mb-6 animate-float">💌</div>
                    <p className="text-muted-foreground text-lg font-medium">Sign the guestbook and leave your mark!</p>
                    <div className="mt-4 inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 glass-effect">
                      <span className="text-primary text-sm font-semibold">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GuestbookSection;
