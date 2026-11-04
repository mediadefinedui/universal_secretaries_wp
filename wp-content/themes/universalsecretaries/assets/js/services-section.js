/**
 * Services Section Interactive Logic
 * - Animated count-up for stats
 * - Booking consultation action routing
 */
(function () {
  'use strict';

  function initServicesInteractions() {
    // 1. Consultation Booking Buttons
    var buttons = document.querySelectorAll('#services .btn[data-pick]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var service = btn.getAttribute('data-pick') || '';
        
        // Check if there is an in-page consultation booking form (like on index.html)
        var inPageForm = document.getElementById('consultationBookingForm');
        if (inPageForm) {
          inPageForm.scrollIntoView({ behavior: 'smooth' });
          var serviceSelect = inPageForm.querySelector('select[name="service_type"], select#serviceType, select');
          if (serviceSelect) {
            for (var i = 0; i < serviceSelect.options.length; i++) {
              if (serviceSelect.options[i].text.toLowerCase().indexOf(service.toLowerCase()) !== -1) {
                serviceSelect.selectedIndex = i;
                break;
              }
            }
          }
        } else {
          // Navigate to appointment page with service pre-selected
          window.location.href = 'appointment.html?service=' + encodeURIComponent(service);
        }
      });
    });

    // 2. Animated Stats Counter
    var countElements = document.querySelectorAll('#services .stat b[data-count]');
    if ('IntersectionObserver' in window && countElements.length > 0) {
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            obs.unobserve(el);

            var target = parseInt(el.getAttribute('data-count'), 10);
            var suffix = el.getAttribute('data-suffix') || '';
            var duration = 1200;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              // easeOutCubic
              var easeProgress = 1 - Math.pow(1 - progress, 3);
              var current = Math.floor(easeProgress * (target - start) + start);
              el.textContent = current + suffix;

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                el.textContent = target + suffix;
              }
            }

            window.requestAnimationFrame(step);
          }
        });
      }, { threshold: 0.3 });

      countElements.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServicesInteractions);
  } else {
    initServicesInteractions();
  }
})();
