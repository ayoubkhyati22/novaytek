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

  // Fallback if content or slides are missing to prevent the "length" crash
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

  // Safety return if no slides are provided
  if (slideCount === 0) {
    return <section className="min-h-screen bg-[#001B48] flex items-center justify-center text-white">Loading Systems...</section>;
  }

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#001B48]">
      
      {/* BACKGROUND IMAGE SLIDER - Simple fade transitions only */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
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

      {/* TEXT CONTENT */}
      <div className="relative z-30 w-full px-5 sm:px-6 md:px-12 pt-24 sm:pt-20 pb-32 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-full sm:max-w-2xl md:max-w-3xl">
            <div
              key={current}
              className="transition-opacity duration-500"
            >
              <div className="inline-flex items-center space-x-2 bg-[#018ABE]/20 backdrop-blur-md border border-[#97CADB]/30 px-3 py-1.5 mb-6 sm:mb-8">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#97CADB] flex-shrink-0" />
                <span className="text-[7px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[#D6EBEE] whitespace-nowrap">
                   {slides[current]?.tag}
                </span>
              </div>
            </div>
            
            {/* CRITICAL FIX: Much smaller mobile text size with proper word breaking */}
            <h1 className="text-[2.25rem] leading-[0.95] sm:text-5xl sm:leading-[0.9] md:text-6xl lg:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tighter uppercase max-w-[95%] sm:max-w-full">
              {t.hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#97CADB] via-[#018ABE] to-white block">
                  {t.hero.subtitle}
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-[95%] sm:max-w-md md:max-w-lg mb-8 sm:mb-12 leading-relaxed font-light border-l-2 sm:border-l border-[#018ABE] pl-4 sm:pl-6">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6">
              <button 
                 onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                 className="px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 bg-[#018ABE] hover:bg-white hover:text-[#001B48] text-white font-black transition-all duration-500 flex items-center group uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-[10px]"
              >
                {t.hero.cta} <ArrowRight className="ml-2 sm:ml-3 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION UI */}
      <div className="absolute bottom-6 sm:bottom-12 right-4 sm:right-6 md:right-12 z-40 flex flex-col items-end gap-4 sm:gap-6">
        <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-white font-black text-[9px] sm:text-[10px] tracking-widest">0{current + 1}</span>
            <div className="w-20 sm:w-28 md:w-32 h-[1.5px] sm:h-[2px] bg-white/10 relative overflow-hidden">
               <div 
                 key={current}
                 className="absolute inset-y-0 left-0 bg-[#97CADB] animate-progress"
                 style={{ 
                   animation: 'progress 5s linear',
                   animationFillMode: 'forwards'
                 }}
               />
            </div>
            <span className="text-white/40 font-black text-[9px] sm:text-[10px] tracking-widest">0{slideCount}</span>
        </div>

        <div className="flex gap-1.5 sm:gap-2">
            <button 
                onClick={() => paginate(-1)}
                className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center border border-white/10 hover:bg-white hover:text-[#001B48] text-white transition-all duration-500"
                aria-label="Previous slide"
            >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button 
                onClick={() => paginate(1)}
                className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center border border-white/10 hover:bg-white hover:text-[#001B48] text-white transition-all duration-500"
                aria-label="Next slide"
            >
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
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