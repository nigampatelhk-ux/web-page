/**
 * Nigam Patel - Modern Developer Portfolio Logic
 * Features: Interactive Particle Mesh, Typewriter, 3D Card Tilt,
 * Filterable Projects & Skills, Project Modal, Toast Feedback, and Smooth Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Interactive Background Canvas
  initBackgroundCanvas();

  // 2. Typewriter Effect
  initTypewriter();

  // 3. 3D Card Tilt Effect
  init3DTilt();

  // 4. Header Scroll & Nav Spy
  initNavigation();

  // 5. Animated Number Counters
  initNumberCounters();

  // 6. Skill Filters & Progress Bars
  initSkills();

  // 7. Project Filters & Modal System
  initProjects();

  // 8. Contact Form & Copy Email
  initContact();

  // 9. Scroll to Top Button
  initScrollTop();

  // 10. Interactive Resume Modal
  initResumeModal();

  // 11. Mouse Cursor Ambient Glow
  initCursorGlow();
});

/* ==========================================================================
   1. Interactive Particle Constellation Canvas
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 14000), 85);
  const maxDistance = 140;

  const mouse = {
    x: null,
    y: null,
    radius: 160
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 1.8 + 0.8;
      this.color = Math.random() > 0.4 ? 'rgba(0, 245, 255,' : 'rgba(139, 92, 246,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const directionX = (dx / dist) * force * 1.5;
          const directionY = (dy / dist) * force * 1.5;
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const roles = [
    'Modern Web Applications',
    'Cross-Platform Mobile Apps',
    'Interactive User Experiences',
    'Full-Stack Solutions'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new text
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. 3D Perspective Tilt on Hero Profile Card
   ========================================================================== */
function init3DTilt() {
  const card = document.querySelector('.profile-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   4. Navigation, Scroll Spy & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active highlighting
    let currentSection = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Drawer
  function toggleMobileMenu(open) {
    if (open) {
      mobileNav.classList.add('open');
      mobileNavBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('open');
      mobileNavBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      toggleMobileMenu(!isOpen);
    });
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });
}

/* ==========================================================================
   5. Animated Number Counters
   ========================================================================== */
function initNumberCounters() {
  const statNumbers = document.querySelectorAll('.stat-count');
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statNumbers.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 1800; // ms
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.ceil(current);
              }
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   6. Skill Filters & Progress Animation
   ========================================================================== */
