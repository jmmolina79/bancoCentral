const express = require('express')
const bodyParser = require('body-parser')

// Instanciamos express
const app = express()

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./api/router.js')(app);

// Iniciamos el servidor
app.listen(3500, function(){
    console.log('servidor en el puerto 3.500')
})