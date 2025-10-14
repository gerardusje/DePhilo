// src/components/SectionTitle.jsx
import React from "react";

const SectionTitle = ({ title, subtitle, color = "text-primary" }) => {
  return (
    <div className="text-center mb-12">
      {/* Judul utama */}
      <h2 className={`text-4xl sm:text-5xl font-serif font-bold ${color} mb-3`}>
        {title}
      </h2>

      {/* Subtitle opsional */}
      {subtitle && (
        <p className="text-muted max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
