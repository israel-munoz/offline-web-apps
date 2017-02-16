window.indexedDbHandler = function () {
    var dbVersion,
        dbName,
        onupgrade;

    var init = function (config) {
        return new Promise(function (resolve, reject) {
            config = config || {};
            dbVersion = config.dbVersion;
            dbName = config.dbName,
            onupgrade = config.onupgradeneeded;
        });
    };

    var openDb = function () {
        return new Promise(function (resolve, reject) {
            var request = window.indexedDB.open(dbName, dbVersion);
            request.onerror = reject;
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
            request.onupgradeneeded = onupgrade;
        });
    };

    var get = function (storeName, itemKey) {
        return new Promise(function (resolve, reject) {
            openDb().then(function (db) {
                var request = db.transaction([storeName])
                    .objectStore(storeName)
                    .get(itemKey);
                request.onsuccess = function (event) {
                    resolve(event.target.result);
                };
                request.onerror = reject;
            }).catch(reject);
        });
    };

    var getAll = function (storeName, filter) {
        return new Promise(function (resolve, reject) {
            openDb().then(function (db) {
                var store = db.transaction([storeName])
                    .objectStore(storeName);
                var cursor = store.openCursor();
                var results = [];
                cursor.onerror = reject;
                cursor.onsuccess = function (event) {
                    var current = event.target.result;
                    if (current) {
                        if (filter === undefined || filter(current.value) === true) {
                            results.push(current.value);
                        }
                        current.continue();
                    } else {
                        resolve(results);
                    }
                };
            });
        });
    };

    var add = function (storeName, item) {
        return new Promise(function (resolve, reject) {
            openDb().then(function (db) {
                var store = db.transaction([storeName], 'readwrite')
                    .objectStore(storeName);
                var request = store.add(item);
                request.onsuccess = function (event) {
                    resolve(event.target.result);
                };
                request.onerror = reject;
            }).catch(reject);
        });
    };

    var addRange = function (storeName, list) {
        return new Promise(function (resolve, reject) {
            openDb().then(function (db) {
                var store = db.transaction([storeName], 'readwrite')
                    .objectStore(storeName);
                var i = 0, j = list.length;
                var addNext = function () {
                    if (i < j) {
                        var request = store.add(list[i]);
                        request.onsuccess = addNext;
                        request.onerror = reject;
                        i += 1;
                    } else {
                        resolve();
                    }
                };
                addNext();
            }).catch(reject);
        });
    };

    var update = function (storeName, itemKey, updateFunc) {
        return new Promise(function (resolve, reject) {
            openDb().then(function (db) {
                var store = db.transaction([storeName], 'readwrite')
                    .objectStore(storeName);
                var request = store.get(itemKey);
                request.onerror = reject;
                request.onsuccess = function (event) {
                    var data = event.target.result;
                    updateFunc(data);
                    var updaterequest = store.put(data);
                    updaterequest.onerror = reject;
                    updaterequest.onsuccess = function (event) {
                        resolve(event.target.result);
                    };
                };
            });
        });
    };

    var deleteItem = function (storeName, itemKey) {
        return new Promise(function (resolve, reject) {
            openDb().then(function (db) {
                var request = db.transaction([storeName], 'readwrite')
                    .objectStore(storeName)
                    .delete(itemKey);
                request.onsuccess = function (event) {
                    resolve(event.target.result);
                };
                request.onerror = reject;
            }).catch(reject);
        });
    };

    var clear = function (storeName) {
        return new Promise(function (resolve, reject) {
            openDb().then(function (db) {
                var request = db.transaction(storeName, 'readwrite')
                    .objectStore(storeName)
                    .clear();
                request.onsuccess = function (event) {
                    resolve(event.target.result);
                };
                request.onerror = reject;
            }).catch(reject);
        });
    };

    return {
        init: init,
        get: get,
        getAll: getAll,
        add: add,
        addRange: addRange,
        update: update,
        "delete": deleteItem,
        clear: clear
    };
}();
