(function () {
  'use strict';

  // --- Sidebar toggle (mobile) ---
  var toggle = document.getElementById('sidebarToggle');
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('sidebarScrim');

  function closeSidebar() {
    toggle.classList.remove('active');
    sidebar.classList.remove('open');
    scrim.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function toggleSidebar() {
    var isOpen = sidebar.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    scrim.classList.toggle('visible', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (toggle) {
    toggle.addEventListener('click', toggleSidebar);
    scrim.addEventListener('click', closeSidebar);
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

  // --- Smooth scroll for in-page anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

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

  // --- Active sidebar link on scroll (index page sections) ---
  var sections = document.querySelectorAll('main[data-track-sections] section[id]');
  var navLinks = document.querySelectorAll('.sidebar-nav a[data-section]');
  if (sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.toggle(
                'active',
                link.getAttribute('data-section') === entry.target.id
              );
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }
})();
