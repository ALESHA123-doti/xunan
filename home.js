const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.slide-dots button')],counter=document.querySelector('.slide-counter');
let current=0;
function showSlide(i){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===current));dots.forEach((d,n)=>d.classList.toggle('active',n===current));counter.textContent='0'+(current+1)+' / 03'}
document.querySelector('.slide-arrow.prev').onclick=()=>showSlide(current-1);
document.querySelector('.slide-arrow.next').onclick=()=>showSlide(current+1);
dots.forEach((d,n)=>d.onclick=()=>showSlide(n));
let timer=setInterval(()=>showSlide(current+1),6000);
document.querySelector('.hero').addEventListener('mouseenter',()=>clearInterval(timer));
document.querySelector('.hero').addEventListener('mouseleave',()=>{clearInterval(timer);timer=setInterval(()=>showSlide(current+1),6000)});
document.querySelectorAll('.hero-slide').forEach((slide,index)=>{
  const slot=slide.querySelector('.hero-image-slot');
  if(!slot || slot.querySelector('img, video'))return;
  const img=document.createElement('img');
  img.src=`assets/hero/${String(index+1).padStart(2,'0')}.jpg`;
  img.alt='Автомобиль XUNAN';img.className='hero-photo-img';
  img.onerror=()=>img.remove();slot.prepend(img);
});
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