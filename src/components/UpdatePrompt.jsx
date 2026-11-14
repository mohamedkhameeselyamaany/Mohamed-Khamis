import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import "../styles/pwa.css";

const UpdatePrompt = () => {
  const { t } = useLanguage();
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    const handleUpdateAvailable = (e) => {
      setRegistration(e.detail);
      setShowUpdate(true);
    };

    window.addEventListener("pwa_update_available", handleUpdateAvailable);
    return () => {
      window.removeEventListener("pwa_update_available", handleUpdateAvailable);
    };
  }, []);

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) return null;

  return (
    <div className="pwa-update-toast" role="alert" aria-live="assertive">
      <RefreshCw size={22} className="spin" color="var(--primary)" />
      <div className="pwa-update-toast-content">
        <p className="pwa-update-toast-title">{t.newVersionAvailable}</p>
      </div>
      <div className="pwa-update-toast-actions">
        <button className="pwa-update-btn" onClick={handleUpdate}>
          {t.updateNow}
        </button>
        <button className="pwa-dismiss-btn" onClick={handleDismiss}>
          {t.dismiss}
        </button>
      </div>
    </div>
  );
};

export default UpdatePrompt;
