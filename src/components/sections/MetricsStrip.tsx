import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { motion, useInView } from 'framer-motion';

interface MetricItem {
  value: number;
  suffix: string;
  labelKey: string;
}

interface MetricsStripProps {
  metrics: MetricItem[];
  animations: {
    duration: number;
    ease: number[];
  };
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2500;
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

export default function MetricsStrip({ metrics, animations }: MetricsStripProps) {
  const { t } = useLanguage();
  const smoothTransition = { duration: animations.duration, ease: animations.ease };

  return (
    <div className="bg-white py-24 border-b border-[#D6EBEE]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {metrics.map((metric, idx) => (
          <motion.div 
            key={metric.labelKey}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smoothTransition, delay: idx * 0.1 }}
            className="flex flex-col border-l-[4px] border-[#D6EBEE] hover:border-[#018ABE] pl-8 transition-colors duration-700"
          >
            <AnimatedNumber value={metric.value} suffix={metric.suffix} />
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mt-3 leading-none">
              {(t.about.stats as any)[metric.labelKey]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}