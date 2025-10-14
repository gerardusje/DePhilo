// src/pages/Contact.jsx
import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Terima kasih! Pesan Anda telah terkirim.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="font-sans text-dark">
            {/* Hero / Banner */}
            <section className="relative h-72 w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1E1E1E] via-[#2A2A2A] to-[#3B3B3B]">
                {/* Tekstur lembut */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 mix-blend-overlay" />

                {/* Efek cahaya lembut di tengah */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-40 blur-2xl" />

                {/* Glow keemasan halus */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-primary/30 rounded-full blur-3xl opacity-20" />

                {/* Teks utama */}
                <h1 className="relative text-4xl md:text-5xl font-serif font-bold text-light text-center px-6 drop-shadow-md tracking-wide">
                    Hubungi Kami
                </h1>

                {/* Lapisan bayangan lembut di bawah untuk depth */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
            </section>


            {/* Contact Form */}
            <section className="py-20 px-6 bg-background">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-center text-primary mb-6">
                        Kirim Pesan
                    </h2>
                    <p className="text-muted text-center mb-10 leading-relaxed">
                        Ada pertanyaan atau ingin tahu lebih banyak tentang koleksi kami?
                        Silakan isi formulir di bawah ini — kami akan segera menghubungi Anda.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-light p-8 rounded-2xl shadow-lg border border-border"
                    >
                        <div>
                            <label className="block text-dark font-medium mb-2">Nama</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/60"
                            />
                        </div>

                        <div>
                            <label className="block text-dark font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/60"
                            />
                        </div>

                        <div>
                            <label className="block text-dark font-medium mb-2">Pesan</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                required
                                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/60"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-light font-semibold py-3 rounded-md hover:bg-accent hover:text-dark transition-all duration-300 shadow-md hover:shadow-xl"
                        >
                            Kirim Pesan
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="mt-12 text-center text-muted">
                        <p>
                            Email:{" "}
                            <a
                                href="mailto:info@pusatantikindonesia.com"
                                className="text-primary hover:underline"
                            >
                                info@pusatantikindonesia.com
                            </a>
                        </p>
                        <p>
                            Telepon:{" "}
                            <a
                                href="tel:+62123456789"
                                className="text-primary hover:underline"
                            >
                                +62 123 456 789
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
