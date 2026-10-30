
import { el, heading, img } from '../utils.js';

// Display each project from the backend database
const projectCards = (projects) =>
  el(
    'div',
    { className: 'grid portfolio-grid' },

    projects.map((project) =>
      el(
        'article',
        { className: 'card portfolio-card' },

        // Project photograph
        img(project),

        // Project name
        el('h3', {}, project.title),

        // Project category
        project.subtitle
          ? el(
              'p',
              { className: 'portfolio-category' },
              project.subtitle
            )
          : null,

        // Project description
        el(
          'p',
          { className: 'portfolio-description' },
          project.description || ''
        )
      )
    )
  );

// Main Portfolio Section
export function portfolio(xs) {
  return el(
    'section',
    {
      id: 'portfolio',
      className: 'soft'
    },

    el(
      'div',
      { className: 'container' },

      // SECTION HEADING
      heading(
        '06 / Our Work',
        'Our Project Portfolio'
      ),

      // PORTFOLIO INTRODUCTION
      el(
        'div',
        { className: 'portfolio-introduction' },

        el(
          'h3',
          {},
          'Our Work. Our Experience. Our Commitment.'
        ),

        el(
          'p',
          {},
          'Explore a selection of projects and business activities undertaken by Glad General Trading across general trading, construction, general supply, and clearance and forwarding.'
        ),

        el(
          'p',
          {},
          'Our portfolio reflects our commitment to dependable service, professional execution, and lasting business relationships.'
        )
      ),

      // PROJECT GALLERY FROM ADMIN DASHBOARD
      xs.length
        ? projectCards(xs)
        : el(
            'p',
            { className: 'muted' },
            'Our project photographs and descriptions will be available soon.'
          )
    )
  );
}
