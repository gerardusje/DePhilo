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
    <footer className="bg-dark text-light py-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Top: Logo & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          
          {/* Brand section */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-serif font-bold text-primary">
              De Philo Cafe Art & Antique
            </h1>
            <p className="text-accent mt-2 italic">
              Keindahan Waktu yang Abadi
            </p>
          </div>

          {/* Dynamic link sections */}
          <div className="flex flex-wrap justify-center md:justify-end gap-10">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3 text-accent uppercase tracking-wide text-sm">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-muted hover:text-primary transition-colors duration-200"
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

        {/* Bottom copyright */}
        <div className="mt-10 pt-4 border-t border-border text-center text-muted text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-accent">De Philo Cafe Art & Antique</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
