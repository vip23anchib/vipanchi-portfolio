import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Waypoints where skills pop in when the train approaches
const SKILL_WAYPOINTS = [
  { id: 'python', label: 'Python', tech: 'Python 3.12', progress: 0.16, x: 260, y: 110, color: '#1B5FA8', bg: '#EFF6FF' },
  { id: 'django', label: 'Django DRF', tech: 'Django REST', progress: 0.36, x: 540, y: 155, color: '#092E20', bg: '#F0FDF4' },
  { id: 'postgres', label: 'PostgreSQL', tech: 'PostgreSQL Locks', progress: 0.56, x: 840, y: 195, color: '#336791', bg: '#F0F9FF' },
  { id: 'etl', label: 'ETL Pipelines', tech: 'ETL / Diarization', progress: 0.74, x: 1100, y: 160, color: '#E05A2B', bg: '#FFF7ED' },
  { id: 'react', label: 'React.js', tech: 'React & Systems', progress: 0.90, x: 1320, y: 225, color: '#1B824C', bg: '#F0FDF4' },
];

export default function HeroTrainTrackScene() {
  const [trainX, setTrainX] = useState(-100);

  // Smooth continuous looping train motion
  useEffect(() => {
    let animFrame;
    const duration = 22000; // 22 seconds per full lap
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % duration;
      const progress = elapsed / duration;
      // Map progress to X coordinate across SVG viewBox (-120 to 1560)
      const currentX = -120 + progress * 1680;
      setTrainX(currentX);
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Calculate track Y coordinate based on a smooth cubic bezier formula
  const getTrackY = (x) => {
    // Smooth natural wave: baseY + undulating sine wave
    const normalized = (x + 100) / 1600;
    return 130 + Math.sin(normalized * Math.PI * 2.2) * 55 + Math.sin(normalized * Math.PI * 4) * 15;
  };

  const currentTrainY = getTrackY(trainX);
  const trainProgress = Math.max(0, Math.min(1, (trainX + 120) / 1680));

  // Generate railway ties / sleepers along the path
  const numTies = 75;
  const ties = Array.from({ length: numTies }).map((_, i) => {
    const x = -80 + i * 22;
    const y = getTrackY(x);
    // Approximate slope for perpendicular angle
    const nextY = getTrackY(x + 2);
    const angle = Math.atan2(nextY - y, 2) * (180 / Math.PI) + 90;
    return { x, y, angle };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* Ambient soft glow along the corridor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-metro-backend/[0.035] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-metro-data/[0.03] rounded-full blur-3xl pointer-events-none" />

      <svg
        className="w-full h-full opacity-45"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 450"
        fill="none"
      >
        <defs>
          <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1B5FA8" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#1B5FA8" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#E05A2B" stopOpacity="0.35" />
            <stop offset="75%" stopColor="#7E347D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1B824C" stopOpacity="0.1" />
          </linearGradient>

          <filter id="trainGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1B5FA8" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Track Ties / Sleepers (Cross-hatching perpendicular lines) */}
        <g id="rail-ties" opacity="0.35">
          {ties.map((tie, idx) => (
            <line
              key={idx}
              x1={tie.x}
              y1={tie.y - 8}
              x2={tie.x}
              y2={tie.y + 8}
              stroke="#6B7280"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${tie.angle}, ${tie.x}, ${tie.y})`}
            />
          ))}
        </g>

        {/* 2. Top and Bottom Steel Rail Lines */}
        <g id="steel-rails">
          {/* Upper Rail */}
          <path
            d={ties.map((t, i) => `${i === 0 ? 'M' : 'L'} ${t.x} ${t.y - 5}`).join(' ')}
            fill="none"
            stroke="url(#trackGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />
          {/* Lower Rail */}
          <path
            d={ties.map((t, i) => `${i === 0 ? 'M' : 'L'} ${t.x} ${t.y + 5}`).join(' ')}
            fill="none"
            stroke="url(#trackGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />
          {/* Center Power Conductor Line */}
          <path
            d={ties.map((t, i) => `${i === 0 ? 'M' : 'L'} ${t.x} ${t.y}`).join(' ')}
            fill="none"
            stroke="#DDD6C9"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.4"
          />
        </g>

        {/* 3. Skill Pop-In Waypoints along the Track */}
        <g id="skill-popups">
          {SKILL_WAYPOINTS.map((wp) => {
            // Check distance from train to waypoint
            const dist = Math.abs(trainProgress - wp.progress);
            // Is train nearby? (within 0.08 of track)
            const isNear = dist < 0.085;
            const proximity = Math.max(0, 1 - dist / 0.085);

            return (
              <g
                key={wp.id}
                transform={`translate(${wp.x}, ${wp.y - 28})`}
                className="transition-all duration-500 ease-out"
                opacity={isNear ? 0.95 : 0.22}
                style={{
                  transform: `translate(${wp.x}px, ${isNear ? wp.y - 36 : wp.y - 28}px) scale(${isNear ? 1.08 : 0.9})`,
                  transformOrigin: 'center center'
                }}
              >
                {/* Station waypoint anchor ring on track */}
                <circle
                  cx="0"
                  cy="28"
                  r={isNear ? 6 : 4}
                  fill="#FFFFFF"
                  stroke={wp.color}
                  strokeWidth={isNear ? "2.5" : "1.5"}
                />
                {isNear && (
                  <circle
                    cx="0"
                    cy="28"
                    r="10"
                    fill="none"
                    stroke={wp.color}
                    strokeWidth="1.5"
                    className="animate-ping opacity-40"
                  />
                )}

                {/* Connecting stem line */}
                <line
                  x1="0"
                  y1="14"
                  x2="0"
                  y2="24"
                  stroke={wp.color}
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  opacity={isNear ? 0.8 : 0.3}
                />

                {/* Skill Badge Card */}
                <g filter={isNear ? "url(#trainGlow)" : undefined}>
                  <rect
                    x="-42"
                    y="-12"
                    width="84"
                    height="22"
                    rx="11"
                    fill={isNear ? "#FFFFFF" : "#FAF8F4"}
                    stroke={isNear ? wp.color : "#DDD6C9"}
                    strokeWidth={isNear ? "1.8" : "1"}
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isNear ? wp.color : "#64748B"}
                    fontSize="10"
                    fontWeight={isNear ? "800" : "600"}
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    letterSpacing="-0.01em"
                  >
                    {isNear ? wp.tech : wp.label}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {/* 4. The Animated Train (Locomotive + Bogeys) */}
        <g
          transform={`translate(${trainX}, ${currentTrainY})`}
          filter="url(#trainGlow)"
          className="transition-transform duration-75 ease-linear"
        >
          {/* Headlight beam casting forward */}
          <polygon
            points="28,-4 90,-20 90,20 28,4"
            fill="url(#headlightBeam)"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Bogey 2 (Rear Passenger Car) */}
          <g transform="translate(-48, 0)">
            <rect x="-18" y="-7" width="36" height="14" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            {/* Windows */}
            <rect x="-13" y="-4" width="7" height="4" rx="1" fill="#93C5FD" opacity="0.9" />
            <rect x="-3" y="-4" width="7" height="4" rx="1" fill="#93C5FD" opacity="0.9" />
            <rect x="7" y="-4" width="7" height="4" rx="1" fill="#93C5FD" opacity="0.9" />
            {/* Wheels */}
            <circle cx="-11" cy="7.5" r="2.5" fill="#0F172A" />
            <circle cx="11" cy="7.5" r="2.5" fill="#0F172A" />
          </g>

          {/* Coupler Link 1 */}
          <line x1="-30" y1="0" x2="-24" y2="0" stroke="#64748B" strokeWidth="2" />

          {/* Bogey 1 (Middle Passenger Car) */}
          <g transform="translate(-12, 0)">
            <rect x="-18" y="-7" width="36" height="14" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            {/* Windows */}
            <rect x="-13" y="-4" width="7" height="4" rx="1" fill="#93C5FD" opacity="0.9" />
            <rect x="-3" y="-4" width="7" height="4" rx="1" fill="#93C5FD" opacity="0.9" />
            <rect x="7" y="-4" width="7" height="4" rx="1" fill="#93C5FD" opacity="0.9" />
            {/* Wheels */}
            <circle cx="-11" cy="7.5" r="2.5" fill="#0F172A" />
            <circle cx="11" cy="7.5" r="2.5" fill="#0F172A" />
          </g>

          {/* Coupler Link 2 */}
          <line x1="6" y1="0" x2="12" y2="0" stroke="#64748B" strokeWidth="2" />

          {/* Locomotive Engine (Lead Car) */}
          <g transform="translate(24, 0)">
            {/* Streamlined Nose Engine Body */}
            <path
              d="M-14,-8 L8,-8 Q18,-8 22,0 Q18,8 8,8 L-14,8 Z"
              fill="#1B5FA8"
              stroke="#2563EB"
              strokeWidth="1.2"
            />
            {/* Cabin Windshield */}
            <path
              d="M4,-5 L14,-5 Q18,-5 19,0 Q18,5 14,5 L4,5 Z"
              fill="#60A5FA"
            />
            {/* Side Accent Racing Stripe */}
            <line x1="-12" y1="3" x2="16" y2="3" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Headlamp */}
            <circle cx="21" cy="0" r="2" fill="#FEF08A" />
            {/* Locomotive Wheels */}
            <circle cx="-8" cy="8" r="2.5" fill="#0F172A" />
            <circle cx="6" cy="8" r="2.5" fill="#0F172A" />
            <circle cx="15" cy="8" r="2" fill="#0F172A" />
          </g>
        </g>

      </svg>
    </div>
  );
}
