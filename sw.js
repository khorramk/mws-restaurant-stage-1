const cacheName = 'v1';
const cacheFiles = [
    './index.html',
    './restaurant.html',
    './css',
    './data',
    './img',
    './js',
    
]

self.addEventListener('install', function(e){
    console.log("installling");
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
                    console.log("caching files");

                    return cache.addAll(cacheFiles);
        })
    )

})


self.addEventListener('fetch', function(ev){
    ev.respondWith(
       caches.match(ev.request).then(function(response){
 
        if (response){

            console.log("[service worker] found in cache", ev.request.url);
            return response;
        }

        var requestclone = ev.request.clone();

        fetch(requestclone)
        .then(function(resp){
          if(!resp){
              console.log("[service worker] No response from fetch");
              return resp;
          }

          var respClone = resp.clone();

          caches.open(cacheName).then(function(cache){

            cache.put(ev.request, respClone);
            return resp;
          })
        })
        .catch(function(err){

            console.log("[Service worker] Error fetching and caching New promise");
        })
       })
    )
})