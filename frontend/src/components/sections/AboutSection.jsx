import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import SectionTitle from "./SectionTitle";
import SectionTitle from "../layout/SectionTitle";
import CornerOrnament from "../common/ornament/CornerOrnament"; // contoh ornamen SVG
import Wave from "react-wavify";

export default function AboutSection() {
  return (
    <section className="relative py-20 sm:py-24 px-6 text-center bg-darkbg text-light overflow-hidden">
      
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkbg via-secondary to-darkbg pointer-events-none" />

      {/* Background pattern / subtle texture */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 pointer-events-none" />

      {/* Corner Ornaments */}
      <div className="absolute top-0 left-0 opacity-20">
        <CornerOrnament />
      </div>
      <div className="absolute bottom-0 right-0 opacity-20 rotate-180">
        <CornerOrnament />
      </div>

      {/* Floating glow shapes */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none"
        animate={{ y: [-10, 10] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [10, -10] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <SectionTitle
          title="Tentang Kami"
          color="text-accent"
          subtitle="Kisah di balik setiap benda antik dan nilai sejarah yang hidup kembali."
        />

        <p className="text-muted text-lg leading-relaxed mb-10 text-balance">
          <span className="text-accent font-semibold ">
            De Philo Cafe Art & Antique
          </span>{" "}
          hadir bagi para pecinta barang antik dan koleksi bersejarah. Kami menghadirkan
          berbagai koleksi unik dari seluruh Indonesia — mulai dari perabot klasik,
          perhiasan, hingga karya seni yang penuh cerita. Setiap barang kami pilih dengan
          hati-hati untuk memastikan kualitas, keaslian, dan nilai sejarahnya.
        </p>

        <motion.div whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }} transition={{ duration: 0.3 }}>
          <Link
            to="/about"
            className="inline-block px-8 py-4 bg-secondary text-light font-semibold rounded-md shadow-md 
                       hover:bg-accent hover:text-darkbg transition-all duration-300 transform hover:ring-2 hover:ring-accent/40 hover:ring-offset-2"
          >
            Lanjutkan Kisah
          </Link>
        </motion.div>
      </div>

      {/* Section Divider */}
     
    </section>
  );
}
