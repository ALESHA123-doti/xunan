const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.slide-dots button')],counter=document.querySelector('.slide-counter');
let current=0;
function showSlide(i){current=(i+slides.length)%slides.length;
  if (!matchMedia('(max-width: 700px)').matches) {
    const photo = slides[current].querySelector('img[data-src]');
    if (photo) {
      photo.srcset = photo.dataset.srcset;
      photo.removeAttribute('data-srcset');
      photo.src = photo.dataset.src;
      photo.removeAttribute('data-src');
    }
  }
  slides.forEach((s,n)=>s.classList.toggle('active',n===current));dots.forEach((d,n)=>d.classList.toggle('active',n===current));counter.textContent='0'+(current+1)+' / 03'}
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
function addPhotoFallbacks(){document.querySelectorAll('.car-image img').forEach(img=>img.onerror=()=>{img.remove();const link=img.parentElement;link.classList.add('no-photo');link.textContent='Ожидается загрузка фото…'});}
const mobileHomepage = matchMedia('(max-width: 700px)');
function renderFeatured(rate){
  const cars=window.XUNAN_CARS||[];
  if(!featured)return;
  featured.innerHTML=cars.slice(0,mobileHomepage.matches ? 5 : 3).map(c=>'<article class="car-card"><div class="car-image"><a class="car-image-link" href="vehicle.html?id='+c.id+'" aria-label="Открыть '+c.title+'"><img src="assets/cars/'+c.id+'/cover-640.webp" alt="'+c.title+'" loading="lazy"></a></div><div class="car-content"><h3>'+c.title+'</h3><div class="car-trim">'+c.trim+'</div><div class="car-meta">'+c.color+'　·　'+fmt(c.mileage)+' км　·　'+c.engine+'</div><strong class="car-price">'+fmt(c.priceCNY)+' ¥</strong><small class="rub-price">'+formatCnyRubPrice(c.priceCNY,rate.value)+'</small><a class="button button-outline" href="vehicle.html?id='+c.id+'">Подробнее</a></div></article>').join('');
  addPhotoFallbacks();
}
featured?.addEventListener('error',()=>{},true);
function addPhotoFallbacks(){document.querySelectorAll('.car-image img').forEach(img=>img.onerror=()=>{img.remove();const link=img.parentElement;link.classList.add('no-photo');link.textContent='Ожидается загрузка фото…'});}

function setupFeaturedCarousel() {
  const section = featured.closest('#featured');
  const process = document.querySelector('#process');
  const position = document.createComment('featured desktop position');
  section.before(position);
  const stockLabel = section.querySelector('.section-heading .eyebrow');
  const processHeading = process.querySelector('h2');
  const desktopLabel = stockLabel.textContent;
  const desktopProcessTitle = processHeading.textContent;
  const catalogCard = document.createElement('a');
  catalogCard.className = 'mobile-stock-catalog';
  catalogCard.href = 'catalog.html';
  const arrow = document.createElement('span');
  arrow.className = 'mobile-stock-catalog-icon';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '→';
  catalogCard.append(arrow, 'Перейти в каталог');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  let visible = false;
  let pointerDown = false;
  let active = 0;

  function offset(card) {
    return card.offsetLeft - featured.firstElementChild.offsetLeft;
  }

  function sync() {
    if (!mobileHomepage.matches || !featured.childElementCount) return;
    active = 0;
    Array.from(featured.children).forEach((card, index) => {
      if (Math.abs(offset(card) - featured.scrollLeft) <
          Math.abs(offset(featured.children[active]) - featured.scrollLeft)) active = index;
    });
  }

  function go(index, animated = false) {
    const card = featured.children[index];
    if (!card) return;
    const behavior = animated && !motion.matches ? 'smooth' : 'instant';
    featured.scrollTo({left: offset(card), behavior});
    sync();
  }

  function schedule() {
    clearTimeout(timer);
    if (!mobileHomepage.matches || motion.matches || !visible || pointerDown ||
        document.hidden || featured.childElementCount < 2 || featured.contains(document.activeElement)) return;
    timer = setTimeout(() => {
      const next = (active + 1) % featured.childElementCount;
      go(next, next !== 0);
      schedule();
    }, 5000);
  }

  function updateLayout() {
    const mobile = mobileHomepage.matches;
    renderFeatured(window.XUNAN_RATE);
    section.classList.toggle('mobile-stock', mobile);
    const orderCopy = document.querySelector('.mobile-order-copy');
    orderCopy.hidden = !mobile;
    stockLabel.textContent = mobile ? 'АВТО В НАЛИЧИИ' : desktopLabel;
    processHeading.textContent = mobile ? 'Этапы перевозки' : desktopProcessTitle;
    if (mobile) {
      process.before(section);
      if (featured.childElementCount) featured.append(catalogCard);
      featured.tabIndex = 0;
      featured.setAttribute('aria-label','Карточки автомобилей');
      go(0);
    } else {
      position.after(section);
      featured.removeAttribute('tabindex');
      featured.removeAttribute('aria-label');
    }
    schedule();
  }

  mobileHomepage.addEventListener('change',updateLayout);
  motion.addEventListener('change',schedule);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  },{threshold:.6}).observe(featured);
  featured.addEventListener('scroll',sync,{passive:true});
  featured.addEventListener('scrollend',schedule);
  featured.addEventListener('keydown',event => {
    if (event.target !== featured || !featured.childElementCount || !['ArrowRight','ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    go((active + direction + featured.childElementCount) % featured.childElementCount);
    schedule();
  });
  featured.addEventListener('pointerdown',() => { pointerDown = true; schedule(); });
  for (const name of ['pointerup','pointercancel']) {
    window.addEventListener(name,() => { if (pointerDown) { pointerDown = false; schedule(); } });
  }
  featured.addEventListener('focusin',schedule);
  featured.addEventListener('focusout',() => setTimeout(schedule,0));
  document.addEventListener('visibilitychange',schedule);
  updateLayout();
}

if (featured) setupFeaturedCarousel();

window.addEventListener('xunan-rate-updated', event => {
  const cars = window.XUNAN_CARS || [];
  featured?.querySelectorAll('.rub-price').forEach((price, index) => {
    price.textContent = formatCnyRubPrice(cars[index].priceCNY, event.detail.value);
  });
});
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
