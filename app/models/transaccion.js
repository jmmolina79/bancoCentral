const db = require('../../bd/bd');//Impostamos conexion a la base de datos
const sql = db.connection;//Instanciamos conexion para usar con las consultas

//Creamos un objeto de la tabla para proteger y enmascarar los nombres de la base de datos
const table = {
    name    :"transacciones",    
    fields  : {
        id          :   "id_tr",
        cliente     :   "fk_id_cliente",
        cuenta      :   "fk_id_cuenta",
        movimiento  :   "tipo_tr",
        valor       :   "monto"
    }
}
//Creamos la clase Cliente para empezar a crear las respectivas funcionalidades.
class Transaccion {
    //PAsamos las variables globales por referencia
    constructor(id, cliente, cuenta, movimiento, valor) {
        if (id) {
            this.id     = id;    
        }        
        this.cliente    = cliente;
        this.cuenta     = cuenta;
        this.movimiento = movimiento;
        this.valor       = valor;
    }
    //Funcion encargada de Mapear los campos de la base de datos en el orden que estan segun la super clase, con el fin de enmascarar los campos de la base de datos
    static mapFactory(entity){
        let mp = {};
        if(entity){
            mp = new Transaccion(
                entity.id_tr,
                entity.fk_id_cliente,
                entity.fk_id_cuenta,
                entity.tipo_tr,
                entity.monto
            );
        }        
        return mp;
    }
    //Funcion que consulta un cliente segun el id de la base de datos
    static consultarTransaccion(id, callback) {
        //Armamos la consulta segn los parametros que necesitemos

        /*
        let query = 'SELECT * ';
        query += 'FROM '+table.name+' ';
        query += 'WHERE '+table.fields.id+'='+id+';'; 
        */
        
        let query = `SELECT * 
                    FROM ${table.name} 
                    WHERE ${table.fields.id} = ${id}`; 

                    
        //Verificamos la conexion
        if(sql){
            sql.query(query, (err, result) => {
                if(err){
                    throw err;
                }else{     
                    let transaccion = Transaccion.mapFactory(result[0]);                                                                                          
                    console.log(transaccion);                          
                    callback(null,transaccion);
                }
            })
        }else{
            throw "Problema conectado con Mysql en consultarTransaccion";
        } 
    }
    //Funcion encargada de consultar todos los clientes de la base de datos
    static consultarTransacciones(callback) {
        //Armamos la consulta segn los parametros que necesitemos
        let query = 'SELECT * ';
        query += 'FROM '+table.name+';';   
        //Verificamos la conexion
        if(sql){
            sql.query(query, (err, result) => {
                if(err){
                    throw err;
                }else{     
                    let transacciones = [];
                    for(let entity of result){
                        let transaccion = Transaccion.mapFactory(entity);                        
                        transacciones.push(transaccion);
                    }                                              
                    console.log(transacciones);                          
                    callback(null,transacciones);
                }
            })
        }else{
            throw "Problema conectado con Mysql";
        } 
    }


    //Insertar Cliente
    static insertarTransaccion(req, callback) {
        const { cliente, cuenta, movimiento, valor } = req.body;

        //Armamos la consulta segn los parametros que necesitemos
        let query = `INSERT IGNORE INTO ${table.name} 
                    ( fk_id_cliente, fk_id_cuenta, tipo_tr, monto )
                    VALUES
                    ( '${cliente}', '${cuenta}', '${movimiento}', '${valor}' )`; 

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


}

module.exports = Transaccion;