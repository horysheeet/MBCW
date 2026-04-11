const header = document.getElementById('siteHeader');
const footer = document.querySelector('.site-footer');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const getCurrentPage = () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  return page.toLowerCase();
};

const renderSharedHeader = () => {
  if (!header) {
    return;
  }

  const currentPage = getCurrentPage();
  const currentHash = window.location.hash.toLowerCase();
  const navItems = [
    {
      label: 'Home',
      href: 'index.html',
      isActive: currentPage === 'index.html' && currentHash !== '#pricing'
    },
    {
      label: 'About',
      href: 'about.html',
      isActive: currentPage === 'about.html'
    },
    {
      label: 'Services',
      href: 'services.html',
      isActive: currentPage === 'services.html'
    },
    {
      label: 'Pricing',
      href: 'index.html#pricing',
      isActive: currentPage === 'index.html' && currentHash === '#pricing'
    },
    {
      label: 'Contact Us',
      href: 'contact.html',
      isActive: currentPage === 'contact.html'
    }
  ];

  header.innerHTML = `
    <div class="container nav">
      <a class="brand" href="index.html" aria-label="Mobile Friendly Car Washes home">
        <span class="brand-mark">MF</span>
        <span class="brand-copy">
          <strong>Mobile Friendly</strong>
          <small>Car Washes</small>
        </span>
      </a>

      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="siteNav" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-shell">
        <nav class="nav-links" id="siteNav" aria-label="Main navigation">
          ${navItems
            .map(
              ({ label, href, isActive }) => `
                <a class="${isActive ? 'active' : ''}" href="${href}" ${isActive ? 'aria-current="page"' : ''}>${label}</a>
              `
            )
            .join('')}
        </nav>

        <div class="top-icons" aria-label="Contact and social links">
          <a class="icon-link" href="tel:5551234567" aria-label="Call us">☎</a>
          <a class="icon-link" href="#" aria-label="Facebook">f</a>
          <a class="icon-link" href="#" aria-label="Instagram">◎</a>
          <a class="icon-link" href="#" aria-label="Search">⌕</a>
        </div>
      </div>
    </div>
  `;
};

const renderSharedFooter = () => {
  if (!footer) {
    return;
  }

  const currentPage = getCurrentPage();
  const isCompactFooter = currentPage === 'contact.html';

  footer.innerHTML = isCompactFooter
    ? `
      <div class="container footer-grid">
        <p><strong>Mobile Friendly Car Washes</strong></p>
        <p class="small-note">Mobile-first booking for eco-friendly car care.</p>
      </div>
    `
    : `
      <div class="container footer-grid footer-home-grid">
        <div class="footer-brand">
          <a class="brand brand-footer" href="index.html" aria-label="Mobile Friendly Car Washes home">
            <span class="brand-mark">MF</span>
            <span class="brand-copy">
              <strong>Mobile Friendly</strong>
              <small>Car Washes</small>
            </span>
          </a>
          <p class="small-note">Water-saving, on-demand detailing for modern drivers who want convenience without compromise.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p><a href="tel:5551234567">(555) 123-4567</a></p>
          <p><a href="mailto:jasdg@mobilecarwashdemo.com">jasdg@mobilecarwashdemo.com</a></p>
          <div class="footer-socials" aria-label="Social links">
            <a class="icon-link" href="#" aria-label="Facebook">f</a>
            <a class="icon-link" href="#" aria-label="Instagram">◎</a>
            <a class="icon-link" href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>
    `;
};

renderSharedHeader();
renderSharedFooter();

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('#siteNav a');

if (header) {
  const updateHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 32);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

if (header && navToggle) {
  const setMenuState = (isOpen) => {
    navToggle.setAttribute('aria-expanded', String(isOpen));
    header.classList.toggle('menu-open', isOpen);
  };

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('click', (event) => {
    if (!header.classList.contains('menu-open')) {
      return;
    }

    if (!header.contains(event.target)) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      setMenuState(false);
    }
  });
}

const addAnimatedGroup = (selector, step = 90, className = 'reveal', mode = 'up') => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add(className);
    element.style.setProperty('--delay', `${index * step}ms`);

    if (mode === 'scale') {
      element.dataset.reveal = 'scale';
    }
  });
};

const initPageLoadAnimation = () => {
  addAnimatedGroup('.hero .eyebrow, .hero h1, .hero p', 90, 'load-in');
  addAnimatedGroup('.hero .button-group .btn', 120, 'load-in');
  addAnimatedGroup('.hero .hero-stats > div, .hero .about-chip-row .chip, .hero .mini-stat-grid > div', 80, 'load-in', 'scale');
  addAnimatedGroup('.about-hero-visual, .services-hero-card', 140, 'load-in');

  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      document.body.classList.add('is-loaded');
    }, 40);
  });
};

const initScrollReveal = () => {
  [
    ['.section-heading, .cta-panel, .testimonial-panel, .story-panel, .story-side-card, .trust-panel, .map-placeholder', 0, 'up'],
    ['.feature-grid > *, .service-preview-grid > *, .steps-grid > *, .service-grid > *, .contact-grid > *, .mission-grid > *, .value-grid > *', 85, 'scale']
  ].forEach(([selector, step, mode]) => {
    addAnimatedGroup(selector, step, 'reveal', mode);
  });

  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealElements.forEach((element) => observer.observe(element));
};

const initHeroCatchphraseRotator = () => {
  const rotator = document.querySelector('.hero-wipe[data-phrases]');

  if (!rotator) {
    return;
  }

  const phrases = rotator.dataset.phrases
    .split('|')
    .map((phrase) => phrase.trim())
    .filter(Boolean);

  if (phrases.length < 2 || prefersReducedMotion.matches) {
    rotator.textContent = phrases[0] || rotator.textContent;
    return;
  }

  let currentIndex = 0;

  window.setInterval(() => {
    rotator.classList.remove('is-wiping-in');
    rotator.classList.add('is-wiping-out');

    window.setTimeout(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      rotator.textContent = phrases[currentIndex];
      rotator.classList.remove('is-wiping-out');
      rotator.classList.add('is-wiping-in');
    }, 220);
  }, 2800);
};

const initFormStates = () => {
  document.querySelectorAll('form input, form textarea').forEach((field) => {
    const wrapper = field.closest('div');

    if (!wrapper) {
      return;
    }

    const syncState = () => {
      wrapper.classList.toggle('has-value', field.value.trim() !== '');
    };

    ['input', 'focus', 'blur'].forEach((eventName) => {
      field.addEventListener(eventName, syncState);
    });

    syncState();
  });
};

initPageLoadAnimation();
initScrollReveal();
initHeroCatchphraseRotator();
initFormStates();