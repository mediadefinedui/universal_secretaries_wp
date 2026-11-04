/**
 * Awards & Recognition Logo Carousel
 * Powered by Slick Carousel (via jQuery in plugins.js)
 * Features:
 * - Smooth continuous sliding & auto-play
 * - Responsive breakpoints (Desktop 6, Laptop 5, Tablet 4, Mobile 3/2)
 * - Custom Prev/Next navigation buttons
 * - Synced pagination dots with brand styling
 * - Touch swipe and drag support
 * - Pause on hover
 */
(function ($) {
  'use strict';

  function initAwardsCarousel() {
    var $track = $('#awardsCarouselTrack');
    var $prevBtn = $('#awardsPrevBtn');
    var $nextBtn = $('#awardsNextBtn');
    var $dotsContainer = $('#awardsCarouselDots');

    if (!$track.length) return;

    // Check if Slick is available via plugins.js
    if (typeof $.fn.slick === 'function') {
      // Clear any pre-rendered placeholder dots
      $dotsContainer.empty();

      // If already initialized, unslick first to avoid duplicates
      if ($track.hasClass('slick-initialized')) {
        $track.slick('unslick');
      }

      $track.slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 600,
        cssEase: 'ease-out',
        infinite: true,
        pauseOnHover: true,
        pauseOnFocus: false,
        arrows: false,
        dots: true,
        appendDots: $dotsContainer,
        customPaging: function (slider, i) {
          return '<button type="button" class="awards-dot" aria-label="Go to slide ' + (i + 1) + '"></button>';
        },
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      });

      // Hook up custom Prev / Next buttons
      $prevBtn.off('click.awards').on('click.awards', function (e) {
        e.preventDefault();
        $track.slick('slickPrev');
      });

      $nextBtn.off('click.awards').on('click.awards', function (e) {
        e.preventDefault();
        $track.slick('slickNext');
      });
    } else {
      // Fallback in case Slick plugin is not loaded
      var container = document.getElementById('awardsTrackContainer');
      if (!container) return;

      var step = 200;
      $nextBtn.off('click.awardsFallback').on('click.awardsFallback', function (e) {
        e.preventDefault();
        container.scrollBy({ left: step, behavior: 'smooth' });
      });
      $prevBtn.off('click.awardsFallback').on('click.awardsFallback', function (e) {
        e.preventDefault();
        container.scrollBy({ left: -step, behavior: 'smooth' });
      });
    }
  }

  // Initialize on DOM ready
  $(document).ready(function () {
    initAwardsCarousel();
  });

  // Re-check after window fully loads (in case images affect dimensions)
  $(window).on('load', function () {
    var $track = $('#awardsCarouselTrack');
    if ($track.length && $track.hasClass('slick-initialized')) {
      $track.slick('setPosition');
    }
  });
})(jQuery);
