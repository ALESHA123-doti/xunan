window.XUNAN_CONFIG={leadEmail:"xunan2026@mail.ru"};
window.XUNAN_RATE={value:12.61,date:"",fallback:true};
function paintCnyRate(){
  const value=window.XUNAN_RATE;
  document.querySelectorAll('#cnyRate').forEach(el=>el.textContent=value.value.toLocaleString('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:4}));
  document.querySelectorAll('#cnyRateDate').forEach(el=>el.textContent=value.date?'ЦБ РФ · '+value.date:value.fallback?'резервный курс из таблицы':'');
}
async function updateCnyRate(){
  try{
    const response=await fetch('/api/currency/CNY',{cache:'no-store'});
    if(!response.ok)throw new Error('CBR rate unavailable');
    const data=await response.json();
    if(Number(data.rate)>0)window.XUNAN_RATE={value:Number(data.rate),date:data.date||'',fallback:false};
  }catch(error){
    window.XUNAN_RATE={...window.XUNAN_RATE,fallback:true};
  }
  paintCnyRate();
  window.dispatchEvent(new CustomEvent('xunan-rate-updated',{detail:window.XUNAN_RATE}));
  return window.XUNAN_RATE;
}
window.XUNAN_RATE_READY=updateCnyRate();
window.setInterval(updateCnyRate,30*60*1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateCnyRate()});