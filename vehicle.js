const cars=window.XUNAN_CARS||[],id=Math.max(0,Math.min(cars.length-1,Number(new URLSearchParams(location.search).get('id'))||0)),car=cars[id];
const fmt=n=>new Intl.NumberFormat('ru-RU').format(n),$=s=>document.querySelector(s);
const details={
0:{engine:'1.4T EA211-DJS, 150 л.с., 250 Н·м',transmission:'7-ступенчатая S tronic, мокрое двойное сцепление',equipment:['Спортивный обвес; матричные LED-фары; автоматическое включение фар','Электроскладывание и подогрев зеркал; панорамный люк; электропривод багажника','Бесключевой доступ и запуск двигателя; камера заднего вида; передние и задние парктроники','Спортивные сиденья из алькантары и кожи; электропривод передних сидений в 12 направлениях','Audi Virtual Cockpit 10,25″; сенсорный экран 10,1″; беспроводной CarPlay; голосовое управление'],safety:['6 подушек безопасности; ESP; контроль давления в шинах','Контроль усталости водителя; предупреждение о фронтальном столкновении; автоматическое экстренное торможение','Камера заднего вида, парктроники спереди и сзади, ISOFIX'],condition:'Белый цвет, передний привод, выпуск 2022-02-08, пробег 30 000 км, 2 ключа. Оригинальная краска и реальный пробег.',description:'Турбомотор 1,4 л на 150 л. с., коробка S tronic, панорамный люк и матричные LED-фары.'},
1:{engine:'1.4T DLE, 150 л.с., 110 кВт',transmission:'Коробка указана по описанию автомобиля; уточняется по VIN',equipment:['Audi A3L Limousine 35 TFSI Fashion Sport','Сенсорный экран 10,1″ и цифровая приборная панель 10,25″','Кожаные и тканевые спортивные сиденья; люк; климат-контроль','Bluetooth и подключение к интернету'],safety:['Фронтальные подушки и боковые шторки','ABS, распределение тормозных усилий, контроль давления','Автоматическое экстренное торможение, предупреждение о выходе из полосы и усталости водителя'],condition:'Белый цвет, выпуск 2023-03-25, пробег 29 000 км, оригинальная краска и реальный пробег.',description:'Турбомотор 1,4 л на 150 л. с., цифровая приборная панель, люк и климат-контроль.'},
2:{engine:'1.4T EA211-DJS, 150 л.с., 250 Н·м',transmission:'7-ступенчатая роботизированная коробка с двойным сцеплением',equipment:['Audi Q3 35 TFSI Fashion Dynamic Edition','19-дюймовые диски, панорамный люк, электропривод багажника','Спортивные сиденья с отделкой алькантарой и кожей; электропривод сидений','10,25″ Audi Virtual Cockpit и мультимедийный экран'],safety:['6 подушек; ESP; контроль давления в шинах','Предупреждение о фронтальном столкновении и усталости водителя','Камера и парктроники; ISOFIX'],condition:'Белый цвет, выпуск 2022-12-17, пробег 29 000 км, 2 ключа; оригинальная окраска.',description:'Турбомотор 1,4 л на 150 л. с., семиступенчатый робот, панорамный люк и электропривод багажника.'},
3:{engine:'1.4T DLE, 150 л.с., 110 кВт',transmission:'7-ступенчатая роботизированная коробка с двойным сцеплением',equipment:['Audi A3L Limousine 35 TFSI Luxury Sport Edition','10,25″ Virtual Cockpit и мультимедийный экран MMI 10,1″','Спортивные сиденья; трёхзонный климат-контроль; подогрев сидений','Панорамный люк; CarPlay/CarLife; круговая камера 360°'],safety:['6 подушек; ABS; ESP; контроль давления в шинах','Предупреждение о столкновении и выходе из полосы, автоматическое торможение','Адаптивный круиз-контроль и контроль слепых зон'],condition:'Белый цвет, выпуск 2023-12-08, пробег 16 000 км, 1 ключ; оригинальный кузов и заводская окраска.',description:'Турбомотор 1,4 л на 150 л. с., семиступенчатый робот, подогрев сидений и камера кругового обзора.'}
};
Object.assign(details,{
4:{engine:'1.4T EA211-DJS, 150 л.с., 250 Н·м',transmission:'7-ступенчатая сухая S tronic',equipment:['Спортивные сиденья с комбинированной обивкой','LED-фары, автоматическое включение света, бесключевой доступ','Сенсорный экран, Bluetooth, USB/Type-C, камера заднего вида'],safety:['6 подушек; ESP; TPMS; ISOFIX','Автоматическое торможение, предупреждение о столкновении и выходе из полосы'],condition:'Зелёный цвет, пробег 41 000 км; левое переднее крыло ремонтировалось, на крышке багажника подкрашены царапины.',description:'Турбомотор 1,4 л на 150 л. с., коробка S tronic, спортивные сиденья и камера заднего вида.'},
5:{engine:'1.4T EA211-DJS, 150 л.с., 250 Н·м',transmission:'7-ступенчатая сухая DSG/DCT',equipment:['Спортивные сиденья, виртуальная приборная панель и центральный экран','CarPlay/CarLife, многофункциональный руль с лепестками','Камера заднего вида, круиз-контроль, Auto Hold'],safety:['6 подушек; ESP; TPMS; ISOFIX','Автоматическое экстренное торможение и предупреждение о фронтальном столкновении'],condition:'Серый цвет, пробег 40 000 км; правая передняя и правая задняя двери ремонтировались.',description:'Турбомотор 1,4 л на 150 л. с., семиступенчатый робот, круиз-контроль и камера заднего вида.'},
6:{engine:'1.4T, 150 л.с.',transmission:'Уточняется по конкретному автомобилю',equipment:['Audi A3L 2022 35 TFSI Fashion Sport','Комплектация будет подтверждена по VIN и при осмотре'],safety:['Состав систем безопасности уточняется по автомобилю'],condition:'Белый цвет, пробег 66 000 км, оригинальная краска.',description:'Версия 35 TFSI Fashion Sport с турбомотором 1,4 л на 150 л. с. и пробегом 66 000 км.'},
7:{engine:'1.4T DLE, 150 л.с., 110 кВт',transmission:'Уточняется по конкретному автомобилю',equipment:['Audi A3 Sportback Fashion Sport Edition','10,1″ мультимедийный экран, 10,25″ цифровая приборная панель','Люк, автоматический климат-контроль, CarPlay/CarLife'],safety:['Фронтальные и боковые подушки, шторки безопасности','Автоматическое торможение, предупреждение о выходе из полосы и усталости'],condition:'Красный цвет, пробег 21 000 км; окрашены капот и крышка багажника.',description:'Турбомотор 1,4 л на 150 л. с., цифровая приборная панель, люк и автоматический климат-контроль.'},
8:{engine:'1.5T B38A15C, 140 л.с.',transmission:'7-ступенчатая мокрая DCT, передний привод',equipment:['BMW X1 sDrive20Li Fashion Edition','18-дюймовые диски; панорамный люк; экран 10,25″','Apple CarPlay/CarLife, 6-цветная подсветка, электропривод водительского сиденья'],safety:['6 подушек; система стабилизации; контроль давления в шинах','Камера и задние датчики парковки'],condition:'Белый цвет, пробег 57 000 км, 2 ключа, оригинальная краска и реальный пробег.',description:'Турбомотор 1,5 л на 140 л. с., семиступенчатый робот, панорамный люк и электропривод водительского сиденья.'},
9:{engine:'1.5T B38A15G, 136 л.с., 220 Н·м',transmission:'7-ступенчатая мокрая DCT, передний привод',equipment:['BMW 120i M Sport Edition','Мультимедиа iDrive, экран 8,8″, Apple CarPlay/CarLife','Кожаный руль M, камера заднего вида, задние парктроники'],safety:['6 подушек; ABS/EBD; стабилизация и контроль тяги','Камера заднего вида; контроль давления в шинах; ISOFIX'],condition:'Белый цвет, пробег 24 000 км; ремонтировалось правое переднее крыло.',description:'Турбомотор 1,5 л на 136 л. с., семиступенчатый робот, мультимедиа iDrive и камера заднего вида.'},
10:{engine:'2.0T B48B20C, 156 л.с., 250 Н·м',transmission:'8-ступенчатый автомат ZF 8HP',equipment:['BMW 320Li M Sport Package','Спортивный руль M, цифровая приборная панель 12,3″, дисплей 10,25″','Трёхзонный климат-контроль, панорамный люк'],safety:['6 подушек; ESP; контроль давления; ISOFIX','Камеры/парктроники и ассистенты — уточнить при осмотре'],condition:'Белый цвет, пробег 65 000 км, заводская окраска; ОСАГО отсутствует.',description:'Турбомотор 2,0 л на 156 л. с., восьмиступенчатый автомат, панорамный люк и трёхзонный климат-контроль.'},
11:{engine:'1.5L L15CE, 124 л.с., вариатор CVT',transmission:'Бесступенчатый вариатор CVT, передний привод',equipment:['Honda XR-V 1.5L CVT Hot Wave Edition','Камера заднего вида, круиз-контроль, мультимедийный экран 9″','Подключение смартфона, автоматические фары'],safety:['Honda Sensing: предупреждение о сходе с полосы и столкновении','Активное торможение и ассистенты движения; состав проверить по VIN'],condition:'Белый цвет, пробег 36 000 км, оригинальная краска.',description:'Двигатель 1,5 л на 124 л. с., вариатор, круиз-контроль и камера заднего вида.'},
12:{engine:'1.5L L15CE, 124 л.с., вариатор CVT',transmission:'Вариатор CVT, передний привод',equipment:['Honda LIFE SPO-SS Dynamic Edition','Сенсорный экран, CarLife, бесключевой доступ','Подогрев сидений, камера заднего вида и задние парктроники'],safety:['Honda Sensing и ISOFIX (по предоставленному описанию)','ESC, система помощи при старте в гору, контроль давления в шинах'],condition:'Белый цвет, пробег 43 000 км, оригинальная заводская окраска.',description:'Двигатель 1,5 л на 124 л. с., вариатор, подогрев сидений и задние парктроники.'},
13:{engine:'1.5L EA211-DMB, 113 л.с.',transmission:'6-ступенчатый автомат Aisin, передний привод',equipment:['Volkswagen T-Cross Smart Connected Edition','Цифровая приборная панель и мультимедиа 8″','CarPlay/CarLife, камера заднего вида, USB'],safety:['ESP и контроль давления в шинах','В базовой версии шторки безопасности не указаны'],condition:'Белый цвет, пробег 41 000 км, оригинальная краска.',description:'Двигатель 1,5 л на 113 л. с., шестиступенчатый автомат Aisin, цифровая приборная панель и камера заднего вида.'},
14:{engine:'1.4T EA211-DJS, 150 л.с., 250 Н·м',transmission:'7-ступенчатая сухая DSG, передний привод',equipment:['Volkswagen T-Roc Elite Connected Edition','Панорамный люк, CarPlay/CarLife, камера заднего вида','Электронный ручник, Auto Hold, помощь при старте в гору'],safety:['Фронтальные/боковые подушки и шторки','ESP, контроль давления, ISOFIX, задние парктроники'],condition:'Белый цвет, пробег 16 000 км; ремонтировались правое переднее крыло и передняя дверь.',description:'Турбомотор 1,4 л на 150 л. с., семиступенчатая DSG, панорамный люк и камера заднего вида.'},
15:{engine:'1.4T EA211-DJS, 150 л.с., 250 Н·м',transmission:'7-ступенчатая сухая DSG/DQ200, передний привод',equipment:['Volkswagen T-Roc 280TSI DSG','8″ мультимедийный экран, CarPlay/CarLife, Bluetooth','Двухзонный климат-контроль, камера заднего вида'],safety:['ESP, ABS/EBD, контроль давления в шинах','Камера и задние парктроники; ISOFIX'],condition:'Белый цвет, пробег 48 000 км, оригинальное состояние кузова.',description:'Турбомотор 1,4 л на 150 л. с., семиступенчатая DSG, двухзонный климат-контроль и камера заднего вида.'},
16:{engine:'1.4T EA211-DJS, 150 л.с., 250 Н·м',transmission:'7-ступенчатая сухая DSG/DQ200',equipment:['Volkswagen Golf R-Line','Двойной экран, CarPlay/CarLife, панорамный люк','Спортивные сиденья, климат-контроль и Auto Hold'],safety:['6 подушек, ESP, TPMS','Автоматическое торможение, удержание в полосе и адаптивный круиз-контроль (по описанию)'],condition:'Серый цвет, пробег 60 000 км, оригинальная краска.',description:'Турбомотор 1,4 л на 150 л. с., семиступенчатая DSG, спортивные сиденья и панорамный люк.'},
17:{engine:'1.4T DJS, 150 л.с., 250 Н·м',transmission:'7-ступенчатая сухая DSG',equipment:['Volkswagen Lamando L 280TSI DSG','Цифровая приборная панель, сенсорный экран, CarPlay/CarLife','Кожаный руль, электропривод водительского сиденья'],safety:['ESP, ABS, EBD, TCS; активные тормозные ассистенты (по описанию)','Парктроник, камера, подушки и шторки безопасности'],condition:'Синий цвет, пробег 36 000 км; правое переднее крыло подкрашено.',description:'Турбомотор 1,4 л на 150 л. с., семиступенчатая DSG, цифровая приборная панель и электропривод водительского сиденья.'},
18:{engine:'1.4T EA211-DSB, 150 л.с., 250 Н·м',transmission:'7-ступенчатая сухая DSG',equipment:['Volkswagen Lavida Comfort Edition','Люк, LED-фары, электрозеркала с подогревом','8″ экран, CarPlay/CarLife, задние дефлекторы'],safety:['Подушки, ESP, TPMS, ISOFIX','Камера, задние парктроники, автоматическое экстренное торможение'],condition:'Белый цвет, пробег 23 000 км; правое переднее крыло окрашено.',description:'Турбомотор 1,4 л на 150 л. с., семиступенчатая DSG, люк и LED-фары.'},
19:{engine:'1.4T EA211-DJS, 150 л.с., 250 Н·м',transmission:'7-ступенчатая сухая DSG/DQ200',equipment:['Volkswagen Tharu 280TSI 2WD','LED-фары, камера заднего вида, круиз-контроль','Многофункциональный руль, Auto Hold, помощь на подъёме'],safety:['ABS/EBD/EBA/ASR/ESP, ISOFIX','Передние подушки безопасности; состав проверить по VIN'],condition:'Серый цвет, пробег 41 000 км; правое заднее крыло ремонтировалось.',description:'Турбомотор 1,4 л на 150 л. с., семиступенчатая DSG, LED-фары и круиз-контроль.'},
20:{engine:'1.5L, 112 л.с., атмосферный',transmission:'Вариатор CVT, передний привод',equipment:['Toyota Yaris L Luxury Plus','Bluetooth, электростеклоподъёмники, центральный замок','LED-дневные огни, кондиционер'],safety:['ABS/EBD/BA, ESP, TPMS, ISOFIX','Система помощи при старте в гору'],condition:'Белый цвет, пробег 79 000 км, оригинальная окраска.',description:'Двигатель 1,5 л на 112 л. с., вариатор, кондиционер и Bluetooth.'},
21:{engine:'1.2T 9NR-TS, 116 л.с.',transmission:'Вариатор CVT с имитацией 10 передач',equipment:['Toyota Levin 185T Luxury Edition','Панорамный люк, автоматический климат-контроль','CarPlay/CarLife, камера заднего вида и парктроники'],safety:['Toyota Safety Sense: адаптивный круиз-контроль и помощь в полосе (по описанию)','6 подушек, ESP, ABS/EBD, ISOFIX'],condition:'Белый цвет, пробег 30 000 км; ремонтировались левая передняя дверь и крыло.',description:'Турбомотор 1,2 л на 116 л. с., вариатор, панорамный люк и автоматический климат-контроль.'},
22:{engine:'2.0L атмосферный, 158 л.с., 202 Н·м',transmission:'6-ступенчатая автоматическая коробка',equipment:['Mazda CX-30 Automatic Elegant','Двухзонный климат-контроль, бесключевой доступ и запуск','Экран 8,8″, люк, беспроводная зарядка'],safety:['7 подушек; ESP; адаптивный круиз-контроль','Контроль полосы и интеллектуальное торможение (по описанию)'],condition:'Синий цвет, пробег 29 000 км, оригинальная краска.',description:'Двигатель 2,0 л на 158 л. с., шестиступенчатый автомат, двухзонный климат-контроль и беспроводная зарядка.'},
23:{engine:'1.5L G4FL, 115 л.с.',transmission:'Вариатор CVT, передний привод',equipment:['Kia K3 1.5L CVT Fashion Edition','10,25″ сенсорный экран, цифровая приборная панель','Люк, автоматический климат-контроль, LED-оптика'],safety:['ESP, TPMS, ISOFIX, камера и задние датчики парковки','Фронтальные и передние боковые подушки'],condition:'Белый цвет, пробег 53 000 км; ремонтировались правое переднее крыло и крышка багажника.',description:'Двигатель 1,5 л на 115 л. с., вариатор, цифровая приборная панель и автоматический климат-контроль.'}
});
const d=details[id]||{engine:`${car.engine}${car.power?`, ${car.power}`:''}`,transmission:'Уточняется по данным автомобиля',equipment:[car.sourceTrim,`Цвет: ${car.color}`,`Пробег: ${fmt(car.mileage)} км`,`Двигатель: ${car.engine} · ${car.power}`],safety:['Проверенные данные и документы предоставляются до согласования покупки.'],condition:car.condition||'Сведения о состоянии уточняются по результатам осмотра.',description:`${car.title}. Двигатель: ${car.engine}. Пробег: ${fmt(car.mileage)} км.`};
$('#carTitle').textContent=car.title;$('#crumbTitle').textContent=car.title;$('#carTrim').textContent=car.trim;$('#carMeta').textContent=`${car.color}　·　${car.release}　·　${fmt(car.mileage)} км　·　${car.engine}　·　Передний привод`;
$('#carPrice').textContent=`${fmt(car.priceCNY)} ¥`;$('#calcLink').href=`calculator.html?id=${id}`;$('#carRub').textContent=`≈ ${fmt(Math.round(car.priceCNY*window.XUNAN_RATE.value))} ₽ по курсу ЦБ*`;
const specs=[['Номер кузова',car.bodyNumber||'Уточняется'],['Дата выпуска',car.release],['Двигатель',d.engine],['Коробка передач',d.transmission],['Привод','Передний'],['Цвет',car.color],['Пробег',`${fmt(car.mileage)} км`],['Состояние',car.condition||'Уточняется']];$('#carSpecs').innerHTML=specs.map(([k,v])=>`<div>${k}<b>${v}</b></div>`).join('');
const panel=$('#detailPanel');function showTab(tab){const title={equipment:'Комплектация',safety:'Безопасность',condition:'Состояние',description:'Описание'}[tab];panel.innerHTML=`<h3>${title}</h3>`;if(tab==='equipment'||tab==='safety'){const entries=(d[tab]||[]).flatMap(item=>String(item).split(/[;；]\s*/)).map(item=>item.trim().replace(/[.!?…]+$/,'')).filter(Boolean);panel.insertAdjacentHTML('beforeend',`<ul class="clean-feature-list">${entries.map(item=>{const text=item.charAt(0).toLocaleUpperCase('ru-RU')+item.slice(1);return `<li>${text}</li>`}).join('')}</ul>`) }else panel.insertAdjacentHTML('beforeend',`<p>${d[tab]||''}</p>`)}
document.querySelectorAll('#detailTabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#detailTabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');showTab(b.dataset.tab)});showTab('description');

