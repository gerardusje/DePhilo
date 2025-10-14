// src/components/TestimonialsSection.jsx
import React from "react";
import SectionTitle from "../layout/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaUserCircle } from "react-icons/fa";

// Import CSS Swiper
import "swiper/css";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Collector Jakarta",
    message:
      "Pelayanan De Philo sangat profesional. Barang antik yang saya beli asli dan kualitasnya terjaga. Sangat puas!",
  },
  {
    name: "Ratna Lestari",
    role: "Pecinta Seni Surabaya",
    message:
      "Koleksi antik di De Philo luar biasa. Desain website memudahkan saya menelusuri setiap item dengan nyaman.",
  },
  {
    name: "Ahmad Fauzi",
    role: "Investor Antik Bandung",
    message:
      "Servis dan konsultasinya sangat membantu. Saya merasa setiap koleksi memiliki nilai sejarah yang dijaga dengan baik.",
  },
  {
    name: "Siti Aminah",
    role: "Penggemar Vintage Jogja",
    message:
      "Sangat puas dengan koleksi dan layanan De Philo. Website-nya mudah digunakan dan tampilannya elegan.",
  },
  {
    name: "Hendra Putra",
    role: "Pecinta Antik Solo",
    message:
      "Kualitas barang antik sangat terjamin, dan setiap item punya cerita yang menarik.",
  },
  {
    name: "Maya Dewi",
    role: "Collector Batam",
    message:
      "Layanan konsultasi sangat membantu saya dalam memilih koleksi antik terbaik.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24 px-6 bg-background text-darkbg">
      <SectionTitle
        title="Testimoni Pelanggan"
        subtitle="Apa kata mereka tentang layanan dan koleksi kami"
        color="text-accent"
      />

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        loopFillGroupWithBlank={true}
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i} className="flex justify-center my-7">
            <div className="relative bg-light rounded-2xl p-6 shadow-md flex flex-col items-center
                            hover:shadow-lg transition-all duration-300 h-full min-h-[280px] w-full max-w-sm">
              
              {/* Decorative accent (tipis di background) */}
              {/* <div className="absolute top-2 right-2 w-16 h-16 border border-primary/20 rounded-full pointer-events-none" /> */}
              <div className="absolute bottom-2 left-2 w-12 h-12 border border-primary/10 rounded-full pointer-events-none" />

              {/* Avatar */}
              <FaUserCircle className="text-primary text-12xl mb-4" />

              {/* Name & Role */}
              <h4 className="text-primary font-semibold">{t.name}</h4>
              <span className="text-muted text-sm mb-4">{t.role}</span>

              {/* Message */}
              <p className="text-darkbg italic text-center flex-1">
                {t.message}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
