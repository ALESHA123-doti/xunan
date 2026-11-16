// GitHub Pages uses the public CNY/RUB feed.
window.XUNAN_CONFIG = { leadEmail: "xunanautomobiletrade54@gmail.com" };

const cnyStorageKey = 'xunan-cbr-cny-rate';
const cnyDateFormat = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Asia/Novosibirsk', year: 'numeric', month: '2-digit', day: '2-digit'
});
const validCnyValue = value => Number.isFinite(value) && value > 0;
const validCnyDate = date => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date);
const todayCnyDate = () => cnyDateFormat.format(new Date()).split('.').reverse().join('-');

function readCnyRate() {
  try {
    const saved = JSON.parse(localStorage.getItem(cnyStorageKey));
    if (validCnyValue(saved?.value) && validCnyDate(saved.sourceDate)
      && saved.sourceDate <= todayCnyDate()) return saved;
  } catch {
    // Browser storage may be unavailable.
  }
  return { value: null, sourceDate: '' };
}

window.XUNAN_RATE = readCnyRate();

function formatCnyRubPrice(priceCny, rate, suffix = '') {
  if (!validCnyValue(rate)) return '';
  return `≈ ${Math.round(priceCny * rate).toLocaleString('ru-RU')} ₽ по курсу ЦБ${suffix}`;
}

function paintCnyRate() {
  const { value } = window.XUNAN_RATE;
  const available = validCnyValue(value);
  document.querySelectorAll('#cnyRate').forEach(el => {
    el.textContent = available
      ? value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
      : 'курс недоступен';
  });
  document.querySelectorAll('#cnyRateDate').forEach(el => {
    el.textContent = available ? 'ЦБ РФ · на ' + cnyDateFormat.format(new Date()) : '';
  });
}

async function updateCnyRate() {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
      cache: 'no-store', signal: controller.signal
    });
    if (!response.ok) throw new Error('Rate feed unavailable');
    const data = await response.json();
    const cny = data?.Valute?.CNY;
    const today = todayCnyDate();
    const publishedDate = String(data?.Date || '').slice(0, 10);
    if (!validCnyDate(publishedDate)) throw new Error('Invalid rate date');
    const usePrevious = publishedDate > today;
    const sourceDate = usePrevious ? String(data?.PreviousDate || '').slice(0, 10) : publishedDate;
    const value = Number(usePrevious ? cny?.Previous : cny?.Value) / Number(cny?.Nominal);
    if (!validCnyValue(value) || !validCnyDate(sourceDate) || sourceDate > today) {
      throw new Error('Invalid CNY rate');
    }

    const saved = readCnyRate();
    if (saved.sourceDate > window.XUNAN_RATE.sourceDate) window.XUNAN_RATE = saved;
    if (sourceDate >= window.XUNAN_RATE.sourceDate) {
      window.XUNAN_RATE = { value, sourceDate };
      try {
        localStorage.setItem(cnyStorageKey, JSON.stringify(window.XUNAN_RATE));
      } catch {
        // Keep the latest rate in memory when storage is unavailable.
      }
    }
  } catch {
    const saved = readCnyRate();
    if (saved.sourceDate > window.XUNAN_RATE.sourceDate) window.XUNAN_RATE = saved;
  } finally {
    window.clearTimeout(timeout);
  }
  paintCnyRate();
  window.dispatchEvent(new CustomEvent('xunan-rate-updated', { detail: window.XUNAN_RATE }));
  return window.XUNAN_RATE;
}

if (validCnyValue(window.XUNAN_RATE.value)) paintCnyRate();
window.XUNAN_RATE_READY = updateCnyRate();
window.setInterval(updateCnyRate, 30 * 60 * 1000);
window.setInterval(() => {
  if (validCnyValue(window.XUNAN_RATE.value)) paintCnyRate();
}, 60 * 1000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    if (validCnyValue(window.XUNAN_RATE.value)) paintCnyRate();
    updateCnyRate();
  }
});
