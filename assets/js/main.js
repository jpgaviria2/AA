// Anmore Adventures - Site enhancements with Supabase integration

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initValueCalculators();
  initSmoothScroll();
  initRevealAnimations();
  initHeroEffects();
  initFooterYear();
  initHoverEffects();
  initKonamiEasterEgg();
  initSupabase();
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

function initNavToggle() {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteNav.classList.toggle('open');

    const spans = navToggle.querySelectorAll('span');
    if (!isExpanded) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

function initValueCalculators() {
  const calcElements = document.querySelectorAll('[data-value-calc]');
  calcElements.forEach(calc => {
    const input = calc.querySelector('input[type="range"]');
    const tripsOut = calc.querySelector('[data-output="trips"]');
    const savingsOut = calc.querySelector('[data-output="savings"]');
    const dealsOut = calc.querySelector('[data-output="deals"]');
    const savingsRate = Number(calc.dataset.savingsRate || '60');
    const dealsRate = Number(calc.dataset.dealsRate || '20');

    if (!input || !tripsOut || !savingsOut || !dealsOut) return;

    const update = () => {
      const trips = parseInt(input.value, 10) || 0;
      animateNumber(tripsOut, trips);
      animateNumber(savingsOut, trips * savingsRate, '$');
      animateNumber(dealsOut, trips * dealsRate, '$');
      input.setAttribute('aria-valuenow', String(trips));
    };

    input.addEventListener('input', update);
    update();
  });
}

function animateNumber(element, target, prefix = '') {
  const current = parseInt(element.textContent.replace(/[^0-9]/g, ''), 10) || 0;
  const steps = 20;
  const increment = (target - current) / steps;
  let value = current;
  let iterations = 0;

  clearInterval(element._timer);
  element._timer = setInterval(() => {
    iterations += 1;
    value += increment;

    if (iterations >= steps) {
      value = target;
      clearInterval(element._timer);
    }

    element.textContent = prefix + Math.max(0, Math.round(value));
  }, 50);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.card, .pill, .story-card, .hero-badges span').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}

function initHeroEffects() {
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero) {
      hero.style.transform = `translateY(${scrolled * -0.5}px)`;
    }

    if (header) {
      if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      }
    }
  });
}

function initFooterYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function initHoverEffects() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px) scale(1.02)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
    });
  });

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

function initKonamiEasterEgg() {
  let konamiCode = [];
  const sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

  document.addEventListener('keydown', event => {
    konamiCode.push(event.keyCode);
    if (konamiCode.length > sequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(',') === sequence.join(',')) {
      document.body.style.animation = 'rainbow 2s infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 5000);
    }
  });
}

function initSupabase() {
  const scriptEl = document.querySelector('[data-supabase-script]');
  const formEl = document.querySelector('[data-membership-form]');

  if (!scriptEl || !formEl) {
    return;
  }

  const projectUrl = scriptEl.dataset.projectUrl;
  const anonKey = scriptEl.dataset.anonKey;

  if (!projectUrl || !anonKey) {
    console.warn('Supabase configuration missing project URL or anon key.');
    return;
  }

  if (typeof window.createClient !== 'function') {
    console.error('Supabase client library not loaded.');
    return;
  }

  const supabase = window.createClient(projectUrl, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  formEl.addEventListener('submit', async event => {
    event.preventDefault();

    const statusEl = formEl.querySelector('[data-form-status]');
    const submitBtn = formEl.querySelector('button[type="submit"]');

    const formData = new FormData(formEl);
    const payload = {
      full_name: formData.get('full_name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim().toLowerCase() || '',
      phone: formData.get('phone')?.toString().trim() || null,
      membership_plan: formData.get('membership_plan')?.toString() || null,
      trips_per_season: Number(formData.get('trips_per_season') || 0),
      interests: formData.getAll('interests').map(String),
      notes: formData.get('notes')?.toString().trim() || null
    };

    const errors = validateForm(payload);
    if (errors.length) {
      displayStatus(statusEl, errors.join(' '), 'error');
      return;
    }

    displayStatus(statusEl, 'Submitting...', 'loading');
    submitBtn.disabled = true;

    try {
      const { error } = await supabase
        .from('membership_signups')
        .insert({
          full_name: payload.full_name,
          email: payload.email,
          phone: payload.phone,
          membership_plan: payload.membership_plan,
          trips_per_season: payload.trips_per_season,
          interests: payload.interests,
          notes: payload.notes
        });

      if (error) {
        throw error;
      }

      displayStatus(statusEl, 'Thanks! Check your inbox for next steps.', 'success');
      formEl.reset();
    } catch (error) {
      console.error('Membership form submission failed', error);
      displayStatus(statusEl, 'Something went wrong. Please try again or email hello@anmoreadventures.com.', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function validateForm(payload) {
  const errors = [];

  if (!payload.full_name || payload.full_name.length < 2) {
    errors.push('Enter your name.');
  }

  if (!payload.email || !/^\S+@\S+\.\S+$/.test(payload.email)) {
    errors.push('Enter a valid email.');
  }

  if (payload.notes && payload.notes.length > 2000) {
    errors.push('Notes must be under 2000 characters.');
  }

  return errors;
}

function displayStatus(element, message, type) {
  if (!element) return;

  element.textContent = message;
  element.dataset.state = type;
}

// Inline styles required for some dynamic effects
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }

  .loaded {
    animation: fadeIn 0.5s ease;
  }

  [data-form-status] {
    display: block;
    margin-top: 0.75rem;
    font-size: 0.95rem;
    font-weight: 500;
  }

  [data-form-status][data-state="loading"] {
    color: #6b7280;
  }

  [data-form-status][data-state="success"] {
    color: #0fb37f;
  }

  [data-form-status][data-state="error"] {
    color: #ff6b35;
  }
`;
document.head.appendChild(style);

