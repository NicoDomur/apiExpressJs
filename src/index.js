const express = require('express')
const bp = require('body-parser')
const consulta = require('./consultas')
const config = require('../config.json')

const app = express()
const puerto = config.ConfigAPI[0].puerto

app.use(
    bp.json(),
    bp.urlencoded({
        extended: true,
    }),
    (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    }
)

app.get('/comida', consulta.obtenerComidas);
app.get('/tiendas', consulta.obtenerTiendas);
app.get('/comida/:id', consulta.obtenerComidaId);
app.get('/comidareact/:np', consulta.reactObtenerComida);
app.post('/anadirreact', consulta.reactAnadirComida);
app.post('/pedidos', consulta.anadirPedido);

app.listen(puerto, () => {
    console.log(`Corriendo en puerto ${puerto}`)
})