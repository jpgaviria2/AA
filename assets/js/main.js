// Anmore Adventures - Enhanced JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('open');
      
      // Animate hamburger menu
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

  // Value calculator with enhanced animations
  const tripCountInput = document.getElementById('tripCount');
  const tripCountOut = document.getElementById('tripCountOut');
  const savingOut = document.getElementById('savingOut');
  const dealOut = document.getElementById('dealOut');

  if (tripCountInput && tripCountOut && savingOut && dealOut) {
    function updateCalculator() {
      const trips = parseInt(tripCountInput.value);
      const savings = trips * 60; // $60 per trip
      const deals = trips * 20; // $20 per trip in deals
      
      // Animate number changes
      animateNumber(tripCountOut, trips);
      animateNumber(savingOut, savings, '$');
      animateNumber(dealOut, deals, '$');
    }

    function animateNumber(element, targetValue, prefix = '') {
      const currentValue = parseInt(element.textContent.replace(/[^0-9]/g, ''));
      const increment = (targetValue - currentValue) / 20;
      let current = currentValue;
      
      const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
          current = targetValue;
          clearInterval(timer);
        }
        element.textContent = prefix + Math.round(current);
      }, 50);
    }

    tripCountInput.addEventListener('input', updateCalculator);
    updateCalculator(); // Initialize
  }

  // Enhanced smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced reveal animation with staggered timing
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // Stagger animation
      }
    });
  }, observerOptions);

  // Apply reveal animation to various elements
  const revealElements = document.querySelectorAll('.card, .pill, .story-card, .hero-badges span');
  revealElements.forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Header background on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
  });

  // Button hover effects
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Card hover effects
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Typing effect for hero title
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    setTimeout(typeWriter, 500);
  }

  // Update year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Add loading animation
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  // Easter egg: Konami code
  let konamiCode = [];
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
  
  document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      document.body.style.animation = 'rainbow 2s infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 5000);
    }
  });
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  
  .loaded {
    animation: fadeIn 0.5s ease;
  }
`;
document.head.appendChild(style);
