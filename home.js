const hero = document.querySelector('.hero');
const slides = [...hero.querySelectorAll('.hero-slide')];
const dots = [...hero.querySelectorAll('.slide-dots button')];
const counter = hero.querySelector('.slide-counter');
const pauseButton = hero.querySelector('.slide-pause');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0, timer, paused = reducedMotion.matches;
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, n) => {
    const active = n === current;
    slide.classList.toggle('active', active);
    slide.inert = !active;
    slide.setAttribute('aria-hidden', String(!active));
    slide.querySelectorAll('video').forEach(video => {
      if (active && !paused && !reducedMotion.matches) video.play().catch(() => {});
      else video.pause();
    });
  });
  dots.forEach((dot, n) => {
    dot.classList.toggle('active', n === current);
    dot.setAttribute('aria-current', String(n === current));
  });
  counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}
function schedule() {
  clearInterval(timer);
  if (!paused && !document.hidden && !hero.matches(':hover') && !hero.contains(document.activeElement))
    timer = setInterval(() => showSlide(current + 1), 7000);
}
function navigate(index) { showSlide(index); schedule(); }
hero.querySelector('.prev').onclick = () => navigate(current - 1);
hero.querySelector('.next').onclick = () => navigate(current + 1);
dots.forEach((dot, n) => dot.onclick = () => navigate(n));
function updatePause() {
  pauseButton.textContent = paused ? 'Продолжить' : 'Пауза';
  pauseButton.setAttribute('aria-pressed', String(paused));
  pauseButton.setAttribute('aria-label', paused ? 'Продолжить смену слайдов' : 'Приостановить смену слайдов');
  showSlide(current); schedule();
}
pauseButton.onclick = () => { paused = !paused; updatePause(); };
hero.addEventListener('mouseenter', schedule);
hero.addEventListener('mouseleave', schedule);
hero.addEventListener('focusin', schedule);
hero.addEventListener('focusout', () => setTimeout(schedule, 0));
document.addEventListener('visibilitychange', schedule);
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updatePause(); });
updatePause();

const fmt=n=>new Intl.NumberFormat('ru-RU').format(n),featured=document.querySelector('#featuredCars');
function addPhotoFallbacks(){document.querySelectorAll('.car-image img').forEach(img=>img.onerror=()=>{img.remove();const link=img.parentElement;link.classList.add('no-photo');link.textContent='Фото скоро появится'});}
function renderFeatured(rate){
  const cars=window.XUNAN_CARS||[];
  if(!featured)return;
  featured.innerHTML=cars.slice(0,3).map(c=>'<article class="car-card"><div class="car-image"><a class="car-image-link" href="vehicle.html?id='+c.id+'" aria-label="Открыть '+c.title+'"><img src="assets/cars/'+c.id+'/01.jpg" alt="'+c.title+'" loading="lazy"></a></div><div class="car-content"><h3>'+c.title+'</h3><div class="car-trim">'+c.trim+'</div><div class="car-meta">'+c.color+'　·　'+fmt(c.mileage)+' км　·　'+c.engine+'</div><strong class="car-price">'+fmt(c.priceCNY)+' ¥</strong><small class="rub-price">≈ '+fmt(Math.round(c.priceCNY*rate.value))+' ₽ по курсу ЦБ</small><a class="button button-outline" href="vehicle.html?id='+c.id+'">Подробнее</a></div></article>').join('');
  addPhotoFallbacks();
}
featured?.addEventListener('error',()=>{},true);
function addPhotoFallbacks(){document.querySelectorAll('.car-image img').forEach(img=>img.onerror=()=>{img.remove();const link=img.parentElement;link.classList.add('no-photo');link.textContent='Фото скоро появится'});}
window.XUNAN_RATE_READY.then(renderFeatured);
window.addEventListener('xunan-rate-updated',event=>renderFeatured(event.detail));
const menu=document.querySelector('.menu-toggle');
if(menu)menu.onclick=()=>document.querySelector('.topbar nav').classList.toggle('open');
document.querySelectorAll('.topbar nav a').forEach(a=>a.onclick=()=>document.querySelector('.topbar nav').classList.remove('open'));
const processCards=[...document.querySelectorAll('.process-steps article')];
if(processCards.length){
  let activeStep=0,stepTimer;
  function setActiveStep(index){activeStep=(index+processCards.length)%processCards.length;processCards.forEach((card,n)=>card.classList.toggle('is-highlighted',n===activeStep))}
  function startStepCycle(){clearInterval(stepTimer);stepTimer=setInterval(()=>setActiveStep(activeStep+1),2000)}
  processCards.forEach((card,index)=>{
    card.addEventListener('mouseenter',()=>{clearInterval(stepTimer);setActiveStep(index)});
    card.addEventListener('mouseleave',startStepCycle);
    card.addEventListener('focusin',()=>{clearInterval(stepTimer);setActiveStep(index)});
    card.addEventListener('focusout',event=>{if(!card.contains(event.relatedTarget))startStepCycle()});
  });
  setActiveStep(0);startStepCycle();
}