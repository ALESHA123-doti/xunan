const form=document.querySelector('#orderForm');
const method=document.querySelector('#contactMethod');
const value=document.querySelector('#contactValue');
const label=document.querySelector('#contactValueLabel');
const status=document.querySelector('#orderStatus');
function syncContactField(){
  const channel=method.value;
  value.type=channel==='Телефон'?'tel':channel==='Электронная почта'?'email':'text';
  value.placeholder=channel==='Телефон'?'+7 (___) ___-__-__':channel==='Telegram'?'@username или ссылка':channel==='WhatsApp'?'Номер WhatsApp':channel==='MAX'?'Номер или ссылка MAX':channel==='Электронная почта'?'name@example.com':channel==='Другое'?'Укажите канал и контакт':'Сначала выберите канал связи';
  label.firstChild.textContent=channel==='Телефон'?'Номер телефона ':channel==='Электронная почта'?'Адрес почты ':'Контакт для связи ';
  value.required=Boolean(channel);
  value.removeAttribute('pattern');
}
method.addEventListener('change',syncContactField);
const names={contactMethod:'Канал связи',contactValue:'Контакт',name:'Имя',make:'Марка',model:'Модель',color:'Цвет',body:'Тип кузова',yearFrom:'Год выпуска от',yearTo:'Год выпуска до',budgetFrom:'Бюджет от, ¥',budgetTo:'Бюджет до, ¥',engineType:'Тип двигателя',drive:'Привод',transmission:'Коробка передач',mileageMax:'Максимальный пробег, км',comment:'Дополнительные пожелания'};
form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const rows=[];
  for(const [key,val] of new FormData(form).entries()){
    const text=String(val).trim();
    if(text)rows.push((names[key]||key)+': '+text);
  }
  const recipient=window.XUNAN_CONFIG&&window.XUNAN_CONFIG.leadEmail;
  if(!recipient){status.textContent='Адрес получателя пока не настроен. Заявка не отправлена.';return}
  const subject=encodeURIComponent('Заявка на подбор автомобиля — XUNAN');
  const body=encodeURIComponent(rows.join('\n'));
  status.textContent='Откроется ваше почтовое приложение с подготовленной заявкой. Нажмите «Отправить» в письме.';
  window.location.href='mailto:'+recipient+'?subject='+subject+'&body='+body;
});
syncContactField();
const menu=document.querySelector('.menu-toggle');
if(menu)menu.addEventListener('click',()=>document.querySelector('.topbar nav').classList.toggle('open'));