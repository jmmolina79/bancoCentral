let Transaccion = require('../models/transaccion.js');//IMportamos la clase modelo
//Creamos la clase controladora para manjar la informacion de los Transaccions
class TransaccionControlador {
    constructor() {   
    }
    //Funcion encargada de manejar la consulta de un Transaccion por id
    consultaTransaccion(req, res) {
        let id = req.params.id;
        Transaccion.consultarTransaccion(id, (err, data) => {
            if(data){
                res.json(data);
            }else{
                res.send(err);
            }
        })
    }

    // Funcion encargada de manejar al consulta de todos los Transaccions de la base de datos
    consultaTransacciones(req, res) {
        Transaccion.consultarTransacciones((err, data) => {
            if(data){
                res.json(data);
            }else{
                res.send(err);
            }
        })
    }  

    insert(req, res) {
        Transaccion.insertarTransaccion(req,(err, data) => {
            if(data){
                res.json(data);
            }else{
                res.send(err);
            }
        })
    }  
    
}
const instanciaControlador = new TransaccionControlador();
module.exports  = instanciaControlador;