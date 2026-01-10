import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { motion } from 'framer-motion';

interface ProjectsSectionProps {
  images: string[];
  animations: {
    duration: number;
    ease: number[];
  };
}

export default function ProjectsSection({ images, animations }: ProjectsSectionProps) {
  const { t } = useLanguage();
  const smoothTransition = { duration: animations.duration, ease: animations.ease };

  return (
    <section id="projects" className="py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-[#001B48] uppercase leading-none">
              {t.projects.title}
            </h2>
            <div className="w-20 h-2 bg-[#018ABE]" />
          </motion.div>
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ x: 10 }}
            className="flex items-center gap-3 text-[#018ABE] font-black tracking-[0.4em] text-[10px] group transition-all duration-500"
          >
            SYSTEM DIRECTORY <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-slate-200">
          {t.projects.items.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothTransition, delay: index * 0.15 }}
              className="group bg-white flex flex-col h-full border-r border-slate-200 last:border-r-0 hover:bg-[#001B48] transition-all duration-700 cursor-pointer"
            >
              <div className="h-96 overflow-hidden relative">
                 <img 
                  src={images[index] || images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-40" 
                 />
                 <div className="absolute top-8 left-8 p-3 bg-white text-[#001B48] text-[9px] font-black uppercase tracking-[0.3em] group-hover:bg-[#018ABE] group-hover:text-white transition-colors duration-500">
                    {project.tech}
                 </div>
              </div>
              <div className="p-12 flex flex-col flex-grow">
                <h3 className="text-2xl font-black mb-6 text-[#001B48] group-hover:text-white transition-colors duration-500 uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-grow font-light group-hover:text-slate-400 transition-colors duration-500">
                  {project.description}
                </p>
                <div className="pt-8 border-t border-slate-100 group-hover:border-white/10 flex items-center justify-between text-[#001B48] group-hover:text-[#97CADB] font-black text-[10px] tracking-[0.3em] uppercase transition-all duration-500">
                   View <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}