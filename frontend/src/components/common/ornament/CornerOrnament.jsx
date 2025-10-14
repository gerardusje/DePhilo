// src/components/ornaments/CornerOrnament.jsx
import React from "react";

const CornerOrnament = ({ size = 400, color = "#D8C690", className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main outer contour (panjang membentang) */}
      <path d="M0 400 C100 300 300 100 400 0" stroke={color} strokeWidth="2" fill="none" />

      {/* Inner contour curves */}
      <path d="M20 380 C120 280 280 120 380 20" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M40 360 C140 260 260 140 360 40" stroke={color} strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M60 340 C160 240 240 160 340 60" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M80 320 C180 220 220 180 320 80" stroke={color} strokeWidth="0.7" fill="none" opacity="0.4"/>

      {/* Horizontal decorative curves */}
      <path d="M0 200 Q200 150 400 200" stroke={color} strokeWidth="0.5" fill="none" opacity="0.5"/>
      <path d="M0 240 Q200 280 400 240" stroke={color} strokeWidth="0.5" fill="none" opacity="0.4"/>
      <path d="M0 160 Q200 100 400 160" stroke={color} strokeWidth="0.4" fill="none" opacity="0.3"/>

      {/* Small circles / dots */}
      <circle cx="100" cy="100" r="4" fill={color} opacity="0.8" />
      <circle cx="200" cy="200" r="2.5" fill={color} opacity="0.6" />
      <circle cx="300" cy="120" r="2" fill={color} opacity="0.5" />
    </svg>
  );
};

export default CornerOrnament;
