const express = require('express')
const app = express()

app.get('/estudiantes', function(req, res) {
    res.send('Hay 23 estudiantes')
});

app.get('/tutor', function(req, res) {
    res.send('En clase hay 1 tutor')
});

app.listen(3000)