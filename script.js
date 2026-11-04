(function () {
    var toggle = document.getElementById('themeToggle');
    var root = document.documentElement;
    var stored = null;
    try { stored = null; } catch (e) {}
    function setIcon(mode) {
      var icon = document.getElementById('themeIcon');
      if (mode === 'dark') {
        icon.innerHTML = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>';
      } else {
        icon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
      }
    }
    var current = root.getAttribute('data-theme');
    setIcon(current === 'dark' ? 'dark' : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

    toggle.addEventListener('click', function () {
      var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var activeIsDark = root.getAttribute('data-theme') === 'dark' || (!root.getAttribute('data-theme') && isDark);
      var next = activeIsDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      setIcon(next);
    });

    var menuBtn = document.getElementById('menuBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
    });

    var progressBar = document.getElementById('progressBar');
    var backToTop = document.getElementById('backToTop');
    function onScroll() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
      if (scrollTop > 480) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();