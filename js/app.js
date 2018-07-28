if('serviceWorker' in navigator){

    navigator.serviceWorker
       .register('/sw.js', {scope: '/'})
       .then(function(registration){
           console.log("registerd", registration);
       })
       .catch(function(err){
            console.log("failed", err);
       })
}