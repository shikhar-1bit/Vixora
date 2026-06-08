


if (typeof document !== 'undefined') {
  const applySkeletonActive = () => {
    const pageType = document.body ? document.body.dataset.page : null;
    if (pageType && pageType !== 'index') {
      document.body.classList.add('skeleton-active');
    }
  };
  if (document.body) {
    applySkeletonActive();
  } else {
    document.addEventListener('DOMContentLoaded', applySkeletonActive);
  }
}

const NAV_HTML = `
<nav id="vixora-nav">
  <a href="index.html" class="nav-logo">
    <span>V</span><span class="logo-rest">IXORA</span>
  </a>
  <ul class="nav-links">
    <li><a href="index.html" data-page="index">Home</a></li>
    <li><a href="work.html" data-page="work">Work</a></li>
    <li><a href="services.html" data-page="services">Services</a></li>
    <li><a href="lab.html" data-page="lab">Lab</a></li>
    <li><a href="contact.html" data-page="contact">Contact</a></li>
  </ul>
  
  <button class="nav-hamburger" onclick="toggleNavMenu()">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="nav-dropdown">
    <a href="index.html" data-page="index">Home</a>
    <a href="work.html" data-page="work">Work</a>
    <a href="services.html" data-page="services">Services</a>
    <a href="lab.html" data-page="lab">Lab</a>
    <a href="contact.html" data-page="contact">Contact</a>
  </div>
</nav>
`;


const FOOTER_HTML = `
<footer id="vixora-footer">
  <p>Made with care by Vixora &nbsp;·&nbsp; ${new Date().getFullYear()}</p>
</footer>
`;


const SCROLL_INDICATOR_HTML = `
<div class="global-scroll-indicator">
  <span class="scroll-text">SCROLL</span>
  <div class="scroll-track">
    <div class="scroll-dot-anim" id="global-scroll-dot">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>
  </div>
</div>
`;


function injectSharedElements() {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = NAV_HTML;
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;

  
  if (!document.querySelector('.global-scroll-indicator') && document.body.dataset.page !== 'index') {
    document.body.insertAdjacentHTML('beforeend', SCROLL_INDICATOR_HTML);
  }

  
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });



  
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('vixora-nav');
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }

    const indicator = document.querySelector('.global-scroll-indicator');
    if (indicator) {
      if (window.scrollY > 100) {
        indicator.classList.add('hidden');
      } else {
        indicator.classList.remove('hidden');
      }
    }
  });

  
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!navLogo.classList.contains('mobile-expanded')) {
          e.preventDefault(); 
          navLogo.classList.add('mobile-expanded');
          
          
          setTimeout(() => {
            navLogo.classList.remove('mobile-expanded');
          }, 3500);
        }
        
      }
    });
  }
}


let isNavOpen = false;

function toggleNavMenu() {
  const nav = document.getElementById('vixora-nav');
  if (!nav) return;

  isNavOpen = !isNavOpen;

  if (isNavOpen) {
    nav.classList.add('nav-open-state');
    if (window._lenis) window._lenis.stop();
  } else {
    nav.classList.remove('nav-open-state');
    if (window._lenis) window._lenis.start();
  }
}



function initLenis() {
  if (typeof Lenis === 'undefined') return;
  const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
  window._lenis = lenis;

  if (window.gsap && window.ScrollTrigger) {
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);
  } else {
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
}


