const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'josesitolqls', // Cambia esto por la real
    database: 'reconocimiento',
    port: 3306
});

conexion.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar a la base de datos:', err.message);
        return;
    }
    console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = conexion;
