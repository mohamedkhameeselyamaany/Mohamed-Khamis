/* eslint-disable no-restricted-globals */

/**
 * PWA Service Worker v3 for Mohamed Khamis Portfolio
 *
 * Full Offline & Standalone Capabilities:
 * - HTML: Network First with cached HTML fallback, then offline.html
 * - Static Assets (CSS/JS): Stale While Revalidate
 * - Images (local & project): Cache First with resilient background fetch
 * - Google Fonts (fonts.googleapis.com & fonts.gstatic.com): Cache First
 * - Manifest: Cache First
 * - Pre-caches all app shell essentials and project images proactively
 */

const SW_VERSION = "v3";

const CACHE = {
  appShell: `app-shell-${SW_VERSION}`,
  html: `html-${SW_VERSION}`,
  static: `static-${SW_VERSION}`,
  images: `images-${SW_VERSION}`,
  fonts: `fonts-${SW_VERSION}`,
  manifest: `manifest-${SW_VERSION}`,
  runtime: `runtime-${SW_VERSION}`,
};

const BASE_PATH = new URL("./", self.location.href).href;
const OFFLINE_URL = new URL("offline.html", BASE_PATH).href;

// Essential app shell URLs to guarantee installation
const APP_SHELL_CORE = [
  BASE_PATH,
  OFFLINE_URL,
  new URL("manifest.json", BASE_PATH).href,
  new URL("favicon1.ico", BASE_PATH).href,
  new URL("logo.png", BASE_PATH).href,
  new URL("logo192.png", BASE_PATH).href,
  new URL("robots.txt", BASE_PATH).href,
];

// Project images to pre-cache proactively for complete offline showcase
const PROJECT_IMAGES = [
  "images/Hard.jpeg",
  "images/Healthy.jpeg",
  "images/Brograming.jpeg",
  "images/Gem.jpeg",
  "images/Sanad.jpeg",
  "images/Coffee.jpeg",
  "images/Sanayi.jpeg",
  "images/Cinema.jpeg",
  "images/Ali.jpeg",
  "images/My%20website.jpeg",
  "images/invitation2.jpeg",
  "images/invtation.jpeg",
  "images/Furniture%20moving.jpg",
  "images/daab.jpg",
  "images/novawear.jpg",
];

// Helpers
function isGetRequest(req) {
  return req && req.method === "GET";
}

function isCacheableOrigin(url) {
  try {
    if (url.origin === self.location.origin) return true;
    if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") return true;
    return false;
  } catch {
    return false;
  }
}

function isLikelySensitive(req) {
  const auth = req.headers.get("authorization");
  if (auth) return true;
  try {
    const url = new URL(req.url);
    const suspiciousKeys = ["token", "access_token", "refresh_token", "sessionid", "csrf"];
    return suspiciousKeys.some((k) => url.searchParams.has(k));
  } catch {
    return false;
  }
}

function shouldSkipCaching(req) {
  if (!isGetRequest(req)) return true;
  try {
    const url = new URL(req.url);
    if (!isCacheableOrigin(url)) return true;
  } catch {
    return true;
  }
  if (isLikelySensitive(req)) return true;
  return false;
}

async function cachePut(cacheName, request, response) {
  if (!response || !response.ok) return;
  try {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
  } catch (err) {
    // Ignore quota or write errors gracefully
  }
}

async function cacheMatch(cacheName, request, ignoreSearch = false) {
  try {
    const cache = await caches.open(cacheName);
    if (!ignoreSearch) return await cache.match(request);
    const url = new URL(request.url);
    url.search = "";
    return await cache.match(url.toString());
  } catch {
    return null;
  }
}

