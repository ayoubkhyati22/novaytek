import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * BRAND PALETTE:
 * Midnight Navy: #001B48
 * Ocean Blue: #018ABE
 * Soft Sky Blue: #97CADB
 */

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { scrollY } = useScroll();

  // 1. BLOCK BACKGROUND SCROLLING
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Prevent elastic scroll on iOS
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    }
  }, [isOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  ];

  return (
    <header
      className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-[#D6EBEE] py-2 sm:py-3' 
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="flex justify-between items-center min-h-[48px] sm:min-h-0">
          
          {/* LOGO - Using SVG images with smooth transition */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center outline-none group relative h-10 sm:h-12 md:h-14"
          >
            {/* White logo for transparent header */}
            <img 
              src="/images/LOGO_TEXT_WHITE.svg" 
              alt="Novaytek Logo" 
              className={`h-20 sm:h-22 md:h-24 w-auto transition-opacity duration-500 ${
                isScrolled ? 'opacity-0 absolute' : 'opacity-100'
              }`}
            />
            {/* Dark logo for scrolled header */}
            <img 
              src="/images/LOGO_TEXT.svg" 
              alt="Novaytek Logo" 
              className={`h-20 sm:h-22 md:h-24 w-auto transition-opacity duration-500 ${
                isScrolled ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            />
          </button>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {['home', 'projects', 'about', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`text-[10px] font-black uppercase tracking-[0.35em] transition-all hover:opacity-100 relative group/link ${
                      isScrolled ? 'text-[#001B48]/60 hover:text-[#001B48]' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {(t.nav as any)[item]}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#018ABE] transition-all group-hover/link:w-full" />
                  </button>
                </li>
              ))}
            </ul>

            {/* LANG SWITCHER DESKTOP */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                  isScrolled ? 'text-[#001B48]' : 'text-[#D6EBEE]'
                }`}
              >
                <Globe size={14} className={isScrolled ? 'text-[#018ABE]' : 'text-[#97CADB]'} />
                {language}
                <ChevronDown size={11} className={`transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-5 bg-white shadow-2xl border border-slate-100 min-w-[180px] p-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                        className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#F8FAFC] transition-colors flex items-center justify-between ${
                          language === lang.code ? 'text-[#018ABE]' : 'text-[#001B48]'
                        }`}
                      >
                        <span className="flex gap-2"><span>{lang.flag}</span> {lang.name}</span>
                        {language === lang.code && <div className="w-1 h-1 bg-[#018ABE]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* MOBILE TOGGLE - FIXED POSITIONING */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className={`p-1.5 sm:p-2 ${isScrolled ? 'text-[#001B48]' : 'text-white'}`}
              aria-label="Open menu"
            >
              <Menu size={22} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#001B48]/95 backdrop-blur-md z-[150]"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 h-[100dvh] w-full max-w-sm bg-white z-[200] flex flex-col shadow-[-20px_0_80px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              {/* Header: Fixed Height */}
              <div className="shrink-0 p-4 sm:p-6 flex justify-between items-center border-b border-slate-100">
                <div className="flex items-center gap-2">
                   {/* Use dark logo in mobile menu */}
                   <img 
                     src="/images/LOGO_TEXT.svg" 
                     alt="Novaytek Logo" 
                     className="h-9 sm:h-10 w-auto"
                   />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#001B48] bg-slate-50 border border-slate-100 active:scale-90"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Language Selection: Top for Visibility */}
              <div className="shrink-0 p-4 sm:p-6 bg-slate-50/50">
                 <p className="text-[9px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-slate-400 mb-3 sm:mb-4 flex items-center gap-2">
                    <Globe size={11} className="text-[#018ABE]" /> PROTOCOL_LNG
                 </p>
                 <div className="grid grid-cols-3 gap-2">
                    {languages.map(lang => (
                       <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`py-2.5 sm:py-3 flex flex-col items-center justify-center border transition-all ${
                            language === lang.code 
                            ? 'border-[#018ABE] bg-[#001B48] text-white shadow-lg' 
                            : 'border-slate-200 bg-white text-slate-400 grayscale'
                          }`}
                       >
                          <span className="text-lg sm:text-xl mb-1">{lang.flag}</span>
                          <span className="text-[8px] sm:text-[9px] font-black">{lang.code.toUpperCase()}</span>
                       </button>
                    ))}
                 </div>
              </div>

              {/* Nav Links: Flex-Grow expands but fits container */}
              <div className="flex-grow flex flex-col justify-center px-6 sm:px-8 gap-6 sm:gap-8">
                {['home', 'projects', 'about', 'contact'].map((item, idx) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={() => scrollToSection(item)}
                    className="text-2xl sm:text-3xl font-black text-[#001B48] uppercase tracking-tighter text-left flex items-center justify-between group active:text-[#018ABE] transition-colors"
                  >
                    { (t.nav as any)[item] }
                    <ArrowUpRight className="text-[#97CADB] group-active:translate-x-1 transition-transform" size={20}/>
                  </motion.button>
                ))}
              </div>

              {/* CTA Bottom Button: Fixed at base */}
              <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-[#018ABE] text-white py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] flex items-center justify-center gap-2 sm:gap-3 active:scale-[0.98] transition-all"
                >
                  REQUEST ACCESS <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}