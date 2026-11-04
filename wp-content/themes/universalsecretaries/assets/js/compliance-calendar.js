/* ==========================================================================
   Compliance Calendar Interactive JS
   Sri Lanka Tax & Compliance Deadline Tracker
   ========================================================================== */

(function () {
  'use strict';

  /* ─── Month data: segment aria-label → key mapping ───────────────────── */
  const MONTH_KEYS = {
    Jan: 'Jan', Feb: 'Feb', Mar: 'Mar', Apr: 'Apr',
    May: 'May', Jun: 'Jun', Jul: 'Jul', Aug: 'Aug',
    Sep: 'Sep', Oct: 'Oct', Nov: 'Nov', Dec: 'Dec'
  };

  /* ─── Card data-m values active per month ─────────────────────────────── */
  const MONTH_TO_CARDS = {
    Jan: ['epf', 'pay'],
    Feb: ['epf', 'pay', 'sa'],
    Mar: ['epf', 'pay'],
    Apr: ['epf', 'pay'],
    May: ['epf', 'pay', 'sa'],
    Jun: ['epf', 'pay'],
    Jul: ['epf', 'pay'],
    Aug: ['epf', 'pay', 'sa'],
    Sep: ['epf', 'pay', 'final'],
    Oct: ['epf', 'pay', 'bo4'],
    Nov: ['epf', 'pay', 'tax', 'sa'],
    Dec: ['epf', 'pay']
  };

  /* ─── DOM References ─────────────────────────────────────────────────── */
  const dial       = document.getElementById('dial');
  const dmEl       = document.getElementById('dm');
  const ddEl       = document.getElementById('dd');
  const calendar   = document.getElementById('calendar');

  if (!dial || !dmEl || !ddEl) return; // Guard – section not on this page

  const segments   = dial.querySelectorAll('.seg-m');
  const dueCards   = calendar ? calendar.querySelectorAll('.due') : [];

  /* ─── Active segment tracking ────────────────────────────────────────── */
  let activeMonth = null;

  function getMonthFromSegment(seg) {
    const label = seg.getAttribute('aria-label') || '';
    const match = label.match(/^([A-Za-z]+):/);
    return match ? match[1] : null;
  }

  function getDescFromSegment(seg) {
    const label = seg.getAttribute('aria-label') || '';
    const colonIdx = label.indexOf(':');
    return colonIdx > -1 ? label.slice(colonIdx + 1).trim() : label;
  }

  /* ─── Update dial centre ─────────────────────────────────────────────── */
  function setDialCenter(monthName, description) {
    if (!dmEl || !ddEl) return;

    // Fade out
    dmEl.style.opacity = '0';
    dmEl.style.transform = 'translateY(-5px)';
    ddEl.style.opacity = '0';
    ddEl.style.transform = 'translateY(3px)';

    setTimeout(function () {
      dmEl.textContent = monthName;
      ddEl.textContent = description;

      // Fade in
      dmEl.style.opacity = '1';
      dmEl.style.transform = 'translateY(0)';
      ddEl.style.opacity = '1';
      ddEl.style.transform = 'translateY(0)';
    }, 150);
  }

  /* ─── Highlight active cards ─────────────────────────────────────────── */
  function highlightCards(monthName) {
    const activeKeys = MONTH_TO_CARDS[monthName] || [];

    dueCards.forEach(function (card) {
      const key = card.getAttribute('data-m');
      if (!key) return;

      if (activeKeys.includes(key)) {
        card.classList.add('hot');
      } else {
        card.classList.remove('hot');
      }
    });
  }

  /* ─── Activate a segment ─────────────────────────────────────────────── */
  function activateSegment(seg) {
    const month = getMonthFromSegment(seg);
    const desc  = getDescFromSegment(seg);
    if (!month) return;

    // Remove active stroke from previous
    if (activeMonth) {
      const prevSeg = dial.querySelector('.seg-m.active-seg');
      if (prevSeg) {
        prevSeg.classList.remove('active-seg');
        const prevPath = prevSeg.querySelector('path');
        if (prevPath) {
          prevPath.style.strokeWidth = '0px';
          prevPath.style.stroke = 'none';
        }
      }
    }

    // Activate new segment
    seg.classList.add('active-seg');
    const path = seg.querySelector('path');
    if (path) {
      path.style.stroke = 'rgba(255,255,255,0.6)';
      path.style.strokeWidth = '2px';
    }

    activeMonth = month;
    setDialCenter(month, desc);
    highlightCards(month);
  }

  /* ─── Bind segment events ────────────────────────────────────────────── */
  segments.forEach(function (seg) {
    seg.addEventListener('click', function () {
      activateSegment(seg);
    });

    seg.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateSegment(seg);
      }
    });
  });

  /* ─── Auto-activate current month on load ────────────────────────────── */
  function activateCurrentMonth() {
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun',
                        'Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();
    const curMonth = monthNames[now.getMonth()];

    // Find the segment that matches current month
    let found = false;
    segments.forEach(function (seg) {
      const m = getMonthFromSegment(seg);
      if (m === curMonth && !found) {
        found = true;
        activateSegment(seg);
      }
    });

    // Fallback: use Nov (the pre-selected in original HTML)
    if (!found) {
      const novSeg = Array.from(segments).find(function (s) {
        return getMonthFromSegment(s) === 'Nov';
      });
      if (novSeg) activateSegment(novSeg);
    }
  }

  /* ─── Countdown Timer Engine ─────────────────────────────────────────── */

  function nextOccurrence(mmdd) {
    // Returns the next future date for a given MM-DD string
    const now = new Date();
    const parts = mmdd.split('-');
    const month = parseInt(parts[0], 10) - 1;
    const day   = parseInt(parts[1], 10);

    const d = new Date(now.getFullYear(), month, day, 23, 59, 59);
    if (d < now) {
      d.setFullYear(d.getFullYear() + 1);
    }
    return d;
  }

  function nearestDate(mmddList) {
    // Returns the closest upcoming date from a comma-separated list of MM-DD
    const dates = mmddList.split(',').map(function (s) {
      return nextOccurrence(s.trim());
    });
    dates.sort(function (a, b) { return a - b; });
    return dates[0];
  }

  function formatCountdown(target) {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hrs: 0, min: 0, passed: true };
    }

    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hrs  = Math.floor((totalSec % 86400) / 3600);
    const min  = Math.floor((totalSec % 3600) / 60);
    return { days: days, hrs: hrs, min: min, passed: false };
  }

  function updateCountdownEl(cdEl, target) {
    const { days, hrs, min, passed } = formatCountdown(target);

    const spans = cdEl.querySelectorAll('span');

    if (passed) {
      spans.forEach(function (sp, i) {
        const b = sp.querySelector('b');
        const sm = sp.querySelector('small');
        if (i === 0 && b) b.textContent = 'Done';
        if (i === 0 && sm) sm.textContent = '';
        if (i > 0) sp.style.display = 'none';
      });
      return;
    }

    if (spans.length >= 3) {
      const bEls = cdEl.querySelectorAll('b');
      if (bEls[0]) bEls[0].textContent = days;
      if (bEls[1]) bEls[1].textContent = hrs;
      if (bEls[2]) bEls[2].textContent = min;
    }
  }

  function initCountdowns() {
    if (!calendar) return;

    // Simple countdown: data-md="MM-DD" (single date)
    const simpleCds = calendar.querySelectorAll('.cd[data-md]');
    simpleCds.forEach(function (cdEl) {
      const mdAttr = cdEl.getAttribute('data-md');
      if (!mdAttr) return;

      // Skip already handled special formats
      const isList = mdAttr.indexOf(',') > -1;
      const target = isList ? nearestDate(mdAttr) : nextOccurrence(mdAttr);

      updateCountdownEl(cdEl, target);

      setInterval(function () {
        updateCountdownEl(cdEl, isList ? nearestDate(mdAttr) : nextOccurrence(mdAttr));
      }, 30000); // Update every 30 seconds
    });

    // ISO datetime countdown: data-cd="2026-10-21T23:59:59+05:30"
    const isoCds = calendar.querySelectorAll('.cd[data-cd]');
    isoCds.forEach(function (cdEl) {
      const isoStr = cdEl.getAttribute('data-cd');
      if (!isoStr) return;
      const target = new Date(isoStr);
      updateCountdownEl(cdEl, target);
    });

    // Mark next upcoming quarter in .qs list
    updateQsActive();
  }

  /* ─── Quarterly Tabs: auto-highlight next instalment ─────────────────── */
  function updateQsActive() {
    if (!calendar) return;
    const qs = calendar.querySelector('.qs');
    if (!qs) return;

    const qItems = qs.querySelectorAll('li[data-md]');
    const now = new Date();
    let closestEl  = null;
    let closestMs  = Infinity;

    qItems.forEach(function (li) {
      li.classList.remove('next', 'active');
      const md = li.getAttribute('data-md');
      if (!md) return;
      const d = nextOccurrence(md);
      const diff = d - now;
      if (diff > 0 && diff < closestMs) {
        closestMs = diff;
        closestEl = li;
      }
    });

    if (closestEl) {
      closestEl.classList.add('next');
    }
  }

  /* ─── Monthly Pulse Beat Animation ──────────────────────────────────── */
  function animateBeat() {
    if (!calendar) return;

    const beats = calendar.querySelectorAll('.beat');
    const now = new Date();
    const curMonthIdx = now.getMonth(); // 0-indexed

    beats.forEach(function (beat) {
      const bars = beat.querySelectorAll('i');
      bars.forEach(function (bar, idx) {
        bar.classList.remove('active');
        if (idx === curMonthIdx) {
          bar.classList.add('active');
        }
      });
    });

    // Animate random subtle fluctuation for live feel
    setInterval(function () {
      beats.forEach(function (beat) {
        const bars = beat.querySelectorAll('i');
        bars.forEach(function (bar, idx) {
          if (idx !== curMonthIdx) {
            const h = 4 + Math.floor(Math.random() * 10);
            bar.style.height = h + 'px';
            const alpha = 0.3 + Math.random() * 0.4;
            bar.style.background = 'rgba(0,132,204,' + alpha + ')';
          }
        });
      });
    }, 1200);
  }

  /* ─── Scroll Reveal (.rv elements) ─────────────────────────────────────*/
  function initScrollReveal() {
    if (!calendar) return;
    const revealEls = calendar.querySelectorAll('.rv');
    if (!revealEls.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) {
        el.classList.add('reveal-pending');
        observer.observe(el);
      });
    } else {
      // Fallback: show all immediately
      revealEls.forEach(function (el) {
        el.classList.add('revealed');
      });
    }
  }

  /* ─── Init ──────────────────────────────────────────────────────────── */
  function init() {
    activateCurrentMonth();
    initCountdowns();
    animateBeat();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

