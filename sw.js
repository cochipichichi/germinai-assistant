self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open('germinai-v1-2').then(c => c.addAll([
    './','./index.html','./checklist.html','./simulator.html','./import.html',
    './css/style.css','./js/ui.js','./js/engine.js','./js/data/offline.js','./public/manifest.webmanifest',
    './data/sensors.json','./data/calendar.json','./data/lots.json','./data/history.json'
  ])));
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if(e.request.method!=='GET') return;
  e.respondWith((async()=>{
    const cache = await caches.open('germinai-v1-2');
    const cached = await cache.match(e.request);
    if(cached) return cached;
    try{
      const resp = await fetch(e.request);
      cache.put(e.request, resp.clone()).catch(()=>{});
      return resp;
    }catch{
      return cache.match('./index.html');
    }
  })());
});
