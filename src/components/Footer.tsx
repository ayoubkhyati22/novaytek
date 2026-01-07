import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            NOVAYTEK
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {t.footer.tagline}
          </p>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500">
              &copy; {currentYear} NOVAYTEK. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
