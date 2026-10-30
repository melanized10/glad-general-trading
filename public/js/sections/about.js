
import { el, heading } from '../utils.js';

export function about(s) {
  return el(
    'section',
    { id: 'about' },

    el(
      'div',
      { className: 'container' },

      // SECTION HEADING
      heading(
        '01 / About Us',
        'About Glad General Trading'
      ),

      // COMPANY PROFILE INTRODUCTION
      el(
        'div',
        { className: 'section-introduction' },

        el(
          'h3',
          {},
          'Your Trusted Partner in Trading, Construction, Supply & Logistics'
        ),

        el(
          'p',
          {},
          'Established in 2013, Glad General Trading is a South Sudanese multipurpose company specializing in general trading, construction, general supply, and clearance and forwarding services.'
        )
      ),

      // COMPANY DESCRIPTION FROM ADMIN DASHBOARD
      el(
        'div',
        { className: 'company-description' },

        el('h3', {}, 'Who We Are'),

        el('p', {}, s.about)
      ),

      // REGISTRATION DETAILS FROM DATABASE
      el(
        'div',
        { className: 'register' },

        el(
          'p',
          {},
          `Established: ${s.established}`
        ),

        el(
          'p',
          {},
          `Registration No.: ${s.registration}`
        ),

        el(
          'p',
          {},
          `Ministry of Petroleum Listing S/No.: ${s.petroleum} (company-provided)`
        )
      )
    )
  );
}
