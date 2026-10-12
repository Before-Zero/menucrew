const dishes = [
  { original: 'Paella de verduras', zh: '蔬菜西班牙饭', en: 'Vegetable paella', detail: '蔬菜与米饭，适合分享' },
  { original: 'Pollo al ajillo', zh: '蒜香鸡', en: 'Garlic chicken', detail: '蒜香风味鸡肉' },
  { original: 'Ensalada de tomate', zh: '番茄沙拉', en: 'Tomato salad', detail: '清爽的番茄沙拉' },
  { original: 'Patatas bravas', zh: '辣味炸土豆', en: 'Patatas bravas', detail: '炸土豆搭配辣味酱汁' },
  { original: 'Crema catalana', zh: '加泰罗尼亚焦糖布丁', en: 'Catalan cream', detail: '焦糖脆壳奶油甜点' },
];
const initial = [[1, 1, 0, 0, 0], [1, 0, 1, 0, 0], [0, 0, 0, 1, 1]];
let selections = initial.map(row => [...row]);
let member = 0;
let chinese = false;
const totals = () => dishes.map((_, i) => selections.reduce((sum, row) => sum + row[i], 0));
const dietary = () => chinese ? '成员 B：花生过敏，请确认没有交叉接触。不吃香菜。' : 'Peanut allergy. Please confirm there is no cross-contact. No cilantro.';
function render() {
  document.querySelectorAll('[data-member]').forEach(button => button.classList.toggle('active', Number(button.dataset.member) === member));
  document.getElementById('dishes').innerHTML = dishes.map((dish, i) => `<article class="dish"><div><h3>${dish.original}</h3><p>${dish.zh} · ${dish.detail}</p></div><div class="counter"><button data-dish="${i}" data-delta="-1" aria-label="减少${dish.zh}" ${selections[member][i] === 0 ? 'disabled' : ''}>−</button><output aria-label="${dish.zh}份数">${selections[member][i]}</output><button data-dish="${i}" data-delta="1" aria-label="增加${dish.zh}" ${selections[member][i] === 20 ? 'disabled' : ''}>+</button></div></article>`).join('');
  const counts = totals();
  document.getElementById('total').textContent = `3 位同桌 · ${counts.filter(n => n > 0).length} 道菜 · ${counts.reduce((a,b) => a+b,0)} 份`;
  document.getElementById('order-lines').innerHTML = dishes.map((dish, i) => counts[i] > 0 ? `<div class="order-line"><div>${chinese ? dish.zh : dish.original}<small>${chinese ? dish.original : dish.en}</small></div><strong>× ${counts[i]}</strong></div>` : '').join('') || '<p class="caption">还没有选菜。先为任意成员增加一道菜。</p>';
  document.getElementById('diet-text').textContent = dietary();
  document.getElementById('restaurant').classList.toggle('active', !chinese);
  document.getElementById('chinese').classList.toggle('active', chinese);
  document.getElementById('copy').disabled = !counts.some(n => n > 0);
  document.getElementById('copy-status').textContent = '';
  document.getElementById('copy-fallback').hidden = true;
}
document.getElementById('members').addEventListener('click', event => { const button = event.target.closest('[data-member]'); if(button){member=Number(button.dataset.member);render();} });
document.getElementById('dishes').addEventListener('click', event => { const button=event.target.closest('[data-dish]');if(button && !button.disabled){const i=Number(button.dataset.dish);selections[member][i]=Math.max(0,Math.min(20,selections[member][i]+Number(button.dataset.delta)));render();} });
document.getElementById('reset').addEventListener('click',()=>{selections=initial.map(row=>[...row]);member=0;render();});
document.getElementById('restaurant').addEventListener('click',()=>{chinese=false;render();});
document.getElementById('chinese').addEventListener('click',()=>{chinese=true;render();});
document.getElementById('screen-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-screen]');if(!button)return;document.querySelectorAll('[data-screen]').forEach(b=>b.classList.toggle('active',b===button));const image=document.getElementById('product-screen');image.src=button.dataset.screen;image.alt=`正式应用：${button.textContent}`;});
document.getElementById('copy').addEventListener('click',async()=>{
  const counts=totals();const text=['MenuCrew / Barcelona',...dishes.flatMap((dish,i)=>counts[i]>0?[`${chinese?dish.zh:dish.original} × ${counts[i]}`]:[]),'',dietary(),chinese?'食材及过敏原须向餐厅人工确认。':'Please confirm ingredients and allergens with the restaurant.'].join('\n');
  const field=document.getElementById('copy-fallback');field.hidden=false;field.value=text;field.focus();field.select();document.getElementById('copy-status').textContent='订单已展开并选中，可手动复制。';
  try{await navigator.clipboard.writeText(text);document.getElementById('copy-status').textContent='订单已复制。';}catch{document.getElementById('copy-status').textContent='浏览器未允许自动复制，请复制下方已选中的订单。';}
});
render();
