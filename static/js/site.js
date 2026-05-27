// Mobile menu
function openMobileMenu(){ document.getElementById('mobile-overlay').style.display='block'; document.body.style.overflow='hidden'; }
function closeMobileMenu(){ document.getElementById('mobile-overlay').style.display='none'; document.body.style.overflow=''; }

// Scroll progress bar
window.addEventListener('scroll', function(){
  var h = document.documentElement.scrollHeight - window.innerHeight;
  var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
  document.getElementById('scroll-progress').style.width = pct + '%';
});

// Reveal on scroll (IntersectionObserver)
var observer = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting) {
      var delay = e.target.dataset.delay || 0;
      setTimeout(function(){ e.target.classList.add('visible'); }, delay);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .card').forEach(function(el){ observer.observe(el); });

// Typing effect (highlights <strong> inline during typing)
document.querySelectorAll('[data-typing]').forEach(function(el){
  var nodes = [];
  (function walk(parent){
    parent.childNodes.forEach(function(n){
      if (n.nodeType === 3) {
        for (var c = 0; c < n.textContent.length; c++)
          nodes.push({ ch: n.textContent[c], tag: null });
      } else if (n.nodeType === 1) {
        var tag = n.tagName.toLowerCase();
        if (tag === 'br') {
          nodes.push({ ch: null, tag: 'br' });
        } else if (tag === 'p') {
          if (nodes.length > 0) nodes.push({ ch: null, tag: 'br' });
          walk(n);
        } else {
          walk(n);
          var kids = n.textContent;
          // re-tag leaf text with the inline element
          var start = nodes.length - kids.length;
          for (var c = start; c < nodes.length; c++)
            nodes[c].tag = tag;
        }
      }
    });
  })(el);
  el.innerHTML = '';
  var cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  el.appendChild(cursor);
  var i = 0, currentTag = null, currentEl = null;
  function type(){
    if (i < nodes.length) {
      var n = nodes[i];
      if (n.tag === 'br') {
        el.insertBefore(document.createElement('br'), cursor);
        currentEl = null;
        currentTag = null;
      } else {
        if (n.tag && n.tag !== currentTag) {
          currentEl = document.createElement(n.tag);
          el.insertBefore(currentEl, cursor);
          currentTag = n.tag;
        } else if (!n.tag && currentTag) {
          currentEl = null;
          currentTag = null;
        }
        var txt = document.createTextNode(n.ch);
        if (currentEl) currentEl.appendChild(txt);
        else el.insertBefore(txt, cursor);
      }
      i++;
      setTimeout(type, 30 + Math.random() * 35);
    }
  }
  var tObs = new IntersectionObserver(function(entries){
    if (entries[0].isIntersecting) { type(); tObs.disconnect(); }
  }, { threshold: 0.5 });
  tObs.observe(el);
});

// Floating background words (all pages)
(function(){
  var words = ['C','Python','Linux','QEMU','KVM','ARM','RISC-V','Go','Xen','gem5','Simics','FreeBSD','QNX','Plan 9','Git','Emacs','Rust','Shell','Docker','x86'];
  var sizes = [2,3,4,5,6];
  var container = document.getElementById('bg-words');
  if (!container) return;
  var items = [];
  for (var i = 0; i < words.length; i++) {
    var el = document.createElement('div');
    el.className = 'bg-word';
    el.textContent = words[i];
    el.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)] + 'rem';
    var x = Math.random() * 90, y = Math.random() * 90;
    el.style.left = x + '%'; el.style.top = y + '%';
    container.appendChild(el);
    var speed = 0.2 + Math.random() * 0.5;
    var angle = Math.random() * 2 * Math.PI;
    items.push({ el:el, x:x, y:y, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed });
  }
  var last = 0;
  function tick(ts) {
    if (!last) { last = ts; requestAnimationFrame(tick); return; }
    var dt = (ts - last) / 1000; last = ts;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      it.x += it.vx * dt; it.y += it.vy * dt;
      if (it.x < -10) it.x = 100; if (it.x > 100) it.x = -10;
      if (it.y < -5) it.y = 100;  if (it.y > 100) it.y = -5;
      it.el.style.left = it.x + '%'; it.el.style.top = it.y + '%';
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
