const Pool = require('pg').Pool
const config = require('../config.json')

const pool = new Pool({
    user: config.ConexionBD[0].usuario,
    host: config.ConexionBD[0].host,
    database: config.ConexionBD[0].bdd,
    password: config.ConexionBD[0].contrasena,
    port: config.ConexionBD[0].puerto,
})

const obtenerComidas = (req, res) => {
    pool.query('SELECT * FROM public.comida;', (err, resu) =>{
        if (err) throw err;
        res.status(200).json(resu.rows);
    })
}

const obtenerTiendas = (req, res) => {
    pool.query('SELECT * FROM public.tiendas;', (err, resu) =>{
        if (err) throw err;
        res.status(200).json(resu.rows);
    })
}

const obtenerComidaId = (req, res) => {
    const id_comida = parseInt(req.params.id);
    pool.query('SELECT * FROM public.comida where comida.fk_idtiendas = $1 ;', [id_comida] ,(err, resu) => {
        if (err) throw err;
        res.status(200).json(resu.rows);
    });
}

const reactObtenerComida = (req, res) => {
    const nombre_propietario = req.params.np;
    pool.query('SELECT nombre_comida, descripcion_ingredientes, porcion, categoria, precio, ruta_imagen FROM PUBLIC.comida WHERE comida.fk_idtiendas = (SELECT id_tienda FROM PUBLIC.tiendas WHERE tiendas.propietario = $1 );',
    [nombre_propietario], (err, resu) => {
        if (err) throw err;
        res.status(200).json(resu.rows);
    });
}

module.exports = {
    obtenerComidas,
    obtenerTiendas,
    obtenerComidaId,
    reactObtenerComida,
}