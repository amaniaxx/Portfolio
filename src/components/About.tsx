import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
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
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative py-24 px-6"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20">
            <h2 
              id="about-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary tracking-tight"
            >
              About Me
            </h2>
            <div 
              className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-8"
              aria-hidden="true"
            ></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Passionate about creating sophisticated digital solutions
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Card 
                className={`glass-effect hover:bg-card/60 transition-all duration-700 ease-out professional-shadow card-3d ${isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-10'}`}
                role="article"
                aria-labelledby="about-intro"
              >
                <CardContent className="p-8">
                  <p id="about-intro" className="text-lg leading-relaxed text-foreground/90 font-light">
                    I'm a dedicated web developer with a passion for creating sophisticated digital solutions. 
                    Based in Dehradun, India, I specialize in modern web technologies and have a keen eye for 
                    user experience design. My approach combines technical expertise with creative problem-solving 
                    to deliver exceptional results.
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`glass-effect hover:bg-card/60 transition-all duration-700 ease-out professional-shadow card-3d ${isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-10'}`} 
                style={{ animationDelay: '300ms' }}
                role="article"
                aria-labelledby="about-expertise"
              >
                <CardContent className="p-8">
                  <p id="about-expertise" className="text-lg leading-relaxed text-foreground/90 font-light">
                    With expertise in React, JavaScript, and modern frontend frameworks, I focus on building 
                    scalable, performant applications. I'm committed to writing clean, maintainable code and 
                    staying current with industry best practices and emerging technologies.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div 
              className={`flex justify-center lg:justify-end transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-10'}`}
              aria-hidden="true"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500 animate-glow-pulse"></div>
                <div className="relative w-80 h-80 glass-effect-strong rounded-2xl flex items-center justify-center professional-shadow hover-lift">
                  <div className="w-72 h-72 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center border border-primary/20 glass-enhanced">
                    <div className="text-center animate-bounce-in">
                      <div className="text-5xl font-bold text-gradient-primary mb-2">AA</div>
                      <div className="text-sm text-muted-foreground font-medium">Web Developer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
