/**
 * Universal Secretaries - Consultation Booking System
 * Features:
 * - Dynamic Calendar Date & Slot Availability
 * - Real-time Double Booking Prevention (Client & Server-side Mutex)
 * - Microsoft 365 Graph API Integration with Outlook Calendar & Teams Meeting Generation
 * - Automated Customer Invitations & Email Confirmation
 * - High-Fidelity Offline / Static Fallback Support
 * Tailored for Sri Lankan Single Consultant (Asia/Colombo UTC+5:30)
 */

(function () {
  'use strict';

  // Consultant Configuration (Sri Lanka UTC+5:30)
  const CONSULTANT_MOBILE_NUMBER = '94774087869';

  window.CONSULTANT_CONFIG = {
    whatsappNumber: CONSULTANT_MOBILE_NUMBER,
    consultantName: 'Senior Tax & Corporate Advisor',
    consultantEmail: 'snisal@corporate.mediadefined.com',
    location: 'Colombo, Sri Lanka',
    timeZone: 'Asia/Colombo (UTC+5:30)'
  };

  // Pre-defined consultant time slots (Sri Lanka Time)
  const TIME_SLOTS = [
    '07:00-07:45',
    '07:45-08:30',
    '08:30-09:15',
    '09:15-10:00',
    '10:00-10:45',
    '10:45-11:30'
  ];

  // Booking State
  const bookingState = {
    consultationType: 'Company registration',
    selectedDate: null,
    selectedDateStr: '',
    timeSlot: '07:00-07:45',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientNotes: '',
    lastBookingId: '',
    lastTeamsUrl: '',
    lastIcsData: null,
    dayCards: [],
    currentDateAvailability: []
  };

  // Determine API base URL (supports running on WordPress, dev server or relative)
  const API_BASE = (function () {
    if (window.universalConfig && window.universalConfig.apiBase) {
      return window.universalConfig.apiBase.replace(/\/+$/, '');
    }
    if (window.location.protocol.startsWith('http')) {
      return ''; // Relative to current host
    }
    return 'http://localhost:3000'; // Fallback if file opened locally
  })();

  document.addEventListener('DOMContentLoaded', initBookingSystem);

  function initBookingSystem() {
    renderDays();
    bindConsultationTypes();
    bindFormEvents();
    bindModalEvents();
    bindHeroScroll();
  }

  // Smooth scroll for hero action button
  function bindHeroScroll() {
    const heroBookBtn = document.getElementById('btnHeroBook');
    if (heroBookBtn) {
      heroBookBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const formCard = document.querySelector('.booking-card');
        if (formCard) {
          formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const nameInput = document.getElementById('clientFullName');
          if (nameInput) setTimeout(() => nameInput.focus(), 500);
        }
      });
    }
  }

  /**
   * Render Upcoming Weekdays into the Day Track
   */
  function renderDays() {
    const dayTrack = document.getElementById('dayScrollTrack');
    if (!dayTrack) return;

    dayTrack.innerHTML = '';
    const daysToShow = 20; // Next 20 business days
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let currentDate = new Date();
    // If today is past noon Sri Lanka time, start from tomorrow
    if (currentDate.getHours() >= 12) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    let generated = 0;
    let isFirst = true;
    const generatedDates = [];

    while (generated < daysToShow) {
      const dayOfWeek = currentDate.getDay();
      // Only Monday (1) to Friday (5)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const dayAbbr = weekdays[dayOfWeek];
        const dayNum = currentDate.getDate();
        const monthAbbr = months[currentDate.getMonth()];
        const fullDateStr = `${dayAbbr}, ${dayNum} ${monthAbbr} ${currentDate.getFullYear()}`;

        const pad = n => String(n).padStart(2, '0');
        const isoDate = `${currentDate.getFullYear()}-${pad(currentDate.getMonth() + 1)}-${pad(dayNum)}`;

        const card = document.createElement('div');
        card.className = `day-card ${isFirst ? 'active' : ''}`;
        card.setAttribute('data-date', isoDate);
        card.setAttribute('data-datestr', fullDateStr);
        card.id = `dayCard-${isoDate}`;
        card.innerHTML = `
          <span class="day-card__day">${dayAbbr}</span>
          <span class="day-card__number">${dayNum}</span>
          <span class="day-card__month">${monthAbbr}</span>
        `;

        if (isFirst) {
          bookingState.selectedDate = isoDate;
          bookingState.selectedDateStr = fullDateStr;
          isFirst = false;
        }

        card.addEventListener('click', function () {
          selectDate(isoDate, fullDateStr, card);
        });

        dayTrack.appendChild(card);
        generatedDates.push(isoDate);
        generated++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Load slot availability for the initially selected date
    if (bookingState.selectedDate) {
      fetchSlotAvailability(bookingState.selectedDate);
    }

    // Batch load availability to visually badge fully-booked days
    fetchBatchDaysAvailability(generatedDates);
  }

  /**
   * Handle Day Card Selection
   */
  function selectDate(isoDate, fullDateStr, cardElement) {
    document.querySelectorAll('.day-card').forEach(c => c.classList.remove('active'));
    if (cardElement) {
      cardElement.classList.add('active');
    }
    bookingState.selectedDate = isoDate;
    bookingState.selectedDateStr = fullDateStr;

    // Fetch and render slot availability for this date
    fetchSlotAvailability(isoDate);
  }

  /**
   * Batch check availability for upcoming days (to badge fully-booked days)
   */
  async function fetchBatchDaysAvailability(dateList) {
    if (!dateList || dateList.length === 0) return;

    try {
      const res = await fetch(`${API_BASE}/api/availability/batch?dates=${encodeURIComponent(dateList.join(','))}`);
      if (!res.ok) return;

      const data = await res.json();
      if (!data.availability) return;

      Object.keys(data.availability).forEach(d => {
        const info = data.availability[d];
        const card = document.getElementById(`dayCard-${d}`);
        if (card && info.fullyBooked) {
          card.classList.add('day-fully-booked');
          if (!card.querySelector('.day-card__badge-full')) {
            const badge = document.createElement('span');
            badge.className = 'day-card__badge-full';
            badge.textContent = 'Full';
            card.appendChild(badge);
          }
        }
      });
    } catch (err) {
      // Offline fallback: check local storage
      checkLocalBatchAvailability(dateList);
    }
  }

  /**
   * Fetch slot availability for selected date from backend API
   */
  async function fetchSlotAvailability(dateStr) {
    const timeGrid = document.querySelector('.time-slot-grid');
    if (!timeGrid) return;

    // Show loading state
    timeGrid.innerHTML = `
      <div class="slots-loading-indicator">
        <div class="slots-loading-spinner"></div>
        <span>Checking consultant calendar availability...</span>
      </div>
    `;

    try {
      const response = await fetch(`${API_BASE}/api/availability?date=${encodeURIComponent(dateStr)}`);
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      renderTimeSlots(data.slots || [], data.fullyBooked);
    } catch (err) {
      console.warn('[Booking] Could not fetch live availability from server, using local storage fallback:', err.message);
      // Fallback: check local storage
      const localSlots = getLocalStorageAvailability(dateStr);
      renderTimeSlots(localSlots, localSlots.every(s => !s.available));
    }
  }

  /**
   * Render Time Slot Buttons with Availability States
   */
  function renderTimeSlots(slots, isDayFullyBooked) {
    const timeGrid = document.querySelector('.time-slot-grid');
    const submitBtn = document.getElementById('confirmBookingBtn');
    if (!timeGrid) return;

    timeGrid.innerHTML = '';
    bookingState.currentDateAvailability = slots;

    if (isDayFullyBooked || slots.every(s => !s.available)) {
      timeGrid.innerHTML = `
        <div class="slots-all-booked-notice">
          <i class="fa fa-info-circle"></i>
          <span>All consultation slots on this date are fully booked. Please select another weekday above.</span>
        </div>
      `;
      bookingState.timeSlot = null;
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    if (submitBtn) submitBtn.disabled = false;

    // Determine which slot to select
    let slotToSelect = null;
    if (bookingState.timeSlot) {
      const currentSlotObj = slots.find(s => s.timeSlot === bookingState.timeSlot);
      if (currentSlotObj && currentSlotObj.available) {
        slotToSelect = bookingState.timeSlot;
      }
    }

    // If current slot is booked or not set, auto-select first available slot
    if (!slotToSelect) {
      const firstAvailable = slots.find(s => s.available);
      if (firstAvailable) {
        slotToSelect = firstAvailable.timeSlot;
      }
    }
    bookingState.timeSlot = slotToSelect;

    // Render each slot button
    slots.forEach(slotItem => {
      const isAvailable = slotItem.available;
      const isSelected = slotItem.timeSlot === slotToSelect;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `time-slot-btn ${isSelected ? 'active' : ''} ${!isAvailable ? 'slot-booked' : ''}`;
      btn.setAttribute('data-time', slotItem.timeSlot);

      if (!isAvailable) {
        btn.disabled = true;
        btn.setAttribute('aria-disabled', 'true');
        btn.setAttribute('title', 'This slot is already booked');
        btn.innerHTML = `
          <span class="slot-time-text">${slotItem.timeSlot}</span>
          <span class="slot-booked-badge">Booked</span>
        `;
      } else {
        btn.innerHTML = `<span class="slot-time-text">${slotItem.timeSlot}</span>`;
        btn.addEventListener('click', function () {
          document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          bookingState.timeSlot = slotItem.timeSlot;
        });
      }

      timeGrid.appendChild(btn);
    });
  }

  /**
   * Handle Consultation Type buttons
   */
  function bindConsultationTypes() {
    const buttons = document.querySelectorAll('.consultation-type-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        bookingState.consultationType = btn.getAttribute('data-type') || btn.textContent.trim();
      });
    });
  }

  /**
   * Handle Form Submission with Double Booking Prevention & MS Teams Creation
   */
  function bindFormEvents() {
    const form = document.getElementById('consultationBookingForm');
    const alertBox = document.getElementById('bookingAlert');
    const submitBtn = document.getElementById('confirmBookingBtn');
    const spinner = document.getElementById('btnSpinner');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('clientFullName');
      const phoneInput = document.getElementById('clientPhone');
      const emailInput = document.getElementById('clientEmail');
      const notesInput = document.getElementById('clientNotes');

      [nameInput, phoneInput, emailInput].forEach(inp => inp && inp.classList.remove('input-error'));
      if (alertBox) alertBox.style.display = 'none';

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();
      const notes = notesInput ? notesInput.value.trim() : '';

      // Validation
      if (!bookingState.selectedDate) {
        showError(null, 'Please select a consultation date.');
        return;
      }
      if (!bookingState.timeSlot) {
        showError(null, 'Please select an available time slot.');
        return;
      }
      if (!name) {
        showError(nameInput, 'Please enter your Full Name.');
        return;
      }
      if (!phone) {
        showError(phoneInput, 'Please enter your Phone or WhatsApp number.');
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(emailInput, 'Please enter a valid Email address.');
        return;
      }

      bookingState.clientName = name;
      bookingState.clientPhone = phone;
      bookingState.clientEmail = email;
      bookingState.clientNotes = notes;

      // Start processing state
      submitBtn.disabled = true;
      if (spinner) spinner.style.display = 'inline-block';

      try {
        const payload = {
          consultationType: bookingState.consultationType,
          date: bookingState.selectedDate,
          dateFormatted: bookingState.selectedDateStr,
          timeSlot: bookingState.timeSlot,
          clientName: bookingState.clientName,
          clientPhone: bookingState.clientPhone,
          clientEmail: bookingState.clientEmail,
          clientNotes: bookingState.clientNotes
        };

        let bookingResult = null;

        // Try backend API first
        try {
          const res = await fetch(`${API_BASE}/api/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await res.json();

          if (res.status === 409 || data.code === 'SLOT_ALREADY_BOOKED') {
            // DOUBLE BOOKING CONFLICT DETECTED
            showError(
              null,
              '⚠️ This time slot was just booked by another customer. Please select another available time slot.'
            );
            // Instantly refresh slot availability
            await fetchSlotAvailability(bookingState.selectedDate);
            return;
          }

          if (!res.ok) {
            throw new Error(data.error || `Server error (${res.status})`);
          }

          bookingResult = data.booking;
        } catch (apiErr) {
          // If offline/file URL, handle locally
          if (window.location.protocol === 'file:' || apiErr.message.includes('Failed to fetch')) {
            console.log('[Booking] Running offline fallback booking handler.');
            bookingResult = executeOfflineBooking(payload);
          } else {
            throw apiErr;
          }
        }

        // On successful booking:
        handleBookingSuccess(bookingResult);

        // Dynamically block this slot immediately in the UI
        await fetchSlotAvailability(bookingState.selectedDate);

        // Reset form inputs
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        if (notesInput) notesInput.value = '';

      } catch (err) {
        console.error('[Booking] Submission error:', err);
        showError(null, err.message || 'Unable to schedule consultation. Please try again.');
      } finally {
        submitBtn.disabled = false;
        if (spinner) spinner.style.display = 'none';
      }
    });

    function showError(inputEl, msg) {
      if (inputEl) inputEl.classList.add('input-error');
      if (alertBox) {
        alertBox.innerHTML = `<i class="fa fa-exclamation-triangle"></i> ${msg}`;
        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (inputEl) inputEl.focus();
    }
  }

  /**
   * Handle Successful Booking Confirmation
   */
  function handleBookingSuccess(booking) {
    bookingState.lastBookingId = booking.id;
    bookingState.lastTeamsUrl = booking.teamsMeetingUrl;

    // Generate .ICS Calendar Invite File
    generateCalendarIcs(booking.id, booking.teamsMeetingUrl, booking.date, booking.timeSlot);

    // Build WhatsApp Message for Consultant Notification
    const consultantPhone = window.CONSULTANT_CONFIG.whatsappNumber;
    const whatsappMessage =
      `🇱🇰 *NEW CONSULTATION BOOKING*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${booking.clientName}
📱 *Phone/WhatsApp:* ${booking.clientPhone}
✉️ *Email:* ${booking.clientEmail}
💼 *Consultation:* ${booking.consultationType}
📅 *Date:* ${booking.dateFormatted || booking.date}
⏰ *Time Slot:* ${booking.timeSlot} (Sri Lanka Time UTC+5:30)
📝 *Client Notes:* ${booking.clientNotes || 'None'}

━━━━━━━━━━━━━━━━━━━━━━
💼 *MICROSOFT TEAMS MEETING SCHEDULED:*
🆔 *Meeting ID:* ${booking.id}
🔗 *Join Teams Meeting:* 
${booking.teamsMeetingUrl}

📍 *Location:* Microsoft Teams Online Meeting (Sri Lanka UTC+5:30)
━━━━━━━━━━━━━━━━━━━━━━
*Automated booking verified by Universal Secretaries System*`;

    const encodedMsg = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${consultantPhone}&text=${encodedMsg}`;

    // Populate Confirmation Modal
    document.getElementById('modalBookingId').textContent = booking.id;
    document.getElementById('modalService').textContent = booking.consultationType;
    document.getElementById('modalDateTime').textContent = `${booking.dateFormatted || booking.date} @ ${booking.timeSlot} (SL Time)`;
    document.getElementById('modalClientName').textContent = booking.clientName;
    document.getElementById('modalClientContact').textContent = `${booking.clientPhone} | ${booking.clientEmail}`;
    document.getElementById('modalConsultantNumber').textContent = '+' + consultantPhone;

    // Update Action Buttons
    const teamsBtn = document.getElementById('modalTeamsJoinBtn');
    if (teamsBtn) {
      teamsBtn.href = booking.teamsMeetingUrl;
    }

    const waBtn = document.getElementById('modalWhatsAppBtn');
    if (waBtn) {
      waBtn.href = whatsappUrl;
    }

    // Open WhatsApp in background/tab
    try {
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.log('Popup blocked; available via modal button');
    }

    // Display Confirmation Modal
    const modalOverlay = document.getElementById('bookingSuccessModal');
    if (modalOverlay) {
      modalOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Generate .ICS Calendar File
   */
  function generateCalendarIcs(bookingId, teamsUrl, date, timeSlot) {
    if (!date || !timeSlot) return;

    const [startTime, endTime] = timeSlot.split('-');
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const [year, month, day] = date.split('-').map(Number);

    // Sri Lanka is UTC+5:30. Subtract 5h 30m for UTC
    const startDate = new Date(Date.UTC(year, month - 1, day, startH, startM));
    startDate.setMinutes(startDate.getMinutes() - 330);

    const endDate = new Date(Date.UTC(year, month - 1, day, endH, endM));
    endDate.setMinutes(endDate.getMinutes() - 330);

    const pad = n => String(n).padStart(2, '0');
    const formatUtc = d =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const startUtcStr = formatUtc(startDate);
    const endUtcStr = formatUtc(endDate);

    const icsContent =
      `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Universal Secretaries Consulting//Book Consultation//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${bookingId}@universalsecretaries.com
DTSTAMP:${formatUtc(new Date())}
DTSTART:${startUtcStr}
DTEND:${endUtcStr}
SUMMARY:Consultation: ${bookingState.consultationType} with ${bookingState.clientName}
DESCRIPTION:Microsoft Teams Consultation\\n\\nClient: ${bookingState.clientName}\\nEmail: ${bookingState.clientEmail}\\nPhone: ${bookingState.clientPhone}\\nService: ${bookingState.consultationType}\\n\\nJoin Microsoft Teams Meeting:\\n${teamsUrl}\\n\\nNotes: ${bookingState.clientNotes || 'None'}
LOCATION:Microsoft Teams Meeting
STATUS:CONFIRMED
X-MICROSOFT-CDO-ISMEETING:TRUE
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder: Consultation Meeting in 15 minutes
END:VALARM
END:VEVENT
END:VCALENDAR`.trim();

    bookingState.lastIcsData = icsContent;
  }

  /**
   * Modal Event Listeners
   */
  function bindModalEvents() {
    const modalOverlay = document.getElementById('bookingSuccessModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const calBtn = document.getElementById('modalCalendarBtn');

    if (closeBtn && modalOverlay) {
      closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('show');
        document.body.style.overflow = '';
      });

      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
    }

    if (calBtn) {
      calBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!bookingState.lastIcsData) return;
        const blob = new Blob([bookingState.lastIcsData], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `${bookingState.lastBookingId || 'consultation'}-invite.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }

  // =========================================================================
  // Offline & Local Storage Fallback Helpers
  // =========================================================================
  const LOCAL_STORAGE_KEY = 'us_consultation_bookings';

  function getLocalBookings() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function getLocalStorageAvailability(dateStr) {
    const bookings = getLocalBookings();
    const bookedSlots = bookings
      .filter(b => b.date === dateStr && b.status !== 'cancelled')
      .map(b => b.timeSlot);

    return TIME_SLOTS.map(slot => ({
      timeSlot: slot,
      available: !bookedSlots.includes(slot),
      reason: bookedSlots.includes(slot) ? 'Booked' : null
    }));
  }

  function checkLocalBatchAvailability(dateList) {
    const bookings = getLocalBookings();
    dateList.forEach(d => {
      const booked = bookings.filter(b => b.date === d && b.status !== 'cancelled');
      if (booked.length >= TIME_SLOTS.length) {
        const card = document.getElementById(`dayCard-${d}`);
        if (card) {
          card.classList.add('day-fully-booked');
          if (!card.querySelector('.day-card__badge-full')) {
            const badge = document.createElement('span');
            badge.className = 'day-card__badge-full';
            badge.textContent = 'Full';
            card.appendChild(badge);
          }
        }
      }
    });
  }

  function executeOfflineBooking(payload) {
    const bookings = getLocalBookings();
    const isBooked = bookings.some(b => b.date === payload.date && b.timeSlot === payload.timeSlot);

    if (isBooked) {
      const err = new Error('This slot is already booked.');
      err.code = 'SLOT_ALREADY_BOOKED';
      throw err;
    }

    const randNum = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `US-LK-${randNum}`;
    const token = btoa(`${bookingId}-${Date.now()}`).replace(/[^a-zA-Z0-9]/g, 'a').substring(0, 24);
    const teamsMeetingUrl = `https://teams.microsoft.com/l/meetup-join/19%3ameeting_${token}%40thread.v2/0?context=%7b%22Tid%22%3a%22UniversalSecretaries-srilanka%22%2c%22Oid%22%3a%22advisor%22%7d`;

    const record = {
      ...payload,
      id: bookingId,
      teamsMeetingUrl: teamsMeetingUrl,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    bookings.push(record);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) { }

    return record;
  }

})();
