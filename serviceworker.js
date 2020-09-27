self.addEventListener('install', () => {
    if (window.caches) {
        caches.open
    }
});
self.addEventListener('activate', () => { console.log('Arquelândia'); });
self.addEventListener('fetch', () => { console.log('Arquelândia'); });