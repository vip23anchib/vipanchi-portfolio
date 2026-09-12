import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TRANSIT_LINES,
  TRANSIT_STATIONS,
  LANDMARK_ACHIEVEMENTS,
  SVG_TRACK_PATHS,
  SVG_SPUR_PATHS,
  TRAIN_ANIMATION_ROUTE
} from '../../data/transitData';
import { ZoomIn, ZoomOut, RotateCcw, Award, Play, Train, Sparkles } from 'lucide-react';

export default function TransitMap({
  selectedStationId,
  onSelectStation,
  activeLineFilter,
  setActiveLineFilter
}) {
  const [hoveredStation, setHoveredStation] = useState(null);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [hoveredLandmark, setHoveredLandmark] = useState(null);
  const [trainProgress, setTrainProgress] = useState(0);
  const [isTrainRunning, setIsTrainRunning] = useState(true);

  // Pan and Zoom ViewBox state (default 1200 x 750)
  const defaultViewBox = { x: 0, y: 0, width: 1200, height: 750 };
  const [viewBox, setViewBox] = useState(defaultViewBox);

  // Train position calculation along the route
  const currentStationTarget = TRANSIT_STATIONS.find(s => s.id === selectedStationId);

  // On page load, smoothly animate the train along the route
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
      }, 750);
    }
    return () => clearInterval(interval);
  }, [isTrainRunning]);

  const restartTrain = () => {
    setTrainProgress(0);
    setIsTrainRunning(true);
  };

  // When a station is selected, smoothly pan the viewBox toward it
  useEffect(() => {
    if (currentStationTarget) {
      const targetX = Math.max(0, Math.min(600, currentStationTarget.x - 300));
      const targetY = Math.max(0, Math.min(300, currentStationTarget.y - 250));
      setViewBox({
        x: targetX,
        y: targetY,
        width: 800,
        height: 500
      });
    }
  }, [selectedStationId]);

  const handleZoomIn = () => {
    setViewBox(prev => ({
      x: prev.x + 50,
      y: prev.y + 35,
      width: Math.max(500, prev.width - 150),
      height: Math.max(300, prev.height - 90)
    }));
  };

  const handleZoomOut = () => {
    setViewBox(prev => ({
      x: Math.max(0, prev.x - 50),
      y: Math.max(0, prev.y - 35),
      width: Math.min(1200, prev.width + 150),
      height: Math.min(750, prev.height + 90)
    }));
  };

  const handleResetView = () => {
    setViewBox(defaultViewBox);
  };

  // Train coordinates interpolation
  const currentTrainCoord = TRAIN_ANIMATION_ROUTE[trainProgress] || TRAIN_ANIMATION_ROUTE[0];

  return (
    <div className="relative w-full h-[650px] lg:h-[720px] bg-[#0A0C12] transit-grid-bg rounded-xl border border-zinc-800 shadow-2xl overflow-hidden select-none flex items-center justify-center">
      
      {/* Top Left System Info HUD */}
      <div className="absolute top-3.5 left-4 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="px-3 py-1.5 rounded-md bg-black/90 border border-zinc-700/80 text-xs font-mono text-zinc-300 shadow-lg flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-metro-yellow animate-ping"></span>
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">OCTOLINEAR SCHEMATIC</span>
          <span className="text-zinc-500">•</span>
          <span className="text-[10.5px] text-zinc-400">1200 × 750px</span>
        </div>

        {/* Train Re-run button */}
        <button
          onClick={restartTrain}
          title="Re-run route simulation train"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition shadow-lg"
        >
          <Play className="w-3 h-3 text-metro-yellow" />
          <span className="hidden sm:inline text-[11px]">Trace Route</span>
        </button>
      </div>

      {/* Top Right Zoom & Pan Controls */}
      <div className="absolute top-3.5 right-4 z-20 flex items-center gap-1.5 bg-black/90 p-1 rounded-md border border-zinc-700/80 shadow-lg">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          title="Reset Whole System Map"
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-300 hover:text-white transition flex items-center gap-1 text-[11px] font-mono px-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Main Interactive SVG Canvas */}
      <motion.svg
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-all duration-700 ease-out"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle line glow filters */}
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse gradient for Terminus */}
          <radialGradient id="terminusPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD100" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFD100" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Landmark Express Spur Tracks (Dashed Lines) */}
        <g id="spur-tracks" className="opacity-70">
          {SVG_SPUR_PATHS.map((spur) => (
            <path
              key={spur.id}
              d={spur.d}
              fill="none"
              stroke="#64748B"
              strokeWidth="2.5"
              strokeDasharray="5,5"
              className="transition-all duration-300"
            />
          ))}
        </g>

        {/* 2. Main Subway Tracks (Drawn with animated SVG strokes) */}
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
                strokeWidth={isHovered || isFiltered ? "11" : "8"}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                opacity={isDimmed ? 0.15 : 1}
                filter={isHovered || isFiltered ? "url(#lineGlow)" : undefined}
                className="transit-track cursor-pointer"
                onMouseEnter={() => setHoveredLine(lineKey)}
                onMouseLeave={() => setHoveredLine(null)}
                onClick={() => setActiveLineFilter(activeLineFilter === lineKey ? null : lineKey)}
              />
            );
          })}
        </g>

        {/* 3. Landmark Achievement Diamond Nodes */}
        <g id="landmarks">
          {LANDMARK_ACHIEVEMENTS.map((lm) => {
            const isHovered = hoveredLandmark === lm.id;
            return (
              <g
                key={lm.id}
                transform={`translate(${lm.x}, ${lm.y})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredLandmark(lm.id)}
                onMouseLeave={() => setHoveredLandmark(null)}
              >
                {/* Diamond Shape */}
                <rect
                  x="-12"
                  y="-12"
                  width="24"
                  height="24"
                  transform="rotate(45)"
                  fill="#FFD100"
                  stroke="#000000"
                  strokeWidth="3"
                  className="transition-transform duration-200 group-hover:scale-125"
                />
                <text
                  textAnchor="middle"
                  dy="3.5"
                  fill="#000000"
                  fontSize="8"
                  fontWeight="900"
                  fontFamily="sans-serif"
                >
                  ★
                </text>

                {/* Landmark Label */}
                <text
                  x="0"
                  y="24"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="sans-serif"
                  className="drop-shadow-md"
                >
                  {lm.name}
                </text>
                <text
                  x="0"
                  y="36"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  [{lm.badge}]
                </text>
              </g>
            );
          })}
        </g>

        {/* 4. Subway Stations (Nodes, Multi-Rings, Terminus) */}
        <g id="stations">
          {TRANSIT_STATIONS.map((station) => {
            const isSelected = selectedStationId === station.id;
            const isHovered = hoveredStation === station.id;
            const isInterchange = station.type === 'interchange' || station.type === 'grand_junction';
            const isOrigin = station.type === 'terminus_origin';
            const isDestination = station.type === 'terminus_destination';

            // Check if station belongs to the active line filter
            const matchesFilter = !activeLineFilter || station.lines.includes(activeLineFilter);
            const opacity = matchesFilter ? 1 : 0.25;

            return (
              <g
                key={station.id}
                transform={`translate(${station.x}, ${station.y})`}
                opacity={opacity}
                className="station-node group"
                onClick={() => onSelectStation(station.id)}
                onMouseEnter={() => setHoveredStation(station.id)}
                onMouseLeave={() => setHoveredStation(null)}
              >
                {/* Pulse Ring on active selection / terminus */}
                {(isSelected || isDestination) && (
                  <circle
                    r="24"
                    fill="none"
                    stroke="#FFD100"
                    strokeWidth="2"
                    opacity="0.8"
                    className="animate-ping"
                  />
                )}

                {/* Grand Junction Triple-Ring (AyuSetu) */}
                {station.type === 'grand_junction' && (
                  <>
                    <circle r="18" fill="#141722" stroke="#FFFFFF" strokeWidth="3" />
                    <circle r="12" fill="#FF6319" stroke="#0057B8" strokeWidth="2.5" />
                    <circle r="6" fill="#80397B" />
                  </>
                )}

                {/* Interchange Hub Multi-Ring (Meslova / Saurabhi) */}
                {station.type === 'interchange' && (
                  <>
                    <circle r="15" fill="#141722" stroke="#FFFFFF" strokeWidth="3.5" />
                    <circle r="8" fill="#0057B8" stroke="#FF6319" strokeWidth="2" />
                  </>
                )}

                {/* Terminus Origin / Destination */}
                {(isOrigin || isDestination) && (
                  <>
                    <rect
                      x="-14"
                      y="-14"
                      width="28"
                      height="28"
                      rx="6"
                      fill="#FFD100"
                      stroke="#000000"
                      strokeWidth="3.5"
                    />
                    <circle r="5" fill="#000000" />
                  </>
                )}

                {/* Regular Junction Station Marker */}
                {station.type === 'junction' && (
                  <circle
                    r="9"
                    fill="#FFFFFF"
                    stroke="#000000"
                    strokeWidth="3"
                    className="transition-transform duration-200 group-hover:scale-125"
                  />
                )}

                {/* Local Station Marker */}
                {station.type === 'station' && (
                  <circle
                    r="6.5"
                    fill="#FFFFFF"
                    stroke="#80397B"
                    strokeWidth="2.5"
                    className="transition-transform duration-200 group-hover:scale-125"
                  />
                )}

                {/* Station Label Typography (Vignelli / Helvetica Style) */}
                <text
                  x={station.labelPos === 'right' ? 22 : station.labelPos === 'left' ? -22 : 0}
                  y={station.labelPos === 'top' ? -20 : station.labelPos === 'bottom' ? 26 : 5}
                  textAnchor={
                    station.labelPos === 'right' ? 'start' : station.labelPos === 'left' ? 'end' : 'middle'
                  }
                  fill={isSelected ? '#FFD100' : '#FFFFFF'}
                  fontSize={isInterchange || isOrigin || isDestination ? '13' : '11.5'}
                  fontWeight="800"
                  fontFamily="sans-serif"
                  className="station-label drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {station.shortName}
                </text>

                {/* Subtitle / Tech pill under label */}
                <text
                  x={station.labelPos === 'right' ? 22 : station.labelPos === 'left' ? -22 : 0}
                  y={station.labelPos === 'top' ? -32 : station.labelPos === 'bottom' ? 38 : 18}
                  textAnchor={
                    station.labelPos === 'right' ? 'start' : station.labelPos === 'left' ? 'end' : 'middle'
                  }
                  fill="#94A3B8"
                  fontSize="9"
                  fontFamily="monospace"
                  className="station-label drop-shadow"
                >
                  {station.category}
                </text>
              </g>
            );
          })}
        </g>

        {/* 5. Animated Simulation Train / Car */}
        <g
          transform={`translate(${currentTrainCoord.x}, ${currentTrainCoord.y})`}
          className="transition-all duration-700 ease-out pointer-events-none"
        >
          <circle r="14" fill="#FFD100" opacity="0.4" className="animate-ping" />
          <circle r="10" fill="#FFD100" stroke="#000000" strokeWidth="2.5" />
          <text
            textAnchor="middle"
            dy="3"
            fontSize="8"
            fontWeight="900"
            fill="#000000"
          >
            ●
          </text>
        </g>
      </motion.svg>

      {/* Station Hover Tooltip Preview */}
      <AnimatePresence>
        {hoveredStation && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute bottom-4 left-4 z-30 pointer-events-none p-3 rounded-lg bg-black/95 border-2 border-metro-yellow shadow-2xl max-w-xs text-xs"
          >
            {(() => {
              const st = TRANSIT_STATIONS.find(s => s.id === hoveredStation);
              if (!st) return null;
              return (
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    {st.lines.map(lKey => {
                      const l = Object.values(TRANSIT_LINES).find(item => item.id === lKey);
                      return (
                        <span
                          key={lKey}
                          className="w-4 h-4 rounded-full flex items-center justify-center font-black text-[9px] text-white"
                          style={{ backgroundColor: l?.color }}
                        >
                          {l?.code}
                        </span>
                      );
                    })}
                    <span className="text-[10px] font-mono text-metro-yellow font-bold uppercase">
                      {st.category}
                    </span>
                  </div>
                  <div className="font-extrabold text-white text-sm uppercase">{st.name}</div>
                  <p className="text-zinc-300 text-[11px] line-clamp-2 mt-1 font-sans">
                    {st.summary}
                  </p>
                  <div className="mt-2 text-[10px] text-metro-yellow font-mono font-bold flex items-center gap-1">
                    <span>Click station to inspect details & code</span>
                    <span>→</span>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landmark Spur Tooltip */}
      <AnimatePresence>
        {hoveredLandmark && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-16 right-4 z-30 pointer-events-none p-3 rounded-lg bg-black/95 border-2 border-metro-yellow shadow-2xl max-w-xs text-xs"
          >
            {(() => {
              const lm = LANDMARK_ACHIEVEMENTS.find(l => l.id === hoveredLandmark);
              if (!lm) return null;
              return (
                <div>
                  <div className="flex items-center gap-1 text-metro-yellow font-mono text-[10px] font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>EXPRESS LANDMARK // {lm.badge}</span>
                  </div>
                  <div className="font-extrabold text-white text-sm uppercase mt-0.5">{lm.name}</div>
                  <div className="text-zinc-400 text-[10.5px] font-mono mt-0.5">{lm.organizer}</div>
                  <p className="text-zinc-300 text-[11px] mt-1.5">{lm.summary}</p>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
