window.xhr = (function () {
    var XHR = function (params) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(params.method || 'GET', params.url, true);
            request.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    var result;
                    try { result = JSON.parse(request.response); }
                    catch (x) { result = request.response; }
                    resolve(result);
                } else {
                    reject({
                        status: this.status,
                        statusText: request.statusText
                    });
                }
            };
            request.onerror = function () {
                reject({
                    status: this.status,
                    statusText: request.statusText
                });
            };
            request.setRequestHeader('Content-Type', params.contentType || 'application/json');
            request.send(params.data);
        });
    };

    XHR.get = function (url) {
        return XHR({ url: url });
    };

    XHR.post = function (url, data) {
        return XHR({ url: url, method: 'POST', data: data });
    };

    return XHR;
})();
