import { useLanguage } from '../i18n/LanguageContext';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * BRAND PALETTE:
 * Midnight Navy: #001B48
 * Deep Blue: #02457A
 * Ocean Blue: #018ABE
 * Soft Sky Blue: #97CADB
 * Ice Blue: #D6EBEE
 */

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: '#', name: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: '#', name: 'Twitter' },
    { icon: <Instagram size={18} />, href: '#', name: 'Instagram' },
    { icon: <Github size={18} />, href: '#', name: 'GitHub' },
  ];

  const quickLinks = [
    { name: t.nav.home, id: 'home' },
    { name: t.nav.projects, id: 'projects' },
    { name: t.nav.about, id: 'about' },
    { name: t.nav.contact, id: 'contact' },
  ];

  return (
    <footer className="relative bg-[#001B48] pt-24 pb-12 overflow-hidden border-t border-[#018ABE]/10">
      
      {/* Structural Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#02457A]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#97CADB]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-black tracking-tighter text-white mb-6 uppercase">
              NOVAY<span className="text-[#018ABE]">TEK</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-sm font-light">
              {t.footer.tagline}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-none bg-[#02457A]/30 border border-white/5 text-slate-400 hover:text-white hover:bg-[#018ABE] hover:border-[#018ABE] transition-all duration-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation - Professional List */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px] text-[#D6EBEE]">Sitemap</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-400 hover:text-[#97CADB] flex items-center group transition-colors text-xs font-black uppercase tracking-widest"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#97CADB]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px] text-[#D6EBEE]">Inquiries</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-none bg-[#018ABE]/10 text-[#018ABE] border border-[#018ABE]/10">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Email Protocol</p>
                  <a href={`mailto:${t.contact.info.emailText}`} className="text-slate-300 hover:text-[#97CADB] transition-colors text-sm font-medium">
                    {t.contact.info.emailText}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-none bg-[#018ABE]/10 text-[#018ABE] border border-[#018ABE]/10">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Direct Line</p>
                  <p className="text-slate-300 text-sm font-medium">{t.contact.info.phoneText}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter - Sharp Architectural Box */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-none bg-[#02457A]/20 border border-white/5 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#018ABE] opacity-30 group-hover:opacity-100 transition-opacity" />
              
              <h4 className="text-lg font-black text-white mb-3 uppercase tracking-tight">Intelligence</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed font-light">
                Subscribe to our digital briefings and industrial insights.
              </p>
              
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-[#001B48] border border-white/10 rounded-none py-4 px-4 text-white text-[10px] font-black tracking-widest focus:outline-none focus:border-[#018ABE] transition-colors placeholder:text-slate-600"
                />
                <button className="absolute right-2 top-2 bottom-2 px-3 rounded-none bg-[#018ABE] hover:bg-white hover:text-[#001B48] text-white transition-all">
                  <ArrowUpRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; {currentYear} NOVAYTEK. {t.footer.rights}
          </p>
          
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((text) => (
              <a 
                key={text} 
                href="#" 
                className="text-[9px] text-slate-500 hover:text-[#D6EBEE] uppercase tracking-[0.2em] transition-colors font-black"
              >
                {text}
              </a>
            ))}
          </div>

          {/* System Status Light */}
          <div className="flex items-center gap-2 bg-[#97CADB]/5 px-4 py-1.5 border border-[#97CADB]/10">
            <div className="w-1.5 h-1.5 rounded-none bg-[#97CADB] animate-pulse" />
            <span className="text-[#97CADB] text-[9px] font-black uppercase tracking-[0.2em]">Systems Nominal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}