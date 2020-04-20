console.log("[Push] push listening");

const messaging = firebase.messaging();

messaging.requestPermission().then(function() {
    console.log('[Push ] Permission granted');

    return messaging.getToken().then(function(currentToken){
        if (currentToken) {
            console.log('[Push] Current Token: ' + currentToken);
            return currentToken;
        } else {
            console.log('[Push] Sem token disponível, solicite permissão');
        }
    });
});


messaging.getToken()
    .then(function(currentToken){
        if (currentToken) {
            console.log('[Push] Current Token: ' + currentToken);
            return currentToken;
        } else {
            console.log('[Push] Sem token disponível, solicite permissão');
        }
    }).catch(function(error){
        console.warn('[Push] ' + error)
    });