// Install: Pre-cache App Shell core and prefetch project images
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      // 1. Cache core app shell
      try {
        const shellCache = await caches.open(CACHE.appShell);
        await shellCache.addAll(APP_SHELL_CORE);
      } catch (err) {
        console.warn("[SW] Core precache partial notice:", err);
      }

      // 2. Prefetch project images into CACHE.images without blocking install
      const imgCache = await caches.open(CACHE.images);
      await Promise.allSettled(
        PROJECT_IMAGES.map(async (relPath) => {
          try {
            const imgUrl = new URL(relPath, BASE_PATH).href;
            const existing = await imgCache.match(imgUrl);
            if (!existing) {
              const res = await fetch(imgUrl);
              if (res && res.ok) {
                await imgCache.put(imgUrl, res);
              }
            }
          } catch (e) {
            // silent fallback
          }
        })
      );

      // Take over quickly
      self.skipWaiting();
    })()
  );
});

// Activate: clean up old caches from prior SW versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const currentCaches = new Set(Object.values(CACHE));
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!currentCaches.has(key)) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      );
      self.clients.claim();
    })()
  );
});

// Messaging: allow clients to trigger skip waiting
self.addEventListener("message", (event) => {
  if (event && event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (shouldSkipCaching(req)) return;

  const url = new URL(req.url);

  // 1. HTML navigations: Network First (fallback to cached HTML, then offline.html)
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(req);
          if (networkResponse && networkResponse.ok) {
            await cachePut(CACHE.html, req, networkResponse.clone());
          }
          return networkResponse;
        } catch (e) {
          // Try matching the exact requested URL
          const cached = (await cacheMatch(CACHE.html, req, false)) || (await cacheMatch(CACHE.html, BASE_PATH, false));
          if (cached) return cached;

          // Fallback to offline.html
          const offline = await caches
            .open(CACHE.appShell)
            .then(async (c) => (await c.match(OFFLINE_URL)) || (await c.match(BASE_PATH)));
          return offline || Response.error();
        }
      })()
    );
    return;
  }

  // 2. Google Fonts (stylesheets and woff2 font files)
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE.fonts);
        const cached = await cache.match(req);
        if (cached) return cached;

        try {
          const res = await fetch(req);
          if (res && res.ok) {
            await cachePut(CACHE.fonts, req, res.clone());
          }
          return res;
        } catch {
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // 3. Manifest: Cache First
  if (url.pathname.endsWith("/manifest.json")) {
    event.respondWith(
      (async () => {
        const cached = await cacheMatch(CACHE.manifest, req, false);
        if (cached) return cached;

        try {
          const res = await fetch(req);
          if (res && res.ok) {
            await cachePut(CACHE.manifest, req, res.clone());
          }
          return res;
        } catch {
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  const dest = req.destination;

  // 4. CSS & JS: Stale While Revalidate
  if (dest === "style" || dest === "script") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE.static);
        const cached = await cache.match(req);

        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.ok) {
              cachePut(CACHE.static, req, res.clone());
            }
            return res;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })()
    );
    return;
  }

  // 5. Images: Cache First with resilient network fetch
  if (dest === "image") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE.images);
        const cached = await cache.match(req);
        if (cached) return cached;

        try {
          const res = await fetch(req);
          if (res && res.ok) {
            await cachePut(CACHE.images, req, res.clone());
          }
          return res;
        } catch (err) {
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // 6. Fonts: Cache First
  if (dest === "font") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE.fonts);
        const cached = await cache.match(req);
        if (cached) return cached;

        try {
          const res = await fetch(req);
          if (res && res.ok) {
            await cachePut(CACHE.fonts, req, res.clone());
          }
          return res;
        } catch {
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // 7. Default: Runtime Cache (Stale While Revalidate for remaining GET requests)
  if (req.method === "GET") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE.runtime);
        const cached = await cache.match(req);

        const networkPromise = fetch(req)
          .then((res) => {
            if (res && res.ok) {
              cachePut(CACHE.runtime, req, res.clone());
            }
            return res;
          })
          .catch(() => cached || Response.error());

        return cached || networkPromise;
      })()
    );
  }
});
