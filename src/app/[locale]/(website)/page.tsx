import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import MapSection from "@/components/sections/MapSection";
import FloatingContactButtons from "@/components/FloatingContactButtons";

export default function Home() {
  return (
    <div>
      <main>
        {/* Hero with YouTube video background - add youtubeVideoId prop when ready */}
        <HeroSection />

        {/* About / Story Section */}
        <AboutSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Projects / Portfolio Section */}
        <ProjectsSection />

        {/* Why Choose Us Section */}
        <WhyUsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Map Section */}
        <MapSection />
      </main>

      {/* Floating WhatsApp & Phone Buttons */}
      <FloatingContactButtons />
    </div>
  );
}
