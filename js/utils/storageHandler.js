window.storageHandler = function () {
    var excludedTypes = ['button', 'submit', 'reset', 'image', 'file'],
        checkableTypes = ['checkbox', 'radio'],
        types = {
            SESSION: 'session',
            LOCAL: 'local'
        };

    var storage;

    var getData = function (key, defaultValue) {
        var item = storage.getItem(key);
        return item
            ? JSON.parse(item)
            : defaultValue;
    };

    var setData = function (key, value) {
        if (value === null) {
            storage.removeItem(key);
        }
        storage.setItem(key, JSON.stringify(value));
    };

    var editedControl = function () {
        var key = this.dataset.storagekey,
            data = getData(key, {});
        if (!key) {
            return;
        }
        data[this.name] = this.value;
        setData(key, data);
    };

    var bindControls = function (key, container) {
        var controls = container.querySelectorAll('input[name], select[name], textarea[name]'),
            i, j = controls.length, control;
        for (i = 0; i < j; i += 1) {
            control = controls[i];
            if (excludedTypes.indexOf(control.type) >= 0) {
                continue;
            }
            control.dataset.storagekey = key;
            control.addEventListener('change', editedControl);
        }
    };

    var loadStoredData = function (key, container) {
        var data = getData(key, {}),
            controls = container.querySelectorAll('input[name], select[name], textarea[name]'),
            i, j = controls.length, control, value;
        for (i = 0; i < j; i += 1) {
            control = controls[i];
            if (excludedTypes.indexOf(control.type) >= 0) {
                continue;
            }
            value = data[control.name] || '';
            if (control.tagName === 'SELECT') {
                var option = control.querySelector('[value="' + value + '"]');
                if (option) {
                    option.selected = true;
                }
            } else if (checkableTypes.indexOf(control.type) >= 0) {
                control.checked = control.value.toString() === value.toString();
            } else {
                control.value = value || '';
            }
        }
    };

    var StorageHandler = function (type, key, container) {
        if (!window.sessionStorage || !window.localStorage) {
            throw Error('Web Storage not supported.');
        }
        switch (type) {
            case types.SESSION:
                storage = sessionStorage;
                break;
            case types.LOCAL:
                storage = localStorage;
                break;
            default:
                throw Error('StorageHandler: Invalid configuration.');
        }
        bindControls(key, container);
        if (!!storage.getItem(key)) {
            loadStoredData(key, container);
        }
    };

    StorageHandler.types = types;
    return StorageHandler;
}();
