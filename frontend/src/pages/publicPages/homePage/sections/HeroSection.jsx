import React from "react";
import { motion } from "framer-motion";
import bg from "../../../../assets/img/hero-bg.png";
import fg from "../../../../assets/img/hero-fg.png";

export default function HeroSection() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero - Pusat Antik Indonesia"
    >
      {/* Background (statis) */}
      <div
        className="
          absolute inset-0 
          bg-cover bg-no-repeat 
          bg-[center_left_30%] sm:bg-center 
          z-0
        "
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />

      {/* Foreground (bergerak pelan) */}
      <motion.div
        className="
          absolute inset-0 
          bg-cover bg-no-repeat 
          bg-[center_left_30%] sm:bg-center 
          z-20
        "
        style={{ backgroundImage: `url(${fg})` }}
        initial={{ y: 100,x:0, scale: 1 ,filter:"blur(10px)"}}
        animate={{ y: 0, x:0,scale: 1.2 ,filter:"blur(0px)"}}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
        aria-hidden="true"
      />

      {/* Overlay gradient agar teks lebih terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-10" />

      {/* Container teks yang muncul dari balik foreground */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
          w-3/4 flex flex-col items-center text-center 
          text-[#D8C690] z-10 overflow-hidden"
      >
        {/* Efek teks muncul dari bawah foreground */}
        <motion.h1
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          className="font-serif font-extrabold text-4xl sm:text-6xl md:text-7xl 
          drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)] mb-3"
        >
          De Philo
          <br />
          Cafe Art & Antique
        </motion.h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '60%', opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="h-[2px] bg-[#D8C690] mb-5"
        />

        <motion.p
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5ECD0] leading-relaxed max-w-2xl mb-6"
        >
          Temukan koleksi <span className="text-[#D8C690] font-bold">barang antik</span> dan
          vintage terbaik dari seluruh Indonesia.
        </motion.p>

        <motion.a
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          href="/galeri"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-3 border border-[#D8C690] text-[#D8C690] rounded-md font-medium text-base hover:bg-[#D8C690] hover:text-black transition-all duration-300 shadow-md"
        >
          Lihat Koleksi
        </motion.a>
      </motion.div>
    </section>
  );
}
