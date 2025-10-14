import React from "react";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import CTASection from "./sections/CTASection";
import TestimonialsSection from "./sections/TestimonioalSection";

const Home = () => {
  return (
    <div className="font-sans text-darkbg scroll-smooth">
      <HeroSection />
      <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent my-10" />
      <AboutSection />
      <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent my-10" />
      <ServicesSection />
      <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent my-10" />
      <CTASection />
      <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent my-10" />
      <TestimonialsSection />
      <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent my-10" />
    </div>
  );
};

export default Home;
