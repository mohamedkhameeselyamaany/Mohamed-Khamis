import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Coins,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from "lucide-react";
import "../styles/contact.css";

const Contact = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const SERVICE_ID = "service_3ls0d8o";
    const TEMPLATE_ID = "template_duxr486";
    const PUBLIC_KEY = "ON-m9UiHGTUiTbWw-";

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          title: formData.subject,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          budget: formData.budget,
          message: formData.message,
          to_name: "Mohamed Khamis",
        },
        PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", subject: "", budget: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={22} strokeWidth={2.2} />,
      label: t.email,
      value: "khameesmohamed942@gmail.com",
      href: "mailto:khameesmohamed942@gmail.com"
    },
    {
      icon: <Phone size={22} strokeWidth={2.2} />,
      label: t.phone,
      value: "+20 127 466 4643",
      href: "tel:+201274664643",
      isPhone: true
    },
    {
      icon: <MapPin size={22} strokeWidth={2.2} />,
      label: t.location,
      value: t.locationValue
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/mohamedkhameeselyamaany",
      className: "social-github",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mohamed-khamees-ahmed-shehata-962576323",
      className: "social-linkedin",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.37 9.74v-8.37H5.1v8.37h2.73z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/18G9688JBb/",
      className: "social-facebook",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/>
        </svg>
      ),
    },
  ];

  // خيارات الميزانية المتوقعة
  const budgetOptions = [
    { value: "", label: t.budgetPlaceholder },
    { value: "أقل من 5,000 ج", label: lang === "ar" ? "أقل من 5,000 ج" : "Less than 5,000 EGP" },
    { value: "5,000 - 10,000 ج", label: lang === "ar" ? "5,000 - 10,000 ج" : "5,000 - 10,000 EGP" },
    { value: "10,000 - 20,000 ج", label: lang === "ar" ? "10,000 - 20,000 ج" : "10,000 - 20,000 EGP" },
    { value: "20,000 - 30,000 ج", label: lang === "ar" ? "20,000 - 30,000 ج" : "20,000 - 30,000 EGP" },
    { value: "30,000 - 40,000 ج", label: lang === "ar" ? "30,000 - 40,000 ج" : "30,000 - 40,000 EGP" },
    { value: "40,000 - 50,000 ج", label: lang === "ar" ? "40,000 - 50,000 ج" : "40,000 - 50,000 EGP" },
    { value: "50,000 - 60,000 ج", label: lang === "ar" ? "50,000 - 60,000 ج" : "50,000 - 60,000 EGP" },
    { value: "60,000 - 70,000 ج", label: lang === "ar" ? "60,000 - 70,000 ج" : "60,000 - 70,000 EGP" },
    { value: "70,000 - 80,000 ج", label: lang === "ar" ? "70,000 - 80,000 ج" : "70,000 - 80,000 EGP" },
    { value: "80,000 - 90,000 ج", label: lang === "ar" ? "80,000 - 90,000 ج" : "80,000 - 90,000 EGP" },
    { value: "90,000 - 100,000 ج", label: lang === "ar" ? "90,000 - 100,000 ج" : "90,000 - 100,000 EGP" },
    { value: "100,000 - 150,000 ج", label: lang === "ar" ? "100,000 - 150,000 ج" : "100,000 - 150,000 EGP" },
    { value: "أكثر من 150,000 ج", label: lang === "ar" ? "أكثر من 150,000 ج" : "More than 150,000 EGP" },
    { value: "أتفاوض معك يا هندسه", label: lang === "ar" ? "🤝 أتفاوض معك يا هندسه" : "🤝 Let's discuss this with you, engineer." },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.contactTag}</span>
          <h2 className="section-title">{t.contactTitle}</h2>
          <p className="section-subtitle">{t.contactSubtitle}</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>{lang === "ar" ? "دعنا نتحدث ونبدأ الآن" : "Let's Talk & Collaborate"}</h3>
            <p>{t.contactDesc}</p>
            
            <div className="info-items">
              {contactInfo.map((info) => (
                <div key={info.label} className="info-item">
                  <span className="info-icon">{info.icon}</span>
                  <div className="info-content">
                    <span className="info-label">{info.label}</span>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="info-value info-link"
                        dir={info.isPhone ? "ltr" : undefined}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="info-value">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link ${social.className}`}
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h3 className="form-title">
                <MessageSquare size={20} strokeWidth={2.2} style={{ display: "inline-block", verticalAlign: "middle", marginInlineEnd: "8px" }} />
                <span>{t.contactFormTitle}</span>
              </h3>
              <p className="form-subtitle">
                {t.contactFormSubtitle}
              </p>
            </div>

            {submitted && (
              <div className="success-message">
                <CheckCircle2 size={18} strokeWidth={2.2} style={{ display: "inline-block", verticalAlign: "middle", marginInlineEnd: "6px" }} />
                <span>{t.success}</span>
              </div>
            )}
            {error && (
              <div className="error-message">
                <AlertCircle size={18} strokeWidth={2.2} style={{ display: "inline-block", verticalAlign: "middle", marginInlineEnd: "6px" }} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t.name} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t.namePlaceholder}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">{t.phone} *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder={t.phonePlaceholder}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">{t.email} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.emailPlaceholder}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">{t.subject} *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={t.subjectPlaceholder}
                />
              </div>
            </div>

            {/* حقل الميزانية المتوقعة بعرض كامل ومتناسق وبدون أي قص في النص */}
            <div className="form-group form-group-budget">
              <label htmlFor="budget" className="budget-label">
                <Coins size={16} strokeWidth={2.2} style={{ display: "inline-block", verticalAlign: "middle" }} />
                <span>{t.budgetLabel} *</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="budget-select-compact"
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">{t.message} *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t.messagePlaceholder}
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <Send size={18} strokeWidth={2.2} className="btn-icon" />
              <span>{isSubmitting ? t.sending : t.send}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;