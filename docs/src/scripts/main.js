jQuery(document).ready(function($){
    $(window).on('scroll', function () {
        $('.applications-section').each(function () {
            let rect = this.getBoundingClientRect();
            let elementMid = rect.top + (rect.height / 2);

            let inView = elementMid < triggerPoint && rect.bottom > 0;

            $(this).toggleClass('in-view', inView);
        });
    });
});