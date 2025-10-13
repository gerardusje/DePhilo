// src/pages/Services.jsx
import React from "react";
import { ShoppingCartIcon, WrenchIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const services = [
    {
        title: "Jual Beli Barang Antik",
        icon: ShoppingCartIcon,
        color: "text-primary",
        desc: "Kami menyediakan platform jual beli barang antik berkualitas tinggi. Setiap transaksi aman dan barang antik dijamin keasliannya. Temukan koleksi unik atau jual harta antik Anda dengan mudah.",
    },
    {
        title: "Servis Barang Antik",
        icon: WrenchIcon,
        color: "text-accent",
        desc: "Melayani perbaikan dan perawatan profesional untuk semua jenis barang antik. Dari furniture klasik hingga perhiasan antik, kami menjaga keaslian dan nilai sejarah setiap koleksi Anda.",
    },
    {
        title: "Konsultasi",
        icon: LightBulbIcon,
        color: "text-yellow-400",
        desc: "Memberikan panduan ahli tentang koleksi antik, investasi, dan perawatan barang berharga. Kami bantu Anda memahami nilai sejarah di balik setiap benda antik.",
    },
];

const Services = () => {
    return (
        <div className="font-sans text-dark bg-background scroll-smooth">
            {/* ===== Hero / Banner ===== */}
            <section className="relative h-72 w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1E1E1E] via-[#2A2A2A] to-[#3B3B3B]">
                {/* Tekstur lembut */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 mix-blend-overlay" />

                {/* Efek cahaya lembut di tengah */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-40 blur-2xl" />

                {/* Glow keemasan halus */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-primary/30 rounded-full blur-3xl opacity-20" />

                {/* Teks utama */}
                <h1 className="relative text-4xl md:text-5xl font-serif font-bold text-light text-center px-6 drop-shadow-md tracking-wide">
                    Layanan Kami
                </h1>

                {/* Lapisan bayangan lembut di bawah untuk depth */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
            </section>

            {/* ===== Services Section ===== */}
            <section className="py-20 sm:py-24 px-6 text-center bg-light relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-6 relative z-10">
                    Apa yang Kami Tawarkan
                </h2>
                <p className="text-muted mb-12 max-w-2xl mx-auto relative z-10">
                    Layanan profesional untuk menjaga, memperbaiki, dan menghargai nilai sejarah barang antik Anda.
                </p>

                <div className="relative z-10 max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map(({ title, icon: Icon, color, desc }, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl p-10 shadow-md hover:shadow-2xl 
                         transition-all duration-300 flex flex-col items-center border border-transparent hover:border-primary/30 
                         hover:-translate-y-2"
                        >
                            <div className={`h-16 w-16 flex items-center justify-center bg-primary/10 rounded-full mb-5 group-hover:bg-primary/20 transition`}>
                                <Icon className={`h-10 w-10 ${color} group-hover:scale-110 transition-transform duration-300`} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-dark group-hover:text-primary transition-colors">
                                {title}
                            </h3>
                            <p className="text-muted leading-relaxed text-center text-balance">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Call to Action ===== */}
            <section className="relative py-24 px-6 text-center bg-gradient-to-br from-dark via-[#111] to-black overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10 pointer-events-none" />

                <h2 className="text-4xl font-serif font-bold text-accent mb-6 relative z-10">
                    Siap Menjelajahi?
                </h2>
                <p className="text-gray-300 mb-10 max-w-2xl mx-auto relative z-10 text-lg">
                    Temukan koleksi antik unik kami atau konsultasikan barang Anda dengan para ahli De Philo.
                </p>
                <Link
                    to="/galeri"
                    className="relative inline-block px-8 py-4 bg-primary text-light font-semibold rounded-md shadow-md 
                     hover:bg-accent hover:text-dark transition-all duration-300 transform hover:scale-[1.03]
                     hover:ring-2 hover:ring-accent/40 hover:ring-offset-2"
                >
                    Lihat Galeri
                </Link>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
            </section>
        </div>
    );
};

export default Services;
