import React from "react";
import aboutImg from "../assets/img/about-antique.png" // kamu bisa ganti pakai gambar sendiri

const Paragraph = ({ children, className = "" }) => (
    <p className={`text-gray-700 leading-relaxed text-lg mb-4 ${className}`}>
        {children}
    </p>
);

export default function About() {
    return (
        <main className="min-h-screen bg-neutral-50 py-20">
            <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center">
                {/* Gambar Kiri */}
                <div className="relative">
                    <img
                        src={aboutImg}
                        alt="Koleksi barang antik De Philo"
                        className="rounded-2xl shadow-lg object-cover w-full h-[450px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                </div>

                {/* Teks Kanan */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                        Tentang Kami
                    </h1>
                    <Paragraph>
                        <strong>De Philo Cafe Art & Antique</strong> hadir bagi para pecinta barang antik dan seni klasik yang menghargai
                        keindahan, nilai sejarah, dan cerita di balik setiap benda. Kami percaya bahwa setiap karya lama memiliki jiwa —
                        bukan sekadar objek, melainkan saksi perjalanan waktu dan budaya.
                    </Paragraph>

                    <Paragraph>
                        Di tempat kami, Anda akan menemukan beragam koleksi pilihan dari seluruh penjuru Indonesia — mulai dari
                        <em> furnitur klasik</em>, perhiasan kuno, <em>topeng tradisional</em>, hingga lukisan yang sarat makna.
                        Setiap barang kami kurasi dengan penuh kehati-hatian untuk memastikan keaslian, kualitas, dan nilai sejarahnya.
                    </Paragraph>

                    <Paragraph className="mb-0">
                        Lebih dari sekadar ruang jual beli, De Philo Cafe Art & Antique adalah tempat untuk
                        <strong> bercerita dan berbagi inspirasi</strong>. Kami ingin menghadirkan suasana hangat bagi siapa pun yang
                        mencintai keindahan masa lalu dan ingin merasakannya kembali dalam nuansa yang modern.
                    </Paragraph>
                </div>
            </div>

            {/* Bagian tambahan dengan kutipan elegan */}
            <div className="mt-20 text-center px-6">
                <blockquote className="text-2xl md:text-3xl italic font-serif text-yellow-900">
                    “Barang antik bukan sekadar benda lama — ia adalah jembatan antara masa lalu dan masa kini.”
                </blockquote>
                <p className="mt-4 text-gray-600">— De Philo</p>
            </div>
        </main>
    );
}
