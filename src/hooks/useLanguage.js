import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

const translations = {
  ar: {
    home: "الرئيسية",
    about: "عني",
    skills: "المهارات",
    projects: "المشاريع",
    contact: "تواصل",
    greeting: "مرحباً، أنا",
    heroName: "محمد خميس أحمد شحاتة",
    aboutName: "محمد خميس أحمد شحاتة",
    role: "مطور واجهات أمامية ومصمم واجهات وتجربة المستخدم",
    description: "أنا مطوّر واجهات أمامية (Front-End Developer) ومصمم UI/UX، أبني تجارب رقمية حديثة ومذهلة باستخدام أحدث تقنيات الويب، وأحوّل الأفكار إلى واقع رقمي يجمع بين الأداء العالي والتصميم الاحترافي وسهولة الاستخدام، وأعمل على تصميم وتطوير واجهات تفاعلية عصرية تركز على البساطة والجمال البصري مع تجربة مستخدم سلسة على جميع الأجهزة، وهدفي إنشاء منتجات رقمية مريحة وفعّالة تساعد المستخدم على الوصول لما يحتاجه بسهولة وبدون تعقيد مع الحفاظ على جودة عالية في الأداء والتصميم.",
    viewWork: "شاهد أعمالي",
    contactMe: "تواصل معي",
    yearsExp: "سنوات خبرة",
    projectsDone: "مشروع منجز",
    happyClients: "عميل سعيد",
    aboutTag: "عني",
    aboutTitle: "من أنا؟",
    aboutRole: "مطور واجهات أمامية ومصمم تجربة مستخدم شغوف ببناء تجارب رقمية استثنائية",
    aboutText1: "أعمل كمطور واجهات أمامية منذ أكثر من سنتين، وأمتلك خبرة واسعة في بناء تطبيقات الويب التفاعلية والمواقع الإلكترونية ذات الأداء العالي. أؤمن بأن التفاصيل الصغيرة تصنع الفرق الكبير.",
    aboutText2: "أستخدم أحدث التقنيات وأتبع أفضل الممارسات لضمان كود نظيف وقابل للصيانة. أحب التعلم المستمر ومواكبة كل ما هو جديد في عالم تطوير الويب.",
    downloadCV: "تحميل السيرة الذاتية",
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
    preview: "معاينة حية",
    code: "كود المشروع",
    contactTag: "تواصل معي",
    contactTitle: "تواصل معي من خلال النموذج التالي",
    contactSubtitle: "يمكنك التواصل وإرسال تفاصيل مشروعك من خلال ملء النموذج التالي",
    contactDesc: "هل لديك فكرة مشروع أو تريد التعاون؟ أنا دائماً منفتح على الفرص الجديدة. تواصل معي وسأرد عليك في أقرب وقت.",
    contactFormTitle: "نموذج التواصل",
    contactFormSubtitle: "املأ البيانات التالية وسأتواصل معك في أقرب وقت ممكن",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    location: "الموقع",
    name: "الاسم الكامل",
    subject: "الموضوع",
    message: "الرسالة",
    budgetLabel: "الميزانية المتوقعة للمشروع:",
    budgetPlaceholder: "اختر الميزانية المتوقعة",
    namePlaceholder: "مثال: محمد خميس",
    phonePlaceholder: "مثال: +20 01274664643",
    emailPlaceholder: "مثال: khameesmohamed942@gmail.com",
    subjectPlaceholder: "مثال: تصميم وتطوير موقع إلكتروني",
    messagePlaceholder: "اكتب تفاصيل رسالتك أو مشروعك هنا...",
    sending: "جاري الإرسال...",
    send: "إرسال الرسالة",
    success: "تم الإرسال بنجاح! سأتواصل معك قريباً",
    error: "حدث خطأ أثناء الإرسال. حاول مرة أخرى.",
    builtWith: "بُني بـ ❤️ باستخدام React",
    locationValue: "القاهرة، مصر ، بني سويف",
    scrollToContact: "تواصل معي",
    scrollToTop: "العودة للأعلى",
    footerQuote: "«إن الله يحب إذا عمل أحدكم عملاً أن يتقنه» — ﴿ وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ ﴾ نسعى لأن يكون لكل عملٍ أثر، ولكل فكرةٍ قيمة، ولكل تفصيلةٍ حكاية؛ فالإبداع ليس مجرد ما نُنجزه، بل كيف نُنجزه وبأي روح.",
    footerBioTitle: "مطور واجهات أمامية (Front-End Developer) ومصمم واجهات وتجربة المستخدم (UI/UX Designer).",
    footerBioDesc: "أجمع بين التطوير البرمجي والتصميم المتمحور حول المستخدم لبناء واجهات ويب عصرية، تفاعلية، سهلة الاستخدام، ومتوافقة مع مختلف الأجهزة.",
    footerCredit: "",
    thanks: "شكراً لزيارتك"
  },
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    greeting: "Hi, I'm",
    heroName: "Mohamed Khamis Ahmed Shehata",
    aboutName: "Mohamed Khamis Ahmed Shehata",
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
    aboutText1: "I've been working as a frontend developer for over 2 years, with extensive experience in building interactive web applications and high-performance websites. I believe that small details make a big difference.",
    aboutText2: "I use the latest technologies and follow best practices to ensure clean, maintainable code. I love continuous learning and keeping up with everything new in the web development world.",
    downloadCV: "Download CV",
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
    preview: "Live Preview",
    code: "Source Code",
    contactTag: "Contact Me",
    contactTitle: "Contact Me via the Following Form",
    contactSubtitle: "You can reach out and send your project details using the form below",
    contactDesc: "Have a project idea or want to collaborate? I'm always open to new opportunities. Reach out and I'll get back to you soon.",
    contactFormTitle: "Contact Form",
    contactFormSubtitle: "Fill in the details below and I'll get back to you as soon as possible",
    email: "Email Address",
    phone: "Phone Number",
    location: "Location",
    name: "Full Name",
    subject: "Subject",
    message: "Message",
    budgetLabel: "Expected Project Budget:",
    budgetPlaceholder: "Select expected budget",
    namePlaceholder: "e.g. Mohamed Khamis",
    phonePlaceholder: "e.g. +20 01274664643",
    emailPlaceholder: "e.g. khameesmohamed942@gmail.com",
    subjectPlaceholder: "e.g. Website Design & Development",
    messagePlaceholder: "Write your message or project details here...",
    sending: "Sending...",
    send: "Send Message",
    success: "Sent successfully! I'll contact you soon",
    error: "An error occurred. Please try again.",
    builtWith: "Built with ❤️ using React",
    locationValue: "Cairo, Egypt , Beni Suef",
    scrollToContact: "Contact Me",
    scrollToTop: "Back to Top",
    footerQuote: "“God loves that when one does work, they excel in it” — ﴿ And say: Work, for God will see your deeds ﴾ We strive for every work to leave an impact, every idea to have value, and every detail to tell a story; creativity is not just what we achieve, but how we achieve it and with what spirit.",
    footerBioTitle: "Front-End Developer & UI/UX Designer.",
    footerBioDesc: "Combining software development with user-centered design to build modern, interactive, user-friendly web interfaces compatible with all devices.",
    footerCredit: "",
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
