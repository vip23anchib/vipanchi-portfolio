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
import TrainTrackNav from './components/TrainTrackNav';
import StationInspector from './components/transit/StationInspector';
import TransitContactModal from './components/transit/TransitContactModal';
import TrackDivider from './components/TrackDivider';
import { TRANSIT_STATIONS } from './data/transitData';

export default function App() {
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [inspectingStationId, setInspectingStationId] = useState(null);
  const [activeLineFilter, setActiveLineFilter] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const inspectingStation = TRANSIT_STATIONS.find((s) => s.id === inspectingStationId);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-ink-primary font-sans selection:bg-metro-backend selection:text-white antialiased relative">
      
      {/* 1. Main Navigation */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* 2. Train-Track Side Navigation */}
      <TrainTrackNav />

      {/* 3. Page Flow */}
      <main>
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        <TrackDivider />
        <AboutSection />

        <TrackDivider />
        <SkillsSection />

        <TrackDivider />
        <MetroMapSection
          selectedStationId={selectedStationId}
          onSelectStation={(id) => setSelectedStationId(id)}
          activeLineFilter={activeLineFilter}
          setActiveLineFilter={setActiveLineFilter}
          onOpenFullDrawer={(id) => setInspectingStationId(id)}
        />

        <TrackDivider />
        <ExperienceSection />

        <TrackDivider />
        <ProjectsSection />

        <TrackDivider />
        <AchievementsSection />

        <TrackDivider />
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Full Station Detail Inspector Slide-Out Drawer (When explicitly opened) */}
      {inspectingStation && (
        <StationInspector
          station={inspectingStation}
          onClose={() => setInspectingStationId(null)}
          onSelectStation={(id) => {
            setSelectedStationId(id);
            setInspectingStationId(id);
          }}
        />
      )}

      {/* 6. Quick Contact Modal */}
      <TransitContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
