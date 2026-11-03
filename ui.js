/* ============================================================
   0D Technologies — shared UI behaviour
   - mobile nav drawer (also injected on pages that lack one)
   - body scroll lock + close on link / outside / Escape
   - reveal-animation safety net
   ============================================================ */
(function () {
    'use strict';

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        var nav = document.querySelector('nav');
        var links = nav ? nav.querySelector('.nav-links') : null;
        var toggle = nav ? nav.querySelector('.mobile-toggle') : null;

        // Product pages ship no toggle: create one so the menu is reachable.
        if (nav && links && !toggle) {
            toggle = document.createElement('button');
            toggle.className = 'mobile-toggle';
            toggle.setAttribute('aria-label', 'Open menu');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
            nav.appendChild(toggle);
        }

        // Marketing pages use a fixed nav (hero needs clearance); product pages
        // use a sticky nav that already occupies layout space.
        if (nav && window.getComputedStyle(nav).position === 'fixed') {
            document.body.classList.add('nav-fixed');
        }

        if (toggle) {
            // Marketing pages use an inline onclick handler; replace it so the
            // class is toggled exactly once.
            toggle.removeAttribute('onclick');
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                var open = links.classList.toggle('show');
                document.body.classList.toggle('ui-lock', open);
                toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                toggle.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
        }

        function closeNav() {
            if (!links) return;
            links.classList.remove('show');
            document.body.classList.remove('ui-lock');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }

        if (links) {
            // Highlight the current page.
            var here = (location.pathname.split('/').pop() || 'index.html');
            links.querySelectorAll('a').forEach(function (a) {
                var href = a.getAttribute('href');
                if (href && href.split('#')[0].split('?')[0] === here) a.classList.add('on');
                a.addEventListener('click', function () {
                    if (window.innerWidth <= 900) closeNav();
                });
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeNav();
        });

        document.addEventListener('click', function (e) {
            if (window.innerWidth > 900) return;
            if (!e.target.closest('nav')) closeNav();
        });

        // Dropdown buttons inside the drawer must not navigate.
        document.querySelectorAll('.nav-links .drop-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    var dd = btn.closest('.nav-dropdown, .dropdown');
                    if (dd) dd.classList.toggle('open');
                }
            });
        });

        // Safety net: never leave content invisible if an observer never fires.
        window.setTimeout(function () {
            document.querySelectorAll('.r:not(.v)').forEach(function (el) {
                var box = el.getBoundingClientRect();
                if (box.top < window.innerHeight + 200) el.classList.add('v');
            });
        }, 1200);
    });
})();
