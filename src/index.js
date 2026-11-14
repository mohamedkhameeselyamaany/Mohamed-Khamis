import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// تفعيل Service Worker في بيئة الإنتاج فقط لتمكين خاصية PWA والتثبيت والعمل أوفلاين دون حجب الـ Hot Reload محلياً
if (process.env.NODE_ENV === "production") {
  serviceWorkerRegistration.register({
    onUpdate: (registration) => {
      window.dispatchEvent(
        new CustomEvent("pwa_update_available", { detail: registration })
      );
    },
  });
} else {
  serviceWorkerRegistration.unregister();
}