function initSkills() {
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const progressBars = document.querySelectorAll('.skill-progress-bar-fill');

  // Trigger progress fill when section in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => {
            const width = bar.getAttribute('data-level') || '85%';
            bar.style.width = width;
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  const skillsSection = document.querySelector('#skills');
  if (skillsSection) observer.observe(skillsSection);

  // Category Filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Project Filters & Interactive Project Modal
   ========================================================================== */
const projectDatabase = {
  nexora: {
    title: 'Nexora — Cloud Task & Team Collaboration Hub',
    category: 'Web Development',
    image: 'assets/images/project-web-dashboard.jpg',
    tags: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Node.js', 'REST API', 'WebSockets'],
    description:
      'Nexora is a modern web application designed for agile development teams to manage sprints, track pull requests, and monitor project velocity in real-time. Features interactive analytics dashboards, drag-and-drop task boards, and automated status alerts.',
    features: [
      'Interactive Kanban board with fluid drag-and-drop task orchestration',
      'Real-time commit velocity charts and team member productivity analytics',
      'Glassmorphic dark UI tailored for minimal visual fatigue during long sessions',
      'Full responsive adaptability from desktop monitors to mobile viewport screens',
      'Integrated RESTful endpoint integration and simulated WebSocket live feed'
    ],
    liveUrl: '#',
    codeUrl: 'https://github.com'
  },
  pulsefit: {
    title: 'PulseFit — Cross-Platform Fitness & Habit Tracker',
    category: 'Mobile App Development',
    image: 'assets/images/project-mobile-app.jpg',
    tags: ['Flutter', 'Dart', 'Mobile UI/UX', 'Local Storage', 'State Management'],
    description:
      'PulseFit is a mobile application that empowers users to establish healthier routines with daily habit streaks, workout logging, hydration tracking, and interactive biometric visual cards. Built with a focus on buttery 60fps animations and offline-first persistence.',
    features: [
      'Dynamic activity insight rings that reactively update as milestones are logged',
      'Hydration, stretching, and reading habit cards with customizable streak goals',
      'Local storage caching ensuring instant app launch even in airplane mode',
      'Vibrant emerald green and cyan dark theme for an energetic feel',
      'Interactive workout timer and customizable reminder notification schedules'
    ],
    liveUrl: '#',
    codeUrl: 'https://github.com'
  },
  devcanvas: {
    title: 'DevCanvas — Real-Time Code Playground & UI Studio',
    category: 'Web Development',
    image: 'assets/images/project-code-editor.jpg',
    tags: ['JavaScript ES6+', 'CSS Grid', 'Custom Elements', 'Syntax Highlighting', 'Canvas API'],
    description:
      'DevCanvas is an interactive in-browser developer tool created to test, inspect, and export modern UI components. Developers can write code, tweak style properties through dynamic control panels, and preview interactive components on a live canvas simultaneously.',
    features: [
      'Split-pane IDE interface with real-time reactive code compilation',
      'Visual props & styles inspector for modifying button states, neon glows, and padding',
      'One-click CSS token and JSON configuration code export for rapid frontend development',
      'Ultra-responsive curved viewport preview simulator for multiple screen sizes',
      'Lightweight vanilla JavaScript architecture with zero heavy library overhead'
    ],
    liveUrl: '#',
    codeUrl: 'https://github.com'
  },
  campuspulse: {
    title: 'DSATM CampusPulse — Student Guide & Smart Schedule',
    category: 'Mobile App Development',
    image: 'assets/images/project-campus-app.jpg',
    tags: ['Mobile Architecture', 'JavaScript/Dart', 'Firebase', 'Geolocation', 'DSATM Campus'],
    description:
      'Engineered specifically for students and faculty at Dayananda Sagar Academy of Technology and Management (DSATM), Bangalore. CampusPulse provides campus maps, real-time classroom schedules, tech club event registrations, and assignment deadlines all in one cohesive app.',
    features: [
      'Interactive campus building layout map featuring auditorium, library, and department pins',
      'Weekly personalized course timetable with smart notifications 10 minutes before class',
      'Department tech symposiums, hackathons, and cultural fest announcement feed',
      'Digital student assignment submission tracker with automated deadline countdowns',
      'Secure student authentication and offline schedule viewing'
    ],
    liveUrl: '#',
    codeUrl: 'https://github.com'
  }
};

function initProjects() {
  const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Modal Open Handler
  const detailButtons = document.querySelectorAll('.btn-details');
  detailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const project = projectDatabase[projectId];
      if (!project) return;

      document.getElementById('modal-img').src = project.image;
      document.getElementById('modal-img').alt = project.title;
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-desc').textContent = project.description;

      // Tags
      const tagsContainer = document.getElementById('modal-tags');
      tagsContainer.innerHTML = '';
      project.tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });

      // Features
      const featuresList = document.getElementById('modal-features');
      featuresList.innerHTML = '';
      project.features.forEach((feature) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${feature}</span>
        `;
        featuresList.appendChild(li);
      });

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Modal Close Handlers
  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. Contact Form, Copy Email & Toast Feedback
   ========================================================================== */
function initContact() {
  const copyEmailBtn = document.getElementById('copy-email-card');
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-msg');

  // Show Toast Helper
  function showToast(msg, duration = 3000) {
    toastMessage.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, duration);
  }

  // Copy Email to Clipboard
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'nigam.patel.dev@gmail.com';
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showToast('Email copied to clipboard: ' + email);
        })
        .catch(() => {
          showToast('Email: ' + email);
        });
    });
  }

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const messageInput = document.getElementById('user-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Simulate sending animation
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
        </svg>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('Thank you, ' + nameInput.value + '! Your message has been sent successfully.');
      }, 1400);
    });
  }
}

/* ==========================================================================
   9. Scroll to Top Floating Button
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. Interactive Resume Modal
   ========================================================================== */
function initResumeModal() {
  const resumeBtns = document.querySelectorAll('.btn-resume-modal');
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('print-resume-btn');

  if (!resumeModal) return;

  resumeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeResume() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResume);
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   11. Mouse Cursor Ambient Glow
   ========================================================================== */
function initCursorGlow() {
  const cursorGlow = document.querySelector('.cursor-glow');
  if (!cursorGlow) return;

  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}
