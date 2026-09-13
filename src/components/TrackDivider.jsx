import React from 'react';

/**
 * Railway track divider between sections.
 * Renders two horizontal rails with evenly-spaced cross-ties (sleepers)
 * and a small animated train bogey in the center.
 */
export default function TrackDivider({ className = '' }) {
  const tieCount = 24;
  const ties = Array.from({ length: tieCount }, (_, i) => i);

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`} aria-hidden="true" style={{ height: 48 }}>
      <svg
        viewBox={`0 0 960 48`}
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cross ties / sleepers */}
        {ties.map((i) => {
          const x = (i + 0.5) * (960 / tieCount);
          return (
            <rect
              key={i}
              x={x - 3}
              y={10}
              width={6}
              height={28}
              rx={2}
              fill="#C8BDA8"
              opacity={0.55}
            />
          );
        })}

        {/* Top rail */}
        <rect x="0" y="14" width="960" height="3.5" rx="1.5" fill="#9E8E76" opacity="0.6" />
        {/* Bottom rail */}
        <rect x="0" y="30" width="960" height="3.5" rx="1.5" fill="#9E8E76" opacity="0.6" />

        {/* Nail dots on ties (just top rail) */}
        {ties.map((i) => {
          const x = (i + 0.5) * (960 / tieCount);
          return (
            <g key={`nail-${i}`}>
              <circle cx={x} cy={15.5} r={1.8} fill="#7A6E5C" opacity="0.45" />
              <circle cx={x} cy={31.5} r={1.8} fill="#7A6E5C" opacity="0.45" />
            </g>
          );
        })}
      </svg>

      {/* Animated train bogey */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          animation: 'trackBogeySlide 12s linear infinite',
        }}
      >
        <div className="flex items-center gap-0.5">
          {/* Engine */}
          <div className="w-7 h-5 rounded-md bg-metro-backend shadow-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
          </div>
          {/* Car 1 */}
          <div className="w-5 h-4 rounded-sm bg-[#E05A2B] shadow-sm" />
          {/* Car 2 */}
          <div className="w-5 h-4 rounded-sm bg-[#7E347D] shadow-sm" />
        </div>
      </div>

      <style>{`
        @keyframes trackBogeySlide {
          0%   { left: -60px; }
          100% { left: calc(100% + 60px); }
        }
      `}</style>
    </div>
  );
}
