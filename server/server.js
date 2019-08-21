//constantes
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
//rutas 
const libroRuta = require('./api/routes/rutas.libros');


//middlewares 
app.use(bodyParser.urlencoded({ extended: false, useNewUrlParser: true }))
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))
app.use(cors());




// conexion db 
mongoose.connect('mongodb://localhost:27017/biblioteca', (err,res)=>{
    if(err){
        throw err
    }else{
        console.log("BASE DE DATOS CORRIENDO  EN EL PUERTO 27017")
    }
})





//rutas end-point 

app.use('/libro',libroRuta);





/*SERVIDOR */ 
app.listen(3000, () =>{

    console.log("LISTEN THE 3000 PORT ");
})



module.exports = app;