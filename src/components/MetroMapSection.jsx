import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Info, ArrowDown } from 'lucide-react';
import TransitMap from './transit/TransitMap';
import VerticalStripMap from './transit/VerticalStripMap';
import TransitLegend from './transit/TransitLegend';

export default function MetroMapSection({
  selectedStationId,
  onSelectStation,
  activeLineFilter,
  setActiveLineFilter
}) {
  return (
    <section id="network-map" className="py-16 md:py-20 border-t border-[#DDD6C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Visual System Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-ink-primary tracking-tight font-sans">
              Interactive Engineering Map
            </h2>
            <p className="text-sm text-ink-secondary mt-1 max-w-2xl leading-relaxed">
              Every colored line represents a core technical domain; every station represents a real project or internship built at the intersection of those skills. Click any stop to explore its architecture and code.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-ink-muted bg-white px-3.5 py-2 rounded-xl border border-[#DDD6C9] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-metro-backend"></span>
            <span>Click any line in the legend to filter</span>
          </div>
        </div>

        {/* Map Canvas + Docked Legend Layout */}
        <div className="space-y-6">
          
          {/* Desktop Map */}
          <div className="hidden md:block relative">
            <TransitMap
              selectedStationId={selectedStationId}
              onSelectStation={onSelectStation}
              activeLineFilter={activeLineFilter}
              setActiveLineFilter={setActiveLineFilter}
            />

            {/* Docked Skills Key in Bottom-Right Corner */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
              <TransitLegend
                activeLineFilter={activeLineFilter}
                setActiveLineFilter={setActiveLineFilter}
                onOpenStation={onSelectStation}
              />
            </div>
          </div>

          {/* Mobile Vertical Strip Diagram */}
          <div className="block md:hidden space-y-6">
            <VerticalStripMap
              selectedStationId={selectedStationId}
              onSelectStation={onSelectStation}
              activeLineFilter={activeLineFilter}
              setActiveLineFilter={setActiveLineFilter}
            />
            <TransitLegend
              activeLineFilter={activeLineFilter}
              setActiveLineFilter={setActiveLineFilter}
              onOpenStation={onSelectStation}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
