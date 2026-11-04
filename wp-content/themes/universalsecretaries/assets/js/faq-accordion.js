/**
 * Universal Secretaries - FAQ Accordion Controller
 * Provides buttery-smooth collapse/expand animations using the Web Animations API,
 * accordion mode, and expand/collapse all functionality.
 */

(function () {
  'use strict';

  class SmoothDetailsAccordion {
    constructor(el, container) {
      this.el = el;
      this.container = container;
      this.summary = el.querySelector('summary');
      this.content = el.querySelector('.faq-content') || el.querySelector('p');
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;

      if (!this.summary) return;

      this.initEvents();
    }

    initEvents() {
      this.summary.addEventListener('click', (e) => this.onSummaryClick(e));
      this.summary.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    onSummaryClick(e) {
      e.preventDefault();
      this.toggle();
    }

    toggle() {
      // If currently closing or closed -> open it
      if (this.isClosing || !this.el.open) {
        this.open();
      } else if (this.isExpanding || this.el.open) {
        this.shrink();
      }
    }

    shrink() {
      this.isClosing = true;
      const startHeight = `${this.el.offsetHeight}px`;
      const endHeight = `${this.summary.offsetHeight}px`;

      if (this.animation) {
        this.animation.cancel();
      }

      this.el.style.overflow = 'hidden';

      this.animation = this.el.animate({
        height: [startHeight, endHeight]
      }, {
        duration: 280,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      });

      this.animation.onfinish = () => this.onAnimationFinish(false);
      this.animation.oncancel = () => {
        this.isClosing = false;
        this.el.style.overflow = '';
      };
    }

    open() {
      // Accordion Mode: close other open items in the same container
      if (this.container) {
        const openItems = this.container.querySelectorAll('details[open]');
        openItems.forEach((other) => {
          if (other !== this.el && other._faqController && !other._faqController.isClosing) {
            other._faqController.shrink();
          }
        });
      }

      const startHeight = `${this.el.offsetHeight}px`;
      this.el.open = true;
      this.el.style.overflow = 'hidden';

      window.requestAnimationFrame(() => {
        this.isExpanding = true;
        const endHeight = `${this.el.offsetHeight}px`;

        if (this.animation) {
          this.animation.cancel();
        }

        this.animation = this.el.animate({
          height: [startHeight, endHeight]
        }, {
          duration: 320,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        });

        this.animation.onfinish = () => this.onAnimationFinish(true);
        this.animation.oncancel = () => {
          this.isExpanding = false;
          this.el.style.overflow = '';
        };
      });
    }

    onAnimationFinish(isOpen) {
      this.el.open = isOpen;
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.el.style.height = '';
      this.el.style.overflow = '';
      updateToggleAllButtonState(this.container);
    }
  }

  function updateToggleAllButtonState(container) {
    if (!container) return;
    const toggleBtn = container.querySelector('#faqToggleAllBtn');
    if (!toggleBtn) return;

    const allItems = container.querySelectorAll('details');
    const openItems = container.querySelectorAll('details[open]');

    if (openItems.length === allItems.length) {
      toggleBtn.innerHTML = '<i class="fa fa-compress"></i> Collapse All';
      toggleBtn.setAttribute('data-action', 'collapse');
    } else {
      toggleBtn.innerHTML = '<i class="fa fa-expand"></i> Expand All';
      toggleBtn.setAttribute('data-action', 'expand');
    }
  }

  function initFaqSection() {
    const faqSection = document.getElementById('faq') || document.querySelector('.s.faq');
    if (!faqSection) return;

    const detailsElements = faqSection.querySelectorAll('details');
    detailsElements.forEach((el) => {
      const controller = new SmoothDetailsAccordion(el, faqSection);
      el._faqController = controller;
    });

    // Expand/Collapse All Button
    const toggleBtn = faqSection.querySelector('#faqToggleAllBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        const action = this.getAttribute('data-action') || 'expand';
        detailsElements.forEach((el) => {
          if (el._faqController) {
            if (action === 'expand' && !el.open) {
              el.open = true;
            } else if (action === 'collapse' && el.open) {
              el.open = false;
            }
            el.style.height = '';
          }
        });

        if (action === 'expand') {
          this.innerHTML = '<i class="fa fa-compress"></i> Collapse All';
          this.setAttribute('data-action', 'collapse');
        } else {
          this.innerHTML = '<i class="fa fa-expand"></i> Expand All';
          this.setAttribute('data-action', 'expand');
        }
      });
    }

    // Smooth scroll offset for hash links to #faq
    document.querySelectorAll('a[href="#faq"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.getElementById('faq');
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqSection);
  } else {
    initFaqSection();
  }
})();
