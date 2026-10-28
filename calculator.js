const $ = selector => document.querySelector(selector);
const fmt = value => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value);
const price = $('#calcPrice');
const rate = $('#calcRate');
const engineSize = $('#calcEngineSize');
const dutyInput = $('#calcDuty');
const brokerToggle = $('#brokerToggle');
const broker = 50000;
const duties = { '1.2': 195000, '1.4': 225000, '1.5': 240000, '2': 497000 };
const id = new URLSearchParams(location.search).get('id');
const cars = window.XUNAN_CARS || [];
const car = id !== null ? cars[Number(id)] : null;

function engineSizeFromCar(value) {
  const match = String(value || '').match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return '1.4';
  const size = Number(match[1].replace(',', '.'));
  return duties[String(size)] !== undefined ? String(size) : (size === 2 ? '2' : '1.4');
}

function applyDutyForEngine() {
  dutyInput.textContent = fmt(duties[engineSize.value] ?? duties['1.4']);
  render();
}

if (car) {
  $('#calcCarName').textContent = car.title;
  price.value = car.priceCNY;
  engineSize.value = engineSizeFromCar(car.engine);
}
dutyInput.textContent = fmt(duties[engineSize.value] ?? duties['1.4']);

function render() {
  const priceCny = Math.max(0, Number(price.value) || 0);
  const cnyRate = Math.max(0, Number(rate.value) || 0);
  const customsDuty = duties[engineSize.value] ?? duties['1.4'];
  const brokerFee = brokerToggle.checked ? broker : 0;
  const carRub = priceCny * cnyRate;
  const bankFee = carRub * 0.02;

  $('#lineCar').textContent = `${fmt(carRub)} ₽`;
  $('#lineBank').textContent = `${fmt(bankFee)} ₽`;
  $('#brokerValue').textContent = `${fmt(brokerFee)} ₽`;
  $('#brokerLabel').textContent = brokerFee ? 'с брокером' : 'без брокера';
  $('#totalValue').textContent = `${fmt(carRub + bankFee + customsDuty + brokerFee)} ₽`;
}

[price, rate, brokerToggle].forEach(element => element.addEventListener('input', render));
engineSize.addEventListener('change', applyDutyForEngine);
window.XUNAN_RATE_READY.then(result => {
  if (!rate.dataset.manual) rate.value = result.value;
  render();
});
window.addEventListener('xunan-rate-updated', event => {
  if (!rate.dataset.manual) {
    rate.value = event.detail.value;
    render();
  }
});
rate.addEventListener('input', () => { rate.dataset.manual = '1'; });
render();
const menu = $('.menu-toggle');
if (menu) menu.onclick = () => document.querySelector('.topbar nav').classList.toggle('open');
