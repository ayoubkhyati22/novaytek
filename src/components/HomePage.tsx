import HeroSection from './sections/HeroSection';
import MetricsStrip from './sections/MetricsStrip';
import ProjectsSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import homeContent from '../data/homeContent.json';

export default function HomePage() {
  const { hero, metrics, projects, about, contact, theme } = homeContent;

  return (
    <div className="bg-white text-[#02457A] selection:bg-[#97CADB]/30">
      <HeroSection 
        content={{
          backgroundImage: hero.backgroundImage,
          primaryImage: hero.primaryImage,
          primaryImageAlt: hero.primaryImageAlt,
        }}
        animations={theme.animations.smoothTransition}
      />
      
      {metrics.enabled && (
        <MetricsStrip 
          metrics={metrics.items}
          animations={theme.animations.smoothTransition}
        />
      )}
      
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
  );
}