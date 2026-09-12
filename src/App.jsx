import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import SocialRail from './components/SocialRail';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import AboutModal from './components/AboutModal';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import TerminalDrawer from './components/TerminalDrawer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-obsidian text-slate-100 selection:bg-cyan-glow/20 selection:text-cyan-glow overflow-x-hidden font-sans">
      
      {/* Interactive Bootloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Application HUD */}
      {!loading && (
        <div className="animate-in fade-in duration-500">
          {/* Header Navigation */}
          <Navbar 
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenAbout={() => setAboutModalOpen(true)}
          />

          {/* Vertical Telemetry Social Rail */}
          <SocialRail />

          {/* Main Content Flow */}
          <main className="relative z-10">
            {/* Hero Section */}
            <Hero 
              onOpenTerminal={() => setTerminalOpen(true)}
              onOpenAbout={() => setAboutModalOpen(true)}
            />

            {/* About Section */}
            <AboutSection 
              onOpenAboutModal={() => setAboutModalOpen(true)}
            />

            {/* Technical Skills Matrix */}
            <SkillsSection />

            {/* Work Experience Timeline */}
            <ExperienceSection />

            {/* Production Projects Bento Grid */}
            <ProjectsSection />

            {/* Honors, Hackathons & Leadership */}
            <AchievementsSection />

            {/* Contact Protocol & Form */}
            <ContactSection />
          </main>

          {/* System Footer */}
          <Footer onOpenTerminal={() => setTerminalOpen(true)} />

          {/* Modals & Interactive Drawers */}
          <TerminalDrawer 
            isOpen={terminalOpen} 
            onClose={() => setTerminalOpen(false)} 
          />

          <AboutModal 
            isOpen={aboutModalOpen} 
            onClose={() => setAboutModalOpen(false)} 
          />
        </div>
      )}

    </div>
  );
}
