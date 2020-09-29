var nomeCache = 'cache-RG-v0.9';

self.addEventListener('install', () => {
    caches.open(nomeCache).then((cache) => {
        cache.addAll([
            '/',
            '/index.html',
            '/manifest.webmanifest',
            '/recursos/imagens/balanca_bonita.png',
            '/recursos/icones/android-icon-36x36.png',
            '/recursos/icones/android-icon-48x48.png',
            '/recursos/icones/android-icon-72x72.png',
            '/recursos/icones/android-icon-96x96.png',
            '/recursos/icones/android-icon-144x144.png',
            '/recursos/icones/android-icon-192x192.png',
            '/recursos/icones/apple-icon-57x57.png',
            '/recursos/icones/apple-icon-60x60.png',
            '/recursos/icones/apple-icon-72x72.png',
            '/recursos/icones/apple-icon-76x76.png',
            '/recursos/icones/apple-icon-114x114.png',
            '/recursos/icones/apple-icon-120x120.png',
            '/recursos/icones/apple-icon-144x144.png',
            '/recursos/icones/apple-icon-152x152.png',
            '/recursos/icones/apple-icon-180x180.png',
            '/recursos/icones/apple-icon-precomposed.png',
            '/recursos/icones/apple-icon.png',
            '/recursos/icones/favicon-16x16.png',
            '/recursos/icones/favicon-32x32.png',
            '/recursos/icones/favicon-96x96.png',
            '/recursos/icones/favicon.ico',
            '/recursos/icones/ms-icon-70x70.png',
            '/recursos/icones/ms-icon-144x144.png',
            '/recursos/icones/ms-icon-150x150.png',
            '/recursos/icones/ms-icon-310x310.png',
            '/js/scripts.js',
            '/css/adaptativo.css',
            '/css/base.css',
            '/css/reset.css',
            '/css/stilos.css'
        ]);
    })
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((listaChaves) => {
            return Promise.all(
                listaChaves.map((chave) => {
                    console.log(chave);
                    if (chave !== nomeCache) {
                        return caches.delete(chave);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    let resposta = caches.open(nomeCache).then((cache) => {
        return cache.match(event.request).then((recurso) => {
            if (recurso)
                return recurso;
            else {
                fetch(event.request).then((recursoWeb) => {
                    cache.put(event.request, recursoWeb.clone());
                    return recursoWeb;
                }).catch(() => { return 'Recurso indisponível.' });
            }
        });
    });
    event.respondWith(resposta);
});