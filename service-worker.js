/* eslint-disable no-restricted-globals */

/**
 * PWA Service Worker (CRA-compatible, no build-system changes)
 *
 * Strategies:
 * - HTML (navigations): Network First w/ offline fallback
 * - CSS/JS: Stale While Revalidate
 * - Images/Fonts: Cache First
 * - Manifest: Cache First
 *
 * Safety:
 * - Cache only GET requests
 * - Skip requests that look sensitive (Authorization header)
 */

const SW_VERSION = "v1";

const CACHE = {
  appShell: `app-shell-${SW_VERSION}`,
  html: `html-${SW_VERSION}`,
  static: `static-${SW_VERSION}`,
  images: `images-${SW_VERSION}`,
  fonts: `fonts-${SW_VERSION}`,
  manifest: `manifest-${SW_VERSION}`,
  runtime: `runtime-${SW_VERSION}`,
};

const OFFLINE_URL = "/offline.html";
const APP_SHELL_URLS = [
  "/",
  OFFLINE_URL,
  "/manifest.json",
  "/favicon1.ico",
  "/logo.png",
  "/robots.txt",
];

// Helpers
function isGetRequest(req) {
  return req && req.method === "GET";
}

function isSameOrigin(req) {
  try {
    return new URL(req.url).origin === self.location.origin;
  } catch {
    return false;
  }
}

function isLikelySensitive(req) {
  // Avoid caching requests with auth tokens/credentials
  const auth = req.headers.get("authorization");
  if (auth) return true;

  // Avoid querystrings that often include tokens (conservative)
  const url = new URL(req.url);
  const suspiciousKeys = ["token", "access_token", "refresh_token", "sessionid", "csrf"];
  return suspiciousKeys.some((k) => url.searchParams.has(k));
}

function shouldSkipCaching(req) {
  if (!isGetRequest(req)) return true;
  if (!isSameOrigin(req)) return true;
  if (isLikelySensitive(req)) return true;
  return false;
}

async function cachePut(cacheName, request, response) {
  if (!response || !response.ok) return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
}

async function cacheMatch(cacheName, request, ignoreSearch = false) {
  const cache = await caches.open(cacheName);

  if (!ignoreSearch) return cache.match(request);

  const url = new URL(request.url);
  url.search = "";
  return cache.match(url.toString());
}

// Install: precache app shell essentials (no hashed build assets assumed)
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE.appShell);
      await cache.addAll(APP_SHELL_URLS);
      // Ensure SW moves to waiting state quickly
      self.skipWaiting();
    })().catch(() => {
      // fail silently; runtime caching will still work
    })
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          const isCurrent =
            key === CACHE.appShell ||
            key === CACHE.html ||
            key === CACHE.static ||
            key === CACHE.images ||
            key === CACHE.fonts ||
            key === CACHE.manifest ||
            key === CACHE.runtime;

          if (!isCurrent) return caches.delete(key);
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

  // HTML navigations: Network First (fallback to offline.html)
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(req);
          // Update cached HTML
          await cachePut(CACHE.html, req, networkResponse.clone());
          return networkResponse;
        } catch (e) {
          const cached = await cacheMatch(CACHE.html, req, false);
          if (cached) return cached;

          const offline = await caches.open(CACHE.appShell).then((c) => c.match(OFFLINE_URL));
          return offline || Response.error();
        }
      })()
    );
    return;
  }

  // Manifest: Cache First
  if (url.pathname.endsWith("/manifest.json")) {
    event.respondWith(
      (async () => {
        const cached = await cacheMatch(CACHE.manifest, req, false);
        if (cached) return cached;

        const res = await fetch(req);
        await cachePut(CACHE.manifest, req, res.clone());
        return res;
      })()
    );
    return;
  }

  const dest = req.destination;

  // CSS & JS: Stale While Revalidate
  if (dest === "style" || dest === "script") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE.static);
        const cached = await cache.match(req);

        const fetchPromise = fetch(req)
          .then((res) => {
            cachePut(CACHE.static, req, res.clone());
            return res;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })()
    );
    return;
  }

  // Images: Cache First
  if (dest === "image") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE.images);
        const cached = await cache.match(req);
        if (cached) return cached;

        const res = await fetch(req);
        await cachePut(CACHE.images, req, res.clone());
        return res;
      })()
    );
    return;
  }

  // Fonts: Cache First
  if (dest === "font") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE.fonts);
        const cached = await cache.match(req);
        if (cached) return cached;

        const res = await fetch(req);
        await cachePut(CACHE.fonts, req, res.clone());
        return res;
      })()
    );
    return;
  }

  // Default: Runtime Cache (Stale While Revalidate-ish for GET static resources)
  if (req.method === "GET") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE.runtime);
        const cached = await cache.match(req);

        const networkPromise = fetch(req)
          .then((res) => {
            cachePut(CACHE.runtime, req, res.clone());
            return res;
          })
          .catch(() => cached || Response.error());

        return cached || networkPromise;
      })()
    );
  }
});
