/**
 * Universal Secretaries – Appointment Popup Modal
 * appointment-modal.js
 *
 * Opens the "Book Your Consultation" form (identical to the one on index.html)
 * in a beautiful overlay modal when the "Make an appointment" buttons are clicked.
 *
 * Depends on:
 *   - jQuery (already loaded in every page via assets/js/vendor/jquery-3.2.1.min.js)
 *   - booking-consultation.css  (form styling)
 *   - appointment-modal.css     (overlay / shell styling)
 *   - booking-consultation.js   (form logic — loaded after this file)
 *
 * Strategy:
 *   1. Inject the modal HTML once into <body>.
 *   2. Intercept every ".cr-btn" that links to appointment.html or is inside
 *      .header__top__button / .offcanvas__button and open the modal instead.
 *   3. The booking form inside the modal reuses the SAME IDs so that
 *      booking-consultation.js picks it up transparently when running on
 *      pages other than index.html (where the inline form doesn't exist).
 *   4. On index.html the inline form already exists — the modal form gets
 *      separate IDs with the "-modal" suffix and a second, isolated instance
 *      of the booking logic is initialised only for that cloned form.
 */

(function ($) {
  'use strict';

  /* -------------------------------------------------------------------------
   * 1. Modal HTML Template
   * ---------------------------------------------------------------------- */
  var MODAL_HTML = [
    '<div class="appt-modal-overlay" id="apptModalOverlay" role="dialog" aria-modal="true" aria-labelledby="apptModalTitle" tabindex="-1">',
    '  <div class="appt-modal-shell" id="apptModalShell">',

    '    <!-- Close button -->',
    '    <button type="button" class="appt-modal-close" id="apptModalClose" aria-label="Close consultation booking form">',
    '      <i class="fa fa-times"></i>',
    '    </button>',

    '    <!-- Pill header -->',
    '    <div class="appt-modal-header">',
    '      <div class="appt-modal-pill">',
    '        <span class="pill-dot"><i class="fa fa-calendar"></i></span>',
    '        <span class="pill-text">Book a free 45-minute consultation</span>',
    '      </div>',
    '    </div>',

    '    <!-- ===== Booking Card (exact copy from index.html) ===== -->',
    '    <div class="booking-card">',

    '      <h2 class="booking-card__title" id="apptModalTitle">Book your consultation</h2>',
    '      <p class="booking-card__subtitle">One client per 45-minute slot, by video or phone.</p>',

    '      <form id="consultationBookingForm-modal" novalidate>',

    '        <!-- Alert Banner -->',
    '        <div class="booking-alert" id="bookingAlert-modal"></div>',

    '        <!-- 1. CONSULTATION TYPE -->',
    '        <div class="booking-group">',
    '          <span class="booking-label">CONSULTATION</span>',
    '          <div class="consultation-types" id="consultationTypes-modal">',
    '            <button type="button" class="consultation-type-btn active" data-type="Company registration">Company registration</button>',
    '            <button type="button" class="consultation-type-btn" data-type="Tax consultation">Tax consultation</button>',
    '            <button type="button" class="consultation-type-btn" data-type="Bookkeeping">Bookkeeping</button>',
    '          </div>',
    '        </div>',

    '        <!-- 2. DAY SELECTOR -->',
    '        <div class="booking-group">',
    '          <span class="booking-label">DAY</span>',
    '          <div class="day-scroll-wrapper">',
    '            <div class="day-scroll-track" id="dayScrollTrack-modal"></div>',
    '          </div>',
    '        </div>',

    '        <!-- 3. TIME SLOTS -->',
    '        <div class="booking-group">',
    '          <span class="booking-label">TIME</span>',
    '          <div class="time-slot-grid" id="timeSlotGrid-modal">',
    '            <button type="button" class="time-slot-btn active" data-time="07:00-07:45">07:00-07:45</button>',
    '            <button type="button" class="time-slot-btn" data-time="07:45-08:30">07:45-08:30</button>',
    '            <button type="button" class="time-slot-btn" data-time="08:30-09:15">08:30-09:15</button>',
    '            <button type="button" class="time-slot-btn" data-time="09:15-10:00">09:15-10:00</button>',
    '            <button type="button" class="time-slot-btn" data-time="10:00-10:45">10:00-10:45</button>',
    '            <button type="button" class="time-slot-btn" data-time="10:45-11:30">10:45-11:30</button>',
    '          </div>',
    '          <div class="time-note">',
    '            <i class="fa fa-clock-o"></i>',
    '            <span>Sri Lanka time (UTC+5:30). Weekdays, 7:00 a.m. to 12:00 noon.</span>',
    '          </div>',
    '        </div>',

    '        <!-- 4. YOUR DETAILS -->',
    '        <div class="booking-group">',
    '          <span class="booking-label">YOUR DETAILS</span>',
    '          <div class="form-grid-2">',
    '            <div class="form-field">',
    '              <label class="field-label" for="clientFullName-modal">Full name</label>',
    '              <input type="text" id="clientFullName-modal" class="field-input" placeholder="" required>',
    '            </div>',
    '            <div class="form-field">',
    '              <label class="field-label" for="clientPhone-modal">Phone or WhatsApp</label>',
    '              <input type="tel" id="clientPhone-modal" class="field-input" placeholder="" required>',
    '            </div>',
    '          </div>',
    '          <div class="form-field full-width">',
    '            <label class="field-label" for="clientEmail-modal">Email</label>',
    '            <input type="email" id="clientEmail-modal" class="field-input" placeholder="" required>',
    '          </div>',
    '          <div class="form-field full-width">',
    '            <label class="field-label" for="clientNotes-modal">',
    '              Anything we should know? <span class="optional-tag">(optional)</span>',
    '            </label>',
    '            <textarea id="clientNotes-modal" class="field-textarea" rows="3" placeholder="For example: two directors, one foreign shareholder, planned company name"></textarea>',
    '          </div>',
    '        </div>',

    '        <!-- Submit -->',
    '        <button type="submit" class="confirm-booking-btn" id="confirmBookingBtn-modal">',
    '          <span>Confirm booking</span>',
    '          <div class="btn-spinner" id="btnSpinner-modal"></div>',
    '        </button>',

    '      </form>',
    '    </div>',
    '    <!-- ===== /Booking Card ===== -->',

    '  </div>',
    '</div>'
  ].join('\n');


  /* -------------------------------------------------------------------------
   * 2. Inject Modal HTML (appointment form + booking success modal)
   * ---------------------------------------------------------------------- */

  var SUCCESS_MODAL_HTML = [
    '<div class="booking-modal-overlay" id="bookingSuccessModal" role="dialog" aria-modal="true" aria-labelledby="modalSuccessTitle">',
    '  <div class="booking-modal">',
    '    <button type="button" class="booking-modal-close" id="closeModalBtn" aria-label="Close modal">',
    '      <i class="fa fa-times"></i>',
    '    </button>',
    '    <div class="modal-success-icon"><i class="fa fa-check"></i></div>',
    '    <h3 class="modal-title" id="modalSuccessTitle">Booking Confirmed!</h3>',
    '    <p class="modal-desc">Your consultation has been scheduled. Microsoft Teams meeting invitation, Outlook calendar schedule, and WhatsApp notification have been generated.</p>',
    '    <div class="modal-details-box">',
    '      <div class="modal-details-row"><span class="modal-details-label">Booking Reference:</span><span class="modal-details-val" id="modalBookingId">LK-TEAMS-XXXXX</span></div>',
    '      <div class="modal-details-row"><span class="modal-details-label">Consultation Type:</span><span class="modal-details-val" id="modalService">Company registration</span></div>',
    '      <div class="modal-details-row"><span class="modal-details-label">Scheduled Slot:</span><span class="modal-details-val" id="modalDateTime">-</span></div>',
    '      <div class="modal-details-row"><span class="modal-details-label">Client Name:</span><span class="modal-details-val" id="modalClientName">-</span></div>',
    '      <div class="modal-details-row"><span class="modal-details-label">Client Contact:</span><span class="modal-details-val" id="modalClientContact">-</span></div>',
    '      <div class="modal-details-row"><span class="modal-details-label">Meeting Platform:</span><span class="modal-details-val" id="modalPlatform">Microsoft Teams <span class="teams-platform-pill"><i class="fa fa-video-camera"></i> Video Meeting</span></span></div>',
    '      <div class="modal-details-row"><span class="modal-details-label">Consultant WhatsApp:</span><span class="modal-details-val text-success" id="modalConsultantNumber">+94 77 660 0799</span></div>',
    '    </div>',
    '    <div class="modal-actions">',
    '      <a href="#" id="modalTeamsJoinBtn" target="_blank" class="btn-teams-connect"><i class="fa fa-video-camera"></i><span>Connect &amp; Join Microsoft Teams Meeting</span></a>',
    '      <a href="#" id="modalWhatsAppBtn" target="_blank" class="btn-whatsapp-send"><i class="fa fa-whatsapp"></i><span>Send / Re-open WhatsApp to Consultant</span></a>',
    '      <button type="button" id="modalCalendarBtn" class="btn-calendar-ics"><i class="fa fa-calendar"></i><span>Download MS Teams Calendar Invite (.ics)</span></button>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  function injectModal() {
    // Inject the appointment booking overlay
    if ($('#apptModalOverlay').length === 0) {
      $('body').append(MODAL_HTML);
    }

    // Inject the booking success confirmation modal on pages that don't have it
    if ($('#bookingSuccessModal').length === 0) {
      $('body').append(SUCCESS_MODAL_HTML);

      // Wire up the native close events for the injected success modal
      $(document).on('click.successModal', '#closeModalBtn', function () {
        $('#bookingSuccessModal').removeClass('show');
        $('body').css('overflow', '');
      });
      $(document).on('click.successModal', '#bookingSuccessModal', function (e) {
        if ($(e.target).is('#bookingSuccessModal')) {
          $('#bookingSuccessModal').removeClass('show');
          $('body').css('overflow', '');
        }
      });
    }
  }


  /* -------------------------------------------------------------------------
   * 3. Open / Close helpers
   * ---------------------------------------------------------------------- */
  var $overlay, $shell, lastFocused;

  function openModal(preselectedType) {
    $overlay = $('#apptModalOverlay');
    $shell   = $('#apptModalShell');

    if (!$overlay.length) return;

    // Pre-select consultation type if provided (e.g. from data-pick attribute)
    if (preselectedType) {
      var $btns = $overlay.find('.consultation-type-btn');
      $btns.removeClass('active');
      var $match = $btns.filter('[data-type="' + preselectedType + '"]');
      if ($match.length) {
        $match.addClass('active');
        // Update modal booking state
        if (window.apptModalState) {
          window.apptModalState.consultationType = preselectedType;
        }
      }
    }

    // Refresh slot availability from live calendar
    if (mState && mState.selectedDate) {
      fetchModalSlots(mState.selectedDate);
    }

    // Lock scroll
    $('body').addClass('appt-modal-lock');

    // Animate in
    $overlay.addClass('appt-modal--open');

    // Move focus into modal
    lastFocused = document.activeElement;
    setTimeout(function () {
      var firstInput = $shell.find('input:visible, button:visible').first();
      if (firstInput.length) firstInput.focus();
    }, 360);
  }

  function closeModal() {
    $overlay = $('#apptModalOverlay');
    $overlay.removeClass('appt-modal--open');
    $('body').removeClass('appt-modal-lock');

    // Restore focus
    if (lastFocused && lastFocused.focus) {
      setTimeout(function () { lastFocused.focus(); }, 50);
    }
  }


  /* -------------------------------------------------------------------------
   * 4. Intercept "Make an appointment" buttons
   * ---------------------------------------------------------------------- */
  function bindTriggers() {
    // Catch header buttons, offcanvas buttons, and any link pointing to appointment
    $(document).on(
      'click.apptModal',
      '.header__top__button a, .header__top__button .cr-btn, .offcanvas__button a, .offcanvas__button .cr-btn, a.btn-open-appointment-modal, [data-open-modal="appointment"], a[href*="appointment"]:not([data-no-modal])',
      function (e) {
        e.preventDefault();

        // Close mobile offcanvas menu if currently open
        var offcanvasEl = document.getElementById('offcanvasMenu');
        if (offcanvasEl && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
          var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (bsOffcanvas) {
            bsOffcanvas.hide();
          }
        }

        var preselect = $(this).data('pick') || null;

        // Extract query param ?service=... if present
        if (!preselect) {
          var href = $(this).attr('href') || '';
          var serviceMatch = href.match(/[?&]service=([^&]+)/);
          if (serviceMatch) {
            preselect = decodeURIComponent(serviceMatch[1]);
          }
        }

        openModal(preselect);
      }
    );
  }


  /* -------------------------------------------------------------------------
   * 5. Close triggers
   * ---------------------------------------------------------------------- */
  function bindClose() {
    // Close button
    $(document).on('click.apptModal', '#apptModalClose', function () {
      closeModal();
    });

    // Click outside modal shell
    $(document).on('click.apptModal', '#apptModalOverlay', function (e) {
      if ($(e.target).is('#apptModalOverlay')) {
        closeModal();
      }
    });

    // Escape key
    $(document).on('keydown.apptModal', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        if ($('#apptModalOverlay').hasClass('appt-modal--open')) {
          closeModal();
        }
      }
    });

    // Focus trap inside modal
    $(document).on('keydown.apptModal', '#apptModalShell', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = $(this).find(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ).filter(':visible');
      if (!focusable.length) return;
      var first = focusable.first()[0];
      var last  = focusable.last()[0];
      if (e.shiftKey) {
        if (document.activeElement === first) { last.focus(); e.preventDefault(); }
      } else {
        if (document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });
  }


  /* -------------------------------------------------------------------------
   * 6. Initialise modal-specific booking logic
   *    (a self-contained twin of booking-consultation.js scoped to -modal IDs)
   * ---------------------------------------------------------------------- */
  var API_BASE = (function () {
    if (window.universalConfig && window.universalConfig.apiBase) {
      return window.universalConfig.apiBase.replace(/\/+$/, '');
    }
    if (window.location.protocol.startsWith('http')) return '';
    return 'http://localhost:3000';
  })();

  var TIME_SLOTS_MODAL = [
    '07:00-07:45','07:45-08:30','08:30-09:15',
    '09:15-10:00','10:00-10:45','10:45-11:30'
  ];

  // Expose state so openModal can update it
  window.apptModalState = {
    consultationType: 'Company registration',
    selectedDate: null,
    selectedDateStr: '',
    timeSlot: '07:00-07:45',
    lastBookingId: '',
    lastTeamsUrl: '',
    lastIcsData: null
  };

  var mState = window.apptModalState;

  function initModalBooking() {
    renderModalDays();
    bindModalConsultationTypes();
    bindModalFormEvents();
  }

  /* ---- Day picker ---- */
  function renderModalDays() {
    var $track = $('#dayScrollTrack-modal');
    if (!$track.length) return;
    $track.empty();

    var weekdays = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    var months   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var current  = new Date();
    if (current.getHours() >= 12) current.setDate(current.getDate() + 1);

    var generated = 0, isFirst = true;
    var generatedDates = [];

    while (generated < 20) {
      var dow = current.getDay();
      if (dow !== 0 && dow !== 6) {
        var dayAbbr   = weekdays[dow];
        var dayNum    = current.getDate();
        var monthAbbr = months[current.getMonth()];
        var fullStr   = dayAbbr + ', ' + dayNum + ' ' + monthAbbr + ' ' + current.getFullYear();
        var pad       = function (n) { return String(n).padStart(2, '0'); };
        var iso       = current.getFullYear() + '-' + pad(current.getMonth() + 1) + '-' + pad(dayNum);

        var $card = $('<div>')
          .addClass('day-card' + (isFirst ? ' active' : ''))
          .attr({'data-date': iso, 'data-datestr': fullStr, 'id': 'modalDayCard-' + iso})
          .html(
            '<span class="day-card__day">' + dayAbbr + '</span>' +
            '<span class="day-card__number">' + dayNum + '</span>' +
            '<span class="day-card__month">' + monthAbbr + '</span>'
          );

        if (isFirst) {
          mState.selectedDate    = iso;
          mState.selectedDateStr = fullStr;
          isFirst = false;
        }

        (function (isoDate, fullDateStr, cardEl) {
          cardEl.on('click', function () { selectModalDate(isoDate, fullDateStr, cardEl); });
        }(iso, fullStr, $card));

        $track.append($card);
        generatedDates.push(iso);
        generated++;
      }
      current.setDate(current.getDate() + 1);
    }

    if (mState.selectedDate) fetchModalSlots(mState.selectedDate);
  }

  function selectModalDate(iso, fullStr, $card) {
    $('.day-card', '#dayScrollTrack-modal').removeClass('active');
    $card.addClass('active');
    mState.selectedDate    = iso;
    mState.selectedDateStr = fullStr;
    fetchModalSlots(iso);
  }

  /* ---- Slot availability ---- */
  function fetchModalSlots(dateStr) {
    var $grid = $('#timeSlotGrid-modal');
    if (!$grid.length) return;
    $grid.html(
      '<div class="slots-loading-indicator">' +
        '<div class="slots-loading-spinner"></div>' +
        '<span>Checking consultant calendar availability...</span>' +
      '</div>'
    );

    $.ajax({
      url: API_BASE + '/availability?date=' + encodeURIComponent(dateStr),
      dataType: 'json',
      success: function (data) { renderModalSlots(data.slots || [], data.fullyBooked); },
      error: function () {
        var local = getModalLocalAvailability(dateStr);
        renderModalSlots(local, local.every(function (s) { return !s.available; }));
      }
    });
  }

  function renderModalSlots(slots, fullyBooked) {
    var $grid   = $('#timeSlotGrid-modal');
    var $submit = $('#confirmBookingBtn-modal');
    if (!$grid.length) return;
    $grid.empty();

    if (fullyBooked || slots.every(function (s) { return !s.available; })) {
      $grid.html(
        '<div class="slots-all-booked-notice">' +
          '<i class="fa fa-info-circle"></i>' +
          '<span>All consultation slots on this date are fully booked. Please select another weekday above.</span>' +
        '</div>'
      );
      mState.timeSlot = null;
      $submit.prop('disabled', true);
      return;
    }

    $submit.prop('disabled', false);

    var slotToSelect = null;
    if (mState.timeSlot) {
      var cur = slots.filter(function (s) { return s.timeSlot === mState.timeSlot && s.available; });
      if (cur.length) slotToSelect = mState.timeSlot;
    }
    if (!slotToSelect) {
      var first = slots.filter(function (s) { return s.available; });
      if (first.length) slotToSelect = first[0].timeSlot;
    }
    mState.timeSlot = slotToSelect;

    $.each(slots, function (_, item) {
      var isAvail    = item.available;
      var isSelected = item.timeSlot === slotToSelect;
      var $btn = $('<button type="button">')
        .addClass('time-slot-btn' + (isSelected ? ' active' : '') + (!isAvail ? ' slot-booked' : ''))
        .attr('data-time', item.timeSlot);

      if (!isAvail) {
        $btn.prop('disabled', true)
            .attr({'aria-disabled': 'true', 'title': 'This slot is already booked'})
            .html('<span class="slot-time-text">' + item.timeSlot + '</span><span class="slot-booked-badge">Booked</span>');
      } else {
        $btn.html('<span class="slot-time-text">' + item.timeSlot + '</span>');
        $btn.on('click', function () {
          $grid.find('.time-slot-btn').removeClass('active');
          $btn.addClass('active');
          mState.timeSlot = item.timeSlot;
        });
      }
      $grid.append($btn);
    });
  }

  /* ---- Consultation type buttons ---- */
  function bindModalConsultationTypes() {
    $(document).on('click', '#consultationTypes-modal .consultation-type-btn', function () {
      $('#consultationTypes-modal .consultation-type-btn').removeClass('active');
      $(this).addClass('active');
      mState.consultationType = $(this).data('type') || $(this).text().trim();
    });
  }

  /* ---- Form submission ---- */
  function bindModalFormEvents() {
    $(document).on('submit', '#consultationBookingForm-modal', function (e) {
      e.preventDefault();
      handleModalSubmit();
    });
  }

  function handleModalSubmit() {
    var $alert   = $('#bookingAlert-modal');
    var $submit  = $('#confirmBookingBtn-modal');
    var $spinner = $('#btnSpinner-modal');
    var $name    = $('#clientFullName-modal');
    var $phone   = $('#clientPhone-modal');
    var $email   = $('#clientEmail-modal');
    var $notes   = $('#clientNotes-modal');

    [$name, $phone, $email].forEach(function ($el) { $el.removeClass('input-error'); });
    $alert.hide();

    var name  = $name.val().trim();
    var phone = $phone.val().trim();
    var email = $email.val().trim();
    var notes = $notes.val().trim();

    function showErr($el, msg) {
      if ($el) $el.addClass('input-error');
      $alert.html('<i class="fa fa-exclamation-triangle"></i> ' + msg).show();
      $alert[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      if ($el) $el.focus();
    }

    if (!mState.selectedDate)  { showErr(null, 'Please select a consultation date.'); return; }
    if (!mState.timeSlot)      { showErr(null, 'Please select an available time slot.'); return; }
    if (!name)                 { showErr($name,  'Please enter your Full Name.'); return; }
    if (!phone)                { showErr($phone, 'Please enter your Phone or WhatsApp number.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showErr($email, 'Please enter a valid Email address.'); return;
    }

    $submit.prop('disabled', true);
    $spinner.show();

    var payload = {
      consultationType: mState.consultationType,
      date:             mState.selectedDate,
      dateFormatted:    mState.selectedDateStr,
      timeSlot:         mState.timeSlot,
      clientName:       name,
      clientPhone:      phone,
      clientEmail:      email,
      clientNotes:      notes
    };

    $.ajax({
      url:         API_BASE + '/bookings',
      method:      'POST',
      contentType: 'application/json',
      data:        JSON.stringify(payload),
      success: function (data, _, xhr) {
        if (xhr.status === 409 || (data && data.code === 'SLOT_ALREADY_BOOKED')) {
          showErr(null, '⚠️ This time slot was just booked by another customer. Please select another available time slot.');
          fetchModalSlots(mState.selectedDate);
          $submit.prop('disabled', false);
          $spinner.hide();
          return;
        }
        onModalBookingSuccess(data.booking, { name: name, phone: phone, email: email, notes: notes });
        fetchModalSlots(mState.selectedDate);
        $name.val(''); $phone.val(''); $email.val(''); $notes.val('');
        $submit.prop('disabled', false);
        $spinner.hide();
      },
      error: function (xhr) {
        var errJson = {};
        try { errJson = JSON.parse(xhr.responseText); } catch(e) {}
        if (xhr.status === 409 || (errJson && errJson.code === 'SLOT_ALREADY_BOOKED')) {
          showErr(null, '⚠️ This time slot was just booked by another customer. Please select another available time slot.');
          fetchModalSlots(mState.selectedDate);
        } else if (window.location.protocol === 'file:') {
          var result = executeModalOfflineBooking(payload);
          onModalBookingSuccess(result, { name: name, phone: phone, email: email, notes: notes });
          fetchModalSlots(mState.selectedDate);
          $name.val(''); $phone.val(''); $email.val(''); $notes.val('');
        } else {
          showErr(null, (errJson && errJson.error) || 'Unable to schedule consultation. Please try again.');
        }
        $submit.prop('disabled', false);
        $spinner.hide();
      }
    });
  }

  /* ---- Booking success (show existing modal from index.html if present, else alert) ---- */
  function onModalBookingSuccess(booking, client) {
    mState.lastBookingId = booking.id;
    mState.lastTeamsUrl  = booking.teamsMeetingUrl;

    // Generate ICS
    generateModalIcs(booking.id, booking.teamsMeetingUrl, booking.date, booking.timeSlot, client);

    // WhatsApp
    var consultantPhone  = (window.CONSULTANT_CONFIG && window.CONSULTANT_CONFIG.whatsappNumber) || '94774087869';
    var whatsappMsg =
      '🇱🇰 *NEW CONSULTATION BOOKING*\n' +
      '━━━━━━━━━━━━━━━━━━━━━━\n' +
      '👤 *Client Name:* ' + booking.clientName + '\n' +
      '📱 *Phone/WhatsApp:* ' + booking.clientPhone + '\n' +
      '✉️ *Email:* ' + booking.clientEmail + '\n' +
      '💼 *Consultation:* ' + booking.consultationType + '\n' +
      '📅 *Date:* ' + (booking.dateFormatted || booking.date) + '\n' +
      '⏰ *Time Slot:* ' + booking.timeSlot + ' (Sri Lanka Time UTC+5:30)\n' +
      '📝 *Notes:* ' + (booking.clientNotes || 'None') + '\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━\n' +
      '💼 *MICROSOFT TEAMS MEETING:*\n' +
      '🆔 Meeting ID: ' + booking.id + '\n' +
      '🔗 ' + booking.teamsMeetingUrl + '\n' +
      '━━━━━━━━━━━━━━━━━━━━━━\n' +
      '*Automated booking — Universal Secretaries*';

    var whatsappUrl = 'https://api.whatsapp.com/send?phone=' + consultantPhone + '&text=' + encodeURIComponent(whatsappMsg);

    // Close the appointment popup modal first
    closeModal();

    // Attempt to populate & show the booking success modal (exists on index.html)
    if ($('#bookingSuccessModal').length) {
      $('#modalBookingId').text(booking.id);
      $('#modalService').text(booking.consultationType);
      $('#modalDateTime').text((booking.dateFormatted || booking.date) + ' @ ' + booking.timeSlot + ' (SL Time)');
      $('#modalClientName').text(booking.clientName);
      $('#modalClientContact').text(booking.clientPhone + ' | ' + booking.clientEmail);
      $('#modalConsultantNumber').text('+' + consultantPhone);
      $('#modalTeamsJoinBtn').attr('href', booking.teamsMeetingUrl);
      $('#modalWhatsAppBtn').attr('href', whatsappUrl);
      $('#bookingSuccessModal').addClass('show');
      $('body').css('overflow', 'hidden');
    } else {
      // On pages that don't have the success modal, show a native alert fallback
      alert(
        '✅ Booking Confirmed!\n\n' +
        'Reference: ' + booking.id + '\n' +
        'Date/Time: ' + (booking.dateFormatted || booking.date) + ' @ ' + booking.timeSlot + '\n\n' +
        'A WhatsApp message will be sent to the consultant.'
      );
    }

    // Open WhatsApp in background
    try { window.open(whatsappUrl, '_blank'); } catch (err) { /* blocked */ }
  }

  /* ---- ICS generation ---- */
  function generateModalIcs(id, teamsUrl, date, timeSlot, client) {
    if (!date || !timeSlot) return;
    var parts     = timeSlot.split('-');
    var startParts = parts[0].split(':').map(Number);
    var endParts   = parts[1].split(':').map(Number);
    var dateParts  = date.split('-').map(Number);
    var pad = function (n) { return String(n).padStart(2, '0'); };

    var startDate = new Date(Date.UTC(dateParts[0], dateParts[1]-1, dateParts[2], startParts[0], startParts[1]));
    startDate.setMinutes(startDate.getMinutes() - 330);
    var endDate = new Date(Date.UTC(dateParts[0], dateParts[1]-1, dateParts[2], endParts[0], endParts[1]));
    endDate.setMinutes(endDate.getMinutes() - 330);

    var fmt = function (d) {
      return d.getUTCFullYear() + pad(d.getUTCMonth()+1) + pad(d.getUTCDate()) +
             'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + '00Z';
    };

    mState.lastIcsData =
      'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Universal Secretaries//EN\nCALSCALE:GREGORIAN\nMETHOD:REQUEST\n' +
      'BEGIN:VEVENT\nUID:' + id + '@universalsecretaries.com\nDTSTAMP:' + fmt(new Date()) + '\n' +
      'DTSTART:' + fmt(startDate) + '\nDTEND:' + fmt(endDate) + '\n' +
      'SUMMARY:Consultation: ' + mState.consultationType + ' with ' + client.name + '\n' +
      'DESCRIPTION:Microsoft Teams Consultation\\nClient: ' + client.name + '\\nJoin: ' + teamsUrl + '\n' +
      'LOCATION:Microsoft Teams Meeting\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR';
  }

  /* ---- Offline fallback ---- */
  var LS_KEY_MODAL = 'us_consultation_bookings';

  function getModalLocalBookings() {
    try { return JSON.parse(localStorage.getItem(LS_KEY_MODAL) || '[]'); } catch (e) { return []; }
  }

  function getModalLocalAvailability(dateStr) {
    var bookings   = getModalLocalBookings();
    var bookedSlots = bookings.filter(function (b) { return b.date === dateStr && b.status !== 'cancelled'; })
                              .map(function (b) { return b.timeSlot; });
    return TIME_SLOTS_MODAL.map(function (s) {
      return { timeSlot: s, available: bookedSlots.indexOf(s) === -1 };
    });
  }

  function executeModalOfflineBooking(payload) {
    var bookings = getModalLocalBookings();
    var conflict = bookings.some(function (b) { return b.date === payload.date && b.timeSlot === payload.timeSlot; });
    if (conflict) throw new Error('This slot is already booked.');

    var id    = 'US-LK-' + Math.floor(100000 + Math.random() * 900000);
    var token = btoa(id + '-' + Date.now()).replace(/[^a-zA-Z0-9]/g, 'a').substring(0, 24);
    var record = Object.assign({}, payload, {
      id:              id,
      teamsMeetingUrl: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_' + token + '%40thread.v2/0',
      status:          'confirmed',
      createdAt:       new Date().toISOString()
    });

    bookings.push(record);
    try { localStorage.setItem(LS_KEY_MODAL, JSON.stringify(bookings)); } catch (e) {}
    return record;
  }


  /* -------------------------------------------------------------------------
   * 7. Bootstrap on DOM ready
   * ---------------------------------------------------------------------- */
  $(function () {
    injectModal();
    bindTriggers();
    bindClose();

    // Wire the ICS download button from the success modal (for modal-triggered bookings)
    $(document).on('click', '#modalCalendarBtn', function (e) {
      e.preventDefault();
      if (!mState.lastIcsData) return;
      var blob = new Blob([mState.lastIcsData], { type: 'text/calendar;charset=utf-8' });
      var a    = document.createElement('a');
      a.href   = URL.createObjectURL(blob);
      a.download = (mState.lastBookingId || 'consultation') + '-invite.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

    // Initialise the modal booking system (day picker, slots, form handlers)
    // Runs once the overlay HTML is in the DOM
    initModalBooking();
  });

}(jQuery));
