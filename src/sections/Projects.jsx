import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { projects } from "../data/projects";
import "../styles/projects.css";

const Projects = () => {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);

  const filters = [
    { key: "all", label: t.all },
    { key: "frontend", label: "Frontend" },
    { key: "fullstack", label: "Full Stack" },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        {/* عنوان المشاريع */}
        <div className="projects-header">
          <div className="section-badge">
            <span className="badge-dot"></span>
            {t.projectsTag}
          </div>
          <h2 className="projects-title">{t.myProjects}</h2>
          <p className="projects-subtitle">{t.projectsSubtitle}</p>
        </div>

        {/* فلترة */}
        <div className="filter-buttons">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* شبكة المشاريع */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="project-image">
                <img
                  src={project.image.startsWith("http") ? project.image : `${process.env.PUBLIC_URL}/images/${project.image}`}
                  alt={lang === "ar" ? project.title : project.titleEn}
                  loading="lazy"
                />
                <div className={`project-overlay ${hoveredId === project.id ? "active" : ""}`}>
                  <div className="project-links">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <span>🌐</span>
                      {t.preview}
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <span>💻</span>
                      {t.code}
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3>{lang === "ar" ? project.title : project.titleEn}</h3>
                <p>{lang === "ar" ? project.description : project.descriptionEn}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;