const express = require('express');
const path = require("path");
const webtemas = require("./rutas/web.temas.js");

require("./db.js"); // nicializar la base de datos antes de que el servidor empiece a atender las rutas.

const app = express()
const port = 3000

app.use(express.urlencoded({ extended : true }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/temas", webtemas);
app.get("/", (req,res)=> res.redirect("/temas"));


app.listen(port,'127.0.0.1', () => {
    console.log(`http://localhost:${port}`)
})
