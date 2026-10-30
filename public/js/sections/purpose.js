
import { el, heading } from '../utils.js';

/* ==========================================
   GLAD GENERAL TRADING
   VISION, MISSION, GOAL & AIMS
========================================== */

const purposeItems = [
  {
    title: 'Our Vision',
    key: 'vision',
    icon: '◉',
    number: '01'
  },
  {
    title: 'Our Mission',
    key: 'mission',
    icon: '◎',
    number: '02'
  },
  {
    title: 'Our Goal',
    key: 'goal',
    icon: '◆',
    number: '03'
  },
  {
    title: 'Our Aims',
    key: 'aims',
    icon: '✦',
    number: '04'
  }
];

function purposeCard(item, settings) {
  return el(
    'article',
    { className: 'purpose-card' },

    el(
      'div',
      { className: 'purpose-card-top' },

      el(
        'span',
        {
          className: 'purpose-icon',
          'aria-hidden': 'true'
        },
        item.icon
      ),

      el(
        'span',
        { className: 'purpose-number' },
        item.number
      )
    ),

    el('h3', {}, item.title),

    // Description from Admin Dashboard
    el(
      'p',
      { className: 'purpose-description' },
      settings[item.key] || ''
    )
  );
}

// Main section
export function purpose(s) {
  return el(
    'section',
    {
      id: 'purpose',
      className: 'purpose-section'
    },

    el(
      'div',
      { className: 'container' },

      heading(
        '03 / Our Direction',
        'What Drives Us'
      ),

      el(
        'div',
        { className: 'purpose-introduction' },

        el(
          'h3',
          {},
          'Our Vision, Mission, Goal & Aims'
        ),

        el(
          'p',
          {},
          'Our guiding principles reflect our commitment to quality, integrity, professionalism, and sustainable business growth.'
        )
      ),

      el(
        'div',
        { className: 'purpose-grid' },

        ...purposeItems.map(item =>
          purposeCard(item, s)
        )
      )
    )
  );
}
