import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  content: {
    backgroundImage: string;
    primaryImage: string;
    primaryImageAlt: string;
  };
  animations: {
    duration: number;
    ease: number[];
  };
}

export default function HeroSection({ content, animations }: HeroSectionProps) {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  const smoothTransition = { duration: animations.duration, ease: animations.ease };
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#001B48]">
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay" 
          style={{ backgroundImage: `url(${content.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001B48]/50 to-[#001B48]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-20">
        <motion.div style={{ y: yText, opacity: opacityHero }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-none mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#97CADB]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D6EBEE]">{t.hero.tagline}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.4 }}
            className="text-6xl md:text-8xl font-black text-white leading-[0.85] mb-8"
          >
            {t.hero.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#97CADB] via-[#018ABE] to-[#02457A]">{t.hero.subtitle}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.6 }}
            className="text-xl text-slate-300 max-w-lg mb-12 leading-relaxed font-light"
          >
            {t.hero.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <button 
               onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-10 py-5 bg-[#018ABE] hover:bg-white hover:text-[#001B48] text-white font-bold transition-all duration-500 flex items-center group shadow-2xl rounded-none uppercase tracking-widest text-xs"
            >
              {t.hero.cta} <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
            <button 
               onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-10 py-5 border border-white/20 text-white hover:bg-white/10 transition-all duration-500 font-bold rounded-none uppercase tracking-widest text-xs"
            >
              {t.hero.ctaSecondary}
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block relative"
        >
          <div className="relative z-10 rounded-none overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10">
            <img 
              src={content.primaryImage}
              alt={content.primaryImageAlt}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}