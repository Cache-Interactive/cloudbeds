jQuery(document).ready(function($) {
    $(window).on('scroll', function () {
        let found = false;
        $('.applications-section').each(function () {
            let rect = this.getBoundingClientRect();
            let elementHeight = rect.height;

            // Calculate how much of the element is visible
            let visibleTop = Math.max(rect.top, 0);
            let visibleBottom = Math.min(rect.bottom, window.innerHeight);
            let visibleHeight = visibleBottom - visibleTop;

            // Check if at least 75% of the element is visible
            let inView = visibleHeight >= (0.75 * elementHeight) && rect.bottom > 0 && rect.top < window.innerHeight;

            // Toggle section's in-view class
            $(this).toggleClass('in-view', inView);

            // If this is the first visible section and we haven't found one yet
            if (inView && !found) {
                found = true;

                // Get section ID
                let elementID = $(this).attr('id');

                // Remove .in-view from all nav links
                $('#applications-menu a').removeClass('in-view');

                // Add .in-view to the current section's nav link
                $('#applications-menu a[href="#' + elementID + '"]').addClass('in-view');
            }

            // If no section is in view, remove all nav highlights
            if (!found) {
                $('#applications-menu a').removeClass('in-view');
            }
        });
    });
});