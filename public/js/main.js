
/* =========================================
   GLAD GENERAL TRADING - MAIN JAVASCRIPT
========================================= */

// 1. IMPORT WEBSITE SECTIONS
import { hero } from './sections/hero.js';
import { about } from './sections/about.js';
import { services } from './sections/services.js';
import { purpose } from './sections/purpose.js';
import { team } from './sections/team.js';
import { contractors } from './sections/contractors.js';
import { portfolio } from './sections/portfolio.js';
import { contact } from './sections/contact.js';

// 2. IMPORT NAVIGATION
import { initNavigation } from './navigation.js';

// 3. IMPORT FOOTER
import { footer } from './sections/footer.js';

/* =========================================
   4. LOAD WEBSITE CONTENT
========================================= */

async function main() {

  const response = await fetch('/api/site');

  if (!response.ok) {
    throw new Error('Could not load site');
  }

  // Get data from the backend
  const { settings: s, items: i } = await response.json();

  /* =====================================
     5. RENDER WEBSITE SECTIONS
  ===================================== */

  document.querySelector('#main').replaceChildren(
    hero(s),
    about(s),
    services(i.services),
    purpose(s),
    team(i),
    contractors(i.contractors),
    portfolio(i.portfolio),
    contact(s)
  );

  /* =====================================
     6. ACTIVATE STICKY NAVIGATION
  ===================================== */

  initNavigation();

  /* =====================================
     7. RENDER FOOTER
  ===================================== */

  const existingFooter = document.querySelector('footer');

  if (existingFooter) {
    existingFooter.replaceWith(footer());
  } else {
    document.querySelector('#main').after(footer());
  }

}

/* =========================================
   8. HANDLE WEBSITE ERRORS
========================================= */

main().catch((error) => {

  document.querySelector('#main').textContent =
    'Could not load website. Start the Node.js server using npm start.';

  console.error(error);

});