function initScrollReveals() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  if (document.getElementById('global-scroll-dot')) {
    gsap.to('#global-scroll-dot', { y: 76, duration: 2.4, repeat: -1, yoyo: true, ease: 'power1.inOut' });
  }

  
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 100, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
      }
    );
  });

  
  gsap.utils.toArray('.cards-grid, .snippets-grid, .sticky-notes-grid').forEach(grid => {
    const children = grid.children;
    gsap.fromTo(children,
      { opacity: 0, y: 120, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });


}


function initHeroAnimation() {
  if (!window.gsap) return;

  const headline = document.querySelector('.hero-split');
  const nav = document.getElementById('vixora-nav');

  
  gsap.set('.reveal', { opacity: 0, y: 100, scale: 0.92 });
  if (nav) gsap.set(nav, { opacity: 0, y: -40, scale: 0.96 });

  
  if (nav) {
    gsap.to(nav, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "expo.out"
    });
  }

  
  if (headline) {
    const text = headline.textContent;
    const words = text.split(' ');
    headline.innerHTML = words.map(w =>
      `<span class="split-word"><span class="split-word-inner" style="display:inline-block; transform:translateY(100%); opacity:0;">${w}</span></span>`
    ).join(' ');

    gsap.to('.split-word-inner', {
      y: '0%',
      opacity: 1,
      duration: 1.5,
      ease: 'expo.out',
      stagger: 0.08,
      delay: 0.3
    });
  }

  
  gsap.to('.hero-sub, .hero-ctas, .hero-redesign .reveal', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.5,
    ease: 'expo.out',
    stagger: 0.15,
    delay: 0.6
  });

  
  if (typeof initHeroHands === 'function') {
    initHeroHands();
  }
}


function initParallax() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const stack = document.querySelector('.paper-stack');
  if (!stack) return;

  gsap.to(stack, {
    y: -80,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}


function initProjectCards() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, rotate: 6, y: 120, scale: 0.9 },
      {
        opacity: 1, rotate: 0, y: 0, scale: 1, duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 75%', toggleActions: 'play none none reverse' },
        delay: i * 0.1
      }
    );
  });
}


function initServiceCards() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.utils.toArray('.service-card-wide').forEach((card, i) => {
    const leftPart = card.querySelector('.service-left');
    const desc = card.querySelector('.service-desc');
    const typedText = card.querySelector('.typed-text');
    const cursor = card.querySelector('.typing-cursor');
    const tags = card.querySelector('.service-tags');

    if (!desc || !typedText || !cursor) return;

    const textToType = desc.dataset.text || '';

    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 92%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.15
    });

    
    tl.fromTo(card,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
    );

    if (leftPart) {
      tl.fromTo(leftPart.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      );
    }

    
    tl.to(cursor, { opacity: 1, duration: 0.1 }, '-=0.1');

    
    const typingObj = { charCount: 0 };
    tl.to(typingObj, {
      charCount: textToType.length,
      duration: 2.2, 
      ease: 'none',
      onUpdate: () => {
        const count = Math.round(typingObj.charCount);
        typedText.textContent = textToType.substring(0, count);
      }
    });

    
    tl.to(cursor, {
      opacity: 0,
      repeat: 3,
      yoyo: true,
      duration: 0.15,
      onComplete: () => {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
      }
    }, '>');

    if (tags) {
      tl.fromTo(tags,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3' 
      );
    }
  });
}


function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    if (success) {
      success.style.display = 'block';
      form.reset();
      
      form.querySelectorAll('input, textarea, select').forEach(el => {
        el.dispatchEvent(new Event('change'));
      });
    }
  });
}


function initFilterBar() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          gsap && gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}


function init3DTilt() {
  
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.card, .project-card, .service-card-wide, .snippet-card, .sticky-note');
    if (!card) return;

    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    
    const rX = (0.5 - y) * 25;
    const rY = (x - 0.5) * 25;

    
    const sX = (x - 0.5) * 30;
    const sY = (y - 0.5) * 30;

    if (window.gsap) {
      gsap.to(card, {
        rotateX: rX,
        rotateY: rY,
        scale: 1.06,
        boxShadow: `${-sX}px ${-sY}px 40px rgba(0,0,0,0.15)`,
        perspective: 1000,
        duration: 0.3,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto"
      });
    }

    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);
  });

  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.card, .project-card, .service-card-wide, .snippet-card, .sticky-note');
    if (!card) return;

    
    const related = e.relatedTarget;
    if (related && card.contains(related)) return;

    if (window.gsap) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: "6px 6px 0px rgba(0,0,0,0.08)",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  injectSharedElements();
  initLenis();

  
  const pageType = document.body.dataset.page;
  const isIndex = !pageType || pageType === 'index';

  if (isIndex) {
    initScrollReveals();
    initParallax();
    initProjectCards();
    initServiceCards();
  }

  initContactForm();
  initFilterBar();
  init3DTilt();

  initPreloader();
});


