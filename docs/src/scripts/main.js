jQuery(document).ready(function($){
    $(window).on('scroll', function () {
        $('.applications-section').each(function () {
            let rect = this.getBoundingClientRect();
            let elementHeight = rect.height;

            // Calculate how much of the element is visible
            let visibleTop = Math.max(rect.top, 0);
            let visibleBottom = Math.min(rect.bottom, window.innerHeight);
            let visibleHeight = visibleBottom - visibleTop;

            // Check if at least 75% of the element is visible
            let inView = visibleHeight >= (0.75 * elementHeight) && rect.bottom > 0 && rect.top < window.innerHeight;

            $(this).toggleClass('in-view', inView);
        });
    });
});