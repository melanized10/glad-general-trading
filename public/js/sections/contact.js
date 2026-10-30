
import { el, heading } from '../utils.js';

export function contact(s) {
  const input = (type, name, placeholder, required = true) =>
    el('input', {
      type,
      name,
      placeholder,
      required
    });

  const form = el(
    'form',
    { className: 'contact-form' },

    el('h3', {}, 'Send Us an Enquiry'),

    el('label', {}, 'Full Name'),
    input('text', 'name', 'Enter your full name'),

    el('label', {}, 'Email Address'),
    input('email', 'email', 'Enter your email'),

    el('label', {}, 'Phone Number'),
    input('tel', 'phone', '+211...', false),

    el('label', {}, 'Service Required'),

    el(
      'select',
      { name: 'service', required: true },
      ...[
        'General Trading',
        'Construction',
        'General Supply',
        'Clearance & Forwarding',
        'Other'
      ].map(value =>
        el('option', { value }, value)
      )
    ),

    el('label', {}, 'Your Message'),

    el('textarea', {
      name: 'message',
      rows: 5,
      required: true,
      placeholder: 'Tell us how we can assist you...'
    }),

    el(
      'button',
      { type: 'submit', className: 'btn' },
      'Send Enquiry'
    ),

    el('p', {
      className: 'form-status',
      role: 'status',
      'aria-live': 'polite'
    })
  );

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const button = form.querySelector('button');
    const status = form.querySelector('.form-status');
    const data = Object.fromEntries(new FormData(form));

    button.disabled = true;
    status.textContent = 'Sending your enquiry...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send enquiry');
      }

      status.textContent = 'Your enquiry has been sent successfully!';
      form.reset();

    } catch (error) {
      status.textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });

  return el(
    'section',
    { id: 'contact', className: 'contact' },

    el(
      'div',
      { className: 'container' },

      heading('07 / Contact', 'Get in Touch'),

      el(
        'p',
        { className: 'contact-intro' },
        'Have a project or business requirement? Contact Glad General Trading and let us help you find the right solution.'
      ),

      el(
        'div',
        { className: 'contact-layout' },

        el(
          'div',
          { className: 'contact-details' },

          el('h3', {}, 'Contact Information'),

          el('p', {}, s.address),

          el('p', {},
            el('a', { href: `tel:${s.phone1}` }, s.phone1),
            ' / ',
            el('a', { href: `tel:${s.phone2}` }, s.phone2)
          ),

          el('p', {},
            el('a', { href: `mailto:${s.email}` }, s.email)
          )
        ),

        form
      )
    )
  );
}
