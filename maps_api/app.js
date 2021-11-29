// import express
const express = require('express');
// use express in the app.js
const app = express();
// import mongoose
const mongoose = require('mongoose');
// import .env file
require('dotenv/config');
// import bodyParser to parse req and res into JSON
const bodyParser = require('body-parser');
// use bodyParser in the app.js
app.use(bodyParser.json());
// import FileSystem for changing local file directory
var fs = require('fs');
// import DB model Place.js
const Place = require('./models/Place');


// init places

// Since we allow to change the name of the resource/image files, it makes more sense if we store the changes. We could use a persistant database like
// e.g.: MongoDB
let places;

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => console.log('connected to DB')
);

// Middleware


// Routes

// access point for home
app.get('/', (req, res) =>{
    res.send('We are on home');
});

// access point for getting all places
app.get('/maps', async (req, res) =>{
    try {
        places = await Place.find();
        res.send(places);
    } catch (error) {
        res.json({ message: error});
    }
});

// access point for getting an image by imageURL
app.get('/images/:imageURL', async(req, res) =>{
    const imageURL = req.params.imageURL;
    let place;
    let id;
    try {
        places = await Place.find();
        // console.log(places);
        for (let index = 0; index < places.length; index++) {
            id = places[index].id;
            const notClikedPlace = await Place.updateOne(
                {id: id},
                { $set: {clicked: false}}
            );
            if (imageURL === places[index].imageURL) {
                id = places[index].id;
                const clikedPlace = await Place.updateOne(
                    {id: id},
                    { $set: {clicked: true}}
                );
            }
        }
        places = await Place.find();
        for (let index = 0; index < places.length; index++) {
            if(imageURL === places[index].imageURL){
                res.send(places[index]);
            }
        }
    } catch (error) {
        res.send('could not find image');
    }
});

// access point for getting a place by id
// // // // **** Important: please look into this find later if you can
app.get('/maps/:id', async (req, res) =>{
    const id = req.params.id;
    try {
        const places = await Place.find;
        console.log(places);
        for (let index = 0; index < places.length; index++) {
            if(id === places[index].id.toString){
                const place = places[index];
                res.send(place);
            }
        }
    } catch (error) {
        res.json({ message: error});
        res.send('could not find place');
    }
});

// access point for adding a new place
app.post('/maps', async (req, res) =>{
    // since the uuid is limited to 100, this can add upto 100 places
    var uuid = Math.floor(Math.random() * 100)+1;
    for (let index = 0; index < places.length; index++) {
        if (uuid === places[index].id) {
            uuid = Math.floor(Math.random() * 100)+1;
            index = 0;
        }
    }

    const imageURL = 'place'+uuid.toString();
    req.body.id = uuid;
    req.body.imageURL = imageURL;
    req.body.clicked = false;

    // add a new Place instance as DB model
    const place = new Place({
        id: req.body.id,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        imageURL: req.body.imageURL,
        clicked: req.body.clicked
    });

    try {
        const savedPlace = await place.save();
        res.setHeader('Access-Control-Allow-Origin', '*');
        places = await Place.find();
        res.send(places);
    } catch (error) {
        res.json({ message: error});
    }

});

// access point for deleting places
app.delete('/maps/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    try {
        const deletedPlace = await Place.remove({id: id});
        places = await Place.find();
        res.send(places);
    } catch (error) {
        res.json({ message: error});
        res.send('could not find place to delete');
    }

});

// access point for updating places
app.put('/maps/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    let imageURL;
    for (let index = 0; index < places.length; index++) {
        if(id === places[index].id){
            imageURL = places[index].imageURL;
        }
    }
    try {
        const updatedPlace = await Place.updateOne(
            {id: id},
            { $set: {name: req.body.name, imageURL: req.body.imageURL}}
        );
        places = await Place.find();
        res.send(places);
        fs.rename('../public/images/'+imageURL+'.jpg', '../public/images/'+req.body.imageURL+'.jpg', function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });

    } catch (error) {
        res.json({ message: error});
        res.send('could not find place to update');
    }

});

app.listen(3000);