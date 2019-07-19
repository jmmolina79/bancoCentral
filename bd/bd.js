const mysql = require('mysql');

class DB {
    constructor(){
        if(!DB.instancia){
            DB.instancia = this;
            this.connection = mysql.createConnection({
                //host: 'localhost',
                host: 'http://env-3847167.jelastic.saveincloud.net/',
                user: 'root',
                password: 'MOXcag22916',
                //password: '',
                database: 'node_mysql',
                //port: 3000             
            });
            this.connection.connect((err) => {
                if(err) throw err
            });
            console.log('Entro a conectar');
        }
        // Si existe la instancia
        console.log('Encontro una instancia de conexion')
        return DB.instancia;
    }
}

// Creamos una instancia de la clase
const instancia = new DB();

// Por sehguridad 
Object.freeze(instancia);

module.exports = instancia;


/*
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'node_mysql',
   port: 3000
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
connection.end();
*/