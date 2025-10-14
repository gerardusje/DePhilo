import React from "react";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import CTASection from "../components/sections/CTASection";
import TestimonialsSection from "../components/sections/TestimonioalSection";

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
