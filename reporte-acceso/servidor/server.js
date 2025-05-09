// servidor/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const conexion = require('./database');

const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../web')));

// Ruta para traer registros con imagen
app.get('/api/registros', (req, res) => {
    const sql = 'SELECT id, usuario_id, empresa_id, hora_entrada, hora_salida, ubicacion, resultado_autenticacion, foto_intento FROM registro';

    conexion.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Error al obtener registros:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        const registrosConImagen = results.map(reg => {
            return {
                ...reg,
                foto_base64: reg.foto_intento ? reg.foto_intento.toString('base64') : null
            };
        });

        res.json(registrosConImagen);
    });
});

// Iniciar servidor
app.listen(PUERTO, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PUERTO}`);
});
