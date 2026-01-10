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
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80", 
        tag: "Global Network Protocol" 
      },
      { 
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80", 
        tag: "Secure Neural Infrastructure" 
      },
      { 
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80", 
        tag: "High-Latency Analytics" 
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