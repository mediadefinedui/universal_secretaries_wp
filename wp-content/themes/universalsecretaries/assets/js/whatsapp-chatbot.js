/**
 * Whole Site WhatsApp Chatbot Bubble Widget
 * Connected to Sri Lankan Single Consultant (+94774087869)
 */

(function () {
  'use strict';

  // =========================================================================
  // SRI LANKAN CONSULTANT WHATSAPP NUMBER
  // =========================================================================
  const CONSULTANT_WHATSAPP_NUMBER = '94774087869';
  const CONSULTANT_DISPLAY_NAME = 'Sri Lankan Consultant';
  const CONSULTANT_STATUS = 'Online • Typically replies instantly';

  // Inject stylesheet if not already present
  function ensureStylesheet() {
    if (!document.getElementById('whatsapp-chatbot-style') && !document.getElementById('universal-whatsapp-css-css')) {
      const link = document.createElement('link');
      link.id = 'whatsapp-chatbot-style';
      link.rel = 'stylesheet';
      link.href = (window.universalConfig && window.universalConfig.themeUri) 
        ? window.universalConfig.themeUri + '/assets/css/whatsapp-chatbot.css' 
        : 'assets/css/whatsapp-chatbot.css';
      document.head.appendChild(link);
    }
  }

  // Get current Sri Lanka time string
  function getSriLankaTimeString() {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Colombo',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(new Date());
    } catch (e) {
      const d = new Date();
      return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  }

  // Build and inject HTML
  function renderChatbot() {
    if (document.getElementById('waChatbotWrapper')) return;

    const timeStr = getSriLankaTimeString();

    const wrapper = document.createElement('div');
    wrapper.id = 'waChatbotWrapper';
    wrapper.className = 'wa-chatbot-wrapper';

    wrapper.innerHTML = `
      <!-- Teaser Callout Tooltip -->
      <div class="wa-tooltip-bubble" id="waTooltipBubble">
        <span class="wa-tooltip-text">👋 Need help? Chat directly with our Sri Lankan consultant!</span>
        <button type="button" class="wa-tooltip-close" id="waTooltipClose" aria-label="Dismiss">&times;</button>
      </div>

      <!-- Floating Circle Button -->
      <button type="button" class="wa-chatbot-btn" id="waChatbotBtn" aria-label="Open WhatsApp Chat">
        <i class="fa fa-whatsapp"></i>
        <span class="wa-close-icon">&times;</span>
        <span class="wa-badge">1</span>
      </button>

      <!-- Chat Window Popup -->
      <div class="wa-chat-window" id="waChatWindow">
        <!-- Header -->
        <div class="wa-chat-header">
          <div class="wa-header-profile">
            <div class="wa-avatar-box">
              <span>🇱🇰</span>
              <span class="wa-online-dot"></span>
            </div>
            <div class="wa-header-info">
              <span class="wa-header-name">${CONSULTANT_DISPLAY_NAME}</span>
              <span class="wa-header-status">
                <i class="fa fa-circle" style="font-size: 7px; color: #25D366;"></i>
                ${CONSULTANT_STATUS}
              </span>
            </div>
          </div>
          <button type="button" class="wa-close-btn" id="waWindowCloseBtn" aria-label="Close Chat">
            <i class="fa fa-times"></i>
          </button>
        </div>

        <!-- Chat Body -->
        <div class="wa-chat-body" id="waChatBody">
          <div class="wa-message">
            <strong>Hello! 👋</strong> Welcome to Universal Secretaries Tax &amp; Corporate Advisory.
            <div class="wa-message-time">${timeStr} <i class="fa fa-check text-primary"></i></div>
          </div>

          <div class="wa-message">
            I am your dedicated <strong>Sri Lankan Consultant</strong>. How can I assist you with your business registration or tax filing today?
            <div class="wa-message-time">${timeStr} <i class="fa fa-check text-primary"></i></div>
          </div>

          <!-- Quick Option Chips -->
          <div class="wa-quick-chips">
            <button type="button" class="wa-chip-btn" data-msg="Hi, I would like to inquire about Company Registration in Sri Lanka.">
              🏢 Company registration in Sri Lanka
            </button>
            <button type="button" class="wa-chip-btn" data-msg="Hi, I would like to consult about Tax Calculation and Tax Filing in Sri Lanka.">
              📊 Tax consultation &amp; filing
            </button>
            <button type="button" class="wa-chip-btn" data-msg="Hi, I would like to schedule a Microsoft Teams consultation meeting.">
              📅 Book MS Teams video meeting
            </button>
          </div>
        </div>

        <!-- Chat Footer -->
        <div class="wa-chat-footer">
          <div class="wa-input-row">
            <input type="text" class="wa-chat-input" id="waChatInput" placeholder="Type a message to consultant..." />
            <button type="button" class="wa-send-btn" id="waSendBtn" aria-label="Send WhatsApp message">
              <i class="fa fa-paper-plane"></i>
            </button>
          </div>
          <a href="#" class="wa-direct-btn" id="waDirectBtn" target="_blank">
            <i class="fa fa-whatsapp"></i> Chat on WhatsApp (+94 77 40 87 869)
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);
    bindChatEvents();
  }

  // Bind interactive events
  function bindChatEvents() {
    const chatBtn = document.getElementById('waChatbotBtn');
    const chatWindow = document.getElementById('waChatWindow');
    const closeBtn = document.getElementById('waWindowCloseBtn');
    const tooltip = document.getElementById('waTooltipBubble');
    const tooltipClose = document.getElementById('waTooltipClose');
    const chatInput = document.getElementById('waChatInput');
    const sendBtn = document.getElementById('waSendBtn');
    const directBtn = document.getElementById('waDirectBtn');
    const chips = document.querySelectorAll('.wa-chip-btn');

    let isOpen = false;

    function openChat() {
      isOpen = true;
      chatWindow.classList.add('show');
      chatBtn.classList.add('active');
      if (tooltip) tooltip.style.display = 'none';
      const badge = chatBtn.querySelector('.wa-badge');
      if (badge) badge.style.display = 'none';
      if (chatInput) chatInput.focus();
    }

    function closeChat() {
      isOpen = false;
      chatWindow.classList.remove('show');
      chatBtn.classList.remove('active');
    }

    // Toggle button
    if (chatBtn) {
      chatBtn.addEventListener('click', function () {
        if (isOpen) {
          closeChat();
        } else {
          openChat();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeChat);
    }

    // Tooltip dismiss
    if (tooltipClose) {
      tooltipClose.addEventListener('click', function (e) {
        e.stopPropagation();
        if (tooltip) tooltip.style.display = 'none';
      });
    }

    if (tooltip) {
      tooltip.addEventListener('click', openChat);
    }

    // Direct WhatsApp send function
    function sendWhatsAppMessage(text) {
      const msg = text && text.trim() ? text.trim() : 'Hello, I would like to consult with you regarding your services.';
      const url = `https://api.whatsapp.com/send?phone=${CONSULTANT_WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      closeChat();
    }

    // Quick chips
    chips.forEach(chip => {
      chip.addEventListener('click', function () {
        const msg = chip.getAttribute('data-msg') || chip.textContent.trim();
        sendWhatsAppMessage(msg);
      });
    });

    // Send on button click
    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        if (chatInput) {
          sendWhatsAppMessage(chatInput.value);
          chatInput.value = '';
        }
      });
    }

    // Send on Enter key
    if (chatInput) {
      chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendWhatsAppMessage(chatInput.value);
          chatInput.value = '';
        }
      });
    }

    // Direct button
    if (directBtn) {
      directBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const msg = chatInput && chatInput.value.trim() ? chatInput.value.trim() : 'Hello, I would like to consult with you.';
        sendWhatsAppMessage(msg);
      });
    }

    // Show tooltip after 2.5 seconds if chat is not open
    setTimeout(() => {
      if (!isOpen && tooltip) {
        tooltip.style.display = 'flex';
      }
    }, 2500);
  }

  // Initialization
  function init() {
    ensureStylesheet();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderChatbot);
    } else {
      renderChatbot();
    }
  }

  init();

})();
