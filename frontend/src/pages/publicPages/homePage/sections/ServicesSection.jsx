import React from "react";
import { ShoppingCartIcon, WrenchIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import SectionTitle from "../../../../components/common/SectionTitle";

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

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-24 px-6 bg-background text-center">
      <SectionTitle
        title="Layanan Kami"
        subtitle="Kami menghadirkan layanan profesional untuk menjaga dan memperkaya warisan seni Anda."
      />

      {/* Container flex wrap */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10">
        {services.map(({ title, icon: Icon, desc }, i) => (
          <div
            key={i}
            className="group bg-light rounded-2xl p-8 shadow-md hover:shadow-xl
                       transition-all duration-300 flex flex-col items-center hover:-translate-y-1
                       border border-transparent hover:border-border
                       w-full sm:w-[45%] lg:w-[30%]"
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
  );
}
