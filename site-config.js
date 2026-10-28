// XUNAN site configuration and free CNY/RUB rate source.
// GitHub Pages cannot run /api routes, so use the public JSON feed instead.
window.XUNAN_CONFIG = { leadEmail: "xunanautomobiletrade54@gmail.com" };
window.XUNAN_RATE = { value: 12.61, date: "", fallback: true };

function paintCnyRate() {
  const rate = window.XUNAN_RATE;
  document.querySelectorAll('#cnyRate').forEach(el => {
    el.textContent = rate.value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  });
  document.querySelectorAll('#cnyRateDate').forEach(el => {
    el.textContent = rate.date ? 'ЦБ РФ · ' + rate.date : (rate.fallback ? 'резервный курс из таблицы' : '');
  });
}

async function updateCnyRate() {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', { cache: 'no-store' });
    if (!response.ok) throw new Error('Rate feed unavailable');
    const data = await response.json();
    const cny = data?.Valute?.CNY;
    const rate = Number(cny?.Value) / (Number(cny?.Nominal) || 1);
    if (!(rate > 0)) throw new Error('Invalid CNY rate');
    const rawDate = data?.Date || '';
    const date = rawDate ? new Date(rawDate).toLocaleDateString('ru-RU', { timeZone: 'UTC' }) : '';
    window.XUNAN_RATE = { value: rate, date, fallback: false };
  } catch (error) {
    // Keep the last usable value if the external source is temporarily unavailable.
    window.XUNAN_RATE = { ...window.XUNAN_RATE, fallback: true };
    console.warn('XUNAN: не удалось обновить курс CNY/RUB; используется резервное значение.', error);
  }
  paintCnyRate();
  window.dispatchEvent(new CustomEvent('xunan-rate-updated', { detail: window.XUNAN_RATE }));
  return window.XUNAN_RATE;
}

window.XUNAN_RATE_READY = updateCnyRate();
window.setInterval(updateCnyRate, 30 * 60 * 1000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateCnyRate();
});
