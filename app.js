const $ = selector => document.querySelector(selector);
const fmt = value => new Intl.NumberFormat('ru-RU').format(value);
const normalizeEngineLabel = value => String(value || '').replace(/\b(\d+(?:[.,]\d+)?)\s*[TL]\b/gi, (_, size) => `${size.replace('.', ',')} л`);
const cars = window.XUNAN_CARS || [];
const grid = $('#carGrid');

if (grid) {
  const brand = $('#brandFilter');
  [...new Set(cars.map(car => car.make))].forEach(make => brand.insertAdjacentHTML('beforeend', `<option>${make}</option>`));

  const lastYear = Math.max(new Date().getFullYear(), ...cars.map(car => Number(car.year) || 2020));
  ['yearFrom', 'yearTo'].forEach(id => {
    const select = $(`#${id}`);
    for (let year = 2020; year <= lastYear; year++) {
      select.insertAdjacentHTML('beforeend', `<option value="${year}">${year}</option>`);
    }
  });

  function render() {
    const query = $('#search').value.toLowerCase();
    let list = cars.filter(car => {
      const fuel = 'Бензин';
      const drive = 'Передний';
      return (!brand.value || car.make === brand.value)
        && (!query || `${car.title} ${car.trim}`.toLowerCase().includes(query))
        && (!$('#fuelFilter').value || fuel === $('#fuelFilter').value)
        && (!$('#driveFilter').value || drive === $('#driveFilter').value)
        && (!$('#yearFrom').value || car.year >= +$('#yearFrom').value)
        && (!$('#yearTo').value || car.year <= +$('#yearTo').value)
        && (!$('#priceFrom').value || car.priceCNY >= +$('#priceFrom').value)
        && (!$('#priceTo').value || car.priceCNY <= +$('#priceTo').value);
    });

    const sort = $('#sort').value;
    if (sort === 'cheap') list.sort((a, b) => a.priceCNY - b.priceCNY);
    if (sort === 'expensive') list.sort((a, b) => b.priceCNY - a.priceCNY);
    if (sort === 'new') list.sort((a, b) => (b.year || 0) - (a.year || 0));
    $('#resultCount').textContent = `Найдено: ${list.length} автомобилей из ${cars.length}`;
    const rate = window.XUNAN_RATE.value;
    grid.innerHTML = list.map(car => `<article class="car-card"><div class="car-image"><img src="assets/cars/${car.id}/01.jpg${Number(car.id) === 8 ? '?v=right-facing-1' : ''}" alt="${car.title}, внешний вид" loading="lazy"></div><div class="car-content"><h3>${car.title}</h3><div class="car-trim">${normalizeEngineLabel(car.trim)}</div><div class="car-meta">${car.color}　·　${fmt(car.mileage)} км　·　${normalizeEngineLabel(car.engine)}</div><strong class="car-price">${fmt(car.priceCNY)} ¥</strong><small class="rub-price">≈ ${fmt(Math.round(car.priceCNY * rate))} ₽ по курсу ЦБ*</small><a class="button button-outline" href="vehicle.html?id=${car.id}">Подробнее</a></div></article>`).join('') || '<p class="muted">По выбранным условиям автомобили не найдены.</p>';
    grid.querySelectorAll('.car-image img').forEach(img => {
      img.onerror = () => {
        const placeholder = document.createElement('span');
        placeholder.textContent = 'Фото скоро появится';
        img.replaceWith(placeholder);
      };
    });
  }

  window.XUNAN_RATE_READY.then(render);
  window.addEventListener('xunan-rate-updated', render);
  ['brandFilter', 'fuelFilter', 'driveFilter', 'yearFrom', 'yearTo', 'priceFrom', 'priceTo', 'sort'].forEach(id => $(`#${id}`).addEventListener('change', render));
  $('#applyFilters').onclick = render;
  $('#applySearch').onclick = render;
  $('#search').onkeydown = event => { if (event.key === 'Enter') render(); };
  $('#resetFilters').onclick = () => {
    ['brandFilter', 'fuelFilter', 'driveFilter', 'yearFrom', 'yearTo', 'priceFrom', 'priceTo', 'search'].forEach(id => $(`#${id}`).value = '');
    render();
  };
}

const menu = $('.menu-toggle');
if (menu) menu.onclick = () => document.querySelector('.topbar nav').classList.toggle('open');
document.querySelectorAll('.topbar nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.topbar nav').classList.remove('open')));
