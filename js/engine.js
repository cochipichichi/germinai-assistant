// Motor de reglas + IA ligera
export function evaluate({sensors, calendar, rules, model}){
  const ctx = {...sensors, calendar, model};
  const prioRank = {alta:0, media:1, baja:2};
  const actions = [];
  for(const R of rules.rules){
    const ok = R.if.every(expr => check(expr, ctx));
    if(ok) actions.push(R.then);
  }
  const unique = Object.values(actions.reduce((acc,a)=>{
    const k=a.action; if(!(k in acc) || prioRank[a.priority]<prioRank[acc[k].priority]) acc[k]=a; return acc;
  },{}));
  unique.sort((a,b)=> prioRank[a.priority]-prioRank[b.priority]);
  return unique;
}

function check(expr, ctx){
  try{
    if(expr.includes(' between ')){
      const [lhs, rhs] = expr.split(' between ');
      const val = get(lhs.trim(), ctx);
      const rng = get(rhs.trim(), ctx);
      return Array.isArray(rng) ? (val>=rng[0] && val<=rng[1]) : false;
    }
    if(expr.includes(' in ')){
      const [lhs, rhs] = expr.split(' in ');
      const val = get(lhs.trim(), ctx);
      const arr = get(rhs.trim(), ctx);
      return Array.isArray(arr) ? arr.includes(val) : false;
    }
    if(expr.includes('==')){
      const [lhs, rhs] = expr.split('==');
      return get(lhs.trim(), ctx) == literal(rhs.trim(), ctx);
    }
    for(const op of ['>=','<=',' >','<']){
      if(expr.includes(op)){
        const [lhs, rhs] = expr.split(op);
        const L = Number(get(lhs.trim(), ctx));
        const R = Number(get(rhs.trim(), ctx));
        if(op==='>=') return L>=R;
        if(op==='<=') return L<=R;
        if(op===' >') return L>R;
        if(op==='<') return L<R;
      }
    }
    return false;
  }catch(e){ return false; }
}
function literal(s, ctx){ if(s.startsWith("'")&&s.endsWith("'")) return s.slice(1,-1); return get(s, ctx); }
function get(path, ctx){
  if(path.startsWith('[')) return JSON.parse(path.replace(/'/g,'"'));
  const parts = path.split('.'); let cur = ctx;
  for(const p of parts){ const k=p.trim(); if(k in cur){ cur=cur[k]; } else { return undefined; } }
  return cur;
}
