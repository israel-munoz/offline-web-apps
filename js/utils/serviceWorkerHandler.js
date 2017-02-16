window.serviceWorkerHandler = function () {
    function ServiceWorkerHandler() {
        if (!navigator.serviceWorker) {
            throw Error('Service Worker not supported.');
        }
        navigator.serviceWorker.register('../service-worker.js', { scope: './' })
            .then(function (registration) {
                console.log(registration);
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    return ServiceWorkerHandler;
}();
