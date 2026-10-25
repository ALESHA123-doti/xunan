const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.slide-dots button')],counter=document.querySelector('.slide-counter');
let current=0;
function showSlide(i){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===current));dots.forEach((d,n)=>d.classList.toggle('active',n===current));counter.textContent='0'+(current+1)+' / 03'}
document.querySelector('.slide-arrow.prev').onclick=()=>showSlide(current-1);
document.querySelector('.slide-arrow.next').onclick=()=>showSlide(current+1);
dots.forEach((d,n)=>d.onclick=()=>showSlide(n));
let timer=setInterval(()=>showSlide(current+1),8000);
document.querySelector('.hero').addEventListener('mouseenter',()=>clearInterval(timer));
document.querySelector('.hero').addEventListener('mouseleave',()=>{clearInterval(timer);timer=setInterval(()=>showSlide(current+1),8000)});
const fmt=n=>new Intl.NumberFormat('ru-RU').format(n),featured=document.querySelector('#featuredCars');
function renderFeatured(rate){
  const cars=window.XUNAN_CARS||[];
  if(!featured)return;
  featured.innerHTML=cars.slice(0,3).map(c=>'<article class="car-card"><div class="car-image"><span>Место для фото</span></div><div class="car-content"><h3>'+c.title+'</h3><div class="car-trim">'+c.trim+'</div><div class="car-meta">'+c.color+'　·　'+fmt(c.mileage)+' км　·　'+c.engine+'</div><strong class="car-price">'+fmt(c.priceCNY)+' ¥</strong><small class="rub-price">≈ '+fmt(Math.round(c.priceCNY*rate.value))+' ₽ по курсу ЦБ</small><a class="button button-outline" href="vehicle.html?id='+c.id+'">Подробнее　→</a></div></article>').join('');
}
window.XUNAN_RATE_READY.then(renderFeatured);
window.addEventListener('xunan-rate-updated',event=>renderFeatured(event.detail));
const menu=document.querySelector('.menu-toggle');
if(menu)menu.onclick=()=>document.querySelector('.topbar nav').classList.toggle('open');
document.querySelectorAll('.topbar nav a').forEach(a=>a.onclick=()=>document.querySelector('.topbar nav').classList.remove('open'));