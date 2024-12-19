const CACHE_NAME = "pharmacy-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/about.html",
    "/shopping.html",
    "/invoice.html",
    "/styles.css",
    "/app.js",
    "/images/icon-192x192.png",
    "/images/icon-512x512.png",
    "/images/skin-care.jpg",
    "/images/pain-relief.jpg",
    "/images/antibiotics.jpg",
    "/images/background.jpg"
];

// تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// تفعيل Service Worker وإزالة الكاش القديم إذا كان موجودًا
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// جلب الملفات من الكاش عند الطلب
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response; // استجابة من الكاش
            }
            return fetch(event.request); // إذا لم يكن في الكاش، اجلبه من الشبكة
        })
    );
});
