import { useState, useEffect } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useLanguage } from "../hooks/useLanguage";
import "../styles/navbar.css";

const Navbar = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { lang, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", label: t.home },
    { href: "#about", label: t.about },
    { href: "#skills", label: t.skills },
    { href: "#projects", label: t.projects },
    { href: "#contact", label: t.contact },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={(e) => scrollToSection(e, "#hero")}>
          <span className="logo-bracket">&lt;</span>
          MK & EL-YAMAANY
          <span className="logo-bracket">/&gt;</span>
        </a>

        <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle language">
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle theme">
            {isDark ? "☀️" : "🌙"}
          </button>
          <button
            className={`mobile-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;