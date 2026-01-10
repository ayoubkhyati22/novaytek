import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useState, useEffect, useCallback } from 'react';

interface Slide {
  url: string;
  tag: string;
}

interface HeroSectionProps {
  content?: {
    slides: Slide[];
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const slides = content?.slides || [];
  const slideCount = slides.length;

  const paginate = useCallback((newDirection: number) => {
    if (slideCount === 0) return;
    setCurrent((prev) => (prev + newDirection + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (slideCount === 0) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate, slideCount]);

  if (slideCount === 0) {
    return <section className="min-h-screen bg-[#001B48] flex items-center justify-center text-white">Loading Systems...</section>;
  }

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#001B48] w-full">
      
      {/* BACKGROUND IMAGE SLIDER */}
      <div className="absolute inset-0 z-0 w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 w-full ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#001B48] via-[#001B48]/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001B48] via-transparent to-transparent z-10" />
            <div className="absolute inset-0 opacity-20 pointer-events-none z-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>
        ))}
      </div>

      {/* TEXT CONTENT - FIXED FOR MOBILE */}
      <div className="relative z-30 w-full px-4 sm:px-6 md:px-12 pt-24 sm:pt-20 pb-32 sm:pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl">
            <div
              key={current}
              className="transition-opacity duration-500 w-full overflow-hidden"
            >
              <div className="inline-flex items-center space-x-2 bg-[#018ABE]/20 backdrop-blur-md border border-[#97CADB]/30 px-2 sm:px-3 py-1.5 mb-6 sm:mb-8 max-w-full">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#97CADB] flex-shrink-0" />
                <span className="text-[7px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.4em] text-[#D6EBEE] truncate">
                   {slides[current]?.tag}
                </span>
              </div>
            </div>
            
            {/* CRITICAL FIX: Proper mobile text sizing with word breaking */}
            <h1 className="text-[2rem] leading-[0.95] sm:text-5xl sm:leading-[0.9] md:text-6xl lg:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tighter uppercase w-full break-words hyphens-auto">
              {t.hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#97CADB] via-[#018ABE] to-white block break-words">
                  {t.hero.subtitle}
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 w-full max-w-full sm:max-w-md md:max-w-lg mb-8 sm:mb-12 leading-relaxed font-light border-l-2 sm:border-l border-[#018ABE] pl-3 sm:pl-6 break-words">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 w-full">
              <button 
                 onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                 className="px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 bg-[#018ABE] hover:bg-white hover:text-[#001B48] text-white font-black transition-all duration-500 flex items-center justify-center group uppercase tracking-[0.08em] sm:tracking-[0.15em] md:tracking-[0.2em] text-[8px] sm:text-[9px] md:text-[10px] max-w-full"
              >
                <span className="break-words">{t.hero.cta}</span>
                <ArrowRight className="ml-2 sm:ml-3 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-2 transition-transform duration-500 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION UI - RESPONSIVE POSITIONING */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-12 right-3 sm:right-4 md:right-6 lg:right-12 z-40 flex flex-col items-end gap-3 sm:gap-4 md:gap-6">
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
            <span className="text-white font-black text-[8px] sm:text-[9px] md:text-[10px] tracking-wider">0{current + 1}</span>
            <div className="w-14 sm:w-20 md:w-28 lg:w-32 h-[1.5px] sm:h-[2px] bg-white/10 relative overflow-hidden">
               <div 
                 key={current}
                 className="absolute inset-y-0 left-0 bg-[#97CADB] animate-progress"
                 style={{ 
                   animation: 'progress 5s linear',
                   animationFillMode: 'forwards'
                 }}
               />
            </div>
            <span className="text-white/40 font-black text-[8px] sm:text-[9px] md:text-[10px] tracking-wider">0{slideCount}</span>
        </div>

        <div className="flex gap-1 sm:gap-1.5 md:gap-2">
            <button 
                onClick={() => paginate(-1)}
                className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center border border-white/10 hover:bg-white hover:text-[#001B48] text-white transition-all duration-500 flex-shrink-0"
                aria-label="Previous slide"
            >
                <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
            </button>
            <button 
                onClick={() => paginate(1)}
                className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center border border-white/10 hover:bg-white hover:text-[#001B48] text-white transition-all duration-500 flex-shrink-0"
                aria-label="Next slide"
            >
                <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
            </button>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}