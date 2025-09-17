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

  // Jump to anchor when user selects a select dropdown option
  $('#nav-select').on('change', function () {
    var anchorId = $(this).val();

    if (anchorId) {
      var target = $('#' + anchorId);
      if (target.length) {
        var selectedIndex = this.selectedIndex;

        var offset = (selectedIndex === 1) ? 50 : 30;

        $('html, body').stop(true, true).animate({
          scrollTop: target.offset().top - offset
        }, 500);
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  function lavaAnimation() {
    const lavaTarget = document.querySelector(".lava-lamp-frames");
    const lavaWrapper = document.querySelector(".lava-lamp");
    if (!lavaTarget || !lavaWrapper) return;

    const lavaSprite = {
      width: 48,
      height: 100,
      total: 150,
      cols: 20,
      duration: 4
    };

    let frameData = { frame: 0 };

    function updateFrame() {
      const frame = Math.floor(frameData.frame);
      const frameX = (frame % lavaSprite.cols) * -lavaSprite.width;
      const frameY = Math.floor(frame / lavaSprite.cols) * -lavaSprite.height;

      gsap.set(lavaTarget, {
        x: frameX,
        y: frameY
      });
    }

    const lavaTL = gsap.timeline({ paused: true });

    // First playthrough: linear
    lavaTL.to(frameData, {
      frame: lavaSprite.total - 1,
      duration: lavaSprite.duration,
      ease: "none",
      onUpdate: updateFrame
    });

    // Reset frame to 0 before second playthrough
    lavaTL.set(frameData, { frame: 0 });

    // Second playthrough split into two parts:
    // 85% linear
    lavaTL.to(frameData, {
      frame: (lavaSprite.total - 1) * 0.85,
      duration: lavaSprite.duration * 0.85,
      ease: "none",
      onUpdate: updateFrame
    });

    // last 15% ease out
    lavaTL.to(frameData, {
      frame: lavaSprite.total - 1,
      duration: lavaSprite.duration * 0.15,
      ease: "cubic-bezier(0.4, 0.4, 0.6, 1)",
      onUpdate: updateFrame
    });

    // Trigger on scroll into view (play once)
    ScrollTrigger.create({
      trigger: lavaWrapper,
      start: "top bottom",
      end: "bottom center",
      once: true,
      onEnter: () => {
        if (!lavaTL.isActive()) lavaTL.restart();
      }
    });

    // Trigger again on mouseenter
    lavaTarget.addEventListener("mouseenter", () => {
      if (!lavaTL.isActive()) {
        frameData.frame = 0; // reset manually
        lavaTL.restart();
      }
    });
  }

  lavaAnimation();

  ScrollTrigger.create({
    trigger: "#connect", // The section that triggers the class change
    start: "top bottom", // When the top of the section hits the bottom of the viewport
    end: "bottom center", // When the bottom of the section leaves the center of the viewport
    toggleClass: {
        targets: "nav#main-menu", // The element to which the class will be added/removed
        className: "fade-out" // The class to add when active, remove when inactive
    }
    });
});
