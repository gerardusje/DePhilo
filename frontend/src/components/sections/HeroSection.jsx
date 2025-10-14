import React from "react";
import { motion } from "framer-motion";
import bg from "../../assets/img/hero-bg.png";

export default function HeroSection() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero - Pusat Antik Indonesia"
    >
      {/* Background parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bg})` }}
        initial={{ y: 0 ,scale:1.1,filter:"blur(0px)"}}
        animate={{ y: [-20, 20],scale:1.2,filter: ["blur(4px)", "blur(0px)", "blur(0px)"] }}
        transition={{ yoyo: Infinity, duration: 15, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="absolute top-24 w-3/4 sm:top-32 left-1/2 -translate-x-1/2 flex flex-col items-center text-center px-4 sm:px-6 md:px-10">

        {/* Judul */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-[#D8C690] drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)] mb-3"
        >
          De Philo
          <br className="hidden md:block" />
          Cafe Art & Antique
        </motion.h1>

        {/* Garis dekoratif */}
        <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: '60%', opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="h-[2px] bg-[#D8C690] mb-5" />

        {/* Deskripsi */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5ECD0] leading-relaxed max-w-full sm:max-w-lg md:max-w-2xl mb-6"
        >
          Temukan koleksi <span className="text-[#D8C690] font-bold">barang antik</span> dan
          vintage terbaik dari seluruh Indonesia. Dari furnitur klasik hingga pernak-pernik
          langka, setiap benda punya cerita.
        </motion.p>

        {/* Tombol CTA interaktif */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          href="/galeri"
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 sm:px-8 py-2 sm:py-3 border border-[#D8C690] text-[#D8C690] rounded-md font-medium text-sm sm:text-base hover:bg-[#D8C690] hover:text-black transition-all duration-300 shadow-md"
        >
          Lihat Koleksi
        </motion.a>
      </div>
    </section>
  );
}
