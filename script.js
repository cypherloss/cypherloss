(function () {
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');
  var menuButton = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var progressBar = document.getElementById('progressBar');
  var backToTop = document.getElementById('backToTop');
  var siteHeader = document.getElementById('siteHeader');

  function updateThemeIcon(isDark) {
    themeIcon.innerHTML = isDark
      ? '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'
      : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }

  function isDarkTheme() {
    return root.getAttribute('data-theme') === 'dark';
  }

  updateThemeIcon(isDarkTheme());

  themeToggle.addEventListener('click', function () {
    var nextTheme = isDarkTheme() ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    updateThemeIcon(nextTheme === 'dark');
  });

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  }

  menuButton.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
    siteHeader.classList.toggle('scrolled', scrollTop > 80);
    backToTop.classList.toggle('visible', scrollTop > 480);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 720) closeMenu();
  });
  onScroll();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
