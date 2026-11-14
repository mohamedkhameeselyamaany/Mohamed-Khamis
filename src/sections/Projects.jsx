import { useState, useMemo } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { projects } from "../data/projects";
import { ExternalLink, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/projects.css";

// دالة فرز نقية وسريعة:
// 1. المشاريع المميزة (isFeatured: true) أولاً مرتبة تصاعدياً حسب featuredOrder
// 2. المشاريع العادية مرتبة من الأحدث إلى الأقدم استناداً إلى createdAt (تنازلياً)
// 3. Fallback: في حال غياب أو تساوي التاريخ، الاعتماد على id تنازلياً
const sortProjectsList = (list) => {
  return [...list].sort((a, b) => {
    const aFeatured = Boolean(a.isFeatured);
    const bFeatured = Boolean(b.isFeatured);

    // المشاريع المميزة تسبق المشاريع العادية دائماً
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;

    // إذا كان كلاهما مميزاً، نرتب حسب featuredOrder تصاعدياً (1 ثم 2 ...)
    if (aFeatured && bFeatured) {
      const orderA = a.featuredOrder ?? 999;
      const orderB = b.featuredOrder ?? 999;
      if (orderA !== orderB) return orderA - orderB;
    }

    // المشاريع العادية: الترتيب من الأحدث للأقدم استناداً إلى createdAt
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    if (timeA !== timeB) {
      return timeB - timeA;
    }

    // إجراء احتياطي (Fallback) في حال عدم توفر التاريخ: الاعتماد على id تنازلياً
    return (b.id || 0) - (a.id || 0);
  });
};

const Projects = () => {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: t.all },
    { key: "frontend", label: lang === "ar" ? "واجهات أمامية" : "Frontend" },
    { key: "fullstack", label: lang === "ar" ? "فل ستاك" : "Full Stack" },
  ];

  // حساب القائمة المرتبة مباشرة لضمان استجابة Fast Refresh / Hot Reload اللحظية فور حفظ أي تعديل في البيانات
  const sortedProjects = sortProjectsList(projects);

  // فلترة المشاريع مع دعم مرن لمعالجة الفئات وتجنب أخطاء حساسية المسافات وحالة الأحرف
  const filteredProjects = useMemo(() => {
    if (filter === "all") return sortedProjects;

    const normalizedFilter = filter.toLowerCase().replace(/[\s-_]/g, "");

    return sortedProjects.filter((p) => {
      const normalizedCategory = (p.category || "").toLowerCase().replace(/[\s-_]/g, "");
      return normalizedCategory === normalizedFilter;
    });
  }, [sortedProjects, filter]);

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

        {/* أزرار الفلترة مع حركات ناعمة وتفاعل لمسي فوري */}
        <div className="filter-buttons">
          {filters.map((f) => (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* شبكة المشاريع مع خاصية layout وانتقالات Framer Motion السلسة */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.22 } }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="project-card"
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
                    {(project.category || "").toLowerCase().includes("full")
                      ? (lang === "ar" ? "فل ستاك" : "Full Stack")
                      : (lang === "ar" ? "فرونت إند" : "Frontend")}
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

                  {/* أزرار الإجراءات في أسفل الكارت تحت اللغات مع حركات تفاعلية */}
                  <div className="project-card-actions">
                    <motion.a
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn project-btn-preview"
                      title={lang === "ar" ? "معاينة الموقع مباشرة" : "Live Demo"}
                    >
                      <ExternalLink size={17} strokeWidth={2.2} className="action-btn-svg" />
                      <span>{t.preview}</span>
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn project-btn-code"
                      title={lang === "ar" ? "مشاهدة الكود على GitHub" : "Source Code"}
                    >
                      <Code2 size={17} strokeWidth={2.2} className="action-btn-svg" />
                      <span>{t.code}</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
