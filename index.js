const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Servidor Iniciado')
});


app.get('/estudiantes', function(req, res) {
    res.send('Hay 23 estudiantes')
});

app.get('/tutor', function(req, res) {
    res.send('En clase hay 1 tutor')
}); 

app.listen(3000, function(){
    console.log('servidor corriendo en el puerto 3.000')
})