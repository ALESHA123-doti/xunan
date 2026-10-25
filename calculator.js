const $=selector=>document.querySelector(selector);
const fmt=value=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:0}).format(value);
const price=$('#calcPrice'),rate=$('#calcRate'),duty=526532.7,broker=50000;
const id=new URLSearchParams(location.search).get('id');
if(id!==null&&window.XUNAN_CARS?.[+id]){
  const car=window.XUNAN_CARS[+id];
  $('#calcCarName').textContent=car.title;
  price.value=car.priceCNY;
}
function render(){
  const priceCny=Number(price.value)||0;
  const cnyRate=Number(rate.value)||0;
  const brokerFee=$('#brokerToggle').checked?broker:0;
  const carRub=priceCny*cnyRate;
  const bankFee=priceCny*.025*cnyRate;
  $('#lineCar').textContent=`${fmt(carRub)} ₽`;
  $('#lineBank').textContent=`${fmt(bankFee)} ₽`;
  $('#brokerValue').textContent=`${fmt(brokerFee)} ₽`;
  $('#brokerLabel').textContent=brokerFee?'с брокером':'без брокера';
  $('#totalValue').textContent=`${fmt(carRub+bankFee+duty+brokerFee)} ₽`;
}
[price,rate,$('#brokerToggle')].forEach(element=>element.addEventListener('input',render));
window.XUNAN_RATE_READY.then(result=>{rate.value=result.value;render()});
window.addEventListener('xunan-rate-updated',event=>{if(!rate.dataset.manual){rate.value=event.detail.value;render()}});
rate.addEventListener('input',()=>rate.dataset.manual='1');
render();
const menu=$('.menu-toggle');
if(menu)menu.onclick=()=>document.querySelector('.topbar nav').classList.toggle('open');