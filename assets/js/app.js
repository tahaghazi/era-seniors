/* ==========================================================================
   ERA SENIORS — landing page interactions
   Vanilla JS, no dependencies. Every module guards for missing nodes so the
   page degrades gracefully if a section is removed.
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ------------------------------------------------------------------------
     1. Preloader — counts real image decodes, then lifts the curtain
     ------------------------------------------------------------------------ */
  function preloader() {
    var el = $('#preloader');
    if (!el) return Promise.resolve();

    var bar = $('#loader-bar span');
    var pct = $('#loader-pct');
    var imgs = $$('img');
    var total = Math.max(imgs.length, 1);
    var done = 0;
    var shown = 0;

    function tick() {
      done++;
      var target = Math.round((done / total) * 100);
      // ease the displayed number so it never snaps
      var step = function () {
        if (shown < target) {
          shown += 1;
          if (bar) bar.style.width = shown + '%';
          if (pct) pct.textContent = String(shown).padStart(3, '0');
          requestAnimationFrame(step);
        }
      };
      step();
    }

    imgs.forEach(function (img) {
      if (img.complete) { tick(); return; }
      img.addEventListener('load', tick, { once: true });
      img.addEventListener('error', tick, { once: true });
    });

    return new Promise(function (resolve) {
      var finish = function () {
        if (bar) bar.style.width = '100%';
        if (pct) pct.textContent = '100';
        setTimeout(function () {
          el.classList.add('done');
          document.body.classList.remove('is-locked');
          resolve();
        }, 350);
      };
      // Resolve on window load, but never hang longer than 3.5s
      if (document.readyState === 'complete') setTimeout(finish, 400);
      else window.addEventListener('load', function () { setTimeout(finish, 400); });
      setTimeout(finish, 3500);
    });
  }

  /* ------------------------------------------------------------------------
     2. Custom cursor with contextual states
     ------------------------------------------------------------------------ */
  function cursor() {
    if (!finePointer || reduced) return;
    var dot = $('#cursor-dot');
    var ring = $('#cursor-ring');
    var text = $('#cursor-text');
    if (!dot || !ring) return;

    document.body.classList.add('custom-cursor');

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
    }, { passive: true });

    (function loop() {
      // ring trails the dot with easing
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      var r = ring.offsetWidth / 2;
      ring.style.transform = 'translate(' + (rx - r) + 'px,' + (ry - r) + 'px)';
      requestAnimationFrame(loop);
    })();

    $$('a, button, .swatch, [data-cursor]').forEach(function (node) {
      var label = node.getAttribute('data-cursor');
      node.addEventListener('mouseenter', function () {
        if (label) { ring.classList.add('label'); if (text) text.textContent = label; }
        else ring.classList.add('grow');
      });
      node.addEventListener('mouseleave', function () {
        ring.classList.remove('label', 'grow');
        if (text) text.textContent = '';
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Scroll reveal + staggered groups
     ------------------------------------------------------------------------ */
  function reveal() {
    var nodes = $$('[data-reveal]');
    if (!nodes.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('in'); });
      return;
    }

    // Auto-stagger siblings that share a [data-stagger] parent
    $$('[data-stagger]').forEach(function (group) {
      var gap = parseInt(group.getAttribute('data-stagger'), 10) || 90;
      $$('[data-reveal]', group).forEach(function (child, i) {
        if (!child.style.getPropertyValue('--d')) {
          child.style.setProperty('--d', (i * gap) + 'ms');
        }
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ------------------------------------------------------------------------
     4. Hero split-text — wraps each glyph so it can rise out of a mask
     ------------------------------------------------------------------------ */
  function splitText() {
    var targets = $$('[data-split]');
    if (!targets.length) return;

    targets.forEach(function (el) {
      var words = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      var index = 0;
      words.forEach(function (word, w) {
        var mask = document.createElement('span');
        mask.className = 'char-mask';
        word.split('').forEach(function (ch) {
          var span = document.createElement('span');
          span.className = 'char';
          span.textContent = ch;
          span.style.transitionDelay = (index * 45) + 'ms';
          mask.appendChild(span);
          index++;
        });
        el.appendChild(mask);
        if (w < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
    });

    var play = function () {
      $$('.char').forEach(function (c) { c.classList.add('in'); });
    };

    if (reduced) { play(); return; }
    setTimeout(play, 250);
  }

  /* ------------------------------------------------------------------------
     5. Parallax layers — data-speed on any element inside the viewport
     ------------------------------------------------------------------------ */
  function parallax() {
    var layers = $$('[data-speed]');
    if (!layers.length || reduced) return;

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute('data-speed')) || 0;
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0,' + (progress * speed * 100).toFixed(2) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ------------------------------------------------------------------------
     6. Magnetic buttons
     ------------------------------------------------------------------------ */
  function magnetic() {
    if (!finePointer || reduced) return;
    $$('[data-magnetic]').forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-magnetic')) || 0.32;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * strength;
        var y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transition = 'transform .6s cubic-bezier(0.16,1,0.3,1)';
        el.style.transform = 'translate(0,0)';
        setTimeout(function () { el.style.transition = ''; }, 620);
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. 3D tilt on cards
     ------------------------------------------------------------------------ */
  function tilt() {
    if (!finePointer || reduced) return;
    $$('.tilt').forEach(function (el) {
      var max = parseFloat(el.getAttribute('data-tilt')) || 7;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          'perspective(900px) rotateY(' + (px * max) + 'deg) rotateX(' + (-py * max) + 'deg) translateZ(6px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
      });
    });
  }

  /* ------------------------------------------------------------------------
     8. Marquee — duplicates its track and reacts to scroll velocity
     ------------------------------------------------------------------------ */
  function marquee() {
    var rigs = $$('.marquee');
    if (!rigs.length) return;

    rigs.forEach(function (rig) {
      var track = $('.marquee__track', rig);
      if (!track) return;
      var clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      rig.appendChild(clone);
    });

    if (reduced) {
      $$('.marquee__track').forEach(function (t) { t.style.animation = 'none'; });
      return;
    }

    // Scroll velocity nudges the marquee speed — subtle, snaps back at rest
    var last = window.scrollY, vel = 0, raf = null;
    window.addEventListener('scroll', function () {
      vel = Math.min(Math.abs(window.scrollY - last) / 12, 3.2);
      last = window.scrollY;
      if (!raf) raf = requestAnimationFrame(applyVel);
    }, { passive: true });

    function applyVel() {
      $$('.marquee__track').forEach(function (t) {
        t.style.animationDuration = (parseFloat(getComputedStyle(t).getPropertyValue('--speed')) || 32) / (1 + vel) + 's';
      });
      vel *= 0.92;
      if (vel > 0.02) raf = requestAnimationFrame(applyVel);
      else { raf = null; $$('.marquee__track').forEach(function (t) { t.style.animationDuration = ''; }); }
    }
  }

  /* ------------------------------------------------------------------------
     9. Counters
     ------------------------------------------------------------------------ */
  function counters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;

    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1600;
      var t0 = null;
      if (reduced) { el.textContent = target + suffix; return; }
      function frame(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };

    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ------------------------------------------------------------------------
     10. Nav — scrolled state, scroll spy, mobile menu, progress bar
     ------------------------------------------------------------------------ */
  function navigation() {
    var nav = $('#nav');
    var progress = $('#progress');
    var toTop = $('#to-top');
    var burger = $('#burger');
    var menu = $('#mobile-menu');

    var links = $$('.nav-link[href^="#"]');
    var sections = links
      .map(function (l) { return document.getElementById(l.getAttribute('href').slice(1)); })
      .filter(Boolean);

    function onScroll() {
      var y = window.scrollY;
      if (nav) nav.classList.toggle('scrolled', y > 40);
      if (toTop) toTop.classList.toggle('show', y > window.innerHeight);

      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
      }

      var current = '';
      sections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s.id;
      });
      links.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && menu) {
      var close = function () {
        burger.classList.remove('open');
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('is-locked');
      };
      burger.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('is-locked', open);
        // stagger the links in
        $$('a', menu).forEach(function (a, i) {
          a.style.transitionDelay = open ? (120 + i * 70) + 'ms' : '0ms';
        });
      });
      $$('a', menu).forEach(function (a) { a.addEventListener('click', close); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    }

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      });
    }
  }

  /* ------------------------------------------------------------------------
     11. Palette — click a swatch to copy its hex
     ------------------------------------------------------------------------ */
  function palette() {
    var swatches = $$('.swatch');
    if (!swatches.length) return;
    var toast = $('#toast');
    var toastText = $('#toast-text');
    var timer = null;

    function notify(msg) {
      if (!toast) return;
      if (toastText) toastText.textContent = msg;
      toast.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
    }

    swatches.forEach(function (sw) {
      sw.addEventListener('click', function () {
        var hex = sw.getAttribute('data-hex');
        if (!hex) return;
        var ok = function () { notify(hex + '  copied to clipboard'); };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(hex).then(ok).catch(function () { fallback(hex, ok); });
        } else {
          fallback(hex, ok);
        }
      });
    });

    function fallback(hex, ok) {
      var ta = document.createElement('textarea');
      ta.value = hex;
      ta.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { /* clipboard unavailable */ }
      document.body.removeChild(ta);
    }
  }

  /* ------------------------------------------------------------------------
     12. Gallery filter + lightbox
     ------------------------------------------------------------------------ */
  function gallery() {
    var tiles = $$('.tile');
    var buttons = $$('.filter-btn');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        buttons.forEach(function (b) {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        tiles.forEach(function (t, i) {
          var match = cat === 'all' || (t.getAttribute('data-cat') || '').split(' ').indexOf(cat) > -1;
          if (match) {
            t.classList.remove('hidden-tile');
            t.style.opacity = '0';
            t.style.transform = 'scale(.95)';
            setTimeout(function () { t.style.opacity = ''; t.style.transform = ''; }, 20 + i * 40);
          } else {
            t.classList.add('hidden-tile');
          }
        });
      });
    });

    // Lightbox
    var box = $('#lightbox');
    if (!box) return;
    var img = $('#lightbox-img');
    var cap = $('#lightbox-caption');
    var tag = $('#lightbox-tag');
    var counter = $('#lightbox-count');
    var closeBtn = $('#lightbox-close');
    var prevBtn = $('#lightbox-prev');
    var nextBtn = $('#lightbox-next');
    var index = 0;

    function visible() { return tiles.filter(function (t) { return !t.classList.contains('hidden-tile'); }); }

    function show(i) {
      var list = visible();
      if (!list.length) return;
      index = (i + list.length) % list.length;
      var tile = list[index];
      var source = $('img', tile);
      if (img && source) {
        img.src = source.getAttribute('data-full') || source.src;
        img.alt = source.alt;
      }
      if (cap) cap.textContent = tile.getAttribute('data-title') || '';
      if (tag) tag.textContent = tile.getAttribute('data-tag') || '';
      if (counter) counter.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(list.length).padStart(2, '0');
    }

    function open(tile) {
      var list = visible();
      show(list.indexOf(tile));
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      box.classList.remove('open');
      box.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
    }

    tiles.forEach(function (tile) {
      tile.addEventListener('click', function () { open(tile); });
      tile.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(tile); }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(index + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });

    // Swipe on touch
    var sx = 0;
    box.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 60) show(dx > 0 ? index - 1 : index + 1);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     13. Drag-to-scroll on the banner strip
     ------------------------------------------------------------------------ */
  function dragScroll() {
    $$('.hscroll').forEach(function (rig) {
      var down = false, startX = 0, startLeft = 0;
      rig.addEventListener('pointerdown', function (e) {
        down = true; startX = e.clientX; startLeft = rig.scrollLeft;
        rig.setPointerCapture(e.pointerId);
        rig.style.cursor = 'grabbing';
      });
      rig.addEventListener('pointermove', function (e) {
        if (!down) return;
        rig.scrollLeft = startLeft - (e.clientX - startX);
      });
      ['pointerup', 'pointercancel'].forEach(function (ev) {
        rig.addEventListener(ev, function () { down = false; rig.style.cursor = ''; });
      });
    });
  }

  /* ------------------------------------------------------------------------
     14. EN / AR language toggle
     ------------------------------------------------------------------------ */
  function language() {
    var toggles = $$('[data-lang-toggle]');
    if (!toggles.length) return;
    var nodes = $$('[data-en]');
    var current = 'en';

    function apply(lang) {
      current = lang;
      nodes.forEach(function (n) {
        var val = n.getAttribute('data-' + lang);
        if (val === null) return;
        n.textContent = val;
        n.classList.toggle('font-ar', lang === 'ar');
      });
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      toggles.forEach(function (t) { t.textContent = lang === 'en' ? 'AR' : 'EN'; });
    }

    toggles.forEach(function (t) {
      t.addEventListener('click', function () { apply(current === 'en' ? 'ar' : 'en'); });
    });
  }

  /* ------------------------------------------------------------------------
     15. Enquiry form — client-side validation, then hands off to WhatsApp
     ------------------------------------------------------------------------ */
  function form() {
    var f = $('#enquiry');
    if (!f) return;
    var status = $('#form-status');

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(f);
      var name = (data.get('name') || '').toString().trim();
      var uni = (data.get('university') || '').toString().trim();
      var qty = (data.get('quantity') || '').toString().trim();
      var product = (data.get('product') || '').toString().trim();
      var note = (data.get('message') || '').toString().trim();

      function say(msg, tone) {
        if (!status) return;
        status.textContent = msg;
        status.className = 'mt-6 text-xs tracking-widest uppercase ' +
          (tone === 'error' ? 'text-ember' : 'text-champagne');
      }

      if (!name || !uni) {
        say('Please add your name and university so we can route your request.', 'error');
        return;
      }

      var lines = [
        'New ERA Seniors enquiry',
        'Name: ' + name,
        'University / class: ' + uni,
        'Product: ' + (product || 'not specified'),
        'Quantity: ' + (qty || 'not specified'),
        note ? 'Notes: ' + note : ''
      ].filter(Boolean);

      var body = lines.join('\n');

      // Put the studio number in data-whatsapp on #enquiry (digits + country code).
      // With no number set we fall back to the mailto address so the form still works.
      var phone = (f.getAttribute('data-whatsapp') || '').replace(/\D/g, '');

      if (phone) {
        say('Opening WhatsApp with your brief — we reply within 24 hours.');
        window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(body), '_blank', 'noopener');
      } else {
        var mail = f.getAttribute('data-email') || 'hello@eraseniors.com';
        say('Opening your mail app with the brief — we reply within 24 hours.');
        window.location.href = 'mailto:' + mail +
          '?subject=' + encodeURIComponent('Class order — ' + uni) +
          '&body=' + encodeURIComponent(body);
      }
      f.reset();
    });
  }

  /* ------------------------------------------------------------------------
     16. Year stamp
     ------------------------------------------------------------------------ */
  function year() {
    var el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  document.body.classList.add('is-locked');

  document.addEventListener('DOMContentLoaded', function () {
    // Interaction modules can bind straight away.
    cursor();
    parallax();
    magnetic();
    tilt();
    marquee();
    navigation();
    palette();
    gallery();
    dragScroll();
    language();
    form();
    year();

    // Entrance animations wait for the curtain, otherwise they play unseen.
    preloader().then(function () {
      reveal();
      counters();
      splitText();
    });
  });
})();
