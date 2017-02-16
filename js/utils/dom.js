window.domUtils = function () {
    var populateSelect = function (control, data, value, text) {
        var option;
        control.innerHTML = '';
        data.forEach(function (item) {
            option = document.createElement('option');
            option.value = item[value];
            option.textContent = item[text];
            control.appendChild(option);
        });
    };

    var getFormData = function (form) {
        var data = {},
            controls = form.querySelectorAll('[name]'),
            i, j = controls.length, control, name, value, currentValue;
        for (i = 0; i < j; i += 1) {
            control = controls[i];
            name = control.name;
            currentValue = data[value];
            if (control.tagName === 'SELECT') {
                value = (control.selectedOptions[0] || {}).value;
            } else if (control.type === 'radio' || control.type === 'checkbox') {
                if (control.checked) {
                    value = control.value;
                }
            } else {
                value = control.value;
            }
            if (currentValue !== undefined) {
                if (Array.isArray(currentValue)) {
                    currentValue.push(value);
                } else {
                    currentValue = [currentValue, value];
                }
            } else {
                currentValue = value;
            }
            data[value] = currentValue;
        }
        return data;
    };

    var setFormData = function (form, data) {
        var controls = form.querySelectorAll('[name]'),
            i, j = controls.length, control, name, value;
        for (i = 0; i < j; i += 1) {
            control = controls[i];
            name = control.name;
            value = data[name];
            if (control.tagName === 'SELECT') {
                if (!Array.isArray(value)) {
                    value = [value];
                }
                value.forEach(function (v) {
                    (control.querySelector('option[value=' + v + ']') || {}).selected = true;
                });
            } else if (type === 'radio' || type === 'checkbox') {
                control.checked = control.value === value.toString();
            } else if (value instanceof Date) {
                control.valueAsDate = value;
            } else if (value instanceof Number) {
                control.valueAsNumber = value;
            } else {
                control.value = value;
            }
        }
    };

    return {
        setFormData: setFormData,
        getFormData: getFormData,
        populateSelect: populateSelect
    };
}();
