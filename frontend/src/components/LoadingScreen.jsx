import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-200 z-50 animate-fade-in">
      {/* Spinner */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-yellow-200 border-t-transparent rounded-full animate-spin-slow"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-2xl font-bold text-yellow-800 tracking-wide">
        Sedang memuat...
      </p>

      {/* Optional: Progress dots */}
      <div className="flex space-x-2 mt-4">
        <span className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce-delay1"></span>
        <span className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce-delay2"></span>
        <span className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce-delay3"></span>
      </div>
    </div>
  );
}
