import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * BRAND PALETTE:
 * Midnight Navy: #001B48
 * Deep Blue: #02457A
 * Ocean Blue: #018ABE
 * Soft Sky Blue: #97CADB
 * Ice Blue: #D6EBEE
 */

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { scrollY } = useScroll();

  // BLOCK SCROLLING WHEN MENU OPENED
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
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
          ? 'bg-white/95 backdrop-blur-md border-b border-[#D6EBEE] py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group outline-none"
          >
            <div className={`w-10 h-10 flex items-center justify-center font-black text-lg transition-all duration-500 rounded-none ${
              isScrolled ? 'bg-[#001B48] text-white' : 'bg-[#018ABE] text-white shadow-[0_0_20px_rgba(1,138,190,0.3)]'
            }`}>
              N
            </div>
            <span className={`text-xl font-black tracking-[0.2em] transition-colors uppercase ${
              isScrolled ? 'text-[#001B48]' : 'text-white'
            }`}>
              NOVAY<span className={isScrolled ? 'text-[#018ABE]' : 'text-[#97CADB]'}>TEK</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {['home', 'projects', 'about', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:opacity-100 relative group/link ${
                      isScrolled ? 'text-[#001B48]/70 hover:text-[#001B48]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {(t.nav as any)[item]}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#018ABE] transition-all group-hover/link:w-full" />
                  </button>
                </li>
              ))}
            </ul>

            <div className={`w-px h-6 ${isScrolled ? 'bg-[#001B48]/10' : 'bg-white/10'}`} />

            {/* Desktop Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] ${
                  isScrolled ? 'text-[#001B48]' : 'text-[#D6EBEE]'
                }`}
              >
                <Globe size={14} className={isScrolled ? 'text-[#018ABE]' : 'text-[#97CADB]'} />
                {language}
                <ChevronDown size={12} className={`transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-6 bg-white shadow-2xl border border-[#D6EBEE] min-w-[200px] p-2"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                        className={`w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#F8FAFC] transition-colors flex items-center justify-between ${
                          language === lang.code ? 'text-[#018ABE]' : 'text-[#001B48]'
                        }`}
                      >
                        <span className="flex gap-3">
                           <span>{lang.flag}</span>
                           {lang.name}
                        </span>
                        {language === lang.code && <div className="w-1 h-1 bg-[#018ABE]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className={`p-2 transition-colors ${isScrolled ? 'text-[#001B48]' : 'text-white'}`}
            >
              <Menu size={32} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#001B48]/95 backdrop-blur-xl z-[150] md:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[200] flex flex-col md:hidden shadow-[-20px_0_60px_rgba(0,0,0,0.5)] overflow-y-auto"
            >
              {/* Drawer Header (Close and Logo) */}
              <div className="p-8 flex justify-between items-center border-b border-[#D6EBEE]">
                <div className="flex items-center gap-2">
                   <div className="bg-[#001B48] text-white w-8 h-8 flex items-center justify-center font-black text-sm">N</div>
                   <span className="text-xs font-black tracking-widest text-[#001B48]">MENU</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 flex items-center justify-center text-[#001B48] bg-[#F8FAFC] rounded-full border border-slate-100 active:scale-90 transition-transform"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
              </div>

              {/* Languages at TOP (Better Reach) */}
              <div className="px-8 pt-10 pb-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-2">
                    <Globe size={12} className="text-[#018ABE]" /> SYSTEM_REGION / LNG
                 </p>
                 <div className="grid grid-cols-3 gap-3">
                    {languages.map(lang => (
                       <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`py-4 flex flex-col items-center justify-center border transition-all duration-300 ${
                            language === lang.code 
                            ? 'border-[#018ABE] bg-[#001B48] text-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]' 
                            : 'border-slate-100 text-slate-400 grayscale hover:grayscale-0'
                          }`}
                       >
                          <span className="text-xl mb-1">{lang.flag}</span>
                          <span className="text-[10px] font-black uppercase tracking-tighter">{lang.code}</span>
                       </button>
                    ))}
                 </div>
              </div>

              {/* Navigation Links */}
              <div className="px-8 flex flex-col flex-grow py-12 gap-8">
                {['home', 'projects', 'about', 'contact'].map((item, idx) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    onClick={() => scrollToSection(item)}
                    className="text-4xl font-black text-[#001B48] uppercase tracking-tighter text-left flex items-center justify-between group outline-none"
                  >
                    <span>{(t.nav as any)[item]}</span>
                    <ArrowUpRight className="text-[#97CADB] opacity-0 group-active:opacity-100 transition-all duration-300" size={32}/>
                  </motion.button>
                ))}
              </div>

              {/* Bottom Large CTA (Perfect for Thumbs) */}
              <div className="p-8 border-t border-[#D6EBEE] bg-[#F8FAFC]">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-[#018ABE] text-white py-6 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-blue-900/10"
                >
                  TRANSMIT REQUEST <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}