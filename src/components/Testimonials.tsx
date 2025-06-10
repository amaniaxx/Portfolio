import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "TechFlow Solutions",
    content: "Aman delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise transformed our user experience. The project was completed ahead of schedule with outstanding quality.",
    avatar: "SJ",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Michael Chen",
    title: "CTO",
    company: "InnovateLab",
    content: "Working with Aman has been fantastic. He's not only highly skilled in modern web technologies but also brings creative solutions to complex problems. His ability to communicate technical concepts clearly makes him invaluable.",
    avatar: "MC",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Emily Rodriguez",
    title: "Design Director",
    company: "CreativeStudio",
    content: "Aman is a standout developer who brings designs to life with precision. His collaborative approach and problem-solving skills enhanced our entire development process. Highly recommended for any project.",
    avatar: "ER",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "David Thompson",
    title: "Founder",
    company: "StartupHub",
    content: "Reliable, innovative, and professional - Aman exceeded our expectations. His clean code and modern approach to development helped scale our platform efficiently. A true professional who delivers results.",
    avatar: "DT",
    gradient: "from-orange-500 to-red-500"
  }
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-accent/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20">
            <h2 className="section-heading">
              Word on the street{' '}
              <span className="text-gradient-accent">about me</span>
            </h2>
            <div className="section-divider" aria-hidden="true"></div>
            <p className="section-description">
              What clients and collaborators say about working with me
            </p>
          </div>
          
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full max-w-6xl mx-auto"
              onSelect={(api) => {
                if (api) {
                  handleSlideChange(api.selectedScrollSnap());
                }
              }}
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2">
                    <Card 
                      className={`testimonial-card h-full glass-effect hover:bg-card/80 transition-all duration-400 professional-shadow group card-3d hover-lift ${
                        isVisible ? 'animate-bounce-in' : 'opacity-0 scale-75'
                      } ${activeIndex === index ? 'ring-2 ring-primary/50' : ''}`}
                      style={{ 
                        animationDelay: `${index * 150}ms`,
                        transformOrigin: 'center center',
                        zIndex: activeIndex === index ? 2 : 1
                      }}
                    >
                      <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                        <div className="flex-1 mb-6">
                          <div className="text-3xl sm:text-4xl text-primary/20 mb-2">"</div>
                          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed italic relative">
                            {testimonial.content}
                          </p>
                          <div className="text-3xl sm:text-4xl text-primary/20 text-right">"</div>
                        </div>
                        
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center flex-shrink-0 hover-lift`}>
                            <span className="text-white font-bold text-xs sm:text-sm">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                              {testimonial.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {testimonial.title} • <span className="text-primary/80">{testimonial.company}</span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Desktop Navigation with enhanced animations */}
              <CarouselPrevious 
                className="hidden sm:flex glass-effect border-primary/20 hover:bg-primary hover:text-primary-foreground -left-12 hover-lift w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 active:scale-90 active:rotate-12"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
              </CarouselPrevious>
              <CarouselNext 
                className="hidden sm:flex glass-effect border-primary/20 hover:bg-primary hover:text-primary-foreground -right-12 hover-lift w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 active:scale-90 active:-rotate-12"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            transform: scale(1.01);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .testimonial-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 
            0 10px 20px rgba(0, 0, 0, 0.2),
            0 5px 10px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(59, 130, 246, 0.1);
        }

        .testimonial-card:active {
          transform: translateY(-2px) scale(0.99);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
