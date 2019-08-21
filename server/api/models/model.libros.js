const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

let schema = mongoose.Schema;



let libroSchema = new schema({

    titulo:{
        type:String,
        required:[true, 'titulo requerido']
       
    },

    editorial:{
        type:String,
        required:[true, 'editorial requerida']
    },

    idioma:{
        type:String
    },
    portada:{
        type:String
    },

    link:{
        type:String,
        unique:true
    },
    autor:{
        type:String
    },
    descripcion:{
        type:String
    }

    
})
    libroSchema.plugin(uniqueValidator,{message: '{PATH} el link debe de ser unico'});
    module.exports = mongoose.model('libro', libroSchema)