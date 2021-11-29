const mongoose = require('mongoose');


const PlaceSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    latitude:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },
    imageURL:{
        type: String,
        required: true
    },
    clicked:{
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Places', PlaceSchema);