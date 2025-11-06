// script.js
document.addEventListener('DOMContentLoaded', function() {

  /* ---------- Drawer / hamburger ---------- */
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

    drawer.querySelectorAll && drawer.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=> {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
      });
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
      }
    });

    window.addEventListener('resize', function(){
      if(window.innerWidth > 768) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
      }
    });
  }

  // Bind drawers (IDs differ per page)
  wireDrawer('hamburger', 'mobileDrawer', 'drawerClose');
  wireDrawer('hamburger-about', 'mobileDrawerAbout', 'drawerCloseAbout');
  wireDrawer('hamburger-contact', 'mobileDrawerContact', 'drawerCloseContact');

  /* ---------- Desktop header scroll ---------- */
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero-img');

  if(header) {
    function onScrollHeader(){
      if(hero) {
        if(window.scrollY > 30) {
          header.classList.remove('transparent');
          header.classList.add('solid');
        } else {
          header.classList.remove('solid');
          header.classList.add('transparent');
        }
      } else {
        header.classList.remove('transparent');
        header.classList.add('solid');
      }
    }
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader);
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  if(form){
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.style.display = 'none';
          if(successMessage) successMessage.style.display = 'block';
        } else {
          alert('Oops! There was a problem submitting your form.');
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your form.');
        console.error(error);
      }
    });
  }

  /* ---------- Lightbox for gallery ---------- */
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

    lb.addEventListener('click', (e)=> { if(e.target === lb) lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); });
    document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); });
  }

  /* ---------- Our Services Flip (Option C) ---------- */
  const cards = document.querySelectorAll(".card-inner");
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if(cards.length){
    if(isMobile){
      // MOBILE = TAP TO FLIP, ignore scroll
      cards.forEach(card => {
        let startY = 0, endY = 0;

        card.parentElement.addEventListener("touchstart", e => { startY = e.touches[0].clientY; });
        card.parentElement.addEventListener("touchmove", e => { endY = e.touches[0].clientY; });
        card.parentElement.addEventListener("touchend", () => {
          if(Math.abs(startY - endY) < 10){ // only flip if tap, not scroll
            card.classList.toggle("flip");
          }
        });
      });
    } else {
      // DESKTOP = Hover + scroll flip
      // Optional: hover
      cards.forEach(card => {
        card.parentElement.addEventListener("mouseenter", () => card.classList.add("flip"));
        card.parentElement.addEventListener("mouseleave", () => card.classList.remove("flip"));
      });

      // Optional: scroll flip (uncomment if needed)
      /*
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if(entry.isIntersecting){
              entry.target.classList.add("flip");
            } else {
              entry.target.classList.remove("flip");
            }
          });
        },
        { threshold: 0.6 }
      );
      cards.forEach(card => observer.observe(card));
      */
    }
  }

});

