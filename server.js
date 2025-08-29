const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// array de ejemplos para testeo
temas = [
    {
        id:1,
        titulo:'Matematicas',
        votos:0,
        link: [{
            id: 1,
            url: "url1",
            votos : 0
        }]
    },

    {
        id:2, 
        titulo:Historia,
        votos:0,
        link: [{
            id: 2,
            url: "url1",
            votos : 0
        }]
    }
]


const getTopic = (id)=> temas.find(t => t.id == Number(id))||null;;


//Ruta raíz
app.get('/', (req, res) => {
    res.send('Servidor Corriendo!')
})


// Ruta que devuelve todos los temas
app.get('/temas', (req,res)=>{
    res.json(temas)
})


//Ruta que filtra por ID
app.get('/temas/:id',(req,res)=>{
    const param_id = req.params.id 
    const tema = getTopic(param_id)

    if (!tema) return res.status(404).json({"error":"Not found"})
    res.json(tema)
})


//Ruta para crear temas nuevos
app.post('/', (req,res)=>{

    const titulo = req.body.titulo;

    if (!titulo) return res.status(400).json({'error':'Faltan campos'});

    id_nuevo = temas.length + 1

    tema_nuevo = {
        'id':id_nuevo,
        'titulo': titulo,
        'votos':0
    }
    temas.push(tema_nuevo)
    res.status(201).json(tema_nuevo)

})


//Ruta para modificar en base al ID
app.put('/temas/:id',(req,res)=>{

    const param_id = req.params.id
    const tema = getTopic(param_id)

    if (!tema) return res.status(404).json({"error":"Not found"})
    
    titulo = req.body.titulo
    if (!titulo) return res.status(400).json({'error':'Faltan campos'});

    tema.titulo = titulo

    res.status(201).json(tema)


})



app.listen(port,'127.0.0.1', () => {
    console.log(`Example app listening on port ${port}`)
})
