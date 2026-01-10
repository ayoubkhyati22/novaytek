import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [direction, setDirection] = useState(0);

  // Fallback if content or slides are missing to prevent the "length" crash
  const slides = content?.slides || [];
  const slideCount = slides.length;

  const paginate = useCallback((newDirection: number) => {
    if (slideCount === 0) return;
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (slideCount === 0) return;
    // Changed from 6000ms to 3500ms for faster auto-advance
    const timer = setInterval(() => paginate(1), 3500);
    return () => clearInterval(timer);
  }, [paginate, slideCount]);

  // Safety return if no slides are provided
  if (slideCount === 0) {
    return <section className="min-h-screen bg-[#001B48] flex items-center justify-center text-white">Loading Systems...</section>;
  }

  const sliderVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        // Changed from 8 seconds to 4 seconds for faster zoom
        scale: { duration: 4, ease: "linear" } 
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#001B48]">
      
      {/* BACKGROUND IMAGE SLIDER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current]?.url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#001B48] via-[#001B48]/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001B48] via-transparent to-transparent z-10" />
            <div className="absolute inset-0 opacity-20 pointer-events-none z-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center space-x-3 bg-[#018ABE]/20 backdrop-blur-md border border-[#97CADB]/30 px-4 py-2 mb-8">
                <Sparkles className="w-3 h-3 text-[#97CADB]" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D6EBEE]">
                   {slides[current]?.tag}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase"
          >
            {t.hero.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#97CADB] via-[#018ABE] to-white">
                {t.hero.subtitle}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-lg mb-12 leading-relaxed font-light border-l border-[#018ABE] pl-6"
          >
            {t.hero.description}
          </motion.p>

          <motion.div className="flex flex-wrap gap-6">
            <button 
               onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-10 py-5 bg-[#018ABE] hover:bg-white hover:text-[#001B48] text-white font-black transition-all duration-500 flex items-center group uppercase tracking-[0.2em] text-[10px]"
            >
              {t.hero.cta} <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* NAVIGATION UI */}
      <div className="absolute bottom-12 right-6 md:right-12 z-40 flex flex-col items-end gap-6">
        <div className="flex items-center gap-4">
            <span className="text-white font-black text-[10px] tracking-widest">0{current + 1}</span>
            <div className="w-32 h-[2px] bg-white/10 relative">
               <motion.div 
                 key={current}
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 // Changed from 6 seconds to 3.5 seconds to match auto-advance
                 transition={{ duration: 3.5, ease: "linear" }}
                 className="absolute inset-y-0 left-0 bg-[#97CADB]"
               />
            </div>
            <span className="text-white/40 font-black text-[10px] tracking-widest">0{slideCount}</span>
        </div>

        <div className="flex gap-2">
            <button 
                onClick={() => paginate(-1)}
                className="w-14 h-14 flex items-center justify-center border border-white/10 hover:bg-white hover:text-[#001B48] text-white transition-all duration-500"
            >
                <ChevronLeft size={20} />
            </button>
            <button 
                onClick={() => paginate(1)}
                className="w-14 h-14 flex items-center justify-center border border-white/10 hover:bg-white hover:text-[#001B48] text-white transition-all duration-500"
            >
                <ChevronRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
}