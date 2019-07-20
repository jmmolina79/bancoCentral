const mysql = require('mysql');
//Creamos clase encargada de conectar a la base de datos MYSQL o MARIADB

let modo = 'prod'; // 'dev' 'prod'

class DB {
    constructor(){
        //Verificamos la existencia de alguna instancia en la base de datos
        if(!DB.instancia){
            DB.instancia = this;
            //Agregamos los parametros de conexion

            if ( modo == 'dev' ) {
                this.connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'root',
                    password : '',
                    database : 'node_mysql',
                });
            } else {
                this.connection = mysql.createConnection({
                    host: 'node34581-env-3847167.jelastic.saveincloud.net',
                    user: 'root',
                    password: 'MOXcag22916',
                    database: 'node_mysql',                    
                });
            }


            //conectamos y manejamos la conexion con throw
            this.connection.connect((err) => {
                if (err) throw err;    
                //console.log('Fallo la cone!');
            });
            //console.log('Entro a conectar!!');
        }
        //si existe la instancia que retorne la misma
        //console.log('Encontro una instancia de cone');
        return DB.instancia;
    }
}
//creamos una instancia de la clase
const instancia = new DB();
//Por seguridad  por medio del freeze congelamos los parametros de cada instancia para evitar la inyeccion sql
Object.freeze(instancia);
//Hacemos visible el modulo
module.exports = instancia;