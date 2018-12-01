
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
    workbox.precaching.precacheAndRoute([]);

    workbox.routing.registerRoute(
        /(.*)\.(?:png|gif|jpg|html|css|js)/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 3600, // 1 hr
                })
            ]
        })
    );

    const articleHandler = workbox.strategies.networkFirst({
        cacheName: 'articles-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
            })
        ]
    });

    workbox.routing.registerRoute(/(.*)\.(?:png|gif|jpg|html|css|js)/, args => {
        return articleHandler.handle(args).then(response => {
            if (!response) {
        return caches.match('contact.html');
    } else if (response.status === 404) {
            return caches.match('contact.html');
        }
        return response;
    });
});

    const postHandler = workbox.strategies.cacheFirst({
        cacheName: 'posts-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
            })
        ]
    });

    workbox.routing.registerRoute(/(.*)\.(?:png|gif|jpg|html|css|js)/, args => {
        return postHandler.handle(args).then(response => {
            if (response.status === 404) {
        return caches.match('contact.html');
    }
    return response;
})
.catch(function() {
        return caches.match('contact.html');
    });
});

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

const cacheName = 'cache-v1';
const precacheResources = [
    './',
    './index.html',
    './images/church/church-main.jpg',
    './images/couple/karen.png',
    './images/couple/ivan.png',
    './favicon.ico',
    './css/animate.css',
    './css/bootstrap.css',
    './invitees.json',
    './app.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
            return cache.addAll(precacheResources);
    }));
});

self.addEventListener('activate', event => {
    // console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
    // console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
            .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
    }));
});
