import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import MetroMapSection from './components/MetroMapSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import StationInspector from './components/transit/StationInspector';
import TransitContactModal from './components/transit/TransitContactModal';
import { TRANSIT_STATIONS } from './data/transitData';

export default function App() {
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [activeLineFilter, setActiveLineFilter] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const selectedStation = TRANSIT_STATIONS.find((s) => s.id === selectedStationId);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-ink-primary font-sans selection:bg-metro-backend selection:text-white antialiased">
      
      {/* 1. Main Navigation */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* 2. Page Flow */}
      <main>
        {/* Hero Section */}
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Signature Interactive Metro Network Map Section */}
        <MetroMapSection
          selectedStationId={selectedStationId}
          onSelectStation={(id) => setSelectedStationId(id)}
          activeLineFilter={activeLineFilter}
          setActiveLineFilter={setActiveLineFilter}
        />

        {/* Work Experience Timeline */}
        <ExperienceSection />

        {/* Featured Projects Bento / Grid */}
        <ProjectsSection />

        {/* Hackathons & Honors Section */}
        <AchievementsSection />

        {/* Contact Form Section */}
        <ContactSection />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Station Detail Inspector Slide-Out Drawer */}
      {selectedStation && (
        <StationInspector
          station={selectedStation}
          onClose={() => setSelectedStationId(null)}
          onSelectStation={(id) => setSelectedStationId(id)}
        />
      )}

      {/* 5. Quick Contact Modal */}
      <TransitContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
