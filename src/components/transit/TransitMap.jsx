import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TRANSIT_LINES,
  TRANSIT_STATIONS,
  LANDMARK_ACHIEVEMENTS,
  SVG_TRACK_PATHS,
  SVG_SPUR_PATHS,
  TRAIN_ANIMATION_ROUTE
} from '../../data/transitData';
import { ZoomIn, ZoomOut, RotateCcw, Play, Award, MapPin, Compass } from 'lucide-react';

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
      }, 700);
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
      const targetX = Math.max(0, Math.min(500, currentStationTarget.x - 350));
      const targetY = Math.max(0, Math.min(300, currentStationTarget.y - 250));
      setViewBox({
        x: targetX,
        y: targetY,
        width: 850,
        height: 530
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

  const currentTrainCoord = TRAIN_ANIMATION_ROUTE[trainProgress] || TRAIN_ANIMATION_ROUTE[0];

  return (
    <div className="relative w-full h-[650px] lg:h-[730px] map-paper-bg map-crease-overlay rounded-2xl border border-[#DDD6C9] shadow-paper-lg overflow-hidden select-none flex items-center justify-center">
      
      {/* Top Left: Map Title Cartouche & Route Playback */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 pointer-events-auto">
        <div className="px-4 py-2 rounded-xl bg-white/95 border border-[#DDD6C9] shadow-paper flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#FAF8F4] border border-[#DDD6C9] flex items-center justify-center text-ink-primary shadow-sm">
            <Compass className="w-4 h-4 text-metro-backend" />
          </div>
          <div>
            <div className="font-extrabold text-xs text-ink-primary tracking-tight font-sans">
              Interactive Engineering Map
            </div>
            <div className="text-[11px] text-ink-muted">
              Click stations to explore projects & internships
            </div>
          </div>
        </div>

        <button
          onClick={restartTrain}
          title="Re-play route tour"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/95 hover:bg-[#F4EFE6] text-ink-primary border border-[#DDD6C9] text-xs font-semibold shadow-paper transition"
        >
          <Play className="w-3.5 h-3.5 text-metro-data fill-metro-data" />
          <span className="hidden sm:inline">Play Tour</span>
        </button>
      </div>

      {/* Top Right: Zoom & Reset Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 p-1 rounded-xl border border-[#DDD6C9] shadow-paper">
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
          title="Reset Whole Map View"
          className="p-2 rounded-lg hover:bg-[#F4EFE6] text-ink-secondary hover:text-ink-primary transition flex items-center gap-1 text-xs font-semibold px-2.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Main Printed Interactive SVG Canvas */}
      <motion.svg
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-all duration-700 ease-out"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Soft natural drop shadow for printed transit lines */}
          <filter id="softLineShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#2D2418" floodOpacity="0.12" />
          </filter>

          {/* Marker drop shadow */}
          <filter id="markerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#2D2418" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* 1. Compass Rose Illustration in upper corner */}
        <g transform="translate(1080, 80)" className="opacity-40 pointer-events-none">
          <circle r="30" fill="none" stroke="#B5ADA0" strokeWidth="1" strokeDasharray="3,3" />
          <polygon points="0,-26 6,-8 0,-12 -6,-8" fill="#1B5FA8" />
          <polygon points="0,26 6,8 0,12 -6,8" fill="#B5ADA0" />
          <polygon points="-26,0 -8,-6 -12,0 -8,6" fill="#B5ADA0" />
          <polygon points="26,0 8,-6 12,0 8,6" fill="#B5ADA0" />
          <text x="0" y="-30" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1B5FA8">N</text>
        </g>

        {/* 2. Scale Bar Illustration in bottom corner */}
        <g transform="translate(80, 700)" className="opacity-50 pointer-events-none">
          <line x1="0" y1="0" x2="160" y2="0" stroke="#768092" strokeWidth="2" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#768092" strokeWidth="2" />
          <line x1="80" y1="-3" x2="80" y2="3" stroke="#768092" strokeWidth="1.5" />
          <line x1="160" y1="-4" x2="160" y2="4" stroke="#768092" strokeWidth="2" />
          <text x="80" y="15" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#768092" fontFamily="sans-serif">
            Project Progression & Maturity Scale
          </text>
        </g>

        {/* 3. Express Landmark Spur Tracks */}
        <g id="spur-tracks">
          {SVG_SPUR_PATHS.map((spur) => (
            <path
              key={spur.id}
              d={spur.d}
              fill="none"
              stroke="#A0A9B8"
              strokeWidth="2.5"
              strokeDasharray="5,5"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          ))}
        </g>

        {/* 4. Main Transit Lines (Drawn with soft rounded curves & drop shadow) */}
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
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                opacity={isDimmed ? 0.2 : 1}
                className="transit-track-path cursor-pointer"
                onMouseEnter={() => setHoveredLine(lineKey)}
                onMouseLeave={() => setHoveredLine(null)}
                onClick={() => setActiveLineFilter(activeLineFilter === lineKey ? null : lineKey)}
              />
            );
          })}
        </g>

        {/* 5. Landmark Achievement Markers */}
        <g id="landmarks">
          {LANDMARK_ACHIEVEMENTS.map((lm) => (
            <g
              key={lm.id}
              transform={`translate(${lm.x}, ${lm.y})`}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredLandmark(lm.id)}
              onMouseLeave={() => setHoveredLandmark(null)}
            >
              {/* Soft gold badge */}
              <circle
                r="13"
                fill="#F4EFE6"
                stroke="#D99B16"
                strokeWidth="2.5"
                filter="url(#markerShadow)"
                className="transition-transform duration-200 group-hover:scale-125"
              />
              <text
                textAnchor="middle"
                dy="4"
                fill="#99680A"
                fontSize="11"
                fontWeight="bold"
              >
                ★
              </text>

              {/* Landmark Label */}
              <text
                x="0"
                y="24"
                textAnchor="middle"
                fill="#1A1E29"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="sans-serif"
                className="drop-shadow-sm"
              >
                {lm.name}
              </text>
              <text
                x="0"
                y="36"
                textAnchor="middle"
                fill="#626875"
                fontSize="9.5"
                fontWeight="500"
                fontFamily="sans-serif"
              >
                {lm.badge}
              </text>
            </g>
          ))}
        </g>

        {/* 6. Stations & Interchanges */}
        <g id="stations">
          {TRANSIT_STATIONS.map((station) => {
            const isSelected = selectedStationId === station.id;
            const isHovered = hoveredStation === station.id;
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
                    strokeWidth="2"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* You Are Here Pin on Open to Roles */}
                {isDestination && (
                  <g transform="translate(0, -32)" className="animate-bounce pointer-events-none">
                    <rect x="-42" y="-18" width="84" height="20" rx="10" fill="#1B824C" filter="url(#markerShadow)" />
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

                {/* Regular Project Station (Clean White Circle with Thin Dark Ring) */}
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

                {/* Station Label Typography (Humanist Sans-Serif) */}
                <text
                  x={station.labelPos === 'right' ? 20 : station.labelPos === 'left' ? -20 : 0}
                  y={station.labelPos === 'top' ? -18 : station.labelPos === 'bottom' ? 24 : 5}
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

                {/* Subtitle / Category pill */}
                <text
                  x={station.labelPos === 'right' ? 20 : station.labelPos === 'left' ? -20 : 0}
                  y={station.labelPos === 'top' ? -30 : station.labelPos === 'bottom' ? 36 : 18}
                  textAnchor={
                    station.labelPos === 'right' ? 'start' : station.labelPos === 'left' ? 'end' : 'middle'
                  }
                  fill="#626875"
                  fontSize="9.5"
                  fontWeight="500"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  className="map-typography"
                >
                  {station.category}
                </text>
              </g>
            );
          })}
        </g>

        {/* 7. Animated Train Tour Marker */}
        <g
          transform={`translate(${currentTrainCoord.x}, ${currentTrainCoord.y})`}
          className="transition-all duration-700 ease-out pointer-events-none"
        >
          <circle r="12" fill="#D99B16" opacity="0.35" className="animate-ping" />
          <circle r="8.5" fill="#D99B16" stroke="#FFFFFF" strokeWidth="2" filter="url(#markerShadow)" />
          <circle r="3" fill="#FFFFFF" />
        </g>
      </motion.svg>

      {/* Station Hover Tooltip Preview */}
      <AnimatePresence>
        {hoveredStation && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            className="absolute bottom-4 left-4 z-30 pointer-events-none p-3.5 rounded-xl bg-white border border-[#DDD6C9] shadow-paper-lg max-w-sm text-xs"
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
                          className="w-4 h-4 rounded-full flex items-center justify-center font-black text-[9px] text-white"
                          style={{ backgroundColor: l?.color }}
                        >
                          {l?.code}
                        </span>
                      );
                    })}
                    <span className="text-[11px] font-semibold text-ink-secondary">
                      {st.category}
                    </span>
                  </div>
                  <div className="font-extrabold text-ink-primary text-sm">{st.name}</div>
                  <p className="text-ink-secondary text-xs line-clamp-2 mt-1 leading-relaxed">
                    {st.summary}
                  </p>
                  <div className="mt-2 text-[11px] text-metro-backend font-bold flex items-center gap-1">
                    <span>Click to explore project details & code</span>
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
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute top-16 right-4 z-30 pointer-events-none p-3.5 rounded-xl bg-white border border-[#DDD6C9] shadow-paper-lg max-w-xs text-xs"
          >
            {(() => {
              const lm = LANDMARK_ACHIEVEMENTS.find(l => l.id === hoveredLandmark);
              if (!lm) return null;
              return (
                <div>
                  <div className="flex items-center gap-1.5 text-metro-gold font-bold text-xs">
                    <Award className="w-3.5 h-3.5" />
                    <span>{lm.badge}</span>
                  </div>
                  <div className="font-extrabold text-ink-primary text-sm mt-0.5">{lm.name}</div>
                  <div className="text-ink-muted text-[11px] mt-0.5">{lm.organizer}</div>
                  <p className="text-ink-secondary text-xs mt-1.5 leading-relaxed">{lm.summary}</p>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
