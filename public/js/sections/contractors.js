
import { el, heading, img } from '../utils.js';

/* ==========================================
   GLAD GENERAL TRADING
   CONTRACTORS & CLIENTS SECTION
========================================== */

// Display an individual contractor or client
function contractorCard(contractor) {
  return el(
    'article',
    { className: 'contractor-card' },

    // Company logo uploaded from Admin
    el(
      'div',
      { className: 'contractor-logo' },
      img(contractor)
    ),

    // Company information
    el(
      'div',
      { className: 'contractor-content' },

      // Company name
      el(
        'h3',
        { className: 'contractor-name' },
        contractor.title || 'Company Name'
      ),

      // Relationship or category
      contractor.subtitle
        ? el(
            'p',
            { className: 'contractor-category' },
            contractor.subtitle
          )
        : null,

      // Business relationship description
      el(
        'p',
        { className: 'contractor-description' },
        contractor.description || ''
      )
    )
  );
}

// Main Contractors section
export function contractors(xs) {
  const companies = xs || [];

  return el(
    'section',
    {
      id: 'contractors',
      className: 'contractors-section'
    },

    el(
      'div',
      { className: 'container' },

      // SECTION HEADING
      heading(
        '05 / Our Relationships',
        'Our Contractors & Business Partners'
      ),

      // SECTION INTRODUCTION
      el(
        'div',
        { className: 'contractors-introduction' },

        el(
          'h3',
          {},
          'Building Strong Partnerships. Delivering Lasting Value.'
        ),

        el(
          'p',
          {},
          'At Glad General Trading, we value the professional relationships we have established with contractors, clients, and business partners. Our commitment to reliability, quality, and efficient service delivery guides every engagement.'
        ),

        el(
          'p',
          {},
          'Our business relationships include GPOC, ERI-Kenya, and Red Sea. Through these engagements, we continue to strengthen our experience, expand our business network, and support the delivery of projects and commercial activities.'
        )
      ),

      // CONTRACTORS FROM BACKEND DATABASE
      companies.length
        ? el(
            'div',
            { className: 'contractors-grid' },

            ...companies.map(contractor =>
              contractorCard(contractor)
            )
          )
        : el(
            'p',
            { className: 'muted' },
            'Our contractor and client profiles will appear here.'
          )
    )
  );
}
