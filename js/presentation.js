(function () {
    var currentSlide,
        controls = {
            end: 35,
            start: 36,
            left: 37,
            up: 38,
            right: 39,
            bottom: 40
        },
        buttons = {
            left: 0,
            right: 2
        },
        slides = [];

    var showFirstSlide = function () {
        location.href = '#' + (slides[0] || '');
        currentSlide = 0;
    };

    var showLastSlide = function () {
        location.href = '#' + (slides[slides.length - 1] || '');
        currentSlide = slides.length - 1;
    };

    var showPreviousSlide = function () {
        if (currentSlide === 0) {
            return; currentSlide = slides.length - 1;
        }
        currentSlide -= 1;
        if (slides[currentSlide]) {
            location.href = '#' + slides[currentSlide];
        }
    };

    var showNextSlide = function () {
        if (currentSlide >= slides.length - 1) {
            return;
        }
        currentSlide += 1;
        if (slides[currentSlide]) {
            location.href = '#' + slides[currentSlide];
        }
    };

    var windowClick = function (event) {
        if (event.target.href) {
            return;
        }
        switch (event.button) {
            case buttons.left:
                event.preventDefault();
                showNextSlide();
                break;
            case buttons.right:
                event.preventDefault();
                showPreviousSlide();
                break;
        }
    };

    var setSlides = function (container) {
        var i, j = container.children.length, child;
        for (i = 0; i < j; i += 1) {
            child = container.children[i];
            slides.push(child.id);
        }
        var url = location.href;
        currentSlide = 0;
        if (url.indexOf('#') > 0) {
            var currentAnchor =  url.substr(url.indexOf('#') + 1) || '',
                currentIdx = slides.indexOf(currentAnchor);
            if (currentIdx >= 0) {
                location.href = '#' + currentAnchor;
                currentSlide = currentIdx;
            }
        }
    };

    window.addEventListener('keydown', function (event) {
        switch (event.which) {
            case controls.left:
            case controls.up:
                showPreviousSlide();
                break;
            case controls.right:
            case controls.bottom:
                showNextSlide();
                break;
            case controls.start:
                showFirstSlide();
                break;
            case controls.end:
                showLastSlide();
                break;
        }
    });

    function clientServerHover (evt) {
        evt.target.parentElement.classList.add('off');
        console.log('eee');
        evt.target.removeEventListener('mouseover', clientServerHover);
    }

    setSlides(document.querySelector('article'));

    window.addEventListener('click', windowClick);

    window.addEventListener('contextmenu', windowClick);

    document.querySelector('#problem .client-server img').addEventListener('mouseover', clientServerHover);
    
    if (document.body.style.flex === undefined) {
        document.body.classList.add('no-flex');
    }
})();
