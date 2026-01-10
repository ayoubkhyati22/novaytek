import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

interface ContactInfoItem {
  icon: string;
  labelKey: string;
}

interface ContactSectionProps {
  contactInfo: ContactInfoItem[];
  animations: {
    duration: number;
    ease: number[];
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail />,
  Phone: <Phone />,
  MapPin: <MapPin />,
};

function MinimalInput({ label, value, onChange, delay, animations }: any) {
  const smoothTransition = { duration: animations.duration, ease: animations.ease };
  
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

export default function ContactSection({ contactInfo, animations }: ContactSectionProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const smoothTransition = { duration: animations.duration, ease: animations.ease };

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
             {contactInfo.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...smoothTransition, delay: i * 0.1 }}
                  className="flex items-center gap-8 py-10 border-b border-slate-100 last:border-0 hover:bg-[#F8FAFC] transition-all duration-700 cursor-pointer group px-4 -mx-4"
                >
                   <div className="text-[#018ABE] group-hover:scale-125 transition-transform duration-700">
                     {iconMap[item.icon]}
                   </div>
                   <span className="font-black text-lg text-[#001B48] uppercase tracking-tight">
                     {(t.contact.info as any)[item.labelKey]}
                   </span>
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
              <MinimalInput 
                label={t.contact.form.name} 
                value={formData.name} 
                onChange={(v: string) => setFormData({...formData, name: v})} 
                delay={0.1}
                animations={animations}
              />
              <MinimalInput 
                label={t.contact.form.email} 
                value={formData.email} 
                onChange={(v: string) => setFormData({...formData, email: v})} 
                delay={0.2}
                animations={animations}
              />
            </div>
            <MinimalInput 
              label={t.contact.form.subject} 
              value={formData.subject} 
              onChange={(v: string) => setFormData({...formData, subject: v})} 
              delay={0.3}
              animations={animations}
            />
            
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