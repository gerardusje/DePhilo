import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    slug: "kain",
    name: "Kain",
    image: "https://images.unsplash.com/photo-1612438015378-3f8f9d799ff3",
    description: "Koleksi kain tradisional Nusantara dengan motif dan teknik langka.",
  },
  {
    slug: "patung",
    name: "Patung",
    image: "https://images.unsplash.com/photo-1583417264725-761b1a1a8f52",
    description: "Patung antik dari berbagai daerah dan masa, penuh makna dan sejarah.",
  },
  {
    slug: "topeng",
    name: "Topeng",
    image: "https://images.unsplash.com/photo-1617026061537-2b49d02b12c2",
    description: "Topeng kayu dan logam yang merefleksikan seni pertunjukan klasik Indonesia.",
  },
  {
    slug: "lukisan",
    name: "Lukisan",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698",
    description: "Lukisan klasik dan modern yang menggambarkan keindahan budaya lokal.",
  },
  {
    slug: "furniture",
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5",
    description: "Perabot antik dan vintage yang menyimpan cerita dari masa lampau.",
  },
];

export default function Gallery() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-[#B59E6A] mb-12">
          Galeri Koleksi
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((item) => (
            <Link
              key={item.slug}
              to={`/galeri/${item.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:ring-4 hover:ring-yellow-200 transition-all duration-500"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-105 group-hover:brightness-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition duration-500 flex flex-col justify-end items-center text-center px-4 pb-6">
                <h3 className="text-2xl font-bold text-[#F8EBC4] drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.name}
                </h3>
                <p className="text-sm text-yellow-100 mt-2 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.description}
                </p>
                <button className="mt-3 px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition">
                  Lihat Koleksi
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