let photo=1;
const photoCount=({0:19,1:19,2:19,3:19,4:19,5:19,6:18,7:19,8:19,9:19,10:19,11:19,12:19,13:19,14:19,15:19,16:19,17:19,18:19,19:19,20:19,21:19,22:19,23:19})[Number(car.id)]||22;
const stage=$('#galleryStage'),main=$('#mainPhoto'),placeholder=$('#photoPlaceholder'),counter=$('#photoCounter'),lightbox=$('#lightbox'),big=$('#lightboxPhoto'),bigPlaceholder=$('#lightboxPlaceholder');
const photoPath=n=>`assets/cars/${car.id}/${String(n).padStart(2,'0')}.jpg`;

function setPhoto(n){
  photo=((n-1)%photoCount+photoCount)%photoCount+1;
  counter.textContent=`${photo} / ${photoCount}`;
  document.querySelectorAll('#galleryThumbs button').forEach((b,i)=>b.classList.toggle('active',i+1===photo));

  main.onload=()=>{
    main.style.display='block';
    placeholder.style.display='none';
  };
  main.onerror=()=>{
    main.style.display='none';
    placeholder.style.display='grid';
  };
  main.src=photoPath(photo);

  if(lightbox.classList.contains('open')){
    big.onload=()=>{
      big.style.display='block';
      bigPlaceholder.style.display='none';
    };
    big.onerror=()=>{
      big.style.display='none';
      bigPlaceholder.style.display='block';
    };
    big.src=photoPath(photo);
    bigPlaceholder.textContent=`Фото ${photo} из ${photoCount} будет добавлено`;
  }
}

