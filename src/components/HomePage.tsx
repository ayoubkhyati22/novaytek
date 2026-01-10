import HeroSection from './sections/HeroSection';
import MetricsStrip from './sections/MetricsStrip';
import ProjectsSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import homeContent from '../data/homeContent.json';

export default function HomePage() {
  // Pull data from your JSON
  const { hero, metrics, projects, about, contact, theme } = homeContent;

  // We group your specific slider images here
  const heroSlides = {
    slides: [
      { 
        url: "images/slide1.jpg", 
        tag: "Global Network Protocol" 
      }
    ]
  };

  return (
    // Added 'relative' and z-index safety for the background subsystem logic
    <div className="relative bg-white text-[#02457A] selection:bg-[#97CADB]/30 min-h-screen">
      
      {/* FIXED: Pass the heroSlides object which contains the 'slides' array */}
      <HeroSection content={heroSlides} />
      
      {metrics.enabled && (
        <MetricsStrip 
          metrics={metrics.items}
          animations={theme.animations.smoothTransition}
        />
      )}
      
      <div className="relative z-10">
        <ProjectsSection 
          images={projects.images}
          animations={theme.animations.smoothTransition}
        />
        
        <AboutSection 
          content={about}
          animations={theme.animations.smoothTransition}
        />
        
        <ContactSection 
          contactInfo={contact.contactInfo}
          animations={theme.animations.smoothTransition}
        />
      </div>
    </div>
  );
}