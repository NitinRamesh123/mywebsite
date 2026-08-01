(function () {
  'use strict';

  // --- Unified quotes (from quotes-data.js) ---
  var quotes = window.quotesData || [];

  // Projects page grid
  var projects = window.projectsData || [];
  var projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    if (!projects.length) {
      projectsGrid.innerHTML =
        '<div class="empty-state">' +
          '<p>No projects up yet.</p>' +
          '<p class="empty-state-sub">Add entries to <code>projects-data.js</code> to get started.</p>' +
        '</div>';
    } else {
      projectsGrid.innerHTML = projects.map(function (p) {
        var tags = (p.tags || []).map(function (t) {
          return '<span class="pill">' + t + '</span>';
        }).join('');
        var link = p.link
          ? '<a href="' + p.link + '" class="btn-outline" style="margin-top: 1rem;" target="_blank" rel="noopener">View →</a>'
          : '';
        var date = p.date ? '<span class="cred-card-meta">' + p.date + '</span>' : '';
        return (
          '<div class="project-card">' +
            '<div class="cred-card-top">' +
              '<span class="cred-card-title">' + p.title + '</span>' +
              date +
            '</div>' +
            '<p class="cred-card-sub">' + (p.description || '') + '</p>' +
            (tags ? '<div class="pill-row" style="margin-top: 1rem;">' + tags + '</div>' : '') +
            link +
          '</div>'
        );
      }).join('');
    }
  }

  // Quotes page grid
  var quotesGrid = document.getElementById('quotesGrid');
  if (quotesGrid) {
    if (!quotes.length) {
      quotesGrid.innerHTML = '<p style="color: var(--text-secondary);">No quotes yet — add some to quotes-data.js.</p>';
    } else {
      quotesGrid.innerHTML = quotes.map(function (q) {
        var attribution = q.attribution
          ? '<p class="attribution">~ ' + q.attribution + '</p>'
          : '';
        return (
          '<div class="quote-card">' +
            '<div>' +
              '<span class="quote-tag">' + q.tag + '</span>' +
              '<blockquote>"' + q.text + '"</blockquote>' +
            '</div>' +
            attribution +
          '</div>'
        );
      }).join('');
    }
  }

  // --- Sidebar toggle (mobile) ---
  var toggle = document.getElementById('sidebarToggle');
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('sidebarScrim');

  function closeSidebar() {
    if (toggle) toggle.classList.remove('active');
    if (sidebar) sidebar.classList.remove('open');
    if (scrim) scrim.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function toggleSidebar() {
    if (!sidebar) return;
    var isOpen = sidebar.classList.toggle('open');
    if (toggle) toggle.classList.toggle('active', isOpen);
    if (scrim) scrim.classList.toggle('visible', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (toggle) {
    toggle.addEventListener('click', toggleSidebar);
    if (scrim) scrim.addEventListener('click', closeSidebar);
    document.querySelectorAll('.sidebar-nav a').forEach(function (link) {
      link.addEventListener('click', closeSidebar);
    });
  }

  // --- Back to top ---
  var backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      backBtn.classList.toggle('visible', window.scrollY > 400);
    });
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Scroll progress ---
  var progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // --- Reveal on scroll ---
  var revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }
})();
