/* eslint-disable no-restricted-globals */
// This file is based on the CRA service worker registration template.
// It has been added to enable PWA support without changing any existing app logic.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.\d{1,3}){0,2}$/)
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The serviceWorker is in the public folder.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check the SW.
        validateServiceWorker(swUrl, config);

        navigator.serviceWorker.ready
          .then(() => {
            // no-op
          })
          .catch(() => {
            // no-op
          });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.update();

      // eslint-disable-next-line no-unused-vars
      const waitingServiceWorker = registration.waiting;

      if (config && config.onUpdate) {
        // When there's an update available, show it.
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // At this point, the updated precached content has been fetched,
                // but the previous content is still serving.
                config.onUpdate(registration);
              } else {
                // At this point, the content is cached for the first time.
                config.onSuccess(registration);
              }
            }
          };
        };
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error during service worker registration:', error);
    });
}

function validateServiceWorker(swUrl, config) {
  fetch(swUrl)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (response.status === 404 || (contentType && contentType.indexOf('javascript') === -1)) {
        // No service worker found. Probably a wrong path. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error.message);
      });
  }
}
