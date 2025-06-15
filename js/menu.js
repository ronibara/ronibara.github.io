document.addEventListener('DOMContentLoaded', function() {
  // Add hamburger button to nav if it doesn't exist
  const nav = document.querySelector('nav');
  if (!document.querySelector('.hamburger')) {
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    `;
    nav.insertBefore(hamburger, nav.querySelector('.links'));
  }

  // Add Home link to menu if we're not on the index page
  const links = document.querySelector('.links');
  const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
  if (!isIndexPage && !links.querySelector('li:first-child a[href="index.html"]')) {
    const homeLi = document.createElement('li');
    homeLi.innerHTML = '<a href="index.html">Home</a>';
    links.insertBefore(homeLi, links.firstChild);
  }

  // Menu functionality
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    links.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Close menu when clicking a link
  const menuLinks = document.querySelectorAll('.links a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      links.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });
}); 