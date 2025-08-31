const express = require("express")
const {
listarTemasOrdenados,
crearTema,
obtenerTema,
actualizarTema,
borrarTema,
votarTema,
listarEnlacesOrdenados,
crearEnlace,
actualizarEnlace,
borrarEnlace,
votarEnlace,
enumerarVotos

} = require("../modelos/temaModel.js");

const r = express.Router();

// Lista temas ordenados por voto
r.get("/", (req,res) => {
    res.render("temas/index", { temas : listarTemasOrdenados() });
});

// Crear Tema
r.post("/", (req, res) =>{
    const tema = (req.body?.tema || "").trim(); // Si req.body es undefined → devuelve undefined (sin romper)
    if (tema) crearTema(tema);
    res.redirect("/temas")
});

//Devuelte tema segun ID
r.get("/:id", (req, res) => {
    const t = obtenerTema(req.params.id);
    if (!t) res.status(404).send("No encontrado");
    res.render("temas/show", {t, enlaces: listarEnlacesOrdenados(req.params.id) });
});

// Editar tema
r.post("/:id/editar", (req, res) => {
    const tema = (req.body?.tema || "").trim();
    if (tema) actualizarTema(req.params.id, tema);
    res.redirect(`/temas/${req.params.id}`);
});
// Borrar tema
r.post("/:id/borrar", (req, res) => {
    borrarTema(req.params.id);
    res.redirect("/temas");
});

//Votar tema
r.post("/:id/votar", (req,res)=>{
    const dir = req.body?.dir === "down" ? "down" : "up";
    id = req.params.id;
    votarTema(id,dir);
    res.redirect("/temas");
    })


// ENLACES: CREAR / EDITAR / BORRAR
r.post("/:id/enlaces", (req, res) => {
    const { titulo = "", url = "" } = req.body || {};
    if (titulo && url) crearEnlace(req.params.id, titulo, url);
    res.redirect(`/temas/${req.params.id}`);
});
r.post("/:id/enlaces/:enlaceId/editar", (req, res) => {
    const { titulo = "", url = "" } = req.body || {};
    if (titulo && url) actualizarEnlace(req.params.id, req.params.enlaceId, titulo, url);
    res.redirect(`/temas/${req.params.id}`);
});
r.post("/:id/enlaces/:enlaceId/borrar", (req, res) => {
    borrarEnlace(req.params.id, req.params.enlaceId);
    res.redirect(`/temas/${req.params.id}`);
});

  // VOTAR ENLACE
r.post("/:id/enlaces/:enlaceId/votar", (req, res) => {
    const dir = req.body?.dir === "down" ? "down" : "up";
    votarEnlace(req.params.id, req.params.enlaceId, dir);
    res.redirect(`/temas/${req.params.id}`);
});

module.exports = r;

