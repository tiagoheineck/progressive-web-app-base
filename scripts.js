let request = indexedDB.open("timelineDatabase",2);
let db, transaction, store;

request.onupgradeneeded = function(event) {
    console.log('[Database] Updating ... ');
    let db = request.result;
    console.log('[Database] old version ' + event.oldVersion)
    if (event.oldVersion < 1) {
        let store = db.createObjectStore('formacoes',{keyPath: 'ano'});
        store.put({ano: 2006, curso: 'Técnico em Tecnologia da Informação'});
        store.put({ano: 2011, curso: 'Bacharel em Administração'})
    } 
    if (event.oldVersion < 2) {
        let store = event.target.transaction.objectStore('formacoes')
        store.put({ano: 2016, curso: 'Especialização em Engenharia de Sistemas'})
    }
}

request.onerror = function(event) {    
    console.log("[Database] [ERROR] " + event.target.errorCode);
}

request.onsuccess = function(event) {
    db = request.result;
    transaction = db.transaction('formacoes','readwrite');
    store = transaction.objectStore('formacoes');

    let query = store.getAll().onsuccess = function(event) 
    {        
        formacoes = event.target.result;
        formacoes.forEach(function(item){
            console.log(item)
        })
    }
}