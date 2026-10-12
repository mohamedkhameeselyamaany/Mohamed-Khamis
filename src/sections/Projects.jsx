import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { projects } from "../data/projects";
import { ExternalLink, Code2 } from "lucide-react";
import "../styles/projects.css";

const Projects = () => {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: t.all },
    { key: "frontend", label: lang === "ar" ? "واجهات أمامية" : "Frontend" },
    { key: "fullstack", label: lang === "ar" ? "فل ستاك" : "Full Stack" },
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

        {/* أزرار الفلترة */}
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
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="project-image">
                <img
                  src={
                    project.image.startsWith("http")
                      ? project.image
                      : `${process.env.PUBLIC_URL || ""}/images/${project.image}`
                  }
                  alt={lang === "ar" ? project.title : project.titleEn}
                  loading="lazy"
                />
                <div className="project-category-badge">
                  {project.category === "frontend"
                    ? (lang === "ar" ? "فرونت إند" : "Frontend")
                    : (lang === "ar" ? "فل ستاك" : "Full Stack")}
                </div>
              </div>

              <div className="project-info">
                <h3 className="project-card-title">
                  {lang === "ar" ? project.title : project.titleEn}
                </h3>
                <p className="project-card-desc">
                  {lang === "ar" ? project.description : project.descriptionEn}
                </p>

                {/* لغات وتقنيات المشروع */}
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* أزرار الإجراءات في أسفل الكارت تحت اللغات */}
                <div className="project-card-actions">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn project-btn-preview"
                    title={lang === "ar" ? "معاينة الموقع مباشرة" : "Live Demo"}
                  >
                    <ExternalLink size={17} strokeWidth={2.2} className="action-btn-svg" />
                    <span>{t.preview}</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn project-btn-code"
                    title={lang === "ar" ? "مشاهدة الكود على GitHub" : "Source Code"}
                  >
                    <Code2 size={17} strokeWidth={2.2} className="action-btn-svg" />
                    <span>{t.code}</span>
                  </a>
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