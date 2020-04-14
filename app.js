const express = require('express');
const app = express();

const env = 'development'

if (env == 'production') {
    app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
        if (req.headers["x-forwarded-proto"] == "http") //Checa se o protocolo informado nos headers é HTTP 
            res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
        else //Se a requisição já é HTTPS 
            next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
    });
}

app.use(express.static(__dirname));

app.get('*', function(req, res){
  res.redirect('/');
});


var port = 3000;
app.listen(port);
console.log('Dheineck running in %s', port);