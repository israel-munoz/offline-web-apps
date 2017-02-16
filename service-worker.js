(function (self) {
    var cacheVersion = 'v1',
        cachedFiles = [
            'samples/ServiceWorker.html',
            'css/samples.css',
            'css/loading.css',
            'js/utils/serviceWorkerHandler.js',
            'imgs/01.jpg',
            'imgs/02.jpg'
        ];

    self.addEventListener('install', function (event) {
        console.log('Service Worker is being installed...');
        event.waitUntil(
            caches.open(cacheVersion).then(function (cache) {
                return cache.addAll(cachedFiles);
            })
        );
    });

    self.addEventListener('activate', function (event) {
        console.log('Service Worker is active');
    });

    self.addEventListener('fetch', function (event) {
        event.respondWith(
            caches.match(event.request).then(function (matchResponse) {
                return matchResponse ||
                    fetch(event.request).then(function (fetchResponse) {
                        return fetchResponse;
                    });
            })
        );
    });
})(self);
