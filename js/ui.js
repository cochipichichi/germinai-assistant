export const $ = (s,el=document)=>el.querySelector(s);
export const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
export function toast(msg){ const el=document.createElement('div'); el.className='toast'; el.role='status'; el.textContent=msg; document.body.appendChild(el); setTimeout(()=>el.remove(),2200); }
export function setBar(el,pct){ el.querySelector('span').style.width = Math.max(0,Math.min(100,pct))+'%'; }
export function drawSpark(id,data){
  const el=document.getElementById(id); if(!el) return;
  const ctx=el.getContext('2d'); const w=el.width=el.clientWidth, h=el.height=90;
  ctx.clearRect(0,0,w,h); if(!data?.length) return;
  ctx.strokeStyle='#7aa2f7'; ctx.lineWidth=1.4; ctx.beginPath();
  data.forEach((v,i)=>{ const x=i*(w/(data.length-1)); const y=h-(v/Math.max(...data))*h*0.9-h*0.05; i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
  ctx.stroke();
}
