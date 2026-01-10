import { 
    ArrowRight, Sparkles, ExternalLink, Target, Eye, Heart, 
    Users, Mail, Phone, MapPin, Send, ChevronRight, 
    Layers, Globe, Shield, Zap
  } from 'lucide-react';
  import { useLanguage } from '../i18n/LanguageContext';
  import { motion, useScroll, useTransform, useInView } from 'framer-motion';
  import { useState, useRef, useEffect } from 'react';
  import { supabase } from '../lib/supabase';
  
  /**
   * BRAND PALETTE (STRICT GEOMETRY):
   * Midnight Navy: #001B48
   * Deep Blue: #02457A
   * Ocean Blue: #018ABE
   * Soft Sky Blue: #97CADB
   * Ice Blue: #D6EBEE
   */

  // Professional Ease: Quintic Out
  const smoothTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };
  
  export default function HomePage() {
    return (
      <div className="bg-white text-[#02457A] selection:bg-[#97CADB]/30">
        <HeroSection />
        <MetricsStrip />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </div>
    );
  }
  
  function HeroSection() {
    const { t } = useLanguage();
    const { scrollY } = useScroll();
    
    // Subtler parallax for a "smoother" feel
    const yText = useTransform(scrollY, [0, 500], [0, 100]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);
  
    return (
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#001B48]">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" 
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
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                alt="Architecture"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Smooth Floating Card */}
            {/* <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-[#02457A] p-8 border border-white/20 shadow-2xl z-20 rounded-none"
            >
              <Shield className="text-[#97CADB] w-8 h-8 mb-4" />
              <p className="text-white font-black text-xs uppercase tracking-[0.2em]">Validated Protocol</p>
              <div className="w-12 h-1 bg-[#018ABE] mt-2" />
            </motion.div> */}
          </motion.div>
        </div>
      </section>
    );
  }
  
  function MetricsStrip() {
    const { t } = useLanguage();
    return (
      <div className="bg-white py-24 border-b border-[#D6EBEE]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {Object.entries(t.about.stats).map(([key, value], idx) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...smoothTransition, delay: idx * 0.1 }}
              className="flex flex-col border-l-[4px] border-[#D6EBEE] hover:border-[#018ABE] pl-8 transition-colors duration-700"
            >
              <AnimatedNumber value={idx === 0 ? 150 : idx === 1 ? 98 : idx === 2 ? 12 : 50} suffix={idx === 1 ? "%" : "+"} />
              <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mt-3 leading-none">{value as string}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  
  function AnimatedNumber({ value, suffix }: { value: number, suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    useEffect(() => {
      if (isInView) {
        let start = 0;
        const duration = 2500; // Slower, smoother counting
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [isInView, value]);
  
    return (
      <span ref={ref} className="text-5xl font-black text-[#001B48] tabular-nums tracking-tighter">
        {count}{suffix}
      </span>
    );
  }
  
  function ProjectsSection() {
    const { t } = useLanguage();
    const images = [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80"
    ];
  
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
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-[#001B48] uppercase leading-none">{t.projects.title}</h2>
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
                    src={images[index]} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-40" 
                   />
                   <div className="absolute top-8 left-8 p-3 bg-white text-[#001B48] text-[9px] font-black uppercase tracking-[0.3em] group-hover:bg-[#018ABE] group-hover:text-white transition-colors duration-500">
                      {project.tech}
                   </div>
                </div>
                <div className="p-12 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black mb-6 text-[#001B48] group-hover:text-white transition-colors duration-500 uppercase tracking-tight">{project.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-grow font-light group-hover:text-slate-400 transition-colors duration-500">{project.description}</p>
                  <div className="pt-8 border-t border-slate-100 group-hover:border-white/10 flex items-center justify-between text-[#001B48] group-hover:text-[#97CADB] font-black text-[10px] tracking-[0.3em] uppercase transition-all duration-500">
                     Technical Review <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  function AboutSection() {
    const { t } = useLanguage();
    const expertise = [
      { icon: <Globe />, label: "Strategic Node" },
      { icon: <Shield />, label: "Cipher Security" },
      { icon: <Zap />, label: "Ultra-Low Latency" },
      { icon: <Target />, label: "Tactical Execution" }
    ];
  
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
            <div className="relative z-10 rounded-none overflow-hidden shadow-[40px_40px_0_0_#D6EBEE] border-[12px] border-[#001B48]">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                    alt="Infrastructure" 
                    className="w-full h-[700px] object-cover"
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
              {expertise.map((item, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...smoothTransition, delay: 0.3 + (i * 0.1) }}
                    className="flex flex-col gap-4 p-8 bg-[#F8FAFC] border border-slate-100 hover:border-[#018ABE] transition-all duration-500 group"
                >
                  <div className="text-[#018ABE] group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                  <span className="font-black text-[9px] uppercase tracking-[0.3em] text-[#001B48]">{item.label}</span>
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
  
  function ContactSection() {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('sending');
      const { error } = await supabase.from('contact_submissions').insert([{ ...formData, language }]);
      setStatus(error ? 'error' : 'success');
      if (!error) setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    };
  
    return (
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="lg:col-span-5 space-y-12"
          >
            <h2 className="text-6xl font-black text-[#001B48] mb-8 uppercase tracking-tighter">{t.contact.title}</h2>
            <div className="space-y-0">
               {[
                 { icon: <Mail />, label: t.contact.info.emailText },
                 { icon: <Phone />, label: t.contact.info.phoneText },
                 { icon: <MapPin />, label: t.contact.info.addressText }
               ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...smoothTransition, delay: i * 0.1 }}
                    className="flex items-center gap-8 py-10 border-b border-slate-100 last:border-0 hover:bg-[#F8FAFC] transition-all duration-700 cursor-pointer group px-4 -mx-4"
                  >
                     <div className="text-[#018ABE] group-hover:scale-125 transition-transform duration-700">{item.icon}</div>
                     <span className="font-black text-lg text-[#001B48] uppercase tracking-tight">{item.label}</span>
                  </motion.div>
               ))}
            </div>
          </motion.div>
  
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="lg:col-span-7 bg-[#001B48] p-12 md:p-16 shadow-2xl relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <MinimalInput label={t.contact.form.name} value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} delay={0.1} />
                <MinimalInput label={t.contact.form.email} value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} delay={0.2} />
              </div>
              <MinimalInput label={t.contact.form.subject} value={formData.subject} onChange={(v: string) => setFormData({...formData, subject: v})} delay={0.3} />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...smoothTransition, delay: 0.4 }}
                className="flex flex-col gap-4"
              >
                 <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#97CADB]">{t.contact.form.message}</label>
                 <textarea 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-transparent border border-white/10 p-6 outline-none focus:border-[#018ABE] transition-all duration-500 resize-none text-white text-lg rounded-none placeholder:text-white/5"
                    placeholder="Briefing transmission..."
                 />
              </motion.div>
  
              <motion.button 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ ...smoothTransition, delay: 0.5 }}
                whileHover={{ backgroundColor: '#ffffff', color: '#001B48' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#018ABE] text-white font-black py-7 transition-all duration-700 uppercase tracking-[0.3em] text-xs"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? "TRANSMITTING..." : t.contact.form.submit}
              </motion.button>
              {status === 'success' && (
                <p className="text-[#97CADB] font-black uppercase tracking-[0.4em] text-center text-[10px]">Transmission Complete</p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    );
  }
  
  function MinimalInput({ label, value, onChange, delay }: any) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...smoothTransition, delay }}
        className="flex flex-col gap-4 flex-1"
      >
        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#97CADB]">{label}</label>
        <input 
          required 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#018ABE] transition-all duration-500 text-white text-lg rounded-none"
        />
      </motion.div>
    );
  }