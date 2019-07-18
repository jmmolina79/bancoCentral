module.exports = (app) => {

    app.get('/', function(req, res) {
        let persona = {
            'nombre': 'Juan Manuel',
            'edad': '39',
        }
        res.send(persona)
    });

    app.get('/estudiantes', function(req, res) {
        res.send('Hay 23 estudiantes')
    });

    app.get('/tutor', function(req, res) {
        res.send('En clase hay 1 tutor')
    });
}
