import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
    { code: 'ar', name: 'AR' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - (isScrolled ? 60 : 120), behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] flex flex-col items-center pointer-events-none">
        
        {/* LOGO: Sharp Central Alignment - BIGGER */}
        <motion.div 
          animate={{ 
            height: isScrolled ? 0 : 'auto',
            opacity: isScrolled ? 0 : 1,
            y: isScrolled ? -20 : 0
          }}
          className="pt-8 pb-4 pointer-events-auto overflow-hidden"
        >
          <button onClick={() => scrollToSection('home')} className="block">
             <img src="/images/LOGO_TEXT_WHITE.svg" alt="Logo" className="h-24 md:h-32 w-auto" />
          </button>
        </motion.div>

        {/* NAVIGATION BEAM: Sharp Edges, High UX Localization - STAYS AT TOP */}
        <motion.nav
          initial={false}
          animate={{
            width: isScrolled ? '100%' : '90%',
            maxWidth: isScrolled ? '100%' : '500px',
          }}
          className={`
            pointer-events-auto flex items-stretch border transition-all duration-300
            ${isScrolled 
                ? 'bg-[#001B48] border-b-[#018ABE] border-t-0 border-x-0' 
                : 'bg-white/5 backdrop-blur-md border-white/20'
            }
          `}
        >
          {/* LANGUAGES: Left Side Rectangles */}
          <div className="flex border-r border-white/10">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-[11px] font-black transition-all border-r border-white/5 last:border-r-0
                  ${language === l.code 
                    ? 'bg-[#018ABE] text-white' 
                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {l.name}
              </button>
            ))}
          </div>

          {/* DYNAMIC MIDDLE: Shows Logo on Scroll only - BIGGER LOGO */}
          <div className="flex-grow flex items-center justify-center">
            <AnimatePresence>
                {isScrolled && (
                    <motion.button 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        onClick={() => scrollToSection('home')}
                    >
                        <img src="/images/LOGO_TEXT_WHITE.svg" className="h-12 opacity-80" alt="Logo" />
                    </motion.button>
                )}
            </AnimatePresence>
          </div>

          {/* MENU TOGGLE: Rectangular Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-4 px-6 md:px-10 h-12 md:h-14 bg-white text-[#001B48] hover:bg-[#97CADB] transition-colors group"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
               MENU
            </span>
            <div className="relative w-6 h-4">
              <span className="absolute top-0 right-0 w-6 h-[2px] bg-[#001B48]" />
              <span className="absolute bottom-0 right-0 w-4 h-[2px] bg-[#018ABE] group-hover:w-6 transition-all" />
            </div>
          </button>
        </motion.nav>
      </header>

      {/* FULLSCREEN SQUARE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-[#001B48] z-[200] flex flex-col pointer-events-auto"
          >
            {/* Background Texture (Grid lines for architectural feel) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
            />

            {/* Menu Header (Sharp Close Button) - BIGGER LOGO */}
            <div className="flex justify-between items-center h-20 border-b border-white/10 px-8">
                <img src="/images/LOGO_TEXT_WHITE.svg" className="h-16 opacity-30" alt="Novaytek" />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="h-full px-8 flex items-center gap-3 bg-white/5 hover:bg-white text-white hover:text-[#001B48] transition-all border-l border-white/10 uppercase text-[10px] font-black tracking-widest"
                >
                  Close <X size={20} />
                </button>
            </div>

            {/* Sharp Navigation Slabs */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2">
               {['home', 'projects', 'about', 'contact'].map((item, i) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="border-b border-white/5 md:border-r flex flex-col justify-center px-12 group hover:bg-[#018ABE] transition-colors relative overflow-hidden"
                  >
                     <span className="text-[#97CADB] group-hover:text-white text-[12px] font-black mb-2 opacity-50">
                        / 0{i + 1}
                     </span>
                     <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter text-left">
                       {(t.nav as any)[item]}
                     </h2>
                     <ArrowUpRight 
                        className="absolute right-12 bottom-12 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" 
                        size={48} 
                     />
                  </button>
               ))}
            </div>           
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}