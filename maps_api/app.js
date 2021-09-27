const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var fs = require('fs');


// init places

// Since we allow to change the name of the resource/image files, it makes more sense if we store the changes. We could use a persistant database like
// e.g.: Mongoose, instead we are using a temporary solution. We are storing it in places.json file.
let places;
fs.readFile('places.json', (err, data) => {
    if (err) throw err;
    places = JSON.parse(data);
    console.log(places);
});
// var places = [
//     {id: 1, name:"place 1", latitude: "38.8951", longitude: "77.0364", imageURL:"place1", clicked:false},
//     {id: 2, name:"place 2", latitude: "34.8951", longitude: "74.0364", imageURL:"place2", clicked:false},
//     {id: 3, name:"place 3", latitude: "30.8951", longitude: "70.0364", imageURL:"place3", clicked:false},
//     {id: 4, name:"place 4", latitude: "48.8951", longitude: "87.0364", imageURL:"place4", clicked:false},
//     {id: 5, name:"place 5", latitude: "42.8951", longitude: "67.0364", imageURL:"place5", clicked:false}
// ]

// Middleware


// Routes

// access point for home
app.get('/', (req, res) =>{
    res.send('We are on home');
});

// access point for getting all places
app.get('/maps', (req, res) =>{
    res.send(places);
});

// access point for getting an image by imageURL
app.get('/images/:imageURL', (req, res) =>{
    const imageURL = req.params.imageURL;
    for (let index = 0; index < places.length; index++) {
        places[index].clicked = false;
        if (imageURL === places[index].imageURL) {
            places[index].clicked = true;
            res.send(places[index]);
        }
    }
    res.send('could not find image');
});

// access point for getting a place by id
app.get('/maps/:id', (req, res) =>{
    const id = req.params.id;
    for (let index = 0; index < places.length; index++) {
        if (id === places[index].id.toString()) {
            res.send(places[index]);
        }
    }
    res.send('could not find place');
});

// access point for adding a new place
app.post('/maps', (req, res) =>{
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
    // console.log(req.body);
    places.push(req.body);
    console.log(places);

    // writing the change into places.json file
    let data = JSON.stringify(places);
    fs.writeFileSync('places.json', data);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('place added');
});

// access point for deleting places
app.delete('/maps/:id', (req, res) =>{
    const id = req.params.id;
    for (let index = 0; index < places.length; index++) {
        if (id === places[index].id.toString()) {
            places.splice(index, 1);

            // writing the change into places.json file
            let data = JSON.stringify(places);
            fs.writeFileSync('places.json', data);

            res.send('place deleted');
        }
    }
    res.send('could not find place to delete');
});

// access point for updating places
app.put('/maps/:id', (req, res) =>{
    const id = req.params.id;
    for (let index = 0; index < places.length; index++) {
        if (id === places[index].id.toString()) {
            // renaming place name
            places[index].name = req.body.name;
            // renaming image file path
            fs.rename('../public/images/'+places[index].imageURL+'.jpg', '../public/images/'+req.body.imageURL+'.jpg', function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });
            places[index].imageURL = req.body.imageURL;
            
            // writing the change into places.json file
            let data = JSON.stringify(places);
            fs.writeFileSync('places.json', data);
            
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send('place updated');
        }
    }
})

app.listen(3000);