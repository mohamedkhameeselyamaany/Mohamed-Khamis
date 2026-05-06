import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import emailjs from "@emailjs/browser";
import "../styles/contact.css";

const Contact = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    budget: "",        // ← جديد: الميزانية
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
          budget: formData.budget,      // ← جديد: الميزانية
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
    { icon: "📧", label: t.email, value: "khameesmohamed942@gmail.com" },
    { icon: "📱", label: t.phone, value: "+20 01274664643" },
    { icon: "📍", label: t.location, value: t.locationValue },
  ];

  const socialLinks = [
    { icon: "GitHub", url: "https://github.com/mohamedkhameeselyamaany", color: "#33333398" },
    { icon: "LinkedIn", url: "https://www.linkedin.com/in/mohamed-khamees-ahmed-shehata-962576323", color: "#0076b5a7" },
    { icon: "Facebook", url: "https://www.facebook.com/share/18G9688JBb/", color: "#1da0f2a3" },
  ];

  // خيارات الميزانية
  const budgetOptions = [
    { value: "", label: lang === "ar" ? "اختر الميزانية" : "Select Budget" },
   // الأربعة الأصليين
{ value: "أقل من 5,000 ج", label: lang === "ar" ? "أقل من 5,000 ج" : "Less than 5,000 EGP" },
{ value: "5,000 - 10,000 ج", label: lang === "ar" ? "5,000 - 10,000 ج" : "5,000 - 10,000 EGP" },
{ value: "10,000 - 20,000 ج", label: lang === "ar" ? "10,000 - 20,000 ج" : "10,000 - 20,000 EGP" },
{ value: "أكثر من 20,000 ج", label: lang === "ar" ? "أكثر من 20,000 ج" : "More than 20,000 EGP" },
// العشرة الجدد
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
    { value: "أتفاوض معك يا هندسه ", label: lang === "ar" ? "أتفاوض معك يا هندسه" : "Let's discuss this with you, engineer." },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.contactTag}</span>
          <h2 className="section-title">{t.contactTitle}</h2>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>{lang === "ar" ? "دعنا نتحدث! 🚀" : "Let's Talk! 🚀"}</h3>
            <p>{t.contactDesc}</p>
            
            <div className="info-items">
              {contactInfo.map((info) => (
                <div key={info.label} className="info-item">
                  <span className="info-icon">{info.icon}</span>
                  <div>
                    <span className="info-label">{info.label}</span>
                    <span className="info-value">{info.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ "--social-color": social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* عنوان الفورم */}
            <div className="form-header">
              <h3 className="form-title">{t.contactFormTitle}</h3>
              <p className="form-subtitle">
                {lang === "ar" 
                  ? "املأ البيانات التالية وسأتواصل معك في أقرب وقت ممكن 📧" 
                  : "Fill in the details below and I'll get back to you as soon as possible 📧"
                }
              </p>
            </div>

            {submitted && <div className="success-message">{t.success}</div>}
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{lang === "ar" ? "الاسم الكامل" : "Full Name"} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={lang === "ar" ? "محمد خميس احمد شحاته" : "Mohamed Khamis Ahmed Shehata"}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">{lang === "ar" ? "رقم الهاتف" : "Phone Number"} *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder={lang === "ar" ? "+20 01274664643" : "+20 01274664643"}
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
                <label htmlFor="subject">{lang === "ar" ? "الموضوع" : "Subject"} *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={lang === "ar" ? "مثال: تصميم موقع" : "e.g. Website Design"}
                />
              </div>
            </div>

            {/* حقل الميزانية - جديد */}
            <div className="form-group">
              <label htmlFor="budget">{lang === "ar" ? "الميزانية المتوقعة 💰" : "Expected Budget 💰"} *</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="budget-select"
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
              {isSubmitting ? t.sending : t.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;