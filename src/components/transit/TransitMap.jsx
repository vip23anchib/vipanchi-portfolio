import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TRANSIT_LINES,
  TRANSIT_STATIONS,
  SVG_TRACK_PATHS,
  TRAIN_ANIMATION_ROUTE
} from '../../data/transitData';
import { ZoomIn, ZoomOut, RotateCcw, Play, Compass, ArrowRight, X, ExternalLink, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../Icons';

export default function TransitMap({
  selectedStationId,
  onSelectStation,
  activeLineFilter,
  setActiveLineFilter,
  onOpenFullDrawer
}) {
  const [hoveredStation, setHoveredStation] = useState(null);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [trainProgress, setTrainProgress] = useState(0);
  const [isTrainRunning, setIsTrainRunning] = useState(true);
  const [cardTab, setCardTab] = useState('overview'); // 'overview' | 'code'

  // Stable Pan and Zoom ViewBox state (1200 x 680)
  const defaultViewBox = { x: 0, y: 0, width: 1200, height: 680 };
  const [viewBox, setViewBox] = useState(defaultViewBox);

  // Active Station Target
  const selectedStation = TRANSIT_STATIONS.find(s => s.id === selectedStationId);

  // On initial render, smoothly animate the train along the route
  useEffect(() => {
    let interval = null;
    if (isTrainRunning) {
      interval = setInterval(() => {
        setTrainProgress(prev => {
          if (prev >= TRAIN_ANIMATION_ROUTE.length - 1) {
            setIsTrainRunning(false);
            return TRAIN_ANIMATION_ROUTE.length - 1;
          }
          return prev + 1;
        });
      }, 650);
    }
    return () => clearInterval(interval);
  }, [isTrainRunning]);

  const restartTrain = () => {
    setTrainProgress(0);
    setIsTrainRunning(true);
  };

  const handleZoomIn = () => {
    setViewBox(prev => ({
      x: prev.x + 50,
      y: prev.y + 30,
      width: Math.max(500, prev.width - 150),
      height: Math.max(300, prev.height - 85)
    }));
  };

  const handleZoomOut = () => {
    setViewBox(prev => ({
      x: Math.max(0, prev.x - 50),
      y: Math.max(0, prev.y - 30),
      width: Math.min(1200, prev.width + 150),
      height: Math.min(680, prev.height + 85)
    }));
  };

  const handleResetView = () => {
    setViewBox(defaultViewBox);
  };

  const currentTrainCoord = TRAIN_ANIMATION_ROUTE[trainProgress] || TRAIN_ANIMATION_ROUTE[0];

  return (
    <div className="relative w-full h-[580px] lg:h-[640px] map-paper-bg map-crease-overlay rounded-2xl border border-[#DDD6C9] shadow-paper-lg overflow-hidden select-none flex items-center justify-center">
      
      {/* Top Left: Controls & Tour */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 pointer-events-auto">
        <div className="px-3.5 py-2 rounded-xl bg-white border border-[#DDD6C9] shadow-paper flex items-center gap-2.5">
          <Compass className="w-4 h-4 text-metro-backend" />
          <span className="font-extrabold text-xs text-ink-primary tracking-tight font-sans">
            Interactive Network Map
          </span>
        </div>

        <button
          onClick={restartTrain}
          title="Re-run route tour"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F4EFE6] text-ink-primary border border-[#DDD6C9] text-xs font-bold shadow-paper transition"
        >
          <Play className="w-3.5 h-3.5 text-metro-data fill-metro-data" />
          <span className="hidden sm:inline">Play Tour</span>
        </button>
      </div>

      {/* Top Right: Zoom & Reset Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#DDD6C9] shadow-paper">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2 rounded-lg hover:bg-[#F4EFE6] text-ink-secondary hover:text-ink-primary transition"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-2 rounded-lg hover:bg-[#F4EFE6] text-ink-secondary hover:text-ink-primary transition"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          title="Reset Whole Map"
          className="p-2 rounded-lg hover:bg-[#F4EFE6] text-ink-secondary hover:text-ink-primary transition flex items-center gap-1 text-xs font-bold px-2.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Main Printed Interactive SVG Canvas */}
      <svg
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        className="w-full h-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="softLineShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2D2418" floodOpacity="0.12" />
          </filter>

          <filter id="markerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#2D2418" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Compass Rose in Corner */}
        <g transform="translate(1120, 60)" className="opacity-35 pointer-events-none">
          <circle r="26" fill="none" stroke="#B5ADA0" strokeWidth="1" strokeDasharray="3,3" />
          <polygon points="0,-22 5,-7 0,-10 -5,-7" fill="#1B5FA8" />
          <polygon points="0,22 5,7 0,10 -5,7" fill="#B5ADA0" />
          <text x="0" y="-26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1B5FA8">N</text>
        </g>

        {/* 1. Main Transit Lines (Drawn with smooth curved bezier tracks) */}
        <g id="metro-tracks">
          {Object.entries(SVG_TRACK_PATHS).map(([lineKey, track]) => {
            const isHovered = hoveredLine === lineKey;
            const isFiltered = activeLineFilter === lineKey;
            const isDimmed = (hoveredLine && !isHovered) || (activeLineFilter && !isFiltered);

            return (
              <motion.path
                key={lineKey}
                d={track.d}
                fill="none"
                stroke={track.color}
                strokeWidth={isHovered || isFiltered ? "10" : "7.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#softLineShadow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                opacity={isDimmed ? 0.18 : 1}
                className="transit-track-path cursor-pointer"
                onMouseEnter={() => setHoveredLine(lineKey)}
                onMouseLeave={() => setHoveredLine(null)}
                onClick={() => setActiveLineFilter(activeLineFilter === lineKey ? null : lineKey)}
              />
            );
          })}
        </g>

        {/* 2. Stations & Interchanges (Uncluttered, No Achievement Overlaps) */}
        <g id="stations">
          {TRANSIT_STATIONS.map((station) => {
            const isSelected = selectedStationId === station.id;
            const isInterchange = station.type === 'interchange' || station.type === 'grand_junction';
            const isOrigin = station.type === 'terminus_origin';
            const isDestination = station.type === 'terminus_destination';

            const matchesFilter = !activeLineFilter || station.lines.includes(activeLineFilter);
            const opacity = matchesFilter ? 1 : 0.25;

            return (
              <g
                key={station.id}
                transform={`translate(${station.x}, ${station.y})`}
                opacity={opacity}
                className="station-marker group"
                onClick={() => onSelectStation(station.id)}
                onMouseEnter={() => setHoveredStation(station.id)}
                onMouseLeave={() => setHoveredStation(null)}
              >
                {/* Active Selection Pulse Ring */}
                {isSelected && (
                  <circle
                    r="22"
                    fill="none"
                    stroke="#1B5FA8"
                    strokeWidth="2.5"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* You Are Here Pin on Open to Roles */}
                {isDestination && (
                  <g transform="translate(0, -32)" className="animate-bounce pointer-events-none">
                    <rect x="-44" y="-18" width="88" height="20" rx="10" fill="#1B824C" filter="url(#markerShadow)" />
                    <text x="0" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">
                      📍 Open to Roles
                    </text>
                  </g>
                )}

                {/* Grand Junction Concentric Multi-Ring (AyuSetu) */}
                {station.type === 'grand_junction' && (
                  <>
                    <circle r="16" fill="#FFFFFF" stroke="#1A1E29" strokeWidth="2.5" filter="url(#markerShadow)" />
                    <circle r="11" fill="#FFFFFF" stroke="#E05A2B" strokeWidth="3" />
                    <circle r="5" fill="#1B5FA8" />
                  </>
                )}

                {/* Interchange Concentric Multi-Ring (Meslova / Saurabhi) */}
                {station.type === 'interchange' && (
                  <>
                    <circle r="14" fill="#FFFFFF" stroke="#1A1E29" strokeWidth="2.5" filter="url(#markerShadow)" />
                    <circle r="8" fill="#FFFFFF" stroke="#1B5FA8" strokeWidth="3" />
                  </>
                )}

                {/* Terminus Origin / Destination */}
                {(isOrigin || isDestination) && (
                  <>
                    <rect
                      x="-13"
                      y="-13"
                      width="26"
                      height="26"
                      rx="6"
                      fill="#FFFFFF"
                      stroke="#1A1E29"
                      strokeWidth="2.5"
                      filter="url(#markerShadow)"
                    />
                    <circle r="5" fill={isDestination ? '#1B824C' : '#1B5FA8'} />
                  </>
                )}

                {/* Regular Project Station Marker */}
                {station.type === 'junction' && (
                  <circle
                    r="8.5"
                    fill="#FFFFFF"
                    stroke="#1A1E29"
                    strokeWidth="2.5"
                    filter="url(#markerShadow)"
                    className="transition-transform duration-200 group-hover:scale-125"
                  />
                )}

                {/* Local Station */}
                {station.type === 'station' && (
                  <circle
                    r="6.5"
                    fill="#FFFFFF"
                    stroke="#7E347D"
                    strokeWidth="2"
                    filter="url(#markerShadow)"
                    className="transition-transform duration-200 group-hover:scale-125"
                  />
                )}

                {/* Solid Label Background Pill to prevent any text ghosting */}
                <g transform={`translate(${station.labelPos === 'right' ? 22 : station.labelPos === 'left' ? -22 : 0}, ${station.labelPos === 'top' ? -22 : station.labelPos === 'bottom' ? 24 : 0})`}>
                  
                  {/* Station Name */}
                  <text
                    x="0"
                    y="0"
                    textAnchor={
                      station.labelPos === 'right' ? 'start' : station.labelPos === 'left' ? 'end' : 'middle'
                    }
                    fill={isSelected ? '#1B5FA8' : '#1A1E29'}
                    fontSize={isInterchange || isOrigin || isDestination ? '13' : '12'}
                    fontWeight={isSelected || isInterchange ? '800' : '700'}
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    className="map-typography"
                  >
                    {station.shortName}
                  </text>

                  {/* Category Pill */}
                  <text
                    x="0"
                    y={station.labelPos === 'top' ? -14 : 14}
                    textAnchor={
                      station.labelPos === 'right' ? 'start' : station.labelPos === 'left' ? 'end' : 'middle'
                    }
                    fill="#626875"
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    className="map-typography"
                  >
                    {station.category}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {/* 3. Animated Train Tour Marker */}
        <g
          transform={`translate(${currentTrainCoord.x}, ${currentTrainCoord.y})`}
          className="transition-all duration-600 ease-out pointer-events-none"
        >
          <circle r="12" fill="#D99B16" opacity="0.35" className="animate-ping" />
          <circle r="8.5" fill="#D99B16" stroke="#FFFFFF" strokeWidth="2" filter="url(#markerShadow)" />
          <circle r="3" fill="#FFFFFF" />
        </g>
      </svg>

      {/* 4. Predictable Docked Station Detail Card & Hover Tooltip (Bottom Left) */}
      <AnimatePresence>
        {selectedStation ? (
          /* Fixed Selected Station Detail Card - 100% Solid Opaque Background with Strong Dark Contrast */
          <motion.div
            key={selectedStation.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-4 left-4 z-30 pointer-events-auto p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#DDD6C9] shadow-2xl max-w-[calc(100%-2rem)] sm:max-w-[430px] w-full text-xs animate-in fade-in"
          >
            {/* Header: Line pills, Category & Close Button */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-1.5 flex-wrap">
                {selectedStation.lines.map(lKey => {
                  const l = Object.values(TRANSIT_LINES).find(item => item.id === lKey);
                  return (
                    <span
                      key={lKey}
                      className="px-2.5 py-0.5 rounded-full flex items-center justify-center font-black text-[10px] text-white shadow-sm"
                      style={{ backgroundColor: l?.color }}
                    >
                      {l?.code}
                    </span>
                  );
                })}
                <span className="text-[11px] font-bold text-[#1F2937] bg-[#F3F4F6] px-2.5 py-0.5 rounded-md border border-[#E5E7EB]">
                  {selectedStation.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {selectedStation.codeSnippet && (
                  <div className="flex items-center bg-[#F3F4F6] p-0.5 rounded-lg border border-[#E5E7EB]">
                    <button
                      onClick={() => setCardTab('overview')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition ${
                        cardTab === 'overview' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setCardTab('code')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                        cardTab === 'code' ? 'bg-white text-metro-backend shadow-sm' : 'text-[#6B7280]'
                      }`}
                    >
                      <Code2 className="w-3 h-3" />
                      <span>Code</span>
                    </button>
                  </div>
                )}

                <button
                  onClick={() => onSelectStation(null)}
                  title="Close station details"
                  className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#4B5563] hover:text-[#111827] transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            {cardTab === 'overview' ? (
              <div>
                <div className="font-black text-[#111827] text-base sm:text-lg font-sans tracking-tight leading-snug">
                  {selectedStation.name}
                </div>
                <div className="text-xs text-[#4B5563] font-semibold mt-0.5">
                  {selectedStation.subtitle}
                </div>

                <p className="text-[#1F2937] text-xs leading-relaxed font-medium mt-2.5">
                  {selectedStation.summary}
                </p>

                {/* Tech Chips */}
                {selectedStation.techStack && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedStation.techStack.slice(0, 5).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#F9FAFB] text-[11px] font-semibold text-[#1F2937] border border-[#E5E7EB]"
                      >
                        {tech}
                      </span>
                    ))}
                    {selectedStation.techStack.length > 5 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-[#F3F4F6] text-[10px] font-bold text-[#6B7280]">
                        +{selectedStation.techStack.length - 5}
                      </span>
                    )}
                  </div>
                )}

                {/* Action Row */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E5E7EB]">
                  {selectedStation.live && (
                    <a
                      href={selectedStation.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                    </a>
                  )}

                  {selectedStation.github && (
                    <a
                      href={selectedStation.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#111827] text-xs font-bold border border-[#D1D5DB] shadow-sm transition"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {onOpenFullDrawer && (
                    <button
                      onClick={() => onOpenFullDrawer(selectedStation.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-metro-backend hover:bg-[#154E8C] text-white text-xs font-bold shadow-sm transition ml-auto"
                    >
                      <span>Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Inline Code Snippet */
              <div className="space-y-2 mt-1">
                <div className="flex items-center justify-between text-xs text-[#4B5563] font-semibold">
                  <span>Implementation Snippet</span>
                  <span className="font-mono text-[11px] text-metro-backend font-bold">Python / SQL</span>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#1E222B] text-emerald-300 font-mono text-[11.5px] max-h-40 overflow-y-auto border border-[#374151] leading-relaxed">
                  <code>{selectedStation.codeSnippet}</code>
                </pre>
              </div>
            )}
          </motion.div>
        ) : hoveredStation ? (
          /* Hover Tooltip Preview */
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            className="absolute bottom-4 left-4 z-30 pointer-events-none p-4 rounded-2xl bg-white border-2 border-[#DDD6C9] shadow-2xl max-w-sm text-xs"
          >
            {(() => {
              const st = TRANSIT_STATIONS.find(s => s.id === hoveredStation);
              if (!st) return null;
              return (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {st.lines.map(lKey => {
                      const l = Object.values(TRANSIT_LINES).find(item => item.id === lKey);
                      return (
                        <span
                          key={lKey}
                          className="w-4 h-4 rounded-full flex items-center justify-center font-black text-[9px] text-white shadow-sm"
                          style={{ backgroundColor: l?.color }}
                        >
                          {l?.code}
                        </span>
                      );
                    })}
                    <span className="text-[11px] font-bold text-[#4B5563]">
                      {st.category}
                    </span>
                  </div>
                  <div className="font-black text-[#111827] text-sm">{st.name}</div>
                  <p className="text-[#1F2937] text-xs line-clamp-2 mt-1 leading-relaxed font-medium">
                    {st.summary}
                  </p>
                  <div className="mt-2.5 text-xs text-metro-backend font-black flex items-center gap-1">
                    <span>Click station to view details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ) : null}
      </AnimatePresence>

    </div>
  );
}
