import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";

export default function CTASection() {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden bg-gradient-to-b from-secondary to-black">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-wall.png')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <SectionTitle
          title="Jelajahi Koleksi Kami"
          color="text-accent"
          subtitle="Temukan karya seni klasik dan barang antik dengan nilai sejarah tinggi — 
                    dari furnitur bersejarah hingga perhiasan yang penuh makna."
        />

        <Link
          to="/galeri"
          className="inline-block px-8 py-4 bg-secondary text-light font-semibold rounded-md shadow-md 
                     hover:bg-accent hover:text-darkbg transition-all duration-300 transform hover:scale-[1.03]
                     hover:ring-2 hover:ring-accent/40 hover:ring-offset-2"
        >
          Lihat Galeri
        </Link>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-darkbg/50 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
