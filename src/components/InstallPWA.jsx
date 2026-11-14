import { useState, useEffect } from "react";
import { Download, Share, X, Smartphone } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import "../styles/pwa.css";

const InstallPWA = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Check if app is already running in standalone (PWA) mode
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true ||
        document.referrer.includes("android-app://");
      setIsStandalone(isStandaloneMode);
      return isStandaloneMode;
    };

    if (checkStandalone()) return;

    // 2. Detect iOS / iPadOS Safari (which lacks beforeinstallprompt)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
    const isSafari =
      /safari/.test(userAgent) &&
      !/chrome|crios|firefox|fxios/.test(userAgent);

    if (isIOSDevice && isSafari) {
      setIsIOS(true);
      setIsInstallable(true);
    }

    // 3. Listen to beforeinstallprompt on Chromium / Android / Desktop Chrome / Edge
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredInstallPrompt = e;
      setIsInstallable(true);
    };

    // Check if globally captured already
    if (window.deferredInstallPrompt) {
      setDeferredPrompt(window.deferredInstallPrompt);
      setIsInstallable(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 4. Listen to appinstalled event
    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      window.deferredInstallPrompt = null;
      setIsStandalone(true);
      localStorage.setItem("pwa_installed", "true");
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    // On iOS Safari, show the step-by-step guidance modal
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    // On browsers supporting beforeinstallprompt
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setIsInstallable(false);
          setDeferredPrompt(null);
          window.deferredInstallPrompt = null;
        }
      } catch (err) {
        console.warn("[PWA] Prompt error:", err);
      }
    }
  };

  // If already installed or running as standalone, don't show the button
  if (isStandalone || !isInstallable) {
    return null;
  }

  return (
    <>
      <button
        className="pwa-install-btn"
        onClick={handleInstallClick}
        title={t.installApp}
        aria-label={t.installApp}
      >
        <Download size={18} strokeWidth={2.4} />
        <span>{t.installApp}</span>
      </button>

      {/* iOS Safari Guidance Modal */}
      {showIOSModal && (
        <div
          className="pwa-modal-backdrop"
          onClick={() => setShowIOSModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="pwa-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pwa-modal-header">
              <h3 className="pwa-modal-title">
                <Smartphone size={22} />
                {t.iosInstallTitle}
              </h3>
              <button
                className="pwa-modal-close"
                onClick={() => setShowIOSModal(false)}
                aria-label={t.close}
              >
                <X size={20} />
              </button>
            </div>

            <div className="pwa-modal-steps">
              <div className="pwa-modal-step">
                <span className="pwa-step-num">1</span>
                <span>
                  {t.iosInstallStep1}{" "}
                  <Share
                    size={16}
                    style={{ display: "inline", verticalAlign: "middle" }}
                  />
                </span>
              </div>
              <div className="pwa-modal-step">
                <span className="pwa-step-num">2</span>
                <span>{t.iosInstallStep2}</span>
              </div>
            </div>

            <button
              className="pwa-update-btn"
              style={{ width: "100%", padding: "0.75rem" }}
              onClick={() => setShowIOSModal(false)}
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPWA;
