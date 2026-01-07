import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        { ...formData, language },
      ]);
      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 bg-white overflow-hidden">
      {/* Premium Background Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-sm font-medium">
            <MessageSquare className="w-4 h-4 mr-2" />
            {t.contact.badge || "Get in Touch"}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Information Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="relative group overflow-hidden bg-slate-900 rounded-[2rem] p-10 text-white shadow-2xl">
              {/* Subtle mesh gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8">{t.contact.info.header || "Contact Info"}</h3>

                <div className="space-y-8">
                  <ContactItem icon={<MapPin />} title={t.contact.info.address} text={t.contact.info.addressText} />
                  <ContactItem icon={<Mail />} title={t.contact.info.email} text={t.contact.info.emailText} />
                  <ContactItem icon={<Phone />} title={t.contact.info.phone} text={t.contact.info.phoneText} />
                </div>

                <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="grid grid-cols-2 gap-4 divide-x divide-white/10">
                    <div className="text-center">
                      <p className="text-blue-400 text-xs uppercase tracking-widest font-bold mb-1">Status</p>
                      <div className="flex items-center justify-center text-lg font-semibold">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Available
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-blue-400 text-xs uppercase tracking-widest font-bold mb-1">Response</p>
                      <div className="text-lg font-semibold text-white">&lt; 24h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <PremiumInput 
                  label={t.contact.form.name} 
                  name="name" 
                  type="text" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
                <PremiumInput 
                  label={t.contact.form.email} 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <PremiumInput 
                  label={t.contact.form.phone} 
                  name="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
                <PremiumInput 
                  label={t.contact.form.subject} 
                  name="subject" 
                  type="text" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none"
                />
                <label htmlFor="message" className="absolute left-5 top-4 text-slate-400 pointer-events-none transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2">
                  {t.contact.form.message}
                </label>
              </div>

              {/* Status Messages with AnimatePresence */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span className="font-medium text-sm">{t.contact.form.success}</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="font-medium text-sm">{t.contact.form.error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {status === 'sending' ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{t.contact.form.submit}</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Reusable Contact Info Item Component
function ContactItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center group">
      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
        <div className="text-white w-6 h-6">
          {icon}
        </div>
      </div>
      <div className="ml-5">
        <div className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-0.5">{title}</div>
        <div className="text-lg font-medium text-slate-100">{text}</div>
      </div>
    </div>
  );
}

// Reusable Premium Input Component with Floating Label effect
function PremiumInput({ label, name, type, value, onChange, required = false }: any) {
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all"
      />
      <label
        htmlFor={name}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-all
                   peer-focus:-top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2
                   peer-[:not(:placeholder-shown)]:-top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
      >
        {label}
      </label>
    </div>
  );
}