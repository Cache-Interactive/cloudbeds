jQuery(document).ready(function($){
    $(window).on('scroll', function () {
        $('.applications-section').each(function () {
            let rect = this.getBoundingClientRect();
            let inView = (rect.top < window.innerHeight && rect.bottom > 0);

            $(this).toggleClass('in-view', inView);
        });
    });
});