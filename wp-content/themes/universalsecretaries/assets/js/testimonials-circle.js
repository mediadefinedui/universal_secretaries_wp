/**
 * Client Recommendations Circular / Orbital Testimonial Logic
 * Universal Secretaries
 */
(function () {
  'use strict';

  function initTestimonials() {
    var wrap = document.querySelector('#testimonial-area .testi-wrap');
    if (!wrap) return;

    var rawItems = wrap.querySelectorAll('.client-single');
    if (!rawItems.length) return;

    // Convert to Array and sort by position-1..9 for smooth clockwise rotation
    var items = Array.prototype.slice.call(rawItems);
    items.sort(function (a, b) {
      var posA = parseInt((a.getAttribute('data-position') || '').replace('position-', ''), 10) || 0;
      var posB = parseInt((b.getAttribute('data-position') || '').replace('position-', ''), 10) || 0;
      return posA - posB;
    });

    var autoPlayInterval = null;
    var currentIndex = 0;

    // Determine starting active index
    items.forEach(function (item, index) {
      if (item.classList.contains('active')) {
        currentIndex = index;
      }
    });

    // Elegant corporate gradients for client avatar placeholders
    var avatarGradients = [
      'linear-gradient(135deg, #0b2240, #058acb)', // Deep Navy to Cyan
      'linear-gradient(135deg, #1e3a8a, #3b82f6)', // Royal Blue
      'linear-gradient(135deg, #0f766e, #06b6d4)', // Teal Cyan
      'linear-gradient(135deg, #1e293b, #475569)', // Slate Graphite
      'linear-gradient(135deg, #312e81, #6366f1)', // Indigo
      'linear-gradient(135deg, #0369a1, #0ea5e9)', // Sky Blue
      'linear-gradient(135deg, #164e63, #0891b2)', // Deep Ocean
      'linear-gradient(135deg, #1e1b4b, #2563eb)', // Midnight Sapphire
      'linear-gradient(135deg, #111827, #0284c7)'  // Jet Blue
    ];

    // Helper to activate a specific testimonial index
    function activateIndex(index) {
      if (index < 0 || index >= items.length) return;

      items.forEach(function (el, i) {
        if (i === index) {
          el.classList.remove('inactive');
          el.classList.add('active');
        } else {
          el.classList.remove('active');
          el.classList.add('inactive');
        }
      });

      currentIndex = index;
    }

    // Attach click listeners & placeholder error handlers to all items
    items.forEach(function (item, index) {
      var imgBox = item.querySelector('.client-img');
      var trigger = imgBox || item;

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        activateIndex(index);
        resetAutoPlay();
      });

      // Handle avatar fallback if client thumbnail is not yet uploaded
      var img = item.querySelector('.client-img img');
      if (img) {
        var applyPlaceholder = function () {
          if (img.dataset.hasPlaceholder === 'true') return;
          img.dataset.hasPlaceholder = 'true';

          var nameEl = item.querySelector('.link-linked-in h3') || item.querySelector('h3');
          var name = nameEl ? nameEl.textContent.trim() : 'US';
          var parts = name.replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, '').trim().split(/\s+/);
          var initials = '';
          if (parts.length >= 2) {
            initials = parts[0][0] + parts[parts.length - 1][0];
          } else if (parts.length === 1 && parts[0].length > 0) {
            initials = parts[0].slice(0, 2);
          } else {
            initials = 'US';
          }
          initials = initials.toUpperCase();

          var placeholder = document.createElement('div');
          placeholder.className = 'client-avatar-placeholder';
          placeholder.textContent = initials;
          placeholder.style.background = avatarGradients[index % avatarGradients.length];

          img.style.display = 'none';
          if (img.parentNode) {
            img.parentNode.appendChild(placeholder);
          }
        };

        if (img.complete && (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0)) {
          applyPlaceholder();
        } else {
          img.addEventListener('error', applyPlaceholder);
        }
      }
    });

    // Auto-rotation every 7 seconds in clockwise order
    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(function () {
        var next = (currentIndex + 1) % items.length;
        activateIndex(next);
      }, 7000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pause rotation while hovering over the section
    wrap.addEventListener('mouseenter', stopAutoPlay);
    wrap.addEventListener('mouseleave', startAutoPlay);

    // Start auto-play
    startAutoPlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
  } else {
    initTestimonials();
  }
})();
