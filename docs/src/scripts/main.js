jQuery(document).ready(function($) {
    const nav = document.querySelector('#applications-menu-container');

    // Track when nav menu becomes sticky
    const observer = new IntersectionObserver(([entry]) => {
        // Determine if the nav is stuck:
        // - entry.boundingClientRect.top === 0: the nav is at the top of the viewport
        // - !entry.isIntersecting: the nav is no longer intersecting the viewport (i.e., has become sticky)
        const isStuck = entry.boundingClientRect.top === 0 && !entry.isIntersecting;

        // Toggle stuck class based on the sticky state
        if (isStuck) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    }, {
        root: null, // Observe changes relative to the viewport
        threshold: [1], // Only trigger when the element is fully visible or not
    });

    observer.observe(nav);

    $(window).on('scroll', function () {
        // Get the first .applications-section element
        let firstSection = $('.applications-section').first()[0];
        if (!firstSection) return; // Exit if no sections found

        // Get the distance from the top of the viewport to the first section's top edge
        let firstSectionTop = firstSection.getBoundingClientRect().top;

        // If the first section is below 25% of the viewport height,
        // it means we've scrolled above it -> remove all nav highlights and exit early
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
        });
    });
});