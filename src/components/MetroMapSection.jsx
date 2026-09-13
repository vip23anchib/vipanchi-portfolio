import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import TransitMap from './transit/TransitMap';
import VerticalStripMap from './transit/VerticalStripMap';
import TransitLegend from './transit/TransitLegend';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function MetroMapSection({
  selectedStationId, onSelectStation, activeLineFilter, setActiveLineFilter, onOpenFullDrawer
}) {
  return (
    <section id="network-map" className="py-16 md:py-20 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="w-10 h-[3px] bg-metro-backend rounded-full mb-5" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Visual System Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight font-sans">
                Interactive Engineering Map
              </h2>
              <p className="text-sm text-[#374151] mt-2 max-w-2xl leading-relaxed">
                Every colored line represents a core technical domain; every station represents a real project or internship built at the intersection of those skills. Click any stop to explore its architecture and code.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#6B7280] bg-white px-3.5 py-2 rounded-xl border border-[#DDD6C9] shadow-sm shrink-0">
              <span className="w-2 h-2 rounded-full bg-metro-backend" />
              <span>Click any line in the legend to filter</span>
            </div>
          </div>
        </motion.div>

        {/* Content Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-3xl border border-[#E4DDD3] bg-white/50 shadow-[0_2px_24px_rgba(27,95,168,0.06)] p-4 sm:p-6"
        >
          <div className="space-y-6">
            {/* Desktop Map */}
            <div className="hidden md:block relative">
              <TransitMap
                selectedStationId={selectedStationId}
                onSelectStation={onSelectStation}
                activeLineFilter={activeLineFilter}
                setActiveLineFilter={setActiveLineFilter}
                onOpenFullDrawer={onOpenFullDrawer}
              />
              <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
                <TransitLegend
                  activeLineFilter={activeLineFilter}
                  setActiveLineFilter={setActiveLineFilter}
                  onOpenStation={(id) => { onSelectStation(id); }}
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="block md:hidden space-y-6">
              <VerticalStripMap
                selectedStationId={selectedStationId}
                onSelectStation={(id) => {
                  onSelectStation(id);
                  if (onOpenFullDrawer) onOpenFullDrawer(id);
                }}
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
        </motion.div>

      </div>
    </section>
  );
}
