importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js'
);

const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate, NetworkFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
    ({ url }) => url.pathname === '/',
    new CacheFirst({
        cacheName: 'page',
        plugins: [
            new ExpirationPlugin({
                // Cache requests for 12 months
                maxAgeSeconds: 60 * 60 * 24 * 7 * 4 * 12,
            }),
        ],
    })
);

registerRoute(
    ({ url }) => url.pathname.startsWith('/manifest.json'),
    new CacheFirst({
        cacheName: 'manifest',
        plugins: [
            new ExpirationPlugin({
                // Cache requests for 12 months
                maxAgeSeconds: 60 * 60 * 24 * 7 * 4 * 12,
            }),
        ],
    })
);

registerRoute(
    ({ url }) => url.pathname.startsWith('/img/'),
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({
                // Cache requests for 6 months
                maxAgeSeconds: 60 * 60 * 24 * 7 * 4 * 6,
            }),
        ],
    })
);

registerRoute(
    new RegExp('/css/.*\\.css'),
    new CacheFirst({
        cacheName: 'build_files',
        plugins: [
            new ExpirationPlugin({
                // Cache requests for 3 months
                maxAgeSeconds: 60 * 60 * 24 * 7 * 4 * 3,
            }),
        ],
    })
);

registerRoute(
    new RegExp('/js/.*\\.js'),
    new CacheFirst({
        cacheName: 'build_files',
        plugins: [
            new ExpirationPlugin({
                // Cache requests for 3 months
                maxAgeSeconds: 60 * 60 * 24 * 7 * 4 * 3,
            }),
        ],
    })
);
