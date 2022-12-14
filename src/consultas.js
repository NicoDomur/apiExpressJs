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
    pool.query('SELECT * FROM PUBLIC.comida;', (err, resu) =>{
        if (err) throw err;
        res.status(200).json(resu.rows);
    })
}

const obtenerTiendas = (req, res) => {
    pool.query('SELECT * FROM PUBLIC.tiendas;', (err, resu) =>{
        if (err) throw err;
        res.status(200).json(resu.rows);
    })
}

const obtenerComidaId = (req, res) => {
    const id_comida = parseInt(req.params.id);
    pool.query('SELECT * FROM PUBLIC.comida where comida.fk_idtiendas = $1 ;', [id_comida] ,(err, resu) => {
        if (err) throw err;
        res.status(200).json(resu.rows);
    });
}

const anadirPedido = (req, res) => {
    const { comentario } = req.body;
    pool.query('INSERT INTO PUBLIC.pedidos(comentarios_extra, fecha_pedido, fecha_entrega, fk_id_tienda, fk_id_comida, cantidad) VALUES ( $1, \'2022-12-13 19:10:25\', \'2022-12-13 21:10:25\', 5, 11, 2);',
    [comentario], (err, resu) => {
        if (err) throw err;
        res.status(200).json(resu.rows);
    });
}

/*
    Hacia abajo van las peticiones hechas por react
*/
const reactObtenerComida = (req, res) => {
    const nombre_propietario = req.params.np;
    pool.query('SELECT * FROM PUBLIC.comida WHERE comida.fk_idtiendas = (SELECT id_tienda FROM PUBLIC.tiendas WHERE tiendas.propietario = $1 );',
    [nombre_propietario], (err, resu) => {
        if (err) throw err;
        res.status(200).json(resu.rows);
    });
}

const reactAnadirComida = (req, res) => {
    const {nombre, descripcion, porcion, categoria, precio, imagen, fkTienda} = req.body;
    pool.query('INSERT INTO PUBLIC.comida(nombre_comida, descripcion_ingredientes, porcion, categoria, precio, ruta_imagen, fk_idtiendas) VALUES ($1, $2, $3, $4, $5, $6, $7);',
    [nombre, descripcion, porcion, categoria, precio, imagen, fkTienda], (err, resu) => {
        if (err) throw err;
        res.status(200).json(resu.rows);
    });
}

const reactEliminarComida = (req, res) => {
    const id_comida = parseInt(req.params.id);
    pool.query('DELETE FROM PUBLIC.comida WHERE comida.idcomida = $1 ;',
    [id_comida], (err, resu) => {
        if (err) throw err;
        res.status(200).json(resu.rows);
    });
}

const reactEditarComida = (req, res) => {
    const {nombre, descripcion, porcion, categoria, precio, imagen, idcomida} = req.body;
    pool.query('UPDATE PUBLIC.comida SET nombre_comida = $1, descripcion_ingredientes = $2, porcion = $3, categoria = $4, precio = $5, ruta_imagen = $6 WHERE idcomida = $7 ;',
    [nombre, descripcion, porcion, categoria, precio, imagen, idcomida], (err, resu) => {
        if (err) throw err;
        res.status(200).json(resu.rows);
    });
}

module.exports = {
    obtenerComidas,
    obtenerTiendas,
    obtenerComidaId,
    reactObtenerComida,
    reactAnadirComida,
    anadirPedido,
    reactEliminarComida,
    reactEditarComida,
}