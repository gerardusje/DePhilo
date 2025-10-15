// src/components/layout/PublicLayout.jsx
import React from "react";
import Navbar from "../public/Navbar";
import Footer from "../public/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Anak route akan dirender di sini */}
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
