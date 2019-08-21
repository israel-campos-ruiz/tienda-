const express = require('express');
const router = express.Router();
const multer = require('multer');
let Libro = require('../models/model.libros');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        
        cb(null, './uploads');
        
    },
    
    filename : function(req,file,cb){
        cb(null, file.originalname);
    }
})

const upload = multer({storage:storage})
// aqui encontramos todos los libros 
router.get('/', (req, res) => {
    Libro.find({}).exec((err, libros) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }
        res.json(libros);
    })
})

router.get('/:id', (req,res)=>{
    let id = req.params.id

    Libro.findById(id, (err, usuarioByID)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }
        res.json(usuarioByID);
    })
})

// obtener los libros por diferentes end points este es por el titulo 

router.get('/titulo/:libro', (req,res)=>{
    let name = req.params.libro
    Libro.find({"titulo":{$regex:name}}).exec((err,libro) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json(libro)
    })
})
 // este el por la editorial 
router.get('/editorial/:editorial', (req,res)=>{
    let name = req.params.editorial
    Libro.find({"editorial":{$regex:name}}).exec((err,libro) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json(libro)
    })
})


// este es por el autor 

router.get('/autor/:autor', (req,res)=>{
    let name = req.params.autor
    console.log(req.file);
    Libro.find({"autor":{$regex:name}}).exec((err,libro) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json(libro)
    })
})




router.post('/',upload.single('portada') ,(req,res)=>{
    console.log(req.file);
    let body = req.body

    let libro  = new Libro({
        titulo:body.titulo,
        editorial:body.editorial,
        idioma:body.idioma,
        portada:req.file.path,
        link:body.link,
        autor:body.autor,
        descripcion:body.descripcion,
    })


    // guardamos en la base de datos

    libro.save((err, LibroGuardado)=>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }
        res.json({
            ok: true,
            libro: LibroGuardado
        })

    })
})

router.put('/:id', (req,res)=>{

    let id = req.params.id;
    let body = req.body;

    console.log(body);
    
  

    Libro.findByIdAndUpdate(id, body,{
        new: true
    }, (err, libroActualizado) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.status(200).json({
            ok:true,
            Libro:libroActualizado
        })
    })

    

})

router.delete('/:id', (req, res) => {

    let id = req.params.id;
    console.log(id)
    Libro.findByIdAndRemove(id, (err,bodyDelete) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            bodyDelete
        })
    })
    // res.send('DELETE WORK');
})

module.exports = router;

