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
   * BRAND PALETTE:
   * Midnight Navy: #001B48
   * Deep Blue: #02457A
   * Ocean Blue: #018ABE
   * Soft Sky Blue: #97CADB
   * Ice Blue: #D6EBEE
   */
  
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
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  
    return (
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#001B48]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#018ABE]/10 rounded-full blur-[120px]" 
          />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        </div>
  
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-none mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#97CADB]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D6EBEE]">{t.hero.tagline}</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] mb-8">
              {t.hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#97CADB] to-[#018ABE]">{t.hero.subtitle}</span>
            </h1>
  
            <p className="text-xl text-slate-300 max-w-lg mb-12 leading-relaxed font-light">
              {t.hero.description}
            </p>
  
            <div className="flex flex-wrap gap-6">
              <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                 className="px-10 py-5 bg-[#018ABE] hover:bg-[#02457A] text-white font-bold transition-all flex items-center group shadow-2xl rounded-none"
              >
                {t.hero.cta} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
              <button 
                 onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                 className="px-10 py-5 border border-white/20 text-white hover:bg-white/10 transition-all font-bold rounded-none"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </motion.div>
  
          <motion.div 
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 rounded-none overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                alt="Cybersecurity Interface"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001B48] via-transparent to-transparent" />
            </div>
            {/* Decorative Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-[#02457A] p-6 border border-white/20 shadow-2xl z-20 rounded-none"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#018ABE] rounded-none">
                  <Shield className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm uppercase tracking-widest">Protocol Active</p>
                  <p className="text-[#97CADB] text-[10px] font-black uppercase">Secure Environment</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }
  
  function MetricsStrip() {
    const { t } = useLanguage();
    return (
      <div className="bg-white py-20 border-b border-[#D6EBEE]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {Object.entries(t.about.stats).map(([key, value], idx) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col border-l-[6px] border-[#018ABE] pl-8"
            >
              <AnimatedNumber value={idx === 0 ? 150 : idx === 1 ? 98 : idx === 2 ? 12 : 50} suffix={idx === 1 ? "%" : "+"} />
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-black mt-2">{value as string}</span>
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
        const duration = 2000;
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
      <span ref={ref} className="text-5xl font-black text-[#001B48] tabular-nums">
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
      <section id="projects" className="py-32 bg-[#D6EBEE]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-[#001B48] uppercase">{t.projects.title}</h2>
              <div className="w-24 h-3 bg-[#018ABE] mb-8" />
              <p className="text-slate-500 text-xl leading-relaxed font-light">{t.projects.subtitle}</p>
            </motion.div>
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-3 text-[#018ABE] font-black tracking-[0.3em] text-xs group"
            >
              VIEW DIRECTORY <ChevronRight className="transition-all" />
            </motion.button>
          </div>
  
          <div className="grid md:grid-cols-3 gap-0">
            {t.projects.items.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group bg-white flex flex-col h-full border border-slate-200 hover:border-[#018ABE] transition-all duration-500 relative z-10 hover:z-20"
              >
                <div className="h-80 overflow-hidden relative">
                   <img 
                    src={images[index]} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                   />
                   <div className="absolute inset-0 bg-[#001B48]/20 group-hover:bg-transparent transition-colors duration-500" />
                   <div className="absolute bottom-0 left-0 p-4 bg-[#018ABE] text-white text-[10px] font-black uppercase tracking-widest">
                      {project.tech}
                   </div>
                </div>
                <div className="p-12 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black mb-6 text-[#001B48] group-hover:text-[#018ABE] transition-colors uppercase tracking-tight">{project.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-grow font-light">{project.description}</p>
                  <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-[#001B48] font-black text-xs tracking-widest uppercase">
                     Analyze Case <ArrowRight size={18} className="text-[#018ABE]" />
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
      { icon: <Globe />, label: "Global Presence" },
      { icon: <Shield />, label: "Encrypted Infrastructure" },
      { icon: <Zap />, label: "Rapid Deployment" },
      { icon: <Target />, label: "Precision Strategy" }
    ];
  
    return (
      <section id="about" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-none overflow-hidden shadow-2xl border-4 border-[#001B48]">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                    alt="Our Office" 
                    className="w-full h-[650px] object-cover"
                />
            </div>
            <div className="absolute -bottom-8 -right-8 w-full h-full border border-[#D6EBEE] -z-10" />
          </motion.div>
  
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#001B48] leading-tight uppercase">
              Operational <span className="text-[#018ABE]">Integrity</span>. <br />Digital <span className="text-[#97CADB]">Clarity</span>.
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed font-light">
              {t.about.subtitle}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {expertise.map((item, i) => (
                <motion.div 
                    key={i} 
                    whileHover={{ backgroundColor: '#D6EBEE' }}
                    className="flex flex-col gap-4 p-8 bg-[#D6EBEE]/20 border border-[#D6EBEE] rounded-none group transition-colors"
                >
                  <span className="text-[#018ABE] group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="font-black text-[10px] uppercase tracking-widest text-[#001B48]">{item.label}</span>
                </motion.div>
              ))}
            </div>
  
            <div className="bg-[#001B48] p-12 rounded-none relative overflow-hidden">
               <div className="relative z-10 space-y-10">
                 {t.about.valueItems.map((val, idx) => (
                    <div key={idx} className={`${idx !== 0 ? 'pt-10 border-t border-white/10' : ''}`}>
                      <h4 className="text-white text-lg font-black mb-4 uppercase tracking-widest">{val.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed font-light">{val.description}</p>
                    </div>
                 ))}
               </div>
            </div>
          </motion.div>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <h2 className="text-6xl font-black text-[#001B48] mb-8 uppercase tracking-tighter">{t.contact.title}</h2>
              <p className="text-xl text-slate-500 font-light max-w-sm">{t.contact.subtitle}</p>
            </div>
  
            <div className="space-y-0">
               {[
                 { icon: <Mail />, label: t.contact.info.emailText },
                 { icon: <Phone />, label: t.contact.info.phoneText },
                 { icon: <MapPin />, label: t.contact.info.addressText }
               ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ backgroundColor: '#f8fafc', paddingLeft: '2rem' }}
                    className="flex items-center gap-8 py-10 border-b border-slate-100 last:border-0 transition-all cursor-pointer group"
                  >
                     <div className="text-[#018ABE] transition-transform group-hover:scale-125">{item.icon}</div>
                     <span className="font-black text-lg text-[#001B48] uppercase tracking-tight">{item.label}</span>
                  </motion.div>
               ))}
            </div>
          </motion.div>
  
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#001B48] p-12 md:p-16 shadow-2xl relative overflow-hidden rounded-none"
          >
            <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <MinimalInput label={t.contact.form.name} value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} />
                <MinimalInput label={t.contact.form.email} value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
              </div>
              <MinimalInput label={t.contact.form.subject} value={formData.subject} onChange={(v: string) => setFormData({...formData, subject: v})} />
              
              <div className="flex flex-col gap-4">
                 <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#97CADB]">{t.contact.form.message}</label>
                 <textarea 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-transparent border border-white/20 p-6 outline-none focus:border-[#018ABE] transition-all resize-none text-white text-lg rounded-none placeholder:text-white/10"
                    placeholder="Briefing details..."
                 />
              </div>
  
              <motion.button 
                whileHover={{ backgroundColor: '#ffffff', color: '#001B48' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#018ABE] text-white font-black py-7 rounded-none flex items-center justify-center gap-4 transition-all uppercase tracking-[0.3em] text-sm"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? "PROCESSING..." : (
                  <> {t.contact.form.submit} <Send size={20} /> </>
                )}
              </motion.button>
              {status === 'success' && (
                <p className="text-[#97CADB] font-black uppercase tracking-widest text-center text-xs animate-pulse">
                    Transmission complete.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    );
  }
  
  function MinimalInput({ label, value, onChange }: any) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#97CADB]">{label}</label>
        <input 
          required 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#018ABE] transition-all text-white text-lg rounded-none placeholder:text-white/10"
          placeholder={`${label}...`}
        />
      </div>
    );
  }