// Nama cache
const CACHE_NAME = "pwa-news-reader-v2.8";

// Daftar asset dan halaman 
var urltoCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/article.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "js/api.js",
    "/images/favicon-original.png",
    "/images/maskable_icon_192.png"
];

// Registrasi cache
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {

            // Simpan asset dan halaman dalam cache storage
            return cache.addAll(urltoCache);
        })
    );
});

// Gunakan asset dari cache storage
self.addEventListener("fetch", function (event) {
    const base_url = "https://readerapi.codepolitan.com/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request).then(response => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

// Hapus cache storage lama
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheName) {
            return Promise.all(
                cacheName.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("Serviceworker: cache" + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})