// Anmore Adventures - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.style.display = isExpanded ? 'none' : 'block';
    });
  }

  // Value calculator
  const tripCountInput = document.getElementById('tripCount');
  const tripCountOut = document.getElementById('tripCountOut');
  const savingOut = document.getElementById('savingOut');
  const dealOut = document.getElementById('dealOut');

  if (tripCountInput && tripCountOut && savingOut && dealOut) {
    function updateCalculator() {
      const trips = parseInt(tripCountInput.value);
      const savings = trips * 60; // $60 per trip
      const deals = trips * 20; // $20 per trip in deals
      
      tripCountOut.textContent = trips;
      savingOut.textContent = `$${savings}`;
      dealOut.textContent = `$${deals}`;
    }

    tripCountInput.addEventListener('input', updateCalculator);
    updateCalculator(); // Initialize
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Reveal animation for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Apply reveal animation to cards
  document.querySelectorAll('.card.reveal').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Update year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
