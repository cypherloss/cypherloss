(function(){
  var btn = document.getElementById('themebtn');
  var root = document.documentElement;
  function apply(mode){
    if(mode === 'light'){ root.setAttribute('data-theme','light'); btn.textContent = 'Light'; }
    else { root.setAttribute('data-theme','dark'); btn.textContent = 'Dark'; }
  }
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch(e) {}
  apply(saved === 'light' ? 'light' : 'dark');
  btn.addEventListener('click', function(){
    var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var next = current === 'light' ? 'dark' : 'light';
    apply(next);
    try { localStorage.setItem('theme', next); } catch(e) {}
  });
  // close mobile nav after clicking a link
  document.querySelectorAll('.navlinks a').forEach(function(a){
    a.addEventListener('click', function(){
      var t = document.getElementById('navtoggle');
      if(t) t.checked = false;
    });
  });

  // reveal sections/cards as they scroll into view
  var targets = document.querySelectorAll("section:not(#top) > .wrap > *:not(.kicker), .card");
  if('IntersectionObserver' in window){
    targets.forEach(function(el){ el.classList.add('reveal'); });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function(el){ io.observe(el); });
  }
})();