function initPreloader() {
  
  const pageType = document.body.dataset.page;
  if (pageType && pageType !== 'index') {
    initSkeletalLoader();
    return;
  }

  const preloader = document.getElementById('preloader');
  if (!preloader) {
    initHeroAnimation();
    return;
  }

  
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  if (window._lenis) window._lenis.stop();

  const progressText = preloader.querySelector('.loader-progress');
  const logoText = preloader.querySelector('.loader-logo span');

  
  
  
  
  let gateA = false; 
  let gateB = false; 

  function tryPlayOutro() {
    if (!gateA || !gateB) return; 
    playOutro();
  }

  function openGateB() {
    if (gateB) return; 
    gateB = true;
    if (progressText && progressText.innerText === '100%') {
      progressText.innerText = 'Ready';
    }
    tryPlayOutro();
  }

  function playOutro() {
    
    preloader.style.transform = 'translateY(-100%)';

    
    setTimeout(() => {
      initHeroAnimation();
    }, 300);

    
    setTimeout(() => {
      preloader.style.display = 'none';
      
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window._lenis) window._lenis.start();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 900);
  }

  
  let progress = { value: 0 };
  gsap.to(progress, {
    value: 100,
    duration: 2.2,
    ease: "power2.inOut",
    onUpdate: () => {
      if (progressText) progressText.innerText = Math.round(progress.value) + '%';
    },
    onComplete: () => {
      gateA = true;
      
      if (!gateB && progressText) progressText.innerText = 'Loading…';
      tryPlayOutro();
    }
  });

  
  const splineIframe = document.getElementById('spline-iframe');
  
  const SPLINE_TIMEOUT_MS = 9000;
  let splineTimer = null;

  if (splineIframe) {
    splineTimer = setTimeout(openGateB, SPLINE_TIMEOUT_MS);

    splineIframe.addEventListener('load', () => {
      clearTimeout(splineTimer);
      
      
      setTimeout(openGateB, 500);
    });

    
    if (
      splineIframe.contentDocument &&
      splineIframe.contentDocument.readyState === 'complete'
    ) {
      clearTimeout(splineTimer);
      setTimeout(openGateB, 500);
    }
  } else {
    
    openGateB();
  }

  
  if (logoText) {
    gsap.fromTo(logoText,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "expo.out", delay: 0.2 }
    );
  }
}


