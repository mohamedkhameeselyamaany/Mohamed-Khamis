import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// تفعيل Service Worker للإنتاج لتمكين خاصية PWA والتثبيت على الموبايل والديسكتوب
// استراتيجية Network-First تضمن جلب أي تحديث فورياً دون بقاء كاش قديم
serviceWorkerRegistration.register();
