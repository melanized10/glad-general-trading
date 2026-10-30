
import { el } from '../utils.js';

/* ==========================================
   GLAD GENERAL TRADING
   HERO / HOMEPAGE SECTION
========================================== */

export function hero(s) {
  return el(
    'section',
    {
      id: 'home',
      className: 'hero'
    },

    el(
      'div',
      { className: 'container hero-container' },

      // LEFT SIDE - COMPANY INTRODUCTION
      el(
        'div',
        { className: 'hero-content' },

        el(
          'span',
          { className: 'eyebrow hero-eyebrow' },
          'GLAD GENERAL TRADING • EST. 2013'
        ),

        // Main heading from Admin Dashboard
        el(
          'h1',
          { className: 'hero-title' },
          s.tagline
        ),

        // Description from Admin Dashboard
        el(
          'p',
          { className: 'hero-description' },
          s.heroText
        ),

        // Action buttons
        el(
          'div',
          { className: 'hero-actions' },

          el(
            'a',
            {
              href: '#services',
              className: 'btn hero-btn-primary'
            },
            'Explore Our Services'
          ),

          el(
            'a',
            {
              href: '#contact',
              className: 'btn hero-btn-secondary'
            },
            'Get in Touch'
          )
        )
      ),

      // RIGHT SIDE - COMPANY HIGHLIGHTS
      el(
        'div',
        { className: 'hero-highlights' },

        el(
          'h2',
          {},
          'Driven by Purpose. Built on Trust.'
        ),

        el(
          'p',
          {},
          'Delivering dependable business solutions and strengthening partnerships across South Sudan.'
        ),

        el(
          'div',
          { className: 'hero-stats' },

          el(
            'div',
            { className: 'hero-stat' },
            el('strong', {}, String(s.established || '2013')),
            el('span', {}, 'Established')
          ),

          el(
            'div',
            { className: 'hero-stat' },
            el('strong', {}, '4'),
            el('span', {}, 'Core Services')
          ),

          el(
            'div',
            { className: 'hero-stat' },
            el('strong', {}, '10'),
            el('span', {}, 'Team Members')
          )
        )
      )
    )
  );
}
