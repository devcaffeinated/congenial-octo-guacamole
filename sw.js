importScripts('./node_modules/workbox-sw/build/workbox-sw.js');

const staticAssets = [
    './',
    './favicon.ico',
    './styles.css',
    './app.js',
];
// const wb = new WorkboxSW();
console.log(workbox);

workbox.precaching.precache(staticAssets);
workbox.routing.registerRoute('https://reqres.in/(.*)',workbox.strategies.networkFirst()); 