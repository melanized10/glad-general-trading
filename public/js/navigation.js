
export function initNavigation() {
  const links = [...document.querySelectorAll(
    'header nav a[href^="#"]'
  )];

  const sections = links
    .map(link => {
      const id = link.getAttribute('href').slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  function updateActiveLink() {
    const position = window.scrollY + 150;
    let activeId = sections[0]?.id;

    for (const section of sections) {
      if (section.offsetTop <= position) {
        activeId = section.id;
      }
    }

    links.forEach(link => {
      const active =
        link.getAttribute('href') === `#${activeId}`;

      link.classList.toggle('active', active);

      if (active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, {
    passive: true
  });

  window.addEventListener('hashchange', updateActiveLink);

  updateActiveLink();
}
