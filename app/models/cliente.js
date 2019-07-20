const db = require('../../bd/bd');//Impostamos conexion a la base de datos
const sql = db.connection;//Instanciamos conexion para usar con las consultas

//Creamos un objeto de la tabla para proteger y enmascarar los nombres de la base de datos
const table = {
    name    :"clientes",    
    fields  : {
        id          :   "id_cliente",
        nombres     :   "nombre_cliente",
        documento   :   "documento_cliente",
        profesion   :   "profesion_cliente"
    }
}
//Creamos la clase Cliente para empezar a crear las respectivas funcionalidades.
class Cliente {
    //PAsamos las variables globales por referencia
    constructor(id,nombres,documento,profesion) {
        if (id) {
            this.id     = id;    
        }        
        this.nombres    = nombres;
        this.documento  = documento;
        this.profesion  = profesion;
    }

    //Funcion encargada de Mapear los campos de la base de datos en el orden que estan segun la super clase, con el fin de enmascarar los campos de la base de datos
    static mapFactory(entity){
        let mp = {};
        if(entity){
            mp = new Cliente(
                entity.id_cliente,
                entity.nombre_cliente,
                entity.documento_cliente,
                entity.profesion_cliente
            );
        }        
        return mp;
    }
    
    //Funcion que consulta un cliente segun el id de la base de datos
    static consultarCliente(id, callback) {
        //Armamos la consulta segn los parametros que necesitemos

        let query = 'SELECT * ';
        query += 'FROM '+table.name+' ';
        query += 'WHERE '+table.fields.id+'='+id+';'; 

        
        /*
       let query = `SELECT * 
                    FROM table.name 
                    WHERE table.fields.id = ${id}`; 
        */
       
        //Verificamos la conexion
        if(sql){
            sql.query(query, (err, result) => {
                if(err){
                    throw err;
                }else{     
                    let cliente = Cliente.mapFactory(result[0]);                                                                                          
                    console.log(cliente);                          
                    callback(null,cliente);
                }
            })
        }else{
            throw "Problema conectado con Mysql en consultarCliente";
        } 
    }


    //Funcion encargada de consultar todos los clientes de la base de datos
    static consultarClientes(callback) {
        //Armamos la consulta segn los parametros que necesitemos
        let query = 'SELECT * ';
        query += 'FROM '+table.name+';';   
        //Verificamos la conexion
        if(sql){
            sql.query(query, (err, result) => {
                if(err){
                    throw err;
                }else{     
                    let clientes = [];
                    for(let entity of result){
                        let cliente = Cliente.mapFactory(entity);                        
                        clientes.push(cliente);
                    }                                              
                    console.log(clientes);                          
                    callback(null,clientes);
                }
            })
        }else{
            throw "Problema conectado con Mysql";
        } 
    }


    //Funcion que consulta un cliente segun el id de la base de datos
    static insertarCliente(req, callback) {
        const { nombres, documento, profesion } = req.headers;

        //Armamos la consulta segn los parametros que necesitemos
        let query = `INSERT IGNORE INTO ${table.name} 
                    ( nombre_cliente, documento_cliente, profesion_cliente )
                    VALUES
                    ( '${nombres}','${documento}','${profesion}' )`; 

        //Verificamos la conexion
        if(sql){
            sql.query(query, (err, result) => {
                //console.log(result);                          
                if(err){
                    throw err;
                }else{
                    if (result.affectedRows) {
                        var respuesta = {
                            "status": true,
                            "mensaje": "Se Insertaron " + result.affectedRows +" Registros",
                            "insertId": result.insertId,
                        };
                    } else {
                        var respuesta = 'No hubo cambios en la BD';
                    }
                    callback(null,respuesta);
                }
            })
        }else{
            throw "Problema conectado con Mysql en consultarCliente";
        } 
    }


    static actualizarCliente(req, callback) {
        const { id } = req.params;
        const { nombres, documento, profesion } = req.body;

        //Armamos la consulta segn los parametros que necesitemos
        let query = `UPDATE ${table.name} 
                    SET nombre_cliente = '${nombres}', 
                        documento_cliente = '${documento}', 
                        profesion_cliente = '${profesion}'
                    WHERE id_cliente = '${id}' `;

        //Verificamos la conexion
        if(sql){
            sql.query(query, (err, result) => {
                if(err){
                    throw err;
                }else{
                    if (result.affectedRows) {
                        var respuesta = {
                            "status": true,
                            "mensaje": "Se Actualizaron " + result.affectedRows +" Registros",
                        };
                    } else {
                        var respuesta = 'No hubo cambios en la BD';
                    }
                    console.log(respuesta);                          
                    callback(null,respuesta);
                }
            })
        }else{
            throw "Problema conectado con Mysql.";
        } 
    }

}

module.exports = Cliente;