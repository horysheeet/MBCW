const header = document.getElementById('siteHeader');
const footer = document.querySelector('.site-footer');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const business = {
  name: 'ShineDash Car Wash Services',
  mark: 'SD',
  lineOne: 'ShineDash Car Wash',
  lineTwo: 'Services',
  phoneRaw: '09661341375',
  phoneDisplay: '0966 134 1375',
  email: 'shinedash.carwash@gmail.com',
  address: 'Aurora Hill, Bayan Park, Baguio City, Philippines',
  addressShort: 'Aurora Hill, Bayan Park, Baguio City'
};

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
      <a class="brand" href="index.html" aria-label="${business.name} home">
        <span class="brand-mark">${business.mark}</span>
        <span class="brand-copy">
          <strong>${business.lineOne}</strong>
          <small>${business.lineTwo}</small>
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

        <div class="top-icons" aria-label="Quick contact links">
          <a class="icon-link" href="tel:${business.phoneRaw}" aria-label="Call ${business.name}">☎</a>
          <a class="icon-link" href="mailto:${business.email}" aria-label="Email ${business.name}">✉</a>
          <a class="icon-link" href="contact.html" aria-label="View location and booking details">📍</a>
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
        <p><strong>${business.name}</strong></p>
        <p class="small-note">Professional mobile car care for homes, condos, and workplaces in ${business.addressShort}.</p>
      </div>
    `
    : `
      <div class="container footer-grid footer-home-grid">
        <div class="footer-brand">
          <a class="brand brand-footer" href="index.html" aria-label="${business.name} home">
            <span class="brand-mark">${business.mark}</span>
            <span class="brand-copy">
              <strong>${business.lineOne}</strong>
              <small>${business.lineTwo}</small>
            </span>
          </a>
          <p class="small-note">Local, eco-conscious car wash and detailing service based in ${business.addressShort}.</p>
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
          <p><a href="tel:${business.phoneRaw}">${business.phoneDisplay}</a></p>
          <p><a href="mailto:${business.email}">${business.email}</a></p>
          <p>${business.addressShort}</p>
          <div class="footer-socials" aria-label="Quick actions">
            <a class="icon-link" href="tel:${business.phoneRaw}" aria-label="Call us">☎</a>
            <a class="icon-link" href="mailto:${business.email}" aria-label="Send email">✉</a>
            <a class="icon-link" href="contact.html" aria-label="Open contact page">→</a>
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
  rotator.textContent = phrases[currentIndex];
  rotator.classList.add('is-wiping-in');

  window.setInterval(() => {
    rotator.classList.remove('is-wiping-in');
    rotator.classList.add('is-wiping-out');

    window.setTimeout(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      rotator.textContent = phrases[currentIndex];
      rotator.classList.remove('is-wiping-out');
      rotator.classList.add('is-wiping-in');
    }, 260);
  }, 3600);
};

const initReviewCarousel = () => {
  const carousel = document.querySelector('[data-review-carousel]');

  if (!carousel) {
    return;
  }

  const slides = Array.from(carousel.querySelectorAll('[data-review-slide]'));
  const dots = Array.from(carousel.querySelectorAll('.testimonial-dot'));

  if (slides.length < 2) {
    return;
  }

  let currentIndex = 0;
  let autoplayId = null;

  const setActiveSlide = (nextIndex) => {
    currentIndex = nextIndex;

    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const startAutoplay = () => {
    if (prefersReducedMotion.matches) {
      return;
    }

    window.clearInterval(autoplayId);
    autoplayId = window.setInterval(() => {
      setActiveSlide((currentIndex + 1) % slides.length);
    }, 4200);
  };

  const goToSlide = (nextIndex, shouldResetTimer = true) => {
    setActiveSlide(nextIndex);

    if (shouldResetTimer) {
      startAutoplay();
    }
  };

  const goToNextSlide = () => {
    goToSlide((currentIndex + 1) % slides.length);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', (event) => {
      event.stopPropagation();
      goToSlide(index);
    });
  });

  carousel.addEventListener('click', () => {
    goToNextSlide();
  });

  if (prefersReducedMotion.matches) {
    setActiveSlide(0);
    return;
  }

  startAutoplay();
};

const initFloatingBookButton = () => {
  const floatingButton = document.createElement('a');
  floatingButton.className = 'floating-book-btn';
  floatingButton.href = 'contact.html';
  floatingButton.setAttribute('aria-label', 'Book a car wash service');
  floatingButton.innerHTML = '<span>Book Now</span>';
  document.body.appendChild(floatingButton);
};

const initPageLoader = () => {
  const loader = document.querySelector('[data-page-loader]');

  if (!loader) {
    return;
  }

  window.setTimeout(() => {
    loader.classList.add('is-hidden');

    window.setTimeout(() => {
      loader.remove();
    }, 420);
  }, prefersReducedMotion.matches ? 50 : 380);
};

const initContactForm = () => {
  const form = document.getElementById('contactForm');

  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.alert('Thanks. Your booking request for ShineDash Car Wash Services has been recorded for this thesis prototype.');
    form.reset();
    initFormStates();
  });
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
initReviewCarousel();
initFloatingBookButton();
initPageLoader();
initContactForm();
initFormStates();