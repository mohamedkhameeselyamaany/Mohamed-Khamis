import { useDarkMode } from "../hooks/useDarkMode";
import { useLanguage } from "../hooks/useLanguage";
import { Sun, Moon } from "lucide-react";
import "../styles/footer.css";

const Footer = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { lang, toggleLanguage, t } = useLanguage();

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
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* 1. Quote & Verse Section (fluid typography, no idle icon) */}
        <div className="footer-quote-section">
          <p className="footer-quote-text">
            {t.footerQuote}
          </p>
          <p className="footer-thanks-text">
            {t.thanks}
          </p>
        </div>

        {/* 2. Replicated Navbar in Footer */}
        <div className="footer-navbar-section">
          {/* Scaled-down top logo */}
          <a
            href="#hero"
            className="footer-logo"
            onClick={(e) => scrollToSection(e, "#hero")}
            aria-label="Back to top"
          >
            <span className="logo-bracket">&lt;</span>
            MK & EL-YAMAANY
            <span className="logo-bracket">/&gt;</span>
          </a>

          {/* Navigation Links with touch-friendly targets */}
          <nav className="footer-nav-links" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="footer-nav-link"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons (Language & Theme Toggle) */}
          <div className="footer-nav-actions">
            <button
              className="lang-toggle"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <button
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} strokeWidth={2.2} /> : <Moon size={18} strokeWidth={2.2} />}
            </button>
          </div>
        </div>

        {/* 3. Branding, Names & Copyright Section (RTL / LTR aligned) */}
        <div className="footer-bottom-section">
          <div className="footer-branding">
            <div className="footer-brand-name">
              <strong>{lang === "ar" ? " البشمهندس محمد خميس" : " Eng Mohamed Khamis"}</strong>
            </div>
            <div className="footer-brand-title">
              {t.footerBioTitle}
            </div>
            <p className="footer-brand-desc">
              {t.footerBioDesc}
            </p>
          </div>

          <div className="footer-bottom-extra">
            <div className="footer-copyright">
              © 2026 {lang === "ar" ? "جميع الحقوق محفوظة" : "All Rights Reserved"}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
