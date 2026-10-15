const C="skincare-v10",F=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(new Request(u,{cache:"reload"})).then(r=>r.ok&&c.put(u,r))))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(async r=>{
const n=fetch(e.request,{cache:"no-cache"}).then(async x=>{if(x&&x.ok){if(r&&e.request.mode==="navigate"){const a=await x.clone().text(),b=await r.clone().text();if(a!==b){await c.put(e.request,x.clone());const cl=await self.clients.matchAll();cl.forEach(k=>k.postMessage("updated"))}}else{c.put(e.request,x.clone())}}return x}).catch(()=>r);
return r||n})))});
