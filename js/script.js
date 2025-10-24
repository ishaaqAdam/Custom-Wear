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
  wireDrawer('hamburger-about', 'mobileDrawerAbout', 'drawerCloseAbout');
  wireDrawer('hamburger-contact', 'mobileDrawerContact', 'drawerCloseContact');

  /* ---------- Desktop header: add .solid on scroll ---------- */
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero-img');

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
