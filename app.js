var express =  require('express');
var app = express();

app.get('/api', function(req, res){
    res.json({message: 'Hello World!'});
})

app.listen(3000, function (){
    console.log('Example app listening on port 3000');
})