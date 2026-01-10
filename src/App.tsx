import { LanguageProvider } from './i18n/LanguageContext';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navigation />
        <HomePage />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;