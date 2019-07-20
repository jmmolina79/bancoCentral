let Cliente = require('../models/cliente.js');//IMportamos la clase modelo
//Creamos la clase controladora para manjar la informacion de los clientes
class ClienteControlador {
    constructor() {   
    }
    //Funcion encargada de manejar la consulta de un cliente por id
    consultaCliente(req, res) {
        let id = req.params.id;
        Cliente.consultarCliente(id, (err, data) => {
            if(data){
                res.json(data);
            }else{
                res.send(err);
            }
        })
    }

    // Funcion encargada de manejar al consulta de todos los clientes de la base de datos
    consultaClientes(req, res) {
        Cliente.consultarClientes((err, data) => {
            if(data){
                res.json(data);
            }else{
                res.send(err);
            }
        })
    }  

    //Funcion encargada de manejar la consulta de un cliente por id
    insertaCliente(req, res) {
        //console.log(req.headers);
        //console.log(req.body);
        //let array = req.headers;
        //let array = req.params.id;
        //let array = req.params;
        Cliente.insertarCliente(req, (err, data) => {
            //console.log(data);
            if(data){
                res.json(data);
            }else{
                res.send(err);
            }
        })
    }

    /*
    // Actualizar Cliente
    update(req, res) {
        let id = req.params.id;
        let datos = req.body;
        Cliente.actualizarCliente(id, datos, (err, data) => {
            if(data){
                res.json(data);
            }else{
                res.send(err);
            }
        })
    }
    */
    // Actualizar Cliente
    update(req, res) {
        console.log('controlador');
        Cliente.actualizarCliente(req, (err, data) => {
            if(data){
                res.json(data);
            }else{
                res.send(err);
            }
        })
    }

}
const instanciaControlador = new ClienteControlador();
module.exports  = instanciaControlador;