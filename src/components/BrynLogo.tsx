import React from 'react';

interface BrynLogoProps {
  className?: string;
  lightMode?: boolean; // If true, uses navy/charcoal. If false, uses white/silver for dark backgrounds.
  showSubText?: boolean;
}

export const BrynLogo: React.FC<BrynLogoProps> = ({ 
  className = "h-14", 
  lightMode = false, 
  showSubText = true 
}) => {
  // Colors based on theme
  const mainColor = lightMode ? "#0F172A" : "#FFFFFF"; // Slate-900 or White
  const accentColor = "#DC2626"; // Vibrant Red
  const glassColor = lightMode ? "rgba(15, 23, 42, 0.1)" : "rgba(255, 255, 255, 0.15)";
  const lineGrey = lightMode ? "#94A3B8" : "#475569";

  return (
    <div className={`flex items-center ${className}`} id="bryn-logo-wrapper">
      <svg 
        viewBox="0 0 540 220" 
        className="w-full h-full"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        id="bryn-logo-svg"
      >
        {/* CAR SILHOUETTE FLUID OUTLINE */}
        <g id="car-silhouette">
          {/* Main sleek roof & body line */}
          <path 
            d="M 120,95 C 130,93 145,91 165,88 C 190,84 210,74 245,61 C 280,48 330,48 365,60 C 390,69 430,81 465,95 C 480,101 490,103 498,106" 
            stroke={mainColor} 
            strokeWidth="5" 
            strokeLinecap="round" 
            fill="none"
          />

          {/* Inner cabin / window line */}
          <path 
            d="M 235,74 C 260,59 310,58 355,68 C 380,73 410,83 430,91" 
            stroke={mainColor} 
            strokeWidth="3" 
            strokeLinecap="round" 
            fill="none"
            opacity="0.85"
          />

          {/* Lower window divider reflection */}
          <path 
            d="M 285,73 L 340,73" 
            stroke={mainColor} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none"
            opacity="0.6"
          />

          {/* Under body sweep line */}
          <path 
            d="M 140,111 C 185,103 265,97 345,97 C 415,97 468,106 492,114" 
            stroke={mainColor} 
            strokeWidth="4" 
            strokeLinecap="round" 
            fill="none"
          />

          {/* Red tail reflection splash */}
          <path 
            d="M 490,106 C 498,110 508,115 512,118 L 493,124 C 486,120 484,114 490,106 Z" 
            fill={accentColor} 
          />
        </g>

        {/* TYPOGRAPHY SECTION: B R Y N */}
        <g id="bryn-text" transform="translate(10, 10)">
          {/* --- LETTER B (INTEGRATED WITH RED LIGHTNING BOLT) --- */}
          {/* The vibrant red lightning bolt as the spine */}
          <path 
            d="M 145,98 L 175,98 L 150,132 L 178,132 L 138,172 L 154,139 L 139,139 Z" 
            fill={accentColor}
            stroke={accentColor}
            strokeWidth="1.5"
            strokeLinejoin="miter"
          />
          
          {/* Top Loop of B */}
          <path 
            d="M 166,104 C 182,104 195,108 191,120 C 188,130 174,132 158,132" 
            stroke={mainColor} 
            strokeWidth="11" 
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />
          {/* Bottom Loop of B */}
          <path 
            d="M 152,135 C 172,135 198,136 194,151 C 190,166 168,166 142,166" 
            stroke={mainColor} 
            strokeWidth="12" 
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />
          
          {/* --- LETTER R (CUSTOM SLANTED BLOCK) --- */}
          <path 
            d="M 210,166 L 227,102 L 258,102 C 274,102 284,107 281,119 C 278,131 264,134 248,134 L 235,134 M 241,134 L 260,166" 
            stroke={mainColor} 
            strokeWidth="11.5" 
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />

          {/* --- LETTER Y (Sleek sci-fi split) --- */}
          {/* Left fork */}
          <path 
            d="M 302,102 L 322,132" 
            stroke={mainColor} 
            strokeWidth="11.5" 
            strokeLinecap="square"
            fill="none"
          />
          {/* Right fork and vertical stem */}
          <path 
            d="M 345,102 L 315,132 L 305,166" 
            stroke={mainColor} 
            strokeWidth="11.5" 
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />

          {/* --- LETTER N (Slanted block columns) --- */}
          <path 
            d="M 360,166 L 377,102 L 398,143 L 410,102 L 393,166" 
            stroke={mainColor} 
            strokeWidth="11.5" 
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />
        </g>

        {/* SUBTEXT: — AUTO ELECTRICAL — */}
        {showSubText && (
          <g id="bryn-subtext">
            {/* Left accent line */}
            <line 
              x1="120" 
              y1="192" 
              x2="152" 
              y2="192" 
              stroke={mainColor} 
              strokeWidth="2.5" 
              opacity="0.85"
            />

            {/* "AUTO ELECTRICAL" Text with wide tracking and beautiful display font styling */}
            <text 
              x="264" 
              y="198" 
              fill={accentColor} 
              fontSize="18" 
              fontWeight="800" 
              fontFamily="'Montserrat', 'Inter', sans-serif"
              fontStyle="italic"
              letterSpacing="3"
              textAnchor="middle" 
              className="uppercase tracking-widest font-extrabold"
            >
              AUTO ELECTRICAL
            </text>

            {/* Right accent line */}
            <line 
              x1="375" 
              y1="192" 
              x2="407" 
              y2="192" 
              stroke={mainColor} 
              strokeWidth="2.5" 
              opacity="0.85"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
