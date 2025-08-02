//
// Main JavaScript for The People's Brief
//
// Handles interactive behaviours such as mobile navigation toggle. This script
// is kept intentionally lightweight to maintain fast page loads on
// low‑bandwidth connections. Feel free to extend with additional
// functionality (e.g., search or dynamic content loading) as your site
// evolves.

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  // Toggle the mobile navigation menu when the hamburger icon is clicked
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navList.classList.toggle('nav-open');
  });

  // Close the mobile menu when clicking outside of it
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = navList.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInsideMenu) {
      navList.classList.remove('nav-open');
    }
  });

  // Optional: highlight active nav link based on scroll position
  // This section observes sections and highlights the corresponding nav link when
  // scrolling through the page. It uses the IntersectionObserver API which is
  // supported in modern browsers. If unsupported, the observer simply does
  // nothing.
  const sectionIds = ['latest-news', 'opinions', 'business'];
  const navLinks = document.querySelectorAll('.nav-link');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(entry.target.id));
          });
        }
      });
    }, observerOptions);
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        sectionObserver.observe(section);
      }
    });
  }
});