main.setAttribute('fetchpriority', 'high');
setPhoto(1);

$('#galleryThumbs').innerHTML=Array.from({length:photoCount},(_,i)=>{
  const n=i+1;
  return `<button type="button" class="${n===photo ? 'active' : ''}" aria-label="Открыть фото ${n}" title="Фото ${n}">
    <img src="${photoPath(n)}" alt="" loading="lazy" fetchpriority="low" decoding="async" draggable="false">
    <span class="thumb-number">${String(n).padStart(2,'0')}</span>
  </button>`;
}).join('');

document.querySelectorAll('#galleryThumbs button').forEach((b,i)=>{
  b.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation();
    setPhoto(i+1);
  });

  const image=b.querySelector('img');
  image.addEventListener('error',()=>{
    image.remove();
    b.insertAdjacentHTML('afterbegin',`<span style="display:grid;place-items:center;width:100%;height:100%;font-size:11px;color:#626a73;pointer-events:none">${String(i+1).padStart(2,'0')}</span>`);
  },{once:true});
});

$('#photoPrev').onclick=()=>setPhoto(photo-1);
$('#photoNext').onclick=()=>setPhoto(photo+1);

stage.onclick=e=>{
  if(!e.target.closest('button')){
    lightbox.classList.add('open');
    setPhoto(photo);
  }
};

