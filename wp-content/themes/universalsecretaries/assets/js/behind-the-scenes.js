/**
 * Behind The Scenes Timeline Interactive Effects
 * - Dynamic scroll progress line tracking (--p-val)
 * - Step illumination / active states
 * - Consultation button handler
 */
(function () {
  'use strict';

  function initTimelineEffects() {
    var tl = document.getElementById('tl');
    if (!tl) return;

    var items = tl.querySelectorAll('li');
    if (!items.length) return;

    // 1. Dynamic Progress Line Fill on Scroll
    function updateTimelineProgress() {
      var rect = tl.getBoundingClientRect();
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Calculate how far through the timeline container the viewport center is
      var startY = rect.top;
      var totalH = rect.height;
      var currentOffset = (windowHeight * 0.5) - startY;
      
      var progress = Math.max(0, Math.min(100, (currentOffset / totalH) * 100));
      tl.style.setProperty('--p-val', progress.toFixed(1));

      // Update active and passed steps
      items.forEach(function (li) {
        var liRect = li.getBoundingClientRect();
        var liCenter = liRect.top + (liRect.height / 2);
        
        if (liCenter < windowHeight * 0.6) {
          li.classList.add('is-passed');
        } else {
          li.classList.remove('is-passed');
        }

        if (liCenter >= windowHeight * 0.35 && liCenter <= windowHeight * 0.65) {
          li.classList.add('is-active');
        } else {
          li.classList.remove('is-active');
        }
      });
    }

    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    window.addEventListener('resize', updateTimelineProgress);
    updateTimelineProgress();

    // 2. Consultation Button Handler
    var btsBtn = document.querySelector('.bts-intro .btn');
    if (btsBtn) {
      btsBtn.addEventListener('click', function (e) {
        var href = btsBtn.getAttribute('href');
        if (href === '#book' || href === '#consultationBookingForm') {
          var targetForm = document.getElementById('consultationBookingForm') || document.getElementById('appointment');
          if (targetForm) {
            e.preventDefault();
            targetForm.scrollIntoView({ behavior: 'smooth' });
          } else {
            // Navigate to appointment page
            window.location.href = 'appointment.html';
          }
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimelineEffects);
  } else {
    initTimelineEffects();
  }
})();
