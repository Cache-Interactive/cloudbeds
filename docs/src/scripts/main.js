jQuery(document).ready(function($) {
    // MAIN NAV MENU
    $(function () {
        var overview = $('#overview');
        var nav = $('nav#main-menu');

        function checkScroll() {
            var overviewTop = overview.offset().top - 50;
            var scrollTop = $(window).scrollTop();

            // Add fixed class when scroll past Overview section,
            // remove fixed class when scroll up above it
            if (scrollTop >= overviewTop) {
                nav.addClass('fixed');
            } else {
                nav.removeClass('fixed');
            }
        }

        checkScroll();
        
        $(window).on('scroll resize', function () {
            checkScroll();
        });

        // Add fade-out class to main nav menu when scroll past Connect section,
        // remove fade-out class when scroll above it
        let hasEnteredView = false;

        function hasElementEnteredView($el) {
            if (!$el.length) return false;

            const rect = $el[0].getBoundingClientRect();
            const viewportBottom = window.innerHeight || document.documentElement.clientHeight;

            return rect.top <= viewportBottom;
        }

        $(window).on('scroll', function () {
            const $myDiv = $('#connect');
            const isNowInView = hasElementEnteredView($myDiv);

            if (isNowInView && !hasEnteredView) {
                hasEnteredView = true;
                console.log('Top of div has entered the viewport!');
                $('nav#main-menu').addClass('fade-out');

            } else if (!isNowInView && hasEnteredView) {
                hasEnteredView = false;
                console.log('Top of div is still below the viewport.');
                $('nav#main-menu').removeClass('fade-out');
            }
        });

    });

    // APPLICATIONS NAV MENU
    // Add sticky class when menu is in view
    // Add in-view class to nav menu item when its section is in view
    const $nav = $('#applications-menu-container');
    if (!$nav.length) return;

    const navTop = $nav.offset().top;

    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();

        // Toggle sticky nav class
        if (scrollTop >= navTop) {
            $nav.addClass('sticky');
        } else {
            $nav.removeClass('sticky');
        }

        // Get the first .applications-section element
        let firstSection = $('.applications-section').first()[0];
        if (!firstSection) return; // Exit if no sections found

        // Get the distance from the top of the viewport to the first section's top edge
        let firstSectionTop = firstSection.getBoundingClientRect().top;

        // If the first section is below 25% of the viewport height,
        // it means we've scrolled above it --> remove all nav highlights and exit early
        if (firstSectionTop > window.innerHeight * 0.25) {
            $('#applications-menu a').removeClass('in-view');
            return;
        }
        
        // Track if we've found a visible section
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
        });
    });
});