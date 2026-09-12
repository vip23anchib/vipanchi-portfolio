import React, { useState } from 'react';
import TransitHeader from './components/transit/TransitHeader';
import TransitMap from './components/transit/TransitMap';
import VerticalStripMap from './components/transit/VerticalStripMap';
import ListView from './components/transit/ListView';
import StationInspector from './components/transit/StationInspector';
import TransitLegend from './components/transit/TransitLegend';
import TransitAboutModal from './components/transit/TransitAboutModal';
import TransitContactModal from './components/transit/TransitContactModal';
import { TRANSIT_STATIONS, TRANSIT_LINES } from './data/transitData';
import { portfolioData } from './data/portfolioData';
import { Train, Mail, Download, MapPin, Code2, Sparkles, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './components/Icons';

export default function App() {
  const [activeView, setActiveView] = useState('map'); // 'map' | 'list'
  const [selectedStationId, setSelectedStationId] = useState('ayusetu'); // Default focus on Central Grand Junction
  const [activeLineFilter, setActiveLineFilter] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const selectedStation = TRANSIT_STATIONS.find((s) => s.id === selectedStationId);

  return (
    <div className="min-h-screen bg-[#0C0E14] text-zinc-100 flex flex-col font-sans selection:bg-metro-yellow selection:text-black">
      
      {/* 1. Master Transit Vignelli Header */}
      <TransitHeader
        activeView={activeView}
        setActiveView={setActiveView}
        selectedStationId={selectedStationId}
        onSelectStation={(id) => setSelectedStationId(id)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        activeLineFilter={activeLineFilter}
        setActiveLineFilter={setActiveLineFilter}
      />

      {/* 2. Main Transit Operations Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 flex flex-col gap-6">
        
        {/* System Broadcast Strip */}
        <div className="p-3.5 rounded-lg bg-zinc-900/90 border-l-4 border-metro-yellow border border-zinc-800 flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                NETWORK ADVISORY:
              </span>{' '}
              <span className="text-xs text-zinc-300 font-sans">
                Interactive Metro Network Map online. Click any station or track to inspect system architecture and telemetry specs.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="hidden sm:inline">100K+ TXNS ANALYZED</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">31 AUTOMATED TESTS</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-metro-yellow font-bold">VIT BHOPAL 9.04 CGPA</span>
          </div>
        </div>

        {/* Dynamic View Rendering */}
        {activeView === 'map' ? (
          <div className="space-y-6">
            
            {/* Desktop / Tablet: 2D Interactive SVG Schematic */}
            <div className="hidden md:block relative">
              <TransitMap
                selectedStationId={selectedStationId}
                onSelectStation={(id) => setSelectedStationId(id)}
                activeLineFilter={activeLineFilter}
                setActiveLineFilter={setActiveLineFilter}
              />

              {/* Floating Legend on Desktop Map */}
              <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
                <TransitLegend
                  activeLineFilter={activeLineFilter}
                  setActiveLineFilter={setActiveLineFilter}
                  onOpenStation={(id) => setSelectedStationId(id)}
                />
              </div>
            </div>

            {/* Mobile Viewport: In-Car Vertical Line Strip Schematic */}
            <div className="block md:hidden space-y-6">
              <VerticalStripMap
                selectedStationId={selectedStationId}
                onSelectStation={(id) => setSelectedStationId(id)}
                activeLineFilter={activeLineFilter}
                setActiveLineFilter={setActiveLineFilter}
              />
              <TransitLegend
                activeLineFilter={activeLineFilter}
                setActiveLineFilter={setActiveLineFilter}
                onOpenStation={(id) => setSelectedStationId(id)}
              />
            </div>

          </div>
        ) : (
          /* Accessibility Fallback: Line Directory Table / Cards */
          <ListView
            onSelectStation={(id) => setSelectedStationId(id)}
            activeLineFilter={activeLineFilter}
            setActiveLineFilter={setActiveLineFilter}
          />
        )}

      </main>

      {/* 3. Slide-In Station Ticket Inspector Card */}
      {selectedStation && (
        <StationInspector
          station={selectedStation}
          onClose={() => setSelectedStationId(null)}
          onSelectStation={(id) => setSelectedStationId(id)}
        />
      )}

      {/* 4. Modals */}
      <TransitAboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <TransitContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* 5. Transit Control Footer */}
      <footer className="w-full bg-black border-t border-zinc-800 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-metro-yellow" />
            <span className="font-bold text-white uppercase">Vipanchi Barman Transit Network</span>
            <span>•</span>
            <span>Bhopal / Hyderabad / Delhi</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="GitHub"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="LinkedIn"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={portfolioData.personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="LeetCode"
            >
              LeetCode
            </a>
            <span>•</span>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="hover:text-metro-yellow transition"
              title="Email"
            >
              barman23vipanchi@gmail.com
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
