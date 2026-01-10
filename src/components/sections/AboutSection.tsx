import { Globe, Shield, Zap, Target } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { motion } from 'framer-motion';

interface ExpertiseItem {
  icon: string;
  labelKey: string;
}

interface AboutSectionProps {
  content: {
    mainImage: string;
    mainImageAlt: string;
    imageHeight: string;
    shadowColor: string;
    borderColor: string;
    borderWidth: string;
    expertise: ExpertiseItem[];
    expertiseLabels: Record<string, string>;
  };
  animations: {
    duration: number;
    ease: number[];
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe />,
  Shield: <Shield />,
  Zap: <Zap />,
  Target: <Target />,
};

export default function AboutSection({ content, animations }: AboutSectionProps) {
  const { t } = useLanguage();
  const smoothTransition = { duration: animations.duration, ease: animations.ease };

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div 
            className="relative z-10 rounded-none overflow-hidden border-[12px]"
            style={{ 
              boxShadow: `40px 40px 0 0 ${content.shadowColor}`,
              borderColor: content.borderColor,
              borderWidth: content.borderWidth
            }}
          >
            <img 
              src={content.mainImage}
              alt={content.mainImageAlt}
              className="w-full object-cover"
              style={{ height: content.imageHeight }}
            />
          </div>
        </motion.div>

        <div className="space-y-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="text-5xl md:text-7xl font-black tracking-tighter text-[#001B48] leading-[0.9] uppercase"
          >
            Absolute <br /><span className="text-[#018ABE]">Structural</span> <br />Certainty.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed font-light"
          >
            {t.about.subtitle}
          </motion.p>

          <div className="grid grid-cols-2 gap-4">
            {content.expertise.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...smoothTransition, delay: 0.3 + (i * 0.1) }}
                className="flex flex-col gap-4 p-8 bg-[#F8FAFC] border border-slate-100 hover:border-[#018ABE] transition-all duration-500 group"
              >
                <div className="text-[#018ABE] group-hover:scale-110 transition-transform duration-500">
                  {iconMap[item.icon]}
                </div>
                <span className="font-black text-[9px] uppercase tracking-[0.3em] text-[#001B48]">
                  {content.expertiseLabels[item.labelKey]}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#001B48] p-12 rounded-none origin-top"
          >
             <div className="space-y-10">
               {t.about.valueItems.map((val, idx) => (
                  <div key={idx} className={`${idx !== 0 ? 'pt-10 border-t border-white/10' : ''}`}>
                    <h4 className="text-[#97CADB] text-xs font-black mb-4 uppercase tracking-[0.3em]">{val.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">{val.description}</p>
                  </div>
               ))}
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}