import { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import "../styles/pwa.css";

const OfflineBanner = () => {
  const { t } = useLanguage();
  const [isOffline, setIsOffline] = useState(() => {
    return typeof navigator !== "undefined" ? !navigator.onLine : false;
  });
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowRestored(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline && !showRestored) {
    return null;
  }

  return (
    <div className="pwa-status-banner-wrap" role="status" aria-live="polite">
      {isOffline ? (
        <div className="pwa-status-banner offline">
          <WifiOff size={18} strokeWidth={2.4} />
          <span>{t.offlineStatus}</span>
        </div>
      ) : (
        <div className="pwa-status-banner online">
          <Wifi size={18} strokeWidth={2.4} />
          <span>{t.onlineRestored}</span>
        </div>
      )}
    </div>
  );
};

export default OfflineBanner;
