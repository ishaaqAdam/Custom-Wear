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

  // Bind drawer for each page instance (IDs differ per page)
  wireDrawer('hamburger', 'mobileDrawer', 'drawerClose');
  wireDrawer('hamburger-about', 'navMenuAbout', 'drawerCloseAbout');
  wireDrawer('hamburger-contact', 'navMenuContact', 'drawerCloseContact');
  
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

  /* ---------- contact form ---------- */
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.style.display = 'none'; // hide form
        successMessage.style.display = 'block'; // show success message
      } else {
        alert('Oops! There was a problem submitting your form.');
      }
    } catch (error) {
      alert('Oops! There was a problem submitting your form.');
      console.error(error);
    }
  });


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

  /* ---------- Feature logo scroll ---------- */
if (window.innerWidth <= 768) {
  const logos = document.querySelector('.featured-logos');
  logos.innerHTML += logos.innerHTML; // duplicate logos for smooth scroll
}

  /* ---------- Our services flip ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-inner");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-flip");   // flip when in view
        } else {
          entry.target.classList.remove("scroll-flip"); // unflip when out of view
        }
      });
    },
    {
      threshold: 0.6 // flip when 60% of card is visible
    }
  );

  cards.forEach((card) => observer.observe(card));
});

/* --- best sellers--- */

const track = document.querySelector('.bs-slider-track');
const slides = Array.from(document.querySelectorAll('.bs-slide'));
const btnLeft = document.querySelector('.bs-left');
const btnRight = document.querySelector('.bs-right');

let index = 1;
let width = slides[0].clientWidth;

/* ✅ Clone first and last for infinite loop */
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, track.firstChild);

/* Start position */
track.style.transform = `translateX(-${width * index}px)`;

/* Arrow navigation */
btnRight.addEventListener('click', () => {
  if (index >= slides.length + 1) return;
  index++;
  track.style.transition = "0.45s ease";
  track.style.transform = `translateX(-${width * index}px)`;
});

btnLeft.addEventListener('click', () => {
  if (index <= 0) return;
  index--;
  track.style.transition = "0.45s ease";
  track.style.transform = `translateX(-${width * index}px)`;
});

/* Loop correction */
track.addEventListener('transitionend', () => {
  if (slides[index - 1] === firstClone) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${width * index}px)`;
  }
  if (slides[index - 1] === lastClone) {
    track.style.transition = "none";
    index = slides.length;
    track.style.transform = `translateX(-${width * index}px)`;
  }
});

/* Resize fix */
window.addEventListener('resize', () => {
  width = slides[0].clientWidth;
  track.style.transition = "none";
  track.style.transform = `translateX(-${width * index}px)`;
});
