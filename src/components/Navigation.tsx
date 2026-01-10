import { useState } from 'react';
import { Menu, X, Globe, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * UPDATED BRAND PALETTE:
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
      className={`fixed w-full z-[100] transition-all duration-300 ${
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
            className="flex items-center gap-3 group"
          >
            <div className={`w-10 h-10 flex items-center justify-center font-bold text-lg transition-all duration-500 rounded-sm ${
              isScrolled ? 'bg-[#001B48] text-white shadow-lg' : 'bg-[#018ABE] text-white'
            }`}>
              N
            </div>
            <span className={`text-xl font-bold tracking-[0.15em] transition-colors ${
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
                    className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:opacity-100 ${
                      isScrolled ? 'text-[#001B48]/70 hover:text-[#001B48]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {(t.nav as any)[item]}
                  </button>
                </li>
              ))}
            </ul>

            <div className={`w-px h-6 ${isScrolled ? 'bg-[#001B48]/10' : 'bg-white/10'}`} />

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute top-full right-0 mt-6 bg-white shadow-[0_20px_50px_rgba(0,1,72,0.1)] border border-[#D6EBEE] min-w-[180px] rounded-sm p-2"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                        className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#D6EBEE]/50 transition-colors flex items-center justify-between ${
                          language === lang.code ? 'text-[#018ABE]' : 'text-[#001B48]'
                        }`}
                      >
                        {lang.name}
                        {language === lang.code && <div className="w-1 h-1 bg-[#018ABE] rounded-full" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Professional CTA Button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all border ${
                isScrolled 
                ? 'bg-[#001B48] text-white border-[#001B48] hover:bg-[#018ABE]' 
                : 'border-white text-white hover:bg-white hover:text-[#001B48]'
              }`}
            >
              Contact <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={isScrolled ? 'text-[#001B48]' : 'text-white'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#001B48]/90 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-[80%] max-w-xs bg-white p-12 flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-10">
                {['home', 'projects', 'about', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-2xl font-black text-[#001B48] uppercase tracking-tighter text-left"
                  >
                    {(t.nav as any)[item]}
                  </button>
                ))}
              </div>

              <div className="mt-auto border-t border-[#D6EBEE] pt-10">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Region / Lang</p>
                 <div className="grid grid-cols-3 gap-2">
                    {languages.map(lang => (
                       <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`py-3 flex flex-col items-center border rounded-sm transition-all ${
                            language === lang.code ? 'border-[#018ABE] bg-[#D6EBEE]/30' : 'border-slate-100'
                          }`}
                       >
                          <span className="text-xl mb-1">{lang.flag}</span>
                          <span className="text-[9px] font-black uppercase">{lang.code}</span>
                       </button>
                    ))}
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}