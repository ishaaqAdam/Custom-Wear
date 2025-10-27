// script.js — hamburger drawer + desktop header behavior + lightbox
document.addEventListener('DOMContentLoaded', function(){

  /* ---------- Drawer / hamburger (works on all pages) ---------- */
  function wireDrawer(hamburgerId, drawerId, closeId) {
    const ham = document.getElementById(hamburgerId);
    const drawer = document.getElementById(drawerId);
    const closeBtn = document.getElementById(closeId);

    if(!ham || !drawer) return;

    ham.addEventListener('click', function(){
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden','false');
    });

    if(closeBtn){
      closeBtn.addEventListener('click', function(){
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
      });
    }

    // Close when clicking a link inside drawer
    drawer.querySelectorAll && drawer.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=> {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
      });
    });

    // Close on ESC
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function(){
      if(window.innerWidth > 768) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
      }
    });
  }
  
if(window.innerWidth <= 768){
  const galleryWrapper = document.querySelector('.gallery-wrapper');
  const gallery = galleryWrapper.querySelector('.gallery');
  const dotsContainer = galleryWrapper.querySelector('.gallery-dots');
  const cards = gallery.querySelectorAll('.card');

  // Create dots dynamically
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    if(i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('span');

  // Update dots on scroll
  galleryWrapper.addEventListener('scroll', () => {
    const scrollLeft = galleryWrapper.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 10; // include gap
    const index = Math.round(scrollLeft / cardWidth);
    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[index]) dots[index].classList.add('active');
  });

  // Auto-scroll every 3s
  let autoIndex = 0;
  setInterval(() => {
    autoIndex++;
    if(autoIndex >= cards.length) autoIndex = 0;
    galleryWrapper.scrollTo({ left: autoIndex * (cards[0].offsetWidth + 10), behavior: 'smooth' });
  }, 3000);
}

  // Bind drawer for each page instance (IDs differ per page)
  wireDrawer('hamburger', 'mobileDrawer', 'drawerClose');
  wireDrawer('hamburger-about', 'mobileDrawerAbout', 'drawerCloseAbout');
  wireDrawer('hamburger-contact', 'mobileDrawerContact', 'drawerCloseContact');

 /* ---------- Desktop header: scroll behavior only on homepage ---------- */
const header = document.querySelector('.header');
const hero = document.querySelector('.hero-img');

if(hero) {
  // Home page logic (hero exists → transparent allowed)
  function onScrollHeader(){
    if(window.scrollY > 30) {
      header.classList.remove('transparent');
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
      header.classList.add('transparent');
    }
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader);
} else {
  // No hero (like About / Contact) → always solid
  header.classList.remove('transparent');
  header.classList.add('solid');
}


  /* ---------- Lightbox for gallery on homepage ---------- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImage');
  const lbCap = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');

  if(lb){
    document.querySelectorAll('.gallery .card').forEach(card=>{
      card.addEventListener('click', function(){
        const img = card.querySelector('img');
        if(!img) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        lbCap.textContent = card.dataset.caption || img.alt || '';
        lb.classList.add('open');
        lb.setAttribute('aria-hidden','false');
      });
    });

    if(lbClose){
      lbClose.addEventListener('click', ()=> { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); });
    }
    lb.addEventListener('click', (e)=> { if(e.target === lb) { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }});
    document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }});
  }

});
