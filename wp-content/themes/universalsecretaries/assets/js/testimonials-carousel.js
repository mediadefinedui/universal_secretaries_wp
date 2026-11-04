/**
 * Client Recommendations 3-Card Carousel Slider Logic
 * Universal Secretaries - Powered by Slick Carousel
 */
(function ($) {
  'use strict';

  function initTestimonialsCarousel() {
    var $track = $('#testimonialSliderTrack');
    var $prevBtn = $('#testiPrevBtn');
    var $nextBtn = $('#testiNextBtn');
    var $dotsContainer = $('#testimonialCarouselDots');

    if (!$track.length) return;

    // Handle image error fallbacks for avatars
    $track.find('.testi-card__avatar img').each(function () {
      var img = this;
      img.onerror = function () {
        var $author = $(img).closest('.testi-card__author');
        var name = $author.find('.testi-card__name').text().trim() || 'US';
        var parts = name.replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, '').trim().split(/\s+/);
        var initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]) : name.slice(0, 2);
        initials = initials.toUpperCase();

        var $placeholder = $('<div class="testi-card__avatar-placeholder"></div>').text(initials);
        $(img).replaceWith($placeholder);
      };
    });

    // Check if Slick is available
    if (typeof $.fn.slick === 'function') {
      if ($track.hasClass('slick-initialized')) {
        $track.slick('unslick');
      }

      $dotsContainer.empty();

      $track.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        speed: 600,
        cssEase: 'cubic-bezier(0.16, 1, 0.3, 1)',
        infinite: true,
        pauseOnHover: true,
        pauseOnFocus: false,
        arrows: false,
        dots: true,
        appendDots: $dotsContainer,
        customPaging: function (slider, i) {
          return '<button type="button" class="testi-dot" aria-label="Go to recommendation slide ' + (i + 1) + '"></button>';
        },
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              adaptiveHeight: true
            }
          }
        ]
      });

      // Hook up custom previous / next buttons
      $prevBtn.off('click.testi').on('click.testi', function (e) {
        e.preventDefault();
        $track.slick('slickPrev');
      });

      $nextBtn.off('click.testi').on('click.testi', function (e) {
        e.preventDefault();
        $track.slick('slickNext');
      });

    } else {
      // Fallback in case Slick plugin is missing
      var trackEl = document.getElementById('testimonialSliderTrack');
      if (!trackEl) return;
      trackEl.style.display = 'flex';
      trackEl.style.overflowX = 'auto';
      trackEl.style.scrollSnapType = 'x mandatory';

      $prevBtn.on('click', function () {
        trackEl.scrollBy({ left: -360, behavior: 'smooth' });
      });
      $nextBtn.on('click', function () {
        trackEl.scrollBy({ left: 360, behavior: 'smooth' });
      });
    }
  }

  // Initialize on document ready and window load
  $(document).ready(function () {
    initTestimonialsCarousel();
  });

  $(window).on('load', function () {
    // Re-trigger layout calculation once all webp images load
    if ($('#testimonialSliderTrack').hasClass('slick-initialized')) {
      $('#testimonialSliderTrack').slick('setPosition');
    }
  });

})(jQuery);

