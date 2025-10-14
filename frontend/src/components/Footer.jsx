import React from "react";

const sections = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { name: "Maps", href: "#" },
      { name: "Instagram", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative  bg-gradient-to-b from-black via-darkbg to-secondary  text-light border-t overflow-hidden">
      {/* Decorative glow / texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-wall.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Main container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-16">

        {/* === Top: Brand & Links === */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">

          {/* === Brand Section === */}
          <div className="text-center md:text-left space-y-3">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-light drop-shadow-md">
              De Philo Cafe Art & Antique
            </h1>
            <p className="text-accent italic text-base tracking-wide">
              “Keindahan Waktu yang Abadi”
            </p>
            <p className="text-muted max-w-sm mx-auto md:mx-0 text-sm leading-relaxed">
              Tempat di mana seni, sejarah, dan cita rasa bertemu.
              Kami melestarikan nilai keindahan dari masa lalu untuk generasi kini.
            </p>
          </div>

          {/* === Dynamic Link Sections === */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-center md:text-left">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3 text-accent uppercase tracking-wider text-sm border-b border-accent/40 inline-block pb-1">
                  {section.title}
                </h3>
                <ul className="space-y-2 mt-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-light/80 hover:text-accent transition-colors duration-200 text-sm sm:text-base"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* === Divider === */}
        <div className="mt-12 mb-6 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* === Bottom: Copyright & Socials === */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-muted text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-accent font-semibold">
              De Philo Cafe Art & Antique
            </span>
            . All rights reserved.
          </p>

          {/* Optional Social Icons */}
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-accent transition">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-accent transition">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-accent transition">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
