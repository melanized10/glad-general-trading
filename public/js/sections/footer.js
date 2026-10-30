
import { el } from '../utils.js';

export function footer() {
  const year = new Date().getFullYear();

  return el(
    'footer',
    { className: 'site-footer' },

    el(
      'div',
      { className: 'container footer-content' },

      // Company name
      el(
        'h3',
        { className: 'footer-company' },
        'GLAD GENERAL TRADING'
      ),

      // Company slogan
      el(
        'p',
        { className: 'footer-slogan' },
        'Reliable Solutions. Trusted Partnerships.'
      ),

      // Divider
      el('hr', { className: 'footer-divider' }),

      // Company copyright
      el(
        'p',
        { className: 'copyright' },
        `© ${year} Glad General Trading. All Rights Reserved.`
      ),

      // Developer credit
      el(
        'p',
        { className: 'developer-credit' },
        'Designed & Developed by Elizabeth Akon Akol (belladonnanun)'
      ),

      // Developer title
      el(
        'p',
        { className: 'developer-title' },
        'Web Developer | IT Professional'
      )
    )
  );
}
