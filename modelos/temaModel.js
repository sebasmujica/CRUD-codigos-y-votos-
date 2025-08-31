const db = require("../db.js");

// TEMAS
function crearTema(tema) {
    const tema_nuevo= db.prepare("INSERT INTO temas (tema) VALUES (?)").run(tema.trim());
    id_nuevo = tema_nuevo.lastInsertRowid;
    tema_creado = obtenerTema(tema_nuevo)
    return tema_creado
}

function obtenerTema(id) {
    return db.prepare("SELECT * FROM temas WHERE id= ?").get(Number(id)) // get pq esperamos solo una fila
}

function listarTemasOrdenados() {
    return db.prepare("SELECT * FROM temas ORDER BY votos DESC , id ASC").all();
}

function actualizarTema(id, updated_tema) {
    db.prepare("UPDATE temas SET tema = ? WHERE id = ?").run(String(updated_tema.trim()),Number(id));
    const tema_actualizado = obtenerTema(id);
    return tema_actualizado
}

function borrarTema(id) {
    const existe = obtenerTema(id); if (!existe) return null;
    db.prepare("DELETE FROM temas Where id = ?").run(Number(id));
    return existe
}

function votarTema(id, dir) {
    const voto = dir === "down" ? -1 : 1;
    db.prepare("UPDATE temas SET votos = MAX(0,votos + ?) WHERE id = ?").run(voto, Number(id));
    return db.prepare("SELECT votos FROM temas WHERE id = ?").get(Number(id)).votos; // {voto : 7} ---> .voto retorna el valor perteneciente a la clave voto
}
function enumerarVotos(id){
    return db.prepare("SELECT votos FROM temas WHERE id = ?").get(Number(id)).votos;
}
// ENLACES
function crearEnlace(tema_id,titulo,url) {
    db.prepare("INSERT INTO enlaces (tema_id, titulo, url) VALUES (?,?,?)").run(Number(tema_id),String(titulo),String(url));
}

function listarEnlacesOrdenados(temas_id) {
    return db.prepare("SELECT * FROM enlaces WHERE tema_id = ? ORDER BY votos DESC, id ASC").all(Number(temas_id));
}

function obtenerEnlace(tema_id , id) {
    return db.prepare("SELECT * FROM  enlaces WHERE tema_id = ? AND id = ?").get(Number(tema_id),Number(id));
}

function actualizarEnlace(tema_id, id,  titulo, url){
    db.prepare("UPDATE enlaces SET titulo = ?, url = ? WHERE tema_id = ? AND id = ?").run(String(titulo), String(url), Number(tema_id), Number(id));
}

function borrarEnlace(tema_id, id){
    const existe = obtenerEnlace(tema_id, id); if (!existe) return null
    db.prepare("DELETE FROM enlaces WHERE id = ? AND tema_id=?").run(Number(id), Number(tema_id));
    return existe
}

function votarEnlace(tema_id, id, dir){
    const voto = dir === "down" ? -1 : 1;
    db.prepare("UPDATE enlaces SET votos = MAX(0,votos + ?) WHERE id = ? AND tema_id = ?").run(voto, Number(id), Number(tema_id));
}

// exportar todas las funciones
module.exports = {
    crearTema,
    listarTemasOrdenados,
    obtenerTema,
    actualizarTema,
    borrarTema,
    votarTema,
    crearEnlace,
    listarEnlacesOrdenados,
    obtenerEnlace,
    actualizarEnlace,
    borrarEnlace,
    votarEnlace,
    enumerarVotos
};