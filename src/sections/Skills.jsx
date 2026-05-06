import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import "../styles/skills.css";

const Skills = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      title: t.frontend,
      icon: "🎨",
      color: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      skills: [
        { name: "React.js", level: 95 },
        { name: "Next.js", level: 20 },
        { name: "TypeScript", level: 20 },
        { name: "Tailwind CSS", level: 30 },
        { name: "JavaScript", level: 85 },
        { name: "HTML5/CSS3", level: 98 },
      ],
    },
    {
      title: t.tools,
      icon: "⚙️",
      color: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      skills: [
        { name: "Git & GitHub", level: 92 },
        { name: "Webpack/Vite", level: 50 },
        { name: "Visual Studio code", level: 100 },
        { name: "Using artificial intelligence tools", level: 100 },
        { name: "Deployment (Vercel / Netlify)", level: 100 },
        { name: "Responsive Design", level: 90 },
      ],
    },
    {
      title: t.design,
      icon: "✨",
      color: "linear-gradient(135deg, #ec4899, #f43f5e)",
      skills: [
        { name: "Figma", level: 94 },
        { name: "Adobe XD", level: 50 },
        { name: "Responsive Design", level: 90 },
        { name: "UI/UX Design", level: 90 },
        { name: "Animation/Motion", level: 88 },
        { name: "Design Systems", level: 92 },
      ],
    },
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isVisible ? "animate-in" : ""}`}>
          <span className="section-tag">{t.skillsTag}</span>
          <h2 className="section-title">{t.skillsTitle}</h2>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <div 
              key={category.title} 
              className={`skill-card ${isVisible ? "animate-in" : ""}`}
              style={{ animationDelay: `${catIndex * 0.2}s` }}
            >
              <div className="skill-card-header" style={{ background: category.color }}>
                <span className="skill-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-bars">
                {category.skills.map((skill, index) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          background: category.color,
                          transition: `width 1.5s ease-out ${index * 0.1}s`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;