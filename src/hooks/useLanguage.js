import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

const translations = {
  ar: {
    home: "الرئيسية",
    about: "عني",
    skills: "المهارات",
    projects: "المشاريع",
    contact: "تواصل",
    greeting: "👋 مرحباً، أنا",
    role: "مطور واجهات أمامية  ومصمم واجهات وتجربة المستخدم ",
    description: "أنا مطوّر واجهات أمامية (Front-End Developer) ومصمم UI/UX، أبني تجارب رقمية حديثة ومذهلة باستخدام أحدث تقنيات الويب، وأحوّل الأفكار إلى واقع رقمي يجمع بين الأداء العالي والتصميم الاحترافي وسهولة الاستخدام، وأعمل على تصميم وتطوير واجهات تفاعلية عصرية تركز على البساطة والجمال البصري مع تجربة مستخدم سلسة على جميع الأجهزة، وهدفي إنشاء منتجات رقمية مريحة وفعّالة تساعد المستخدم على الوصول لما يحتاجه بسهولة وبدون تعقيد مع الحفاظ على جودة عالية في الأداء والتصميم.",
    viewWork: "شاهد أعمالي",
    contactMe: "تواصل معي",
    yearsExp: "سنوات خبرة",
    projectsDone: "مشروع منجز",
    happyClients: "عميل سعيد",
    aboutTag: "عني",
    aboutTitle: "من أنا؟ ",
    aboutRole: "مطور واجهات أمامية ومصمم تجربة مستخدم شغوف ببناء تجارب رقمية استثنائية",
    aboutText1: "أعمل كمطور واجهات أمامية منذ أكثر من 2 سنوات، وأمتلك خبرة واسعة في بناء تطبيقات الويب التفاعلية والمواقع الإلكترونية ذات الأداء العالي. أؤمن بأن التفاصيل الصغيرة تصنع الفرق الكبير.",
    aboutText2: "أستخدم أحدث التقنيات وأتبع أفضل الممارسات لضمان كود نظيف وقابل للصيانة. أحب التعلم المستمر ومواكبة كل ما هو جديد في عالم تطوير الويب.",
    downloadCV: " تحميل السيرة الذاتية",
    skillsTag: "المهارات",
    skillsTitle: "أدواتي التقنية",
    frontend: "الواجهة الأمامية",
    tools: "الأدوات والتقنيات",
    design: "التصميم",
    projectsTag: "المشاريع",
    projectsTitle: "أعمالي المميزة",
    myProjects: "مشاريعي",
    projectsSubtitle: "بعض من أعمالي التي قمت بتطويرها",
    all: "الكل",
    preview: "🌐 معاينة",
    code: "💻 الكود",
    contactTag: "تواصل معي",
    contactTitle: "لنبدأ مشروعاً جديداً",
    contactDesc: "هل لديك فكرة مشروع أو تريد التعاون؟ أنا دائماً منفتح على الفرص الجديدة. تواصل معي وسأرد عليك في أقرب وقت.",
    contactFormTitle: "نموذج التواصل 📝",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    location: "الموقع",
    name: "الاسم",
    message: "الرسالة",
    namePlaceholder: "اسمك الكريم",
    emailPlaceholder: "mohamedkhamis55@email.com",
    messagePlaceholder: "اكتب رسالتك هنا...",
    sending: "⏳ جاري الإرسال...",
    send: "📤 إرسال الرسالة",
    success: "✅ تم الإرسال بنجاح! سأتواصل معك قريباً",
    error: "❌ حدث خطأ أثناء الإرسال. حاول مرة أخرى.",
    builtWith: "بُني بـ ❤️ باستخدام React",
    locationValue: " القاهرة، مصر ، بني سويف",
    scrollToContact: "تواصل معي",
    scrollToTop: "العودة للأعلى",
    footerQuote: "الله يحب إتقان العمل",
    footerCredit: " ",
    thanks: "شكراً لزيارتك"
  },
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    greeting: "👋 Hi, I'm",
    role: "Front-end Developer and UI/UX Designer",
    description: "I am a Front-End Developer and UI/UX Designer. I build modern and amazing digital experiences using the latest web technologies. I turn ideas into a digital reality that combines high performance, professional design, and ease of use. I work on designing and developing modern interactive interfaces that focus on simplicity and visual beauty with a smooth user experience on all devices. My goal is to create convenient and effective digital products that help the user access what they need easily and without complication while maintaining high quality in performance and design.",
    viewWork: "View My Work",
    contactMe: "Contact Me",
    yearsExp: "Years Experience",
    projectsDone: "Projects Done",
    happyClients: "Happy Clients",
    aboutTag: "About",
    aboutTitle: "Who Am I?",
    aboutRole: "Frontend Developer & UI/UX Designer passionate about building exceptional digital experiences",
    aboutText1: "I've been working as a frontend developer for over 3 years, with extensive experience in building interactive web applications and high-performance websites. I believe that small details make a big difference.",
    aboutText2: "I use the latest technologies and follow best practices to ensure clean, maintainable code. I love continuous learning and keeping up with everything new in the web development world.",
    downloadCV: " Download CV",
    skillsTag: "Skills",
    skillsTitle: "My Tech Stack",
    frontend: "Frontend",
    tools: "Tools & Technologies",
    design: "Design",
    projectsTag: "Projects",
    projectsTitle: "Featured Works",
    myProjects: "My Projects",
    projectsSubtitle: "Some of my work that I've developed",
    all: "All",
    preview: "🌐 Live Preview",
    code: "💻 Source Code",
    contactTag: "Get In Touch",
    contactTitle: "Let's Start a New Project",
    contactDesc: "Have a project idea or want to collaborate? I'm always open to new opportunities. Reach out and I'll get back to you soon.",    contactFormTitle: "Contact Form 📝",    email: "Email",
    phone: "Phone",
    location: "Location",
    name: "Name",
    message: "Message",
    namePlaceholder: "Your full name",
    emailPlaceholder: "mohamedkhamis55@email.com",
    messagePlaceholder: "Write your message here...",
    sending: "⏳ Sending...",
    send: "📤 Send Message",
    success: "✅ Sent successfully! I'll contact you soon",
    error: "❌ An error occurred. Please try again.",
    builtWith: "Built with ❤️ using React",
    locationValue: "Cairo, Egypt , Beni Suef",
    scrollToContact: "Contact Me",
    scrollToTop: "Back to Top",
    footerQuote: "Perfection is in the details",
    footerCredit: " ",
    thanks: "Thank you for visiting"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ar";
    const saved = localStorage.getItem("language");
    return saved || "ar";
  });

  useEffect(() => {
    localStorage.setItem("language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => setLang((prev) => (prev === "ar" ? "en" : "ar"));
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "ar",
      toggleLanguage: () => {},
      t: translations.ar
    };
  }
  return context;
};
