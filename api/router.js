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

    app.post('/personas', (req, res)=> {
        let nombre = req.body.nombre;
        let edad = req.body.edad;
        let miPersona = {
            'elNombre' : 'nombre',
            'laEdad': 'edad'     
        }
        res.send(miPersona);
    });


    app.get('/usuarios', (req, res) => {
        $sql = `SELECT * FROM usuarios  `;
        
        mysqlConnection.query($sql, (err, rows, fields) => {
          if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
        });  
      });

}
