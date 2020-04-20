const express = require('express');
const app = express();

const env = process.env.NODE_ENV;

console.log("ENV: " + process.env.NODE_ENV)

if (env == 'production') {
    app.use((req, res, next) => { 
        if (req.headers["x-forwarded-proto"] == "http") 
            res.redirect(`https://${req.headers.host}${req.url}`);  
        else 
            next(); 
    });
}

app.use(express.static(__dirname));

app.get('*', function(req, res){
  res.redirect('/'); 
});


var port = 3000;
app.listen(port);
console.log('Dheineck running in %s', port);