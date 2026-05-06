import { useEffect, useRef } from "react";
import { useLanguage } from "../hooks/useLanguage";
import profileImg from "../assets/profile.png";

import "../styles/hero.css";

const Hero = () => {
  const { t, lang } = useLanguage();
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      hero.style.setProperty("--mouse-x", `${x}px`);
      hero.style.setProperty("--mouse-y", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-greeting-wrapper">
            <span className="wave-emoji">👋</span>
            <p className="hero-greeting">{t.greeting}</p>
          </div>
          <h1 className="hero-title">
            <span className="name-highlight">Mohamed Khamis Ahmed Shehata</span>
            <br />
            <span className="gradient-text">{t.role}</span>
          </h1>
          <p className="hero-description">{t.description}</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <span className="btn-icon">🚀</span>
              {t.viewWork}
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span className="btn-icon">💬</span>
              {t.contactMe}
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">+2</span>
              <span className="stat-label">{t.yearsExp}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">+12</span>
              <span className="stat-label">{t.projectsDone}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">+10</span>
              <span className="stat-label">{t.happyClients}</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-wrapper">
            <div className="image-glow"></div>
           <img src={profileImg} alt="Mohamed Khamis"/>
            <div className="floating-card card-1">
              <span className="card-icon">⚡</span>
              <div>
                <span className="card-title">React</span>
                <span className="card-sub">Expert</span>
              </div>
            </div>
            <div className="floating-card card-2">
              <span className="card-icon">🎨</span>
              <div>
                <span className="card-title">UI/UX</span>
                <span className="card-sub">Designer</span>
              </div>
            </div>
            <div className="floating-card card-3">
              <span className="card-icon">🚀</span>
              <div>
                <span className="card-title">Performance</span>
                <span className="card-sub">Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>{lang === "ar" ? "اسحب للأسفل" : "Scroll Down"}</span>
      </div>
    </section>
  );
};

export default Hero;