function initSkeletalLoader() {
  const pageType = document.body.dataset.page;
  if (!pageType || pageType === 'index') return;

  
  document.body.classList.add('skeleton-active');
  document.body.style.overflow = 'hidden';
  if (window._lenis) window._lenis.stop();

  
  if (sessionStorage.getItem('skipSkeleton') === 'true') {
    sessionStorage.removeItem('skipSkeleton');
    
    
    const mainContent = document.querySelector('main#swup');
    if (mainContent) {
      mainContent.style.opacity = '0';
      mainContent.style.transform = 'translateY(30px)';
    }

    setTimeout(() => {
      document.body.classList.remove('skeleton-active');
      gsap.set('main#swup', { opacity: 0, visibility: 'visible', y: 30 });
      
      initScrollReveals();
      initParallax();
      initProjectCards();
      initServiceCards();
      initHeroAnimation();
      
      gsap.to('main#swup', { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.1, clearProps: "transform" });
      
      document.body.style.overflow = '';
      if (window._lenis) window._lenis.start();
    }, 50);

    return;
  }

  
  const overlay = document.createElement('div');
  overlay.id = 'skeleton-loader';
  overlay.className = 'skeleton-overlay';

  let skeletonHTML = '';

  
  if (pageType === 'about') {
    skeletonHTML = `
      <div class="skeleton-container">
        <div style="padding: 4rem 0 2rem;">
          <div class="skeleton-block" style="width: 80px; height: 14px; margin-bottom: 1rem;"></div>
          <div class="skeleton-block" style="width: 45%; height: 56px; margin-bottom: 1.5rem; border-radius: var(--radius-sm);"></div>
          <div class="skeleton-block" style="width: 60%; height: 20px; margin-bottom: 0.75rem;"></div>
          <div class="skeleton-block" style="width: 40%; height: 20px; margin-bottom: 2.5rem;"></div>
        </div>
      </div>
    `;
  } else if (pageType === 'work') {
    skeletonHTML = `
      <div class="skeleton-container">
        <!-- Banner Skeleton -->
        <div style="padding: 4rem 0 2rem;">
          <div class="skeleton-block" style="width: 80px; height: 14px; margin-bottom: 1rem;"></div>
          <div class="skeleton-block" style="width: 45%; height: 56px; margin-bottom: 1.5rem; border-radius: var(--radius-sm);"></div>
          <div class="skeleton-block" style="width: 60%; height: 20px; margin-bottom: 0.75rem;"></div>
          <div class="skeleton-block" style="width: 40%; height: 20px; margin-bottom: 2.5rem;"></div>
          
          <!-- Filter Pills Skeleton -->
          <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
            <div class="skeleton-block" style="width: 60px; height: 32px; border-radius: var(--radius-md);"></div>
            <div class="skeleton-block" style="width: 80px; height: 32px; border-radius: var(--radius-md);"></div>
            <div class="skeleton-block" style="width: 70px; height: 32px; border-radius: var(--radius-md);"></div>
            <div class="skeleton-block" style="width: 75px; height: 32px; border-radius: var(--radius-md);"></div>
          </div>
        </div>

        <!-- Grid of Project Cards Skeleton -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2.5rem; padding: 2rem 0;">
          ${Array(4).fill().map(() => `
            <div class="skeleton-card">
              <div class="skeleton-block" style="width: 100%; height: 220px; border-radius: 0;"></div>
              <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; gap: 0.85rem; box-sizing: border-box;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <div class="skeleton-block" style="width: 50%; height: 22px;"></div>
                  <div class="skeleton-block" style="width: 50px; height: 18px; border-radius: var(--radius-sm);"></div>
                </div>
                <div class="skeleton-block" style="width: 100%; height: 15px;"></div>
                <div class="skeleton-block" style="width: 95%; height: 15px;"></div>
                <div class="skeleton-block" style="width: 70%; height: 15px; margin-bottom: 1rem;"></div>
                <div style="display: flex; gap: 0.5rem; margin-top: auto; flex-wrap: wrap;">
                  <div class="skeleton-block" style="width: 48px; height: 18px; border-radius: var(--radius-sm);"></div>
                  <div class="skeleton-block" style="width: 48px; height: 18px; border-radius: var(--radius-sm);"></div>
                  <div class="skeleton-block" style="width: 48px; height: 18px; border-radius: var(--radius-sm);"></div>
                </div>
                <div class="skeleton-block" style="width: 100px; height: 36px; border-radius: var(--radius-md); margin-top: 1rem;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (pageType === 'services') {
    skeletonHTML = `
      <div class="skeleton-container">
        <!-- Banner Skeleton -->
        <div style="padding: 4rem 0 2rem;">
          <div class="skeleton-block" style="width: 100px; height: 14px; margin-bottom: 1rem;"></div>
          <div class="skeleton-block" style="width: 40%; height: 56px; margin-bottom: 1.5rem; border-radius: var(--radius-sm);"></div>
          <div class="skeleton-block" style="width: 55%; height: 20px; margin-bottom: 0.75rem;"></div>
          <div class="skeleton-block" style="width: 45%; height: 20px; margin-bottom: 2.5rem;"></div>
        </div>

        <!-- Service Cards Split Skeleton -->
        <div style="display: flex; flex-direction: column; gap: 2.2rem; padding: 1rem 0;">
          ${Array(3).fill().map(() => `
            <div class="skeleton-card skeleton-service-card">
              <!-- Left block -->
              <div class="skeleton-service-left" style="width: 240px; background: rgba(0, 0, 0, 0.03); padding: 2.5rem 2rem; display: flex; flex-direction: column; gap: 1rem; border-right: 2px solid rgba(0, 0, 0, 0.06); box-sizing: border-box; justify-content: center; flex-shrink: 0;">
                <div class="skeleton-block" style="width: 32px; height: 32px; border-radius: var(--radius-sm);"></div>
                <div class="skeleton-block" style="width: 85%; height: 20px;"></div>
              </div>
              <!-- Right block -->
              <div style="flex: 1; padding: 2.5rem; display: flex; flex-direction: column; gap: 0.85rem; box-sizing: border-box; justify-content: center;">
                <div class="skeleton-block" style="width: 100%; height: 16px;"></div>
                <div class="skeleton-block" style="width: 95%; height: 16px;"></div>
                <div class="skeleton-block" style="width: 80%; height: 16px;"></div>
                <div class="skeleton-block" style="width: 60%; height: 16px; margin-top: 0.5rem;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (pageType === 'lab') {
    skeletonHTML = `
      <div class="skeleton-container">
        <!-- Banner Skeleton -->
        <div style="padding: 4rem 0 2rem;">
          <div class="skeleton-block" style="width: 85px; height: 28px; margin-bottom: 1.5rem; border-radius: var(--radius-md);"></div>
          <div class="skeleton-block" style="width: 35%; height: 56px; margin-bottom: 1.5rem; border-radius: var(--radius-sm);"></div>
          <div class="skeleton-block" style="width: 50%; height: 20px; margin-bottom: 0.75rem;"></div>
          <div class="skeleton-block" style="width: 40%; height: 20px; margin-bottom: 2.5rem;"></div>
        </div>

        <!-- Snippets Label -->
        <div class="skeleton-block" style="width: 100px; height: 14px; margin-bottom: 1rem;"></div>
        <div class="skeleton-block" style="width: 300px; height: 32px; margin-bottom: 0.75rem;"></div>
        <div class="skeleton-block" style="width: 420px; height: 16px; margin-bottom: 2.5rem;"></div>

        <!-- Snippets Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
          ${Array(4).fill().map(() => `
            <div class="skeleton-card" style="padding: 1.5rem; text-align: center; align-items: center; gap: 1rem;">
              <div class="skeleton-block" style="width: 100%; height: 160px; border-radius: var(--radius-md);"></div>
              <div class="skeleton-block" style="width: 60%; height: 18px;"></div>
              <div class="skeleton-block" style="width: 45%; height: 14px;"></div>
            </div>
          `).join('')}
        </div>

        <hr style="border: none; border-top: 1px dashed rgba(26,32,38,0.15); margin: 3rem 0;" />

        <!-- Side Projects Section -->
        <div class="skeleton-block" style="width: 120px; height: 14px; margin-bottom: 1rem;"></div>
        <div class="skeleton-block" style="width: 260px; height: 32px; margin-bottom: 0.75rem;"></div>
        <div class="skeleton-block" style="width: 380px; height: 16px; margin-bottom: 2.5rem;"></div>

        <!-- Sticky Notes Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem;">
          <div class="skeleton-card" style="padding: 2rem; gap: 1rem; background: #DCE5EB; border: none; box-shadow: var(--shadow-md);">
            <div class="skeleton-block" style="width: 80px; height: 14px; background: rgba(0,0,0,0.05);"></div>
            <div class="skeleton-block" style="width: 50%; height: 22px; background: rgba(0,0,0,0.06);"></div>
            <div class="skeleton-block" style="width: 100%; height: 16px; background: rgba(0,0,0,0.04);"></div>
            <div class="skeleton-block" style="width: 85%; height: 16px; background: rgba(0,0,0,0.04);"></div>
          </div>
          <div class="skeleton-card" style="padding: 2rem; gap: 1rem; background: #C8D6DF; border: none; box-shadow: var(--shadow-md);">
            <div class="skeleton-block" style="width: 80px; height: 14px; background: rgba(0,0,0,0.05);"></div>
            <div class="skeleton-block" style="width: 50%; height: 22px; background: rgba(0,0,0,0.06);"></div>
            <div class="skeleton-block" style="width: 100%; height: 16px; background: rgba(0,0,0,0.04);"></div>
            <div class="skeleton-block" style="width: 85%; height: 16px; background: rgba(0,0,0,0.04);"></div>
          </div>
        </div>
      </div>
    `;
  } else if (pageType === 'contact') {
    skeletonHTML = `
      <div class="skeleton-container">
        <!-- Banner Skeleton -->
        <div style="padding: 4rem 0 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
          <div class="skeleton-block" style="width: 100px; height: 14px;"></div>
          <div class="skeleton-block" style="width: 55%; height: 56px; border-radius: var(--radius-sm);"></div>
          <div class="skeleton-block" style="width: 50%; height: 20px;"></div>
          <div class="skeleton-block" style="width: 40%; height: 20px; margin-bottom: 1rem;"></div>
          
          <!-- Response Badge -->
          <div class="skeleton-block" style="width: 220px; height: 36px; border-radius: var(--radius-md);"></div>
        </div>

        <!-- Social Contact Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; margin-bottom: 3.5rem;">
          ${Array(4).fill().map(() => `
            <div class="skeleton-card" style="padding: 1.5rem; align-items: center; gap: 0.85rem;">
              <div class="skeleton-block" style="width: 44px; height: 44px; border-radius: 50%;"></div>
              <div class="skeleton-block" style="width: 60px; height: 16px;"></div>
            </div>
          `).join('')}
        </div>

        <!-- Letter-style Form Block -->
        <div class="skeleton-card" style="max-width: 720px; margin: 0 auto; padding: 3rem 3.5rem; gap: 1.8rem; box-shadow: 0 20px 40px rgba(0,0,0,0.03);">
          <div class="skeleton-block" style="width: 120px; height: 36px;"></div>
          <div class="skeleton-block" style="width: 100%; height: 1px; background: rgba(0,0,0,0.08);"></div>
          <div class="skeleton-block" style="width: 100%; height: 16px;"></div>
          <div class="skeleton-block" style="width: 80%; height: 16px; margin-bottom: 1rem;"></div>
          
          <div class="skeleton-block" style="width: 100%; height: 52px; border-radius: var(--radius-md);"></div>
          <div class="skeleton-block" style="width: 100%; height: 52px; border-radius: var(--radius-md);"></div>
          <div class="skeleton-block" style="width: 100%; height: 52px; border-radius: var(--radius-md);"></div>
          <div class="skeleton-block" style="width: 100%; height: 130px; border-radius: var(--radius-md);"></div>
          <div class="skeleton-block" style="width: 100%; height: 52px; border-radius: var(--radius-md);"></div>
        </div>
      </div>
    `;
  }

  overlay.innerHTML = skeletonHTML;
  document.body.prepend(overlay);

  
  setTimeout(() => {
    if (window.gsap) {
      
      document.body.classList.remove('skeleton-active');
      
      gsap.set('main#swup', { opacity: 0, visibility: 'visible' });

      
      initScrollReveals();
      initParallax();
      initProjectCards();
      initServiceCards();
      initHeroAnimation();

      
      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }

      const outroTl = gsap.timeline({
        onComplete: () => {
          overlay.remove();
          document.body.style.overflow = '';
          if (window._lenis) window._lenis.start();
          if (window.ScrollTrigger) {
            ScrollTrigger.refresh();
          }
        }
      });

      
      outroTl.to(overlay.querySelectorAll('.skeleton-block, .skeleton-card'), {
        opacity: 0,
        y: -15,
        duration: 0.25,
        stagger: 0.02,
        ease: "power2.in"
      })
        .to(overlay, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut"
        }, "-=0.15")
        .to('main#swup', {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out"
        }, "-=0.15");
    } else {
      
      document.body.classList.remove('skeleton-active');
      overlay.style.opacity = '0';
      const mainContent = document.querySelector('main#swup');
      if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
      }
      initScrollReveals();
      initParallax();
      initProjectCards();
      initServiceCards();
      initHeroAnimation();
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = '';
      }, 300);
    }
  }, 200); 
}


if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  });
}


