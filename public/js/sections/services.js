
import { el, heading } from '../utils.js';

/* ==========================================
   GLAD GENERAL TRADING
   SERVICES SECTION
========================================== */

// Icons for each service
const serviceIcons = {
  'General Trading': '📦',
  'Construction': '🏗️',
  'General Supply': '🚚',
  'Clearance & Forwarding': '🚢'
};

// Render an individual service card
function serviceCard(service, index) {
  return el(
    'article',
    { className: 'service-card' },

    // Icon and service number
    el(
      'div',
      { className: 'service-card-top' },

      el(
        'span',
        { className: 'service-icon', 'aria-hidden': 'true' },
        serviceIcons[service.title] || '◆'
      ),

      el(
        'span',
        { className: 'service-number' },
        String(index + 1).padStart(2, '0')
      )
    ),

    // Service title
    el('h3', {}, service.title),

    // Service subtitle from Admin Dashboard
    service.subtitle
      ? el(
          'p',
          { className: 'service-subtitle' },
          service.subtitle
        )
      : null,

    // Service description from Admin Dashboard
    el(
      'p',
      { className: 'service-description' },
      service.description || ''
    ),

    // Contact button
    el(
      'a',
      {
        href: '#contact',
        className: 'service-link'
      },
      'Enquire About This Service →'
    )
  );
}

// Main Services section
export function services(items) {
  return el(
    'section',
    {
      id: 'services',
      className: 'services-section'
    },

    el(
      'div',
      { className: 'container' },

      heading(
        '02 / What We Do',
        'Our Core Services'
      ),

      // Introduction
      el(
        'div',
        { className: 'services-introduction' },

        el(
          'h3',
          {},
          'Comprehensive Business Solutions'
        ),

        el(
          'p',
          {},
          'Glad General Trading provides professional solutions across general trading, construction, general supply, and clearance and forwarding, tailored to the needs of businesses, institutions, and organizations.'
        )
      ),

      // Cards loaded from the backend
      el(
        'div',
        { className: 'services-grid' },
        ...items.map((service, index) =>
          serviceCard(service, index)
        )
      )
    )
  );
}
