// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Hero";
import { ShoppingCartIcon, WrenchIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// ===== Service Data =====
const services = [
  {
    title: "Jual Beli Barang Antik",
    icon: ShoppingCartIcon,
    desc: "Temukan koleksi antik berkualitas atau jual barang antik Anda dengan mudah. Kami memastikan setiap transaksi aman dan barang bernilai sejarah tetap terjaga.",
  },
  {
    title: "Servis Barang Antik",
    icon: WrenchIcon,
    desc: "Perbaikan dan perawatan profesional untuk barang antik kesayangan Anda. Dari furniture klasik hingga perhiasan antik, kami menjaga keaslian dan keindahannya.",
  },
  {
    title: "Konsultasi",
    icon: LightBulbIcon,
    desc: "Dapatkan saran ahli seputar koleksi antik, investasi, dan perawatan barang berharga. Membantu Anda membuat keputusan tepat dan menghargai nilai sejarah setiap koleksi.",
  },
];

// ===== Reusable Section Title =====
const SectionTitle = ({ title, subtitle, color = "text-primary" }) => (
  <div className="text-center mb-12">
    <h2 className={`text-4xl sm:text-5xl font-serif font-bold ${color} mb-3`}>
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted max-w-2xl mx-auto text-lg">{subtitle}</p>
    )}
  </div>
);

const Home = () => {
  return (

    <div className="font-sans text-darkbg scroll-smooth">
      {/* ===== Hero Section ===== */}
      <Hero />
      <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent my-10" />
      {/* ===== About Section ===== */}
      <section className="relative py-20 sm:py-24 px-6 text-center bg-darkbg text-light overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-darkbg via-secondary to-darkbg  pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <SectionTitle
            title="Tentang Kami"
            color="text-accent"
            subtitle="Kisah di balik setiap benda antik dan nilai sejarah yang hidup kembali."
          />

          <p className="text-muted text-lg leading-relaxed mb-10 text-balance">
            <span className="text-accent font-semibold">De Philo Cafe Art & Antique</span>{" "}
            hadir bagi para pecinta barang antik dan koleksi bersejarah.
            Kami menghadirkan berbagai koleksi unik dari seluruh Indonesia — mulai dari
            perabot klasik, perhiasan, hingga karya seni yang penuh cerita.
            Setiap barang kami pilih dengan hati-hati untuk memastikan kualitas, keaslian,
            dan nilai sejarahnya.
          </p>

          <Link
            to="/about"
            className="inline-block px-8 py-4 bg-secondary text-light font-semibold rounded-md shadow-md 
                       hover:bg-accent hover:text-darkbg transition-all duration-300 transform hover:scale-[1.03]
                       hover:ring-2 hover:ring-accent/40 hover:ring-offset-2"
          >
            Lanjutkan Kisah
          </Link>
        </div>

        {/* Soft glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
      </section>

      {/* ===== Divider ===== */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent my-10" />

      {/* ===== Services Section ===== */}
      <section className="py-20 sm:py-24 px-6 bg-background text-center">
        <SectionTitle
          title="Layanan Kami"
          subtitle="Kami menghadirkan layanan profesional untuk menjaga dan memperkaya warisan seni Anda."
        />

        <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, icon: Icon, desc }, i) => (
            <div
              key={i}
              className="group bg-light rounded-2xl p-8 shadow-md hover:shadow-xl 
                         transition-all duration-300 flex flex-col items-center hover:-translate-y-1
                         border border-transparent hover:border-border"
            >
              <div className="h-16 w-16 flex items-center justify-center bg-primary/10 rounded-full mb-5 group-hover:bg-primary/20 transition">
                <Icon className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-darkbg mb-3">{title}</h3>
              <p className="text-muted text-center leading-relaxed text-balance">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Divider ===== */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent my-10" />

      {/* ===== Call-to-Action (Galeri) ===== */}
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
      <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent my-10" />
    </div>
  );
};

export default Home;
