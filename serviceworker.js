// added log to make sure serviceworker.js is registered
console.log("Service Worker: Registered");

// setup an array of all the files that will be in the cache storage
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// installation of service worker
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open("cacherestaurant").then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

// fetching cachefiles for offline viewing
self.addEventListener("fetch", function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log("Found ", e.request, " in cache");
                return response;
            }
            else {
                console.log('Could not find ', e.request, ' in cache, fetching!');
                return fetch(e.request)
                .then(function(response) {
                    const clonedResponse = response.clone(); 
                    caches.open('cacherestaurant').then(function(cache) {
                        cache.put(e.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }         
        })
    );
});