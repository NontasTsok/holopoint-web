/* Holopoint · language switch and motion */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────── Language ─────────────
     Greek lives in index.html. English lives here, keyed by data-i18n. */
  var en = {
    'skip': 'Skip to content',
    'nav.products': 'Products',
    'nav.shop': 'The shop',
    'nav.events': 'Events',
    'nav.visit': 'Location',
    'hero.badge': 'Opening soon · Larisa, Greece',
    'hero.title': 'The new home for <span class="holo-text">trading card games</span> in Larisa.',
    'hero.lead': 'Holopoint is the new shop for collectors and players in Larisa and across Thessaly. Authentic sealed products, tournaments and a place to play, trade and meet people.',
    'hero.cta1': 'Where to find us',
    'hero.cta2': 'What you’ll find in store',
    'mq.collections': 'Collections',
    'mq.tournaments': 'Tournaments',
    'products.eyebrow': 'Products',
    'products.title': 'Everything your collection needs',
    'products.lead': 'Sealed Pokémon TCG products, with more games coming soon.',
    'products.packs': 'Packs from the latest sets, whether you open one or… ten.',
    'products.boxes': 'Full boxes for completing a set or sharing the opening with friends.',
    'products.etb': 'Packs, sleeves, dice and accessories in one box. A great gift, too.',
    'products.collections.title': 'Collections',
    'products.collections': 'Collection boxes and special editions with promo cards you won’t find elsewhere.',
    'products.decks': 'Ready-to-play decks so you can start playing from day one.',
    'products.art': 'Anime and Pokémon art pieces for your wall, desk or display case.',
    'products.upc': 'The most sought-after collector releases: premium boxes with exclusive promo cards and accessories, for those who want something extra.',
    'products.note': 'An online shop will follow. Until then, come and see us in person.',
    'shop.eyebrow': 'The shop',
    'shop.title': 'A place for everyone',
    'shop.lead': 'You don’t need to know everything to walk through the door. Whether you’ve collected for years or just heard the word “booster”, someone here will help you.',
    'shop.collectors.title': 'Collectors',
    'shop.collectors': 'New releases, special editions and people who understand why that one card matters.',
    'shop.players.title': 'Players',
    'shop.players': 'Tables to play at, tournaments and opponents for every level.',
    'shop.parents.title': 'Parents',
    'shop.parents': 'Not sure what to buy? Tell us the age and the budget and we’ll suggest the right gift.',
    'shop.beginners.title': 'Beginners',
    'shop.beginners': 'We’ll show you the basics, from your first deck to your first game.',
    'events.eyebrow': 'Events',
    'events.title': 'Play, trade, meet people',
    'events.lead': 'Holopoint will be a meeting point for the community of Larisa and Thessaly. The schedule will be announced closer to the opening.',
    'events.tournaments.title': 'Tournaments',
    'events.tournaments': 'Organised matches with prizes, for anyone who wants to put their deck to the test.',
    'events.league': 'Regular evenings for playing, trading and good company.',
    'events.prerelease': 'Try the new sets before their official release.',
    'events.casual': 'Bring your cards, find a table and play with no pressure.',
    'trust.title': 'Authentic products only',
    'trust.lead': 'Everything we sell comes through the official distribution network and is sold sealed, exactly as it left the factory.',
    'trust.a': 'Official distribution',
    'trust.b': 'Factory sealed',
    'trust.c': 'No fakes, no resealed packs',
    'visit.eyebrow': 'Location',
    'visit.title': 'Come and find us',
    'visit.address.label': 'Address',
    'visit.address': 'Ipsilantou 6, Larisa 412 23, Greece',
    'visit.hours.label': 'Opening hours',
    'visit.hours': 'To be announced soon',
    'visit.map.city': 'Ipsilantou 6, Larisa',
    'visit.map.cta': 'Open in Google Maps',
    'footer.tag': 'Trading card games in Larisa, Greece.',
    'footer.privacy': 'This website uses no cookies and no tracking tools.',
    'footer.disclaimer': 'Holopoint is an independent shop. Pokémon and all other game names are trademarks of their respective owners.'
  };

  var meta = {
    el: {
      title: document.title,
      description: (document.querySelector('meta[name="description"]') || {}).content || ''
    },
    en: {
      title: 'Holopoint · Trading card games in Larisa, Greece',
      description: 'Holopoint is the new trading card game shop in Larisa, Greece. Authentic sealed Pokémon TCG products, tournaments and space to play. Opening soon.'
    }
  };

  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var el = {};
  nodes.forEach(function (node) {
    var key = node.getAttribute('data-i18n');
    if (!(key in el)) el[key] = node.innerHTML;
  });
  var dict = { el: el, en: en };

  function setLang(lang, remember) {
    if (!dict[lang]) lang = 'el';
    nodes.forEach(function (node) {
      var value = dict[lang][node.getAttribute('data-i18n')];
      if (value !== undefined) node.innerHTML = value;
    });
    document.documentElement.lang = lang;
    document.title = meta[lang].title;
    var description = document.querySelector('meta[name="description"]');
    if (description) description.content = meta[lang].description;
    document.querySelectorAll('.lang__btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });
    if (remember) {
      try { localStorage.setItem('holopoint-lang', lang); } catch (e) { /* private mode */ }
    }
  }

  document.querySelectorAll('.lang__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang'), true);
    });
  });

  var initial = new URLSearchParams(window.location.search).get('lang');
  if (!initial) {
    try { initial = localStorage.getItem('holopoint-lang'); } catch (e) { /* private mode */ }
  }
  if (initial && initial !== 'el') setLang(initial, false);

  /* ───────────── Nav state ───────────── */
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ───────────── Scroll reveal ───────────── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (node) { revealObserver.observe(node); });
  } else {
    reveals.forEach(function (node) { node.classList.add('in'); });
  }

  /* ───────────── Background sparkles ───────────── */
  var sparks = document.getElementById('sparks');
  if (sparks) {
    var colors = ['#7df9ff', '#b79bff', '#ff7ad9', '#ffd76e', '#ffffff'];
    var count = window.innerWidth < 700 ? 12 : 22;
    for (var i = 0; i < count; i++) {
      var spark = document.createElement('span');
      spark.className = 'spark';
      spark.style.left = (Math.random() * 100).toFixed(2) + '%';
      spark.style.top = (Math.random() * 100).toFixed(2) + '%';
      spark.style.setProperty('--s', (6 + Math.random() * 12).toFixed(1) + 'px');
      spark.style.setProperty('--t', (3.5 + Math.random() * 4.5).toFixed(2) + 's');
      spark.style.setProperty('--dl', (-Math.random() * 8).toFixed(2) + 's');
      spark.style.setProperty('--c', colors[i % colors.length]);
      sparks.appendChild(spark);
    }
  }

  /* ───────────── Hero cards: tilt and holo shine ─────────────
     Follows the mouse while it is over the hero; otherwise sways on its own. */
  var stage = document.getElementById('stage');
  var hero = document.getElementById('top');
  if (stage && hero && !reduceMotion) {
    var target = { x: 0, y: 0 };
    var current = { x: 0, y: 0 };
    var tracking = false;
    var visible = true;
    var rafId = null;

    hero.addEventListener('pointermove', function (event) {
      if (event.pointerType !== 'mouse') return;
      var rect = stage.getBoundingClientRect();
      var x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      var y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      target.x = Math.max(-1, Math.min(1, x));
      target.y = Math.max(-1, Math.min(1, y));
      tracking = true;
    });
    hero.addEventListener('pointerleave', function () { tracking = false; });

    var frame = function (time) {
      var goalX = tracking ? target.x : Math.sin(time / 1700) * 0.55;
      var goalY = tracking ? target.y : Math.cos(time / 2300) * 0.4;
      current.x += (goalX - current.x) * 0.07;
      current.y += (goalY - current.y) * 0.07;
      stage.style.setProperty('--px', current.x.toFixed(4));
      stage.style.setProperty('--py', current.y.toFixed(4));
      rafId = visible ? requestAnimationFrame(frame) : null;
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible && rafId === null) rafId = requestAnimationFrame(frame);
      }).observe(stage);
    } else {
      rafId = requestAnimationFrame(frame);
    }
  }

  /* ───────────── Product tiles: spotlight follows the pointer ───────────── */
  document.querySelectorAll('.tile').forEach(function (tile) {
    tile.addEventListener('pointermove', function (event) {
      var rect = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
      tile.style.setProperty('--my', (event.clientY - rect.top) + 'px');
    });
  });
})();
