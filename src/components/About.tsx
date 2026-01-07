import { Target, Eye, Heart, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const valueIcons = [
    <Target key="innovation" className="w-8 h-8" />,
    <Heart key="quality" className="w-8 h-8" />,
    <Eye key="integrity" className="w-8 h-8" />,
    <Users key="partnership" className="w-8 h-8" />,
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t.about.mission}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.about.missionText}
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-cyan-600 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t.about.vision}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.about.visionText}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t.about.values}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.about.valueItems.map((value, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform">
                  {valueIcons[index]}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