$('#lightboxClose').onclick=()=>lightbox.classList.remove('open');
$('#lightboxPrev').onclick=()=>setPhoto(photo-1);
$('#lightboxNext').onclick=()=>setPhoto(photo+1);
lightbox.onclick=e=>{
  if(e.target===lightbox)lightbox.classList.remove('open');
};


window.XUNAN_RATE_READY.then(rate=>$('#carRub').textContent=`≈ ${fmt(Math.round(car.priceCNY*rate.value))} ₽ по курсу ЦБ*`);

window.addEventListener("xunan-rate-updated",event=>{
  const currentId=new URLSearchParams(location.search).get("id");
  const currentCar=window.XUNAN_CARS[Number(currentId)];
  if(currentCar)document.querySelector("#carRub").textContent="≈ "+fmt(Math.round(currentCar.priceCNY*event.detail.value))+" ₽ по курсу ЦБ";
});

const contactDialog=document.querySelector("#contactDialog");
const callbackDialog=document.querySelector("#callbackDialog");
const callbackFrame = document.querySelector("#callbackFrame");
const callbackUrl = new URL("https://forms.yandex.ru/u/6af6d0ea6f1ca4371c70d257");
callbackUrl.searchParams.set("iframe", "1");
callbackUrl.searchParams.set("car", car.title);
callbackFrame.src = callbackUrl.href;
callbackUrl.searchParams.delete("iframe");
document.querySelector("#callbackFormLink").href = callbackUrl.href;

document.querySelector("#contactNow").addEventListener("click",()=>contactDialog.showModal());
document.querySelector("#requestCallback").addEventListener("click",()=>{
  callbackDialog.showModal();
});
document.querySelector("#contactDialogClose").addEventListener("click",()=>contactDialog.close());
document.querySelector("#callbackDialogClose").addEventListener("click",()=>callbackDialog.close());
contactDialog.addEventListener("click",event=>{
  if(event.target===contactDialog)contactDialog.close();
});
callbackDialog.addEventListener("click",event=>{
  if(event.target===callbackDialog)callbackDialog.close();
});

