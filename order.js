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
form.addEventListener('submit', async event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const button=form.querySelector('button[type="submit"]');
  const originalText=button?button.textContent:'';
  const data=new FormData(form);
  const rows=[];
  for(const [key,val] of data.entries()){
    const text=String(val).trim();
    if(text)rows.push((names[key]||key)+': '+text);
  }
  data.set('_subject','Заявка на подбор автомобиля — XUNAN');
  data.set('_template','table');
  data.set('_honey','');
  data.set('Заявка',rows.join('\n'));
  if(button){button.disabled=true;button.textContent='Отправляем…'}
  status.textContent='Отправляем заявку…';
  try{
    const response=await fetch('https://formsubmit.co/ajax/xunanautomobiletrade54@gmail.com',{
      method:'POST',headers:{'Accept':'application/json'},body:data
    });
    const result=await response.json();
    if(!response.ok || result.success===false)throw new Error(result.message||'Не удалось отправить заявку');
    status.textContent='Спасибо! Заявка отправлена. Мы свяжемся с вами.';
    form.reset();syncContactField();
  }catch(error){
    status.textContent='Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону +7 953 874-00-33.';
  }finally{
    if(button){button.disabled=false;button.textContent=originalText}
  }
});
syncContactField();
const menu=document.querySelector('.menu-toggle');
if(menu)menu.addEventListener('click',()=>document.querySelector('.topbar nav').classList.toggle('open'));