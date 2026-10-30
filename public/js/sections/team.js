
import { el, heading, img } from '../utils.js';

/* ==========================================
   GLAD GENERAL TRADING
   LEADERSHIP & TEAM SECTION
========================================== */

// Create an individual profile card
function personCard(person, isFounder = false) {
  return el(
    'article',
    {
      className: isFounder
        ? 'team-card founder-card'
        : 'team-card staff-card'
    },

    // Photograph uploaded through Admin
    el(
      'div',
      { className: 'team-photo' },
      img(person)
    ),

    // Profile details
    el(
      'div',
      { className: 'team-card-content' },

      el(
        'h3',
        { className: 'team-name' },
        person.title || 'Name Coming Soon'
      ),

      el(
        'p',
        { className: 'team-position' },
        person.subtitle || 'Position Coming Soon'
      ),

      person.description
        ? el(
            'p',
            { className: 'team-bio' },
            person.description
          )
        : null
    )
  );
}

// Main Team section
export function team(data) {
  const founders = data.founders || [];
  const staff = data.staff || [];

  return el(
    'section',
    {
      id: 'team',
      className: 'team-section'
    },

    el(
      'div',
      { className: 'container' },

      // MAIN HEADING
      heading(
        '04 / Our People',
        'Meet Our Team'
      ),

      // TEAM INTRODUCTION
      el(
        'div',
        { className: 'team-introduction' },

        el(
          'h3',
          {},
          'The People Behind Our Success'
        ),

        el(
          'p',
          {},
          'At Glad General Trading, our strength lies in our dedicated team of professionals working together to deliver reliable business solutions.'
        ),

        el(
          'p',
          {},
          'Led by our two co-founders, our team brings together expertise in logistics, information technology, sales and marketing, administration, procurement, and finance.'
        ),

        el(
          'p',
          {},
          'Through teamwork, professionalism, and a shared commitment to excellence, we strive to provide dependable services that meet our clients’ needs and contribute to the continued growth of our company.'
        )
      ),

      // CO-FOUNDERS
      el(
        'div',
        { className: 'team-group' },

        el(
          'h3',
          { className: 'team-group-title' },
          'Our Co-Founders'
        ),

        el(
          'p',
          { className: 'team-group-description' },
          'The leadership guiding our company’s vision, strategic direction, and long-term growth.'
        ),

        el(
          'div',
          { className: 'founders-grid' },
          ...founders.map(person =>
            personCard(person, true)
          )
        )
      ),

      // PROFESSIONAL STAFF
      el(
        'div',
        { className: 'team-group' },

        el(
          'h3',
          { className: 'team-group-title' },
          'Our Professional Team'
        ),

        el(
          'p',
          { className: 'team-group-description' },
          'Dedicated professionals working together across logistics, technology, marketing, administration, procurement, and finance.'
        ),

        el(
          'div',
          { className: 'staff-grid' },
          ...staff.map(person =>
            personCard(person)
          )
        )
      )
    )
  );
}
