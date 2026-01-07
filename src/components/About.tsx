import { Target, Eye, Heart, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useLanguage();

  const valueIcons = [
    <Target key="innovation" className="w-6 h-6" />,
    <Heart key="quality" className="w-6 h-6" />,
    <Eye key="integrity" className="w-6 h-6" />,
    <Users key="partnership" className="w-6 h-6" />,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-100/50 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-3 block">
            {t.about.badge || "Our Story"}
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {[
            { 
              title: t.about.mission, 
              text: t.about.missionText, 
              icon: <Target className="w-8 h-8" />, 
              color: "blue" 
            },
            { 
              title: t.about.vision, 
              text: t.about.visionText, 
              icon: <Eye className="w-8 h-8" />, 
              color: "cyan" 
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative group p-1 rounded-3xl bg-gradient-to-br from-white to-transparent border border-white shadow-xl shadow-blue-900/5 overflow-hidden"
            >
              <div className="relative bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[22px] h-full">
                <div className={`w-16 h-16 mb-8 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${
                  item.color === 'blue' ? 'bg-blue-600 shadow-blue-200' : 'bg-cyan-500 shadow-cyan-200'
                } shadow-2xl text-white`}>
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <div className="relative">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-slate-900 text-center mb-16"
          >
            {t.about.values}
          </motion.h3>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.about.valueItems.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" />
                
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-50 rounded-xl text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {valueIcons[index]}
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}