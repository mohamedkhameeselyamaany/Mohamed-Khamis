import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import TypewriterText from "../components/TypewriterText";
import cvFile from "../assets/Mohamed_Khamis_CV.pdf";
import profileImg from "../assets/profile3.png";
import { FileText } from "lucide-react";
import "../styles/about.css";

const About = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)",
    "Tailwind CSS", "Node.js", "GitHub", "Git", "Figma", "UI/UX Design"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const openCV = () => window.open(cvFile, "_blank");

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isVisible ? "animate-in" : ""}`}>
          <span className="section-tag">{t.aboutTag}</span>
          <h2 className="section-title">{t.aboutTitle}</h2>
        </div>
        
        <div className="about-content">
          <div className={`about-image ${isVisible ? "animate-in" : ""}`}>
            <div className="image-frame">
              <div className="frame-decoration" />
              <img src={profileImg} alt="Mohamed Khamis" loading="lazy" />
              <div className="experience-badge">
                <span className="exp-number">2+</span>
                <span className="exp-text">{t.yearsExp}</span>
              </div>
            </div>
          </div>
          
          <div className={`about-text ${isVisible ? "animate-in" : ""}`}>
            <h3 className="about-name">
              <TypewriterText text={t.aboutName} startTrigger={isVisible} speed={65} delay={200} />
            </h3>
            <h4 className="about-role-title">{t.aboutRole}</h4>
            <p>{t.aboutText1}</p>
            <p>{t.aboutText2}</p>
            
            <div className="about-skills">
              {skills.map((skill, index) => (
                <span 
                  key={skill} 
                  className="skill-tag"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <button type="button" onClick={openCV} className="btn btn-primary">
              <FileText size={18} strokeWidth={2.2} className="btn-icon" />
              <span>{t.downloadCV}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;