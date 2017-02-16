window.appCacheHandler = function () {
    var config;

    var cached = function () {
        console.log('Cache ready.');
        if (config.cached) { config.cached(); }
    };
    var checking = function () {
        console.log('Checking for new cache version.');
        if (config.checking) { config.checking(); }
    };
    var downloading = function () {
        console.log('Downloading resources.');
        if (config.downloading) { config.downloading(); }
    };
    var noupdate = function () {
        console.log('No update needed.');
        if (config.noupdate) { config.noupdate(); }
    };
    var obsolete = function () {
        console.log('Cache is obsolete.');
        if (config.obsolete) { config.obsolete(); }
    };
    var updateready = function () {
        console.log('Ready to update.');
        if (config.updateready) { config.updateready(); }
    };
    var error = function () {
        console.log('Error loading the manifest.');
        if (config.error) { config.error(); }
    };
    
    var AppCacheHandler = function (c) {
        if (!window.applicationCache) {
            throw Error('AppCache not supported.');
        }

        config = c || {};
        applicationCache.addEventListener('cached', cached);
        applicationCache.addEventListener('checking', checking);
        applicationCache.addEventListener('downloading', downloading);
        applicationCache.addEventListener('noupdate', noupdate);
        applicationCache.addEventListener('obsolete', obsolete);
        applicationCache.addEventListener('updateready', updateready);
        applicationCache.addEventListener('error', error);
    };

    return AppCacheHandler;
}();