jQuery(document).ready(function($){
    $(window).on('scroll', function () {
        let triggerPoint = window.innerHeight || $(window).height();
        $('.applications-section').each(function () {
            let rect = this.getBoundingClientRect();
            let elementMid = rect.top + (rect.height / 3);

            let inView = elementMid < triggerPoint && rect.bottom > 0;

            $(this).toggleClass('in-view', inView);
        });
    });
});