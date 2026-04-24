(function () {
  function track(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  // ── Scroll Depth ──────────────────────────────────────────────────────
  var scrollThresholds = [25, 50, 75, 90, 100];
  var firedThresholds = {};

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight <= 0) return;
    var percent = Math.round((scrollTop / docHeight) * 100);

    for (var i = 0; i < scrollThresholds.length; i++) {
      var threshold = scrollThresholds[i];
      if (percent >= threshold && !firedThresholds[threshold]) {
        firedThresholds[threshold] = true;
        track('scroll_depth', {
          percent_scrolled: threshold,
          page_path: window.location.pathname
        });
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Click Tracking ────────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href') || '';

    // Resume download
    if (href.indexOf('Rohan_Barad_Resume.pdf') !== -1) {
      track('resume_download', { page_path: window.location.pathname });
      return;
    }

    // Social links
    var socials = {
      'linkedin.com': 'linkedin',
      'github.com': 'github',
      'dribbble.com': 'dribbble',
      'open.spotify.com': 'spotify'
    };
    for (var domain in socials) {
      if (href.indexOf(domain) !== -1) {
        track('social_click', {
          platform: socials[domain],
          page_path: window.location.pathname
        });
        return;
      }
    }

    // Project slides (PDF "READ MORE" links)
    var slides = {
      'uber_slides.pdf': 'uber',
      'ncaa_slides.pdf': 'ncaa',
      'ubetcha_slides.pdf': 'ubetcha',
      'flow_slides.pdf': 'flow',
      'rushio_slides.pdf': 'rush',
      'shadow_slides.pdf': 'shadowboxing'
    };
    for (var file in slides) {
      if (href.indexOf(file) !== -1) {
        track('project_slides_open', {
          project: slides[file],
          page_path: window.location.pathname
        });
        return;
      }
    }

    // Project page clicks — card click from homepage vs related-project from case study
    var projects = {
      'uber.html': 'uber',
      'ncaa.html': 'ncaa',
      'ubetcha.html': 'ubetcha',
      'flow.html': 'flow',
      'rush.html': 'rush',
      'shadowboxing.html': 'shadowboxing',
      'why-whoop': 'why_whoop'
    };
    for (var page in projects) {
      if (href.indexOf(page) !== -1) {
        var onHomepage = document.body.classList.contains('index-page');
        track(onHomepage ? 'project_card_click' : 'related_project_click', {
          project: projects[page],
          page_path: window.location.pathname
        });
        return;
      }
    }
  });

  // ── Slide Navigation + Dark Mode (after DOM ready) ────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    // Case study slide nav buttons use onclick="plusDivs(±1)"
    document.querySelectorAll('[onclick*="plusDivs"]').forEach(function (el) {
      el.addEventListener('click', function () {
        var direction = (el.getAttribute('onclick') || '').indexOf('-1') !== -1 ? 'prev' : 'next';
        var project = window.location.pathname.split('/').pop().replace('.html', '') || 'unknown';
        track('slide_navigate', {
          direction: direction,
          project: project,
          page_path: window.location.pathname
        });
      });
    });

    // Dark mode toggle
    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        track('theme_toggle', {
          switched_to: current === 'dark' ? 'light' : 'dark',
          page_path: window.location.pathname
        });
      });
    }
  });
})();
