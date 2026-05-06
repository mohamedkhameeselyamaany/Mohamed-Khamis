import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import { LanguageProvider, useLanguage } from "./hooks/useLanguage";
import "./styles/global.css";

const AppContent = () => {
  const { t } = useLanguage();

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <ScrollToTop />
      
      <footer style={{
        background: "linear-gradient(180deg, var(--bg-light) 0%, var(--bg) 100%)",
        borderTop: "1px solid var(--border)",
        padding: "4rem 2rem 2rem 2rem",
        color: "var(--text-muted)",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Quote Section */}
          <div style={{
            marginBottom: "2rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--border)"
          }}>
            <p style={{
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "var(--primary-light)",
              fontWeight: "600",
              marginBottom: "0.5rem"
            }}>
              💡 {t.footerQuote}
            </p>
            <p style={{
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              marginBottom: "1rem"
            }}>
              {t.thanks}
            </p>
          </div>

          {/* Main Footer */}
          <div>
            <p style={{ fontSize: "0.95rem", marginBottom: "0.75rem" }}>
              © 2026 <strong style={{ color: "var(--primary-light)" }}>Eng-Mohamed Khamis</strong>
            </p>
            <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              {t.footerCredit} <span style={{ color: "var(--secondary)" }}>❤️</span> {t.builtWith}
            </p>
            <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>
              Front-End Developer & UI/UX Designer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;